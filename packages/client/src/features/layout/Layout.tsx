import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import { Toaster } from "react-hot-toast";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <Menu />
      <Box className="m-4 flex flex-col justify-center">
        <Outlet />
      </Box>
      <Toaster />
    </>
  );
};

export default Layout;
