import axios from "axios";
import { siteUrl, slackCommentsNotificationsChannel } from "../../../CONSTANTS";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { user } = req.body;
      const {
        user_meta_data: { email },
      } = user || {};
      if (email) {
        const { data } = await axios.post(
          `https://hooks.zapier.com/hooks/catch/7115520/baes9iz/`,
          {
            email,
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
