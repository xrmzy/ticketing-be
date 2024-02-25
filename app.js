const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

const categoriesRouter = require('./app/api/v1/categoreis/router')
const imagesRouter = require('./app/api/v1/images/router')
const talentsRouter = require('./app/api/v1/talents/router')
const eventsRouter = require('./app/api/v1/events/router')
const organizersRouter = require('./app/api/v1/organizers/router')
const authsCMSRouter = require('./app/api/v1/auth/router')
const orderCMSRouter = require('./app/api/v1/orders/router')
const participantsCMSRouter = require('./app/api/v1/participants/router')
const paymentsCMSRouter = require('./app/api/v1/payments/router')

const notFoundMiddleware = require('./app/middlewares/not-found')
const handleErrorMinddleware = require('./app/middlewares/handler-error')

const cms = '/api/v1/cms'
const v1 = '/api/v1/'

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to api ticketing'
  })
})

app.use(cms, categoriesRouter)
app.use(cms, imagesRouter)
app.use(cms, talentsRouter)
app.use(cms, eventsRouter)
app.use(cms, organizersRouter)
app.use(cms, authsCMSRouter)
app.use(cms, orderCMSRouter)
app.use(cms, paymentsCMSRouter)
app.use(v1, participantsCMSRouter)

app.use(notFoundMiddleware)
app.use(handleErrorMinddleware)

module.exports = app
