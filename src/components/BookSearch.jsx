import React from "react";
import { fetchBookData } from "../api/goodREadsApi";
import { searchBooks } from "../api/googleBooksApi";
import styled from "styled-components";
import { tadWilliamsBookData } from "../data/tadWilliamsBookData";

export default function BookSearch() {
  const [bookSearchValue, setBookSearchValue] = React.useState("");
  const [bookResponseData, setBookResponseData] = React.useState(
    tadWilliamsBookData.items
  );

  function handleSearchInput(e) {
    const { value } = e.target;
    setBookSearchValue(value);
  }

  async function handleSearchClick() {
    const goodreadsdata = await fetchBookData(bookSearchValue);
    const data = await searchBooks({ text: bookSearchValue });
    if (data.items) {
      setBookResponseData(data.items);
    }
    console.log("good reads:", JSON.stringify(goodreadsdata.GoodreadsResponse));
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleSearchClick();
  }
  return (
    <BooksSearch className="book-search">
      <div style={{ display: "flex" }}>
        <form id="searchForm" onSubmit={handleSubmit}>
          <fieldset style={{ border: "none" }}>
            <Label htmlFor="bookSearch">
              Find a book
              <Input
                id="bookSearch"
                style={{
                  display: "block",
                  padding: ".5rem",
                  borderRadius: "5px",
                  border: "1px solid $color-primary"
                }}
                type="text"
                value={bookSearchValue}
                name="bookSearch"
                onChange={handleSearchInput}
              />
            </Label>
          </fieldset>
        </form>
        <Button className="button" type="button" onClick={handleSearchClick}>
          Search
        </Button>
      </div>

      <BooksContainer className="book-search__results">
        {bookResponseData.map(googleBook => {
          return (
            <BookPanel className="book-panel" key={googleBook.id}>
              <h3 className="book-panel__title">
                {googleBook.volumeInfo.title}
              </h3>
              <h4 className="book-panel__author">
                <em>{googleBook.volumeInfo.authors[0]}</em>
              </h4>
              <div className="book-panel__image-wrapper">
                {googleBook.volumeInfo.imageLinks && (
                  <Image
                    className="book-panel__image"
                    alt={googleBook.volumeInfo.title}
                    src={
                      googleBook.volumeInfo.imageLinks.thumbnail ||
                      googleBook.volumeInfo.imageLinks.smallThumbnail
                    }
                  />
                )}
              </div>
              <div className="book-panel__description">
                <p className="book-panel__description-text">
                  {googleBook.volumeInfo.description}
                </p>
              </div>
              <div className="book-panel__links">
                <div className="book-panel__rating">
                  {googleBook.volumeInfo.averageRating}
                </div>
                <div className="book-panel__preview">
                  <a
                    href={googleBook.volumeInfo.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </BookPanel>
          );
        })}
      </BooksContainer>
    </BooksSearch>
  );
}

export const Button = styled.button`
  display: inline-block;
  border-radius: 5rem;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: var(--color-primary);
  color: var(--color-grey-1);
  border: 2px solid transparent;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  color: var(--color-secondary);
`;

export const Label = styled.label`
  font-size: 1.7rem;
  color: var(--color-secondary);
  display: block;
`;

export const Input = styled.input`
  display: block;
  padding: 0.5rem;
  borderradius: 5px;
  border: 1px solid $color-black;
  background: var(--color-dark-grey);
  color: var(--color-grey-light-1);
`;

export const BookPanel = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  color: var(--color-bg-light);
  padding: 2rem;
`;
export const Image = styled.img`
  max-height: 50rem;
  max-width: 20rem;
  float: left;
`;

export const BooksContainer = styled.section`
  display: flex;
  flex-direction: column;
  ${BookPanel}:nth-child(2n) {
    align-items: flex-end;
    background: var(--color-grey-dark-2);
    color: var(--color-bg-dark);
    ${Image}: float-right;
  }
`;

export const BooksSearch = styled.div`
  margin: 2rem 5rem;
`;
