import { Box, Button } from "@mui/material";
import { trpc } from "../../utils/trpc";
import { countAtom, headerTitleAtom } from "../../utils/jotai";
import { useAtom, useSetAtom } from "jotai";

const HogePage: React.FC = () => {
  const response = trpc.todo.getTodos.useQuery();

  const todos = response.data;

  const [count, setCount] = useAtom(countAtom);

  const setHeaderTitle = useSetAtom(headerTitleAtom);
  setHeaderTitle("ToDo一覧");

  return (
    <Box>
      <h1 className="text-4xl font-extrabold text-[#37BCF8]">hoge</h1>
      {todos?.map((todo) => {
        return <h1 className="text-4xl font-extrabold text-[#37BCF8]">{todo.title}</h1>;
      })}
      <h1 className="text-4xl font-extrabold text-[#37BCF8]">{count}</h1>
      <Button className="my-3" variant="contained" onClick={() => setCount((prev) => prev + 1)}>
        +
      </Button>
      <Button className="my-3" variant="contained" onClick={() => setCount((prev) => prev - 1)}>
        -
      </Button>
    </Box>
  );
};

export default HogePage;
