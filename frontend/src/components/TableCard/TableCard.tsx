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
    <div className={styles.card}>
      <p className={styles.title}>Table {id}</p>
      <p className={styles.status}>
        Status: {isOccupied ? 'Occupied' : 'Free'}
      </p>

      {/* {!isOccupied && (
        <Button label="Occupy" onClick={onOccupy} />
      )}
      {isOccupied && (
        <Button label="Unoccupy" onClick={onUnoccupy} />
      )} */}
    </div>
  )
}
