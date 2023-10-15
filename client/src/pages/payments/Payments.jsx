import React from "react";
import { Container, PieGraph, SelectInput } from "../../components";
import { serviceGraph } from "../../mock/service";

export const Payments = () => {
  const filterOpts = [
    { id: "7 days", name: "7 days" },
    { id: "14 days", name: "14 days" },
    { id: "1 month", name: "1 month" },
    { id: "3 months", name: "3 months" },
    { id: "6 months", name: "6 months" },
    { id: "1 year", name: "1 year" },
  ];

  const handleFilter = (e) => {
    console.log(e.target.value);
  };

  return (
    <Container>
      <section className="border rounded-md w-full p-2">
        <SelectInput
          id={"filter"}
          label={"filter"}
          name={"filter"}
          selectOpts={filterOpts}
          onChange={handleFilter}
        />
        <PieGraph data={serviceGraph} />
      </section>
    </Container>
  );
};
