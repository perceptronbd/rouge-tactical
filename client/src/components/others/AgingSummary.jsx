import React from "react";

export const AgingSummary = ({ data, agingSummary, loading }) => {
  const calculateTotal = () => {
    const total =
      agingSummary["current"] +
      agingSummary["0 - 30"] +
      agingSummary["31 - 60"] +
      agingSummary["61 - 90"] +
      agingSummary["> 90"];
    return total.toFixed(2);
  };

  return (
    <section className="px-4 py-2 flex flex-col gap-2 w-80 h-full 3xl:h-56 border rounded">
      <div>Aging Summary</div>
      {loading ? (
        <div className="w-full h-40 flex justify-center items-center">
          loading...
        </div>
      ) : agingSummary ? (
        <div className="bg-background p-2 rounded">
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">Current</p>
            <p>
              {agingSummary["current"] <= 0
                ? ". . ."
                : `$ ${agingSummary["current"].toFixed(2)}`}
            </p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">0 - 30</p>
            <p>
              {agingSummary["0 - 30"] === 0
                ? ". . ."
                : `$ ${agingSummary["0 - 30"].toFixed(2)}`}
            </p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">31 - 60</p>
            <p>
              {agingSummary["31 - 60"] === 0
                ? ". . ."
                : `$ ${agingSummary["31 - 60"].toFixed(2)}`}
            </p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">61 - 90</p>
            <p>
              {agingSummary["61 - 90"] === 0
                ? ". . ."
                : `$ ${agingSummary["61 - 90"].toFixed(2)}`}
            </p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">{`> 90`}</p>
            <p>
              {agingSummary["> 90"] === 0
                ? ". . ."
                : `$ ${agingSummary["> 90"].toFixed(2)}`}
            </p>
          </div>
          <div className="flex gap-4 justify-between border-b-2 font-bold">
            <p className="w-16 text-textColor">{`Total`}</p>
            <p>{` ${calculateTotal()}`}</p>
          </div>
        </div>
      ) : (
        <div className="bg-background p-2 rounded">
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">Current</p>
            <p>. . .</p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">0 - 30</p>
            <p>. . .</p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">31 - 60</p>
            <p>. . .</p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">61 - 90</p>
            <p>. . .</p>
          </div>
          <div className="flex gap-4 justify-between border-b-2">
            <p className="w-16 text-textColor-light">{`> 90`}</p>
            <p>. . .</p>
          </div>
          <div className="flex gap-4 justify-between border-b-2 font-bold">
            <p className="w-16 text-textColor-light">{`Total`}</p>
            <p>. . .</p>
          </div>
        </div>
      )}
    </section>
  );
};
