import { facebook, instagram, shieldTick, support, truckFast, twitter } from "../assets/icons";
import { customer1, customer2, shoe4, shoe5, shoe6, shoe7, thumbnailShoe1, thumbnailShoe2, thumbnailShoe3, bigshoe3s } from "../assets/images";
import bigShoe4 from "../assets/images/big-shoe4.png"
import bigShoe5 from "../assets/images/big-shoe5.png"
import wash1 from '../assets/images/wash1.jpg'
import ironing from '../assets/images/ironing.jpg'
import dd1 from '../assets/images/dd1.jpg'
import steam from '../assets/images/steam.jpg'



export const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#products", label: "Services" },
    { href: "#about-us", label: "About Us" },
  
    // { href: "#contact-us", label: "Contact Us" },
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
    { value: '1k+', label: 'Services' },
    { value: '20+', label: 'Branches' },
    { value: '250+', label: 'Customers' },
];

export const products = [
    {
        imgURL: wash1,
        name: "Wash & Fold",
        price: "₹60.00",
    },
    {
        imgURL: ironing,
        name: "Wash & Iron",
        price: "₹99.00",
    },
    {
        imgURL: dd1,
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
        subtext: "Enjoy seamless shopping with our complimentary shipping service."
    },
    {
        imgURL: shieldTick,
        label: "Secure Payment",
        subtext: "Experience worry-free transactions with our secure payment options."
    },
    {
        imgURL: support,
        label: "Love to help you",
        subtext: "Our dedicated team is here to assist you every step of the way."
    },
];

export const reviews = [
    {
        imgURL: customer1,
        customerName: 'Shahrukh',
        rating: 4.5,
        feedback: "This laundry service is a huge help during my busy work weeks. They collect my dirty clothes and return everything neatly folded so I can focus on my job."
    },
    {
        imgURL: customer2,
        customerName: 'Suhasini',
        rating: 5,
        feedback: "This laundry service is a lifesaver! They pick up and deliver my clothes washed, pressed and folded - far superior to the awful hostel laundry room. So convenient!"
    },
    // {
    //     imgURL: customer2,
    //     customerName: 'Suhas',
    //     rating: 5,
    //     feedback: "This laundry service is a lifesaver! They pick up and deliver my clothes washed, pressed and folded - far superior to the awful hostel laundry room. So convenient!"
    // }
];


export const footerLinks = [
    {
        title: "Services",
        links: [
            { name: "Wash and Fold", href: "#products"},
            { name: "Wash and Iron", href: "#products"},
            { name: "Dry Cleaning", href: "#products"},
            // { name: "Air Force 2", link: "/" },
            // { name: "Nike Waffle Racer", link: "/" },
            // { name: "Nike Cortez", link: "/" },
        ],
    },
    {
        title: "Help",
        links: [
            { name: "About us", link: "/" },
            { name: "FAQs", link: "/" },
            { name: "How it works", link: "/" },
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
    { src: facebook, alt: "facebook logo" , link: "https://www.facebook.com/" },
    { src: twitter, alt: "twitter logo", link: "https://twitter.com" },
    { src: instagram, alt: "instagram logo", link: "https://www.instagram.com" },
];