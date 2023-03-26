import { getdogDetail,cleanDetail } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"

const Detail=()=>{
    const dispatch= useDispatch()
    const {id}= useParams()
    const dogDetail= useSelector((state)=>state.dogDetail)

    useEffect(()=>{
        dispatch(getdogDetail(id))
        return()=> dispatch(cleanDetail())
    },[])
    console.log(dogDetail);
    return(
    <>
    <h3>Id: {dogDetail?.id}</h3>
      <h1>Breed: {dogDetail?.name}</h1>
      <img src={dogDetail?.image ? dogDetail.image : "img"} alt="img" />
      <h3>Weight:</h3>
      <span>Min: {dogDetail?.weightMin}</span> - <span>Max: {dogDetail?.weightMax}</span>
      <h3>Life expectancy: {dogDetail?.life_span}</h3>    
      <h3>Temperament: {dogDetail?.temperament}</h3>
            <Link to={"/home"}><button>Home</button></Link>
        </>
    )
}

export default Detail