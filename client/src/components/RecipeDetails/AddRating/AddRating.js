import { useState } from "react";
import styles from './AddRating.module.css';
import { Button } from "react-bootstrap";

export const AddRating = ({ onRatingSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);


    return (
        <>
            <div className="star-rating" style={{padding: "10px"}}>
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}
                            className={index <= (hover || rating) ? styles.buttonOn : styles.buttonOff}
                            onClick={() => setRating(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(rating)}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <Button variant="primary" type="submit" onClick={() => onRatingSubmit(rating)}>Добави оценка</Button>

        </>
    );
};
