import { supabase } from "@lib/supabaseClient";

export const editUserBio = async (userId, newBio) => {
  let newUserProfile = null;
  try {
    const { data } = await supabase
      .from("profiles")
      .update({ bio: newBio })
      .eq("id", userId)
      .limit(1)
      .single();
    console.log({ data });
    newUserProfile = data;
  } catch (err) {
    console.log(err);
  }

  return newUserProfile;
};

export const getUserProfile = async (userId) => {
  let userProfile = null;
  try {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .limit(1)
      .single();
    userProfile = data;
  } catch (err) {
    console.log(err);
  }
  return userProfile;
};
