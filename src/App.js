import React from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Icon from "./components/Icon";
import NyTimesBookLists from "./components/NyTimesBookLists";
import { Provider as BookProvider } from "./context/BookContext";
import NyTimesBooksByList from "./components/NyTimesBooksByList";

function App() {
  return (
    <BookProvider>
      <div className="app">
        <Icon />
        <Menu />
        <section className="content">
          <h1 className="content__title">Dashboard</h1>
          <NyTimesBookLists />
          <NyTimesBooksByList />
        </section>
      </div>
    </BookProvider>
  );
}

export default App;
