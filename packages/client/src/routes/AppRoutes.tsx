import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../features/layout/Layout";
import HogePage from "../features/hoge/HogePage";
import FugaPage from "../features/fuga/FugaPage";
import TodoListPage from "../features/list/TodoListPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/hoge" element={<HogePage />} />
          <Route path="/fuga" element={<FugaPage />} />
          <Route path="/list" element={<TodoListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
