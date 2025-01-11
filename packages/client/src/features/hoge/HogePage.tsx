import { Box } from "@mui/material";
import { trpc } from "../../utils/trpc";

const HogePage: React.FC = () => {
  const response = trpc.todo.getTodos.useQuery();

  const todos = response.data;
  return (
    <Box>
      <h1 className="text-4xl font-extrabold text-[#37BCF8]">hoge</h1>
      {todos?.map((todo) => {
        return <h1 className="text-4xl font-extrabold text-[#37BCF8]">{todo.title}</h1>;
      })}
    </Box>
  );
};

export default HogePage;
