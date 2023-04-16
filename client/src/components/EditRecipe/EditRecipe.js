import styles from './EditRecipe.module.css';

import { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { useParams } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { useService } from "../../hooks/useService";
import { useRecipeContext } from "../../contexts/RecipeContext";
import { RecipeCategories, Diffuculty, RecipeFormKeys } from '../../constants/GlobalConstants';

import { recipeServiceFactory } from "../../services/recipeService";
import * as  imageService from "../../services/imageService";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { DeleteConfirmation } from '../DeleteConfirmation/DeleteConfirmation';

export const EditRecipe = () => {
    const { onRecipeEditSubmit } = useRecipeContext();
    const recipeService = useService(recipeServiceFactory);

    const [validated, setValidated] = useState(false);
    const [images, setImages] = useState({});
    const { recipeId } = useParams();
    const [show, setShow] = useState(false);
    const [imageId, setImageId] = useState(false);

    const { values, changeHandler, onSubmit, checkChangeHandler, fileChangeHandler, changeValues } = useForm({
        [RecipeFormKeys.Title]: '',
        [RecipeFormKeys.Category]: '',
        [RecipeFormKeys.PreparingTime]: '',
        [RecipeFormKeys.CookingTime]: '',
        [RecipeFormKeys.Difficulty]: '',
        [RecipeFormKeys.Products]: '',
        [RecipeFormKeys.Directions]: '',
        [RecipeFormKeys.Portions]: '',
        [RecipeFormKeys.IsVegan]: false,
        [RecipeFormKeys.IsVegeterian]: false,
        [RecipeFormKeys.IsGlutenFree]: false,
        [RecipeFormKeys.IsDairyFree]: false,
        [RecipeFormKeys.Images]: {},
    }, onRecipeEditSubmit);


    useEffect(() => {
        Promise.all([
            recipeService.getOne(recipeId),
            imageService.getAll(recipeId),
        ])
            .then(([recipeData, images]) => {
                changeValues(recipeData);
                setImages(images);
            });
    }, [recipeId]);

    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            onSubmit(event);
        }
        setValidated(true);
    };

    const onModalShow = (e) => {
        setImageId(e.currentTarget.value);
        setShow(true);
    }

    const onDeleteModalClose = (e) => {
        setShow(false);
        setImageId('');
    }

    const onDeleteSubmit = () => {
        imageService.deleteImage(imageId);
        setImages(state => state.filter(image => image._id !== imageId));
        setShow(false);
    }

    return (
        <Form className={styles.createForm} onSubmit={handleSubmit} noValidate validated={validated} >
            <Form.Group className="mb-3" >
                <Form.Label>Заглавие</Form.Label>
                <Form.Control placeholder="Заглавие..."
                    id="title"
                    required
                    name={RecipeFormKeys.Title}
                    type="input"
                    value={values[RecipeFormKeys.Title]}
                    onChange={changeHandler} />
                <Form.Control.Feedback type="invalid">
                    Моля въведете заглавие.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" as={Col} >
                <Form.Label>Категория</Form.Label>
                <Form.Select required aria-label="Избери.." onChange={changeHandler} value={values[RecipeFormKeys.Category]} name={RecipeFormKeys.Category}>
                    <option value="" disabled selected="selected">Избери...</option>
                    <option value={RecipeCategories.Salad}>Салата</option>
                    <option value={RecipeCategories.Soup}>Супа</option>
                    <option value={RecipeCategories.Breakfast}>Закуска</option>
                    <option value={RecipeCategories.MainDish}>Основно ястие</option>
                    <option value={RecipeCategories.Dessert}>Десерт</option>
                    <option value={RecipeCategories.Drink}>Напитка</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                    Моля изберете категория.
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Време за подготовка (мин)</Form.Label>
                    <Form.Control type="number"
                        required
                        min="1"
                        id="preparingTime"
                        name={RecipeFormKeys.PreparingTime}
                        value={values[RecipeFormKeys.PreparingTime]}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете валидна стойност за време за подготовка.
                    </Form.Control.Feedback>
                </Form.Group >
                <Form.Group className="mb-3" as={Col} >
                    <Form.Label>
                        Време за готвене (мин)</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min="1"
                        id="cookingTime"
                        value={values[RecipeFormKeys.CookingTime]}
                        name={RecipeFormKeys.CookingTime}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете валидна стойност за време за готвене.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Порции</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        min="1"
                        id="portions"
                        value={values[RecipeFormKeys.Portions]}
                        name={RecipeFormKeys.Portions}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете стойност за брой порции.
                    </Form.Control.Feedback>
                </Form.Group >
                <Form.Group className="mb-3" as={Col} >
                    <Form.Label>Трудност</Form.Label>
                    <Form.Select aria-label="Избери.."
                        onChange={changeHandler}
                        value={values[RecipeFormKeys.Difficulty]}
                        name={RecipeFormKeys.Difficulty} required>
                        <option value="" disabled selected="selected">Избери...</option>
                        <option value={Diffuculty.Easy}>Лесна</option>
                        <option value={Diffuculty.Medium}>Средна</option>
                        <option value={Diffuculty.Hard}>Трудна</option>
                    </Form.Select>
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" >
                <Form.Label>Продукти</Form.Label>
                <Form.Control
                    required
                    placeholder="Продукти..."
                    id="products"
                    as="textarea"
                    rows={6}
                    value={values[RecipeFormKeys.Products]}
                    name={RecipeFormKeys.Products}
                    onChange={changeHandler} />
                <Form.Control.Feedback type="invalid">
                    Моля въведете продукти.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Начин на приготвене</Form.Label>
                <Form.Control
                    required
                    placeholder="Стъпка..."
                    id="directions"
                    as="textarea"
                    rows={6}
                    value={values[RecipeFormKeys.Directions]}
                    name={RecipeFormKeys.Directions}
                    onChange={changeHandler} />
                <Form.Control.Feedback type="invalid">
                    Моля въведете начин на приготвяне.
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Form.Group className="mb-3" as={Col} >
                    <Form.Check
                        inline
                        value={values[RecipeFormKeys.IsVegan]}
                        checked={values[RecipeFormKeys.IsVegan]}
                        name={RecipeFormKeys.IsVegan}
                        onClick={checkChangeHandler}
                        type='checkbox'
                        id="vegeterian"
                        label="ٍВегетарианска"
                    />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} >
                    <Form.Check
                        inline
                        value={values[RecipeFormKeys.IsVegeterian]}
                        checked={values[RecipeFormKeys.IsVegeterian]}
                        name={RecipeFormKeys.IsVegeterian}
                        onClick={checkChangeHandler}
                        type='checkbox'
                        id="vegan"
                        label="ٍВеган"
                    />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} >
                    <Form.Check

                        label="Безглутенова"
                        value={values[RecipeFormKeys.IsGlutenFree]}
                        checked={values[RecipeFormKeys.IsGlutenFree]}
                        name={RecipeFormKeys.IsGlutenFree}
                        onClick={checkChangeHandler}
                        id="isGlutenFree" />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} >
                    <Form.Check
                        label="Безмлечна"
                        value={values[RecipeFormKeys.IsDairyFree]}
                        checked={values[RecipeFormKeys.IsDairyFree]}
                        name={RecipeFormKeys.IsDairyFree}
                        onClick={checkChangeHandler}
                        type="checkbox"
                        id="isDairyFree" />
                </Form.Group>
            </Row>
            <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>Снимки</Form.Label>
                <Form.Control type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={fileChangeHandler}
                    name={RecipeFormKeys.Images}
                    files={values[RecipeFormKeys.Images]}
                />
            </Form.Group>
            {Array.from(images).map((image) => {
                return (<div className={styles.divImages} key={image._id}>
                    <Button id="button-size" size='sm' value={image._id} onClick={onModalShow} className={styles.buttonDelete}>
                        <FontAwesomeIcon icon={faRemove} />
                    </Button>
                    <img style={{ width: "200px" }}
                        src={image.image} />
                </div>)
            })}
            <DeleteConfirmation
                showDelete={show}
                onDeleteModalClose={onDeleteModalClose}
                onDeleteSubmit={onDeleteSubmit}
                message={"Сигурен ли сте, че искате да изтриете снимката?"} />
            <div className={styles.divButtons}>
                <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
                    Запази
                </Button>
            </div>

        </Form>
    );
}