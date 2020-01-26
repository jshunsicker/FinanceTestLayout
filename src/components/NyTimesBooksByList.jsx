import React, { useState, useEffect, useContext } from "react";
import { NY_TIMES_API_KEY } from "../utils/constants";
import { Context as BookContext } from "../context/BookContext";

export default function NyTimesBooksByList(props) {
  const { state, setNyTimesBooks } = useContext(BookContext);
  const [error, setError] = useState(null);
  const { listName } = state;

  useEffect(() => {
    if (listName) {
      setError(null);
      setNyTimesBooks([]);
      fetchBooksFromList(listName);
    }
  }, [listName]);

  function fetchBooksFromList(listName) {
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
        const data = json.results.map(result => {
          return {
            amazonUrl: result.amazon_product_url,
            rank: result.rank,
            bookDetails: result.book_details,
            listName: result.list_name,
            displayName: result.display_name,
            publishedDate: result.published_date,
            reviews: result.reviews
          };
        });
        setNyTimesBooks(data);

        setError(null);
      })
      .catch(error => {
        console.error(error);
        setError(error.message);
      });
  }

  if (error) {
    return (
      <section className="ny-books-list">
        <div className="ny-books-list__error">
          Error fetching Data
          <button
            className="best-seller__button button button--primary"
            onClick={() => fetchBooksFromList(listName)}
          >
            Retry?
          </button>
        </div>
      </section>
    );
  }
  console.log("json nyTimes book data:", JSON.stringify(state));

  return (
    <section className="ny-books-list">
      <div className="ny-books-list__titles">
        <h2>{state.listName}</h2>
      </div>
      <div className="ny-books-list__results">
        <ul className="ny-books-list__list">
          {state.booksByList.map((book, index) => {
            const detail = book && book.bookDetails && book.bookDetails[0];

            return (
              <a
                href={book.amazonUrl}
                target="_blank"
                className="ny-books-list__link"
              >
                <li className="ny-books-list__row">
                  <Book {...detail} {...book} />
                </li>
              </a>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export const Book = props => {
  const { title, description, author, rank } = props;

  return (
    <div className="book-row">
      <div className="book-row__title">{title}</div>
      <div className="book-row__author">{author}</div>
      <div className="book-row__description">{description}</div>
      <div className="book-row__rank">{rank}</div>
    </div>
  );
};
