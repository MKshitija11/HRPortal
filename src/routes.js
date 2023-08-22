import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//

import EmployeeListBP from './pages/EmployeeListBP';
import EmployeeListTL from './pages/EmployeeListTL';
import EmployeeListSM from './pages/EmployeeListSM';
import EmployeeListITS from './pages/EmployeeListITS';

import ViewEmployeeBP from './pages/ViewEmployeeBP';
import ViewEmployeeTL from './pages/ViewEmployeeTL';
import ViewEmployeeSM from './pages/ViewEmployeeSM';
import ViewEmployeeITS from './pages/ViewEmployeeITS';

import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Page401 from './pages/Page401';
import DashboardAppPage from './pages/DashboardAppPage';
import NewEmployee from './pages/NewEmployee';
import Loader from './components/Loader/Loader';

import Reports from './pages/Reports';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/Login" />, index: true },
        { path: 'Dashboard', element: <DashboardAppPage /> },
        { path: 'Reports', element: <Reports /> },
        { path: 'EmployeesBP', element: <EmployeeListBP /> },
        { path: 'EmployeesTL', element: <EmployeeListTL /> },
        { path: 'EmployeesSM', element: <EmployeeListSM /> },
        { path: 'EmployeesITS', element: <EmployeeListITS /> },
        { path: 'NewEmployee', element: <NewEmployee /> },
        { path: 'ViewEmployeeBP', element: <ViewEmployeeBP /> },
        { path: 'ViewEmployeeTL', element: <ViewEmployeeTL /> },
        { path: 'ViewEmployeeSM', element: <ViewEmployeeSM /> },
        { path: 'ViewEmployeeITS', element: <ViewEmployeeITS /> },
        { path: 'Loader', element: <Loader /> },
      ],
    },
    {
      path: 'Dashboard',
      element: <DashboardAppPage />,
    },
    {
      path: 'Reports',
      element: <Reports />,
    },
    {
      path: 'EmployeesBP',
      element: <EmployeeListBP />,
    },
    {
      path: 'EmployeesTL',
      element: <EmployeeListTL />,
    },
    {
      path: 'EmployeesSM',
      element: <EmployeeListSM />,
    },
    {
      path: 'EmployeesITS',
      element: <EmployeeListITS />,
    },
    { path: 'ViewEmployeeBP', element: <ViewEmployeeBP /> },
    { path: 'ViewEmployeeTL', element: <ViewEmployeeTL /> },
    { path: 'ViewEmployeeSM', element: <ViewEmployeeSM /> },
    { path: 'ViewEmployeeITS', element: <ViewEmployeeITS /> },
    {
      path: 'NewEmployee',
      element: <NewEmployee />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    // for simple layout element , there is no path specified bt has index attribute That specifies this route as the default route for the parent route, which is /.
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '401', element: <Page401 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
