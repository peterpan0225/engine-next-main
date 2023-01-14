import { useKeenSlider } from "keen-slider/react";
import SliderItem from "./SliderItem";
import { useState } from "react";
export default function CategorySlider({ posts }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    spacing: 15,
    slidesPerView: 1,
    centered: true,
    loop: true,
    mode: "snap",
    breakpoints: {
      "(min-width: 768px)": {
        slidesPerView: 2,
        mode: "free-snap",
      },
      "(min-width: 900px)": {
        spacing: 20,
        slidesPerView: 3,
        mode: "free-snap",
      },
      "(min-width: 1200px)": {
        spacing: 20,
        slidesPerView: 4,
        mode: "free-snap",
      },
    },
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  return (
    <div className="category-slider relative">
      <div ref={sliderRef} className="keen-slider">
        {!!posts &&
          posts.map((post, index) => (
            <div
              key={post.databaseId}
              className={`keen-slider__slide lazy__slide number-slide${
                index + 1
              } focus:outline-none bg-gray-200 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px]`}
            >
              <SliderItem index={index} post={post} />
            </div>
          ))}
      </div>
      {!!slider && (
        <div className="dots md:hidden absolute z-10 bottom-0 pl-4 mb-[40px] flex space-x-2">
          {[...Array(slider.details().size).keys()].map((idx) => {
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx);
                }}
                className={`dot w-[40px] rounded-lg h-[4px]  ${
                  currentSlide === idx
                    ? "active bg-white"
                    : "bg-white bg-opacity-50"
                }`}
              >
                <div className="sr-only">button {idx}</div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
