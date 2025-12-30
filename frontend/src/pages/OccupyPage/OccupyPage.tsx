import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { occupyTable } from '../../services/table'
import styles from './OccupyPage.module.css'

export const OccupyPage: React.FC = () => {
  const { id } = useParams<{ id: string | undefined }>()
  const navigate = useNavigate()

  const [status, setStatus] = useState<'loading' | 'success' | 'denied' | 'error'>('loading')
  const [tableNumber, setTableNumber] = useState<number | null>(null)
  const [hasProcessed, setHasProcessed] = useState(false)

  useEffect(() => {
    if (!id || hasProcessed) return
    setHasProcessed(true)
    occupyTable(id)
      .then(res => {
        setTableNumber(Number(res.tableNumber))
        setStatus('success')

        navigate('/occupy', { replace: true })
      })
      .catch(err => {
        const msg = err?.response?.data?.error
        if (msg === 'Table already occupied') {
          setStatus('denied')
        } else {
          setStatus('error')
        }

        navigate('/occupy', { replace: true })
      })
  }, [id, hasProcessed, navigate])
  
  console.log(status)
  console.log(tableNumber)

  return (
    <div className={styles.occupyPage}>
      {status === 'loading' && (
        <div className={styles.state}>
          <div className={styles.spinner}></div>
          <p className={styles.subtitle}>Occupying table…</p>
        </div>
      )}

      {status === 'success' && (
        <div className={styles.state}>
          <div className={styles.checkmark}>✓</div>
          <h1 className={styles.title}>Table {tableNumber} Occupied</h1>
          <p className={styles.subtitle}>Enjoy your meal</p>
          <div className={styles.actions}>
            <button 
              className={styles.primary}
              onClick={() => navigate('/my-tables')}>
            My Tables</button>
            <button 
              className={styles.secondary}
              onClick={() => navigate('/')}>
            Back to Home</button>
          </div>
        </div>
      )}

      {status === 'denied' && (
        <div className={styles.state}>
          <h1 className={styles.title}>Table already occupied</h1>
          <p className={styles.subtitle}>Please find another table</p>
          <button 
            className={styles.primary}
            onClick={() => navigate('/')}>
          Back to Home</button>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.state}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.subtitle}>Please try again</p>
          <button 
            className={styles.primary}
            onClick={() => navigate('/')}>
          Back to Home</button>
        </div>
      )}
    </div>
)}