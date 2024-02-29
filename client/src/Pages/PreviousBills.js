import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import CustomerForm from "./CustomerForm.js";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "../Styles/PreviousBills.css";
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
import { BASE_URL } from "../Helper/Helper.js";
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
  const [filteredData1, setFilteredData1] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [allData, setallData] = useState("");

  const fetchcustomerServicesCus = async () => {
    try {
      console.log("Fetching Customer Details");
      const response = await axios.get(`${BASE_URL}/invoice`);
      setcustomerServicesCus(response.data);
      console.log(customerServicesCus);
    } catch (error) {
      console.error("Error fetching Customer Details:", error);
    }
  };

  
  // const applyFilter = () => {
  //   let filteredData = [...customerServicesCus];
  
  //   // Check if any filter criteria are set
  //   if (searchTextCus || fromDate || toDate) {
  //     filteredData = customerServicesCus.filter((item) => {
  //       const isInSearchText = (item.invoiceNo && item.invoiceNo.toLowerCase().includes(searchTextCus.toLowerCase())) ||
  //         (item.invoiceDate && item.invoiceDate.includes(searchTextCus.toLowerCase())) ||
  //         (item.clientName && item.clientName.toLowerCase().includes(searchTextCus.toLowerCase())) ||
  //         (item.selectedCurrency && item.selectedCurrency.toLowerCase().includes(searchTextCus.toLowerCase()));
  
  //       const isInRange = (!fromDate || item.invoiceDate >= fromDate) &&
  //         (!toDate || item.invoiceDate <= toDate);
  
  //       return isInSearchText && isInRange;
  //     });
  //   }
  
  //   // Update the filtered data state
  //   setFilteredData1(filteredData);
  // };
  
  const applyFilter = useCallback(() => {
    let filteredData = [...customerServicesCus];
  
    // Check if any filter criteria are set
    if (searchTextCus || fromDate || toDate) {
      filteredData = customerServicesCus.filter((item) => {
        const isInSearchText = (item.invoiceNo && item.invoiceNo.toLowerCase().includes(searchTextCus.toLowerCase())) ||
          (item.invoiceDate && item.invoiceDate.includes(searchTextCus.toLowerCase())) ||
          (item.clientName && item.clientName.toLowerCase().includes(searchTextCus.toLowerCase())) ||
          (item.selectedCurrency && item.selectedCurrency.toLowerCase().includes(searchTextCus.toLowerCase()));
  
        const isInRange = (!fromDate || item.invoiceDate >= fromDate) &&
          (!toDate || item.invoiceDate <= toDate);
  
        return isInSearchText && isInRange;
      });
    }
  
    // Update the filtered data state
    setFilteredData1(filteredData);
  }, [customerServicesCus, fromDate, searchTextCus, toDate]);
  

  useEffect(() => {
    fetchcustomerServicesCus();
  }, []);
  // Effect to apply filter whenever criteria change


 useEffect(() => {
  applyFilter(); // Apply filter on initial load
}, [searchTextCus, fromDate, toDate, activePage]); 

  const handleCancelCus = () => {
    setselectedServiceCus(null);
    setAddPopupOpenCus(false);
  };

  const handleEditCus = (service) => {
    setselectedServiceCus(service);
    setAddPopupOpenCus(true);
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
        await axios.post(`${BASE_URL}/invoice/, formData`);
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
      filterByField(item, "currentDate", searchTextCus) ||
      filterByField(item, "customerName", searchTextCus) ||
      filterByField(item, "phoneNumber", searchTextCus) ||
      filterByField(item, "Email", searchTextCus) ||
      filterByField(item, "notes", searchTextCus) ||
      filterByField(item, "total", searchTextCus) ||
      filterByField(item, "subTotal", searchTextCus) ||
      filterByField(item, "taxRate", searchTextCus) ||
      filterByField(item, "taxAmount", searchTextCus) ||
      filterByField(item, "discountRate", searchTextCus) ||
      filterByField(item, "discountAmount", searchTextCus) ||
      filterByField(item, "items", searchTextCus)
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
    const dateX =
      pdf.internal.pageSize.getWidth() - pdf.getTextWidth(billingDateTime) - 1;
  
    pdf.text(invoiceName, invoiceNameX, 45, { align: "center" });
    pdf.setFontSize(10);
    pdf.text(`Date : ${billingDateTime}`, dateX, 45);
  
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
      { label: "Customer Name:", value: service.clientName },
      { label: "Contact Number:", value: service.clientContact },
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

    // Ensure tableRows is an array of objects
    // const tableRows = [
    //   ["Invoice No:", service.invoiceNo],
    //   ["Invoice Date:", service.invoiceDate],
    //   ["Client Name:", service.clientName],
    //   ["Client Contact:", service.clientContact],
    //   ["Subtotal :", service.subTotal],
    //   ["Discount Rate:", service.discountRate],
    //   ["Discount Amount:", service.discountAmount],
    //   ["Tax Rate:", service.taxRate],
    //   ["Tax Amount:", service.taxAmount],
    //   ["Total:", service.total],
    //   ["Currency:", service.selectedCurrency],
    // ];
  
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
      {label:"Rate per Unit:",value:service.Rate},
      { label: "Tax Amount:", value: service.taxAmount },
      { label: "Subtotal:", value: service.subTotal },
      { label: "Total:", value: service.total },
      { label: "Currency:", value: service.selectedCurrency },
      {label:"Payment Mode:",value:service.selectedPaymentMode},
    ];
  
    if (service.items && service.items.length > 0) {
      service.items.forEach((item, index) => {
        tableRows.push({
          label: `Item Type:`,
          value: item.item,
        });
        tableRows.push({
          label: `Item Quantity:`,
          value: item.quantity,
        });
        tableRows.push({
          label: 'Item Service Type',
          value: item.services,
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

  
  
  
  // const generateWhatsappMessage = (service) => {
    
  //   return `
  //   Invoice No: ${service.prefix}${service.invoiceNo}
  //   Invoice Date: ${service.invoiceDate}
  //   Client Name: ${service.clientName}
  //   Client Contact: ${service.clientContact}
  //   Subtotal: ${service.subTotal}
  //   Discount Rate: ${service.discountRate}
  //   Discount Amount: ${service.discountAmount}
  //   Tax Rate: ${service.taxRate}
  //   Tax Amount: ${service.taxAmount}
  //   Total: ${service.total}
  //   Currency: ${service.selectedCurrency}
  //   `
  // };
  const generateWhatsappMessage = (service) => {
    return `
      Customer Name: ${service.prefix}${service.customerName}
      Customer Phone Number: ${service.phoneNumber}
      Email: ${service.Email}
      Notes: ${service.notes}
      Total: ${service.total}
      Sub Total: ${service.subTotal}
      Tax Rate: ${service.taxRate}
      Tax Amount: ${service.taxAmount}
      Discount Rate: ${service.discountRate}
      Discount Amount: ${service.discountAmount}
      Items: ${service.items}
    `;
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
    applyFilter(); // Reapply filtering conditions when pagination changes
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

         
        </div>
        <table className="lab-service-table_5">
          <thead>
            <tr className="product-ooi">
              <th className="product-ooi">Date</th>
              <th className="product-ooi">Invoice No</th>
              <th className="product-ooi">Customer Name</th>
              <th className="product-ooi">Phone Number</th>
              <th className="product-ooi">Email </th>
              <th className="product-ooi">Total </th>
              <th className="product-ooi">SubTotal</th>
              <th className="product-ooi">TaxRate</th>
              <th className="product-ooi">Tax Amount</th>
              <th className="product-ooi">Invoice Date</th>
              <th className="product-ooi">Customer Name</th>
              <th className="product-ooi">Customer Contact</th>
             
              <th className="product-ooi">Discount Rate</th>
              <th className="product-ooi">Discount Amount</th>
              <th className="product-ooi">Items</th>
              <th className="product-ooi">Actions</th>
              <th className="product-ooi">Pay Mode</th>
              
            </tr>
          </thead>
          <tbody>
            {filteredData
              .slice(indexOfFirstItem, indexOfLastItem)
              .map((service) => (
                <tr key={service._id}>
                  <td>{service.currentDate}</td>
                  <td>
                    {service.invoiceNumber}
                  </td>
                  <td>
                    {service.customerName}
                  </td>
                  <td>{service.phoneNumber}</td>
                  <td>{service.Email}</td>
                  <td>{service.total}</td>
                  <td>{service.subTotal}</td>
                  <td>{service.taxRate}</td>
                  <td>{service.taxAmount}</td>
                  <td>{service.discountRate}</td>
                  <td>{service.discountAmount}</td>
                  <td>{service.selectedCurrency}</td>
                  
                 
                  
        
                 

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
                                <th>Description</th>
                                <th>Services</th>
                              </tr>
                            </thead>
                            <tbody>
                              {service.items.map((item) => (
                                <tr key={item.id}>
                                
                                  <td>{item.name}</td>
                                  <td>{item.price}</td>
                                  <td>{item.quantity}</td>
                                  <td>{item.description}</td>
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
                        number={service.phoneNumber}
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
            totalItemsCount={filteredData.length}
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
          open={selectedServiceCus !== null || isAddPopupOpenCus}
          onClose={handleCancelCus}
          closeOnDocumentClick
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