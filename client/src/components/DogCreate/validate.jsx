const validate =({name, height, image, life_span, weightMax, weightMin, temperaments})=>{
    let errors= {};
    let regexImg= /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|pnj)/;
    let regexName= /([0-9])+/;
    let regexMinMax = /[0-9]+-\d/;

    if(!name.trim()) {
        errors.name= "Please choose a name"
    } else if (name.length >40 || name.length <2) {
        errors.name= "Please choose a name which is longer than 1 character and shorter than 40 characters"
    } else if (regexName.test(name.trim())) {
        errors.name= "Numbers are not allowed"
    }

    if(!weightMin){ 
        errors.weightMin= "Please choose a minimun weight"
    } else if (weightMin.trim() > 100 || weightMin.trim() < 1){
        errors.weightMin= "Minimun weight can not be higher than 100 or lesser than 1" 
    }

    if(!weightMax){
        errors.weightMax= "Please choose a maximun weight"
    } else if (weightMax.trim() > 100 || weightMax.trim() < 1){
        errors.weightMax= "Maximun weight can not be higher than 100 or lesser than 1"
    } else if (weightMax-weightMin <= 0){
        errors.weightMax= "Maximun weight can not be inferior or equal than minimun weight"
    }

    if(!height){
        errors.height= "Please choose a minimun height and a maximun height"
    } 
    // else {
    //     const withoutSpace = life_span.replace(/\s/g, '') //me agarra todos los espacios y me lo reemplaza sin espacios
        
    //     if(regexMinMax.test(withoutSpace)) {
    //         errors.height = "error"
    //     } else if(Number(withoutSpace.split("-")[1])-Number(withoutSpace.split("-")[0]) <= 0) { //si o si tiene q tener un guion, me devuelve un array de cadenas mediante la separación con un guion 
    //         errors.height = "Maximun heigth can not be inferior or equal than minimun heigth"
    //     }        
    // }

    if(!life_span){
        errors.life_span= "Please choose an approximate life span"
    }
    // else {
    //     const withoutSpace = life_span.replace(/\s/g, '') //me agarra todos los espacios y me lo reemplaza sin espacios
        
    //     if(regexMinMax.test(withoutSpace)) {
    //         errors.life_span = "error"
    //     } else if(Number(withoutSpace.split("-")[1])-Number(withoutSpace.split("-")[0]) <= 0) { //si o si tiene q tener un guion, me devuelve un array de cadenas mediante la separación con un guion 
    //         errors.life_span = "Maximun life can not be inferior or equal than minimun life"
    //     }        
    // }


    if (!image.trim()) {
        errors.image= "Please insert an image"
    } else if (!regexImg.test(image.trim())) {
        errors.image= "Please insert a valid file"
    }

    if (!temperaments) {
        errors.temperaments= "Please choose at least one temperament"
    }

    return errors
}
export default validate;