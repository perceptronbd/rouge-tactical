import React from "react";
import { FiLink, FiMail, FiMap, FiPhoneCall } from "react-icons/fi";
import { Text } from "../../components";
import { capitalizeFirstLetter, formatDate } from "../../utils";

export const PurchasePreview = ({ allVendors, transactionDetails }) => {
  const vendor = allVendors.find(
    (vendor) => vendor.name === transactionDetails.vendorName
  );

  console.log("transactionDetails", transactionDetails);
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
      {/* Purchase Number & Date */}
      <section className="flex gap-3 rounded-md bg-accent-tertiary-light text-white px-4 py-2 w-fit">
        <Text type={"thin"}>PO #: </Text>
        <Text type={"bold"}>{transactionDetails.orderNumber}</Text>
      </section>
      <section className="flex justify-end">
        {" "}
        <div className="flex gap-2 border rounded-md px-4 py-2 w-fit">
          <Text type={"thin"}>Date:</Text>
          <Text type={"bold"}>{formatDate(transactionDetails.date)}</Text>
        </div>
      </section>

      {/* Vendor */}
      <section className="h-60 w-fit">
        <Text
          type={"bold"}
          variant={"h3"}
          className={"pb-2"}
        >
          {capitalizeFirstLetter(vendor.name)}
        </Text>
        <span className="flex justify-start items-center gap-2 pb-2">
          <FiPhoneCall className="font-bold w-4 h-4" />{" "}
          <Text> {vendor.phone}</Text>
        </span>
        <span className="flex justify-start items-center gap-2 pb-2">
          <FiLink className="font-bold w-4 h-4" /> <Text>{vendor.email}</Text>
        </span>
        <span className="flex justify-start items-start gap-2 pb-2">
          <FiMap className="font-bold w-4 h-4" />{" "}
          <Text className={"w-60"}>{vendor.address}</Text>
        </span>
      </section>
      <section className="w-full h-full" />
      <section className="col-span-2 border rounded-md flex flex-col p-2 ">
        <section className="bg-background">
          <table className="w-full">
            <thead className="bg-neutral-300 h-8">
              <tr>
                <th className="text-left p-2">
                  <Text>Item(s)</Text>
                </th>
                <th>
                  <Text>Quantity</Text>
                </th>
                <th>
                  <Text>Unit Cost</Text>
                </th>
                <th className="text-right p-2">
                  <Text>Sub Total</Text>
                </th>
              </tr>
            </thead>
            <tbody>
              {transactionDetails.items.map((item, index) => (
                <tr
                  key={index}
                  className="h-10 border-b"
                >
                  <td className="text-left p-2">
                    <Text type={"thin"}>{item.item}</Text>
                  </td>
                  <td className="text-center p-2">
                    <Text type={"bold"}>{item.quantity}</Text>
                  </td>
                  <td className="text-center p-2">
                    <Text type={"bold"}>{item.unitCost}</Text>
                  </td>
                  <td className="text-right p-2">
                    <Text type={"bold"}>{item.subTotal}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Total Amount:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{transactionDetails.totalAmount}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Deposit Paid:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{transactionDetails.depositAmount}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Remaining Amount:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>{transactionDetails.remainingAmount}</Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b ">
          <Text type={"thin"}>Status:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>
              {transactionDetails.status === "close" ? "Closed" : "Open"}
            </Text>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 border-b">
          <Text type={"thin"}>Date Closed:</Text>
          <div className="flex justify-end">
            <Text type={"bold"}>
              {transactionDetails.status === "open"
                ? "- - -"
                : formatDate(transactionDetails.updateAt)}
            </Text>
          </div>
        </div>
      </section>
    </>
  );
};
