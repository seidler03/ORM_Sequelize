const database = require('../models')
//const Sequelize = require('sequelize')

const {PessoasServices} = require('../services')
const pessoasServices = new PessoasServices()


class PessoaController{
    static async pegaPessoasAtivas(req,res){
        try{
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
        return res.status(200).json(pessoasAtivas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }  
    static async pegaTodasAsPessoas(req,res){
        try{
            const todasAsPessoas = await database.Pessoas.findAll()
        return res.status(200).json(todasAsPessoas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }  
    
    
    static async pegaUmaPessoa(req,res){
        const {id} = req.params
        try{
            const umaPessoa = await database.Pessoas.findOne({where:{id:Number(id)}})
            return res.status(200).json(umaPessoa)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoas (req,res){
        const novaPessoa = req.body
        try{
         const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
         return res.status(200).send(novaPessoaCriada);
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async atualizaPessoa(req,res){
        const {id} = req.params
        const novasInfos = req.body
        try{
            await database.Pessoas.update(novasInfos,{where:{id:Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({where:{id:Number(id)}})
            return res.status(200).send(pessoaAtualizada)
        }catch(error){
            return res.status(500).json(error.message)
        }
            
    } 

    static async apagaPessoa(req,res){
        const {id} =req.params
        try{
            await database.Pessoas.destroy({where:{id:Number(id)}})
            return res.status(200).json({mensagem:`id ${id} deletado`})
        }catch{
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req,res){
        const{id} = req.params
        try{
            await database.Pessoas.restore({where:{id:Number(id)}})
            return res.status(200).json({mensagem: `id ${id} restaurado`})
        }catch(error){
            res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req,res){
        const {esudanteId,matriculaId} = req.params
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where:{
                    id:Number(matriculaId),
                    estudante_id:Number(esudanteId)}})
            return res.status(200).json(umaMatricula)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula (req,res){
        const {esudanteId} =req.params
        const novaMaricula = {...req.body, estudante_id:Number(esudanteId)}
        try{
         const novaMatriculaCriada = await database.Matriculas.create(novaMaricula);
         return res.status(200).send(novaMatriculaCriada);
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req,res){
        const {esudanteId,matriculaId} = req.params
        const novasInfos = req.body
        try{
            await database.Matriculas.update(novasInfos,{
                where:{
                    id:Number(matriculaId),
                    estudante_id : Number(esudanteId)
                }})
            const matriculaAtualizada = await database.Matriculas.findOne({where:{id:Number(matriculaId)}})
            return res.status(200).send(matriculaAtualizada)
        }catch(error){
            return res.status(500).json(error.message)
        }
            
    } 

    static async apagaMatricula(req,res){
        const {esudanteId,matriculaId} = req.params
        try{
            await database.Matriculas.destroy({
                where:{
                    id:Number(matriculaId)
                }})
            return res.status(200).json({mensagem:`id da matricula ${matriculaId} deletado`})
        }catch{
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculas(req,res){
        const {estudanteId} = req.params
        try{
           const pessoa = await database.Pessoas.findOne({where:{id:Number(estudanteId)}})
           const matriculas =await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        }catch{
            return res.status(500).json(error.message)
        }
    }   

    static async pegaMatriculaporTurma(req,res){
        const {turmaId} = req.params
        try{
           const todasAsMatriculas = await database.Matriculas.findAndCountAll({
            where:{
                turma_id: Number(turmaId),
                status: 'confirmado'
            },
            limit: 1
           })
            return res.status(200).json(todasAsMatriculas)
        }catch{
            return res.status(500).json(error.message)
        }
    }   

    static async pegaTurmasLotadas(req,res){
        const lotacaoTurma=4
        try{
           const turmasLotadas = await database.Matriculas.findAndCountAll({
            where:{
                status:'confirmado'},
                attributes:['turma_id'],
                group:['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
  
            return res.status(200).json(turmasLotadas.count)
        }catch{
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoas(req,res){
        const {estudanteId} = req.params
        try{
            database.sequelize.transaction(async transacao =>{

            
            await database.Pessoas.update({ativo:false}, {where:{id:Number(estudanteId)}},{transaction:transacao})
            await database.Matriculas.update({status:'cancelado'},{where:{estudante_id:Number(estudanteId)}})
             res.status(200).json({message:`matriculas do estudante ${estudanteId} cancelada`})
            })
        }catch{
            return res.status(500).json(error.message)
        }
    }
   
}

module.exports = PessoaController;