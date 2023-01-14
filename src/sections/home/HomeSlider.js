import { useKeenSlider } from "keen-slider/react";
import SliderItem from "./SliderItem";
import { useState } from "react";
import MobilePagination from "./MobilePagination";
import DesktopPagination from "./DesktopPagination";
import PostLoader from "@reusables/PostLoader";
export default function HomeSlider({ posts }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider({
    spacing: 0,
    slidesPerView: 1,
    loop: true,
    duration: 2000,
    initial: 0,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <>
      <div className="homepage-slider relative max-w-[1920px] mx-auto ">
        <div ref={sliderRef} className="keen-slider relative z-10">
          {!!posts ? (
            posts.map((post, index) => (
              <div
                key={post.databaseId}
                className={`keen-slider__slide lazy__slide number-slide${
                  index + 1
                } focus:outline-none bg-gray-200 h-[260px] sm:h-[400px] md:h-[450px] lg:h-[700px]`}
              >
                <SliderItem index={index} post={post} />
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center h-[260px] sm:h-[400px] md:h-[450px] lg:h-[700px]">
              <PostLoader full />
            </div>
          )}
        </div>
        {!!slider && !!posts && (
          <div className="dots max-w-[1920px] mx-auto flex lg:justify-end items-center">
            <div className="mobile absolute z-10 bottom-0 pl-4 mb-[35px] sm:mb-[80px] md:mb-[90px] flex space-x-2 lg:hidden">
              {posts.map((_, index) => (
                <MobilePagination
                  key={index}
                  slider={slider}
                  index={index}
                  active={currentSlide === index}
                />
              ))}
            </div>
            <div className="desktop mx-[50px] absolute top-0 bottom-0 hidden lg:flex flex-col justify-center space-y-3">
              {posts.map((post, index) => (
                <DesktopPagination
                  post={post}
                  key={index}
                  slider={slider}
                  index={index}
                  active={currentSlide === index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
