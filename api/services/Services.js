const database = require('../models')

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }
    async pegaTodososRegistros(){
        return database[this.nomeDoModelo].findAll()
    }

    async pegaUmRegistro(id){
        return database[this.nomeDoModelo].findOne()
    }
    async criaRegistro(dados){
        return database[this.nomeDoModelo].findOne()
    }
    async atualizaRegisto(dadosAtualizados, id){
        return database[this.nomeDoModelo].findOne()
    }

}
module.exports = Services