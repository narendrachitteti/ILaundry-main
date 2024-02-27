import React, { useState, useEffect } from "react";
import "./Bills.css";
import { GiClothes } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import currencyCodes from "currency-codes";
import Navbar from "../components/Navbar";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import jsPDF from "jspdf";

const currencies = currencyCodes.data;

const Bills = () => {
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [selectedPopupItem, setSelectedPopupItem] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [clientName, setClientName] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [rows, setRows] = useState([{ id: 1 }]);
  const [subTotal, setSubTotal] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [taxRate, setTaxRate] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [price, setprice] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0].code);
  const [selectedItems, setSelectedItems] = useState(
    Array(rows.length).fill("")
  );
  const [subtotals, setSubtotals] = useState(Array(rows.length).fill(0));
  const [quantities, setQuantities] = useState(Array(rows.length).fill(0));

  useEffect(() => {
    fetchLastInvoiceNumber();
  }, []);

  const fetchLastInvoiceNumber = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/last-invoice-number"
      );
      const data = await response.json();
      console.log(data);
      setInvoiceNumber(data.lastInvoiceNumber);
    } catch (error) {
      console.error("Error fetching last invoice number:", error);
    }
  };

  const services = [
    "Select a service",
    "Wash & Fold",
    "Wash & Iron",
    "Dry Cleaning",
    "Express Laundry Services",
    "Premium Laundry",
    "Steam Ironing",
  ];

  const itemsList = [
    "Select a Item",
    "Handkerchief",
    "Kids frock",
    "Kids pant",
    "Kids shirt",
    "Kids shorts",
    "Kids tshirt",
    "Pillow cover",
    "Undergarment men",
    "Undergarment women",
    "Pant",
    "Shirt",
    "Leggings",
    "Ladies top",
    "Kurti",
    "Shorts",
    "Pyjama",
    "Track pant",
    "Shawl",
    "Scarf",
    "Kameez",
    "Chudidar top",
    "Jeans",
    "Track shirt",
    "Skirt",
    "Trouser",
    "Tie",
    "Blouse",
    "Chudidar bottom",
    "Tshirt",
    "Kids designer frock",
    "Sweater",
    "Cushion cover large",
    "Cushion cover small",
    "Bath towel small",
    "Roll polish",
    "Hand gloves",
    "Cap",
    "Dhupatta",
    "Hand towel",
    "Table cloth large",
    "Sofa cover single seater",
    "Table cloth small",
    "Bath towel large",
    "Hoodies",
    "Apron",
    "Bedsheet double",
    "Bedsheet single",
    "Nylon/netted bottom",
    "Dhoti",
    "Lungi",
    "Jacket",
    "Jerkin",
    "Kurtha",
    "Kitchen towel",
    "Nighty",
    "Ladies long top",
    "Bathrobe",
    "Waist coat",
    "Curtain window with lining single",
    "Cotton saree",
    "Blazer",
    "Roll polish(with starch)",
    "Designer gown",
    "Designer saree",
    "Silk shirt",
    "Pullover",
    "Designer burkha",
    "Sofa cover double seater",
    "Floor mat normal",
    "Silk saree",
    "Silk dhoti",
    "Rain coat",
    "Designer bottom",
    "Blanket single",
    "Quilt single",
    "Designer kurti/kurtha",
    "Designer shervani",
    "Designer top",
    "Sofa cover three seater",
    "Quilt cover",
    "Quilt double",
    "Blanket double",
    "Curtain door single panel",
    "Bed protector",
  ];
  const itemPrices = {
    Handkerchief: 40.0,
    "Kids frock": 40.0,
    "Kids pant": 40.0,
    "Kids shirt": 40.0,
    "Kids shorts": 40.0,
    "Kids tshirt": 40.0,
    "Pillow cover": 40.0,
    "Undergarment men": 40.0,
    "Undergarment women": 40.0,
    Pant: 80.0,
    Shirt: 80.0,
    Leggings: 80.0,
    "Ladies top": 80.0,
    Kurti: 80.0,
    Shorts: 80.0,
    Pyjama: 80.0,
    "Track pant": 80.0,
    Shawl: 80.0,
    Scarf: 80.0,
    Kameez: 80.0,
    "Chudidar top": 80.0,
    Jeans: 80.0,
    "Track shirt": 80.0,
    Skirt: 80.0,
    Trouser: 80.0,
    Tie: 60.0,
    Blouse: 60.0,
    "Chudidar bottom": 80.0,
    Tshirt: 80.0,
    "Kids designer frock": 80.0,
    Sweater: 100.0,
    "Cushion cover large": 80.0,
    "Cushion cover small": 80.0,
    "Bath towel small": 70.0,
    "Roll polish": 90.0,
    "Hand gloves": 80.0,
    Cap: 80.0,
    Dhupatta: 80.0,
    "Hand towel": 80.0,
    "Table cloth large": 120.0,
    "Sofa cover single seater": 120.0,
    "Table cloth small": 120.0,
    "Bath towel large": 120.0,
    Hoodies: 120.0,
    Apron: 150.0,
    "Bedsheet double": 150.0,
    "Bedsheet single": 150.0,
    "Nylon/netted bottom": 150.0,
    Dhoti: 150.0,
    Lungi: 150.0,
    Jacket: 150.0,
    Jerkin: 150.0,
    Kurtha: 150.0,
    "Kitchen towel": 120.0,
    Nighty: 150.0,
    "Ladies long top": 150.0,
    Bathrobe: 150.0,
    "Waist coat": 150.0,
    "Curtain window with lining single": 150.0,
    "Cotton saree": 220.0,
    Blazer: 150.0,
    "Roll polish(with starch)": 250.0,
    "Designer gown": 250.0,
    "Designer saree": 250.0,
    "Silk shirt": 150.0,
    Pullover: 200.0,
    "Designer burkha": 250.0,
    "Sofa cover double seater": 200.0,
    "Floor mat normal": 300.0,
    "Silk saree": 200.0,
    "Silk dhoti": 200.0,
    "Rain coat": 220.0,
    "Designer bottom": 200.0,
    "Blanket single": 200.0,
    "Quilt single": 200.0,
    "Designer kurti/kurtha": 200.0,
    "Designer shervani": 200.0,
    "Designer top": 200.0,
    "Sofa cover three seater": 250.0,
    "Quilt cover": 250.0,
    "Quilt double": 300.0,
    "Blanket double": 250.0,
    "Curtain door single panel": 200.0,
    "Bed protector": 250.0,
  };

  const handleAddRow = () => {
    const newRow = { id: rows.length + 1 };
    setRows([...rows, newRow]);
    setSelectedItems([...selectedItems, ""]);
    setQuantities([...quantities, 0]);
    setSubtotals([...subtotals, 0]);
  };
  useEffect(() => {
    calculateTotal();
  }, [quantities, discountRate, taxRate]);

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
    console.log("Deleting row at index:", index);
    console.log("Current rows:", rows);
    console.log("Current selectedItems:", selectedItems);
    console.log("Current quantities:", quantities);
    console.log("Current subtotals:", subtotals);
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((_, i) => i !== index)
    );
    setQuantities((prevQuantities) =>
      prevQuantities.filter((_, i) => i !== index)
    );
    setSubtotals((prevSubtotals) =>
      prevSubtotals.filter((_, i) => i !== index)
    );
  };

  // const handleItemChange = (index, value) => {
  //   const updatedItems = [...selectedItems];
  //   updatedItems[index] = value;
  //   setSelectedItems(updatedItems);
  //   const defaultQuantity = "";
  //   const updatedQuantities = [...quantities];
  //   updatedQuantities[index] = defaultQuantity;
  //   setQuantities(updatedQuantities);
  //   setSelectedPopupItem(value);
  //   updateSubtotal(index, value, defaultQuantity);
  // };

  const handleItemChange = (index, value) => {
    const updatedItems = [...selectedItems];
    updatedItems[index] = value;
    setSelectedItems(updatedItems);
    setSelectedPopupItem(value);
    const defaultQuantity = "";
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = defaultQuantity;
    setQuantities(updatedQuantities);
    updateSubtotal(index, value, defaultQuantity);
  };




  const handleQuantityChange = (index, value) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] = value;
    setQuantities(updatedQuantities);
    updateSubtotal(index, selectedItems[index], value);
  };

  const updateSubtotal = (index, item, quantity) => {
    const price = itemPrices[item] || 0;
    const subtotal = price * quantity;
    const updatedSubtotals = [...subtotals];
    updatedSubtotals[index] = subtotal;
    setSubtotals(updatedSubtotals);
  };

  const calculateTotal = () => {
    let subtotal = 0;
    let discount = 0;
    let tax = 0;
    // Loop through rows to calculate subtotal, discount, and tax
    rows.forEach((row, index) => {
      const item = selectedItems[index];
      const quantity = quantities[index];
      const price = itemPrices[item] || 0;
      subtotal += price * quantity;
      discount += (price * quantity * discountRate) / 100;
      tax += (price * quantity * taxRate) / 100;
    });
    // Calculate total
    const totalAmount = subtotal - discount + tax;
    // Update state
    setSubTotal(subtotal);
    setDiscountAmount(discount);
    setTaxAmount(tax);
    setTotal(totalAmount);
  };

  const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case "INR":
        return "₹";
      // Add more cases for other currencies as needed
      default:
        return "";
    }
  };


  // const handleReviewInvoice = () => {
  //   const data = {
  //     invoiceNo,
  //     invoiceDate,
  //     clientName,
  //     clientContact,
  //     items: rows.map((row, index) => ({
  //       item: selectedItems[index],
  //       quantity: quantities[index],
  //       price: price[index],
  //       subtotal: subtotals[index],
  //     })),
  //     subTotal,
  //     discountRate,
  //     discountAmount,
  //     taxRate,
  //     taxAmount,
  //     total,
  //     selectedCurrency,
  //     selectedPaymentMode,
  //     selectedPopupItem,
  //   };
  //   // setSelectedInvoice(data); // Set the selected invoice data
  //   setInvoiceNumber((prevInvoiceNumber) => prevInvoiceNumber + 1);
  //   togglePopup(true);
  //   fetch("http://localhost:5000/api/billing", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       // Handle error
  //     });
  // };
  const handleReviewInvoice = () => {
    const data = {
      invoiceNo,
      invoiceDate,
      clientName,
      clientContact,
      items: rows.map((row, index) => ({
        item: selectedItems[index],
        quantity: quantities[index],
        price: price[index],
        subtotal: subtotals[index],
        services:services[index],
      })),
      subTotal,
      discountRate,
      discountAmount,
      taxRate,
      taxAmount,
      total,
      selectedCurrency,
      selectedPaymentMode,
      selectedPopupItem,
      // services: rows.map((row, index) => ({
      //   service: services[index],
      // })),
    };
    // setSelectedInvoice(data); // Set the selected invoice data
    // setInvoiceNumber((prevInvoiceNumber) => prevInvoiceNumber + 1);
    togglePopup(true);
    fetch("http://localhost:5000/api/billing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        setInvoiceNumber(data.invoiceNo);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handledownloadcopy = () => {
    const doc = new jsPDF();
    doc.text("Invoice No: " + invoiceNo, 10, 10);
    doc.text("Invoice Date: " + invoiceDate, 10, 20);
    doc.text("Client Name: " + clientName, 10, 30);
    doc.text("Client Contact: " + clientContact, 10, 40);
    doc.text("Total: " + total, 10, 50);
    doc.text("Selected Item: " + selectedPopupItem, 10, 60);
    doc.text("Selected Item: " + selectedPopupItem, 10, 60);
    doc.text("Selected Item: " + selectedPopupItem, 10, 60);
    doc.text("TaxAmount: " + taxAmount, 10, 60);
    doc.save("Laundry Invoice.pdf");
  };

  const [showPopup, setShowPopup] = useState(false);
  const resetFields = () => {
    // setInvoiceNo("");
    // setInvoiceDate("");
    setClientName("");
    setClientContact("");
    setRows([{ id: 1 }]);
    setSelectedItems(Array(rows.length).fill(""));
    setQuantities(Array(rows.length).fill(0));
    setSubtotals(Array(rows.length).fill(0));
    setSubTotal(0);
    setDiscountRate(0);
    setDiscountAmount(0);
    setTaxRate(0);
    setTaxAmount(0);
    setTotal(0);
    setSelectedPaymentMode("");
  };

  const togglePopup = (isCancel) => {
    setShowPopup(!showPopup);
  };



  // const togglePopup = (value) => {
  //   setSelectedPopupItem(value);
  // };
  return (
    <div className="billtotal">
      <div className="nav111">
        <Navbar />
      </div>
      <div className="invoice-form">
        <div className="input-group">
          <label htmlFor="invoiceNo">Invoice No:</label>
          <input
            type="text"
            id="invoiceNo"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="invoiceDate">Invoice Date:</label>
          <input
            type="date"
            id="invoiceDate"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="clientName">Customer Name:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="clientContact">Customer Contact No:</label>
          <input
            type="tel"
            pattern="[0-9]*"
            onInput={(e) => (e.target.value = e.target.value.replace(/\D/, ""))}
            required
            id="clientContact"
            value={clientContact}
            onChange={(e) => setClientContact(e.target.value)}
          />
        </div>
      </div>
      <div className="table-container">
        <table className="medicine-table">
          <thead>
            <tr>
              <th style={{ width: "25%" }}>Items</th>
              <th>Services</th>
              <th style={{ width: "10%" }}>Quantity</th>
              <th style={{ width: "15%" }}>Price/Rate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    value={selectedItems[index]}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                  >
                    {itemsList.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <select>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {/* <select>
                    <option>
                      Wash & Fold
                    </option>
                    <option>Wash & Fold</option>
                    <option>Dry Cleaning</option>
                    <option>Express Laundry Services</option>
                    <option>Premium Laundry</option>
                    <option>Steam Ironing</option>
                  </select> */}
                </td>
                <td>
                  <input
                    type="number"
                    value={quantities[index]}
                    onChange={(e) =>
                      handleQuantityChange(index, e.target.value)
                    }
                  />
                </td>
                {/* <td>{itemPrices[selectedItems[index]] || 0}</td> */}
                <td>{itemPrices[selectedItems[index]] || 0}</td>

                <td>
                  <div className="iconflex">
                    {index === rows.length - 1 ? ( // Check if this is the last row
                      <button className="itembtn" onClick={handleAddRow}>
                        <span>
                          <FaPlus />
                        </span>
                        <GiClothes
                          className="svg"
                          style={{ fontSize: "2rem" }}
                        />
                      </button>
                    ) : null}

                    {/* <button class="buttonbin" onClick={() => handleDeleteRow(row.id)} disabled={rows.length === 1}> */}
                    <button
                      className="buttonbin"
                      onClick={() => handleDeleteRow(index)}
                      disabled={rows.length === 1}
                    >
                      {/* Delete button always rendered */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 69 14"
                        class="svgIcon bin-top"
                      >
                        <g clip-path="url(#clip0_35_24)">
                          <path
                            fill="black"
                            d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_35_24">
                            <rect fill="white" height="14" width="69"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 69 57"
                        class="svgIcon bin-bottom"
                      >
                        <g clip-path="url(#clip0_35_22)">
                          <path
                            fill="black"
                            d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                          ></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_35_22">
                            <rect fill="white" height="57" width="69"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <center>
        <div className="flexxx">
          <div className="invoice-form2">
            {/* <div className="input-group">
              <label htmlFor="currency">Currency:</label>
              <select
                className="input009"
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                disabled >
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div> */}
            <div className="input-group">
              <label htmlFor="currency">Currency:</label>
              <select
                className="input009"
                id="currency"
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
               
              >
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="taxRate">Tax Rate:</label>
              <input
                className="input009"
                type="number"
                id="taxRate"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="discountRate">Discount Rate:</label>
              <input
                className="input009"
                type="number"
                id="discountRate"
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
              />
            </div>
            <div className="input-group">
              <select
                className="selectpaymentmode"
                value={selectedPaymentMode}
                onChange={(e) => setSelectedPaymentMode(e.target.value)}
              >
                <option value="">Select Payment Mode</option>
                <option value="upi">UPI</option>
                <option value="phonepay">PhonePe</option>
                <option value="googlepay">Google Pay</option>
              </select>
            </div>
          </div>
          <Row className="row09">
            <Col style={{ width: "100%" }} lg={6}>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Subtotal:</span>
                <span>
                  {getCurrencySymbol(selectedCurrency)} {subTotal.toFixed(2)}{" "}
                </span>
              </div>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Discount:</span>
                <span>
                  <span className="small ">({discountRate || 0}%)</span>
                  {getCurrencySymbol(selectedCurrency)}{" "}
                  {discountAmount.toFixed(2)}{" "}
                </span>
              </div>
              <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                <span className="fw-bold">Tax:</span>
                <span>
                  <span className="small ">({taxRate || 0}%)</span>
                  {getCurrencySymbol(selectedCurrency)} {taxAmount.toFixed(2)}{" "}
                </span>
              </div>
              <div
                className="d-flex flex-row align-items-start justify-content-between"
                style={{
                  fontSize: "1.125rem",
                }}
              >
                <span className="fw-bold">Total:</span>
                <span className="fw-bold">
                  {getCurrencySymbol(selectedCurrency)} {total.toFixed(2)}{" "}
                </span>
              </div>
            </Col>
          </Row>
          {/* <button className="review-button" onClick={togglePopup}{handleReviewInvoice}>
            Review Invoice
          </button> */}
          <button
            className="review-button"
            onClick={() => {
              togglePopup(false);
              handleReviewInvoice();
            }}
          >
            Review Invoice
          </button>
          {showPopup && (
            <div className="popup">
              <div className="popup-header">
                Add Stockists
                <button
                  className="close-button"
                  onClick={() => {
                    togglePopup(true);
                    resetFields();
                  }}
                >
                  X
                </button>
              </div>
              <hr />
              <div className="popup-content">
                <form>
                  <label className="nameclass-label">InvoiceNo:</label>
                  <input
                    type="text"
                    value={invoiceNumber}
                    readOnly
                  />
                  <label className="nameclass-label">InvoiceDate:</label>
                  <input
                    type="text"
                    value={invoiceDate}
                  />
                  <label className="nameclass-label">clientName:</label>
                  <input
                    type="text"
                    value={clientName}
                  />
                  <label className="nameclass-label">clientContact:</label>
                  <input
                    type="text"
                    value={clientContact}
                  />
                  <label className='nameclass-label'>total:</label>
                  <input
                    type="text"
                    placeholder="Added Date"
                    value={total}
                  />
                  <label className='nameclass-label'>item:</label>
                  <input
                    type="text"
                    value={selectedPopupItem}
                    readOnly
                  />
                  <label className='nameclass-label'>Services:</label>
                  <input
                    type="text"
                    
                    value={services}
                  />
                  <label className='nameclass-label'>quantity:</label>
                  <input
                    type="text"
                    
                    value={quantities}
                  />
                  <label className='nameclass-label'>TaxRate:</label>
                  <input
                    type="text"
                    
                    value={taxRate}
                  />
                  <label className='nameclass-label'>discountRate:</label>
                  <input
                    type="text"
                    
                    value={discountRate}
                  />
                  <label className='nameclass-label'>subTotal:</label>
                  <input
                    type="text"
                    
                    value={subTotal}
                  />
                  <label className='nameclass-label'>taxAmount:</label>
                  <input
                    type="text"
                    
                    value={taxAmount}
                  />
                  <label className='nameclass-label'>discountAmount:</label>
                  <input
                    type="text"
                    
                    value={discountAmount}
                  />
                  <label className='nameclass-label'>total:</label>
                  <input
                    type="text"
                    
                    value={total}
                  />
                  <div className="merge-karthik-bill">
                    <button className="downloadcopy">send Copy</button>
                    <button
                      className="downloadcopy"
                      onClick={handledownloadcopy}
                    >
                      Download Copy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </center>
    </div>
  );
};

export default Bills;
