'use client';
import styles from "./styles.module.css";
import SideBar from "@/components/SideBar/sideBar";
import Balance from "@/components/Balance/balance";
import ReportsChart from "@/components/ReportsChart/reportschart";
import { IoMdNotifications } from "react-icons/io";
import logo from "../public/images/logo.png";
import Image from "next/image";
import { HiBars3 } from "react-icons/hi2";
import { useState } from "react";

export default function Home() {
  const [openSideBar, setOpenSideBar] = useState(false)

  return (
    <div className="main">
      <div className={styles.nav}>
        <div className={styles.leftSide}>
            <Image src={logo} alt="logo" fill style={{objectFit: 'cover'}} />
        </div>
        <div className={styles.rightSide}>
          <button onClick={() => setOpenSideBar(openSideBar ? false : true)}><HiBars3/></button>
        </div>
      </div>
        <div className={styles.dashboardContainer}>
          <SideBar openSideBar={openSideBar} setOpenSideBar={setOpenSideBar}/>
          <div className={styles.contentContainer}>
              <div className={styles.header}>
                  <h2>Dashboard</h2>
                  <button><IoMdNotifications/></button>
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
