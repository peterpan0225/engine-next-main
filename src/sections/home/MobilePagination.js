export default function MobilePagination({ slider, active, index }) {
  return (
    <>
      <button
        onClick={() => {
          slider.moveToSlideRelative(index);
        }}
        className={`dot w-[40px] rounded-lg h-[4px]  ${
          active ? "active bg-white" : "bg-white bg-opacity-50"
        }`}
      >
        <div className="sr-only">button {index}</div>
      </button>
    </>
  );
}
