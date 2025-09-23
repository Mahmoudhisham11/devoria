"use client";
import SideBar from "@/components/SideBar/sideBar";
import styles from "./styles.module.css";
import { useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Finance() {
    const [openSideBar, setOpenSideBar] = useState(false);
    const [capital, setCapital] = useState(1000); // رأس المال الافتراضي
    const [expenses, setExpenses] = useState(300); // مثال لمصاريف

    // حساب المتبقي
    const remaining = capital - expenses;
    const progress = (remaining / capital) * 100; // النسبة المتبقية

    return (
        <div className={styles.finance}>
            <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
            <div className={styles.contentContainer}>
                {/* HEADER CONTAINER */}
                <div className={styles.headerContainer}>
                    <div className={styles.header}>
                        <h2>Finance Overview</h2>
                        <div className={styles.btns}>
                            <button onClick={() => setOpenSideBar(openSideBar ? false : true)}><HiBars3 /></button>
                        </div>
                    </div>
                </div>

                {/* CONTENT CONTAINER */}
                <div className={styles.content}>
                    <div className={styles.balanceContainer}>
                        <div className={styles.top}>
                            <h3>Balance</h3>
                            <button><MdOutlineModeEdit /></button>
                        </div>
                        <div className={styles.bottom}>
                            <strong>{capital} EGP</strong>
                            {/* Progress Bar */}
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressFill} 
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.tableContainer}>
                        <div className={styles.tableHead}>
                            <h3>Expenses</h3>
                            <button><GoPlus /></button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Food</td>
                                    <td>100 EGP</td>
                                    <td>23-9-2025</td>
                                    <td className={styles.actions}>
                                        <button><MdOutlineModeEdit /></button>
                                        <button><FaRegTrashAlt /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
