import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./styles.css";
import img_1 from '../../../public/images/education.jpg'
import img_2 from '../../../public/images/political.jpg'

const Banner = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider my-6 rounded-lg">
        <div className="keen-slider__slide number-slide1">
          <img className="rounded-lg" src={img_1} alt="" />
        </div>
        <div className="keen-slider__slide number-slide1">
          <img className="rounded-lg" src={img_2} alt="" />
        </div>
        <div className="keen-slider__slide number-slide1">
          <img className="rounded-lg" src={img_1} alt="" />
        </div>
      </div>
    </>
  );
};

export default Banner;
