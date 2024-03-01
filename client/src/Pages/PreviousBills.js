import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../Helper/Helper.js";
import "../Styles/PreviousBills.css";
import Popup from "reactjs-popup";
import CustomerForm from "./CustomerForm.js";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { AiOutlineSearch } from "react-icons/ai";
import { FaDownload } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import ReactWhatsapp from "react-whatsapp";
import ilaundry from "../assets/images/ilaundry.jpg";
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { FaCloudUploadAlt } from "react-icons/fa";
import { HiOutlineViewfinderCircle } from "react-icons/hi2";
import ReactJsPagination from "react-js-pagination";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeft from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRight from "@mui/icons-material/KeyboardDoubleArrowRight";
import image13 from "../components/images/background.jpg";
import Navbar from "../components/Navbar.js";
import Backbutton from "./Backbutton.js";
import InvoiceDetailsPopup from './InvoiceDetailsPopup.js'
import { autoTable } from 'pdfmake/build/pdfmake';
import "jspdf-autotable";

const PreviousBills = () => {
  const [customerServicesCus, setcustomerServicesCus] = useState([]);
  const [searchTextCus, setsearchTextCus] = useState("");
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [showUploadPopup, setShowUploadPopup] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [showUploadfilesPopup, setShowUploadfilesPopup] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [confirmed, setConfirmed] = useState(false);
  const [selectedServiceCus, setselectedServiceCus] = useState(null);
  const [isAddPopupOpenCus, setAddPopupOpenCus] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [allData, setAllData] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);


  
  const fetchcustomerServicesCus = async () => {
    try {
      console.log("Fetching Customer Details");
      const response = await axios.get(`${BASE_URL}/api/get-bills`);
      setcustomerServicesCus(response.data);
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching Customer Details:", error);
    }
  };

  useEffect(() => {
    console.log("Before API call");
    fetchcustomerServicesCus();
  }, []);

  
  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };
   const handleFieldClick = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCancelCus = () => {
    setselectedServiceCus(null);
    setAddPopupOpenCus(false);
  };

  const handleEditCus = (service) => {
    setselectedServiceCus(service);
    setAddPopupOpenCus(true);
  };

  const openDetailsPopup = (invoice) => {
    setSelectedInvoice(invoice);
  };

  useEffect(() => {
    console.log("Before API call");
    fetchcustomerServicesCus();
  }, []);

  useEffect(() => {
    if (showUploadfilesPopup && selectedServiceId) {
    }
  }, [showUploadfilesPopup, selectedServiceId]);

  const handleAddCusOrUpdate = async (formData) => {
    try {
      if (selectedServiceCus) {
        await axios.put(
          `${BASE_URL}/invoice/${selectedServiceCus._id}`,
          formData
        );
      } else {
        await axios.post(`${BASE_URL}/invoice/`, formData);
      }
      fetchcustomerServicesCus();
      setselectedServiceCus(null);
      setAddPopupOpenCus(false);
    } catch (error) {
      console.error("Error adding/updating Customer Details:", error);
    }
  };
  
  const handlesearchTextCusChange = (newValue) => {
    setsearchTextCus(newValue);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filterByField = (item, field, searchText) => {
    return (
      item[field] &&
      item[field].toString().toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const handleDeleteCus = async () => {
    try {
      await axios.delete(`${BASE_URL}/invoice/${selectedServiceCus._id}`);
      fetchcustomerServicesCus();
    } catch (error) {
      console.error("Error deleting Customer Details:", error);
    }
  };

  const filteredData = customerServicesCus.filter((item) => {
    return (
      item.invoiceNo.toLowerCase().includes(searchTextCus.toLowerCase()) ||
      moment(item.invoiceDate).format("YYYY-MM-DD").includes(searchTextCus) ||
      item.clientName.toLowerCase().includes(searchTextCus.toLowerCase()) ||
      item.clientContact.includes(searchTextCus) ||
      item.subTotal.toString().toLowerCase().includes(searchTextCus.toLowerCase()) || // Convert subTotal to string
      item.discountRate.toString().toLowerCase().includes(searchTextCus.toLowerCase()) || // Convert discountRate to string
      item.discountAmount.toString().toLowerCase().includes(searchTextCus.toLowerCase()) || // Convert discountAmount to string
      item.taxRate.toString().toLowerCase().includes(searchTextCus.toLowerCase()) || // Convert taxRate to string
      item.taxAmount.toString().toLowerCase().includes(searchTextCus.toLowerCase()) || // Convert taxAmount to string
      item.total.toString().toLowerCase().includes(searchTextCus.toLowerCase()) || // Convert total to string
      item.selectedCurrency.toLowerCase().includes(searchTextCus.toLowerCase())
    );
  });
  

const handleDownloadPDF = (service) => {
  const pdf = new jsPDF();
  pdf.setDrawColor(7, 126, 96); // RGB values for a shade of green
  let lineY = 48;

  const imgWidth = 40;
  const imgHeight = 15;
  const imgX = pdf.internal.pageSize.getWidth() - imgWidth - 155;
  const imgY = 15;
  pdf.addImage(ilaundry, "PNG", imgX, imgY, imgWidth, imgHeight);

  const billingDateTime = new Date().toLocaleString();
  const invoiceName = "Payment Invoice";
  const invoiceNameX = pdf.internal.pageSize.getWidth() / 2;
  // const dateX =
  //   pdf.internal.pageSize.getWidth() - pdf.getTextWidth(billingDateTime) - 1;

  pdf.text(invoiceName, invoiceNameX, 45, { align: "center" });
  pdf.setFontSize(10);
  // pdf.text(`Date : ${billingDateTime}`, dateX, 45);

  pdf.rect(
    10,
    10,
    pdf.internal.pageSize.getWidth() - 20,
    pdf.internal.pageSize.getHeight() - 20,
    "S"
  );

  const pageWidth = pdf.internal.pageSize.getWidth();

  const borderWidth = 10;
  const lineWidth = 2;
  pdf.line(10, lineY - lineWidth, pageWidth - borderWidth, lineY - lineWidth);

  // Section for basic details
  const basicDetailsRows = [
    { label: "Invoice No:", value: service.invoiceNo },
    { label: "Client Name:", value: service.clientName },
    { label: "Client Contact:", value: service.clientContact },
    { label: "Invoice Date:", value: service.invoiceDate },
  ];

  basicDetailsRows.forEach(({ label, value }) => {
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(12);
    pdf.text(`${label}`, 20, (lineY += 8));

    pdf.setFont("helvetica", "normal");
    pdf.text(`${value}`, 60, lineY);
  });

  // GSTIN Number
  const gstin = "29ABCDE1234F1ZW"; // Replace with your actual GSTIN number
  const gstinX = pdf.internal.pageSize.getWidth() - 58;
  const gstinY = 15;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text(`GSTIN: ${gstin}`, gstinX, gstinY);

  // Section for the rest of the details
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");

  const boldLabels = [
    "Discount Rate",
    "Discount Amount",
    "Tax Rate",
    "Tax Amount",
    "Subtotal",
    "Total",
    "Currency",
    "Item Type",
    "Item Quantity",
  ];

  const tableRows = [
    { label: "Discount Rate:", value: service.discountRate },
    { label: "Discount Amount:", value: service.discountAmount },
    { label: "Tax(SGST 9%):", value: service.taxRate },
    { label: "Tax Amount:", value: service.taxAmount },
    { label: "Subtotal:", value: service.subTotal },
    { label: "Total:", value: service.total },
    { label: "Currency:", value: service.selectedCurrency },
    {label:"Payment Mode:",value:service.selectedPaymentMode},
  ];

  if (service.items && service.items.length > 0) {
    tableRows.push({
      label: 'Item Service Type',
      value: service.items[0].services,
    });
  
    service.items.forEach((item, index) => {
      tableRows.push({
        label: `Item Type:`,
        value: item.item,
      });
      tableRows.push({
        label: `Item Quantity:`,
        value: item.quantity,
      });
      
    });
  }
  

  const headers = ["Particulars", "Amount"];
  const data = tableRows.map(({ label, value }) => [
    boldLabels.includes(label.replace(":", "")) ? label.replace(":", "") : label,
    value,
  ]);

  const tableOptions = {
    startY: lineY + 15,
    margin: { top: 10 },
  };
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);

  pdf.autoTable({
    head: [headers],
    body: data,
    theme: "grid",
    ...tableOptions,
  });

  pdf.setFont("helvetica", "normal");

  // Signature and system-generated text
  const signature = "Signature Or Stamp";
  const signatureX = 150;
  const signatureY = pdf.lastAutoTable.finalY + 20;
  pdf.text(signature, signatureX, signatureY);

  const systemGeneratedText = "****This is a system-generated bill****";
  const systemGeneratedTextX = pdf.internal.pageSize.getWidth() / 2;
  const systemGeneratedTextY = pdf.internal.pageSize.getHeight() - 15;

  pdf.text(systemGeneratedText, systemGeneratedTextX, systemGeneratedTextY, {
    align: "center",
  });

  pdf.save(`customer_details_${service._id}.pdf`);
};


  const generateWhatsappMessage = (service) => {
    const {
      prefix,
      invoiceNo,
      invoiceDate,
      clientName,
      clientContact,
      subTotal,
      discountRate,
      discountAmount,
      taxRate,
      taxAmount,
      total,
      selectedCurrency,
      phoneNumber,
    } = service;
  
    // Check if all required properties are defined
    if (
      prefix &&
      invoiceNo &&
      invoiceDate &&
      clientName &&
      clientContact &&
      subTotal &&
      discountRate &&
      discountAmount &&
      taxRate &&
      taxAmount &&
      total &&
      selectedCurrency &&
      phoneNumber
    ) {
      return `
        Invoice No: ${prefix}${invoiceNo}
        Invoice Date: ${invoiceDate}
        Client Name: ${clientName}
        Client Contact: ${clientContact}
        Subtotal: ${subTotal}
        Discount Rate: ${discountRate}
        Discount Amount: ${discountAmount}
        Tax Rate: ${taxRate}
        Tax Amount: ${taxAmount}
        Total: ${total}
        Currency: ${selectedCurrency}
      `;
    } else {
      console.error("Some properties are undefined in generateWhatsappMessage");
      return "";
    }
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const openUploadPopup = (service) => {
    setSelectedServiceId(service._id);
    setShowUploadPopup(true);
  };

  const openUploadfilePopup = (service) => {
    setSelectedServiceId(service._id);
    setShowUploadfilesPopup(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFilterByDate = () => {
    console.log("Filtering by date...");
    console.log("fromDate:", fromDate);
    console.log("toDate:", toDate);

    const filteredData = allData.filter((item) => {
      const currentDate = new Date(item.invoiceDate).getTime();
      const fromTimestamp = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : 0;
      const toTimestamp = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : Infinity;

      return currentDate >= fromTimestamp && currentDate <= toTimestamp;
    });

    console.log("Filtered Data:", filteredData);

    setcustomerServicesCus(filteredData);
  };
  
  
  return (
    <>
      <Navbar />
      <div className="lab-service-table-container_5">
        <div className="flex56">
          <div className="bbb">
            <Backbutton />
          </div>
          <h2 className="lab-ser-subheadding-arun5">Previous Bills</h2>
        </div>
        <br></br>
        <div className="search-add_5">
          <div className="search-bar_5">
            <div className="search-input_5">
              <AiOutlineSearch className="search-icon_5" />
              <input
                type="text"
                placeholder="Search"
                value={searchTextCus}
                onChange={(e) => handlesearchTextCusChange(e.target.value)}
                className="input-field_1"
              />
            </div>
          </div>
          <div className="date-filter">
            <label>From Date:</label>
            <input type="date" value={fromDate} onChange={handleFromDateChange} />

            <label>To Date:</label>
            <input type="date" value={toDate} onChange={handleToDateChange} />

            <button onClick={handleFilterByDate}>Filter</button>
          </div>

         
        </div>
        <table className="lab-service-table_5">
          <thead>
            <tr className="product-ooi">
              <th className="product-ooi">Invoice No</th>
              <th className="product-ooi">Invoice Date</th>
              <th className="product-ooi">Customer Name</th>
              <th className="product-ooi">Customer Contact</th>
             
              <th className="product-ooi">Discount Rate</th>
              <th className="product-ooi">Discount Amount</th>
              <th className="product-ooi">Tax Rate</th>
              <th className="product-ooi">Tax Amount</th>
              <th className="product-ooi">Total</th>
              <th className="product-ooi">Subtotal </th>
              <th className="product-ooi">Currency</th>
              <th className="product-ooi">Items</th>
              <th className="product-ooi">Actions</th>
              <th className="product-ooi">Pay Mode</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
              .map((service) => (
                <tr key={service._id}>
                  <td onClick={() => handleFieldClick(service)}> {service.invoiceNo}</td>
                  <td onClick={() => handleFieldClick(service)}>
                {service.invoiceDate
                  ? moment(service.invoiceDate).format("YYYY-MM-DD")
                  : ""}
              </td>{" "}
              <td onClick={() => handleFieldClick(service)}> {service.clientName}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.clientContact}</td>
                 
                  <td onClick={() => handleFieldClick(service)}>{service.discountRate}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.discountAmount}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.taxRate}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.taxAmount}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.total}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.subTotal}</td>
                  <td onClick={() => handleFieldClick(service)}>{service.selectedCurrency}</td>

                  <td>
                    <button
                      className="edit-button_5"
                      onClick={() => openUploadfilePopup(service)}
                    >
                      <HiOutlineViewfinderCircle title="file view" />
                    </button>
                    {showUploadfilesPopup &&
                      selectedServiceId === service._id && (
                        <div className="upload-dialogpopup">
                          <h2 style={{ color: "darkgreen" }}>Added Items</h2>
                          <span>{service.uniqueID}</span>
                          <table>
                            <thead>
                              <tr>
                      
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Services</th>
                              </tr>
                            </thead>
                            <tbody>
                              {service.items.map((item) => (
                                <tr key={item.id}>
                                
                                  <td>{item.item}</td>
                                  <td>{item.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.services}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="uploadfilebuttoncon">
                            <button
                              className="cancel"
                              onClick={() => setShowUploadfilesPopup(false)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                  </td>
                  <td>
                    <div className="asd_dsfet005">
                      <button
                        className="edit-button_5"
                        onClick={() => handleDownloadPDF(service)}
                      >
                        <FaDownload title="download" />
                      </button>
                      <ReactWhatsapp
                        number={service.clientContact}
                        message={generateWhatsappMessage(service)}
                        className="edit-button_5"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                          color: "green",
                        }}
                      >
                        <IoLogoWhatsapp
                          title="whats app"
                          style={{ fontSize: "x-large" }}
                        />
                      </ReactWhatsapp>

                      {confirmed && (
                        <div className="confirmation-dialog">
                          <p>Are you sure you want to delete this item?</p>
                          <button
                            className="cancel"
                            onClick={() => setConfirmed(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="confirm"
                            onClick={() => handleDeleteCus(service._id)}
                          >
                            Confirm
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{service.selectedPaymentMode}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <ReactJsPagination
           activePage={activePage}
           itemsCountPerPage={itemsPerPage}
           totalItemsCount={customerServicesCus.length}
           pageRangeDisplayed={5}
           onChange={handlePageChange}
            prevPageText={
              <span className="custom-pagination-arrow">
                <KeyboardArrowLeft />
              </span>
            }
            nextPageText={
              <span className="custom-pagination-arrow">
                <KeyboardArrowRight />
              </span>
            }
            firstPageText={
              <span className="custom-pagination-arrow">
                <KeyboardDoubleArrowLeft />
              </span>
            }
            lastPageText={
              <span className="custom-pagination-arrow">
                <KeyboardDoubleArrowRight />
              </span>
            }
            activeClass="active-page"
          />
        </div>
        
        <Popup
  open={!!selectedInvoice}
  onClose={() => setSelectedInvoice(null)}
  closeOnDocumentClick={true}
  className="invoice-popup"
>
  <InvoiceDetailsPopup
    selectedInvoice={selectedInvoice}
    onClose={() => setSelectedInvoice(null)}
  />
</Popup>

        <Popup
          open={selectedServiceCus !== null || isAddPopupOpenCus}
          onClose={handleCancelCus}
          closeOnDocumentClick={true}
        >
          <CustomerForm
            selectedServiceCus={selectedServiceCus}
            onSubmit={handleAddCusOrUpdate}
            onCancel={handleCancelCus}
            onDelete={handleDeleteCus}
          />
        </Popup>
      </div>
    </>
  );
};

export default PreviousBills;
