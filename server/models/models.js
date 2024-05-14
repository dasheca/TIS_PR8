const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.INTEGER, unique: true},
    FIO: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Registration = sequelize.define('registration', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    time: {type: DataTypes.TIME},
    service: {type: DataTypes.STRING},
    specialist: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING}
})

const Service = sequelize.define('service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    photo: { type: DataTypes.STRING },
    FIO: { type: DataTypes.STRING}, // Добавляем поле specialistId
    type: {type: DataTypes.INTEGER}
})

const Specialist = sequelize.define('specialist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    FIO: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING, unique: true},
    description: { type: DataTypes.STRING, allowNull: false },
    experience: { type: DataTypes.INTEGER },
    photo: { type: DataTypes.STRING }
})

// Устанавливаем связь между таблицами Service и Specialist
Specialist.belongsTo(Service, { foreignKey: 'specialistID' })

Service.belongsTo(Registration, { foreignKey: 'title' })

//Specialist.hasMany(Registration, { foreignKey: 'specialist' })

User.belongsTo(Registration, { foreignKey: 'email' })





module.exports = {
    User,
    Registration,
    Specialist,
    Service
}





