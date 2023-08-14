const express =  require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const ProjectController = require('../controllers/project.controller');
const PhotoController = require('../controllers/photo.controller');

router.get('/users', (req, res) => UserController.index(req, res));
router.post('/newUser', (req, res) => UserController.store(req, res));
router.get('/', (req, res) => ProjectController.index(req, res));
router.get('/:id', (req, res) => ProjectController.show(req, res));
router.post('/newProject', (req, res) => ProjectController.store(req, res));
router.put('/update/:id', (req, res) => ProjectController.update(req, res));
router.get('/newPhoto', (req, res) => PhotoController.store(req, res));
router.get('/photo/:projectId', (req, res) => PhotoController.show(req, res));

module.exports = router;