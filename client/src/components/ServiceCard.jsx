// // // import React from 'react'

// // const ServiceCard = ({ imgURL, label, subtext }) => {
// //     return (
// //         <div className="flex-1 sm:w-[350px] sm:min-w-[350px] w-full rounded-[20px] shadow-3xl px-10 py-16">
// //             <div className="w-11 h-11 flex justify-center items-center bg-coral-red rounded-full">
// //                 <img src="https://www.dhobiwala.com/images/towel-icon.png" alt={label} width={24} height={24} />
// //             </div>
// //             <h3 className="font-palanquin mt-5 text-3xl leading-normal font-bold">{label}</h3>
// //             <p className="mt-3 break-words font-montserrat text-slate-gray">{subtext}</p>
// //         </div>
// //     )
// // }

// // export default ServiceCard;




// import React from 'react';

// const ServiceCard = ({ imgURL, label, subtext }) => {
//     const cardStyle = {
//         backgroundColor: '#fff', // Set background color to white
//         borderRadius: '20px', // Rounded corners
//         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow
//         padding: '16px 24px', // Padding
//         width: '100%', // Full width
//         maxWidth: '350px', // Maximum width for small screens
//         minWidth: '350px', // Minimum width for small screens
//         height: '300px', // Set a specific height
//         // marginBottom: '10px', // Add margin bottom for gap between cards
//     };

//     return (
//         <div style={cardStyle}>
//             <div className="w-11 h-11 flex justify-center items-center bg-coral-red rounded-full">
//                 <img src="https://www.dhobiwala.com/images/towel-icon.png" alt={label} width={24} height={24} />
//             </div>
//             <h3 className="font-palanquin mt-5 text-3xl leading-normal font-bold">{label}</h3>
//             <p className="mt-3 break-words font-montserrat text-slate-gray">{subtext}</p>
//         </div>
//     );
// }

// export default ServiceCard;






import React from 'react';

const ServiceCard = ({ imgURL, label, subtext }) => {
    const cardStyle = {
        backgroundColor: '#fff', // Set background color to white
        borderRadius: '20px', // Rounded corners
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow
        padding: '16px 24px', // Padding
        width: '100%', // Full width
        maxWidth: '350px', // Maximum width for small screens
        minWidth: '350px', // Minimum width for small screens
        height: '300px', // Set a specific height
        // marginBottom: '10px', // Add margin bottom for gap between cards
    };

    

    return (
        <div>
       
        <div style={cardStyle}>
            <div className="w-11 h-11 flex justify-center items-center bg-coral-red rounded-full">
                <img src="https://www.dhobiwala.com/images/towel-icon.png" alt={label} width={24} height={24} />
            </div>
            <h3 className="font-palanquin mt-5 text-3xl leading-normal font-bold">{label}</h3>
            <p className="mt-3 break-words font-montserrat text-slate-gray">{subtext}</p>
           </div>
        </div>
    );
}

export default ServiceCard;
