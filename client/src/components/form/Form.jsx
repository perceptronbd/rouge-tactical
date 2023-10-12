import React from "react";
import { Text } from "../texts/Text";
import { Button } from "../buttons/Button";
import { SelectInput } from "../inputs/SelectInput";
import { FormInput } from "../inputs/FormInput";
import { Container } from "../views/Container";
import { icons } from "react-icons/lib";

export const Form = ({
  formTitle,
  icon,
  inputFields,
  onSubmit,
  handleChange,
}) => {
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="h-full w-full flex flex-col justify-between"
      >
        <section className="flex h-10 justify-between items-center">
          <Text variant={"h3"} type={"bold"}>
            {formTitle}
          </Text>
        </section>
        <div className="grid grid-cols-2 gap-2 my-3 3xl:mb-52 mb-20 items-center">
          {inputFields.map((input) => {
            return input.selectOpts ? (
              <SelectInput {...input} key={input.id} onChange={handleChange} />
            ) : (
              <FormInput
                key={input.id}
                {...input}
                onChange={handleChange}
                className={"my-3"}
              />
            );
          })}
        </div>
        <Button icon={icon}>Add</Button>
      </form>
    </>
  );
};
