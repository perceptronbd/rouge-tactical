import React from "react";
import { FiLink, FiMail, FiMap, FiPhoneCall } from "react-icons/fi";
import { Text } from "../../components";
import { capitalizeFirstLetter, formatDate } from "../../utils";
import { vendorData } from "../../mock/vendor";

export const InvoicePreview = ({ data }) => {
  return (
    <>
      {/* Logo & Contact */}
      <div className="col-span-2 h-52 flex justify-between items-center bg-[#4b4b4b] rounded-md">
        <img
          src="/assets/logo-bg.svg"
          alt="Rogue Tactical"
          className="w-72 rounded"
        />
        <section className="h-full bg-accent-secondary flex items-center rounded-tr-md rounded-br-md">
          <div className="bg-accent-secondary rounded-md px-6 py-2 text-white w-fit">
            <span className="flex justify-start items-center gap-2 pb-2">
              <FiMail className="font-bold w-5 h-5" />{" "}
              <Text className={"text-sm"}> rachel@rogue-guns.com</Text>
            </span>
            <span className="flex justify-start items-center gap-2 pb-2">
              <FiPhoneCall className="font-bold w-5 h-5" />{" "}
              <Text className={"text-sm"}> 619-600-1024</Text>
            </span>
            <span className="flex justify-start items-center gap-2 pb-2">
              <FiLink className="font-bold w-5 h-5" />{" "}
              <Text className={"text-sm"}> www.rogue-tac.com</Text>
            </span>
            <span className="flex justify-start items-start gap-2 pb-2">
              <FiMap className="font-bold w-5 h-5" />{" "}
              <Text className={"w-60 text-sm"}>
                {" "}
                Rogue Tactical - 07 FFL Precision Firearm Manufacturer 6861
                Nancy Ridge Dr. Suite B San Diego, CA 92121
              </Text>
            </span>
          </div>
        </section>
      </div>
      {/* Invoice Number & Date */}
      <section className="flex gap-3 rounded-md bg-accent-tertiary-light text-white px-4 py-2 w-fit">
        <Text type={"thin"}>Invoice: </Text>
        <Text type={"bold"}>{data.invoiceNumber}</Text>
      </section>
      <section className="flex justify-end">
        {" "}
        <div className="flex gap-2 border rounded-md px-4 py-2 w-fit">
          <Text type={"thin"}>Date:</Text>
          <Text type={"bold"}>{formatDate(data.date)}</Text>
        </div>
      </section>

      {/* Vendor */}
      <section className="h-60 w-fit">
        <Text type={"bold"} variant={"h3"} className={"pb-2"}>
          {vendorData.name}
        </Text>
        <span className="flex justify-start items-center gap-2 pb-2">
          <FiPhoneCall className="font-bold w-4 h-4" />{" "}
          <Text> 619-600-1024</Text>
        </span>
        <span className="flex justify-start items-center gap-2 pb-2">
          <FiLink className="font-bold w-4 h-4" />{" "}
          <Text> www.rogue-tac.com</Text>
        </span>
        <span className="flex justify-start items-start gap-2 pb-2">
          <FiMap className="font-bold w-4 h-4" />{" "}
          <Text className={"w-60"}>
            {" "}
            Rogue Tactical - 07 FFL Precision Firearm Manufacturer 6861 Nancy
            Ridge Dr. Suite B San Diego, CA 92121
          </Text>
        </span>
      </section>
      <section className="w-full h-full" />
      <section className="col-span-2 border rounded-md flex flex-col p-2">
        <div className="grid grid-cols-2 gap-2 p-2 border-b">
          <Text type={"thin"}>Item:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{data.item}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b">
          <Text type={"thin"}>Quantity:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{data.quantity}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Total Amount:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{data.totalAmount}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Deposit Paid:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{data.depositedAmount}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Remaining Amount:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{data.totalAmount - data.depositedAmount}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Status:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{capitalizeFirstLetter(data.status)}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b">
          <Text type={"thin"}>Date Closed:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>
              {data.updatedAt === "NaN-NaN-NaN" ? "- - -" : data.updatedAt}
            </Text>
          </div>
        </div>
      </section>
    </>
  );
};
