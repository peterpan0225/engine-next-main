import LoginOption from "./LoginOption";
import Benifites from "./Benifites";
import { modalModes } from "src/CONSTANTS";
import useAuth from "@contexts/AuthContext";
import { useState } from "react";

export default function LoginSection({ mode }) {
  const title = mode ? modalModes[mode].title : null;

  const isLoginToComment = mode === modalModes.comments.name;
  return (
    <section>
      <div className="max-w-[340px] mx-auto">
        <CommentsLoginOptions />
        {/* <LoginOption title={title} /> */}
      </div>

      {/* <div className="max-w-[340px] mx-auto">
        <p className="font-bold text-lg md:text-2xl mb-4">
          Join our community of 10,000+ entrepreneurs and business managers.
        </p>
        <Benifites />
      </div> */}
    </section>
  );
}

const CommentsLoginOptions = () => {
  const { signinWithGoogle } = useAuth();
  const [enableNotifications, setEnableNotifications] = useState(true);

  return (
    <div className="">
      <div className="email-sign-up my-5">
        <p className="text-xl md:text-2xl font-bold">
          The Dynamic Business community values authentic opinions from real
          business people.
        </p>
        <p className="text-xl md:text-2xl font-bold">
          Please login to post your comment.
        </p>
        <p className="text-xl md:text-2xl font-bold">
          You can also add your bio and linkedin
        </p>
      </div>
      <div className="social text-white flex justify-between space-x-3">
        <button
          onClick={() => signinWithGoogle(enableNotifications)}
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
      <div className="flex items-center mb-4 mt-4">
        {console.log({ enableNotifications })}
        <input
          id="notifications-checkbox"
          type="checkbox"
          checked={enableNotifications}
          onChange={() => setEnableNotifications(!enableNotifications)}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="notifications-checkbox"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Receive Notifications And Newsletters
        </label>
      </div>
    </div>
  );
};
