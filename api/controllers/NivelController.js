const database = require('../models')

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Turmas.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async pegaUmNivel(req,res){
        const {id} = req.params
        try{
            const umNivel = await database.Turmas.findOne({where:{id:Number(id)}})
            return res.status(200).json(umNivel)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel (req,res){
        const novoNivel = req.body
        try{
         const novoNivelCriado = await database.Turmas.create(novoNivel);
         return res.status(200).send(novoNivelCriado);
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req,res){
        const {id} = req.params
        const novasInfos = req.body
        try{
            await database.Nivel.update(novasInfos,{where:{id:Number(id)}})
            const nivelAtualizado = await database.Turmas.findOne({where:{id:Number(id)}})
            return res.status(200).send(nivelAtualizado)
        }catch(error){
            return res.status(500).json(error.message)
        }
            
    } 

    static async apagaNivel(req,res){
        const {id} =req.params
        try{
            await database.Niveis.destroy({where:{id:Number(id)}})
            return res.status(200).json({mensagem:`id ${id} deletado`})
        }catch{
            return res.status(500).json(error.message)
        }
    }

}

module.exports = NivelController;