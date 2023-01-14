import axios from "axios";
import Perspective from "perspective-api-client";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { text } = req.body;

      if (text) {
        const perspective = new Perspective({
          apiKey: process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY,
        });
        const result = await perspective.analyze({
          comment: { text },
          languages: ["en"],
        });
        //       const result = await axios.post(
        //         `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${process.env.NEXT_PUBLIC_PERSPECTIVE_API_KEY}
        // `,
        //         {
        //           comment: {
        //             text,
        //           },
        //           languages: ["en"],
        //         }
        //       );
        res.status(200).json(result);
      } else {
        res.status(500).json({ message: "Please provide text" });
      }
    } else {
      res.status(500).json({ message: "Method is not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
