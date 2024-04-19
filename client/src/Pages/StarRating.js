import React, { useState } from 'react';
import './StarRating.css';
import 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import Sidebar from "./Sidebar";

const StarRating = ({ onRatingSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleClick = (ratingValue) => {
        setRating(ratingValue);
        onRatingSubmit(ratingValue);
    };

    return (
        <div className="star-rating">
            {Array.from({ length: 5 }, (_, index) => {
                const starValue = index + 1;
                return (
                    <span
                        key={index}
                        className={`star ${starValue <= (hover || rating) ? 'filled' : ''}`}
                        onClick={() => handleClick(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

const RatingCard = ({ title, imageSrc, onRatingSubmit }) => {
    return (
        <div className="rating-card">
            <img src={imageSrc} alt={title} className="card-image" />
            <h4>{title}</h4>
            <StarRating onRatingSubmit={onRatingSubmit} />
        </div>
    );
};

const RatingSystem = () => {
    const [step, setStep] = useState(0);
    const [ratings, setRatings] = useState({
        washing: 0,
        drying: 0,
        ironing: 0,
        cleaning: 0,
    });
    const [totalReviews, setTotalReviews] = useState(0);
    const [reviews, setReviews] = useState([]);

    const ratingCategories = [
        { title: 'Washing', imageSrc: 'https://img.freepik.com/premium-vector/man-wash-clothes-with-washing-machine_294791-150.jpg' },
        { title: 'Drying', imageSrc: 'https://img.freepik.com/free-vector/laundry-room-equipment-wash-dry-clothes-cartoon-set-washing-machine-basket-detergent-bottles-powder-rope-with-hanging-underwear-shirts-isolated-white-wall_107791-5924.jpg' },
        { title: 'Ironing', imageSrc: 'https://images.philips.com/is/image/philipsconsumer/f93337ba5a914818b419ad14010e87af?$jpglarge$' },
        { title: 'Cleaning', imageSrc: 'https://img.freepik.com/free-vector/cleaning-team-with-brooms-vacuum-cleaner-man-woman-uniform-with-professional-equipment-ready-work-together-flat-vector-illustration-cleaning-service-teamwork-occupation-concept_74855-24396.jpg' },
    ];

    const handleRatingSubmit = (rating) => {
        const category = ratingCategories[step].title.toLowerCase();
        setRatings((prevRatings) => ({
            ...prevRatings,
            [category]: rating,
        }));

        const updatedTotalReviews = totalReviews + 1;
        setTotalReviews(updatedTotalReviews);

        const newReview = { category, rating };
        const updatedReviews = [...reviews, newReview];
        setReviews(updatedReviews);

        if (step < ratingCategories.length - 1) {
            setStep(step + 1);
        } else {
            alert('Thank you for submitting your ratings!');
        }
    };

    const groupReviewsByRating = () => {
        const groupedReviews = {};
        for (const review of reviews) {
            const ratingValue = review.rating;
            const category = review.category;

            if (!groupedReviews[ratingValue]) {
                groupedReviews[ratingValue] = {
                    washing: [],
                    drying: [],
                    ironing: [],
                    cleaning: [],
                };
            }

            groupedReviews[ratingValue][category].push(review);
        }
        return groupedReviews;
    };

    const groupedReviews = groupReviewsByRating();

    const chartData = {
        labels: ['Washing', 'Drying', 'Ironing', 'Cleaning'],
        datasets: [
            {
                label: 'Customer Reviews',
                data: [ratings.washing, ratings.drying, ratings.ironing, ratings.cleaning],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                min: 1,
                max: 5,
                stepSize: 1,
                ticks: {
                    precision: 0,
                    beginAtZero: false,
                },
            },
        },
    };

    return (
        <div className='maincontainer'>
        <div className="rating-system">
            <Sidebar />
            <h3>Rate Our Services</h3>
            {step < ratingCategories.length ? (
                <RatingCard
                    title={ratingCategories[step].title}
                    imageSrc={ratingCategories[step].imageSrc}
                    onRatingSubmit={handleRatingSubmit}
                />
            ) : (
                <div>
                    <h4>Thank you for submitting your ratings!</h4>
                    <p>Washing: {ratings.washing}</p>
                    <p>Drying: {ratings.drying}</p>
                    <p>Ironing: {ratings.ironing}</p>
                    <p>Cleaning: {ratings.cleaning}</p>
                </div>
            )}

            <div className="chart-container">
                <Bar data={chartData} options={chartOptions} />
            </div>

            <p>Total Reviews Submitted: {totalReviews}</p>

            <div className="grouped-reviews-table">
                <h4>Grouped Reviews by Rating</h4>
                <table className="grouped-review-table">
                    <thead>
                        <tr>
                            <th>Rating</th>
                            <th>Washing</th>
                            <th>Drying</th>
                            <th>Ironing</th>
                            <th>Cleaning</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(groupedReviews).map((ratingValue) => (
                            <tr key={ratingValue}>
                                <td>{ratingValue}</td>
                                {['washing', 'drying', 'ironing', 'cleaning'].map((category) => (
                                    <td key={category}>
                                        {groupedReviews[ratingValue][category].length}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    );
};

export default RatingSystem;
