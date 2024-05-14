const uuid = require('uuid')
const path = require('path')
const { Service, Specialist } = require('../models/models')
const ApiError = require('../error/ApiError')

class ServiceController {
    async create(req, res, next) {
        try {
            const { title, description, price, FIO, type } = req.body;
            const { photo } = req.files;
            let fileName = uuid.v4() + ".jpg";
            photo.mv(path.resolve(__dirname, '../../client/femily/public', 'static', fileName));
        
            const service = await Service.create({ 
                title, 
                description, 
                price, 
                photo: fileName, 
                FIO,// Убедитесь, что specialistId определен и передается правильно
                type
            });
        
            return res.json(service);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    
    

    async getAll(req, res) {
        let { limit, page } = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit

        const services = await Service.findAndCountAll({ limit, offset })
        return res.json(services)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.badRequest('ID is required'));
            }

            const service = await Service.findOne({ where: { id } });
            if (!service) {
                return next(ApiError.badRequest('Service not found'));
            }

            return res.json(service);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async put(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description, price } = req.body;

            const service = await Service.findByPk(id);
            if (!service) {
                return next(ApiError.notFound('Service not found'));
            }

            // Обновляем данные о сервисе
            service.title = title;
            service.description = description;
            service.price = price;
            await service.save();

            return res.json(service);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const service = await Service.findByPk(id);
            if (!service) {
                return next(ApiError.notFound('Service not found'));
            }

            // Удаляем сервис
            await service.destroy();

            return res.json({ message: 'Service deleted successfully' });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

module.exports = new ServiceController()