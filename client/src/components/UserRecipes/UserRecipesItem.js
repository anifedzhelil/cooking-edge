import { Card } from 'react-bootstrap';
import styles from '../Catalog/styles/Catalog.module.css';
import { Link } from 'react-router-dom';
import { Rating } from '../Rating/Rating';

export const UserRecipesItem = ({
    _id,
    title,
    portions,
    imageUrl,
    totalRating,
    ratingCount,
    createdDate,
}) => {
    return (
        <>
            <style type="text/css">
                {`.checkssed {
                    color: orange;
}`}
            </style>
            <Card style={{ width: '18rem' }}>
                <Card.Link as={Link} to={`/recipe-details/${_id}`}>
                    <Card.Img variant="top" src={imageUrl} style={{ height: "200px" }} />
                </Card.Link>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <Rating totalRating={totalRating.toFixed(2)} ratingCount={ratingCount}></Rating>
                    </Card.Text>
                    <Card.Text>Порция {portions}</Card.Text>
                </Card.Body>
                <Card.Footer>{new Date(createdDate).toLocaleDateString()}</Card.Footer>
            </Card>
        </>
    );

} 