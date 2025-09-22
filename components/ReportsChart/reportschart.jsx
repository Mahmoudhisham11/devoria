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
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function ReportsChart() {
  const [clientsData, setClientsData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  // 📊 Clients Reports (Dummy Data)
  useEffect(() => {
    const dummyClients = [
      { month: "Jan", count: 5 },
      { month: "Feb", count: 8 },
      { month: "Mar", count: 12 },
      { month: "Apr", count: 7 },
      { month: "May", count: 15 },
      { month: "Jun", count: 9 },
      { month: "Jul", count: 14 },
      { month: "Aug", count: 18 },
      { month: "Sep", count: 20 },
      { month: "Oct", count: 11 },
      { month: "Nov", count: 16 },
      { month: "Dec", count: 22 },
    ];
    setClientsData(dummyClients);
  }, []);

  // 💰 Revenues VS Expenses (Dummy Data)
  useEffect(() => {
    const dummyFinance = [
      { month: "Jan", revenues: 5000, expenses: 3000 },
      { month: "Feb", revenues: 7000, expenses: 4000 },
      { month: "Mar", revenues: 6500, expenses: 5000 },
      { month: "Apr", revenues: 8000, expenses: 4500 },
      { month: "May", revenues: 9000, expenses: 7000 },
      { month: "Jun", revenues: 7500, expenses: 6000 },
      { month: "Jul", revenues: 10000, expenses: 8000 },
      { month: "Aug", revenues: 9500, expenses: 5000 },
      { month: "Sep", revenues: 11000, expenses: 7000 },
      { month: "Oct", revenues: 12000, expenses: 6500 },
      { month: "Nov", revenues: 13000, expenses: 9000 },
      { month: "Dec", revenues: 15000, expenses: 10000 },
    ];
    setFinanceData(dummyFinance);
  }, []);

  // 🏆 Top Products (Dummy Data)
  useEffect(() => {
    const dummyProducts = [
      { name: "Cashat", sales: 100 },
      { name: "POS System", sales: 90 },
      { name: "Devoria CRM", sales: 70 },
    ];
    setTopProducts(dummyProducts);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        {/* Clients Reports */}
        <div className={styles.content}>
          <h2>Clients Reports</h2>
          <div className={styles.reportsChart}>
            <ResponsiveContainer>
              <BarChart data={clientsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis allowDecimals={false} stroke="#888" />
                <Tooltip />
                <Bar dataKey="count" fill="#7C3AED" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenues VS Expenses */}
        <div className={styles.content}>
          <h2>Revenues VS Expenses</h2>
          <div className={styles.reportsChart}>
            <ResponsiveContainer>
              <LineChart data={financeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#888" />
                <YAxis allowDecimals={false} stroke="#888" />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="revenues"
                  stroke="#7C3AED"
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expenses"
                  stroke="#9CA3AF"
                  strokeWidth={3}
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className={styles.content}>
        <h2>Top Products</h2>
        <div className={styles.topProductsContainer}>
          {topProducts.map((product, index) => (
            <div key={index} className={styles.productItem}>
              <span className={styles.productName}>{product.name}</span>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${product.sales}%` }}
                >
                  <span className={styles.salesText}>
                    {product.sales} Sales
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
