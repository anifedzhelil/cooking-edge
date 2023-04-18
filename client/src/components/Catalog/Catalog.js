import { RecipesNavBar } from "../RecipesNavbar/RecipesNavBar";
import { Row, Col } from 'react-bootstrap';
import { Pagination } from "react-bootstrap";

import styles from './styles/Catalog.module.css'
import { CatalogItem } from "./CatalogItem";

import { useRecipeContext } from "../../contexts/RecipeContext";

export const Catalog = () => {

    const { recipes } = useRecipeContext();
    return (<div className={styles.row} style={{paddingBottom: "300px"}}>

        <div className={styles.column} style={{ width: "300px" }}>
            <RecipesNavBar></RecipesNavBar></div>
        <div className={styles.column}>
            <Row xs={12} md={3} className="g-4" >
                {recipes.map((recipe, k) => (
                    <Col key={recipe._id}>
                        <CatalogItem  {...recipe} />
                    </Col>))}
                {recipes.length === 0 && (
                    <div style={{textAlign: "center"}}>Няма съотвестващи рецепти.</div>
                )}
            </Row>
        </div>
    </div>
    )
}
