import express from 'express'
import cors from 'cors'
import tableRoutes from './routes/tables'

const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())

app.get('/api/status', (_req, res) => {
  res.send('Its working!')
})

app.use('/api/tables', tableRoutes)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
