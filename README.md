This is a simple SMTP server listener which processes any incoming SMTP message,
and forwards it to the specified url as a POST request.

See `example_store.php` for an example on how to process the incoming message.

See `example_nginx.conf` for an example on how to configure nginx to use STARTTLS,
and forward it to the node.js server.
