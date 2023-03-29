const {Router}= require("express")
const {getDogs, findDogs, getDogByID, createNewDog}=require("../controllers/dogsController")

const dogsRouter = Router()

dogsRouter.get("/", async(req, res)=>{
    const{name}=req.query
    let dogs
    try {
        if(name){
            dogs= await findDogs(name)
            return res.status(200).json(dogs)
                }else{
            dogs= await getDogs()
            return res.status(200).json(dogs)
                }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})



dogsRouter.get("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const dog = await getDogByID(id)
        res.status(200).json(dog)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


dogsRouter.post("/", async (req, res)=> {
    let { weightMin, weightMax, height, name, life_span, image, temperaments, createInDb }= req.body;
    console.log(req.body);
    try {
        await createNewDog(weightMin, weightMax, height, name, life_span, image, temperaments)
        res.status(200).send("Dog created") 
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}) 

// dogsRouter.put("/", async (req, res)=>{
//     let { id, name, life_span}= req.body
//     try {
//         const updateDog= await updateDog(id, name, life_span)
//         res.status(200).json(updateDog)
//     } catch (error) {
//         res.status(400).json({error:error.message})
//     }
// })



module.exports= dogsRouter