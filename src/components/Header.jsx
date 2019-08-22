import React, { useEffect, useState } from "react";

export default function Header() {
  const [focus, setFocus] = useState(false);

  const [hover, setHover] = useState(false);

  function handleFocus(event) {
    setFocus(true);
  }

  function handleBlur(event) {
    setFocus(false);
  }

  function handleMouseEvent(event) {
    setHover(!hover);
  }
  const searchClassNames = focus
    ? "search__label search__label--focus"
    : "search__label";

  
  return (
    <header className="header">
      <div className="header__search">
        <span className="search__wrapper">
          <label htmlFor="search" className={searchClassNames}>
            Search
          </label>
          <input
            id="search"
            className="search__input"
            onBlur={handleBlur}
            onFocus={handleFocus}
          />
        </span>
      </div>
    </header>
  );
}
