// http://localhost:5050/api/v1/movies
const express = require('express');
const auth = require('../middleware/auth');
const roleMiddleware = require('../middleware/roleMiddleware');

const moviesRouter = express.Router();

const moviesController = require('../controllers/MoviesController');

// добавить один фильм

moviesRouter.post(
  '/movies',
  (req, res, next) => {
    console.log('Joi started');
    next();
  },
  moviesController.add
);

// получить все

moviesRouter.get(
  '/movies',
  // auth,
  roleMiddleware(['ADMIN', 'MODERATOR']),
  moviesController.getAll
);

// получить один фильм

moviesRouter.get('/movies/:id', moviesController.getOne);

// обновить фильм

moviesRouter.put('/movies/:id', moviesController.update);

// удалить фильм

moviesRouter.delete('/movies/:id', moviesController.remove);

module.exports = moviesRouter;
