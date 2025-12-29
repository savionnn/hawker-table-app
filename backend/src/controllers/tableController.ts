import { Request, Response } from 'express'
import { randomBytes } from 'crypto'

type Table = {
    id: string
    tableNumber: number
    isOccupied: boolean
    salt: string
}

let tables: Table[] = [
    { id: "9f130a7c-7abd-4ec5-8a0f-219408865475", tableNumber: 1, isOccupied: false, salt: '' },
    { id: "67070297-9bef-41c4-9484-c77545ee6157", tableNumber: 2, isOccupied: false, salt: '' },
    { id: "fed61874-2ba1-4ffa-a38b-d98df2377e00", tableNumber: 3, isOccupied: false, salt: '' },
    { id: "284b2892-897f-4ba2-b811-2bf42ea2bd13", tableNumber: 4, isOccupied: false, salt: '' }
]

export const getTables = (_req: Request, res: Response) => {
    const publicTables = tables.map(table => ({
    id: table.tableNumber,
    isOccupied: table.isOccupied
  }))

  res.json(publicTables)
}

export const occupyTable = (req: Request, res: Response) => {
  const id = (req.params.id)
  const selectedTable = tables.find(table => table.id === id)

  if (!selectedTable) {
    return res.status(404).json({ error: 'Table not found' })
  }

  if (selectedTable.isOccupied) {
    return res.status(400).json({ error: 'Table already occupied' })
  }
  const salt = randomBytes(16).toString('hex')
  selectedTable.isOccupied = true
  selectedTable.salt = salt
  res.json({ success: true , salt, tableNumber: selectedTable.tableNumber })
}

export const unoccupyTable = (req: Request, res: Response) => {
    const tableNumber = Number(req.params.id)
    const salt = req.body.salt || ''

    const selectedTable = tables.find(table => table.tableNumber === tableNumber)

    if (!selectedTable) {
        return res.status(404).json({ error: 'Table not found' })
    }

    if (!selectedTable.isOccupied) {
        return res.status(400).json({ error: 'Table already free' })
    }

    if (selectedTable.salt !== salt) {
        return res.status(400).json({ error: 'Invalid salt' })
    } 
    
    selectedTable.isOccupied = false
    res.json({ success: true })
}
