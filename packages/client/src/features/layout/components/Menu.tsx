import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { isMenuOpenAtom } from "../../../utils/jotai";
import { useAtom } from "jotai";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useNavigate } from "react-router-dom";

const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleListButtonClick = () => {
    closeMenu();
    navigate("/list");
  };

  return (
    <Drawer anchor="right" open={isMenuOpen} onClose={closeMenu}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleListButtonClick}>
            <ListItemIcon>
              <ChecklistIcon />
            </ListItemIcon>
            <ListItemText primary="ToDo一覧" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Menu;
