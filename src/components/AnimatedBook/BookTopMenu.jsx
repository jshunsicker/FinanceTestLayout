import React from "react";

export const BookTopMenu = props => {
  return (
    <section className="bp__top-menu">
      <div className="bp__dropdown">
        <div>
          <svg className="bp__dropdown--menu">
            <use href="./img/symbol-defs.svg#icon-th-menu" />
          </svg>
        </div>
        <span className="bp__dropdown--author">Tad Williams</span>
      </div>
    </section>
  );
};
