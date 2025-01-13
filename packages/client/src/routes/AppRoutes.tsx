import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../features/layout/Layout";
import TodoListPage from "../features/list/TodoListPage";
import TodoCreatePage from "../features/create/TodoCreatePage";
import TodoUpdatePage from "../features/update/TodoUpdatePage";
import WelcomePage from "../features/welcome/WelcomePage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/list" element={<TodoListPage />} />
          <Route path="/create" element={<TodoCreatePage />} />
          <Route path="/update/:id" element={<TodoUpdatePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
