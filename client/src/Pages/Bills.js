import React, { useState, useEffect } from "react";
import "./Bills.css";
import { GiClothes } from "react-icons/gi";
import { FaPlus } from "react-icons/fa6";
import { Row, Col } from "react-bootstrap";
import currencyCodes from "currency-codes";
import Navbar from "../components/Navbar";
// import Sidebar from "./Sidebar";
import jsPDF from "jspdf";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactWhatsapp from "react-whatsapp";
import axios from "axios";
import QRCode from "qrcode.react";
import Barcode from 'react-barcode';
import StaffNavbar from "../components/StaffNavbar";
import JsBarcode from 'jsbarcode';
import ilaundry from "../assets/images/ilaundry.jpg";
import { BASE_URL } from "../Helper/Helper";

const currencies = currencyCodes.data;

const Bills = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("mail");
    if (storedEmail) {
      axios
        .get(`http://localhost:5000/users/${storedEmail}`)
        .then((response) => {
          setUser(response.data);
          setUsername(response.data.username); // Assuming the username property exists in your user data
        })
        .catch((error) => {
          console.error("Error fetching user by email:", error);
        });
    }
  }, []);

  useEffect(() => {
    if (user) {
      setUsername(user.username); // Update the username state after user state is set
    }
  }, [user]);


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
  const [username, setUsername] = useState("");
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("");
  const [price, setprice] = useState(0);
  const [customeraddress, setcustomeraddress] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
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
    setSelectedServices([...selectedServices, ""]); // using selectedServices
  };

  useEffect(() => {
    calculateTotal();
  }, [quantities, discountRate, taxRate]);

  useEffect(() => {
    // Set the initial invoice date to the current date
    setInvoiceDate(new Date());
  }, []);

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
    rows.forEach((row, index) => {
      const item = selectedItems[index];
      const quantity = quantities[index];
      const price = itemPrices[item] || 0;
      subtotal += price * quantity;
      discount += (price * quantity * discountRate) / 100;
      tax += (price * quantity * taxRate) / 100;
    });
    const totalAmount = subtotal - discount + tax;
    setSubTotal(subtotal);
    setDiscountAmount(discount);
    setTaxAmount(tax);
    setTotal(totalAmount);
  };

  const getCurrencySymbol = (currencyCode) => {
    switch (currencyCode) {
      case "INR":
        return "₹";
      default:
        return "";
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formatter = new Intl.DateTimeFormat("en-GB", options);
    return formatter.format(date);
  };
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const handleReviewInvoice = () => {
    const data = {
      invoiceNo,
      invoiceDate: formatDate(invoiceDate),
      clientName,
      clientContact,
      customeraddress,
      pickupdate: formatDate(pickupdate), // Include pickup date
      deliveryDate: formatDate(deliveryDate), // Include delivery date
      store: selectedStore,
      factory: selectedFactory,
      
      items: rows.map((row, index) => ({
        item: selectedItems[index],
        quantity: quantities[index],
        price: itemPrices[selectedItems[index]] || 0,
        services: selectedServices[index],
        subtotal: subtotals[index],
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
      user: user
        ? {
          userId: user._id,
          username: user.name,
          name: user.name,
        }
        : null,
    };

    axios
      .post("http://localhost:5000/api/billing", data)
      .then((response) => {
        console.log("Success:", response.data);
        setInvoiceNumber(response.data.invoiceNo);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    togglePopup(true);
  };

  const handleInvoiceDateChange = (selectedDate) => {
    setInvoiceDate(selectedDate);
  };

  const handledownloadcopy = () => {
    const doc = new jsPDF();

    const imgWidth = 40;
    const imgHeight = 15;
    const imgX = doc.internal.pageSize.getWidth() - imgWidth - 155;
    const imgY = 15;
    doc.addImage(ilaundry, "PNG", imgX, imgY, imgWidth, imgHeight);


    // Define the data for the table
    const tableData = [
      ["Particulars", "Details"],
      ["Invoice No:", invoiceNo],
      ["Invoice Date:", formatDate(invoiceDate)],
      ["Client Name:", clientName],
      ["Client Contact:", clientContact],
      ["Selected Item:", selectedPopupItem],
      ["Total:", total],
      ["Tax Amount:", taxAmount]
  ];
  
  // Set up styles for the table
  const tableStyles = {
      fontSize: 10,
      fontStyle: 'normal', // normal, bold, italic
      textColor: [128, 128, 128], // Grey color
      cellPadding: 5
  };
  
  // Set up column widths
  const columnWidths = [70, 200];
  
  // Add border around the content
  const margin = 10;
  const contentWidth = doc.internal.pageSize.getWidth() - 2 * margin;
  const contentHeight = doc.internal.pageSize.getHeight() - 2 * margin;
  doc.setDrawColor(0); // Black border
  doc.rect(margin, margin, contentWidth, contentHeight); // Adjusted position for the border
  
  // Add GST number inside the border, aligned to the right, and bold
  const gstNumber = "GSTIN:29ABCDE1234F1ZW";
  const gstTextWidth = doc.getStringUnitWidth(gstNumber) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(gstNumber, doc.internal.pageSize.getWidth() - margin - gstTextWidth + 20, margin + 5); // Adjusted position for GST number
  
  // Add a heading for the invoice inside the border, centered, and bold
  doc.setFont("bold");
  doc.setFontSize(18);
  doc.text("PAYMENT INVOICE", doc.internal.pageSize.getWidth() / 2, margin + 40, { align: "center" }); // Adjusted position for the heading
  
  // Add margin from the main border
  const tableMargin = 0;
  const tableX = margin + tableMargin;
  const tableY = margin + 60 + tableMargin; // Adjusted position for the heading
  
  // Calculate equal column width
  const columnWidth = (contentWidth - 2 * tableMargin) / 2;
  
  // Add the table heading row with background color
  doc.autoTable({
      head: [["Particulars", "Details"]],
      startY: tableY,
      startX: tableX,
      styles: {
          fontStyle: 'bold',
          fillColor: [102, 244, 174],
          textColor: [0, 0, 0],
          lineColor: [192, 192, 192], // Grey border color for heading row
          cellPadding: [3, 4] // Increase cell padding by 1px
      },
      columnStyles: { 0: { cellWidth: columnWidth }, 1: { cellWidth: columnWidth } },
      draw: true // Draw borders
  });
  
  // Add the table data to the PDF without background color
  doc.autoTable({
      body: tableData.slice(1), // Exclude the first row (heading)
      startY: doc.lastAutoTable.finalY, // Start below the heading row
      startX: tableX,
      styles: tableStyles,
      columnStyles: {
          0: { fontStyle: 'bold' }, // Make the first column bold
          1: { fontStyle: 'normal' } // Make the second column normal
      },
      columnWidth: columnWidth,
      margin: { top: tableMargin }, // Add margin from the heading row
      draw: true // Draw borders
  });
  
  // Add "signature or stamp" after the table
  const signatureStampText = "Signature or Stamp";
  const signatureStampTextWidth = doc.getStringUnitWidth(signatureStampText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const signatureStampX = doc.internal.pageSize.getWidth() - margin - signatureStampTextWidth - 0; // Adjusted position to the right corner
  const signatureStampY = doc.lastAutoTable.finalY + 30; // Adjusted position below the table
  doc.setFontSize(12); // Smaller font size for signature
  doc.text(signatureStampText, signatureStampX, signatureStampY);
  
  // Add "****This is system generated bill****" at the end of the page center
  const generatedBillText = "****This is system generated bill****";
  const generatedBillTextWidth = doc.getStringUnitWidth(generatedBillText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const generatedBillTextX = (doc.internal.pageSize.getWidth() - generatedBillTextWidth) / 2;
  const generatedBillTextY = doc.internal.pageSize.getHeight() - margin - 5; // Leave some margin from the bottom
  doc.setFontSize(14); // Restore font size for generated bill text
  doc.text(generatedBillText, generatedBillTextX, generatedBillTextY);
  
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  canvas.width = 200; // Set canvas width
  canvas.height = 100; // Set canvas height
  
  // Generate the barcode onto the canvas
  JsBarcode(canvas, invoiceNumber.toString(), {
      format: 'CODE128', // Adjust barcode format as needed
      width: 2, // Adjust barcode width
      height: 50, // Adjust barcode height
  });
  
  // Convert the canvas to a data URL representing the image
  const dataURL = canvas.toDataURL();
  
  // Adjust position for the barcode
  const barcodeWidth = 70; // Adjust the width of the barcode image
  const barcodeHeight = 35; // Adjust the height of the barcode image
  const barcodeMargin = 2;
  const barcodeX = doc.internal.pageSize.getWidth() - margin - barcodeWidth - barcodeMargin; // Adjusted position for barcode
  const barcodeY = margin + 5 + 2; // Adjusted position below GST number with margin of 20px
  
  // Embed the image into the PDF
  doc.addImage(dataURL, 'JPEG', barcodeX, barcodeY, barcodeWidth, barcodeHeight);
  
  // Save the PDF file
  doc.save('Laundry Invoice.pdf');
  };  

  const sendPDFViaWhatsApp = (pdfFile) => {
    // Use react-whatsapp to send the PDF file via WhatsApp
    // Assuming you have the customer's contact number stored in 'clientContact'
    const customerContact = clientContact; // Replace this with the actual contact number
    const message = "Here's your laundry invoice.";
    const url = window.URL.createObjectURL(pdfFile);

    // Open WhatsApp with the PDF file attached
    ReactWhatsapp.send(
      customerContact,
      message,
      url);
  };

  const [showPopup, setShowPopup] = useState(false);
  const resetFields = () => {
    setInvoiceNo("");
    setClientName("");
    setClientContact("");
    setcustomeraddress("");
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
    setSelectedServices("");
  };

  const togglePopup = (isCancel) => {
    setShowPopup(!showPopup);
  };
  
  const [deliveryDate, setDeliveryDate] = useState(null);
  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date);
  };

  const [pickupdate, setPickupdate] = useState(null);

  const handlePickupDateChange = (date) => {
    setPickupdate(date);
  };
  const [selectedStore, setSelectedStore] = useState("");
const [selectedFactory, setSelectedFactory] = useState("");


const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString(); // Convert to a string

// const [user, setUser] = useState("");

useEffect(() => {
  const fetchUserDetails = async () => {
    const storedStoreId = localStorage.getItem("storeId");
    if (storedStoreId) {
      try {
        const response = await axios.get(
          `${BASE_URL}/users/${storedStoreId}`
        );
        console.log("User data from backend:", response.data); // Log the response data
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user by storeId:", error);
      }
    }
  };

  fetchUserDetails();
}, []); // Empty dependency array to only call this effect once on component mount

  return (
    <div className="billtotal">
      <div className="nav111">
      {/* <Sidebar /> */}
        <StaffNavbar />
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
          {/* Placeholder for your date picker component */}
          <DatePicker
            selected={invoiceDate}
            onChange={(date) => handleInvoiceDateChange(date)}
            dateFormat="dd-MM-yyyy" // Set the desired date format
          />
        </div>
        <div className="input-group">
          <label htmlFor="clientName">Customer Name:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            maxLength={20}
            onChange={(e) => setClientName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="clientContact">Customer Contact No:</label>
          <input
    type="tel"
    maxLength="10"
    
    onInput={(e) => (e.target.value = e.target.value.replace(/\D/, "").slice(0, 10))}
    required
    id="clientContact"
    value={clientContact}
    onChange={(e) => setClientContact(e.target.value)}
/>

        </div>
        <div className="input-group">
          <label htmlFor="clientContact">Customer Address:</label>
          <input
    type="text"
    maxLength="100"
    id="clientName"
    value={customeraddress}
    onChange={(e) => setcustomeraddress(e.target.value.slice(0, 100))}
/>

        </div>    
      </div>
<br/>
      <div className="invoice-form" >
     
      <div className="input-group">
  <label htmlFor="pickupDate">Pickup Date:</label>
  <DatePicker
    id="pickupDate"
    selected={pickupdate}
    onChange={handlePickupDateChange}
    dateFormat="dd-MM-yyyy"
  />
</div>
    
      <div className="input-group">
        <label htmlFor="invoiceDate">Delivery Date:</label>
        <DatePicker
          id="deliveryDate"
          selected={deliveryDate}
          onChange={handleDeliveryDateChange}
          dateFormat="dd-MM-yyyy" // Set the desired date format
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
                  <select
                    className="selectedServices"
                    value={selectedServices[index]}
                    onChange={(e) => {
                      const newSelectedServices = [...selectedServices];
                      newSelectedServices[index] = e.target.value;
                      setSelectedServices(newSelectedServices);
                    }}
                  >
                    <option value="">Select service</option>
                    <option value="wash & fold">Wash & fold</option>
                    <option value="Steam Iron">Steam Ironing</option>
                    <option value="wash & iron">Wash & Iron</option>
                    <option value="Dry cleaning">Dry Cleaning</option>
                    <option value="premium laundry">Premium Laundry</option>
                  </select>
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
                <td>{itemPrices[selectedItems[index]] || 0}</td>

                <td>
                  <div className="iconflex">
                    {index === rows.length - 1 ? (
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

                    <button
                      className="buttonbin"
                      onClick={() => handleDeleteRow(index)}
                      disabled={rows.length === 1}
                    >
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
          <button
            className="review-button"
            onClick={() => {
              togglePopup(false);
              handleReviewInvoice();
            }}
          >
            Review Invoice
          </button>
          <p value="userType">{user?.name }</p>
          {showPopup && (
          <div className="popup34">
          <div className="popup-header34">
            Billing Data
            <button
              className="close-button34"
              onClick={() => {
                togglePopup(true);
                resetFields();
              }}
            >
              X
            </button>
          </div>
          <div className="popup-content456">
            <form>
            <Barcode value={invoiceNumber.toString()} /> 
              <div className="data-placeholder">
                <label className="nameclass-label">User:</label>
                <span>{user?.name }</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">InvoiceNo:</label>
                <span>{invoiceNumber}</span>
              </div>
              <label className="nameclass-label">InvoiceDate</label>:
                  <input type="text" value={invoiceDate} />
              <div className="data-placeholder">
                <label className="nameclass-label">ClientName:</label>
                <span>{clientName}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">ClientContact:</label>
                <span>{clientContact}</span>
              </div>
              <div className="data-placeholder">
              <label className="nameclass-label">Pickup Date</label>:
                  <input  type="text" value={pickupdate} />
              </div>
              <div className="data-placeholder">
              <label className="nameclass-label">Delivery Date</label>:
                  <input type="text" value={deliveryDate} />
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Customer Address:</label>
                <span>{customeraddress}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Item:</label>
                <span>{selectedItems}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Services:</label>
                <span>{selectedServices}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Quantity:</label>
                <span>{quantities}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Tax Rate:</label>
                <span>{taxRate}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Discount Rate:</label>
                <span>{discountRate}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Subtotal:</label>
                <span>{subTotal}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Tax Amount:</label>
                <span>{taxAmount}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Discount Amount:</label>
                <span>{discountAmount}</span>
              </div>
              <div className="data-placeholder">
                <label className="nameclass-label">Total:</label>
                <span>{total}</span>
              </div>
              <div className="merge-karthik-bill">
                <button className="downloadcopy">Send Copy</button>
                <button className="downloadcopy" onClick={handledownloadcopy}>
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
