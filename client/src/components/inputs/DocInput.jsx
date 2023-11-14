import React, { useState } from "react";
import { BsFiletypeDoc } from "react-icons/bs";
import { Text } from "../texts/Text";

export const DocInput = (props) => {
  const { id, onChange, className, errorMessage, label, file, ...inputProps } =
    props;
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImageName(selectedImage.name);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
      setImageName(null);
    }
    onChange(event);
  };

  return (
    <div className="my-2">
      <input
        id="image"
        name="image"
        accept="image/*"
        type="file"
        {...inputProps}
        onChange={handleImageChange}
        className="hidden"
      />

      <label
        htmlFor={"image"}
        className="flex justify-start p-2 3xl:justify-center items-center border w-72 h-32 3xl:w-80 3xl:h-80 rounded-lg text-base 3xl:text-3xl text-textColor-light hover:cursor-pointer"
      >
        <>
          {imagePreview ? (
            <section className="flex 3xl:flex-col items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-[122px] h-[122px] 3xl:w-[280px] 3xl:h-[280px] border rounded-lg 3xl:mb-2 mr-2"
              />
              <Text className={"text-sm"}>{imageName}</Text>
            </section>
          ) : (
            <>
              <BsFiletypeDoc className="w-[110px] h-[120px] 3xl:w-[50px] 3xl:h-[50px]" />
              Upload Document
            </>
          )}
        </>
      </label>
    </div>
  );
};
