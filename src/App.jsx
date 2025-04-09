import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Layout from "@/components/Layout";
import Overview from "@/pages/Overview";
import Projects from "@/pages/Projects";
import NewProject from "@/pages/NewProject";
import ProjectDetails from "@/pages/ProjectDetails";
import LoginPage from "@/pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SignedOut>
            <LoginPage />
          </SignedOut>
        }
      />
      <Route
        element={
          <SignedIn>
            <Layout />
          </SignedIn>
        }
      >
        <Route path="/home" element={<Overview />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
