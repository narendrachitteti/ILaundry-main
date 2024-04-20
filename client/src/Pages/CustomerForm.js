// import React, { useState, useEffect } from "react";
// import { TbWashMachine } from "react-icons/tb";
// import { GiCancel } from "react-icons/gi";
// import { MdDelete } from "react-icons/md";
// import "../Styles/CustomerForm.css"
// const CustomerForm = ({ selectedServiceCus, onSubmit, onCancel, onDelete }) => {
//   const [formData, setFormData] = useState({
//     uniqueID: "",
//     prefix: "",
//     customerName: "",
//     phoneNumber: "",
//     Email: "",
//     taxRate: "",
//     time: "",
//     total: "",
//     subTotal: "",
//     taxAmount: "",
//     discountRate: "",
//     discountAmount: "",
//     items: "",
//     paidstatus: "",
//   });

//   useEffect(() => {
//     if (selectedServiceCus) {
//       setFormData({
//         currenttaxRate: selectedServiceCus.currenttaxRate,
//         customerName: selectedServiceCus.customerName,
//         phoneNumber: selectedServiceCus.phoneNumber,
//         Email: selectedServiceCus.Email,
//         taxRate: selectedServiceCus.taxRate,
//         time: selectedServiceCus.time,
//         total: selectedServiceCus.total,
//         subTotal: selectedServiceCus.subTotal,
//         taxAmount: selectedServiceCus.taxAmount,
//         discountRate: selectedServiceCus.discountRate,
//         discountAmount: selectedServiceCus.discountAmount,
//         items: selectedServiceCus.items,
//         paidstatus: selectedServiceCus.paidstatus,
//       });
//     } else {
//       setFormData({
//         uniqueID: "",
//         prefix: "",
//         customerName: "",
//         phoneNumber: "",
//         Email: "",
//         taxRate: "",
//         time: "",
//         total: "",
//         subTotal: "",
//         taxAmount: "",
//         discountRate: "",
//         discountAmount: "",
//         items: "",
//         paidstatus: "",
//       });
//     }
//   }, [selectedServiceCus]);

//   // const handleChangeCus = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prevData) => ({ ...prevData, [name]: value }));

//   //   // Calculate Remaining Amount based on Total Amount, Paid Amount, and Commission Amount
//   //   if (
//   //     name === "taxAmount" ||
//   //     name === "discountRate" ||
//   //     name === "discountAmount"
//   //   ) {
//   //     const taxAmount = parseInt(e.target.form.taxAmount.value) || 0;
//   //     const discountRate = parseInt(e.target.form.discountRate.value) || 0;
//   //     const discountAmount =
//   //       parseInt(e.target.form.discountAmount.value) || 0;
//   //     const items = (
//   //       taxAmount -
//   //       discountRate -
//   //       discountAmount
//   //     ).toFixed(0);
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       items: items,
//   //     }));
//   //   }

//   //   if (name === 'items') {
//   //     // Assuming your items is an array of objects
//   //     const itemsArray = value.split('\n').map((item) => {
//   //       const [name, price, quantity, description] = item.split(', ');
//   //       return { name, price, quantity, description };
//   //     });
  
//   //     setFormData((prevData) => ({
//   //       ...prevData,
//   //       items: itemsArray,
//   //     }));
//   //   } else {
//   //     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   //   }
//   //   // Set paidstatus based on radio button selection
//   //   if (name === "paidstatus") {
//   //     setFormData((prevData) => ({ ...prevData, paidstatus: value }));
//   //   }
//   // };

//   const handleChangeCus = (e) => {
//     const { name, value } = e.target;


  
//     // Calculate Remaining Amount based on Total Amount, Paid Amount, and Commission Amount
//     if (name === "taxAmount" || name === "discountRate" || name === "discountAmount") {
//       const taxAmount = parseInt(formData.taxAmount) || 0;
//       const discountRate = parseInt(formData.discountRate) || 0;
//       const discountAmount = parseInt(formData.discountAmount) || 0;
  
//       setFormData((prevData) => ({
//         ...prevData,
//         taxAmount: taxAmount,
//         discountRate: discountRate,
//         discountAmount: discountAmount,
//       }));
//     }
  
//     if (name === 'items') {
//       const itemsArray = value.split('\n').map((itemString) => {
//         const item = {};
//         itemString.split(', ').forEach((field) => {
//           const [key, val] = field.split(': ');
//           item[key.trim()] = val.trim();
//         });
//         return item;
//       });
  
//       setFormData((prevData) => ({
//         ...prevData,
//         items: itemsArray,
//       }));
//     } else {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//     }
  
  
//     // Set paidstatus based on radio button selection
//     if (name === "paidstatus") {
//       setFormData((prevData) => ({ ...prevData, paidstatus: value }));
//     }
//   };
  

//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);

//   const handleDeleteConfirmation = () => {
//     setDeleteConfirmation(true);
//   };

