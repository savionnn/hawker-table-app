import { useEffect, useState } from "react";
import { unoccupyTable } from "../../services/table";
import styles from "./MyTablesPage.module.css";
import { useNavigate } from "react-router-dom";

interface MyTable {
    id: number;
    salt: string;
}

export const MyTablesPage: React.FC = () => {
    const [myTables, setMyTables] = useState<MyTable[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

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
            console.log(`Table ${tableId} unoccupied!`);

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
    if (myTables.length === 0) return (
        <div className={styles.container}>
            <h1>My Occupied Tables</h1>
            <p className={styles.label}>You have no occupied tables.</p>
            <button 
            className={styles.backBtn}
            onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );

    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>My Occupied Tables</h1>

            <button className={styles.unoccupyAll} onClick={handleUnoccupyAll}>
                Unoccupy All
            </button>

            <ul className={styles.tableList}>
                {myTables.map((table) => (
                    <li key={table.id} className={styles.tableItem}>
                    <div className={styles.left}>
                        <span className={styles.tableNumber}>Table {table.id}</span>
                        <span className={styles.status}>Occupied</span>
                    </div>

                    <button
                        className={styles.unoccupyBtn}
                        onClick={() => handleUnoccupy(table.id)}
                    >
                        Unoccupy
                    </button>
                    </li>
                ))}
            </ul>

            <button 
            className={styles.backBtn}
            onClick={() => navigate("/")}>Back to Home</button>
        </div>
    );
};
