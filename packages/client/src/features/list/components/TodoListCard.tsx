import { Box, Card, IconButton, Typography } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import { formatToJapaneseDate, getDateDifferenceInDays } from "../../../utils/dateUtil";
import { Todo, trpc } from "../../../utils/trpc";
import toast from "react-hot-toast";

type Props = {
  todo: Todo;
};

const TodoListCard: React.FC<Props> = (props: Props) => {
  const { todo } = props;

  const getCardBackgroundColor = () => {
    if (todo.completed) {
      return "bg-green-300";
    }

    const dueDate = new Date(todo.dueDate);

    const diffDays = getDateDifferenceInDays(dueDate);

    if (diffDays < 0) {
      return "bg-red-300";
    } else if (diffDays <= 7) {
      return "bg-yellow-300";
    } else {
      return "bg-green-300";
    }
  };

  const updateMutation = trpc.todo.updateCompletedStatus.useMutation();

  const trpcUtils = trpc.useUtils();

  const handleCheckBoxClick = () => {
    updateMutation.mutate(
      {
        id: todo.id,
        completed: !todo.completed,
      },
      {
        onSuccess: () => {
          toast.success("変更しました！");
          trpcUtils.todo.getTodosOrderByDueDateAsc.invalidate();
        },
      },
    );
  };

  return (
    <Card className={`shadow-lg border-2 my-4 bg-opacity-10 ${getCardBackgroundColor()}`}>
      <Box className="flex">
        <Box className="flex items-center mx-3">
          {todo.completed ? (
            <IconButton className="text-blue-600" onClick={handleCheckBoxClick}>
              <CheckBoxIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleCheckBoxClick}>
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          )}
        </Box>
        <Box className="flex flex-col grow">
          <Box className="my-4">
            <Typography variant="h5" className="font-bold">
              {todo.title}
            </Typography>
          </Box>
          <Box>{todo.description}</Box>
          <Box className="flex items-end my-2">
            <Box className="grow flex items-center">
              <AlarmIcon className="text-gray-500 mr-1" fontSize="small" />
              <span className="text-gray-500">{formatToJapaneseDate(new Date(todo.dueDate))}</span>
            </Box>
            <IconButton className="pb-0 text-blue-600">
              <UpdateIcon fontSize="large" />
            </IconButton>
            <IconButton className="pb-0 text-red-600">
              <DeleteIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default TodoListCard;
