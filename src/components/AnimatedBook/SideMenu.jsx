import React from "react";

export const BookSideMenu = props => {
  return (
    <section className="bp__side-menu">
      <div className="bp__icon-links">
        <div className="bp__icon-links-wrapper">
          <svg className="bp__icon bp__icon--headphone">
            <use href="./img/symbol-defs.svg#icon-headphones" />
          </svg>
          <svg className="bp__icon bp__icon--book">
            <use href="./img/symbol-defs.svg#icon-contacts" />
          </svg>
          <svg className="bp__icon bp__icon--bookmark">
            <use href="./img/symbol-defs.svg#icon-th-bookmark" />
          </svg>
        </div>
      </div>
      <div className="bp__home-icon">
        <svg className="bp__icon bp__icon--home">
          <use href="./img/symbol-defs.svg#icon-th-home" />
        </svg>
      </div>
    </section>
  );
};
