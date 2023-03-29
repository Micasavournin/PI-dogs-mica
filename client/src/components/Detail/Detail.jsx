import { getdogDetail,cleanDetail } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import styles from "./Detail.module.css"

const Detail=()=>{
let dispatch= useDispatch();
  let { id }= useParams();
  const dogDetail = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getdogDetail(id))
    return ()=> {
      dispatch(cleanDetail()) //this action avoids saving the las visited detail so that when you see a new dogDetail you don´t see the previously seen dog
    }
  }, [dispatch])

  return (
    <div className={styles.main}>
      <div className={styles.detailContainer}>

        <div className={styles.imgContainer}>
          <img src={dogDetail?.image ? dogDetail.image : "img"} alt="Wait" />
        </div>

        <div className={styles.dataContainer}>

          <div className={styles.idContainer}>
            <h4>Id</h4>
            <h3>{dogDetail?.id}</h3>
          </div>

          <div className={styles.breedContainer}>
            <h4>Breed</h4>
            <h1>{dogDetail?.name}</h1>
          </div>

          <div className={styles.temperamentContainer}>
            <h4>Temperament</h4>
            <h3>{dogDetail?.temperament}</h3>
          </div>

          <div className={styles.weightsContainer}>
            <h4>Weight</h4>

            <div className={styles.weights}>
              <div className={styles.weightMinContainer}>
                  <h3 className={styles.stat}>{dogDetail?.weightMin}<sup>kg</sup></h3>
                  <h3 className={styles.statDescription}>MINIMUM</h3>
              </div>

              <div className={styles.weightAvgContainer}>
                  <h3  className={styles.stat}>{dogDetail?.averageWeight}<sup>kg</sup></h3>
                  <h3 className={styles.statDescription}>AVERAGE</h3>
              </div>

              <div className={styles.weightMaxContainer}>
                  <h3 className={styles.stat}>{dogDetail?.weightMax}<sup>kg</sup></h3>
                  <h3 className={styles.statDescription}>MAXIMUM</h3>
              </div>
            </div>
          </div>

          <div className={styles.heightContainer}>
            <h4>Height (min - max)</h4>
            <h3>{dogDetail?.height?.metric} cm</h3>
          </div>

          <div className={styles.life_spanContainer}>
            <h4>Life expectancy</h4>
            <h3>{dogDetail?.life_span}</h3>    
          </div>
        </div>

      </div>
    </div>

  )
}

export default Detail