import { useEffect, useState } from "react";
import { unoccupyTable } from "../../services/table";
import styles from "./MyTablesPage.module.css";

interface MyTable {
  id: number;
  salt: string;
}

export const MyTablesPage: React.FC = () => {
  const [myTables, setMyTables] = useState<MyTable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("myTables") || "{}");
    const tables: MyTable[] = Object.entries(stored).map(([id, salt]) => ({
      id: Number(id),
      salt: salt as string,
    }));
    setMyTables(tables);
    setLoading(false);
  }, []);

  const handleUnoccupy = async (tableId: number) => {
    try {
      await unoccupyTable(Number(tableId));
      alert(`Table ${tableId} unoccupied!`);

      setMyTables((prev) => prev.filter((t) => t.id !== tableId));
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.error || err?.message || "Something went wrong";
      alert(msg);
    }
  };

  const handleUnoccupyAll = async () => {
    for (const table of myTables) {
      await handleUnoccupy(table.id);
    }
  };

  if (loading) return <p>Loading your tables...</p>;
  if (myTables.length === 0) return <p>You have no occupied tables.</p>;

  return (
    <div className={styles.container}>
      <h1>My Occupied Tables</h1>

      <button className={styles.unoccupyAll} onClick={handleUnoccupyAll}>
        Unoccupy All
      </button>

      <ul className={styles.tableList}>
        {myTables.map((table) => (
          <li key={table.id} className={styles.tableItem}>
            <span>Table {table.id}</span>
            <button
              className={styles.unoccupyBtn}
              onClick={() => handleUnoccupy(table.id)}
            >
              Unoccupy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
