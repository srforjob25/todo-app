import { useSetAtom } from "jotai";
import { headerTitleAtom } from "../../utils/jotai";
import { Box, Button } from "@mui/material";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const setHeaderTitle = useSetAtom(headerTitleAtom);
  setHeaderTitle("Welcome!");

  const navigate = useNavigate();

  const handleMoveButtonClick = () => {
    navigate("/list");
  };

  return (
    <Box>
      <Box className="flex justify-center items-center mt-10">
        <Button variant="contained" onClick={handleMoveButtonClick}>
          ToDo一覧画面に移動
        </Button>
      </Box>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </Box>
  );
};

export default WelcomePage;
