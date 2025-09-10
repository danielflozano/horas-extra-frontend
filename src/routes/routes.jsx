import { createBrowserRouter, Navigate } from "react-router-dom";
import { GenerateReport, HomePage, Login, Register, RegisterOvertime } from "../pages";
import { DashboardLayout } from "../layouts/DashboardLayout";


export const routes = createBrowserRouter([
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'generate-report',
        element: <GenerateReport />
      },
      {
        path: 'register-overtime',
        element: <RegisterOvertime />
      },
      {
        path: 'register',
        element: <Register />
      },
    ],
  },
  { path: '/', element: <Login /> },
  { path: '*', element: <Navigate to= '/' /> },
]);