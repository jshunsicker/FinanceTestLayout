import React from "react";
import styled from "styled-components";

export default function TestSlider() {
  return (
    <div className="slide-wrap">
      <a href="#slide-1">1</a>
      <a href="#slide-2">2</a>
      <a href="#slide-3">3</a>
      <a href="#slide-4">4</a>
      <a href="#slide-5">5</a>
      <div className="slider">
        <div className="slide" id="slide-1">
          1
        </div>
        <div className="slide" id="slide-2">
          2
        </div>
        <div className="slide" id="slide-3">
          3
        </div>
        <div className="slide" id="slide-4">
          4
        </div>
        <div className="slide" id="slide-5">
          5
        </div>
      </div>
    </div>
  );
}

export const Slider = styled.div`
  width: 30rem;
  height: 30rem;
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
`;

export const Slide = styled.div`
  width: 30rem;
  flex-shrink: 0;
  height: 100%;
`;
