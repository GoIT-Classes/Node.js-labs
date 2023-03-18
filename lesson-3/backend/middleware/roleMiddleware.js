const jwt = require('jsonwebtoken');
const UserModel = require('../models/usersModel');

module.exports = (rolesArr) => {
  return async (req, res, next) => {
    try {
      const [Bearer, token] = req.headers.authorization.split(' ');

      if (token && Bearer === 'Bearer') {
        const decodedData = jwt.verify(token, 'pizza');
        const user = await UserModel.findById(decodedData.id);
        let hasRole = false;

        user.roles.forEach((role) => {
          if (rolesArr.includes(role)) {
            hasRole = true;
          }
        });
        if (!hasRole) {
          res.status(403).json({
            code: 403,
            message: 'No permission',
          });
        }
        next();
      }
    } catch (error) {
      return res.status(403).json({
        code: 403,
        message: 'No permission',
      });
    }
  };
};
