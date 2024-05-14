const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Registration } = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body;
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'));
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, role, password: hashPassword });
        const registration = await Registration.create({ userId: user.id });
        const token = generateJwt(user.id, user.email, user.role);
        

        return res.json({ token });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'));
        }
        const token = generateJwt(user.id, user.email, user.role);


        return res.json({ token });
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);

       

        return res.json({ token });
    }

   // Серверная часть (Express)

    async SignUpForService   (req, res, next) {
    try {
        const { email, date, time, service, specialist } = req.body;

        // Создаем запись на услугу
        const registration = new Registration({
            email,
            date,
            time,
            service,
            specialist
        });

        // Сохраняем запись в базу данных
        const savedRegistration = await registration.save();

        res.json({ registration: savedRegistration });
    } catch (error) {
        next(ApiError.internal(error.message));
    }
};


    async getAllRegistrations(req, res, next) {
        try {
            const registrations = await Registration.findAll();
            return res.json(registrations);
        } catch (e) {
            next(ApiError.internal('Internal server error'));
        }
    }
    
    async getUserRegistrations(req, res, next) {
        try {
            const { userId } = req.params;
            const userRegistrations = await Registration.findAll({ where: { userId } });
            return res.json(userRegistrations);
        } catch (e) {
            next(ApiError.internal('Internal server error'));
        }
    }
    async deleteRegistration(req, res, next) {
        // Метод удаления записи на услугу
        try {
            const { registrationId } = req.params;
            const registration = await Registration.findByPk(registrationId);
            if (!registration) {
                return next(ApiError.notFound('Запись на услугу не найдена'));
            }
            await registration.destroy();
            return res.json({ message: 'Запись на услугу успешно удалена' });
        } catch (e) {
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
    async getUser(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            return res.json(user);
        } catch (e) {
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
    async checkByEmail (req, res)  {
        const { email } = req.params;
    
        try {
          // Ищем пользователя по email в базе данных
          const user = await User.findOne({ where: { email } });
    
          // Отправляем ответ с результатом проверки
          res.json({ exists: !!user }); // Отправляем true, если пользователь найден, и false, если не найден
        } catch (error) {
          console.error('Ошибка при проверке наличия пользователя по email:', error);
          res.status(500).json({ message: 'Произошла ошибка при проверке наличия пользователя по email' });
        }
      }

    async updateUser(req, res, next) {
        try {
            const { userId } = req.params;
            const { email, password, phone, FIO, role } = req.body;
            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            // Обновление данных пользователя
            if (email) user.email = email;
            if (password) {
                const hashPassword = await bcrypt.hash(password, 5);
                user.password = hashPassword;
            }
            if (phone) user.phone = phone;
            if (FIO) user.FIO = FIO;
            if (role) user.role = role;
            await user.save();
            return res.json(user);
        } catch (e) {
            console.error(e); // Выводим ошибку в консоль для отладки
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
    

    async deleteUser(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User.findByPk(userId);
            if (!user) {
                return next(ApiError.notFound('Пользователь не найден'));
            }
            await user.destroy();
            return res.json({ message: 'Пользователь успешно удален' });
        } catch (e) {
            next(ApiError.internal('Внутренняя ошибка сервера'));
        }
    }
}

module.exports = new UserController();