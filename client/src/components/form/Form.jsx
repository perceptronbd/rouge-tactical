import React from "react";
import { MdPostAdd } from "react-icons/md";
import { Text } from "../texts/Text";
import { Button } from "../buttons/Button";
import { SelectInput } from "../inputs/SelectInput";
import { FormInput } from "../inputs/FormInput";

const generateInputs = (inputFields, handleChange) => {
  return inputFields.map((input) => {
    if (input.selectOpts) {
      return <SelectInput key={input.id} {...input} onChange={handleChange} />;
    } else {
      return <FormInput key={input.id} {...input} onChange={handleChange} />;
    }
  });
};

export const Form = ({ formTitle, inputFields, handleChange, onSubmit }) => {
  const inputComponents = generateInputs(inputFields, handleChange);

  return (
    <>
      <form className="h-full w-full flex flex-col justify-between">
        <section className="flex h-10 mb-4 justify-between items-center">
          <Text variant={"h3"} type={"bold"}>
            {formTitle}
          </Text>
        </section>
        <div className="grid grid-cols-2 gap-x-8 gap-y-0 mb-8 items-center">
          {inputComponents}
        </div>
        <div className="flex gap-4">
          <Button
            icon={MdPostAdd}
            className={"m-0"}
            variant={"success"}
            onClick={onSubmit}
          >
            Add
          </Button>
        </div>
      </form>
    </>
  );
};
