import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../features/layout/Layout";
import TodoListPage from "../features/list/TodoListPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/list" element={<TodoListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
