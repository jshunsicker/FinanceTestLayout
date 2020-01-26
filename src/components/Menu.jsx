import React, { useState } from "react";
import User from "./User";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookPage from "../pages/BookPage";
import TestTablePage from "../pages/TestTablePage";
import CardFlipPage from "../pages/CardFlipPage";
import Dashboard from "../pages/Dashboard";

export default function Menu() {
  const [activeMenuItem, setActiveMenuItem] = useState("Home");

  const links = {
    home: {
      label: "Home",
      icon: "home",
      route: "/"
    },
    books: {
      label: "Books",
      icon: "books",
      route: "/books"
    },
    notes: {
      label: "Card Flip",
      icon: "folder",
      route: "/cardflip"
    },
    social: {
      label: "Share",
      icon: "reddit"
    },
    alerts: {
      label: "Test Table",
      icon: "table2",
      route: "/testtable"
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
    <Router>
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
              <Link to={link.route}>
                <span className="menu__label">{link.label}</span>
              </Link>
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

      <Switch>
        <Route path="/books">
          <BookPage />
        </Route>
        <Route path="/testtable">
          <TestTablePage />
        </Route>
        <Route path="/cardflip">
          <CardFlipPage />
        </Route>
        <Route path="/">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}
