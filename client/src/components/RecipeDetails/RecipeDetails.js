import { useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useService } from "../../hooks/useService";
import { useState } from "react";

import { recipeServiceFactory } from "../../services/recipeService";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faClockRotateLeft, faUtensils, faList, faFireBurner, faComment, faFileEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import styles from './RecipeDetails.module.css';
import emptyImg from './empty_img.jpg';

import { recipeReducer } from "../../reducers/recipeReducer";

import * as  imageService from "../../services/imageService";
import * as  commentServise from "../../services/commentService";
import * as  ratingServise from "../../services/ratingService";

import { useAuthContex } from "../../contexts/AuthContext";
import { AddComment } from "./AddComment/AddComment";
import { AddRating } from "./AddRating/AddRating";
import { Rating } from "../Rating/Rating";
import { EditComment } from "./EditComment/EditComment";
import { DeleteConfirmation } from "../DeleteConfirmation/DeleteConfirmation";
import { useRecipeContext } from "../../contexts/RecipeContext";

export const RecipeDetails = () => {
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const { userId, isAuthenticated, username } = useAuthContex();

    const recipeService = useService(recipeServiceFactory);
    const [recipe, dispatch] = useReducer(recipeReducer, {})
    const { deleteRecipe } = useRecipeContext();

    const [show, setShow] = useState(false);
    const [commentId, setCommentId] = useState('');

    const [showCommentDelete, setShowCommentDelete] = useState(false);
    const [showRecipeDelete, setShowRecipeDelete] = useState(false);

    useEffect(() => {
        Promise.all([
            recipeService.getOne(recipeId),
            imageService.getAll(recipeId),
            commentServise.getAll(recipeId),
            ratingServise.getAll(recipeId),
        ])
            .then(([recipeData, images, comments, ratings, totalRating, isRated]) => {
                const recipeState = {
                    ...recipeData,
                    images,
                    comments,
                    ratings,
                    totalRating,
                    isRated,
                    currUserId: userId,
                };
                dispatch({ type: 'RECIPE_FECTH', payload: recipeState })
            });
    }, [recipeId]);

    const onCommentSubmit = async (values) => {
        const response = await commentServise.create(recipeId, values.comment, new Date());
        dispatch({
            type: "COMMENT_ADD",
            payload: response,
            username,
        });
    }

    const onRatingSubmit = async (rating) => {
        const response = await ratingServise.create(recipeId, rating);
        dispatch({
            type: "ADD_RATING",
            payload: response,
        });
    }

    const onEditSubmit = async (values) => {

        const response = await commentServise.edit(recipeId, values._id, values.comment, new Date());
        dispatch({
            type: "EDIT_COMMENT",
            payload: response,
        });
        setShow(false);
        setCommentId('');
    }

    const onHandleClose = () => {
        setShow(false);
        setCommentId('');
    }

    const onHandleShow = (e) => {
        setCommentId(e.currentTarget.value);
        setShow(true);
    }

    const onDeleteCommentShow = (e) => {
        setCommentId(e.currentTarget.value);
        setShowCommentDelete(true);
    }

    const onDeleteRecipeShow = () => {
        setShowRecipeDelete(true);
    }

    const onDeleteModalClose = () => {
        setShowCommentDelete(false);
        setShowRecipeDelete(false);
        setCommentId('');
    }

    const onDeleteCommentSubmit = () => {
        commentServise.deleteComment(commentId);
        dispatch({
            type: "DELETE_COMMENT",
            payload: commentId,
        });
        setShowCommentDelete(false);
        setCommentId('');
    }

    const onRecipeDeleteSubmit = async () => {
        await recipeService.deleteRecipe(recipeId);
        deleteRecipe(recipe._id);
        navigate('/catalog');
        setShowRecipeDelete(false);
    };

    const isOwner = recipe._ownerId === userId;

    return (
        <div className={styles.mainDiv}>
            <Card className={styles.recipeCard}>
                <Card.Header>
                    <p>
                        <Rating totalRating={Math.round(recipe.totalRating ? recipe.totalRating : 0)} ratingCount={recipe.ratings?.length}></Rating>
                    </p>
                </Card.Header>
                {<Card.Body>
                    {recipe.images?.length > 0 ?
                        <Card.Img src={recipe.images[0].image} style={{ maxWidth: "600px" }}></Card.Img>

                        : <Card.Img src={emptyImg} style={{ maxWidth: "600px" }}></Card.Img>
                    }
                    <Card.Title className={styles.title}>{recipe.title}</Card.Title>
                    <Table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <FontAwesomeIcon icon={faUtensils} size="2x" />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faClock} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faClockRotateLeft} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>Порции</span>
                                </td>
                                <td>
                                    <span>ٍПриготвене</span>
                                </td>
                                <td>
                                    <span>Готвене</span>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span>{recipe.portions}</span>
                                </td>
                                <td>
                                    <span>{recipe.preparingTime}</span>
                                </td>
                                <td>
                                    <span>{recipe.cookingTime}</span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    <Card.Text className={styles.boldText}>
                        <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
                        Продукти:
                    </Card.Text>
                    <hr />
                    <Card.Text style={{ whiteSpace: "pre-line", textAlign: "left" }}>
                        {recipe.products}
                    </Card.Text>
                    <Card.Text className={styles.boldText}>
                        <FontAwesomeIcon icon={faFireBurner}></FontAwesomeIcon>
                        Начин на приготвене
                    </Card.Text>
                    <hr />
                    آ<Card.Text>{new String(recipe.directions).replace(/(?:\r\n|\r|\n)/g, '\n')}</Card.Text>
                    {recipe.images && recipe.images.map((img, i) => (
                        i > 0 &&
                        <Card.Img key={img._id} src={img.image} style={{ maxWidth: "600px" }}></Card.Img>)
                    )}
                    {isOwner && (
                        <div className={styles.buttonsDiv} >
                            <Link to={`/recipeDetails/${recipeId}/edit`}  >
                                <Button variant="primary" size="lg">
                                    Редактирай
                                </Button></Link>
                            <Button variant="primary" onClick={onDeleteRecipeShow}>Изтрий</Button>
                        </div>)
                    }
                </Card.Body>}
            </Card>
            <h3>Коментари</h3>
            <ListGroup as="ol" className={styles.commentsList}>
                {recipe.comments && recipe.comments.map(x => (
                    <ListGroup.Item
                        as="div"
                        key={x._id}
                        className="d-flex justify-content-between align-items-start" >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">
                                <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>{x.author.username}</div>
                            {x.comment}
                        </div>
                        <div>
                            {new Date(x.createdDate).toLocaleDateString()}
                            {userId === x._ownerId && (
                                <>
                                    <Button id="button-size" onClick={onHandleShow} value={x._id} className={styles.buttonModal}>
                                        <FontAwesomeIcon icon={faFileEdit} />
                                    </Button>
                                    <Button id="button-size" onClick={onDeleteCommentShow} value={x._id} className={styles.buttonModal}>
                                        <FontAwesomeIcon icon={faRemove} />
                                    </Button>
                                </>
                            )}
                        </div>
                    </ListGroup.Item>))
                }
            </ListGroup>
            {commentId && (
                <>
                    <EditComment show={show} commentId={commentId} onEditSubmit={onEditSubmit} onHandleClose={onHandleClose}></EditComment>
                    <DeleteConfirmation
                        showDelete={showCommentDelete}
                        onDeleteModalClose={onDeleteModalClose}
                        onDeleteSubmit={onDeleteCommentSubmit}
                        message={"Сигурен ли сте, че искате да изтриете коментара?"} />
                </>
            )}
            <DeleteConfirmation
                showDelete={showRecipeDelete}
                onDeleteModalClose={onDeleteModalClose}
                onDeleteSubmit={onRecipeDeleteSubmit}
                message={"Сигурен ли сте, че искате да изтриете рецептата?"} />
            {!recipe.comments?.length && (<p className="no-comment">Няма добавен коментар.</p>)}
            {recipe.isRated && (<p>Благодарим за Вашата оценка! {recipe.isRated}</p>)}
            {!recipe.isRated && isAuthenticated && <AddRating onRatingSubmit={onRatingSubmit} />}
            {isAuthenticated && <AddComment onCommentSubmit={onCommentSubmit} />}
        </div>
    );
}