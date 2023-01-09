const {Router} = require('express');
const NivelController = require('../controllers/NivelController.js')

const router = Router()


router.get('/nivel', NivelController.pegaTodosOsNiveis)
router.get('/nivel/:id', NivelController.pegaUmNivel)
router.post('/nivel', NivelController.criaNivel)
router.put('/nivel/:id', NivelController.atualizaNivel)
router.delete('/nivel/:id', NivelController.apagaNivel)
module.exports =router