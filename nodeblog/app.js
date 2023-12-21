const path = require('path') 
// const express = require('express')
// //const exphbs = require('express-handlebars')
// const exphbs  = require('express-handlebars')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const hostname = '127.0.0.1'
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/generateDate').generateDate

mongoose.connect('mongodb://127.0.0.1/nodeblog_db',)

app.use(fileUpload())

app.use(express.static('public'))



app.engine('handlebars', exphbs.engine({helpers:{generateDate:generateDate}}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const myMiddleware = (req, res, next) => {
    console.log('KET')
    next()
}

app.use('/', myMiddleware)

const main = require('./routes/main')
const posts = require('./routes/posts')
const users = require('./routes/users') 
const { format } = require('path')
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)


app.listen(port, hostname, () => {
    console.log(`Server Çalışıyor, http://${hostname}:${port}/`)
})
