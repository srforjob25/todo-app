import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../features/layout/Layout";
import TodoListPage from "../features/list/TodoListPage";
import TodoCreatePage from "../features/create/TodoCreatePage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/list" element={<TodoListPage />} />
          <Route path="/create" element={<TodoCreatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
