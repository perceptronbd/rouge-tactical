import React, { useEffect } from "react";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { Text } from "../texts/Text";
import { Button } from "../buttons/Button";
import { SelectInput } from "../inputs/SelectInput";
import { FormInput } from "../inputs/FormInput";

export const UpdateForm = ({
  formTitle,
  inputFields,
  onSubmit,
  handleChange,
  data,
}) => {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <form className="h-full w-full flex flex-col justify-between">
        <section className="flex h-10 justify-between items-center">
          <Text variant={"h3"} type={"bold"}>
            {formTitle}
          </Text>
        </section>
        <div className="grid grid-cols-2 gap-2 my-3 3xl:mb-52 mb-20 items-center">
          {inputFields.map((input) => {
            return input.selectOpts ? (
              <SelectInput
                {...input}
                key={input.id}
                onChange={handleChange}
                value={data[input.name]}
              />
            ) : (
              <FormInput
                key={input.id}
                {...input}
                onChange={handleChange}
                className={"my-3"}
                value={data[input.name]}
              />
            );
          })}
        </div>
        <div className="flex gap-4">
          <Button
            icon={BiMessageSquareEdit}
            className={"m-0"}
            variant={"success"}
            onClick={onSubmit}
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
