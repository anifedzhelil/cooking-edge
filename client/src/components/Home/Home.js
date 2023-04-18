import { Button } from 'react-bootstrap';
import hero from './heroImg.png';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="row">
            <div className='col' style={{ marginTop: "10%", padding: "50px" }}>
                <span className={styles.description}>Подробно описани рецепти за най-вкусните ястия! Разнообразие от класически и модерни вкусотии! Бързи, лесни, достъпни!
                </span>
                <Button className={styles.button}>
                    <Link to={'/catalog'} >Рецепти</Link>
                </Button>
            </div>
            <div className='col'>
                <img src={hero} className={styles.image} />
            </div>
        </div>);
}