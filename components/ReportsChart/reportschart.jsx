'use client';
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { db } from "@/firbase";
import { collection, onSnapshot } from "firebase/firestore";

export default function ReportsChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "clients"), (snapshot) => {
      const clients = snapshot.docs.map((doc) => doc.data());

      // مصفوفة فاضية للشهور
      const monthsCount = Array(12).fill(0);

      clients.forEach((client) => {
        if (client.date) {
          const date = new Date(client.date);
          const month = date.getMonth(); // 0 -> Jan, 11 -> Dec
          monthsCount[month]++;
        }
      });

      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const chartData = months.map((m, i) => ({
        month: m,
        count: monthsCount[i],
      }));

      setData(chartData);
    });

    return () => unsub();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>Clients Reports</h2>
        <div className={styles.reportsChart}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
