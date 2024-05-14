const uuid = require('uuid')
const path = require('path')
const {Specialist} = require('../models/models')
const ApiError = require('../error/ApiError')
class SpecialistController {
    async create(req, res, next) {
        try {
            const {FIO, phone, description, experience} = req.body
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg" 
            photo.mv(path.resolve(__dirname, '../../client/femily/public', 'static', fileName))

            const specialist = await Specialist.create({FIO, phone, description, experience, photo: fileName})

            return res.json(specialist)  
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
        
    }

    async getAll(req, res) {
        try {
            const specialists = await Specialist.findAll()
            return res.json(specialists)
        } catch (e) {
            next(ApiError.internal('Internal server error'))
        }
    }
    async getOne(req, res, next) {
        const { id } = req.params;
        const specialist = await Specialist.findOne({ where: { id } });
        if (!specialist) {
            return next(ApiError.badRequest('Specialist not found'));
        }
        return res.json(specialist);
    }
    async put(req, res, next) {
        try {
            const { id } = req.params;
            const { FIO, phone, description, experience } = req.body;
            const {photo} = req.files
            let fileName = uuid.v4() + ".jpg" 
            photo.mv(path.resolve(__dirname, '../../client/femily/public', 'static', fileName))
            const specialist = await Specialist.findByPk(id);
            if (!specialist) {
                return next(ApiError.notFound('Specialist not found'));
            }

            // Обновляем данные о специалисте
            specialist.FIO = FIO;
            specialist.phone = phone;
            specialist.description = description;
            specialist.experience = experience;
            await specialist.save();

            return res.json(specialist);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const specialist = await Specialist.findByPk(id);
            if (!specialist) {
                return next(ApiError.notFound('Specialist not found'));
            }

            // Удаляем специалиста
            await specialist.destroy();

            return res.json({ message: 'Specialist deleted successfully' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
    
}

module.exports = new SpecialistController()