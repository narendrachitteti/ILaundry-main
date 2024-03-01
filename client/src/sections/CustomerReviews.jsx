import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReviewCard from "../components/ReviewCard";
import { reviews } from "../constants";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomerReviews = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const handleCardClick = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,

        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className="max-container">
            <h3 className="font-palanquin text-center text-4xl font-bold">
                What Our <span className="text-coral-red">Customer</span> Say?
            </h3>
            <p className="info-text text-center font-montserrat m-auto mt-4 max-w-lg">
                Hear genuine stories from our satisfied customers about their exceptional experiences with us.
            </p>
            <div className="mt-24 mx-auto">
                <Slider {...settings}>
                    {reviews.map((review, index) => (
                        <div key={index} className="review-slide">
                            <motion.div
                                className="review-card-container"
                                style={{ filter: expandedIndex !== null && index !== expandedIndex ? 'blur(4px)' : 'none' }}
                                whileHover={{ scale: 1.1 }}
                                animate={{ scale: 1 }}
                                onClick={() => handleCardClick(index)}
                            >
                                <ReviewCard
                                    imgURL={review.imgURL}
                                    customerName={review.customerName}
                                    rating={review.rating}
                                    feedback={review.feedback}
                                />
                            </motion.div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CustomerReviews;
