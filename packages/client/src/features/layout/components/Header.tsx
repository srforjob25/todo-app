import { useAtomValue, useSetAtom } from "jotai";
import { headerTitleAtom, isMenuOpenAtom } from "../../../utils/jotai";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const headerTitle = useAtomValue(headerTitleAtom);

  const setIsMenuOpen = useSetAtom(isMenuOpenAtom);

  const handleMenuButtonClick = () => {
    setIsMenuOpen(true);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" className="grow">
            {headerTitle}
          </Typography>
          <IconButton size="large" color="inherit" onClick={handleMenuButtonClick}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
