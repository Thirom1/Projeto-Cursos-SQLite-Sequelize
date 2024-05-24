module.exports = (objetoParams) => {
    for (let propriedade in objetoParams) {
        if (/id|Id/.test(propriedade)){
            objetoParams[propriedade] = Number(objetoParams[propriedade])
        }
    }
    return objetoParams
}