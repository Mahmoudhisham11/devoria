"use client";
import SideBar from "@/components/SideBar/sideBar";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { HiBars3 } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  query,
} from "firebase/firestore";
import { db } from "@/firbase";

export default function Finance() {
  const [openSideBar, setOpenSideBar] = useState(false);

  // رأس المال
  const [capital, setCapital] = useState(0);
  const [showCapitalPopup, setShowCapitalPopup] = useState(false);
  const [newCapital, setNewCapital] = useState("");

  // المصاريف
  const [expenses, setExpenses] = useState([]);
  const [showExpensePopup, setShowExpensePopup] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [editExpenseId, setEditExpenseId] = useState(null);

  const financeRef = collection(db, "finance");

  // تحميل البيانات
  useEffect(() => {
    const q = query(financeRef);
    const unsub = onSnapshot(q, (snapshot) => {
      let exp = [];
      let cap = 0;
      snapshot.docs.forEach((doc) => {
        if (doc.data().type === "capital") {
          cap = doc.data().amount;
        } else if (doc.data().type === "expense") {
          exp.push({ id: doc.id, ...doc.data() });
        }
      });
      setCapital(cap);
      setExpenses(exp);
    });
    return () => unsub();
  }, []);

  // حساب المتبقي
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const remaining = capital - totalExpenses;
  const progress = capital > 0 ? (remaining / capital) * 100 : 0;

  // حفظ رأس المال
  const saveCapital = async () => {
    const q = query(financeRef);
    // نخزن رأس المال كـ doc type = capital
    const capitalDoc = expenses.find((e) => e.type === "capital");
    if (capitalDoc) {
      await updateDoc(doc(db, "finance", capitalDoc.id), {
        amount: Number(newCapital),
      });
    } else {
      await addDoc(financeRef, { type: "capital", amount: Number(newCapital) });
    }
    setShowCapitalPopup(false);
    setNewCapital("");
  };

  // إضافة مصروف جديد
  const addExpense = async () => {
    if (!expenseName || !expenseAmount) return;
    if (editExpenseId) {
      await updateDoc(doc(db, "finance", editExpenseId), {
        name: expenseName,
        amount: Number(expenseAmount),
        date: new Date().toLocaleDateString(),
      });
      setEditExpenseId(null);
    } else {
      await addDoc(financeRef, {
        type: "expense",
        name: expenseName,
        amount: Number(expenseAmount),
        date: new Date().toLocaleDateString(),
      });
    }
    setExpenseName("");
    setExpenseAmount("");
    setShowExpensePopup(false);
  };

  // تعديل مصروف
  const editExpense = (exp) => {
    setExpenseName(exp.name);
    setExpenseAmount(exp.amount);
    setEditExpenseId(exp.id);
    setShowExpensePopup(true);
  };

  // حذف مصروف
  const deleteExpense = async (id) => {
    await deleteDoc(doc(db, "finance", id));
  };

  return (
    <div className={styles.finance}>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className={styles.contentContainer}>
        {/* HEADER CONTAINER */}
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <h2>Finance Overview</h2>
            <div className={styles.btns}>
              <button onClick={() => setOpenSideBar(!openSideBar)}>
                <HiBars3 />
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className={styles.content}>
          {/* Balance */}
          <div className={styles.balanceContainer}>
            <div className={styles.top}>
              <h3>Balance</h3>
              <button onClick={() => setShowCapitalPopup(true)}>
                <MdOutlineModeEdit />
              </button>
            </div>
            <div className={styles.bottom}>
              <strong>{remaining} EGP</strong>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <div className={styles.tableContainer}>
            <div className={styles.tableHead}>
              <h3>Expenses</h3>
              <button onClick={() => setShowExpensePopup(true)}>
                <GoPlus />
              </button>
            </div>
            <div className={styles.tableContent}>
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
                  {expenses.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.name}</td>
                      <td>{exp.amount} EGP</td>
                      <td>{exp.date}</td>
                      <td className={styles.actions}>
                        <button onClick={() => editExpense(exp)}>
                          <MdOutlineModeEdit />
                        </button>
                        <button onClick={() => deleteExpense(exp.id)}>
                          <FaRegTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP تعديل رأس المال */}
      {showCapitalPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>Edit Capital</h3>
            <input
              type="number"
              value={newCapital}
              onChange={(e) => setNewCapital(e.target.value)}
              placeholder="Enter new capital"
            />
            <hr />
            <div className={styles.popBtns}>
                <button onClick={saveCapital}>Save</button>
                <button onClick={() => setShowCapitalPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP إضافة/تعديل مصروف */}
      {showExpensePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h3>{editExpenseId ? "Edit Expense" : "Add Expense"}</h3>
            <input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              placeholder="Expense name"
            />
            <input
              type="number"
              value={expenseAmount}
              onChange={(e) => setExpenseAmount(e.target.value)}
              placeholder="Amount"
            />
            <hr />
            <div className={styles.popBtns}>
                <button onClick={addExpense}>
                {editExpenseId ? "Update" : "Add"}
                </button>
                <button onClick={() => setShowExpensePopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
