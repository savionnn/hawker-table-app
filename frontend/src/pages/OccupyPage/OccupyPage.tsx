import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { occupyTable } from '../../services/table'

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
  if (status === 'loading') return <p>Processing...</p>
  if (status === 'success') return <p>Table {tableNumber} occupied!</p>
  if (status === 'denied') return <p>Table already occupied.</p>
  return <p>Something went wrong.</p>
}
