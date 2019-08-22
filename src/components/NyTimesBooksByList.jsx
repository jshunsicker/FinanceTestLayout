import React, { useState, useEffect, useContext } from "react";
import { NY_TIMES_API_KEY } from "../utils/constants";
import { Context as BookContext } from "../context/BookContext";

export default function NyTimesBooksByList(props) {
  const { state, setNyTimesBookLists, setBookListName } = useContext(
    BookContext
  );
  const { listName } = state;
  useEffect(() => {
    if (listName) {
      fetch(
        `https://api.nytimes.com/svc/books/v3/lists.json?list=${listName}&api-key=${NY_TIMES_API_KEY}`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(response);
          }
        })
        .then(json => {
          console.log("JSON: ", json);
          // setBooksByList()
        });
    }
  }, [listName]);

  return (
    <section className="ny-books-list"> Book List {state.listName}</section>
  );
}
