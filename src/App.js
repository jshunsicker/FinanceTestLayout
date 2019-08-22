import React from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Icon from "./components/Icon";

function App() {
  return (
    <div className="app">
      <Header />
      <Icon />
      <Menu />
      <section className="content" />
    </div>
  );
}

export default App;
