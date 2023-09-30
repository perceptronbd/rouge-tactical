import React, { useState } from "react";
import {
  Checkbox,
  FormInput,
  SearchInput,
  SelectInput,
  Container,
  Separator,
  IncDecNum,
} from "../components";
import { Dropdown } from "./inputs/Dropdown";

const options = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

export const Components = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [value, setValue] = useState(0);

  const changeQuantity = (newValue) => {
    setValue(newValue);
  };

  const handleDropdownChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <Container>
      <Checkbox label="Checkbox" />
      <FormInput label="Form Input" id={"form"} />

      <Separator />
      <SearchInput label="Search Input" />

      <Separator />
      <SelectInput
        label="Select Input"
        selectOpts={[
          { id: 1, name: "Option 1" },
          { id: 2, name: "Option 2" },
        ]}
      />
      <Dropdown
        id="customDropdown"
        name="customDropdown"
        label="Custom Dropdown"
        options={options}
        selectedValue={selectedOption}
        onChange={handleDropdownChange}
        className="my-3"
        errorMessage="Please select an option"
      />
      <IncDecNum value={value} onChange={changeQuantity} />
    </Container>
  );
};
