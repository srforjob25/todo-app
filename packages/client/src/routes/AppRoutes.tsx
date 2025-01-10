import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../features/layout/Layout";
import HogePage from "../features/hoge/HogePage";
import FugaPage from "../features/fuga/FugaPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/hoge" element={<HogePage />} />
          <Route path="/fuga" element={<FugaPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
