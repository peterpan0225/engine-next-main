export default function UserAvatar({ user, size = "big" }) {
  const imageSizeClasses = size === "small" ? "w-8 h-8" : "w-20 h-20";
  const { name, email, photoUrl } = user;
  return (
    <div>
      {photoUrl ? (
        <img
          className={`${imageSizeClasses} rounded-full overflow-hidden`}
          src={photoUrl}
          alt={name}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "18px",
            fontWeight: "600",
          }}
          className={`${imageSizeClasses} rounded-full overflow-hidden bg-dynamic-red text-white`}
        >
          {email.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
}
