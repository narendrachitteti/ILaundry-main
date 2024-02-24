import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from 'react-icons/bi';
import { BiTrash } from 'react-icons/bi';
import InputGroup from 'react-bootstrap/InputGroup';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import image13 from "../components/images/background.jpg"
import '../Styles/Invoice.css'
import Navbar from '../components/Navbar';
import { GiFastBackwardButton } from "react-icons/gi";
import { Link } from 'react-router-dom';
import Backbutton from './Backbutton';
import { BASE_URL } from "../Helper/Helper.js"
import { GiClothes } from "react-icons/gi";
const styles = {
  section2: {
    display: "flex",
    justifyContent: "center",
  },
  loginBox2: {
    position: "relative",
  },
};

class InvoiceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      currency: "₹",
      currentDate: new Date().toLocaleDateString(),
      invoiceNumber: 1,
      customerName: null,
      Email: null,
      phoneNumber: null,
      notes: null,
      total: "0.00",
      subTotal: "0.00",
      taxRate: null,
      taxAmount: "0.00",
      discountRate: null,
      discountAmount: "0.00",
    };
    this.state.items = [
      {
        id: 0,
        name: "",
        description: "",
        price: "0.00",
        quantity: 0,
        selectedService: "",
      },
    ];
    this.editField = this.editField.bind(this);
  }
  handleBackButtonClick = () => {
    this.navigate(-1);
  };
  componentDidMount(prevProps) {
    this.handleCalculateTotal();
  }
  handleRowDel(items) {
    var index = this.state.items.indexOf(items);
    this.state.items.splice(index, 1);
    this.setState({ items: [...this.state.items] }, () => {
      this.handleCalculateTotal();
    });
  }

  handleAddEvent(evt) {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id: id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
      selectedService: "",
    };
    const updatedItems = [...this.state.items, newItem];
    this.setState({ items: updatedItems }, () => {
      this.handleCalculateTotal();
    });
  }

  generateInvoiceDataMessage = () => {
    // Assuming 'this.state' contains the necessary data
    const invoiceData = this.state;
    const message = `
      Invoice Number: ${invoiceData.invoiceNumber || ''}
      Customer Name: ${invoiceData.customerName || ''}
      Email: ${invoiceData.Email || ''}
      Phone Number: ${invoiceData.phoneNumber || ''}
      Notes: ${invoiceData.notes || ''}
      Total: ${invoiceData.total || ''}
      Subtotal: ${invoiceData.subTotal || ''}
      Tax Rate: ${invoiceData.taxRate || ''}
      Tax Amount: ${invoiceData.taxAmount || ''}
      Discount Rate: ${invoiceData.discountRate || ''}
      Discount Amount: ${invoiceData.discountAmount || ''}
      Items: ${JSON.stringify(invoiceData.items) || ''}
    `;

    return message;
  };
  handleBackButtonClick = () => {
    this.navigate(-1);
  };
  handleCalculateTotal() {
    const items = this.state.items;
    let subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat((item.price * item.quantity).toFixed(2));
    });

    const taxAmount = this.state.taxRate !== null ? parseFloat(subTotal * (this.state.taxRate / 100)).toFixed(2) : "0.00";
    const discountAmount = this.state.discountRate !== null ? parseFloat(subTotal * (this.state.discountRate / 100)).toFixed(2) : "0.00";
    const total = (subTotal - discountAmount + parseFloat(taxAmount)).toFixed(2);

    this.setState({
      subTotal: subTotal.toFixed(2),
      taxAmount: taxAmount,
      discountAmount: discountAmount,
      total: total,
    });
  }


  onItemizedItemEdit(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value,
    };
    var items = this.state.items.slice();
    var newItems = items.map(function (items) {
      for (var key in items) {
        if (key == item.name && items.id == item.id) {
          items[key] = item.value;
        }
      }
      return items;
    });
    this.setState({ items: newItems });
    this.handleCalculateTotal();
  }
  editField = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.handleCalculateTotal();
  };
  onCurrencyChange = (selectedOption) => {
    this.setState(selectedOption);
  };

  handleTaxRateChange = (event) => {
    const taxRate = event.target.value;
    this.setState({ taxRate }, () => {
      this.handleCalculateTotal();
    });
  };
  onServiceChange = (event, index) => {
    const { value } = event.target;
    const updatedItems = [...this.state.items];
    if (updatedItems[index]) {
      updatedItems[index].selectedService = value;
      this.setState({ items: updatedItems });
      this.handleCalculateTotal();
    } else {
      console.error(`Item at index ${index} does not exist.`);
    }
  }



  handleDiscountRateChange = (event) => {
    const discountRate = event.target.value;
    this.setState({ discountRate }, () => {
      this.handleCalculateTotal();
    });
  };
  openModal = async (event) => {
    event.preventDefault();
    this.handleCalculateTotal();
    console.log("Invoice Data:", this.state);

    try {
      console.log("Request URL:", `${BASE_URL}/invoice`);
      const response = await axios.post(`${BASE_URL}/invoice`, {
        currentDate: this.state.currentDate,
        invoiceNumber: this.state.invoiceNumber,
        customerName: this.state.customerName,
        phoneNumber: this.state.phoneNumber,
        Email: this.state.Email,
        notes: this.state.notes,
        items: this.state.items,
        total: this.state.total,
        subTotal: this.state.subTotal,
        taxRate: this.state.taxRate,
        taxAmount: this.state.taxAmount,
        discountRate: this.state.discountRate,
        discountAmount: this.state.discountAmount,
      });

      console.log("Invoice saved successfully:", response.data);
      this.setState({ isOpen: true });
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };
  closeModal = () => {
    this.setState({
      isOpen: false,
      currency: "₹",
      currentDate: new Date().toLocaleDateString(),
      invoiceNumber: 1,
      customerName: null,
      Email: null,
      phoneNumber: null,
      notes: null,
      total: "0.00",
      subTotal: "0.00",
      taxRate: null,
      taxAmount: "0.00",
      discountRate: null,
      discountAmount: "0.00",
      items: [
        {
          id: 0,
          name: "",
          description: "",
          price: "1.00",
          quantity: 1,
          selectedService: "",
        },
      ],
    });

  };



  render() {
    return (
      <div className='total89'
        style={{
          // backgroundImage: "url('https://img.freepik.com/free-vector/laundry-room-with-clean-dirty-clothes-equipment-furniture-bathroom-with-stuff-washing-machine-basket-with-dirty-stained-linen-shelf-towels-detergents-cartoon-illustration_107791-5925.jpg?w=996&t=st=1707891326~exp=1707891926~hmac=4f693f542f3b43d2da2d24745187576df77b1a7919e232414a1b5d1ba9fd4a70')",
          backgroundSize: `100% 100%`,

          backgroundImage: `url(${image13})`
        }}>

        <Navbar />

        <section style={styles.section2}>
          <div className="login-box" style={styles.loginBox2}>
            <Form onSubmit={this.openModal}>

              <div className='flexs87'><Backbutton />
                <h3 className='tct'>Customer Billing</h3>
              </div>
              <Row >

                <Col md={8} lg={9}>
                  <Card className="p-4 p-xl-5 my-3 my-xl-4" style={{ background: "rgba(255, 255, 255, 0.349)", backdropFilter: 'blur(20px)', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19' }}>
                    <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                      <div class="d-flex flex-column">
                        <div className="d-flex flex-column">
                          <div class="mb-2">
                            <span className="fw-bold">
                              Current&nbsp;Date:&nbsp;
                            </span>
                            <span className="currentdate">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center">
                        <span className="fw-bold me-2">
                          Invoice&nbsp;Number:&nbsp;
                        </span>
                        <Form.Control
                          type="number"
                          value={this.state.invoiceNumber}
                          name={"invoicenumber"}
                          onChange={(event) => this.editField(event)}
                          min="1"
                          style={{
                            maxWidth: "70px",
                          }}
                          required="required"
                        />
                      </div>
                    </div>
                    <hr className="my-4" />
                    <Row className="mb-5">
                      <Col>
                        <Form.Label className="fw-bold">Bill to:</Form.Label>
                        <div className='billflex' >
                          <Form.Control
                            placeholder={"Customer Name?"}
                            rows={3}
                            value={this.state.customerName}
                            type="text"
                            name="customerName"
                            className="my-2"
                            onChange={(event) => this.editField(event)}
                            autoComplete="name"
                            required="required"
                          />
                          <Form.Control
                            placeholder={"Email address"}
                            value={this.state.Email}
                            type="email"
                            name="Email"
                            className="my-2"
                            onChange={(event) => this.editField(event)}
                            autoComplete="email"
                            required="required"
                          />
                          <Form.Control
                            placeholder={"Phone number"}
                            value={this.state.phoneNumber}
                            type="number"
                            name="phoneNumber"
                            className="my-2"
                            autoComplete="address"
                            onChange={(event) => this.editField(event)}
                            required="required"
                          />
                        </div>
                      </Col>
                    </Row>
                    <InvoiceItem
                      onItemizedItemEdit={this.onItemizedItemEdit.bind(this)}
                      onRowAdd={this.handleAddEvent.bind(this)}
                      onServiceChange={this.onServiceChange}
                      onRowDel={this.handleRowDel.bind(this)}
                      currency={this.state.currency}
                      items={this.state.items}
                    />
                    <Row className="mt-4 justify-content-end">
                      <Col lg={6}>
                        <div className="d-flex flex-row align-items-start justify-content-between">
                          <span className="fw-bold">Subtotal:</span>
                          <span>
                            {this.state.currency}
                            {this.state.subTotal}
                          </span>
                        </div>
                        <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                          <span className="fw-bold">Discount:</span>
                          <span>
                            <span className="small ">
                              ({this.state.discountRate || 0}%)
                            </span>
                            {this.state.currency}
                            {this.state.discountAmount || 0}
                          </span>
                        </div>
                        <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                          <span className="fw-bold">Tax:</span>
                          <span>
                            <span className="small ">
                              ({this.state.taxRate || 0}%)
                            </span>
                            {this.state.currency}
                            {this.state.taxAmount || 0}
                          </span>
                        </div>
                        <hr />
                        <div
                          className="d-flex flex-row align-items-start justify-content-between"
                          style={{
                            fontSize: "1.125rem",
                          }}
                        >
                          <span className="fw-bold">Total:</span>
                          <span className="fw-bold">
                            {this.state.currency}
                            {this.state.total || 0}
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <hr className="my-4" />
                    <Form.Label className="fw-bold">Notes:</Form.Label>
                    <Form.Control
                      placeholder="Thanks for your business!"
                      name="notes"
                      value={this.state.notes}
                      onChange={(event) => this.editField(event)}
                      as="textarea"
                      className="my-2"
                      rows={1}
                    />
                  </Card>
                </Col>
                <Col md={4} lg={3}>
                  <div className="sticky-top pt-md-3 pt-xl-4" style={{ background: "rgba(255, 255, 255, 0.349)", backdropFilter: 'blur(20px)', marginTop: "1.5rem", padding: "2rem", borderRadius: "0.5rem", boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', zIndex: '4' }}>
                    <Button
                      variant="primary"
                      type="submit"
                      className="d-block w-100"
                    >
                      Review Invoice
                    </Button>
                    <InvoiceModal
                      showModal={this.state.isOpen}
                      closeModal={this.closeModal}
                      info={this.state}
                      items={this.state.items}
                      currency={this.state.currency}
                      subTotal={this.state.subTotal}
                      taxAmount={this.state.taxAmount}
                      discountAmount={this.state.discountAmount}
                      total={this.state.total}
                    />
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold"><span style={{ color: '#000', }}>Currency:</span></Form.Label>
                      <Form.Select
                        onChange={(event) =>
                          this.onCurrencyChange({ currency: event.target.value })
                        }
                        className="btn btn-light my-1"
                        aria-label="Change Currency"
                      >
                        <option value="₹">Rs (Indian Rupees)</option>
                        <option value="$">USD (United States Dollar)</option>
                        <option value="£">GBP (British Pound Sterling)</option>
                        <option value="¥">JPY (Japanese Yen)</option>
                        <option value="$">CAD (Canadian Dollar)</option>
                        <option value="$">AUD (Australian Dollar)</option>
                        <option value="$">SGD (Signapore Dollar)</option>
                        <option value="¥">CNY (Chinese Renminbi)</option>
                        <option value="₿">BTC (Bitcoin)</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="my-3">
                      <Form.Label className="fw-bold"><span style={{ color: 'black' }}>Tax rate:</span></Form.Label>
                      <InputGroup className="my-1 flex-nowrap">
                        <Form.Control
                          name="taxRate"
                          type="number"
                          value={this.state.taxRate}
                          onChange={this.handleTaxRateChange}
                          className="bg-white border"
                          placeholder="0.0"
                          min="0.00"
                          step="0.01"
                          max="100.00"
                        />
                        <InputGroup.Text className="bg-light fw-bold text-secondary small">
                          %
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="my-3">
                      <Form.Label className="fw-bold"><span style={{ color: 'black' }}>Discount rate:</span></Form.Label>
                      <InputGroup className="my-1 flex-nowrap">
                        <Form.Control
                          name="discountRate"
                          type="number"
                          value={this.state.discountRate}
                          onChange={this.handleDiscountRateChange}
                          className="bg-white border"
                          placeholder="0.0"
                          min="0.00"
                          step="0.01"
                          max="100.00"
                        />
                        <InputGroup.Text className="bg-light fw-bold text-secondary small">
                          %
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </div>
                </Col>
              </Row>
            </Form>{" "}
          </div>
        </section>
      </div>
    );
  }
}


class InvoiceItem extends React.Component {
  render() {
    var onItemizedItemEdit = this.props.onItemizedItemEdit;
    var currency = this.props.currency;
    var onServiceChange = this.props.onServiceChange;
    var rowDel = this.props.onRowDel;
    var itemTable = this.props.items.map((item, index) => {
      return (
        <ItemRow
          onItemizedItemEdit={onItemizedItemEdit}
          onServiceChange={(event) => onServiceChange(event, index)}
          item={item}
          onDelEvent={rowDel.bind(this)}
          key={item.id}
          currency={currency}
          index={index}
        />
      );
    });


    return (
      <div style={{ backgroundColor: 'none' }}>
        <Table >
          <thead className='table-header' >
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>{itemTable}</tbody>
        </Table>
        {/* <Button className="fw-bold" onClick={this.props.onRowAdd}>
          Add Item
        </Button> */}
        <button class="itembtn" onClick={this.props.onRowAdd}>
          <span>Add Item</span>

          <GiClothes className='svg' style={{ fontSize: '2rem' }} />

        </button>
      </div>
    );
  }
}
class ItemRow extends React.Component {
  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }

  render() {
    const { item, onItemizedItemEdit, onServiceChange, currency, index } = this.props;
    return (
      <tr>
        <td style={{ width: "100%" }}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Item name",
              value: item.name,
              id: item.id,
            }}
          />
          <Form.Label className="fw-bold"><span style={{ color: '#000' }}> Select Service:</span></Form.Label>
          <select
            id={`selectedService-${index}`}
            // value={item.selectedService}
            onChange={(event) => onServiceChange(event, index)}
            className="form-select my-1"
            aria-label={`Service for item ${item.id}`}
            value={item.selectedService || ""}
            key={item.id}
          >
            <option value="">Select Service</option>
            <option value="Wash & Fold">Wash & Fold</option>
            <option value="Wash & Iron">Wash & Iron</option>
            <option value="Premium Laundry">Premium Laundry</option>
            <option value="Steam Ironing">Steam Ironing</option>
          </select>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "description",
              placeholder: "Item description",
              value: item.description,
              id: item.id,
            }}
          />

        </td>
        <td style={{ minWidth: "70px" }}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: item.quantity,
              id: item.id,
            }}
          />
        </td>
        <td style={{ minWidth: "130px" }}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              leading: currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: item.price,
              id: item.id,
            }}
          />
        </td>
        <td className="text-center" style={{ minWidth: "50px" }}>
          {/* <BiTrash
            onClick={this.onDelEvent.bind(this)}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white mt-1 btn btn-danger"
          /> */}
          <button class="buttonbin" onClick={this.onDelEvent.bind(this)}>
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

        </td>
      </tr>
    );
  }
}

