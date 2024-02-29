import React from 'react';
import ReviewCard from "../components/ReviewCard";
import { reviews } from "../constants";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomerReviews = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
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
                    {reviews.map((review) => (
                        <div key={review.customerName} className="review-slide">
                            <ReviewCard
                                imgURL={review.imgURL}
                                customerName={review.customerName}
                                rating={review.rating}
                                feedback={review.feedback}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default CustomerReviews;
