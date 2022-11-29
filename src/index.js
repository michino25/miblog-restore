const path = require('path')
const express = require('express')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const route = require('./routes')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'public')))

// http logger
app.use(morgan('combined'))

// template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resource/views'))

route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// localhost 127.0.0.1