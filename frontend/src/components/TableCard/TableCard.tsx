import React from 'react'
import styles from './TableCard.module.css'
// import { Button } from '../Button/Button'

interface TableCardProps {
  id: number
  isOccupied: boolean
  onOccupy?: () => void
  onUnoccupy?: () => void
}

export const TableCard: React.FC<TableCardProps> = ({
  id,
  isOccupied,
//   onOccupy,
//   onUnoccupy
}) => {
  return (
    <div className={`${styles.card} ${isOccupied ? styles.occupied : styles.free}`}>
      <p className={`${styles.title} ${isOccupied ? styles.occupied : styles.free}`}>Table {id}</p>
      <p className={`${styles.status} ${isOccupied ? styles.occupied : styles.free}`}>{isOccupied ? 'Occupied' : 'Free'}</p>
      {/* {!isOccupied && (
        <Button label="Occupy" onClick={onOccupy} />
      )}
      {isOccupied && (
        <Button label="Unoccupy" onClick={onUnoccupy} />
      )} */}
    </div>
  )
}
