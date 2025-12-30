import { useEffect, useState } from "react";
import { unoccupyTable } from "../../services/table";
import styles from "./UnoccupyPage.module.css";
import { useNavigate } from "react-router-dom";

export const UnoccupyPage: React.FC = () => {
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('myTables') || '{}');
        const tableIds = Object.keys(stored); 

        if (tableIds.length === 0) {
            setStatus('success');
            setMessage('No tables to unoccupy.');
            return;
        }

        const unoccupyAll = async () => {
            try {
                for (const tableId of tableIds) {
                await unoccupyTable(Number(tableId)); 
                }
                setStatus('success');
                setMessage('All tables unoccupied!');
            } catch (err: any) {
                console.error(err);
                setStatus('error');
                setMessage(err?.response?.data?.error || err?.message || 'Something went wrong');
            }
        };

        unoccupyAll();
    }, []);

  return (
    <div className={styles.unoccupyPage}>
        {status === 'loading' && (
            <div className={styles.state}>
                <div className={styles.spinner}></div>
                <p className={styles.subtitle}>Occupying table…</p>
            </div>
        )}
        {status === 'success' && (
            <div className={styles.state}>
                <div className={styles.checkmark}>✓</div>
                <h1 className={styles.title}>Success</h1>
                <p className={styles.subtitle}>{message}</p>
            </div>
        )}
        {status === 'error' && (
            <div className={styles.state}>
                <div className={styles.errorMark}>✗</div>
                <h1 className={styles.title}>Error</h1>
                <p className={styles.subtitle}>{message}</p>
            </div>
        )}
        <button 
            className={styles.primary}
            onClick={() => navigate('/')}>
          Back to Home</button>
    </div>
  );
};
