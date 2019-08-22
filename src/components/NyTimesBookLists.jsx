import React, { useState, useEffect, useContext } from "react";
import { Context as BookContext } from "../context/BookContext";
import { NY_TIMES_API_KEY } from "../utils/constants";

export default function NyTimesBookLists() {
  //   const [nyTimesBookLists, setNyTimesBookLists] = useState([]);
  const { state, setNyTimesBookLists, setBookListName } = useContext(
    BookContext
  );
  useEffect(() => {
    fetch(
      `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${NY_TIMES_API_KEY}`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response);
        }
      })
      .then(json => {
        const lists = json.results.map(result => {
          return {
            listName: result.list_name_encoded,
            name: result.display_name,
            lastPublishedDate: result.newest_published_date
          };
        });
        // setNyTimesBookLists(lists);
        setNyTimesBookLists(lists);
      });
  }, []);

  function handleBookListClick(listName) {
    console.log("handle click:", listName);
    if (listName) {
      setBookListName(listName);
    }
  }

  return (
    <section className="best-seller">
      <div className="best-seller__titles">
        <h2>Best Seller List</h2>
        <h2>Last Published</h2>
      </div>
      <div className="best-seller__results">
        <ul className="best-seller__list">
          {state.nyTimesLists.map((list, index) => {
            return (
              <li
                className="best-seller__item"
                key={`${list.listName}-${index}`}
              >
                <span
                  className="best-seller__name"
                  onClick={() => handleBookListClick(list.listName)}
                >
                  {list.name}
                </span>
                <span className="best-seller__date">
                  {list.lastPublishedDate}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
