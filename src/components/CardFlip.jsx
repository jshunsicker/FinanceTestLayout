import React, { useEffect, useState } from "react";

export default function CardFlip() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPosition);
    return () => {
      window.removeEventListener("scroll", handleScrollPosition);
    };
  }, []);

  function handleScrollPosition(event) {
    setScrollPosition(window.scrollY);
  }

  const translate3d = `translate3d(0px, ${scrollPosition}px, 0px) 
  rotateZ(${scrollPosition / 1000}turn) 
  rotateX(${scrollPosition / 500}turn)

  translateZ(3px)`;

  const reverseTranslate3d = `translate3d(-50px, ${scrollPosition + 50}px, 0px) 
  rotateZ(${scrollPosition / 1000 + 0.25}turn) 
   rotateY(${-(scrollPosition / 500)}turn)
    rotateX(180deg)
  translateZ(3px)`;

  const translateFinal = `translate3d(0px, 250px, 0px) 
  rotateZ(.25turn) 
  rotateX(.5turn)
  translateZ(3px)`;

  const translateBackFinal = `translate3d(-50px, 300px, 0px) 
  rotateZ(.5turn) 
  rotateX(.5turn)
  rotateY(-180deg)
  translateZ(3px)`;

  //turned completely sideways at scrollY = 135 ie best time to switch between front card and back card

  let style = {
    height: "40rem",
    fontSize: "2rem",
    position: `${
      scrollPosition > 0 && scrollPosition < 250 ? "fixed" : "absolute"
    }`,
    width: "30rem",
    backgroundColor: "white",
    transform: scrollPosition >= 250 ? translateFinal : translate3d
  };

  const backStyle = {
    ...style,
    visibility: scrollPosition >= 135 ? "visible" : "hidden",
    backgroundColor: "blue",
    height: style.width,
    width: style.height,
    transform: scrollPosition >= 250 ? translateBackFinal : reverseTranslate3d
  };

  const frontStyle = {
    ...style,
    visibility: scrollPosition >= 135 ? "hidden" : "visible",
    backgroundColor: "yellow"
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: "grey", height: "300vh", width: "100vw" }}
    >
      <div className="card__container">
        <div className="card card--front" style={frontStyle}>
          Front Of Card
        </div>
        <div className="card card--back" style={backStyle}>
          Back of card
        </div>
      </div>
    </div>
  );
}
