'use client';
import styles from "./styles.module.css";
import { GrMoney } from "react-icons/gr";
import { useEffect, useState } from "react";
import { db } from "@/firbase";
import { collection, getDocs } from "firebase/firestore";
import { BsPerson } from "react-icons/bs";
import { TbMoneybag } from "react-icons/tb";

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
        <div className={styles.totalContainer}>
          <div className={styles.iconContainer}>
            <p className={styles.icon}><TbMoneybag /></p>
          </div>
          <div className={styles.textContainer}> 
            <h3>Total Balance</h3>
            <strong>{totalSales} EGP</strong>
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.iconContainer}>
            <p className={styles.icon}><GrMoney /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Revenues</h3>
            <strong>{totalClients} EGP</strong>
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.iconContainer}>
            <p className={styles.icon}><GrMoney /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Expenses</h3>
            <strong>{totalBuyers} EGP</strong>
          </div>
        </div>
        <div className={styles.totalContainer}>
          <div className={styles.iconContainer}>
            <p className={styles.icon}><BsPerson /></p>
          </div>
          <div className={styles.textContainer}>
            <h3>Total Client</h3>
            <strong>0</strong>
          </div>
        </div>
    </div>
  );
}
