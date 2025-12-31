import express from 'express'
import cors from 'cors'
import tableRoutes from './routes/tables'

const app = express()

app.use(cors({
  origin: process.env.FE_BASE || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

app.get('/api/status', (_req, res) => {
  res.send('Its working!')
})

app.use('/api/tables', tableRoutes)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})
