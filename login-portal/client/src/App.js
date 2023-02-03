import "./App.css";
import Layout from "./components/layout/Layout";

import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import AuthPage from "./pages/AuthPage";

import { Route, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" exact element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
