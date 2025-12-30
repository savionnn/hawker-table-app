import { useEffect, useState } from 'react'
import { getTables } from '../../services/table'
import { TableCard } from '../../components/TableCard/TableCard'
import type { Table } from '../../types/Table'
import styles from './HomePage.module.css'
import { useNavigate } from 'react-router-dom'

export const HomePage: React.FC = () => {
    const [tables, setTables] = useState<Table[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        getTables()
            .then(res => setTables(res.data))
            .finally(() => setLoading(false))
    }, [])


    if (loading) return <div className={styles.spinner}></div>

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Hawker Table Tracker</h1>
                <p className={styles.hawkerName}>ABC Food Centre</p>
            </header>

            <div className={styles.summary}>
                <div className={styles.summaryItem}>
                <span className={styles.freeCount}>{tables.filter(t => !t.isOccupied).length}</span>
                <span className={styles.label}>Free</span>
                </div>
                <div className={styles.summaryItem}>
                <span className={styles.occupiedCount}>{tables.filter(t => t.isOccupied).length}</span>
                <span className={styles.label}>Occupied</span>
                </div>
            </div>

            <p className={styles.note}>Scan the QR code at a table to occupy it.</p>

            <div className={styles.grid}>
                {tables.map(table => (
                <TableCard
                    key={table.id}
                    id={table.id}
                    isOccupied={table.isOccupied}
                />
                ))}
            </div>
            <button 
              className={styles.myTablesButton}
              onClick={() => navigate('/my-tables')}>
            My Tables</button>
        </div>

    )
    }
