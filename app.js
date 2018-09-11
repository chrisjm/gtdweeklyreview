const express = require('express')
const authRoutes = require('./routes/auth-routes')
const app = express()

// View Engine
app.set('view engine', 'ejs')

// Auth routes
app.use('/auth', authRoutes)

// Page routes
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('Now listening on http://localhost:3000')
})
