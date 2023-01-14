import UserAvatar from "@reusables/UserAvatar";
import useAuth from "@contexts/AuthContext";
import { useEffect, useState } from "react";
import PostLoader from "@reusables/PostLoader";
import { editUserBio, getUserProfile } from "../../utils/supabaseFns";

export default function Profile({ user }) {
  const { signout } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [bio, setBio] = useState("");
  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  const handleSubmitBio = async () => {
    setLoadingProfile(true);
    if (user) {
      const newUserProfile = await editUserBio(user.id, bio);
      setUserProfile(newUserProfile);
      setLoadingProfile(false);
    }
  };
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      if (user) {
        const userProfile = await getUserProfile(user.id);
        setUserProfile(userProfile);
      } else {
        setUserProfile(null);
      }
      setLoadingProfile(false);
    };
    fetchUserProfile();
  }, [user]);
  useEffect(() => {
    if (userProfile) {
      setBio(userProfile.bio);
    }
  }, [userProfile]);

  if (!user) return;
  if (loadingProfile)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <PostLoader full />
      </div>
    );
  const { name, email } = user;
  return (
    <section className="profile mt-8">
      <div className="profile flex flex-col items-center">
        <h2 className="text-center text-3xl font-bold mb-8">Profile</h2>
        <div className="flex flex-col space-y-4 items-center">
          <UserAvatar user={user} />
          <p>Name: {name ?? email}</p>
          <p>Email: {email}</p>
          <Bio
            bio={bio}
            handleBioChange={handleBioChange}
            handleSubmitBio={handleSubmitBio}
          />
        </div>
        <button
          onClick={() => signout()}
          className="bg-gray-800 text-white rounded py-1.5 mt-10 min-w-[220px]"
          type="submit"
        >
          Sign Out
        </button>
      </div>
    </section>
  );
}

const Bio = ({ bio, handleBioChange, handleSubmitBio }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    if (isEditing) {
      handleSubmitBio();
      setIsEditing(!isEditing);
    } else {
      setIsEditing(!isEditing);
    }
  };

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between">
        <h4 className="font-bold mb-2">Bio:</h4>
        <svg
          onClick={toggleEditing}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
      {isEditing ? (
        <>
          <textarea
            className="w-full"
            onChange={handleBioChange}
            value={bio}
            placeholder="Enter your bio..."
          >
            {bio}
          </textarea>
        </>
      ) : (
        <p className="mt-px">{bio}</p>
      )}
    </div>
  );
};
