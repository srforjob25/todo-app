import { useSetAtom } from "jotai";
import { headerTitleAtom } from "../../utils/jotai";
import { Backdrop, Box, Button, CircularProgress, FormHelperText, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TodoCreatePage: React.FC = () => {
  const navigate = useNavigate();

  const setHeaderTitle = useSetAtom(headerTitleAtom);
  setHeaderTitle("ToDo新規作成");

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [dueDateError, setDueDateError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const createTodoMutation = trpc.todo.create.useMutation();

  const handleTitleInputChange = () => {
    if (titleError && titleRef.current?.value) {
      setTitleError(false);
    }
  };

  const handleDescriptionInputChange = () => {
    if (descriptionError && descriptionRef.current?.value) {
      setDescriptionError(false);
    }
  };

  const handleDueDateInputChange = () => {
    if (dueDateError && dueDateRef.current?.value) {
      setDueDateError(false);
    }
  };

  const handleCreateButtonClick = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    const dueDateString = dueDateRef.current?.value;

    if (!checkFormInputState(title, description, dueDateString)) {
      return;
    }

    const dueDate = new Date(dueDateString!);

    createTodo(title!, description!, dueDate);
  };

  const createTodo = (title: string, description: string, dueDate: Date) => {
    setLoading(true);

    createTodoMutation.mutate(
      {
        title: title,
        description: description,
        dueDate: dueDate,
      },
      {
        onSuccess: () => {
          setLoading(false);
          toast.success("作成しました！");
          navigate("/list");
        },
      },
    );
  };

  const checkFormInputState = (
    title: undefined | string,
    description: undefined | string,
    dueDateString: undefined | string,
  ) => {
    let result = true;

    if (!title) {
      setTitleError(true);
      result = false;
    }

    if (!description) {
      setDescriptionError(true);
      result = false;
    }

    if (!dueDateString || isNaN(Date.parse(dueDateString))) {
      setDueDateError(true);
      result = false;
    }

    return result;
  };

  return (
    <Box className="w-8/12 flex flex-col mx-auto">
      <Box className="mt-8 mb-5 flex flex-col justify-center">
        <TextField
          label="タイトル"
          variant="outlined"
          className="shadow-md"
          inputRef={titleRef}
          error={titleError}
          onChange={handleTitleInputChange}
          autoComplete="off"
        />
        {titleError && <FormHelperText className="text-red-600 mt-2 pl-3">入力してください</FormHelperText>}
      </Box>
      <Box className="my-5 flex flex-col justify-center">
        <TextField
          label="説明"
          variant="outlined"
          className="shadow-md"
          multiline
          rows={3}
          inputRef={descriptionRef}
          error={descriptionError}
          onChange={handleDescriptionInputChange}
        />
        {descriptionError && <FormHelperText className="text-red-600 mt-2 pl-3">入力してください</FormHelperText>}
      </Box>
      <Box className="my-5 flex flex-col justify-center">
        <DatePicker
          label="締切日"
          className="shadow-md"
          format="YYYY/MM/DD"
          slotProps={{
            calendarHeader: { format: "YYYY年MM月" },
            textField: {
              error: dueDateError,
            },
          }}
          defaultValue={dayjs()}
          inputRef={dueDateRef}
          onChange={handleDueDateInputChange}
        />
        {dueDateError && (
          <FormHelperText className="text-red-600 mt-2 pl-3">"yyyy/MM/dd"の形式で入力してください</FormHelperText>
        )}
      </Box>
      <Box className="flex justify-center my-5">
        <Button variant="contained" className="shadow-md" onClick={handleCreateButtonClick}>
          作成
        </Button>
      </Box>
      <Box>
        <Backdrop sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    </Box>
  );
};

export default TodoCreatePage;