//   const handleCancelDelete = () => {
//     setDeleteConfirmation(false);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       await onDelete();
//     } catch (error) {
//       console.error("Error deleting Customer Details:", error);
//     } finally {
//       setDeleteConfirmation(false);
//     }
//   };
  
//   const handleCancelCus = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     onCancel();
//   };
//   const handleSubmitCus = async (e) => {
//     e.preventDefault();
//     try {
//       if (!formData.uniqueID) {
//         // Fetch the latest count from the server
//         fetch("http://localhost:5000/Invoice")
//           .then((response) => response.json())
//           .then((data) => {
//             const newCount = parseInt(data.latestuniqueID) + 1;
//             setFormData((prevData) => ({
//               ...prevData,
//               uniqueID: newCount.toString(),
//             }));
//           })
//           .catch((error) =>
//             console.error("Error fetching latest S.No:", error)
//           );
//       }
  
//       await onSubmit(formData);
//       // Optionally, you can handle other UI updates or state changes here
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
  

//   return (
//     <>
//       <div className="Main-Details-popupcon">
//         <div class="Details-popupcon">
//           <div class="title">Add Customer Details</div>
//           <div class="content">
//             <form onSubmit={handleSubmitCus}>
//               <div class="user-details">
//                 <div class="input-box">
//                   <span class="details">Customer Name</span>
//                   <input
//                     type="text"
//                     placeholder="Enter name"
//                     name="customerName"
//                     value={formData.customerName}
//                     onChange={handleChangeCus}
//                     // required
//                   />
//                 </div>
//                 <div class="input-box">
//                   <span class="details">Customer Ph.no</span>
//                   <input
//                     type="tel"
//                     pattern="[0-9]*"
//                     onInput={(e) =>
//                       (e.target.value = e.target.value.replace(/\D/, ""))
//                     }
//                     placeholder="Enter customer phno"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChangeCus}
//                     // required
//                   />
//                 </div>
//                 <div class="input-box">
//                   <span class="details">Email</span>
//                   <input
//                     type="email"
//                     placeholder="Enter Email"
//                     name="Email"
//                     value={formData.Email}
//                     onChange={handleChangeCus}
//                     // required
//                   />
//                 </div>

//                 <div class="input-box">
//                   <span class="details">Total</span>
//                   <input
//                     type="number"
//                     pattern="[0-9]*"
//                     onInput={(e) =>
//                       (e.target.value = e.target.value.replace(/\D/, ""))
//                     }
//                     placeholder="Enter from address"
//                     name="total"
//                     value={formData.total}
//                     onChange={handleChangeCus}
//                     // required
//                   />
//                 </div>
//                 <div class="input-box">
//                   <span class="details">Sub Total</span>
//                   <input
//                     type="number"
//                     pattern="[0-9]*"
//                     onInput={(e) =>
//                       (e.target.value = e.target.value.replace(/\D/, ""))
//                     }
//                     placeholder="Enter to address"
//                     name="subTotal"
//                     value={formData.subTotal}
//                     onChange={handleChangeCus}
//                     // required
//                   />
//                 </div>
//                 <div class="input-box">
//                   <span class="details">Tax Rate</span>
//                   <input
//                     type="number"
//                     placeholder="Enter taxRate"
//                     name="taxRate"
//                     value={formData.taxRate}
//                     onChange={handleChangeCus}
//                     // required
//                   />
//                 </div>

//                 <div class="input-box">
//                   <span class="details">Tax amount</span>
//                   <input
//                     type="number"
//                     pattern="[0-9]*"
//                     // required
//                     name="taxAmount"
//                     value={formData.taxAmount}
//                     onChange={handleChangeCus}
//                   />
//                 </div>
//                 <div class="input-box">
//                   <span class="details">discount Rate</span>
//                   <input
//                     type="tel"
//                     pattern="[0-9]*"
//                     name="discountRate"
//                     value={formData.discountRate}
//                     onChange={handleChangeCus}
//                   />
//                 </div>
//                 <div class="input-box">
//                   <span class="details">Discount amount</span>
//                   <input
//                     type="number"
//                     pattern="[0-9]*"
//                     name="discountAmount"
//                     value={formData.discountAmount}
//                     onChange={handleChangeCus}
//                   />
//                 </div>
                
//                  {/* <div className="input-box">
//                  <span class="details">Items</span>
//                   <input
//                     id="items"
//                     name="items"
//                     value={formData.items.map((item) =>
//                       `Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Description: ${item.description}`
//                     ).join('\n')}
//                     onChange={handleChangeCus}
//                   />
//                 </div> */}
//                 <div className="input-box">
//                 <span class="details">Items</span>
//                 <input
//                   id="items"
//                   name="items"
//                   value={Array.isArray(formData.items) ? formData.items.map((item) =>
//                     `Name: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Description: ${item.description}`
//                   ).join('\n') : ''}
//                   onChange={handleChangeCus}
//                 />
//               </div>


