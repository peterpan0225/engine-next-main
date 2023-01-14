import { supabase } from "../../../lib/supabaseClient";
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      console.log("SETTING AUTH COOKIE");
      supabase.auth.api.setAuthCookie(req, res);
    } else {
      // res.setHeader("Allow", ["POST"]);
      res.status(405).json({
        message: `Method ${req.method} not allowed`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ error });
  }
}
