import React from "react";
import NyTimesBookLists from "../components/NyTimesBookLists";
import NyTimesBooksByList from "../components/NyTimesBooksByList";

export default function BookPage() {
  return (
    <section className="content books-page">
      <h1 className="content__title">NY Times Best Sellers</h1>
      <section className="content__lists">
        <NyTimesBookLists />
        <NyTimesBooksByList />
      </section>
    </section>
  );
}
