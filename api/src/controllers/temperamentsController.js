const axios = require("axios");
const { Temperaments } = require("../db");

const getAllTemperaments = async()=>{
    const allData = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
);
    try {
    let everyTemperament = allData.data
    .map((dog) => (dog.temperament ? dog.temperament : "No info"))
    .map((dog) => dog?.split(", "));
    let eachTemperament = [...new Set(everyTemperament.flat())];
    eachTemperament.forEach((el) => {
    if (el) {
        Temperaments.findOrCreate({
        where: { name: el },
        });
    }
    });
    eachTemperament = await Temperaments.findAll();
    return eachTemperament;
} catch (error) {
    throw new Error(error = error.message);
}
}

const findDogsTemp = async (temp)=>{
    const allDogs = await getAllDogs();
    const results = await allDogs.filter(dog => dog.temp === temp)
    return 
}

module.exports = {
    getAllTemperaments,
};

