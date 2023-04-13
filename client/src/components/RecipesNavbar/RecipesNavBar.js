
import { Row, Form, Button } from 'react-bootstrap'
import { useForm } from "../../hooks/useForm";
import { RecipeFormKeys, RecipeCategories } from "../../constants/GlobalConstants";
import styles from './RecipesNavBar.module.css';
import { useRecipeContext } from '../../contexts/RecipeContext';
import { useRef } from 'react';

export const RecipesNavBar = () => {
    const { onFilterSubmit, onFilterReset } = useRecipeContext();
    const formRef = useRef(null);

    const { values, checkChangeHandler, changeHandler, onSubmit, onReset } = useForm({
        [RecipeFormKeys.Category]: '',
        [RecipeFormKeys.IsVegan]: false,
        [RecipeFormKeys.IsVegeterian]: false,
        [RecipeFormKeys.IsGlutenFree]: false,
        [RecipeFormKeys.IsDairyFree]: false,

    }, onFilterSubmit, onFilterReset);

    const onFormReset = () => {
        formRef.current.reset();
        onReset();
    }
    return (
        <Form className={styles.navbar} ref={formRef} onSubmit={onSubmit} onReset={onFormReset}  >
            <Form.Group as={Row} className="mb-3"  >
                <Form.Control
                    type="search"
                    name="search"
                    id="search"
                    value={values.search}
                    placeholder="Search"
                    aria-label="Search"
                    onChange={changeHandler}
                />
            </Form.Group>
            <Form.Group as={Row} className="mb-3"  >
                <Form.Select aria-label="Default select example" onChange={changeHandler} name={RecipeFormKeys.Category}>
                    <option>Избери...</option>
                    <option value={RecipeCategories.Salad}>Салата</option>
                    <option value={RecipeCategories.Soup}>Супа</option>
                    <option value={RecipeCategories.Breakfast}>Закуска</option>
                    <option value={RecipeCategories.MainDish}>Основно ястие</option>
                    <option value={RecipeCategories.Dessert}>Десерт</option>
                    <option value={RecipeCategories.Drink}>Напитка</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" as={Row} >
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
            <Form.Group className="mb-3" as={Row} >
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
            <Form.Group className="mb-3" as={Row} >
                <Form.Check
                    label="Безглутенова"
                    value={values[RecipeFormKeys.IsGlutenFree]}
                    name={RecipeFormKeys.IsGlutenFree}
                    onClick={checkChangeHandler}
                    id="isGlutenFree" />
            </Form.Group>
            <Form.Group className="mb-3" as={Row} >
                <Form.Check
                    label="Безмлечна"
                    value={values[RecipeFormKeys.isDairyFree]}
                    name={RecipeFormKeys.IsDairyFree}
                    onClick={checkChangeHandler}
                    type="checkbox"
                    id="isDairyFree" />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ margin: "10px", width: "100%" }}>Филтрирай</Button>
            <Button variant="primary" type="reset" style={{ margin: "10px", width: "100%" }}>Изчисти филтрите</Button>
        </Form>
    );

}