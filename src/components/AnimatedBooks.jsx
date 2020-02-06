import React from "react";
import { tadWilliamsBookData } from "../data/tadWilliamsBookData";
import cn from "classnames";
import styled from "styled-components";
const bookResponseData = tadWilliamsBookData;
export default function AnimatedBooks() {
  const [currentBook, setCurrentBook] = React.useState(null);
  const [showDetail, setShowDetail] = React.useState(false);

  const orangeStyle = !!currentBook
    ? {
        position: "absolute",
        top: 0,
        left: 0,
        background: "url(/img/paper_2.png)",
        // zIndex: 3,

        animation: "animatedBackground 160s linear infinite"
      }
    : {
        position: "absolute",
        top: 0,
        left: "-100%",
        background: "url(/img/paper_2.png)",
        // zIndex: 3,
        animation: "animatedBackground 160s linear infinite"
      };

  const yellowStyle = !currentBook
    ? {
        position: "absolute",
        top: 0,
        left: 0
      }
    : {
        left: "-100%"
      };

  return (
    <div
      style={{
        position: "relative"
      }}
      className={cn("bp__container")}
    >
      <SearchBar bookDetailView={!!currentBook} />

      <Container
        className="div2"
        style={orangeStyle}
        onClick={() => setShowDetail(!showDetail)}
      >
        <BookDetailView
          googleBook={currentBook}
          handleClearBook={() => setCurrentBook(null)}
          // handleClearBook={() => setShowDetail(!showDetail)}
        />
      </Container>
      <Container className="div1" style={yellowStyle}>
        <BookTopMenu />
        <BookSideMenu />
      </Container>

      <BookListMainContent
        bookResponseData={bookResponseData}
        handleBookClick={setCurrentBook}
        hasCurrentBook={!!currentBook}
        currentBook={currentBook}
      />
    </div>
  );
}

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(12, 1fr);
  transition: all 1.5s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 100%;
  width: 100%;
  position: absolute;
