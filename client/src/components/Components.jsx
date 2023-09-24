import React from "react";
import { Checkbox, FormInput, SearchInput, SelectInput } from "../components";

export const Components = () => {
  return (
    <div className="bg-foreground h-[95vh] flex flex-col gap-5 justify-center items-center m-4 rounded-md p-4">
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
    </div>
  );
};
