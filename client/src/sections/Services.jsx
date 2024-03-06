// import ServiceCard from "../components/ServiceCard"
// import { services } from "../constants"

// const Services = () => {
//   const headingStyle = {
//     color: 'orangered', // Set text color to orangered
//     fontSize: '24px', // Set font size
//     fontWeight: 'bold', // Set font weight
//     marginTop: '10px', // Set margin top for spacing
// };
//   return (
//     <div>
//     <h1 style={headingStyle}>Payment Policy</h1>


//     <section className="max-container flex justify-center flex-wrap" style={{gap:"20px"}}>
//       {
//         services.map((service) => (
//           <ServiceCard key={service.label} {...service} />
//         ))
//       }
//     </section>
//     </div>
//   )
// }

// export default Services





import ServiceCard from "../components/ServiceCard";
import { services } from "../constants";

const Services = () => {
  const headingStyle = {
    color: 'orangered', // Set text color to orangered
    fontSize: '40px', // Set font size
    fontWeight: 'bold', // Set font weight
    marginTop: '10px', // Set margin top for spacing
    textAlign: 'center', // Align text to center
    marginBottom: '50px', // Add margin bottom to create space between heading and cards
  };

  return (
    <div>
      <h1 style={headingStyle}>Payment Policy</h1>
      <section className="max-container flex justify-center flex-wrap" style={{ gap: "20px" }}>
        {services.map((service) => (
          <ServiceCard key={service.label} {...service} />
        ))}
      </section>
    </div>
  );
};

export default Services;
