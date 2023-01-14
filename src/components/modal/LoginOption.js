import useAuth from "@contexts/AuthContext";
export default function LoginOption({ title }) {
  const { signinWithGoogle, signinWithFacebook } = useAuth();
  return (
    <div className="mb-6 md:mb-8">
      <div className="email-sign-up my-5">
        <p className="text-2xl md:text-3xl font-bold">
          {title || "Sign in to keep reading for free"}
        </p>
      </div>
      <div className="social text-white flex justify-between space-x-3">
        <button
          onClick={() => signinWithFacebook()}
          className="bg-[#4285f4] p-2 w-full rounded-md flex items-center space-x-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z" />
          </svg>
          <span>Facebook</span>
        </button>
        <button
          onClick={() => signinWithGoogle()}
          className="bg-[#4285f4] p-2 w-full rounded-md flex items-center space-x-3"
        >
          <div className="bg-white rounded-full">
            <svg className="w-6 h-6 fill-current">
              <g fill="none" fillRule="evenodd">
                <path
                  d="M20.66 12.7c0-.61-.05-1.19-.15-1.74H12.5v3.28h4.58a3.91 3.91 0 0 1-1.7 2.57v2.13h2.74a8.27 8.27 0 0 0 2.54-6.24z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12.5 21a8.1 8.1 0 0 0 5.63-2.06l-2.75-2.13a5.1 5.1 0 0 1-2.88.8 5.06 5.06 0 0 1-4.76-3.5H4.9v2.2A8.5 8.5 0 0 0 12.5 21z"
                  fill="#34A853"
                ></path>
                <path
                  d="M7.74 14.12a5.11 5.11 0 0 1 0-3.23v-2.2H4.9A8.49 8.49 0 0 0 4 12.5c0 1.37.33 2.67.9 3.82l2.84-2.2z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12.5 7.38a4.6 4.6 0 0 1 3.25 1.27l2.44-2.44A8.17 8.17 0 0 0 12.5 4a8.5 8.5 0 0 0-7.6 4.68l2.84 2.2a5.06 5.06 0 0 1 4.76-3.5z"
                  fill="#EA4335"
                ></path>
              </g>
            </svg>
          </div>
          <span>Google</span>
        </button>
      </div>
    </div>
  );
}
