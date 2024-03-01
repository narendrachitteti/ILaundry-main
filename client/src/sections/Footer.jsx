import { copyrightSign } from "../assets/icons";
import nikil from "../assets/images/ilaundry.jpg"
import { footerLinks, socialMedia } from "../constants";

const Footer = () => {
    return (
        <footer className="max-container">
            <div className="flex justify-between items-start gap-20 flex-wrap max-lg:flex-col">
                <div className="flex flex-col items-start">
                    <a href="/">
                        <img src={nikil} width={150} height={46} />
                    </a>
                    <p className="mt-6 text-base leading-7 font-montserrat text-white-400 sm:max-w-sm">
                        iLaundry is one of the largest online laundry service providers in Bangalore. We are dedicated to provide you with the best care for your garments.
                    </p>
                    <div className="flex items-center gap-5 mt-8">
                        {socialMedia.map((icon, index) => (
                            <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                                <div className="flex justify-center items-center w-12 h-12 bg-white rounded-full">
                                    <img src={icon.src} alt={icon.alt} width={24} height={24} />
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="flex flex-1 justify-between lg:gap-10 gap-20 flex-wrap">
                    {
                        footerLinks.map((section) => (
                            <div key={section}>
                                <h4 className="text-white font-montserrat text-2xl leading-normal ml-8 font-medium mb-6">{section.title}</h4>
                                <ul>
                                    {
                                        section.links.map((link) => (
                                            <li className="mt-3 text-white font-montserrat text-base leading-normal hover:text-slate-gray cursor-pointer" style={{background:'none'}}>
                                                <a className="no-underline text-white-400 " href="#products">{link.name}</a>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
                <div className="flex flex-1 justify-start gap-2 flex items-start font-montserrat cursor-pointer" style={{background:'none'}}> 
                    <img src={copyrightSign} alt="copy right sign" width={20} height={20} className="rounded-full m-0 " />
                    <p>Copyright 2024 All rights reserved <a className="text-white-400 no-underline" href="https://www.matrical.in/" target="_blank" >| Developed by Matrical Technologies Pvt Ltd.</a></p>
                </div>
                <p className="font-montserrat cursor-pointer"style={{background:'none'}}>Terms & Conditions*</p>
            </div>
        </footer>
    )
}

export default Footer;