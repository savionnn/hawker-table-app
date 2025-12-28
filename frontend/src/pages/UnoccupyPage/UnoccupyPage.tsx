import { useEffect, useState } from "react";
import { unoccupyTable } from "../../services/table";

export const UnoccupyPage: React.FC = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

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

  if (status === 'loading') return <p>Unoccupying tables...</p>;
  if (status === 'error') return <p>Error: {message}</p>;

  return <p>{message}</p>;
};
