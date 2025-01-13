import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { isMenuOpenAtom } from "../../../utils/jotai";
import { useAtom } from "jotai";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleButtonClick = () => {
    closeMenu();
    navigate("/hoge");
  };

  return (
    <Drawer anchor="right" open={isMenuOpen} onClose={closeMenu}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleButtonClick}>
            <ListItemIcon>
              <TipsAndUpdatesIcon />
            </ListItemIcon>
            <ListItemText primary="メニュー項目" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;
