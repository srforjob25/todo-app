import { useNavigate, useParams } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";
import { Backdrop, Box, Button, CircularProgress, FormHelperText, TextField } from "@mui/material";
import { useSetAtom } from "jotai";
import { headerTitleAtom } from "../../utils/jotai";
import { useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type Params = {
  id: string;
};

const TodoUpdatePage: React.FC = () => {
  const navigate = useNavigate();

  const params = useParams<Params>();
  const targetId = Number(params.id);

  const setHeaderTitle = useSetAtom(headerTitleAtom);
  setHeaderTitle("ToDo更新");

  const response = trpc.todo.getTodoById.useQuery({ id: targetId });

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const dueDateRef = useRef<HTMLInputElement>(null);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const [dueDateError, setDueDateError] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

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

  const updateTodoMutation = trpc.todo.update.useMutation();
  const trpcUtils = trpc.useUtils();

  const handleUpdateButtonClick = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;

    const dueDateString = dueDateRef.current?.value;

    if (!checkFormInputState(title, description, dueDateString)) {
      return;
    }

    const dueDate = new Date(dueDateString!);

    updateTodo(title!, description!, dueDate);
  };

  const updateTodo = (title: string, description: string, dueDate: Date) => {
    setLoading(true);

    updateTodoMutation.mutate(
      {
        id: targetId,
        title: title,
        description: description,
        dueDate: dueDate,
      },
      {
        onSuccess: () => {
          trpcUtils.todo.getTodoById.invalidate();
          setLoading(false);
          toast.success("更新しました！");
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

  if (response.isLoading) {
    return <></>;
  }

  if (response.isError || !response.data) {
    toast.error("エラーが発生しました");
    return <></>;
  }

  const targetTodo = response.data;

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
          defaultValue={targetTodo.title}
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
          defaultValue={targetTodo.description}
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
          defaultValue={dayjs(targetTodo.dueDate.toDateString())}
          inputRef={dueDateRef}
          onChange={handleDueDateInputChange}
        />
        {dueDateError && (
          <FormHelperText className="text-red-600 mt-2 pl-3">"yyyy/MM/dd"の形式で入力してください</FormHelperText>
        )}
      </Box>
      <Box className="flex justify-center my-5">
        <Button variant="contained" className="shadow-md" onClick={handleUpdateButtonClick}>
          更新
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

export default TodoUpdatePage;
