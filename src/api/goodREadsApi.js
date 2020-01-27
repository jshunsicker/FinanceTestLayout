import { GOODREADS_API_KEY } from "../utils/constants";
import convert from "xml-js";
export const bookSearch = `/goodreads/search/index.xml?key=${GOODREADS_API_KEY}`;

export const fetchBookData = async request => {
  const urlWithParameters = `${bookSearch}&q=${request}`;
  const response = await fetch(urlWithParameters)
    .then(rawRes => rawRes.text())
    .then(text => convert.xml2js(text, { compact: true }))

    // .then(str => new window.DOMParser().parseFromString(str, "text/xml"))

    .catch(error => {
      console.error(error);
    });

  return response;
};
