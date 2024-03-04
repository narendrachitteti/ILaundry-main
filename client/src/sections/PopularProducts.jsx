import PopularProductCard from "../components/PopularProductCard";
import { products } from "../constants";
import { motion } from "framer-motion";

const PopularProducts = () => {
  return (
    <section id="products" className="max-container max-sm:mt-12">
      <motion.div
        animate={{ y: -250 }}
        whileInView={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 3 }}
        className="flex flex-col justify-start gap-2"
      >
        <h2 className="text-4xl font-palanquin font-bold">
          Our <span className="text-coral-red">Popular</span> Services
        </h2>
        <p className=" mt-4 text-slate-gray info-text">
          Experience top-notch quality and style with our sought-after
          selections. Discover a world of comfort, design, and value.
        </p>
      </motion.div>

      <motion.div  className="mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-4 gap-14">
        {products.map((product) => (
          <PopularProductCard key={product.name} {...product} />
        ))}
      </motion.div>
    </section>
  );
};

export default PopularProducts;
