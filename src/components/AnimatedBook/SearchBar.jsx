import React from "react";
import cn from "classnames";

export const SearchBar = props => {
  const { bookDetailView } = props;
  return (
    <div
      style={{
        zIndex: 5
      }}
      className={cn("bp__search-wrapper", {
        "bp__search-wrapper--shrunk": bookDetailView
      })}
    >
      <div className="bp__search-icon-wrapper">
        <svg className="bp__search-icon">
          <use href="./img/symbol-defs.svg#icon-search" />
        </svg>
      </div>
      <input className="bp__search-input" id="search" type="text" />
    </div>
  );
};
