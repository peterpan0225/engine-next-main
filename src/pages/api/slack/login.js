import axios from "axios";
import { siteUrl, slackLoginNotificationsChannel } from "../../../CONSTANTS";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user } = req.body;
      const { email } = user || {};
      if (email) {
        const messageContent = `User Logged in: ${email}`;
        const { data } = await axios.post(
          `https://slack.com/api/chat.postMessage`,
          {
            channel: slackLoginNotificationsChannel,
            // channel: "C03JYDEKNH3",
            text: messageContent,
            unfurl_links: false,
            unfurl_media: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_SLACK_AUTH_TOKEN}`,
            },
          }
        );
        res.status(200).json(data);
      } else {
        res.status(500).json({ error: "Email wasnt found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "Method is not allowed" });
  }
}
