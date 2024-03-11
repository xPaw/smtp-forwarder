const POST_URL = "http://localhost/example_store.php";
const SECRET_TOKEN = "secret-token:some-secret-string";

export default {
	async email(message, env, ctx) {
		try {
			const rawMessage = await new Response(message.raw).text();

			const form = new FormData();
			form.append("token", SECRET_TOKEN);
			form.append("message", rawMessage);

			const response = await fetch(POST_URL, {
				method: "POST",
				body: form,
			});

			const text = await response.text();

			if (response.ok) {
				console.log("Webhook request successful:", text);
			} else {
				throw new Error(
					`Webhook request failed: HTTP ${response.status}, ${text}`,
				);
			}
		} catch (err) {
			message.setReject("Failed.");
			//message.setReject(err.message); // Uncomment to debug failures
			throw err;
		}
	},
};
