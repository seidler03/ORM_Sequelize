const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController.js')

const router = Router()

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
router.get('/pessoas/matricula/:turmaId/confirmados', PessoaController.pegaMatriculaporTurma)
router.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoas)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoas)
router.get('/pessoas/:esudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
router.post('/pessoas/:esudanteId/matricula/', PessoaController.criaMatricula)
router.put('/pessoas/:esudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:esudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports =router