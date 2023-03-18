const asyncHandler = require('express-async-handler');

const MoviesModel = require('../models/moviesModel');

const MoviesService = require('../services/movies');

class MoviesController {
  //   add = asyncHandler(async (req, res) => {
  //     const { title, rating } = req.body;

  //     if (!title || !rating) {
  //       res.status(400);
  //       throw new Error('Provide all required fields');
  //     }

  //     const result = await MoviesModel.create({ ...req.body });

  //     if (!result) {
  //       res.status(400);
  //       throw new Error('Unable to save into DB');
  //     }

  //     res.status(201).json({
  //       code: 201,
  //       message: 'Success',
  //       data: result,
  //     });
  //   });

  add = asyncHandler(async (req, res) => {
    const { title, rating } = req.body;

    if (!title || !rating) {
      res.status(400);
      throw new Error('Provide all required fields');
    }

    const result = await MoviesService.addMovie(req.body);

    if (result) {
      res.status(200).json({
        code: 200,
        message: 'Success',
        data: result,
        quantity: result.length,
      });
    }
  });

  //   getAll = asyncHandler(async (req, res) => {
  //     const result = await MoviesModel.find({});

  //     if (!result) {
  //       res.status(400);
  //       throw new Error('Unable to fetch');
  //     }

  //     res.status(200).json({
  //       code: 200,
  //       message: 'Success',
  //       data: result,
  //       quantity: result.length,
  //     });
  //   });

  getAll = asyncHandler(async (req, res) => {
    const movies = await MoviesService.getAllMovies();

    res.status(200).json({
      code: 200,
      message: 'Success',
      data: movies,
      quantity: movies.length,
    });
  });

  async getOne(req, res) {}
  async update(req, res) {}
  async remove(req, res) {}
}

module.exports = new MoviesController();
