var dotenv = require('dotenv');

dotenv.config();

export const config = {
    token: process.env['TOKEN'],
    token_secret: process.env['TOKEN_SECRET'],
    consumer_key: process.env['CONSUMER_KEY'],
    consumer_secret: process.env['CONSUMER_SECRET']
}