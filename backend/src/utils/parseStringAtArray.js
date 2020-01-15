module.exports = function parseStringAtArrqy(arrayAsString){
    return arrayAsString.split(',').map(tech => tech.trim())
}