class EditableField extends React.Component {
  render() {
    return (
      <InputGroup className="my-1 flex-nowrap">
        {this.props.cellData.leading != null && (
          <InputGroup.Text className="bg-light fw-bold border-0 text-secondary px-2">
            <span
              className="border border-2 border-secondary rounded-circle d-flex align-items-center justify-content-center small"
              style={{ width: "20px", height: "20px" }}
            >
              {this.props.cellData.leading}
            </span>
          </InputGroup.Text>
        )}
        <Form.Control
          className={this.props.cellData.textAlign}
          type={this.props.cellData.type}
          placeholder={this.props.cellData.placeholder}
          min={this.props.cellData.min}
          name={this.props.cellData.name}
          id={this.props.cellData.id}
          value={this.props.cellData.value}
          step={this.props.cellData.step}
          presicion={this.props.cellData.presicion}
          aria-label={this.props.cellData.name}
          onChange={this.props.onItemizedItemEdit}
          required
        />
      </InputGroup>
    );
  }
}

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
}

class InvoiceModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Modal
          show={this.props.showModal}
          onHide={this.props.closeModal}
          size="lg"
          centered
        >
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="w-100">
                <h4 className="fw-bold my-2">
                  {this.props.info.billFrom || "I-Laundry"}
                </h4>
                <h4 className="fw-bold my-2">
                  {this.props.info.billFrom || "Payment Billing"}
                </h4>
                <h6 className="fw-bold text-secondary mb-1">
                  Invoice #: {this.props.info.invoiceNumber || ""}
                </h6>
              </div>
              <div className="text-end ms-4">
                <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                <h5 className="fw-bold text-secondary">
                  {" "}
                  {this.props.currency} {this.props.total}
                </h5>
              </div>
            </div>
            <div className="p-4">
              <Row className="mb-4">
                <Col md={4}>
                  <div className="fw-bold">Billed to:</div>
                  <div>{this.props.info.customerName || ""}</div>
                  <div>{this.props.info.phoneNumber || ""}</div>
                  <div>{this.props.info.Email || ""}</div>
                </Col>
              </Row>
              <Table className="mb-0">
                <thead style={{ backgroundColor: 'none' }}>
                  <tr >
                    <th >QTY</th>
                    <th>ITEM - DESCRIPTION</th>
                    <th className="text-end">PRICE</th>
                    <th className="text-end">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.items.map((item, i) => {
                    return (
                      <tr id={i} key={i}>
                        <td style={{ width: "70px" }}>{item.quantity}</td>
                        <td>
                          {item.name} - {item.description}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {this.props.currency} {item.price}
                        </td>
                        <td className="text-end" style={{ width: "100px" }}>
                          {this.props.currency} {item.price * item.quantity}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      SUBTOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {this.props.currency} {this.props.subTotal}
                    </td>
                  </tr>
                  {this.props.taxAmount !== null && parseFloat(this.props.taxAmount) !== 0 && (
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        TAX
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {this.props.currency} {this.props.taxAmount}
                      </td>
                    </tr>
                  )}
                  {this.props.discountAmount !== null && parseFloat(this.props.discountAmount) !== 0 && (
                    <tr className="text-end">
                      <td></td>
                      <td className="fw-bold" style={{ width: "100px" }}>
                        DISCOUNT
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {this.props.currency} {this.props.discountAmount}
                      </td>
                    </tr>
                  )}

                  <tr className="text-end">
                    <td></td>
                    <td className="fw-bold" style={{ width: "100px" }}>
                      TOTAL
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {this.props.currency} {this.props.total}
                    </td>
                  </tr>
                </tbody>
              </Table>
              {this.props.info.notes && (
                <div className="bg-light py-3 px-4 rounded">
                  {this.props.info.notes}
                </div>
              )}
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button
                  variant="primary"
                  className="d-block w-100"
                  onClick={GenerateInvoice}
                >
                  <BiPaperPlane
                    style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Send Invoice
                </Button>
              </Col>
              <Col md={6}>
                <Button
                  variant="outline-primary"
                  className="d-block w-100 mt-3 mt-md-0"
                  onClick={GenerateInvoice}
                >
                  <BiCloudDownload
                    style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                    className="me-2"
                  />
                  Download Copy
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
        <hr className="mt-4 mb-3" />
      </div>

    );

  }
}
export default InvoiceForm;