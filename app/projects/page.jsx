"use client";
import SideBar from "@/components/SideBar/sideBar";
import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { HiBars3 } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

// Firebase
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firbase";

export default function Projects() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [action, steAction] = useState(false);

  // popup
  const [openPopup, setOpenPopup] = useState(false);

  // states
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  // form inputs
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [subscribe, setSubscribe] = useState("");
  const [editId, setEditId] = useState(null);

  // fetch projects from firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(list);
    });
    return () => unsub();
  }, []);

  // add or update project
  const handleSave = async () => {
    if (!name || !amount || !subscribe) return alert("Please fill all fields");

    if (editId) {
      // update
      const ref = doc(db, "projects", editId);
      await updateDoc(ref, {
        name,
        amount,
        subscribe,
        date: new Date().toLocaleDateString(),
      });
      setEditId(null);
    } else {
      // add new
      await addDoc(collection(db, "projects"), {
        name,
        amount,
        subscribe,
        date: new Date().toLocaleDateString(),
      });
    }

    // clear
    setName("");
    setAmount("");
    setSubscribe("");
    setOpenPopup(false);
  };

  // delete project
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "projects", id));
  };

  // edit project
  const handleEdit = (project) => {
    setName(project.name);
    setAmount(project.amount);
    setSubscribe(project.subscribe);
    setEditId(project.id);
    setOpenPopup(true);
  };

  // filter projects
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.projects}>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.leftSide}>
              <h2>Projects</h2>
            </div>
            <div className={styles.rigthSide}>
              <div
                className={
                  action
                    ? `${styles.inputContainer} ${styles.open}`
                    : `${styles.inputContainer}`
                }
              >
                <label onClick={() => steAction(action ? false : true)}>
                  <FaSearch />
                </label>
                <input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button
                onClick={() => setOpenSideBar(openSideBar ? false : true)}
              >
                <HiBars3 />
              </button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <div className={styles.tableHead}>
              <h3>Projects Table</h3>
              <button onClick={() => setOpenPopup(true)}>
                <GoPlus />
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Subscribe</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>{project.name}</td>
                    <td>{project.amount} EGP</td>
                    <td>{project.subscribe} EGP</td>
                    <td>{project.date}</td>
                    <td className={styles.actions}>
                      <button onClick={() => handleEdit(project)}>
                        <MdOutlineModeEdit />
                      </button>
                      <button onClick={() => handleDelete(project.id)}>
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

      {/* Popup */}
      {openPopup && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>{editId ? "Edit Project" : "Add Project"}</h3>
            <input
              type="text"
              placeholder="Project Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="number"
              placeholder="Monthly Subscribe"
              value={subscribe}
              onChange={(e) => setSubscribe(e.target.value)}
            />
            <hr />
            <div className={styles.popupActions}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setOpenPopup(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
