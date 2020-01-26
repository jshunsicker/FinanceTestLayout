import React from "react";
import Menu from "./components/Menu";
import Header from "./components/Header";
import Icon from "./components/Icon";
import { Provider as BookProvider } from "./context/BookContext";

function App() {
  return (
    <BookProvider>
      <div className="app">
        <Icon />
        <Header />
        <Menu />
      </div>
    </BookProvider>
  );
}

export default App;
