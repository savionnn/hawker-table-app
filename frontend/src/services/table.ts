import { api } from './api'

type StoredTables = Record<number, string>

const getStoredTables = (): StoredTables => {
  return JSON.parse(localStorage.getItem('myTables') || '{}')
}

const setStoredTables = (tables: StoredTables) => {
  localStorage.setItem('myTables', JSON.stringify(tables))
}

export const occupyTable = async (tableId: string) => {
  const res = await api.post(`/tables/occupy/${tableId}`)
  const tableNumber = res.data.tableNumber
  const salt = res.data.salt

  const stored = getStoredTables()
  stored[tableNumber] = salt
  setStoredTables(stored)

  return {salt, tableNumber}
}

export const unoccupyTable = async (tableId: number) => {
  const stored = getStoredTables()
  const salt = stored[tableId]

  if (!salt) throw new Error("You can't unoccupy this table.")

  const res = await api.post(`/tables/unoccupy/${tableId}`, { salt })
  
  delete stored[tableId]
  setStoredTables(stored)

  return res
}

export const getTables = async () => {
  const res = await api.get('/tables')
  return res
}
