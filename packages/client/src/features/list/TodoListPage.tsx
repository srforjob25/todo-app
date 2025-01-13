import { Box, Skeleton, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TodoListCard from "./components/TodoListCard";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { headerTitleAtom } from "../../utils/jotai";
import { trpc } from "../../utils/trpc";
import toast from "react-hot-toast";

const enum TabType {
  INCOMPLETE = "incomplete",
  COMPLETED = "completed",
}

const TodoListPage: React.FC = () => {
  const setHeaderTitle = useSetAtom(headerTitleAtom);
  setHeaderTitle("ToDo一覧");

  const response = trpc.todo.getTodosOrderByDueDateAsc.useQuery();

  const [tabTypeValue, setTabTypeValue] = useState<TabType>(TabType.INCOMPLETE);

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabType) => {
    setTabTypeValue(newValue);
  };

  if (response.isError) {
    toast.error("エラーが発生しました");
    return <></>;
  }

  if (response.isLoading) {
    return (
      <Box className="w-full mt-8">
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

  return (
    <Box>
      <TabContext value={tabTypeValue}>
        <TabList onChange={handleTabChange}>
          <Tab label="未完了" value={TabType.INCOMPLETE} />
          <Tab label="完了済み" value={TabType.COMPLETED} />
        </TabList>
        <TabPanel value={TabType.INCOMPLETE}>
          <Box>
            {response.data
              .filter((todo) => !todo.completed)
              .map((todo) => {
                return <TodoListCard todo={todo} />;
              })}
          </Box>
        </TabPanel>
        <TabPanel value={TabType.COMPLETED}>
          <Box>
            {response.data
              .filter((todo) => todo.completed)
              .map((todo) => {
                return <TodoListCard todo={todo} />;
              })}
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TodoListPage;
