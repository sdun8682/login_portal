import "./App.css";
import Layout from "./components/layout/Layout";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
