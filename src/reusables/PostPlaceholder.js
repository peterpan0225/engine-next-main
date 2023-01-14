export default function PostPlaceholder() {
  return (
    <>
      <div className="flex items-stretch space-x-3 it">
        <div className="feature-image  bg-gray-300 w-2/6 flex-shrink-0 rounded-md lg:rounded-none overflow-hidden"></div>
        <div className="w-4/6 content flex flex-col justify-center py-2">
          <div
            style={{ width: "70px", height: "15px" }}
            className="category bg-gray-300"
          ></div>
          <div className="title h-6 my-4 bg-gray-300"></div>
          <div className="authorbox flex items-center space-x-2">
            <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
            <div className="">
              <div className="w-20 h-2 bg-gray-300"></div>
              <div className="w-48 h-2 mt-2 bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
