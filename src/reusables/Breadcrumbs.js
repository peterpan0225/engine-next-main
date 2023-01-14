import React from "react";

const pages = [
  { name: "Projects", href: "#", current: false },
  { name: "Project Nero", href: "#", current: true },
];

const Breadcrumbs = ({ items = [] }) => {
  return (
    // <nav className="flex" aria-label="Breadcrumb">
    //   <ol className="inline-flex items-center space-x-1 md:space-x-3">
    //     <li className="inline-flex items-center">
    //       <a href="/" className="text-blue-700  inline-flex items-center">
    //         <svg
    //           className="w-5 h-5 mr-2.5"
    //           fill="currentColor"
    //           viewBox="0 0 20 20"
    //           xmlns="http://www.w3.org/2000/svg"
    //         >
    //           <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    //         </svg>
    //         Home
    //       </a>
    //     </li>
    //     {items.map((item, i, arr) => (
    //       <li>
    //         <div className="flex items-center">
    //           {i !== arr.length - 1 ? (
    //             <a
    //               href={item.uri || "#"}
    //               className="text-blue-700 ml-1 md:ml-2 text-sm font-medium"
    //             >
    //               {item.name || "N/A"}
    //             </a>
    //           ) : (
    //             <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">
    //               {item.name || "N/A"}
    //             </span>
    //           )}
    //         </div>
    //       </li>
    //     ))}
    //   </ol>
    // </nav>

    // <nav className="flex" aria-label="Breadcrumb">
    //   <ol
    //     role="list"
    //     className="bg-white rounded-md shadow px-6 flex space-x-4"
    //   >
    //     <li className="flex">
    //       <div className="flex items-center">
    //         <a href="/" className="text-blue-400 hover:text-blue-500">
    //           <svg
    //             className="w-5 h-5 mr-2.5"
    //             fill="currentColor"
    //             viewBox="0 0 20 20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    //           </svg>
    //           <span className="sr-only">Home</span>
    //         </a>
    //       </div>
    //     </li>
    //     {items.map((item, i, arr) => (
    //       <li key={item.name} className="flex">
    //         <div className="flex items-center	">
    //           <svg
    //             className="flex-shrink-0 w-6 h-full text-gray-200"
    //             viewBox="0 0 24 44"
    //             preserveAspectRatio="none"
    //             fill="currentColor"
    //             xmlns="http://www.w3.org/2000/svg"
    //             aria-hidden="true"
    //           >
    //             <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
    //           </svg>
    //           {i !== arr.length - 1 ? (
    //             <a
    //               href={item.uri || "#"}
    //               className="ml-4 text-sm font-medium text-blue-500 hover:text-blue-700"
    //             >
    //               {item.name || "N/A"}
    //             </a>
    //           ) : (
    //             <span className="ml-4 text-sm font-medium text-gray-400 ">
    //               {item.name || "N/A"}
    //             </span>
    //           )}
    //         </div>
    //       </li>
    //     ))}
    //   </ol>
    // </nav>

    /* This example requires Tailwind CSS v2.0+ */

    <nav className="flex" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4 flex-wrap">
        <li className="mt-4">
          <div>
            <a href="/" className="text-blue-600 hover:text-blue-700">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              <span className="sr-only">Home</span>
            </a>
          </div>
        </li>
        {items.map((item, i, arr) => (
          <li key={item.name} className="mt-4">
            <div className={`flex items-center ${i !== 0 ? "ml-[16px]" : ""}`}>
              <svg
                className="flex-shrink-0 h-5 w-5 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>

              <a
                href={item.uri || "#"}
                className="max-w-[250px] sm:max-w-[450px] md:max-w-[600px] truncate ml-4 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {item.name || "N/A"}
              </a>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
