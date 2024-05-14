require('dotenv').config()
const express = require('express')
const sequelize = require('.//db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const PORT = process.env.PORT || 5000 
var morgan = require('morgan');


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/', router)

//обработка ошибок
app.use(errorHandler)

// Логирование запросов
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log('Сервер запущен на порту 5000'))
    } catch (e){
        console.log(e)
    }
}

start()

