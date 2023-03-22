import dotenv from 'dotenv';
dotenv.config();
import { TwitterApi } from 'twitter-api-v2';
import express from 'express';

const key = process.env.TWITTER_KEY;
const secret = process.env.TWITTER_SECRET;

const client = new TwitterApi({ appKey: key, appSecret: secret });
const authLink = await client.generateAuthLink('http://localhost:3000');

console.log(authLink);

const app = express();

app.get('/', (req, res) => {
  // Extract tokens from query string
  const { oauth_token, oauth_verifier } = req.query;
  // Get the saved oauth_token_secret from session
  const { oauth_token_secret } = authLink

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  // Obtain the persistent tokens
  // Create a client from temporary tokens
  const client = new TwitterApi({
    appKey: key,
    appSecret: secret,
    accessToken: oauth_token,
    accessSecret: oauth_token_secret,
  });

  client.login(oauth_verifier)
    .then((res) => {
      console.dir(res, { depth: null});
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Started on: http://localhost:${PORT}`);
});