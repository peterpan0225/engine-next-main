import axios from "axios";
import { siteUrl, slackCommentsNotificationsChannel } from "../../../CONSTANTS";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { comment, type } = req.body;
      const { story_uri, data: commentBody } = comment || {};
      if (commentBody) {
        const messageContent = `New comment: ${commentBody} \nLink: ${siteUrl}${story_uri}`;
        const { data } = await axios.post(
          `https://slack.com/api/chat.postMessage`,
          {
            channel: slackCommentsNotificationsChannel,
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
        res.status(500).json({ error: "Can't be an empty message" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "Method is not allowed" });
  }
}
