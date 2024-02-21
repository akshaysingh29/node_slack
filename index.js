const express = require('express');
require("dotenv").config();
const Slack = require('@slack/bolt');

const app = new Slack.App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
})

const PORT = process.env.PORT || 8000;

const server = express();
server.use(express.json());



server.post('/sendmessage', async (req, res, next) => {
    const { channel, text } = req.body;
    try {
        if (!channel || !text) {
            return res.status(400).json({ status: false, message: 'channel and text are mandetory' });
        }
        const result = await app.client.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: channel,
            text: text,
        });
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
        next(error);
    }
})






server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})



