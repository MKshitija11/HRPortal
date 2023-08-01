import { useEffect, useState } from "react";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";
import SvgColor from "../svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);
let redirectUrl = "";
export default function NavSection() {
  const [menuList = [], setMenuList] = useState();

  useEffect(() => {
    const USERDETAILS = JSON.parse(sessionStorage.getItem("USERDETAILS"));
    console.log("USERDETAILS.NAV.userProfile", USERDETAILS.userProfile);
    if (USERDETAILS.userProfile === "BAGIC_ADMIN") {
      redirectUrl = "/Dashboard";
    } else if (USERDETAILS.userProfile === "BAGIC_PARTNER") {
      redirectUrl = "/EmployeesBP";
    } else if (USERDETAILS.userProfile === "BAGIC_TL") {
      redirectUrl = "/EmployeesTL";
    } else if (USERDETAILS.userProfile === "BAGIC_SM") {
      redirectUrl = "/EmployeesSM";
    } else if (USERDETAILS.userProfile === "BAGIC_ITS") {
      redirectUrl = "/EmployeesITS";
    }
    console.log("USERDETAILS.NAV.userProfile.redirectUrl", redirectUrl);

    const dataUser = [
      {
        title: "Employees",
        path: `${redirectUrl}`,
        icon: icon("ic_user"),
      },
    ];

    const dataAdmin = [
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: icon("ic_analytics"),
      },
    ];
    const dataSpoc = [
      {
        title: "Employees",
        path: `${redirectUrl}`,
        icon: icon("ic_user"),
      },
      {
        title: "Dashboard",
        path: "/Dashboard",
        icon: icon("ic_analytics"),
      },
      {
        title: "Reports",
        path: "/Reports",
        icon: icon("ic_cart"),
      },
    ];
    if (USERDETAILS.userProfile === "BAGIC_ADMIN") {
      setMenuList(dataAdmin);
    } else if (USERDETAILS.userProfile === "BAGIC_ITS") {
      setMenuList(dataSpoc);
    } else {
      setMenuList(dataUser);
    }
  }, []);

  return (
    <Box>
      <List disablePadding sx={{ p: 2 }}>
        {menuList.map((item) => (
          <StyledNavItem
            key={item.title}
            component={RouterLink}
            to={item.path}
            sx={{
              "&.active": {
                color: "#004A98",
                bgcolor: "#ddd",
                fontWeight: "fontWeightBold",
              },
              "&": {
                color: "text.secondary",
                bgcolor: "#f4f4f4",
                fontWeight: "fontWeightBold",
              },
            }}
          >
            <StyledNavItemIcon>{item.icon && item.icon}</StyledNavItemIcon>
            <ListItemText disableTypography primary={item.title} />
          </StyledNavItem>
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------
