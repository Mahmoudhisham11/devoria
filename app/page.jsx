'use client';
import styles from "./styles.module.css";
import SideBar from "@/components/SideBar/sideBar";
import Balance from "@/components/Balance/balance";
import ReportsChart from "@/components/ReportsChart/reportschart";
import { MdOutlineNotifications } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";

export default function Home() {
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <div className="main">
      <div className={styles.dashboardContainer}>
          <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
          <div className={styles.contentContainer}>
              <div className={styles.headerContainer}>
                <div className={styles.header}>
                    <h2>Dashboard</h2>
                    <div className={styles.btns}>
                      <button><FaRegEye/></button>
                      <button><MdOutlineNotifications/></button>
                      <button onClick={() => setOpenSideBar(openSideBar ? false : true)}><HiBars3/></button>
                    </div>
                </div>
              </div>
              <div className={styles.content}>
                  <Balance/>
                  <ReportsChart/>
              </div>
          </div>
      </div>
    </div>
  );
}
