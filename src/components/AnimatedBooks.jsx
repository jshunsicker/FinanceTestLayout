import React from "react";
import { tadWilliamsBookData } from "../data/tadWilliamsBookData";
import cn from "classnames";
const bookResponseData = tadWilliamsBookData;
export default function AnimatedBooks() {
  const [currentBook, setCurrentBook] = React.useState({
    ...tadWilliamsBookData.items[0]
  });
  return (
    <div
      className={cn("bp__container", {
        "bp__container--bookdetail": currentBook
      })}
    >
      <SearchBar bookDetailView={!!currentBook} />
      {/* <BookDetailView googleBook={currentBook} /> */}
      <BookTopMenu />
      <BookSideMenu />
      <BookListMainContent
        bookResponseData={bookResponseData}
        handleBookClick={setCurrentBook}
      />
    </div>

  );
}

export const fetchSelfLinkData = async link => {
  if (link) {
    return await fetch(link).then(res => {
      if (res.ok) {
        return res.json();
      }
    });
  }
};

export const BookDetailView = props => {
  const [selfLinkData, setSelfLinkData] = React.useState(null);
  const { googleBook } = props;
  const selfLink = googleBook.selfLink;

  const book = googleBook.volumeInfo;
  const bookSearch = googleBook.searchInfo;

  React.useEffect(() => {
    if (selfLink) {
      async function fetchData() {
        const data = await fetchSelfLinkData(selfLink);
        if (data) {
          setSelfLinkData(data);
        }
      }
      fetchData();
    }
  }, [selfLink]);

  console.log("selfLinkData:", selfLinkData);

  const categories = selfLinkData
    ? selfLinkData.volumeInfo.categories.join(",")
    : book.categories.join(", ");

  return (
    // <section className="bp__container bp__container--bookdetail">
    <>
      <section className="bp__top-menu">
        <div className="bp__dropdown">
          <div>
            <svg className="bp__dropdown--menu">
              <use href="./img/symbol-defs.svg#icon-arrow-left2" />
            </svg>
          </div>
          <span className="bp__dropdown--author">Back</span>
        </div>
      </section>
      <section className="bp__side-menu">
        <div className="bp__side-quote">
          <svg className="bp__icon--quote">
            <use href="./img/symbol-defs.svg#icon-quotes-left" />
          </svg>
          <span className="bp__quote">{bookSearch.textSnippet}</span>
          <span className="bp__quote--author">
            {getAuthor(book.description)}
          </span>
        </div>
      </section>
      <section className="bp__content bp__book-detail-section">
        <div className="bp__book-detail-wrapper">
          <div className="bp__book-detail">
            <img
              className="bp__book-detail-img"
              alt="book-cover"
              src={book.imageLinks.smallThumbnail}
            />
            <h1 className="bp__book-detail-title">{book.title}</h1>
            <p className="bp__book-detail-author">{book.authors[0]}</p>
            <div className="bp__book-publisher-grid">
              <div className="bp__book-detail-publishers">
                <span className="bp__book-detail-label">
                  Originally Published
                </span>
                <span className="bp__book-detail-value">
                  {formatDate(book.publishedDate)}
                </span>
              </div>
              <div className="bp__book-detail-publishers">
                <span className="bp__book-detail-label">Publisher</span>
                <span className="bp__book-detail-value">{book.publisher}</span>
              </div>
            </div>

            <span className="bp__book-detail-label">Categories</span>
            <span className="bp__book-detail-value">{categories}</span>
          </div>
          <div className="bp__book-preview-menu">
            <div className="bp__book-preview-options">
              <div className="bp__menu-option">
                <svg className="bp__icon--save bp__icon">
                  <use href="./img/symbol-defs.svg#icon-th-bookmark" />
                </svg>
                <span className="bp__menu-label">Save</span>
              </div>
              <div className="bp__menu-option">
                <svg className="bp__icon--preview bp__icon">
                  <use href="./img/symbol-defs.svg#icon-play2" />
                </svg>
                <span className="bp__menu-label">Preview</span>
              </div>
              <div className="bp__menu-option">
                <svg className="bp__icon--get-book bp__icon">
                  <use href="./img/symbol-defs.svg#icon-cart" />
                </svg>
                <span className="bp__menu-label">Get Book</span>
              </div>
            </div>
            <div className="bp__book-excerpt">
              <h1 className="bp__book-excerpt-title">Excerpt </h1>
              <span className="bp__book-detail-label">Book 1 - Chapter 1</span>
              <p>Book text here</p>
              <a
                className="bp__link--excerpt"
                href={book.previewLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                See full exerpt
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
    // {/* </section> */}
  );
};

export const BookAudibleBar = props => {
  return (
    <section className="bp__audible">
      <audio></audio>
    </section>
  );
};

export const BookSideMenu = props => {
  return (
    <section className="bp__side-menu">
      <div className="bp__icon-links">
        <div className="bp__icon-links-wrapper">
          <svg className="bp__icon bp__icon--headphone">
            <use href="./img/symbol-defs.svg#icon-headphones" />
          </svg>
          <svg className="bp__icon bp__icon--book">
            <use href="./img/symbol-defs.svg#icon-contacts" />
          </svg>
          <svg className="bp__icon bp__icon--bookmark">
            <use href="./img/symbol-defs.svg#icon-th-bookmark" />
          </svg>
        </div>
      </div>
      <div className="bp__home-icon">
        <svg className="bp__icon bp__icon--home">
          <use href="./img/symbol-defs.svg#icon-th-home" />
        </svg>
      </div>
    </section>
  );
};

export const BookTopMenu = props => {
  return (
    <section className="bp__top-menu">
      <div className="bp__dropdown">
        <div>
          <svg className="bp__dropdown--menu">
            <use href="./img/symbol-defs.svg#icon-th-menu" />
          </svg>
        </div>
        <span className="bp__dropdown--author">Tad Williams</span>
      </div>
    </section>
  );
};

export const SearchBar = props => {
  const { bookDetailView } = props;
  return (
    <div
      className={cn("bp__search-wrapper", {
        "bp__search-wrapper--shrunk": bookDetailView
      })}
    >
      <div className="bp__search-icon-wrapper">
        <svg className="bp__search-icon">
          <use href="./img/symbol-defs.svg#icon-search" />
        </svg>
      </div>
      <input className="bp__search-input" id="search" type="text" />
    </div>
  );
};

export const BookListMainContent = props => {
  const { bookResponseData, handleBookClick } = props;
  return (
    <section className="bp__content">
      <h1 className="bp__title">Most Popular Picks</h1>
      <div className="bp__book-list">
        {bookResponseData.items.map(bookResponse => {
          const book = bookResponse.volumeInfo;
          return (
            <div className="bp__book-card">
              <img
                src={book.imageLinks.smallThumbnail}
                alt={`${book.title}`}
                onClick={() => handleBookClick(book)}
                className="bp__book-img"
              />
              <div className="bp__book-info">
                <h2 className="bp__book-title">{book.title}</h2>
                <div>
                  <div className="bp__ratings">
                    {Array(5)
                      .fill("")
                      .map((x, index) => (
                        <svg
                          className={`bp__icon bp__icon--star ${
                            index < book.averageRating
                              ? "bp__icon--yellow"
                              : "bp__icon--grey"
                          }`}
                        >
                          <use href="./img/symbol-defs.svg#icon-star-full" />
                        </svg>
                      ))}
                  </div>
                  <a
                    className="bp__link"
                    href={book.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See reviews ({book.ratingsCount})
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export function formatDate(dateString) {
  const date = new Date(dateString);

  return date.toDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

const getFirstQuote = longStringDescription => {
  //find the second occurrence of the open quote and split the array
  const firstQuote = longStringDescription
    .split("“", 2)
    .join("")
    .replace("”", "");
  //remove the second occurence, since stylistically we're using
  //and svg for the air quote

  return firstQuote.substring(0, firstQuote.indexOf("—")).substring(0, 70);
};

const getAuthor = quote => {
  const description = quote
    .split("“", 2)
    .join("")
    .replace("”", "");
  return description.substring(description.indexOf("—")).substring(0, 25);
};
