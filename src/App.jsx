import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard  from './pages/AdminDashboard'
import EmployeeDashboard  from './pages/EmployeeDashboard'
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/dashboard/AdminSummary';
import DepartmentList from './components/Departments/DepartmentList';
import AddDepartment from './components/Departments/AddDepartment'
import EditDepartment from './components/Departments/EditDepartment';
import List from './components/employee/List';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import Summary from './components/EmployeeDashboard/Summary';
import LeavesList from './components/leaves/LeavesList';
import AddLeave from './components/leaves/AddLeave';
import Setting from './components/EmployeeDashboard/Setting';
import Table from './components/leaves/Table';
import Detail from './components/leaves/Detail';
import LeaveBalance from './components/leaves/LeaveBalance';
import LeaveCalender from './components/leaves/LeaveCalender';
import HolidayCalender from './components/leaves/HolidayCalender';
import LeaveBalanceDetail from './components/leaves/LeaveBalanceDetail'; // Import the Bar Chart page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard" />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin"]}>
              <AdminDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<AdminSummary />}></Route>
            <Route path="/admin-dashboard/departments" element={<DepartmentList />}></Route>
            <Route path="/admin-dashboard/add-departments" element={<AddDepartment />}></Route>
            <Route path="/admin-dashboard/department/:id" element={<EditDepartment />}></Route>

            <Route path="/admin-dashboard/employees" element={<List />}></Route>
            <Route path="/admin-dashboard/add-employee" element={<Add />}></Route>
            <Route path="/admin-dashboard/employees/:id" element={<View />}></Route>
            <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />}></Route>

            <Route path="/admin-dashboard/leaves" element={<Table />}></Route>
            <Route path="/admin-dashboard/leaves/:id" element={<Detail />}></Route>
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeavesList />}></Route> 
            
            <Route path="/admin-dashboard/employees/leaves/:id" element={<LeavesList />}></Route> 
            <Route path='/admin-dashboard/leavebalance' element={<LeaveBalance />}></Route>
            <Route path='/admin-dashboard/leaveCalender' element={<LeaveCalender />}></Route>
            <Route path='/admin-dashboard/holidayCalender' element={<HolidayCalender />}></Route>
            

            <Route path="/admin-dashboard/setting" element={<Setting />}></Route>
          </Route>


        <Route path='/employee-dashboard' element={
          <PrivateRoutes>
            <RoleBaseRoutes requiredRole={["admin", "employee"]}>
              <EmployeeDashboard />
            </RoleBaseRoutes>
          </PrivateRoutes>
          }>
            <Route index element={<Summary />}></Route>

            <Route path='/employee-dashboard/profile/:id' element={<View />}></Route>
            {/* leaves */}
            <Route path='/employee-dashboard/leaves/:id' element={<LeavesList />}></Route>
            <Route path='/employee-dashboard/add-leave' element={<AddLeave />}></Route>


            <Route path='/employee-dashboard/leavebalance' element={<LeaveBalance />}></Route>
            <Route path='/employee-dashboard/leavebalance/:leaveType/:year' element={<LeaveBalanceDetail />} />

            
            <Route path='/employee-dashboard/leaveCalender' element={<LeaveCalender />}></Route>
            <Route path='/employee-dashboard/holidayCalender' element={<HolidayCalender />}></Route>

    

     

          {/* /setting */}
          <Route path='/employee-dashboard/setting' element={<Setting />}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
