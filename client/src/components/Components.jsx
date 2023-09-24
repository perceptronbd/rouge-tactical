import React from "react";
import {
  Checkbox,
  FormInput,
  SearchInput,
  SelectInput,
  Container,
} from "../components";

export const Components = () => {
  return (
    <Container>
      <Checkbox label="Checkbox" />
      <FormInput label="Form Input" id={"form"} />
      <SearchInput label="Search Input" />
      <SelectInput
        label="Select Input"
        selectOpts={[
          { id: 1, name: "Option 1" },
          { id: 2, name: "Option 2" },
        ]}
      />
    </Container>
  );
};
