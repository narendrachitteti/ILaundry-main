import {
  facebook,
  instagram,
  shieldTick,
  support,
  truckFast,
  twitter,
} from "../assets/icons";
import {
  customer1,
  customer2,
  shoe4,
  shoe5,
  shoe6,
  shoe7,
  thumbnailShoe1,
  thumbnailShoe2,
  thumbnailShoe3,
  bigshoe3s,
} from "../assets/images";
import bigShoe4 from "../assets/images/big-shoe4.png";
import bigShoe5 from "../assets/images/big-shoe5.png";
import wash1 from "../assets/images/wash1.jpg";
import ironing from "../assets/images/ironing.jpg";
import dd1 from "../assets/images/dd1.jpg";
import steam from "../assets/images/steam.jpg";
import customer6 from "../constants/customer6.jpeg";
import customer5 from "../constants/customer5.jpeg";
import customer7 from "../assets/images/customer7.jpeg";
import customer8 from "../assets/images/customer8.jpeg";
import premiumlaundr from "../constants/premiumlaundr.jpg";
import washfold from "../constants/washfold.jpg";
import washiron from "../constants/washiron.jpg";
import customer9 from "../constants/customer9.jpeg";
import customer10 from "../constants/customer10.jpeg";
import customer11 from "../constants/customer11.jpeg";
import customer12 from "../constants/customer12.jpeg";
import customer13 from "../constants/customer13.jpeg";
import customer14 from "../constants/customer14.jpeg";
import customer15 from "../constants/customer15.jpeg";
import customer16 from "../constants/customer16.jpeg";
import fold from "../constants/fold.jpeg";

export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Services" },
    { href: "#about-us", label: "About Us" },
    { href: "#contact-us", label: "Contact Us" }, 
  ];
  

export const shoes = [
  {
    thumbnail: wash1,
    bigShoe: wash1,
  },
  {
    thumbnail: dd1,
    bigShoe: dd1,
  },
  {
    thumbnail: ironing,
    bigShoe: ironing,
  },
];

export const statistics = [
  { value: "1k+", label: "Services" },
  { value: "20+", label: "Branches" },
  { value: "250+", label: "Customers" },
];

export const products = [
  {
    imgURL: fold,
    name: "Wash & Fold",
    price: "₹60.00",
  },
  {
    imgURL: washiron,
    name: "Wash & Iron",
    price: "₹99.00",
  },
  {
    imgURL: premiumlaundr,
    name: "Premium Laundry",
    price: "₹79.00",
  },
  {
    imgURL: steam,
    name: "Steam Ironing",
    price: "₹24.00",
  },
];

export const services = [
  {
    imgURL: truckFast,
    label: "Free shipping",
    subtext: "Enjoy seamless shopping with our complimentary shipping service.",
  },
  {
    imgURL: shieldTick,
    label: "Secure Payment",
    subtext:
      "Experience worry-free transactions with our secure payment options.",
  },
  {
    imgURL: support,
    label: "Love to help you",
    subtext: "Our dedicated team is here to assist you every step of the way.",
  },
];

export const reviews = [
  {
    imgURL: customer5,
    customerName: "Sanvitha",
    rating: 4.5,
    feedback:
      "This laundry service is a lifesaver! They pick up and deliver my clothes well.",
  },

  {
    imgURL: customer6,
    customerName: "Abhishek",
    rating: 4,
    feedback:
      "This laundry service is doing a good job. I liked their efforts regarding clothes. ",
  },

  {
    imgURL: customer7,
    customerName: "Shahrukh",
    rating: 4.5,
    feedback:
      "This laundry service is a huge help during my busy work weeks.",
  },
  {
    imgURL: customer8,
    customerName: "Suhasini",
    rating: 5,
    feedback:
      "This laundry service doing good job. I liked their work sincierity and well-maintained staff.",
  },

  {
    imgURL: customer9,
    customerName: "Tejashvi",
    rating: 4,
    feedback:
      "This laundry service is good to use for working people but maintain good effort",
  },

  {
    imgURL: customer10,
    customerName: "Ayansh",
    rating: 4.2,
    feedback: 
      "Here, Their services are good. They did good washing to my new clothes well.",
  },

  {
    imgURL: customer11,
    customerName: "Harsha",
    rating: 3.5,
    feedback:
      "Here, They are doing well but they damaged my slik clothes when using dry-cleaning.",
  },

  {
    imgURL: customer12,
    customerName: "Kajol",
    rating: 4,
    feedback:
      "I liked their eforts in laundry service. but should improve better.",
  },

  {
    imgURL: customer13,
    customerName: "Anushka",
    rating: 4,
    feedback:
      "Efficient service with prompt delivery, but could enhance customer communication well.",
  },

  {
    imgURL: customer14,
    customerName: "Rajesh",
    rating: 4.1,
    feedback:
      "Quality cleaning, but occasional delays in pickup and delivery could be improved."
  },

  {
    imgURL: customer15,
    customerName: "Vishnu",
    rating: 5,
    feedback:
    "Exceeding expectations with attention to detail, efficiency, and customer care."
  },

  {
    imgURL: customer16,
    customerName: "Vithika",
    rating: 5,
    feedback:
      " service offering high-quality results in both normal usage and occassional usage."
  },
];

export const footerLinks = [
  {
    title: "Services",
    links: [
      { name: "Wash and Fold", href: "#products" },
      { name: "Wash and Iron", href: "#products" },
      { name: "Dry Cleaning", href: "#products" },
      // { name: "Air Force 2", link: "/" },
      // { name: "Nike Waffle Racer", link: "/" },
      // { name: "Nike Cortez", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "customer@ilaundry.in", link: "mailto:customer@ilaundry.in" },
      { name: "+91 8884403325", link: "tel:+91-0987654321" },
    ],
  },
];

export const socialMedia = [
  { src: facebook, alt: "facebook logo", link: "https://www.facebook.com/" },
  { src: twitter, alt: "twitter logo", link: "https://twitter.com" },
  { src: instagram, alt: "instagram logo", link: "https://www.instagram.com" },
];
