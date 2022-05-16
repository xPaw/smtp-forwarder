"use strict";

import { SMTPServer } from "smtp-server";
import got from "got";
import FormData from "form-data";

const SERVER_PORT = 2525;
const SERVER_HOST = "localhost";
const POST_URL = "http://localhost/example_store.php";
const SECRET_TOKEN = "secret-token:some-secret-string";
const ADDR_TO_ACCEPT = "@example.com"; // Logic can be changed in `onRcptTo` callback

const server = new SMTPServer({
	logger: true,
	name: "smtp-forwarder",

	// not required but nice-to-have
	// banner: 'SMTP Server',

	// Enable if using nginx with xclient
	useXClient: true,

	// disable STARTTLS to allow authentication in clear text mode
	disabledCommands: ["AUTH", "STARTTLS"],

	// Accept messages up to 10 MB
	size: 10 * 1024 * 1024,

	onMailFrom(address, session, callback) {
		if (!address.address) {
			return callback(new Error("Not accepted"));
		}

		callback();
	},

	onRcptTo(address, session, callback) {
		if (!address.address) {
			return callback(new Error("Not accepted"));
		}

		// Only accept emails that are incoming to @example.com
		if (!address.address.toLowerCase().endsWith(ADDR_TO_ACCEPT)) {
			return callback(new Error("Not accepted"));
		}

		callback();
	},

	onAuth(auth, session, callback) {
		return callback(new Error('Not accepted'));
	},

	onData(stream, session, callback) {
		let result = "";
		stream.on("data", (chunk) => {
			result += chunk;
		});
		stream.on("end", async () => {
			let err;

			if (stream.sizeExceeded) {
				err = new Error("Error: message exceeds maximum message size");
				err.responseCode = 552;
				return callback(err);
			}

			callback(null, "Message queued");

			try {
				const form = new FormData();
				form.append("token", SECRET_TOKEN);
				form.append("message", result);

				const {body} = await got.post(POST_URL, {
					headers: {
						"user-agent": "smtp-forwarder"
					},
					body: form,
				});
				console.log(body);
			} catch (e) {
				console.error(e);
			}
		});
	},
});

server.on("error", (err) => {
	console.error("Error occurred", err);
});

server.listen(SERVER_PORT, SERVER_HOST);
