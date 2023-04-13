import styles from './Rating.module.css';

export const Rating = ({ totalRating, ratingCount }) => {
    const unChecked = "fa fa-star ";
    const  checked = unChecked + styles.checked;
    
    return( <>
        {[...Array(5)].map((x, index) => {
            index += 1
            if (index <= Math.round(totalRating)) {
                return (<span key={index} className={checked} > </span>)
            }
            else {
                return <span key={index} className={unChecked}> </span>
            }
        }
        )}
        {totalRating} ( {ratingCount} ревюта)
    </>);
}