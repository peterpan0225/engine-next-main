// This is a post loader Component It just 3 blinking dots.
export default function PostLoader({ full = false }) {
  if (full) {
    return (
      <>
        <div className="container mx-auto flex items-center justify-center my-6 lg:my-8">
          <div className="spinner pt-2">
            <div className="bounce1 bg-dynamic-red"></div>
            <div className="bounce2 bg-dynamic-red"></div>
            <div className="bounce3 bg-dynamic-red"></div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap lg:space-x-6 my-6 lg:my-8">
        <div className="w-full lg:w-3/5 flex items-center justify-center ">
          <div className="spinner pt-2">
            <div className="bounce1 bg-dynamic-red"></div>
            <div className="bounce2 bg-dynamic-red"></div>
            <div className="bounce3 bg-dynamic-red"></div>
          </div>
        </div>
        <div className="w-full lg:w-2/5"></div>
      </div>
    </>
  );
}
