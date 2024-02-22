import React from 'react';
import { useNavigate } from 'react-router-dom';

const Backbutton = () => {
    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1); // This will navigate back to the previous page
    };

    return (
        <div>
            <button
                className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
                title="Go Back"
                onClick={handleBackButtonClick}
                
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40px"
                    height="40px"
                    viewBox="0 0 24 24"
                    className="stroke-white"
                >
                    <path
                        stroke="rgb(14, 26, 61)"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M11 6L5 12M5 12L11 18M5 12H19"
                    ></path>
                </svg>
            </button>
        </div>
    );
};

export default Backbutton;
