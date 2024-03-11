This is a simple Cloudflare email worker which forwards all incoming raw messages
to a specified http url as POST data.

Essentially does the same thing as the SMTP forwarder in the parent folder,
except does not require running your own SMTP server.

See [../example_store.php](example_store.php) for an example on how to process the incoming message.

Ref: https://developers.cloudflare.com/email-routing/email-workers/
