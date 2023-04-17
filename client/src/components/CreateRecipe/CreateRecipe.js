import styles from './CreateRecipe.module.css'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from '../../hooks/useForm';
import { RecipeCategories, Diffuculty, RecipeFormKeys } from '../../constants/GlobalConstants';
import { useRecipeContext } from "../../contexts/RecipeContext";

export const CreateRecipe = () => {
    const { onRecipeCreateSubmit } = useRecipeContext();

    const [validated, setValidated] = useState(false);

    const { values, changeHandler, onSubmit, checkChangeHandler, fileChangeHandler } = useForm({
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
        [RecipeFormKeys.CreatedDate]: new Date(),
    }, onRecipeCreateSubmit);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            onSubmit(event);
        }

        setValidated(true);
    };
                           
    return (
        <Form className={styles.createForm} onSubmit={handleSubmit} noValidate validated={validated} >
            <Form.Group className="mb-3" >
                <Form.Label>Заглавие</Form.Label>
                <Form.Control placeholder="Заглавие..."
                    id="title"
                    required
                    name={RecipeFormKeys.Title}
                    values={values[RecipeFormKeys.Title]}
                    onChange={changeHandler} />
                <Form.Control.Feedback type="invalid">
                    Моля въведете заглавие.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" as={Col} >
                <Form.Label>Категория</Form.Label>
                <Form.Select required aria-label="Избери.." onChange={changeHandler} name={RecipeFormKeys.Category}>
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
                        id="preparingTime"
                        name={RecipeFormKeys.PreparingTime}
                        value={values[RecipeFormKeys.PreparingTime]}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете време за подготовка.
                    </Form.Control.Feedback>
                </Form.Group >
                <Form.Group className="mb-3" as={Col} >
                    <Form.Label>Време за готвене (мин)</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        id="cookingTime"
                        value={values[RecipeFormKeys.CookingTime]}
                        name={RecipeFormKeys.CookingTime}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете време за готвене.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} className="mb-3" >
                    <Form.Label>Порции</Form.Label>
                    <Form.Control
                        required
                        type="number"
                        id="portions"
                        value={values[RecipeFormKeys.Portions]}
                        name={RecipeFormKeys.Portions}
                        onChange={changeHandler} />
                    <Form.Control.Feedback type="invalid">
                        Моля въведете брой порции.
                    </Form.Control.Feedback>
                </Form.Group >
                <Form.Group className="mb-3" as={Col} >
                    <Form.Label>Трудност</Form.Label>
                    <Form.Select aria-label="Избери.." onChange={changeHandler} name={RecipeFormKeys.Difficulty} required>
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
                        name={RecipeFormKeys.IsGlutenFree}
                        onClick={checkChangeHandler}
                        id="isGlutenFree" />
                </Form.Group>
                <Form.Group className="mb-3" as={Col} >
                    <Form.Check
                        label="Безмлечна"
                        value={values[RecipeFormKeys.isDairyFree]}
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
                    required
                    onChange={fileChangeHandler}
                    name={RecipeFormKeys.Images}
                    files={values[RecipeFormKeys.Images]}
                />
                <Form.Control.Feedback type="invalid">
                    Моля изберете поне една снимка.
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
                Запази
            </Button>
            <Button variant="primary" type="reset">
                Затвори
            </Button>
        </Form>);
}