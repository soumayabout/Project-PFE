import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AdminDatasidebar, StudentDatasidebar, ProfDatasidebar } from "./Datasidebar";
import classes from "./SideBar.module.css";
import NavItem from "../../UI/navitems/NavItem";
import { checkUserType } from "../../../utils/auth";

function SideBar() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const [user, setUser] = useState("");

  useEffect(() => {
    const type = checkUserType();
    setUser(type);
    
  }, []);

  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleItemClick = (itemId) => {
    if (itemId === expandedItemId) {
      setExpandedItemId(null);
    } else {
      setExpandedItemId(itemId);
    }
  };

  const isItemExpanded = (itemId) => {
    return itemId === expandedItemId;
  };

  return (
    <div>
      <aside
        id="sidebar"
        className={`${classes.sidebar} ${
          isOpen ? classes.open : classes.closed
        }`}
      >
        <ul className={classes.sidebar_nav} id="sidebar-nav">
          {user === "admin" &&
            AdminDatasidebar.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                handleItemClick={handleItemClick}
                isItemExpanded={isItemExpanded}
              />
            ))}
          {user === "etudiant" &&
            StudentDatasidebar.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                handleItemClick={handleItemClick}
                isItemExpanded={isItemExpanded}
              />
            ))}
          {user === "professeur" &&
          ProfDatasidebar.map((item) => (
              <NavItem
                key={item.id}
                item={item}
                handleItemClick={handleItemClick}
                isItemExpanded={isItemExpanded}
              />
            ))}
        </ul>
      </aside>
    </div>
  );
}

export default SideBar;
