import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

const Landing = () => {
return (
    <div className={styles.elemento}>
        <div >
            <div className={styles.elemento2}>
            <h2 className={styles.h2}>Welcome To</h2>
            <h1 className={styles.h1}>BreedFinder </h1>
            <p className={styles.miBoton2}>
                <br/>
                Find & Create your ideal friend!
                <br />
                <br />
                Are you ready?
            </p>
            <Link to={"/home"}>
                <button className={styles.miBoton}>
                    GO NOW!
                </button>
            </Link>
            </div>
        </div>
    </div>
    );
};

export default Landing;