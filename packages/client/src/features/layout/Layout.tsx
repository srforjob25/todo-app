import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <Box className="m-2">
      <Outlet />
    </Box>
  );
};

export default Layout;
