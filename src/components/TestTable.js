import React, { useState, useEffect } from "react";
import { data } from "../data/bookdata";

const columns = [
  {
    label: "Author",
    accessor: "author"
  },
  {
    label: "Publisher",
    accessor: "publisher"
  },
  {
    label: "Title",
    accessor: "title"
  },
  {
    label: "Description",
    accessor: "description"
  },
  {
    label: "Price",
    accessor: "price"
  }
];

export default function TestTable() {
  const [columnWidthMap, setColumnWidthMap] = useState([]);
  const filteredData = data.booksByList.map(book => book.bookDetails[0]);

  useEffect(() => {
    const rowSizeMap = [];
    columns.forEach(() => {
      rowSizeMap.push("20rem");
    });
    setColumnWidthMap(rowSizeMap);
  }, [columns]);

  // const asString = columnWidthMap.map(x => `minmax(10rem, ${x})`).join(" ");

  const asString = columnWidthMap.map(x => ` minmax(10rem, ${x})`).join(" ");

  console.log("as string:", asString);

  const rowStyle = {
    gridAutoColumns: asString
  };

  function resizeTheseColumns(index) {
    window.addEventListener("mouseup", removeListeners);
    window.addEventListener("mousemove", resize);

    function removeListeners() {
      console.log("remove listner called");
      window.removeEventListener("mousemove", resize);
    }

    function resize(event) {
      console.log("i:", index);
      const element = document.querySelector(`#th${index}`);
      console.log("element:", element);
      if (element) {
        let width = event.x - element.getBoundingClientRect().left + "px";

        let newColumns = [...columnWidthMap];
        newColumns[index] = width;
        setColumnWidthMap(newColumns);
      }
    }
  }

  return (
    <div className="table__container">
      <div className="gt__thead gt__thr" style={rowStyle}>
        {columns.map((column, i) => (
          <div id={`th${i}`} key={`th${column.label}`} className="gt__th">
            {column.label}
            <span
              className="gt__th-resizer"
              onMouseDown={() => resizeTheseColumns(i)}
            />
          </div>
        ))}
      </div>

      {filteredData.map((rows, i) => {
        return (
          <div
            key={`row${rows.primary_isbn10}`}
            className="gt__tr"
            style={rowStyle}
          >
            {columns.map((column, i) => {
              return (
                <div key={`td${column.label}-${i}`} className="gt__td">
                  {rows[column.accessor]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
