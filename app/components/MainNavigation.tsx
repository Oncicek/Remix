import { NavLink } from "@remix-run/react";

const MainNavigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-black text-white" : ""
            }
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? "bg-black text-white" : ""
            }
            to={"/notes"}
          >
            Notes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default MainNavigation;