//               </div>
//               <div className="button-con">
//                 <button class="button btn-123-abc" type="submit">
//                   <span class="text">
//                     {selectedServiceCus ? "Update" : "Add"}
//                   </span>
//                   <span class="marquee">
//                     <TbWashMachine />
//                   </span>
//                 </button>

//                 <button
//                   class="button buttoncd "
//                   type="button"
//                   onClick={handleCancelCus}
//                 >
//                   <div class="svg-wrapper-1">
//                     <div class="svg-wrapper">
//                       <GiCancel />
//                     </div>
//                   </div>
//                   <span>Cancel</span>
//                 </button>
//                 {selectedServiceCus && (
//                   <>
//                     <button
//                       class="button  buttoncd"
//                       type="button"
//                       onClick={handleDeleteConfirmation}
//                     >
//                       <div class="svg-wrapper-1">
//                         <div class="svg-wrapper">
//                           <MdDelete />
//                         </div>
//                       </div>
//                       <span>Delete</span>
//                     </button>
//                     {deleteConfirmation && (
//                       <div className="confirmation-dialog">
//                         <p>Are you sure you want to delete this item?</p>
//                         <button className="cancel" onClick={handleCancelDelete}>
//                           Cancel
//                         </button>
//                         <button
//                           className="confirm"
//                           onClick={handleConfirmDelete}
//                         >
//                           Confirm
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerForm;



import React, { useState, useEffect } from "react";
import { TbWashMachine } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import "../Styles/CustomerForm.css";
import { BASE_URL } from "../Helper/Helper.js";

const CustomerForm = ({ selectedServiceCus, onCancel, onUpdate }) => {
  const initialState = {
    customerName: "",
    phoneNumber: "",
    Email: "",
    taxRate: "",
    time: "",
    total: "",
    subTotal: "",
    taxAmount: "",
    discountRate: "",
    discountAmount: "",
    items: "",
    paidstatus: "",
    // Add other required fields here
  };

  const [service, setService] = useState(initialState);

  useEffect(() => {
    if (selectedServiceCus) {
      setService({ ...selectedServiceCus });
    } else {
      setService(initialState);
    }
  }, [selectedServiceCus]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      const url = selectedServiceCus
        ? `${BASE_URL}/api/billing/${selectedServiceCus._id}`
        : `${BASE_URL}/api/billing`;

      const method = selectedServiceCus ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(service),
      });

      const data = await response.json();
      console.log("Billing record saved:", data);

      // Call onUpdate to refresh data after successful update
      onUpdate();
    } catch (error) {
      console.error("Error saving billing record:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="Main-Details-popupcon">
      <div className="Details-popupcon">
        <div className="title">{selectedServiceCus ? "Edit" : "Add"} Customer Details</div>
        <div className="content">
          <form onSubmit={handleEdit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Client Name</span>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="customerName"
                  value={service.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Customer Ph.no</span>
                <input
                  type="tel"
                  pattern="[0-9]*"
                  placeholder="Enter customer phno"
                  name="phoneNumber"
                  value={service.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="Email"
                  value={service.Email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div class="input-box">
                  <span class="details">Total</span>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/\D/, ""))
                    }
                    placeholder="Enter from address"
                    name="total"
                    value={service.total}
                    // required
                  />
                </div>
                <div class="input-box">
                  <span class="details">Sub Total</span>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    onInput={(e) =>
                      (e.target.value = e.target.value.replace(/\D/, ""))
                    }
                    placeholder="Enter to address"
                    name="subTotal"
                    value={service.subTotal}
                    // required
                  />
                </div>
                <div class="input-box">
                  <span class="details">Tax Rate</span>
                  <input
                    type="number"
                    placeholder="Enter taxRate"
                    name="taxRate"
                    value={service.taxRate}
                    // required
                  />
                </div>

                <div class="input-box">
                  <span class="details">Tax amount</span>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    // required
                    name="taxAmount"
                    value={service.taxAmount}
                  />
                </div>
                <div class="input-box">
                  <span class="details">discount Rate</span>
                  <input
                    type="tel"
                    pattern="[0-9]*"
                    name="discountRate"
                    value={service.discountRate}
                  />
                </div>
                <div class="input-box">
                  <span class="details">Discount amount</span>
                  <input
                    type="number"
                    pattern="[0-9]*"
                    name="discountAmount"
                    value={service.discountAmount}
                  />
                </div>
                
              {/* Add more input fields for other billing details */}
            </div>
            <div className="button-con">
              <button className="button btn-123-abc" type="submit">
                <span className="text">{selectedServiceCus ? "Update" : "Add"}</span>
                <span className="marquee">
                  <TbWashMachine />
                </span>
              </button>
              <button className="button buttoncd" type="button" onClick={handleCancel}>
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <GiCancel />
                  </div>
                </div>
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
