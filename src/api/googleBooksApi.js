const bookSearchUrl = `gbooks/v1/volumes?`;
/**
 * 
    intitle: Returns results where the text following this keyword is found in the title.
    inauthor: Returns results where the text following this keyword is found in the author.
    inpublisher: Returns results where the text following this keyword is found in the publisher.
    subject: Returns results where the text following this keyword is listed in the category list of the volume.
    isbn: Returns results where the text following this keyword is the ISBN number.
    lccn: Returns results where the text following this keyword is the Library of Congress Control Number.
    oclc: Returns results where the text following this keyword is the Online Computer Library Center number.


    Pagination

    You can paginate the volumes list by specifying two values in the parameters for the request:

    startIndex - The position in the collection at which to start. The index of the first item is 0.
    maxResults - The maximum number of results to return. The default is 10, and the maximum allowable value is 40.

*
 */

export const searchBooks = async ({ title, author, isbn, text }) => {
  const url = `${bookSearchUrl}q=${text}${author ? `+inauthor:${author}` : ""}${
    title ? `+intitle:${title}` : ""
  }${isbn ? `+isbn:${isbn}` : ""}&orderBy=relevance&langRestrict=en&printType=Books`;

  const response = await fetch(url)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .then(json => json)
    .catch(error => {
      console.error(error);
    });

  return response;
};
