// import { headerLogo } from '../assets/images';
import { hamburger } from '../assets/icons';
import { navLinks } from '../constants';
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { arrowRight } from "../assets/icons";

const Nav = () => {
    return (
        <header className='padding-x py-8 absolute z-10 w-full fixed' style={{position:'fixed', top:'0', backgroundColor:'white',zIndex:'9999'}}>
            <nav className='flex justify-between items-center max-container'>
                <a href="/">
                    <img src="https://static.wixstatic.com/media/433ab0_209491b73e4046619d33d2eeab9ddef2~mv2.png/v1/fill/w_330,h_96,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/ilaundry.png" alt="Logo" width={130} height={29} />
                </a>
                <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden font-bold'>
                    {
                        navLinks.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className='font-montserrat leading-normal text-[18px] text-slate-gray no-underline hover:text-coral-red transition-all'
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))
                    }
                </ul>
                <Link className="no-underline" to="/Login" >
                <Button label="Login" iconURL={arrowRight} />
                </Link>
                <div className="hidden max-lg:block">
                    <img
                        src={hamburger}
                        alt="Hamburger"
                        width={25}
                        height={25}
                    />
                </div>
            </nav>
        </header>
    )
}

export default Nav;