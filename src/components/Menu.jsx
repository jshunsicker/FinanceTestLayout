import React, { useState } from "react";
import User from "./User";

export default function Menu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Home");

  const links = {
    home: {
      label: "Home",
      icon: "home"
    },
    books: {
      label: "Books",
      icon: "books"
    },
    notes: {
      label: "Notes",
      icon: "folder"
    },
    social: {
      label: "Share",
      icon: "reddit"
    },
    alerts: {
      label: "Alerts",
      icon: "bell"
    },
    settings: {
      label: "Settings",
      icon: "cog"
    }
  };

  function handleClick(event) {
    let name = event.currentTarget.getAttribute("name");
    setActiveMenuItem(name);
  }

  return (
    <section className="menu">
      <User />
      <ul className="menu__list">
        {Object.values(links).map((link, index) => (
          <li
            key={`${link.value}-${index}`}
            className={`menu__item ${
              activeMenuItem === link.label ? "menu__item--active" : ""
            }`}
            name={link.label}
            onClick={handleClick}
          >
            <svg className="menu__icon">
              <use xlinkHref={`/img/symbol-defs.svg#icon-${link.icon}`} />
            </svg>
            <span className="menu__label">{link.label}</span>
          </li>
        ))}
      </ul>
      <div className="menu__signout">
        <ul className="menu__list">
          <li className={`menu__item`} name={"signout"} onClick={handleClick}>
            <svg className="menu__icon">
              <use xlinkHref={`/img/symbol-defs.svg#icon-switch`} />
            </svg>
            <span className="menu__label">Sign out</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
