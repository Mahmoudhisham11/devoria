'use client';
import SideBar from "@/components/SideBar/sideBar";
import styles from "./styles.module.css";
import { FaSearch } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GrMoney, GrCloudSoftware, GrStatusUnknown } from "react-icons/gr";
import { useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { MdOutlineModeEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { db } from "@/firbase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Clients() {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [openAdd, setOpenAdd] = useState(false);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [action, steAction] = useState(false)

  // الحقول
  const [name, setName] = useState("");
  const [paid, setPaid] = useState("");
  const [status, setStatus] = useState("");
  const [software, setSoftware] = useState("");
  const [date, setDate] = useState("");

  // جلب البيانات مباشرة
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "clients"), (snapshot) => {
      setClients(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // إضافة عميل جديد أو تعديل
  const handleSave = async () => {
    if (!name || !paid || !status || !software || !date) {
      alert("Please fill all fields ❌");
      return;
    }

    if (editId) {
      await updateDoc(doc(db, "clients", editId), {
        name,
        paid,
        status,
        software,
        date,
      });
      setEditId(null);
      alert("Client updated ✅");
    } else {
      await addDoc(collection(db, "clients"), {
        name,
        paid,
        status,
        software,
        date,
      });
      alert("Client added ✅");
    }

    setName("");
    setPaid("");
    setStatus("");
    setSoftware("");
    setDate("");
    setOpenAdd(false);
  };

  // حذف عميل
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "clients", id));
    alert("Client deleted 🗑️");
  };

  // تعبئة البيانات في التعديل
  const handleEdit = (client) => {
    setEditId(client.id);
    setName(client.name);
    setPaid(client.paid);
    setStatus(client.status);
    setSoftware(client.software);
    setDate(client.date);
    setOpenAdd(true);
  };

  // فلترة بالبحث
  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.clients}>
      <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar} />
      {/* Form */}
      <div
        className={styles.addContainer}
        style={{ display: openAdd ? "flex" : "none" }}
      >
        <div className={styles.addContent}>
          <div className={styles.title}>
            <h3>{editId ? "Edit Client" : "Add Client"}</h3>
            <button onClick={() => setOpenAdd(false)}>
              <IoIosCloseCircle />
            </button>
          </div>
          <div className={styles.form}>
            <div className="inputContainer">
              <label>
                <MdOutlineDriveFileRenameOutline />
              </label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label>
                <GrMoney />
              </label>
              <input
                type="number"
                placeholder="Paid"
                value={paid}
                onChange={(e) => setPaid(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label>
                <GrStatusUnknown />
              </label>
              <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <label>
                <GrCloudSoftware />
              </label>
              <input
                type="text"
                placeholder="Software"
                value={software}
                onChange={(e) => setSoftware(e.target.value)}
              />
            </div>
            <div className="inputContainer">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button onClick={handleSave}>
              {editId ? "Update Client" : "Add Client"}
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.header}>
            <div className={styles.leftSide}>
              <h2>Clients</h2>
            </div> 
            <div className={styles.rigthSide}>
              <div className={action ? `${styles.inputContainer} ${styles.open}` : `${styles.inputContainer}`}>
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
            <button onClick={() => setOpenSideBar(openSideBar ? false : true)}><HiBars3/></button>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.tableContainer}>
            <div className={styles.tableHead}>
              <h3>Clients Table</h3>
              <button onClick={() => setOpenAdd(true)}><GoPlus/></button>
            </div>
            <div className={styles.tableContent}>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Paid</th>
                      <th>Status</th>
                      <th>Software</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClients.map((client) => (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.paid} EGP</td>
                        <td>{client.status}</td>
                        <td>{client.software}</td>
                        <td>{client.date}</td>
                        <td className={styles.actions}>
                          <button onClick={() => handleEdit(client)}>
                            <MdOutlineModeEdit />
                          </button>
                          <button onClick={() => handleDelete(client.id)}>
                            <FaRegTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredClients.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>
                          No clients found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
