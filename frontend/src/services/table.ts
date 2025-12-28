import { api } from './api'

type StoredTables = Record<number, string>

const getStoredTables = (): StoredTables => {
  return JSON.parse(localStorage.getItem('myTables') || '{}')
}

const setStoredTables = (tables: StoredTables) => {
  localStorage.setItem('myTables', JSON.stringify(tables))
}

export const occupyTable = async (tableId: number) => {
  const res = await api.post(`/tables/${tableId}/occupy`)
  const salt = res.data.salt

  const stored = getStoredTables()
  stored[tableId] = salt
  setStoredTables(stored)

  return salt
}

export const unoccupyTable = async (tableId: number) => {
  const stored = getStoredTables()
  const salt = stored[tableId]

  if (!salt) throw new Error("You can't unoccupy this table.")

  const res = await api.post(`/tables/${tableId}/unoccupy`, { salt })
  
  delete stored[tableId]
  setStoredTables(stored)

  return res
}

export const getTables = async () => {
  const res = await api.get('/tables')
  return res
}
