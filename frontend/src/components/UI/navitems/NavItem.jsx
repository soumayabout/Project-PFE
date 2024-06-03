import React from "react";
import { Link } from "react-router-dom";
import { IoChevronDown } from "react-icons/io5";
import classes from "./NavItem.module.css";

function NavItem({ item, handleItemClick, isItemExpanded }) {
  return (
    <li className={classes.nav_item}>
      {item.subItems ? (
        <>
          <Link
            className={`${classes.nav_link} ${
              isItemExpanded(item.id) ? classes.expanded : classes.collapsed
            }`}
            to={`#${item.id}`}
            onClick={() => handleItemClick(item.id)}
          >
            {item.icon}
            <span>{item.title}</span>
            <IoChevronDown className={classes.chevronDown} />
          </Link>
          <ul
            className={`${classes.nav_content} ${
              isItemExpanded(item.id) ? classes.show : ""
            }`}
            id={item.id}
          >
            {item.subItems.map((subItem, index) => (
              <li key={index}>
                <Link to={subItem.link} className={classes.sub_link}>
                  <span className={classes.sub_icon}>{subItem.subIcon}</span>
                  <span>{subItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <Link className={classes.nav_link} to={item.link}>
          {item.icon}
          <span>{item.title}</span>
        </Link>
      )}
    </li>
  );
}

export default NavItem;
