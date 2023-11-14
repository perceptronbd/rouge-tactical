import { useState, useEffect } from "react";

export const useDataStates = ({ data, vendorData }) => {
  //data states
  const [agingSummary, setAgingSummary] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);
  const [tableData, setTableData] = useState([]);
  //loading states
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingAgingSummary, setLoadingAgingSummary] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      const vendor = vendorData.find((vendor) => vendor.id === selectedVendor);
      if (!vendor) {
        setLoading(false);
        setTableData(data);
        setSelectedVendor(null);
        setVendorDetails(null);
        return;
      }
      setLoading(false);
      setVendorDetails(vendor);
    }, 1000);
  }, [selectedVendor, data, vendorData]);

  useEffect(() => {
    if (vendorDetails) {
      setLoadingTable(true);
      setLoadingAgingSummary(true);
      setTimeout(() => {
        const invoice = data.filter(
          (invoice) => invoice.vendor === vendorDetails.name
        );
        setLoadingTable(false);
        setLoadingAgingSummary(false);
        setTableData(invoice);

        const currentDate = new Date();
        const summary = {
          current: 0,
          "0 - 30": 0,
          "31 - 60": 0,
          "61 - 90": 0,
          "> 90": 0,
        };

        invoice.forEach((item) => {
          const updatedAt = new Date(item.date);
          const daysDifference = Math.floor(
            (currentDate - updatedAt) / (1000 * 60 * 60 * 24)
          );

          if (daysDifference <= 1) {
            summary["current"] += item.totalAmount - item.depositedAmount;
          } else if (daysDifference <= 30) {
            summary["0 - 30"] += item.totalAmount - item.depositedAmount;
          } else if (daysDifference <= 60) {
            summary["31 - 60"] += item.totalAmount - item.depositedAmount;
          } else if (daysDifference <= 90) {
            summary["61 - 90"] += item.totalAmount - item.depositedAmount;
          } else {
            summary["> 90"] += item.totalAmount - item.depositedAmount;
          }
        });

        setAgingSummary(summary);
      }, 1000);
    }
  }, [vendorDetails, data]);

  const handleVendorChange = (event) => {
    setSelectedVendor(parseInt(event.target.value));
  };

  const handleChange = (e) => {
    setTransactionDetails({
      ...transactionDetails,
      [e.target.name]: e.target.value,
    });
  };

  return {
    transactionDetails,
    selectedVendor,
    vendorDetails,
    tableData,
    agingSummary,
    loading,
    loadingTable,
    loadingAgingSummary,
    setTransactionDetails,
    handleVendorChange,
    handleChange,
  };
};
