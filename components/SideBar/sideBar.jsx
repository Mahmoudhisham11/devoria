"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { BsPersonPlusFill } from "react-icons/bs";
import { GrCloudSoftware } from "react-icons/gr";
import { FaGear } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function SideBar({ openSideBar, setOpenSideBar }) {
  return (
    <div
      className={
        openSideBar
          ? `${styles.sideBarContainer} ${styles.open}`
          : `${styles.sideBarContainer}`
      }
    >
      <div className={styles.topContent}>
        <div className={styles.logoContainer}>
          <div className={styles.imageContainer}>
            <Image
              src="/images/person.JPG"
              fill
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                border: "1px solid white",
              }}
              alt="person"
            />
          </div>
          <h3>
            Hello, <br /> Mahmoud 👋
          </h3>
        </div>
        <div className={styles.linksContainer}>
          <Link href={"/"} className={styles.links}>
            <span>
              <MdDashboard />
            </span>
            <span>Dashboard</span>
          </Link>
          <Link href={"/finance"} className={styles.links}>
            <span>
              <GrMoney />
            </span>
            <span>Finance</span>
          </Link>
          <Link href={"/clients"} className={styles.links}>
            <span>
              <BsPersonPlusFill />
            </span>
            <span>Clients</span>
          </Link>
          <Link href={"/projects"} className={styles.links}>
            <span>
              <GrCloudSoftware />
            </span>
            <span>Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
