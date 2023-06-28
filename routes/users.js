const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const userlist = []


router.get('/', (req, res) => {
    res.send('User List')
})

router.post('/', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 12)
        const user = {
            id: Date.now().toString(),
            email: req.body.email,
            password: hashedPassword
        }
        userlist.push(user)
        res.redirect('/login.html')
    }
    catch{
        res.redirect('signup.html')
    }
    console.log(userlist)
})

router.post('/login', async (req, res) => {
    const user = userlist.find(user => user.email = req.body.email)
    if (user == null){
        return res.status(400).send('Cannot find user')
    }
    try{
      if (await bcrypt.compare(req.body.password, user.password)) {
        res.redirect('/index.html')
      }
      else{
        res.send('not found')
      }
    }
    catch{
        res.status(500).send()
    }
})

router.get('/:id', (req, res) => {
    res.send(`${req.params.id}`)
})

module.exports = router
