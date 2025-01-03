import React from "react";
import { Link } from "react-router-dom";
import { UserMenuData } from "../../routes/UserMenuData";
import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import * as Icons from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon, PowerIcon } from "@heroicons/react/24/outline";
import { useMaterialTailwindController } from "../../context/index";
import Logout from "../../pages/auth/Logout";

export function Sidenav() {
  const [controller] = useMaterialTailwindController();
  const { sidenavType, openSidenav } = controller;

  const sidenavTypes = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const [open, setOpen] = React.useState(null);

  const handleOpen = (value) => {
    setOpen(open === value ? null : value);
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <List>
        {UserMenuData.map((menu, index) => {
          const Icon = Icons[menu.icon];

          return menu.subMenu ? (
            <Accordion
              key={menu.title}
              open={open === index}
              icon={
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem selected={open === index}>
                <AccordionHeader
                  onClick={() => handleOpen(index)}
                  className="p-3 flex items-center"
                >
                  <ListItemPrefix>
                    <Icon className="h-5 w-5 text-gray-700" />
                  </ListItemPrefix>
                  <Typography className="mr-auto text-gray-900 font-medium">
                    {menu.title}
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1 pl-8">
                <List>
                  {menu.subMenu.map((sub) => (
                    <ListItem key={sub.title} className="py-2">
                      <Link to={sub.path} className="flex items-center w-full">
                        <ListItemPrefix>
                          <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                        </ListItemPrefix>
                        <Typography className="text-gray-700">
                          {sub.title}
                        </Typography>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </AccordionBody>
            </Accordion>
          ) : (
            <ListItem key={menu.title} className="p-3">
              <Link to={menu.path} className="flex items-center w-full">
                <ListItemPrefix>
                  <Icon className="h-5 w-5 text-gray-700" />
                </ListItemPrefix>
                <Typography className="text-gray-900 font-medium">
                  {menu.title}
                </Typography>
              </Link>
            </ListItem>
          );
        })}

      
        <ListItem
            variant="text"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
            className="flex items-center gap-4 px-4 capitalize"
            fullWidth
          >
          <PowerIcon style={{ height: "20px", width: "20px" }} />
          <Typography
             color="inherit"
             className="font-medium capitalize"
          ><Logout />
          </Typography>
            
        </ListItem>
      </List>
      
    </aside>
  );
}

export default Sidenav;
