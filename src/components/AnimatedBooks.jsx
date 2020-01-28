import React from "react";
import { tadWilliamsBookData } from "../data/tadWilliamsBookData";

const bookResponseData = tadWilliamsBookData;
export default function AnimatedBooks() {
  return (
    <div className="bp__container">
      <section className="bp__top-menu">
        <div className="bp__dropdown">
          <div>
            <svg className="bp__dropdown--menu">
              <use href="./img/symbol-defs.svg#icon-th-menu" />
            </svg>
          </div>

          <span className="bp__dropdown--author">Tad Williams</span>
        </div>

        <div className="bp__search-wrapper">
          <div className="bp__search-icon-wrapper">
            <svg className="bp__search-icon">
              <use href="./img/symbol-defs.svg#icon-search" />
            </svg>
          </div>
          <input className="bp__search-input" id="search" type="text" />
        </div>
      </section>
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
      <section className="bp__audible">
        <audio></audio>
      </section>
    </div>
    // <BooksContainer className="book-search__results">
    //   {bookResponseData.map(googleBook => {
    //     return (
    //       <BookPanel className="book-panel" key={googleBook.id}>
    //         <h3 className="book-panel__title">{googleBook.volumeInfo.title}</h3>
    //         <h4 className="book-panel__author">
    //           <em>{googleBook.volumeInfo.authors[0]}</em>
    //         </h4>
    //         <div className="book-panel__image-wrapper">
    //           {googleBook.volumeInfo.imageLinks && (
    //             <Image
    //               className="book-panel__image"
    //               alt={googleBook.volumeInfo.title}
    //               src={
    //                 googleBook.volumeInfo.imageLinks.thumbnail ||
    //                 googleBook.volumeInfo.imageLinks.smallThumbnail
    //               }
    //             />
    //           )}
    //         </div>
    //         <div className="book-panel__description">
    //           <p className="book-panel__description-text">
    //             {googleBook.volumeInfo.description}
    //           </p>
    //         </div>
    //         <div className="book-panel__links">
    //           <div className="book-panel__rating">
    //             {googleBook.volumeInfo.averageRating}
    //           </div>
    //           <div className="book-panel__preview">
    //             <a
    //               href={googleBook.volumeInfo.previewLink}
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               Preview
    //             </a>
    //           </div>
    //         </div>
    //       </BookPanel>
    //     );
    //   })}
    // </BooksContainer>
  );
}