`;

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
  const [showPreview, togglePreview] = React.useState(false);

  const { googleBook = {}, handleClearBook } = props;
  const hasCurrentBook = !!googleBook;
  const selfLink = googleBook && googleBook.selfLink;

  const book = googleBook && googleBook.volumeInfo;
  const bookSearch = googleBook && googleBook.searchInfo;

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

  const categories =
    selfLinkData &&
    selfLinkData.volumeInfo &&
    selfLinkData.volumeInfo.categories
      ? selfLinkData.volumeInfo.categories.join(",")
      : book
      ? book.categories.join(", ")
      : "";

  console.log("book:", book);

  const textSnippet = book ? book.textSnippet : "";
  const author = book ? getAuthor(book.description) : "";
  const bookImage =
    book && book.imageLinks ? book.imageLinks.smallThumbnail : "";
  const publishDate = book ? formatDate(book.publishedDate) : "";
  const publisher = book ? book.publisher : "";
  const previewLink = book ? book.previewLink : "";
  const bookTitle = book ? book.title : "";
  const bookAuthor = book ? book.authors[0] : "";

  return (
    <React.Fragment>
      <section className="bp__top-menu">
        <div className="bp__dropdown">
          <div>
            <button
              type="button"
              id="backButton"
              onClick={handleClearBook}
              className="hidden-button"
            >
              <svg className="bp__dropdown--menu">
                <use href="./img/symbol-defs.svg#icon-arrow-left2" />
              </svg>
              <span className="bp__dropdown--author">Back</span>
            </button>
          </div>
        </div>
      </section>
      <section className="bp__side-menu">
        <div className="bp__side-quote">
          <svg className="bp__icon--quote">
            <use href="./img/symbol-defs.svg#icon-quotes-left" />
          </svg>
          <span className="bp__quote">{textSnippet}</span>
          <span className="bp__quote--author">{author}</span>
        </div>
      </section>
      <section className={cn("bp__content", "bp__book-detail-section")}>
        <div className="bp__book-detail-wrapper">
          <div
            id="bookDetail"
            className={cn("bp__book-detail book-slide", {
              "bp__book-detail--preview": showPreview
            })}
          >
            <h1 className="bp__book-detail-title">{bookTitle}</h1>
            <p className="bp__book-detail-author">{bookAuthor}</p>
            <div className="bp__book-publisher-grid">
              <div className="bp__book-detail-publishers">
                <span className="bp__book-detail-label">
                  Originally Published
                </span>
                <span className="bp__book-detail-value">{publishDate}</span>
              </div>
              <div className="bp__book-detail-publishers">
                <span className="bp__book-detail-label">Publisher</span>
                <span className="bp__book-detail-value">{publisher}</span>
              </div>
            </div>

            <span className="bp__book-detail-label">Categories</span>
            <span className="bp__book-detail-value">{categories}</span>
          </div>
          <div
            className={cn("bp__book-preview-menu book-slide", {
              "bp__book-preview-menu--preview": showPreview
            })}
          >
            <div className="bp__book-preview-options">
              <div className="bp__menu-option">
                <svg className="bp__icon--save bp__icon">
                  <use href="./img/symbol-defs.svg#icon-th-bookmark" />
                </svg>
                <span className="bp__menu-label">Save</span>
              </div>
              <div
                className="bp__menu-option"
                onClick={() => togglePreview(!showPreview)}
              >
                <svg className="bp__icon--preview bp__icon">
                  <use href="./img/symbol-defs.svg#icon-play2" />
                </svg>
                <a href={showPreview ? "#bookExcerpt" : "#bookDetail"}>
                  <span className="bp__menu-label">Preview</span>
                </a>
              </div>
              <div className="bp__menu-option">
                <svg className="bp__icon--get-book bp__icon">
                  <use href="./img/symbol-defs.svg#icon-cart" />
                </svg>
                <span className="bp__menu-label">Get Book</span>
              </div>
            </div>
          </div>
          <div
            id="bookExcerpt"
            className={cn("bp__book-excerpt book-slide", {
              "bp__book-excerpt--preview": showPreview
            })}
          >
            <h1 className="bp__book-excerpt-title">Excerpt </h1>
            <span className="bp__book-detail-label">Book 1 - Chapter 1</span>
            <p>Book text here</p>
            <a
              className="bp__link--excerpt"
              href={previewLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              See full exerpt
            </a>
          </div>
        </div>
      </section>
    </React.Fragment>
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
      style={{
        zIndex: 5
      }}
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
  const [currentBookId, setBookId] = React.useState(null);
  const [showPulse, togglePulse] = React.useState(null);
  const {
    bookResponseData,
    handleBookClick,
    hasCurrentBook,
    currentBook
  } = props;

  React.useEffect(() => {
    togglePulse(true);

    return () => {
      togglePulse(false);
    };
  }, [currentBookId, showPulse]);
  return (
    <section
      className={cn("bp__content", " bp__content--list-view", {
        "bp__content--hidden": hasCurrentBook
      })}
    >
      <h1 className="bp__title">Most Popular Picks</h1>
      <div
        className={cn("bp__book-list", {
          "bp__book-list--hidden": hasCurrentBook
        })}
      >
        {bookResponseData.items.map((bookResponse, index) => {
          const book = bookResponse.volumeInfo;
          const isCurrentbook =
            currentBook && currentBook.id === bookResponse.id;
          const horizontalShift = 20.3333 - 31.556 * index;

          const currentStyle = isCurrentbook
            ? {
                transform: `scale(1.2) translate(${horizontalShift}rem, -1.66667vh)`
              }
            : {};
          return (
            <div
              className={cn("bp__book-card", {
                "bp__book-card--selected": isCurrentbook,
                "bp__book-card--hidden": !isCurrentbook && hasCurrentBook
              })}
              style={currentStyle}
            >
              <div className="bp__book-img--border">
                <img
                  src={book.imageLinks.smallThumbnail}
                  alt={`${book.title}`}
                  onClick={() => {
                    setBookId(bookResponse.id);
                    handleBookClick(bookResponse);
                  }}
                  className={cn("bp__book-img", {
                    "bp__book-img--active": isCurrentbook
                  })}
                />
                <span
                  className={cn({
                    "bp__book-img--pulse":
                      showPulse && bookResponse.id === currentBookId
                  })}
                ></span>
              </div>

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
