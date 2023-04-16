import { Link } from "react-router-dom"
import styles from './Footer.module.css'

export const Footer = () => {
    return (
        <div className={styles.footer}>
            <Link to='/catalog'>Начална страница</Link>
            <p>&copy; Copyright 2023 GookingEdge</p>
        </div>
    )
}