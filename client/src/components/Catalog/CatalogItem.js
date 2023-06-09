import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Rating } from '../Rating/Rating';
import emptyImage from './styles/empty_img.jpg';

export const CatalogItem = ({
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
                <Card.Link as={Link} to={`/catalog/${_id}`}>
                    <Card.Img variant="top" src={imageUrl !== '' ? imageUrl : emptyImage} style={{ height: "200px" }} />
                </Card.Link>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        <Rating totalRating={totalRating.toFixed(2)} ratingCount={ratingCount}></Rating>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>{new Date(createdDate).toLocaleDateString()}</Card.Footer>
            </Card>
        </>
    );

} 