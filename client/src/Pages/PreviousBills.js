
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import moment from "moment";
import { BASE_URL } from "../Helper/Helper.js";
import "../Styles/PreviousBills.css";
import Popup from "reactjs-popup";
import { MdEdit } from "react-icons/md";
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
// import Sidebar from "./Sidebar";
import Backbutton from "./Backbutton.js";
import InvoiceDetailsPopup from "./InvoiceDetailsPopup.js";
import { autoTable } from "pdfmake/build/pdfmake";
import "jspdf-autotable";
import StaffNavbar from "../components/StaffNavbar.js";
import { GiClothes } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";

const PreviousBills = ({service}) => {
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
      if (response && response.data) {
        const billingDataWithUsername = response.data.map((billing) => ({
          ...billing,
          username: billing.user ? billing.user.fullName : "", // Add null check here
          address: billing.user ? billing.user.address : "", // Add null check here

        }));
        setcustomerServicesCus(billingDataWithUsername);
        setAllData(billingDataWithUsername);
      } else {
        console.error("No data received from the server.");
      }
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

 

  const handlesearchTextCusChange = (newValue) => {
    console.log("Search Text:", newValue);
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


 

  const filteredData = customerServicesCus.filter((service) => {
    return (
      service?.invoiceNo?.toLowerCase().includes(searchTextCus.toLowerCase()) ||
      moment(service?.invoiceDate).format("DD-MM-YYYY").includes(searchTextCus) ||
      service?.clientName?.toLowerCase().includes(searchTextCus.toLowerCase()) ||
      (service?.clientContact && service.clientContact.includes(searchTextCus))
    );
  });
  
  console.log("customerServicesCus:", customerServicesCus);

  console.log("Filtered Data:", filteredData);

  
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
      { label: "Discount:", value: service.discountRate },
      { label: "Discount:", value: service.discountAmount },
      { label: "SGST 9%:", value: service.taxRate },
      { label: "Tax:", value: service.taxAmount },
      { label: "Subtotal:", value: service.subTotal },
      { label: "Total:", value: service.total },
      { label: "Currency:", value: service.selectedCurrency },
      { label: "Payment Mode:", value: service.selectedPaymentMode },

    ];

    if (service.items && service.items.length > 0) {
      service.items.forEach((item, index) => {
        tableRows.push({
          label: `Rate per unit:`,
          value: item.price,
        });
        tableRows.push({
          label: `Item Type:`,
          value: item.item,
        });
        tableRows.push({
          label: "Item Service Type:",
          value: item.services,
        });

        tableRows.push({
          label: `Item Quantity:`,
          value: item.quantity,
        });
      });
    }

    const headers = ["Particulars", "Amount"];
    const data = tableRows.map(({ label, value }) => [
      boldLabels.includes(label.replace(":", ""))
        ? label.replace(":", "")
        : label,
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
      invoiceNo,
      invoiceDate,
      user,
      clientName,
      clientContact,
      subTotal,
      discountRate,
      discountAmount,
      taxRate,
      taxAmount,
      total,
      selectedCurrency,
      items,
    } = service;

    // Check if all required properties are defined
    if (
      invoiceNo &&
      invoiceDate &&
      user &&
      user.fullName &&
      clientName &&
      clientContact &&
      subTotal &&
      discountRate &&
      discountAmount &&
      taxRate &&
      taxAmount &&
      total &&
      selectedCurrency &&
      items &&
      items.length > 0
    ) {
      const itemList = items
        .map(
          (item) =>
            `${item.item} - ${item.quantity} units x ${item.price} ${selectedCurrency} (${item.serviceType})`
        )
        .join("\n");

      return `
        Invoice No: ${invoiceNo}
        Invoice Date: ${moment(invoiceDate, 'DD-MM-YYYY').format("DD-MM-YYYY")}
        Staff Name: ${user.fullName}
        Client Name: ${clientName}
        Client Contact: ${clientContact}
        Subtotal: ${subTotal} ${selectedCurrency}
        Discount Rate: ${discountRate}%
        Discount Amount: ${discountAmount} ${selectedCurrency}
        Tax Rate: ${taxRate}%
        Tax Amount: ${taxAmount} ${selectedCurrency}
        Total: ${total} ${selectedCurrency}
        Items:
        ${itemList}
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
    console.log("From Date:", fromDate);
    console.log("To Date:", toDate);
    
    const filteredData = allData.filter((service) => {
      const invoiceDateParts = service.invoiceDate.split('/');
      const invoiceDate = new Date(`${invoiceDateParts[2]}-${invoiceDateParts[1]}-${invoiceDateParts[0]}`);
      console.log("Invoice Date:", invoiceDate);
      
      if (isNaN(invoiceDate.getTime())) {
        console.error("Invalid date format:", service.invoiceDate);
        return false;
      }
      
      const currentDate = invoiceDate.getTime();
      const fromTimestamp = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : 0;
      const toTimestamp = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : Infinity;
      console.log("Current Date:", currentDate);
      console.log("From Timestamp:", fromTimestamp);
      console.log("To Timestamp:", toTimestamp);
      return currentDate >= fromTimestamp && currentDate <= toTimestamp;
    });
  
    console.log("Filtered Data:", filteredData);
    
    setcustomerServicesCus(filteredData);
  };

  

  const handleDeleteCus = async (serviceId) => {
    try {
      await axios.delete(`${BASE_URL}/api/billing/${serviceId}`);
      // Update local state after successful deletion
      setcustomerServicesCus((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
      setSelectedInvoice(null); // Close any open popups if needed
    } catch (error) {
      console.error("Error deleting Customer Details:", error);
      // Handle error or show notification to user
    }
  };
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [tempStatus, setTempStatus] = useState(null); // Temp state for editing
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [Service, setService] = useState(null);
  const [, setCustomerServicesCus] = useState([]);

  const [selectedService, setSelectedService] = useState(null);

  // Function to handle in/out button click
  const handleButtonClick = (value) => {
    setTempStatus(value); // Update temp status
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setShowEditPopup(true);
  };

  // Function to handle closing edit popup
  const handleClosePopup = () => {
    setShowEditPopup(false);
    setSelectedService(null); // Reset selected service after closing popup
  };
  

  const payload = {
    user: {
      userId: '',
      fullName: ''
    },
    // Other billing details...
  };
  const handleUpdateClick = async () => {
    try {
      if (!selectedService || !selectedService._id) {
        console.error("Selected service or ID is undefined");
        return;
      }
  
      const updatedService = {
        storeStatus: storeStatus,
        factoryStatus: factoryStatus,
        // Add other fields to update as needed...
      };
  
      await axios.put(`${BASE_URL}/api/billing/${selectedService._id}`, updatedService);
  
      console.log("Billing updated successfully");
      // Close the edit popup after successful update
      setShowEditPopup(false);
      // Update the local state with the updated service
      setCustomerServicesCus((prevServices) =>
        prevServices.map((service) =>
          service._id === selectedService._id ? { ...service, ...updatedService } : service
        )
      );
    } catch (error) {
      console.error("Error updating billing record:", error);
      // Handle error if needed
    }
  };
  
  
  const handleCancelButton = () => {
    setSelectedService(null);
    setShowEditPopup(false);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const [storeStatus, setStoreStatus] = useState("");
const [factoryStatus, setFactoryStatus] = useState("");

const handleStoreStatusClick = (status) => {
  setStoreStatus(storeStatus === status ? "" : status);
};

const handleFactoryStatusClick = (status) => {
  setFactoryStatus(factoryStatus === status ? "" : status);
};


  return (
    <>
    {/* <Sidebar /> */}
      <StaffNavbar/>
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
            <th className="product-ooi">Staff Name</th>
            <th className="product-ooi">Customer Name</th>
            <th className="product-ooi">Contact</th>
            <th className="product-ooi">Address</th>
            <th className="product-ooi">D&R</th>
            <th className="product-ooi">D&A</th>
            <th className="product-ooi">T&R</th>
            <th className="product-ooi">T&A</th>
            <th className="product-ooi">Total</th>
            <th className="product-ooi">Subtotal </th>
            <th className="product-ooi">Currency</th>
            <th className="product-ooi">Items</th>
            <th className="product-ooi">Actions</th>             
            <th className="product-ooi">Pay Mode</th>
              <th className='thbilling87' >Store (In/Out)</th>
              <th className="product-ooi" >Factory (In/Out)</th>
               <th className="product-ooi">Status</th>              
              {/* <th className="product-ooi">Staff Name</th> */}
            </tr>

          

          </thead>
          <tbody>
            {filteredData
              .slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)
              .map((service, index) => (
                <tr key={service._id}>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.invoiceNo}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.invoiceDate
                      ? moment(service.invoiceDate, 'DD-MM-YYYY').format("DD-MM-YYYY")
                      : ""}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                  {service.user ? service.user.fullName : ""} {/* Add null check */}
                </td>
                <td onClick={() => handleFieldClick(service)}>
                  {service.clientName}
                </td>
                <td onClick={() => handleFieldClick(service)}>
                    {service.clientContact}
                  </td>

                <td onClick={() => handleFieldClick(service)}>
                    {service.customeraddress}
                  </td>

                  <td onClick={() => handleFieldClick(service)}>
                    {service.discountRate}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.discountAmount}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.taxRate}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.taxAmount}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.total}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.subTotal}
                  </td>
                  <td onClick={() => handleFieldClick(service)}>
                    {service.selectedCurrency}
                  </td>

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

            

                  <td> <span className={service.storeStatus.includes("SIn") ? "S-In" : "S-Out"}>{service.storeStatus.includes("SIn") ? "S-In" : "S-Out"}</span></td>
                  <td> <span className={service.factoryStatus.includes("FIn") ? "F-In" : "F-Out"}>{service.factoryStatus.includes("FIn") ? "F-In" : "F-Out"}</span></td>

             <td>
             <button className="Btn77" onClick={() => handleEditClick(service)}>Edit
              <svg class="svg" viewBox="0 0 512 512">
        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path></svg></button>
               
            </td> 
           
                </tr>
              ))}
          </tbody>
        </table>

        <Popup open={showEditPopup} onClose={handleClosePopup}>
        <div className="edit-popup">
          <h2>Select Status</h2>
          <button
          onClick={() => handleStoreStatusClick("SIn")}
          className={`status-button ${storeStatus === "SIn" ? "enabled" : "disabled"}`}
          disabled={storeStatus === "SOut"}
        >
         <span>S-In</span> 
        </button>
        <button
          onClick={() => handleStoreStatusClick("SOut")}
          className={`status-button ${storeStatus === "SOut" ? "enabled" : "disabled"}`}
          disabled={storeStatus === "SIn"}
        >
           <span>S-Out</span>
        </button>
        <button
          onClick={() => handleFactoryStatusClick("FIn")}
          className={`status-button ${factoryStatus === "FIn" ? "enabled" : "disabled"}`}
          disabled={factoryStatus === "FOut"}
        >
           <span>F-In</span>
        </button>
        <button
          onClick={() => handleFactoryStatusClick("FOut")}
          className={`status-button ${factoryStatus === "FOut" ? "enabled" : "disabled"}`}
          disabled={factoryStatus === "FIn"}
        >
           <span>F-Out</span>
        </button>
        

        
          <button onClick={handleUpdateClick}>Update</button>
          <button onClick={handleCancelButton}>Cancel</button>

        </div>
      </Popup>
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

       
      </div>
    </>
  );
};

export default PreviousBills;