/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScrollSection = () => {
  const [lastId, setLastId] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [scrollItems, setScrollItems] = useState([]);

  useEffect(() => {
    const topMenu = document.querySelector("#mainNav");
    const topMenuHeight = topMenu.offsetHeight + 1;
    const menuItems = Array.from(topMenu.querySelectorAll("a"));
    const scrollItems = menuItems.map((menuItem) => {
      const href = menuItem.getAttribute("href");
      const item =
        href === "#" ? document.documentElement : document.querySelector(href);
      if (item) {
        return item;
      }
    });

    setMenuItems(menuItems);
    setScrollItems(scrollItems);
  }, []);

  const handleMenuItemClick = (e, href) => {
    e.preventDefault();
    const topMenu = document.querySelector("#mainNav");
    const topMenuHeight = topMenu.offsetHeight + 1;
    const offsetTop =
      href === "#"
        ? 0
        : document.querySelector(href).offsetTop - topMenuHeight + 1;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const topMenu = document.querySelector("#mainNav");
      const topMenuHeight = topMenu.offsetHeight + 1;
      const fromTop = window.scrollY + topMenuHeight;

      const cur = scrollItems.filter(
        (scrollItem) => scrollItem && scrollItem.offsetTop < fromTop
      );
      const id = cur.length ? cur[cur.length - 1].id : "";

      if (lastId !== id) {
        setLastId(id);
        menuItems.forEach((menuItem) => {
          menuItem.classList.remove("active");
          if (menuItem.getAttribute("href") === `#${id}`) {
            menuItem.classList.add("active");
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastId, menuItems, scrollItems]);

  const CustomPrevArrow = (props) => (
    <button {...props} className="slick-arrow slick-prev">
      Previous
    </button>
  );

  const CustomNextArrow = (props) => (
    <button {...props} className="slick-arrow slick-next">
      Next
    </button>
  );
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    dots: true,
    appendDots: (dots) => (
      <div>
        <ul className="custom-dots">{dots}</ul>
      </div>
    ),
    autoplaySpeed: 122000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="unlockExtraIncome">
      <div className="common-container">
        <div class="unlockExtraIncome-wrapper">
          <div className="unlockExtraIncome__left">
            <div class="unlockExtraIncome__left__wrapper">
              <nav>
                <ul
                  class="unlockExtraIncome__left__wrapper__container"
                  id="mainNav"
                >
                  <h4 class="unlockExtraIncome__left--heading">
                    Expert Car Care Services for a Smooth Ride
                  </h4>

                  <li>
                    <a
                      class="unlockExtraIncome__left__content"
                      href="#firstSection"
                    >
                      <img
                        alt="Task Planet money application"
                        src="https://gromo.in/_next/static/media/EarnMoreicon.32ea4339.png"
                        width="96"
                        height="96"
                        decoding="async"
                        data-nimg="1"
                        loading="lazy"
                      />

                      <div class="unlockExtraIncome__left__content__text">
                        <h6 class="unlockExtraIncome__left__content__text--heading">
                          Oil Change and Lubrication
                        </h6>
                        <p class="unlockExtraIncome__left__content__text--pera">
                          Revitalize your engines performance with our precision
                          Oil Change and Lubrication services, ensuring a smooth
                          and efficient ride for your vehicle.
                        </p>
                        <div class="unlockExtraIncome__left__content__text--img">
                          <img
                            alt="borderRIghtImg"
                            src="https://gromo.in/_next/static/media/borderRight.26bdf7f8.png"
                            width="94"
                            height="352"
                            decoding="async"
                            data-nimg="1"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="unlockExtraIncome__left__content"
                      id="secondContent"
                      href="#secondSection"
                    >
                      <img
                        alt="earn extra income"
                        src="https://gromo.in/_next/static/media/wfhIcon.e185c519.png"
                        width="96"
                        height="96"
                        decoding="async"
                        data-nimg="1"
                        loading="lazy"
                      />
                      <div class="unlockExtraIncome__left__content__text">
                        <h6
                          class="unlockExtraIncome__left__content__text--heading"
                          id="featureTitle"
                        >
                          Brake Inspection and Repair
                        </h6>
                        <p
                          class="unlockExtraIncome__left__content__text--pera"
                          id="featureCont"
                        >
                          Ensure your safety on the road with our meticulous
                          Brake Inspection and Repair services, providing expert
                          care for optimal braking performance.
                        </p>
                        <div class="unlockExtraIncome__left__content__text--img">
                          <img
                            alt="borderRIghtImg"
                            src="https://gromo.in/_next/static/media/borderRight.26bdf7f8.png"
                            width="96"
                            height="96"
                            decoding="async"
                            data-nimg="1"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="unlockExtraIncome__left__content"
                      href="#thirdSection"
                    >
                      <img
                        alt="Without Investment Business"
                        src="https://gromo.in/_next/static/media/zeroInvestmentIcon.eb5db2dc.png"
                        width="96"
                        height="96"
                        decoding="async"
                        data-nimg="1"
                        loading="lazy"
                      />
                      <div class="unlockExtraIncome__left__content__text">
                        <h6
                          class="unlockExtraIncome__left__content__text--heading"
                          id="featureTitle"
                        >
                          Engine Diagnostics
                        </h6>
                        <p
                          class="unlockExtraIncome__left__content__text--pera"
                          id="featureCont"
                        >
                          Unlock the full potential of your vehicles performance
                          with our advanced Engine Diagnostics, identifying and
                          resolving issues for peak efficiency.
                        </p>
                        <div class="unlockExtraIncome__left__content__text--img">
                          <img
                            alt="borderRIghtImg"
                            src="https://gromo.in/_next/static/media/borderRight.26bdf7f8.png"
                            width="96"
                            height="96"
                            decoding="async"
                            data-nimg="1"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="unlockExtraIncome__left__content"
                      href="#forthSection"
                    >
                      <img
                        alt="Instant Token"
                        src="https://gromo.in/_next/static/media/InstantPayoutIcon.9d107c5d.png"
                        width="96"
                        height="96"
                        decoding="async"
                        data-nimg="1"
                        loading="lazy"
                      />
                      <div class="unlockExtraIncome__left__content__text">
                        <h6
                          class="unlockExtraIncome__left__content__text--heading"
                          id="featureTitle"
                        >
                          Tire Rotation and Alignment
                        </h6>
                        <p
                          class="unlockExtraIncome__left__content__text--pera"
                          id="featureCont"
                        >
                          Maximize tire lifespan and improve handling precision
                          with our Tire Rotation and Alignment services,
                          ensuring a smoother and safer driving experience.
                        </p>
                        <div class="unlockExtraIncome__left__content__text--img">
                          <img
                            alt="borderRIghtImg"
                            src="https://gromo.in/_next/static/media/borderRight.26bdf7f8.png"
                            width="96"
                            height="96"
                            decoding="async"
                            data-nimg="1"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                  <li>
                    <a
                      class="unlockExtraIncome__left__content"
                      href="#fifthSection"
                    >
                      <img
                        alt="View Videos / Call us"
                        src="https://gromo.in/_next/static/media/EducationalContentIcon.e6299937.png"
                        width="96"
                        height="96"
                        decoding="async"
                        data-nimg="1"
                        loading="lazy"
                      />
                      <div class="unlockExtraIncome__left__content__text">
                        <h6
                          class="unlockExtraIncome__left__content__text--heading"
                          id="featureTitle"
                        >
                          Fluid Checks and Replacements
                        </h6>
                        <p
                          class="unlockExtraIncome__left__content__text--pera"
                          id="featureCont"
                        >
                          Maintain optimal engine health and performance through
                          our thorough Fluid Checks and Replacements, preserving
                          the vitality of your vehicles essential fluids.
                        </p>
                        <div class="unlockExtraIncome__left__content__text--img">
                          <img
                            alt="borderRIghtImg"
                            src="https://gromo.in/_next/static/media/borderRight.26bdf7f8.png"
                            width="96"
                            height="96"
                            decoding="async"
                            data-nimg="1"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="unlockExtraIncome__right">
            <div class="unlockExtraIncome__right__container">
              <div
                class="unlockExtraIncome__right--img"
                href="section1"
                id="firstSection"
              >
                <img
                  alt="Task Planet money application"
                  src="https://gromo.in/_next/static/media/EducationalContent.e54d2f7c.png"
                  width="1680"
                  height="1680"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                />
              </div>
              <div
                class="unlockExtraIncome__right--img"
                href="section2"
                id="secondSection"
              >
                <img
                  alt="earn extra income"
                  src="https://gromo.in/_next/static/media/Earn.ff1968ab.png"
                  width="1680"
                  height="1680"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                />
              </div>
              <div
                class="unlockExtraIncome__right--img"
                href="section3"
                id="thirdSection"
              >
                <img
                  alt="Without Investment Business"
                  src="https://gromo.in/_next/static/media/WorkAnywhere.bc9cf08d.png"
                  width="840"
                  height="840"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                />
              </div>
              <div
                class="unlockExtraIncome__right--img"
                href="section4"
                id="forthSection"
              >
                <img
                  alt="Instant Token"
                  src="https://gromo.in/_next/static/media/ZeroInvestment.8ea0a926.png"
                  width="1680"
                  height="1680"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                />
              </div>
              <div
                class="unlockExtraIncome__right--img"
                href="section5"
                id="fifthSection"
              >
                <img
                  alt="View Videos / Call us"
                  src="https://gromo.in/_next/static/media/InstantPayout.3476a4cd.png"
                  width="1680"
                  height="1680"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="unlockExtraIncome-slider">
          <h4>Expert Car Care Services for a Smooth Ride</h4>
          <Slider className="slider-margin-top" {...settings}>
            <div className="unlockExtraIncome-slider__box">
              {/* first */}
              <div class="unlockExtraIncome-slider__card">
                <div class="unlockExtraIncome-slider__card--img">
                  <img
                    alt="earn extra income"
                    src="https://gromo.in/_next/static/media/Earn.ff1968ab.png"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                  />
                </div>
                <h6 class="unlockExtraIncome-slider__card--title">
                  Oil Change and Lubrication
                </h6>
                <p class="unlockExtraIncome-slider__card--pera">
                  Revitalize your engines performance with our precision Oil
                  Change and Lubrication services, ensuring a smooth and
                  efficient ride for your vehicle.
                </p>
              </div>
            </div>
            <div className="unlockExtraIncome-slider__box">
              <div class="unlockExtraIncome-slider__card">
                <div class="unlockExtraIncome-slider__card--img">
                  <img
                    alt="earn extra income"
                    src="https://gromo.in/_next/static/media/WorkAnywhere.bc9cf08d.png"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                  />
                </div>
                <h6 class="unlockExtraIncome-slider__card--title">
                  Brake Inspection and Repair
                </h6>
                <p class="unlockExtraIncome-slider__card--pera">
                  Ensure your safety on the road with our meticulous Brake
                  Inspection and Repair services, providing expert care for
                  optimal braking performance.
                </p>
              </div>
            </div>
            <div className="unlockExtraIncome-slider__box">
              <div class="unlockExtraIncome-slider__card">
                <div class="unlockExtraIncome-slider__card--img">
                  <img
                    alt="earn extra income"
                    src="https://gromo.in/_next/static/media/ZeroInvestment.8ea0a926.png"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                  />
                </div>
                <h6 class="unlockExtraIncome-slider__card--title">
                  Engine Diagnostics
                </h6>
                <p class="unlockExtraIncome-slider__card--pera">
                  Unlock the full potential of your vehicles performance with
                  our advanced Engine Diagnostics, identifying and resolving
                  issues for peak efficiency.
                </p>
              </div>
            </div>
            <div className="unlockExtraIncome-slider__box">
              <div class="unlockExtraIncome-slider__card">
                <div class="unlockExtraIncome-slider__card--img">
                  <img
                    alt="earn extra income"
                    src="https://gromo.in/_next/static/media/InstantPayout.3476a4cd.png"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                  />
                </div>
                <h6 class="unlockExtraIncome-slider__card--title">
                  Tire Rotation and Alignment
                </h6>
                <p class="unlockExtraIncome-slider__card--pera">
                  Maximize tire lifespan and improve handling precision with our
                  Tire Rotation and Alignment services, ensuring a smoother and
                  safer driving experience.
                </p>
              </div>
            </div>
            <div className="unlockExtraIncome-slider__box">
              <div class="unlockExtraIncome-slider__card">
                <div class="unlockExtraIncome-slider__card--img">
                  <img
                    alt="earn extra income"
                    src="https://gromo.in/_next/static/media/EducationalContent.e54d2f7c.png"
                    decoding="async"
                    data-nimg="1"
                    loading="lazy"
                  />
                </div>
                <h6 class="unlockExtraIncome-slider__card--title">
                  Fluid Checks and Replacements
                </h6>
                <p class="unlockExtraIncome-slider__card--pera">
                  Maintain optimal engine health and performance through our
                  thorough Fluid Checks and Replacements, preserving the
                  vitality of your vehicles essential fluids.
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
