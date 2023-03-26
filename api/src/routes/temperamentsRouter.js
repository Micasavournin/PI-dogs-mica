const {Router}= require("express")
const { getAllTemperaments } = require("../controllers/temperamentsController");
const temperamentsRouter = Router()

temperamentsRouter.get("/", async (req, res) => {
try {
    const temperaments = await getAllTemperaments();
    res.status(200).json(temperaments);
} catch (error) {
    res.status(404).send(error= error.message);
}  
});

temperamentsRouter.get("/:temp",async(req, res)=>{
    const {temp} = req.params
    try {
        const temperaments = await findDogsTemp(temp)
        res.status(200).json(temperaments)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


module.exports= temperamentsRouter
