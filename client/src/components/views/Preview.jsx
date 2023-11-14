import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FiPrinter, FiDownload } from "react-icons/fi";
import { Button } from "../buttons/Button";
import { AiOutlineCloseCircle } from "react-icons/ai";

export const Preview = ({ isOpen, closePreview, data, children }) => {
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    console.log(data);
    if (isOpen)
      setTimeout(() => {
        setShowPreview(true);
      }, 5);
  }, [isOpen, data]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const downloadPDF = () => {
    const capture = document.getElementById("download-preview");

    html2canvas(capture, { scale: 4 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const doc = new jsPDF("p", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "JPEG", 0, 0, componentWidth, componentHeight);
      doc.save(
        `${
          data.invoiceNumber
            ? "Invoice-" + data.invoiceNumber
            : "PO-" + data.orderNumber
        }.pdf`
      );
    });
  };

  const handleClose = () => {
    closePreview();
    setShowPreview(false);
  };

  if (!isOpen) return null;

  return (
    <article className="bg-accent-secondary bg-opacity-20 fixed inset-0 flex flex-col items-center justify-center z-50 scale-100 transition-all ease-in-out duration-300">
      <article
        className={`w-[750px] 3xl:w-[850px] h-full felx flex-col gap-2 p-2 ${
          showPreview ? "scale-100" : "scale-0"
        } transition-all ease-in-out duration-300`}
      >
        <div className="bg-white rounded-lg shadow-lg p-0 w-full h-[98%] overflow-y-scroll">
          <section className="w-full px-8 pt-8 flex justify-end gap-2 ">
            <Button
              icon={AiOutlineCloseCircle}
              variant={"danger"}
              className={"m-0 w-8 h-8"}
              onClick={handleClose}
            />
          </section>
          <div
            ref={componentRef}
            className="grid grid-cols-2 gap-y-4 p-8"
            id="download-preview"
          >
            {children}
          </div>
          <div className="w-[500px] flex gap-2 px-8 pb-8">
            <Button
              icon={FiPrinter}
              className={"m-0 w-32"}
              onClick={handlePrint}
            >
              Print
            </Button>
            <Button
              icon={FiDownload}
              variant={"highlight"}
              className={"m-0 w-32"}
              onClick={downloadPDF}
            >
              Download
            </Button>
          </div>
        </div>
      </article>
    </article>
  );
};
