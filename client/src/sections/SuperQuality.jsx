import { shoe8 } from "../assets/images";
import Button from "../components/Button";
import aboutsimg1 from "../sections/images/aboutsimg1.jpg";
import "../sections/SuperQuality.css";
import { motion } from "framer-motion";
const SuperQuality = () => {
  return (
    <>
      <section
        id="about-us"
        className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
      >
        <motion.div
          animate={{ x: -300 }}
          whileInView={{ x: 0 }}
          transition={{ ease: "easeInOut", duration: 2 }}
          className="flex flex-1 flex-col"
        >
          <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
            We Provide You <span className="text-coral-red">Super</span>{" "}
            <span className="text-coral-red">Quality</span> Services
          </h2>

          <p className="mt-4 lg:max-w-lg info-text">
            Effortless Freshness, Tailored to You – Where Clean and Simple
            Unite, Every Wash, Every Fold.".
          </p>
          <p className="mt-6 lg:max-w-lg info-text">
            Our dedication to detail and excellence ensures your satisfaction
          </p>
        </motion.div>

        <motion.div
          animate={{ y: 0, scale: 0.4 }}
          whileInView={{ y: 0, scale: 1.0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="flex-1 flex justify-center items-center"
        >
          <img
            src="https://static.wixstatic.com/media/433ab0_8aded375e81e42c49e59ee7a5de3cedd~mv2.png/v1/crop/x_0,y_17,w_685,h_510/fill/w_569,h_425,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b9df27b01a8a843c7a645ab7cf122cb3.png"
            alt="shoe8"
            width={570}
            height={522}
            className="object-contain"
          />
        </motion.div>
      </section>

      <div className="section-down">
        <motion.div
          animate={{ y: 0, scale: 0.4, rotate: 360 }}
          whileInView={{ y: 0, scale: 1.0, rotate: 0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <img src={aboutsimg1} alt="" />
        </motion.div>
        <motion.div
          animate={{ x: 0, scale: 1.3 }}
          whileInView={{ x: 0, scale: 1.0 }}
          transition={{ ease: "easeInOut", duration: 1 }}
          className="right-textone"
        >
          <h1 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
            Clean And Hygiene
          </h1>
          <h2
            className="font-palanquin text-2xl capitalize font-bold lg:max-w-lg"
            color="text-coral-red"
          >
            Our team
          </h2>
          <p className="mt-6  info-text">
            Purely Pristine Laundry is a modern laundromat,Our company is here
            to help our customers get their laundry done efficiently in a safe
            and clean environment.
            <br />
            <br />
            Our superior levels of customer satisfaction is made possible by our
            laundry professionals.
          </p>
        </motion.div>
      </div>

      <section>
        <motion.div
          animate={{ x: 0, scale: 1.3 }}
          whileInView={{ x: 0, scale: 1.0 }}
          class="about-us left"
        >
          {/* <h1>About Us</h1> */}
          <h2 className="font-palanquin text-4xl mt-6 capitalize font-bold ">
            Our Story
          </h2>
          <p className="mt-7  info-text">
            At Purely Pristine Laundry, our journey began with a simple idea: to
            revolutionize the way people experience laundry services. Founded in
            [2016], we started as a small family-owned business with a passion
            for providing exceptional care for clothes.
          </p>
          <p className="mt-6  info-text">
            Driven by our commitment to quality and customer satisfaction, we
            expanded our services, embracing innovation and technology while
            preserving the values of reliability and trust.
          </p>

          <h2 className="font-palanquin text-4xl capitalize font-bold ">
            Our Mission
          </h2>
          <p className="mt-8  info-text">
            Our mission is to simplify and elevate the laundry experience for
            individuals and businesses alike. We strive to deliver unmatched
            convenience, reliability, and efficiency through our
            state-of-the-art facilities, eco-friendly practices, and
            personalized customer service.
          </p>
          <p className="mt-6  info-text">
            With every load of laundry, we aim to exceed expectations, leaving
            our customers with more than just clean clothes – we leave them with
            peace of mind and the freedom to focus on what matters most.
          </p>
        </motion.div>
      </section>
    </>
  );
};

export default SuperQuality;
