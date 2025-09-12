'use client';
import styles from "./styles.module.css";
import { GrMoney } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa";
import { MdOutlineAutoGraph } from "react-icons/md";
import { useEffect, useState } from "react";
import { db } from "@/firbase";
import { collection, getDocs } from "firebase/firestore";
import { HiMiniEye } from "react-icons/hi2";

export default function Balance() {
  const [totalSales, setTotalSales] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalBuyers, setTotalBuyers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "clients"));
      let sales = 0;
      let buyers = 0;

      const clients = snapshot.docs.map((doc) => doc.data());

      clients.forEach((client) => {
        if (client.paid) {
          sales += Number(client.paid); // اجمالي المبيعات
        }
        if (client.status?.toLowerCase() === "buyed") {
          buyers++;
        }
      });

      setTotalSales(sales);
      setTotalClients(clients.length);
      setTotalBuyers(buyers);
    };

    fetchData();  
  }, []);

  return (
    <div className={styles.blanceContainer}>
        <div className={`${styles.totalContainer} ${styles.firstBox}`}>
          <div className={styles.iconContainer}>
            <p className={styles.salesIcon}><MdOutlineAutoGraph /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Sales</h3>
            <p>{totalSales} EGB</p>
          </div>
        </div>
        <div className={`${styles.totalContainer} ${styles.secondBox}`}>
          <div className={styles.iconContainer}>
            <p className={styles.personIcon}><FaUserTie /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Clients</h3>
            <p>{totalClients}</p>
          </div>
        </div>
        <div className={`${styles.totalContainer} ${styles.theredBox}`}>
          <div className={styles.iconContainer}>
            <p className={styles.moneyIcon}><GrMoney /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Buyers</h3>
            <p>{totalBuyers}</p>
          </div>
        </div>
        <div className={`${styles.totalContainer} ${styles.firstBox}`}>
          <div className={styles.iconContainer}>
            <p className={styles.salesIcon}><HiMiniEye /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Asks</h3>
            <p>0</p>
          </div>
        </div>
    </div>
  );
}
