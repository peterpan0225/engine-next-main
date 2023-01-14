import useModal from "@contexts/LoginModalContext";
import UserAvatar from "@reusables/UserAvatar";
import useAuth from "@contexts/AuthContext";

export default function UserLogin() {
  const { user } = useAuth();
  const { openModal } = useModal();
  return (
    <>
      {user ? (
        <button
          className="focus:outline-none focus:ring-2 ring-dynamic-red rounded-full"
          type="button"
          onClick={openModal}
        >
          <UserAvatar size="small" user={user} />
          <span className="sr-only">Open Uer profile</span>
        </button>
      ) : (
        <button
          className="px-1 focus:outline-none focus:ring-2 ring-dynamic-red rounded focus:text-dynamic-red"
          type="button"
          onClick={openModal}
        >
          Sign in/Join
        </button>
      )}
    </>
  );
}
