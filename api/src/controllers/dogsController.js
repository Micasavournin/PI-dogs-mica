const {Dog, Temperaments} = require("../db")
const {getAllDogs}= require("../routes/index")

const getDogs =()=>{
    const allDogs = getAllDogs();
    return allDogs
}


const findDogs = async (name)=>{
    const allDogs = await getAllDogs();
    const results = await allDogs.filter(dog => dog.name.toLowerCase().includes(name.toLowerCase()))
    if(!results.length) throw Error (`Dog ${name} doesnt exist`)
    return results
}


const getDogByID= async(id)=>{
    const allDogs= await getAllDogs()
    let dog
    if(isNaN(id)){
        dog= allDogs.find(dog=>dog.id === (id))
    }else{
        dog= allDogs.find(dog=>dog.id === Number(id))
    }
    if(!dog) throw Error(`Dog ${id} doesnt exist`)
        return dog
    
}

const createNewDog= async (weightMin,weightMax, height, name, life_span, image, temperaments)=> {
    console.log(weightMin,weightMax, height, name, life_span, image, temperaments);
    if (!weightMin ||!weightMax || !height || !name || !life_span || !image || !temperaments){
    throw new Error("error: missing info")
    }
    else{ 
        let newDog= await Dog.create({
            weightMin,
            weightMax,
            height,
            name,
            life_span,
            image,
        })
        let temper= await Temperaments.findAll({
            where: {
                name: temperaments
            }
        })
        await newDog.addTemperament(temper);
    }
};

// const updateDog= async (id, name, life_span)=>{
//     if (!id || !name || !life_span ){
//         throw new Error("error: missing info")
//     }
//     try {
//         const dogFind = await Dog.findByPk(id)
//         if(dogFind) {
//             dogFind.name = name;
//             dogFind.life_span = life_span
//             await dogFind.save()
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


module.exports={
    getDogs,
    findDogs,
    getDogByID,
    createNewDog,
    // updateDog

}