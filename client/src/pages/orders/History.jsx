import React from "react";
import { Table } from "./Table";
import { historyData } from "../../mock/history";

export const History = () => {
  return (
    <section className="bg-foreground w-full h-full p-4 rounded">
      <Table data={historyData} />
    </section>
  );
};
