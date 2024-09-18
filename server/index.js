const express = require('express')
const app = express();
const userRoutes = require('./routes/userRoutes')
const visitedRoutes = require('./routes/visitedRoutes')
const wantToVisitRoutes = require('./routes/wantToVisitRoutes')

app.use(express.json());

app.use('/api/users', userRoutes)
app.use('/api/visited', visitedRoutes)
app.use('/api/want-to-visit', wantToVisitRoutes)

const PORT = 6543;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})