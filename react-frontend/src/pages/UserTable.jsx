
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import Tables from "../pages/dashboard/tables";
import {
  DashboardNavbar,
  Configurator,
  Footer,
  Sidenav,
} from "../widgets/layout/index";
import {UserMenuData} from "../routes/UserMenuData";
import { useMaterialTailwindController, setOpenConfigurator } from "../context/index";

export function UserTable() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
       <Sidenav
              routes={UserMenuData}
              brandImg={
                sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
              }
            />
      
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Tables/>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}


export default UserTable;
