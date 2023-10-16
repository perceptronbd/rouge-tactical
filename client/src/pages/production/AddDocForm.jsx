import React, { useState } from "react";
import { Button, DocInput, Text } from "../../components";
import { AiOutlineFileDone } from "react-icons/ai";

export const AddDocForm = () => {
  const [file, setFile] = useState();

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form>
      <Text variant={"h3"}>Add Document</Text>
      <DocInput
        file={file}
        label={"Upload Document"}
        id={"document"}
        onChange={onChange}
      />
      <Button icon={AiOutlineFileDone} className={"w-40"} disabled={!file}>
        Submit
      </Button>
    </form>
  );
};
