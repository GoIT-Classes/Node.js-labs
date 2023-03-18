const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
require('colors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const asyncHandler = require('express-async-handler');

const auth = require('./middleware/auth');

const connectDB = require('../config/db');

const configPath = path.join(__dirname, '..', 'config', '.env');

dotenv.config({ path: configPath });

const app = express();

// console.log(process.env.andrew);
// console.log(process.env.vova);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// set Routes

app.use('/api/v1', require('./routes/moviesRoutes'));

const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Регистрация - создание нового пользователя в базе данных

// Аутентификация - проверка данных, какие предоставил пользовтель, на соответствие данным, хранящимся в базе данных

// Авторизация - проверка прав пользователя на совершение каких-либо действий, либо посещать определенные ресурсы приложения

// Logout - exit from system ()

const UserModel = require('./models/usersModel');
const RoleModel = require('./models/rolesModel');

app.post(
  '/register',
  asyncHandler(async (req, res) => {
    // req - получаем дынные от пользователя
    // контроллерная валидация данных, если данные не пришли, возвращаем ошибку
    // если данные пришли и валидны, проверяем пользователя в базе данных
    // если пользователь есть, сообщаем об этом и предлагаем сделать логин
    // если пользоваетеля нет, хешируем пароль
    // сохраняем пользователя в базу данных, успех регистрации

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Provide all required fields');
    }

    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      res.status(400);
      throw new Error('Email already in use');
    }

    const hashPassword = bcrypt.hashSync(password, 5);

    if (!hashPassword) {
      res.status(400);
      throw new Error('Service is out of order, try later');
    }

    const userRole = await RoleModel.findOne({ value: 'ADMIN' });

    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
      roles: [userRole.value],
    });

    if (!user) {
      res.status(400);
      throw new Error('Registration failed, try later');
    }

    res.status(201).json({
      code: 201,
      message: 'Registration success',
    });
  })
);
app.post(
  '/login',
  asyncHandler(async (req, res) => {
    // получаем данные от пользователя
    // контроллерная валидация данных от пользователя, если данные невалидны, возвращаем ошибку
    // если дынные есть: 1) ищем пользователя по е-почте; 2) расшифровываем пароль;
    // если пользователя в базе данных нет, или не можем расшифровать пароль, возвращаем ошибку - неверный логин или пароль;
    // если нашли пользователя и расшифровали пароль - генерируем токен
    // записываем токен в базу данных

    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Provide all required fields');
    }

    const user = await UserModel.findOne({ email });

    const validPassword = bcrypt.compareSync(password, user.password);

    console.log(validPassword);

    if (!user || !validPassword) {
      res.status(400);
      throw new Error('Wrong login or password');
    }

    const token = generateToken({ id: user._id, email: user.email });

    user.token = token;

    const userWithToken = await user.save();

    if (!userWithToken) {
      res.status(400);
      throw new Error('Unable to set token');
    }

    res.status(200).json({
      data: {
        token,
        email,
      },
      code: 200,
      message: 'Login success',
    });
  })
);
app.get(
  '/logout',
  auth,
  asyncHandler(async (req, res) => {
    console.log(req.user);
    await UserModel.findByIdAndUpdate(req.user.id, {
      token: null,
    });

    res.status(200).json({
      code: 200,
      message: 'Logout success',
    });
  })
);

app.use('*', notFound);
app.use(errorHandler);

function generateToken(data) {
  const token = jwt.sign(data, 'pizza', {
    expiresIn: '8h',
  });
  return token;
}

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT}, Mode: ${process.env.NODE_ENV}`
      .green.italic.bold
  );
});
