import { useEffect, useState } from 'react'
import { TableCard } from '../../components/TableCard/TableCard'
import { getTables, unoccupyTable } from '../../services/table'
import type { Table } from '../../types/Table'
import styles from './HomePage.module.css'

export const HomePage: React.FC = () => {
    const [tables, setTables] = useState<Table[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getTables()
            .then(res => setTables(res.data))
            .finally(() => setLoading(false))
    }, [])

    // const handleOccupy = (tableId: number) => {
    //     occupyTable(tableId)
    //         .then(() => {
    //             setTables(prevTables =>
    //                 prevTables.map(table =>
    //                     table.id === tableId ? { ...table, isOccupied: true } : table
    //                 )
    //             )
    //             alert(`Table ${tableId} occupied!`)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //             alert(err.response?.data?.error || 'Something went wrong')}
    //         )
    // }
    const handleUnoccupy = (tableId: number) => {
        unoccupyTable(tableId)
            .then(() => {
                setTables(prevTables =>
                    prevTables.map(table =>
                        table.id === tableId ? { ...table, isOccupied: false } : table
                    )
                )
                alert(`Table ${tableId} unoccupied!`)
            })
            .catch(err => {
                console.error(err)
                alert(err.response?.data?.error || err?.message || 'Something went wrong')})
    }
    if (loading) return <p>Loading tables...</p>

    return (
        <div className={styles.container}>
        <h1>Hawker Table Availability</h1>
        <div className={styles.grid}>
            {tables.map(table => (
            <TableCard
                key={table.id}
                id={table.id}
                isOccupied={table.isOccupied}
                // onOccupy={() => handleOccupy(table.id)}
                onUnoccupy={() => handleUnoccupy(table.id)}
            />
            ))}
        </div>
        </div>
    )
    }
