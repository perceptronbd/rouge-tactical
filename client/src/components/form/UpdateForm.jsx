import React, { useEffect } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Text } from "../texts/Text";
import { Button } from "../buttons/Button";
import { SelectInput } from "../inputs/SelectInput";
import { FormInput } from "../inputs/FormInput";

const generateInputs = (inputFields, data, handleChange) => {
  return inputFields.map((input) => {
    const nameParts = input.name.split(".");
    const value = nameParts.reduce((obj, part) => (obj ? obj[part] : ""), data);

    if (input.selectOpts) {
      return (
        <SelectInput
          key={input.id}
          {...input}
          onChange={handleChange}
          value={value}
        />
      );
    } else {
      return (
        <FormInput
          key={input.id}
          {...input}
          onChange={handleChange}
          value={value}
        />
      );
    }
  });
};

export const UpdateForm = ({
  formTitle,
  inputFields,
  data,
  handleChange,
  onSubmit,
}) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  const inputComponents = generateInputs(inputFields, data, handleChange);

  return (
    <>
      <form
        className="h-full w-full flex flex-col justify-between"
        onSubmit={onSubmit}
      >
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
            icon={BiMessageSquareEdit}
            className={"m-0"}
            variant={"success"}
          >
            Update
          </Button>
          <Button icon={MdDeleteOutline} className={"m-0"} variant={"danger"}>
            Delete
          </Button>
        </div>
      </form>
    </>
  );
};
