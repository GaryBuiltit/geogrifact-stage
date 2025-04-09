import { Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, SignIn, SignUp } from "@clerk/clerk-react";
import Layout from "@/components/Layout";
import Overview from "@/pages/Overview";
import Projects from "@/pages/Projects";
import NewProject from "@/pages/NewProject";
import ProjectDetails from "@/pages/ProjectDetails";

function App() {
  return (
    <Routes>
      <Route
        path="/sign-in/*"
        element={
          <SignedOut>
            <SignIn
              routing="path"
              path="/sign-in"
              fallbackRedirectUrl="/home"
              signUpUrl="/sign-up"
            />
          </SignedOut>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <SignedOut>
            <SignUp
              routing="path"
              path="/sign-up"
              fallbackRedirectUrl="/sign-in"
              signInUrl="/sign-in"
            />
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
        <Route path="/projects/new" element={<NewProject />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
