const validate =({name, height, image, life_span, weightMax, weightMin, temperaments})=>{
    let errors= {};
    let regexImg= /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png|pnj)/;
    let regexName= /([0-9])+/;

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
    } else if (weightMin >= weightMax){
        errors.weightMax= "Maximun weight can not be inferior or equal than minimun weight"
    }

    if(!height){
        errors.height= "Please choose a maximun height and a maximun height"
    } 

    if(!life_span){
        errors.life_span= "Please choose an approximate life span"
    } 


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