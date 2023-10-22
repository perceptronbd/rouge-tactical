import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FiMail, FiPhoneCall, FiLink, FiMap, FiPrinter } from "react-icons/fi";
import { Text } from "../texts/Text";
import { capitalizeFirstLetter } from "../../utils";
import { Button } from "../buttons/Button";

const invoiceData = {
  id: 1,
  date: "2023-09-09",
  invoiceNumber: "01-0001-23-09",
  vendor: "vendor 1",
  item: "Glove Refill (Black)",
  quantity: "10",
  totalAmount: "200",
  depositedAmount: "100",
  status: "open",
  updatedAt: "NaN-NaN-NaN",
};

const vendorData = {
  id: 1,
  name: "vendor 1",
  contact: "John Doe",
  phone: "1234567890",
  email: "j.doe@gmail.com",
  address: "1234 Fairy Ln, San Diego CA, 92110",
};

export const Preview = ({ ref }) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <article className="bg-accent-secondary bg-opacity-20 fixed inset-0 flex flex-col gap-y-1 items-center justify-center z-50 transition-all ease-in-out duration-300">
      <div className="bg-white rounded-lg shadow-lg p-0 w-[750px] h-[90%] overflow-y-scroll">
        <div ref={componentRef} className="grid grid-cols-2 gap-y-4 p-8">
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
            <Text type={"bold"}>{invoiceData.invoiceNumber}</Text>
          </section>
          <section className="flex justify-end">
            {" "}
            <div className="flex gap-2 border rounded-md px-4 py-2 w-fit">
              <Text type={"thin"}>Date:</Text>
              <Text type={"bold"}>{invoiceData.date}</Text>
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
                Rogue Tactical - 07 FFL Precision Firearm Manufacturer 6861
                Nancy Ridge Dr. Suite B San Diego, CA 92121
              </Text>
            </span>
          </section>
          <section className="w-full h-full" />
          <section className="col-span-2 border rounded-md flex flex-col p-2">
            <div className="grid grid-cols-2 gap-2 p-2 border-b">
              <Text type={"thin"}>Item:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>{invoiceData.item}</Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 border-b">
              <Text type={"thin"}>Quantity:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>{invoiceData.quantity}</Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 border-b ">
              <Text type={"thin"}>Total Amount:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>{invoiceData.totalAmount}</Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 border-b ">
              <Text type={"thin"}>Deposit Paid:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>{invoiceData.depositedAmount}</Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 border-b ">
              <Text type={"thin"}>Remaining Amount:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>
                  {invoiceData.totalAmount - invoiceData.depositedAmount}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 border-b ">
              <Text type={"thin"}>Status:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>
                  {capitalizeFirstLetter(invoiceData.status)}
                </Text>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2 border-b">
              <Text type={"thin"}>Date Closed:</Text>
              <div className="flex justify-end">
                <Text type={"bold"}>
                  {invoiceData.updatedAt === "NaN-NaN-NaN"
                    ? "- - -"
                    : invoiceData.updatedAt}
                </Text>
              </div>
            </div>
          </section>

          <section />
        </div>
      </div>
      <Button icon={FiPrinter} onClick={handlePrint} className={"m-2"}>
        Print
      </Button>
    </article>
  );
};
