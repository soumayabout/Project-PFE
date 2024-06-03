import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import HomePage from "../pages/HomePage";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/LoginPage";
import StoreSpecialty from "../pages/StoreSpecialty";
import {
  action as specialtyAction,
  loader as specialtyLoader,
} from "../components/specialty/SpecialtyForm";
import UpdateSpecialty from "../pages/UpdateSpecialty";
import ListSpecialty, {
  loader as specialtiesLoader,
} from "../pages/ListSpecialty";
import { action as registerUserAction } from "../components/auth/RegisterForm";
import StoreUser from "../pages/StoreUser";
import ListUsers, { loader as usersLoader } from "../pages/ListUsers";
import { action as loginAction } from "../components/auth/LoginForm";
import Profile, { loader as userLoader } from "../components/profile/Profile";
import StoreProject from "../pages/StoreProject";
import {
  action as projectAction,
  loader as projectLoader,
} from "../components/project/ProjectForm";
import ProjectsList, { projectsLoader } from "../pages/ProjectsList";
import UpdateProject from "../pages/UpdateProject";
import ProjectDetailsPage from "../pages/ProjectDetailsPage";
import { userProjectLoader } from "../components/project/ProjectDetails";
import { checkUserType } from "../utils/auth";
import ListProjectChoosedPage from "../pages/ListProjectChoosedPage";
import { projectChoosedLoader } from "../components/project/ProjectChoosed";
import AdminDashboard from "../components/dashoradAdmin/AdminDashboard";
import TeacherDashboard from "../components/dashoradAdmin/TeacherDashboard";
import StudentDashboard from "../components/dashoradAdmin/StudentDashboard";

const userType = checkUserType();

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage />, action: loginAction },
      
    ],
  },
  userType === "admin" && {
    path: "/admin",
    loader: userLoader,
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <ListUsers />, loader: usersLoader },
      { path: "users/new", element: <StoreUser />, action: registerUserAction },
      { path: "specialties", element: <ListSpecialty />, loader: specialtiesLoader },
      { path: "specialties/new", element: <StoreSpecialty />, action: specialtyAction },
      {
        path: "specialties/:id/update",
        element: <UpdateSpecialty />,
        action: specialtyAction,
        loader: specialtyLoader,
      },
    ],
  },
  {
    path: "/user",
    element: <DashboardLayout />,
    children: [
      { path: "profile", element: <Profile />, loader: userLoader },
    ],
  },
  userType === "professeur" && {
    path: "/teacher",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <TeacherDashboard />, loader: projectsLoader },
      { path: "project/new", element: <StoreProject />, action: projectAction, loader: projectLoader },
      { path: "projects", element: <ProjectsList />, loader: projectsLoader },
      { path: "projects/:id/update", element: <UpdateProject />, action: projectAction, loader: projectLoader },
      { path: "choosed/projects", element: <ListProjectChoosedPage />, loader: projectChoosedLoader },
    ],
  },
  userType === "etudiant" && {
    path: "/student",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "choose/project", element: <ProjectsList />, loader: projectsLoader },
      { path: "/student/projects/:id/edit", element: <UpdateProject />, loader: projectLoader },
      { path: "project", element: <ProjectDetailsPage />, loader: userProjectLoader },
    ],
  },
]);

function AppRoutes() {
  return <RouterProvider router={router} />;
}

export default AppRoutes;
