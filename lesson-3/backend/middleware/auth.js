const { json } = require('express');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  //   считать токен из заголовка
  // проверить передан ли токен, и если это токен от авторизации (bearer)
  // расшифровать токен
  // если токен валидный, то req.user=user
  // если не валидный, возвратить ошибку - пользователь не авторизован

  try {
    const [Bearer, token] = req.headers.authorization.split(' ');

    if (token && Bearer === 'Bearer') {
      const decodedData = jwt.verify(token, 'pizza');
      req.user = decodedData;
      next();
    }
  } catch (error) {
    return res.status(403).json({
      code: 403,
      message: 'Not authorized',
    });
  }
};
