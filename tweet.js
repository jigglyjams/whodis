import dotenv from 'dotenv';
dotenv.config();
import { TwitterApi } from 'twitter-api-v2';

export const client = new TwitterApi({
  appKey: process.env.TWITTER_KEY,
  appSecret: process.env.TWITTER_SECRET,
  accessToken: process.env.TWITTER_NEWJUICE_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_NEWJUICE_ACCESS_SECRET
});
