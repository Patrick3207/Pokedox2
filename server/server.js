const express = require('express')
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200)
})

const userRouter = require('../routes/users')
const loginRouter = require('../routes/login')
app.use("/users", userRouter)

app.listen(3000)