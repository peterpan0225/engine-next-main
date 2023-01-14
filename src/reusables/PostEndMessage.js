//This post end component used for infinity scroll
export default function PostEndMessage({ full = false }) {
  if (full) {
    return (
      <>
        <div className="container mx-auto flex items-center justify-center my-6 lg:my-8">
          <p>
            <b>You have reached the end!</b>
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="container mx-auto flex flex-wrap lg:flex-nowrap lg:space-x-6 my-6 lg:my-8">
        <div className="w-full lg:w-3/5 flex items-center justify-center ">
          <p>
            <b>You have reached the end!</b>
          </p>
        </div>
        <div className="w-full lg:w-2/5"></div>
      </div>
    </>
  );
}
