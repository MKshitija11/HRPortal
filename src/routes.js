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
import HandleApi from './components/CustomComponent/HandleApi';

import Reports from './pages/Reports';
import PendingEmployeeListTL from './pages/PendingEmployeeListTL';
import PendingEmployeeListSM from './pages/PendingEmployeeListSM';
import PendingEmployeeListITS from './pages/PendingEmployeeListITS';
import PendingEmployeeListBP from './pages/PendingEmployeeListBP';
import RejectedEmployeeListBP from './pages/RejectedEmployeeListBP';
import ResignedEmployeeListBP from './pages/ResignedEmployeeListBP';

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
        { path: 'PendingEmployeesBP', element: <PendingEmployeeListBP /> },
        { path: 'RejectedEmployeesBP', element: <RejectedEmployeeListBP /> },
        { path: 'ResignedEmployeesBP', element: <ResignedEmployeeListBP /> },
        { path: 'EmployeesTL', element: <EmployeeListTL /> },
        { path: 'EmployeesListTL', element: <PendingEmployeeListTL /> },
        { path: 'EmployeesSM', element: <EmployeeListSM /> },
        { path: 'EmployeesListSM', element: <PendingEmployeeListSM /> },
        { path: 'EmployeesITS', element: <EmployeeListITS /> },
        { path: 'PendingEmployeesITS', element: <PendingEmployeeListITS /> },
        { path: 'NewEmployee', element: <NewEmployee /> },
        { path: 'ViewEmployeeBP', element: <ViewEmployeeBP /> },
        { path: 'ViewEmployeeTL', element: <ViewEmployeeTL /> },
        { path: 'ViewEmployeeSM', element: <ViewEmployeeSM /> },
        { path: 'ViewEmployeeITS', element: <ViewEmployeeITS /> },
        
        { path: 'Loader', element: <Loader /> },
        { path: 'HandleApi', element: <HandleApi /> },
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
      path: 'PendingEmployeesBP',
      element: <PendingEmployeeListBP />,
    },
    {
      path: 'RejectedEmployeesBP',
      element: <RejectedEmployeeListBP />,
    },
    {
      path: 'ResigedEmployeesBP',
      element: <ResignedEmployeeListBP />,
    },
    {
      path: 'EmployeesTL',
      element: <EmployeeListTL />,
    },
    {
      path: 'EmployeesListTL',
      element: <PendingEmployeeListTL />,
    },
    {
      path: 'EmployeesSM',
      element: <EmployeeListSM />,
    },
    {
      path: 'EmployeesListSM',
      element: <PendingEmployeeListSM />,
    },
    {
      path: 'EmployeesITS',
      element: <EmployeeListITS />,
    },
    {
      path: 'PendingEmployeesITS',
      element: <PendingEmployeeListITS />,
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
