const { Router } = require('express');
const axios = require('axios') 
const {Dog, Temperaments} = require("../db")

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getInfoAPI = async () => {
    const response = await axios.get("https://api.thedogapi.com/v1/breeds/?api_key={live_eR5MI1lqAuwPyn2s9rxzH0ZA4OUXrHkuB526sNg6t8s2V2K7GCuNzVrxjNvoCZtV}");
    const data = await response.data.map((dog) => {
        let weightMin = parseInt(dog.weight.metric.slice(0, 2).trim()); 
            let weightMax = parseInt(dog.weight.metric.slice(4).trim());
            let averageWeight = weightMax + weightMin
        
            if (weightMin && weightMax) {
                averageWeight= averageWeight / 2;

            } else if (weightMin && !weightMax) {
                weightMax = weightMin;
                averageWeight= averageWeight / 2;

            } else if (!weightMin && weightMax) {
                weightMin = weightMax;
                averageWeight= averageWeight / 2;

            } else {
                if (dog.name === "Smooth Fox Terrier") {
                    weightMin = 6;
                    weightMax = 9;
                    averageWeight= ((weightMax) + (weightMin)) / 2;

                } else {
                    weightMin = 20;
                    weightMax = 30;
                    averageWeight= ((weightMax) + (weightMin)) / 2;

                }
            }

    return {
        id: dog.id,
        weightMin: weightMin,
        weightMax: weightMax,
        averageWeight: averageWeight,
        image: dog.image.url,
        name: dog.name,
        temperament: dog.temperament,
        weight: dog.weight,
        origin: dog.origin,
        life_span: dog.life_span,
        height: dog.height
    };
    });

    return data;
};

const getDBInfo = async () => {
    let DogDB = await Dog.findAll({
    include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
        attributes: [],
        },
    },
    });

    const tempDB = DogDB.map((dog) => {
    return {
        id: dog.id,
        weightMax: dog.weightMax,
        weightMin: dog.weightMin,
        averageWeight: (dog.weightMax + dog.weightMin)/2,
        image: dog.image,
        name: dog.name,
        temperament: dog.temperaments.map((temper)=> temper.name).join(', '),
        life_span: dog.life_span,
        weight: dog.weight,
        origin: dog.origin,
        temperamentCC: dog.temperament,
        createInDb:true
    };
    });

    return tempDB
}



const getAllDogs = async () => {
    const apiInfo = await getInfoAPI();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
};

module.exports ={
    router, 
    getAllDogs, 
} 

