"use client";
import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const menuItems = [
  {
    list: [
      {
        title: "Dashboard",
        path: "/admin/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/admin/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Posts",
        path: "/admin/dashboard/posts",
        icon: <MdShoppingBag />,
      },
    ],
  },
];

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { data: sessionData, status } = useSession(); // Destructure data from useSession

  return (
    <div className={styles.container}>
      <div className={styles.user}>
        {/* {sessionData?.user?.image && ( // Access user image from sessionData
          <Image
            className={styles.userImage}
            src={sessionData.user.image || "/noavatar.png"}
            alt=""
            width="50"
            height="50"
          />
        )} */}
        <div className={styles.userDetail}>
          <span className={styles.username}>{sessionData?.user?.username}</span>
          <span className={styles.userTitle}>KALTIMFOLKS</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
        <button className={styles.logout} onClick={signOut}>
          <MdLogout />
          Logout
        </button>
      </ul>
      
    </div>
  );
};

export default Sidebar;
