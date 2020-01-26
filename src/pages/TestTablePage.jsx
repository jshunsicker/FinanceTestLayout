import React from "react";
import TestTable from "../components/TestTable";
import { Provider as BookProvider } from "../context/BookContext";
export default function TestTablePage() {
  return (
    <BookProvider>
      <section className="content table-page">
        <h1 className="content__title">Test CSS Table with Grid</h1>
        <section className="content__lists">
          <TestTable />
        </section>
      </section>
    </BookProvider>
  );
}
