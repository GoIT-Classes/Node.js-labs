const MoviesModel = require('../models/moviesModel');

class MoviesService {
  getAllMovies = async () => {
    const result = await MoviesModel.find({});

    if (!result) {
      res.status(400);
      throw new Error('Unable to fetch');
    }

    return result;
  };

  addMovie = async (data) => {
    const result = await MoviesModel.create({ ...data });

    if (!result) {
      res.status(400);
      throw new Error('Unable to save into DB');
    }

    return result;
  };
}

module.exports = new MoviesService();
