module.exports = (error, req, res, next) => {
  //   res.json({ message: error.message });

  //   console.log(res.statusCode);
  //   console.log(error.stack);

  const statusCode = res.statusCode || 500;
  const stack = process.env.NODE_ENV === 'production' ? null : error.stack;

  res.json({ code: statusCode, message: stack });
};
