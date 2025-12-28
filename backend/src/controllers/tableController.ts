import { Request, Response } from 'express'

type Table = {
  id: number
  isOccupied: boolean
}

let tables: Table[] = [
  { id: 1, isOccupied: false },
  { id: 2, isOccupied: false },
  { id: 3, isOccupied: false },
  { id: 4, isOccupied: false }
  
]

export const getTables = (_req: Request, res: Response) => {
  res.json(tables)
}

export const occupyTable = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const selectedTable = tables.find(table => table.id === id)

  if (!selectedTable) {
    return res.status(404).json({ error: 'Table not found' })
  }

  if (selectedTable.isOccupied) {
    return res.status(400).json({ error: 'Table already occupied' })
  }

  selectedTable.isOccupied = true
  res.json({ success: true })
}

export const unoccupyTable = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const selectedTable = tables.find(table => table.id === id)

  if (!selectedTable) {
    return res.status(404).json({ error: 'Table not found' })
  }

  if (!selectedTable.isOccupied) {
    return res.status(400).json({ error: 'Table already free' })
  }

  selectedTable.isOccupied = false
  res.json({ success: true })
}
