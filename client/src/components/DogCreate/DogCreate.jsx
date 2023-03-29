import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { postDog, getTemperaments } from "../../redux/actions";
import validate from "./validate"
import style from "./DogCreate.module.css"
import { Link } from "react-router-dom";



const DogCreate = () => {
  const dispatch = useDispatch();
  // const temperaments= useSelector((state)=> state.temperaments) //global state
  const temperaments = useSelector(state => [...state.temperaments].sort(
    function (a, b) {
      if (a < b) return -1;
      else return 1;
    }))

  const [inputs, setInputs]= useState({ //local state
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
      temperaments: [],
  })

  const [error, setErrors] = useState({})

  const handleInputs = (event)=> {
    setInputs({
      ...inputs,
      [event.target.name] : event.target.value
    })
    setErrors(validate({
      ...inputs,
      [event.target.name]: event.target.value
    }))
  }

  const handleTemperamentChoices = (event)=> {
    let { value }= event.target;
    if (inputs.temperaments.includes(value)) {
      return alert ("Temperaments can not be repeated")
    }
    setInputs({
      ...inputs,
      temperaments: [...inputs.temperaments, value]
    })
  }

  const handleDelete = (temp) => { //This function allows you to delete a temperament you don´t want BEFORE creating the dog 
    setInputs({
      ...inputs,
      temperaments: inputs.temperaments.filter(inst => inst !== temp)
    })
  }

  const handleSubmit= (event)=> {
    event.preventDefault();
    dispatch(postDog(inputs))
    console.log(inputs)
    alert ("Dog successfully added")
    setInputs({
      name: "",
			height: "",
			life_span: "",
			image: "",
			weightMin: "0",
			weightMax: "0",
      temperaments: [],
    })
  }
  
  useEffect(()=> {
    dispatch(getTemperaments())
  }, []);

  return (
    <div className={style.main}>

      <div className={style.formContainer}>

        <div className={style.title}>
          <h3>Create your dog</h3>
        <Link to={"/home"}><button>Home</button></Link>
        </div>


        <div>
          <form autoComplete="off" action="">

            <div className={style.bothSides}>

              <div className={style.leftSide}>

                <div className={style.name}>
                  <label>Name</label>
                  <input 
                  type="text" 
                  name="name"
                  value={inputs.name}
                  placeholder={"Choose a name"}
                  onChange={(event)=>handleInputs(event)}/>
                  {error.name && <strong>{error.name}</strong>}
                </div>

                <div className={style.image}>
                  <label>Image</label>
                  <input 
                  type="text" 
                  name="image"
                  value={inputs.image}
                  placeholder= {"Add an image"}
                  onChange={(event)=>handleInputs(event)}/>
                  {error.image && <strong>{error.image}</strong>}
                </div>

                <div className={style.life}>
                  <label>Life expectancy</label>
                    <input 
                    type="text" 
                    name="life_span"
                    value={inputs.life_span}
                    placeholder={"For example: 10 - 15 years"}
                    onChange={(event)=>handleInputs(event)}/>
                    {error.life_span && <strong>{error.life_span}</strong>}
                  
                </div>

              </div>

              <div className={style.rightSide}>

                <div className={style.min}>
                  <label>Min. weight (kg)</label> 
                  <input 
                  type="text" 
                  name="weightMin"
                  value={inputs.weightMin}
                  // min= "1"
                  // max= "100"
                  onChange={(event)=>handleInputs(event)}/>
                  {error.weightMin && <strong>{error.weightMin}</strong>}
                </div>

                <div className={style.max}>
                  <label>Max weight (kg)</label>
                  <input 
                  type="text" 
                  name="weightMax"
                  value={inputs.weightMax}
                  // min= "1"
                  // max= "100"
                  onChange={(event)=>handleInputs(event)}/>
                  {error.weightMax && <strong>{error.weightMax}</strong>}
                </div>

                <div className={style.height}>
                  <label>Height (cm)</label>
                    <input 
                    type="text" 
                    name="height"
                    value={inputs.height}
                    placeholder= {"For example: 55 - 67"}
                    onChange={(event)=>handleInputs(event)}/>
                    {error.height && <strong>{error.height}</strong>}
                    
                  
                </div>

              </div>

            </div>

            
          </form>
            <div className={style.temperamentSelect}>
                <label>Temperaments </label>
                  <select value={temperaments} onChange={(event)=>handleTemperamentChoices(event)}>
                    <option value="all"></option>
                    {temperaments.map((temp)=> {
                      return(
                      <option value={temp} key={temp}>
                        {temp}
                      </option>
                      );
                    })}
                  </select>
            </div>
            
            <div className={style.temperamentsRender}>
              

                <div className={style.temperamentsChosen}>
                {inputs.temperaments.map(temp =>
                    <div className={style.eachTemperament}>
                      <p>{temp}</p>
                      <button 
                      onClick={()=>{handleDelete(temp)}}></button>
                    </div>
                  )
                }
                </div>

            

            </div>
          
        </div>

          <div className={style.addButtonContainer}>

            <button type="submit" onClick={(event)=>handleSubmit(event)} className={style.addButton} disabled= {
              error.name || error.image || error.weightMin || error.weightMax || error.height || error.life_span || error.temperaments || !inputs.name
            }>
              Let's go
            </button>

          </div>

      </div>

      
    </div>
  )
  
}

export default DogCreate;
