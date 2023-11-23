import { useState, useEffect } from "react";
import { getAllVendors } from "../api";

export const useDataStates = ({ data }) => {
  //data states
  const [agingSummary, setAgingSummary] = useState(null);
  const [allVendors, setAllVendors] = useState([]);
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
    const vendor = allVendors.find((vendor) => {
      return vendor.id === selectedVendor;
    });
    if (!vendor) {
      setLoading(false);
      setTableData(data);
      setSelectedVendor(null);
      setVendorDetails(null);
      return;
    }
    setLoading(false);
    setVendorDetails(vendor);
  }, [selectedVendor, data, allVendors]);

  useEffect(() => {
    const fetchAllVendors = async () => {
      try {
        getAllVendors().then((res) => {
          setAllVendors(res.data.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllVendors();
  }, []);

  useEffect(() => {
    if (vendorDetails) {
      setLoadingTable(true);
      setLoadingAgingSummary(true);
      setTimeout(() => {
        const transaction = data.filter((transaction) => {
          return transaction.vendorName === vendorDetails.name;
        });
        setLoadingTable(false);
        setLoadingAgingSummary(false);
        setTableData(transaction);

        const currentDate = new Date();
        const summary = {
          current: 0,
          "0 - 30": 0,
          "31 - 60": 0,
          "61 - 90": 0,
          "> 90": 0,
        };

        transaction.forEach((item) => {
          const date = new Date(item.date);
          const daysDifference = Math.floor(
            (currentDate - date) / (1000 * 60 * 60 * 24)
          );

          if (daysDifference <= 1) {
            summary["current"] += parseFloat(item.remainingAmount);
          } else if (daysDifference <= 30) {
            summary["0 - 30"] += parseFloat(item.remainingAmount);
          } else if (daysDifference <= 60) {
            summary["31 - 60"] += parseFloat(item.remainingAmount);
          } else if (daysDifference <= 90) {
            summary["61 - 90"] += parseFloat(item.remainingAmount);
          } else {
            summary["> 90"] += parseFloat(item.remainingAmount);
          }
        });

        setAgingSummary(summary);
        console.log("summary:", summary);
      }, 500);
    }
  }, [vendorDetails, data]);

  const handleVendorChange = (event) => {
    setSelectedVendor(event.target.value);
  };

  const handleChange = (e) => {
    setTransactionDetails({
      ...transactionDetails,
      [e.target.name]: e.target.value,
    });
  };

  return {
    transactionDetails,
    allVendors,
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
