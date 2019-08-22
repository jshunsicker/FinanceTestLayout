import React from "react";

export default function Icon() {
  return (
    <section className="icon">
      <div className="icon__wrapper">
        <svg viewBox="0 0 40 40" className="icon__icon">
          <use
            xlinkHref="/img/symbol-defs.svg#icon-embed2"
            style={{ fill: "white", height: "2px", width: "2px" }}
          />
        </svg>
      </div>
    </section>
  );
}
