import styles from "./paginado.module.css"

const Pagination = ({dogsPerPage, dogs, pagination}) => {
    const pages = [];
    for (let i=0; i <= Math.floor(dogs/dogsPerPage); i++){
        pages.push(i+1)
    }

return (
    <nav>
        <ul className={styles.pagination}>
            {
            pages && pages.map(num => (
                <li className={styles['page-number']} key={num}>
                    <a onClick={()=>pagination(num)}>{num}</a>
                </li>
            ))
            }
        </ul>
    </nav>
)
}

export default Pagination;