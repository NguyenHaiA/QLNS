// app/admin/page.tsx
'use client';

import { useState } from 'react';
import EmployeeList from './EmployeeList';
import LeaveRequests from './LeaveRequests';
import Payroll from './Payroll';


export interface Employee {
    id: number;
    name: string;
    position: string;
  }

  export interface LeaveRequest {
    id: number;
    employeeName: string;
    leaveDate: string;
    status: string;
  }
  export interface Payroll {
    employeeId: number;
    employeeName: string;
    salary: number;
  }
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="admin-container">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <button onClick={() => setActiveTab('employees')} className="text-lg">
              Dữ Liệu Nhân Viên
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('leaveRequests')} className="text-lg">
              Yêu Cầu Nghỉ Phép
            </button>
          </li>
          <li>
            <button onClick={() => setActiveTab('payroll')} className="text-lg">
              Bảng Lương
            </button>
          </li>
        </ul>
      </nav>

      <div className="tab-content">
        {activeTab === 'employees' && <EmployeeList />}
        {activeTab === 'leaveRequests' && <LeaveRequests />}
        {activeTab === 'payroll' && <Payroll />}
      </div>
    </div>
  );
};

export default AdminPage;
