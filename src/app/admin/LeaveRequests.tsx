// src/app/admin/LeaveRequests.tsx
import React, { useEffect, useState } from 'react';
import { LeaveRequest } from './page'; // Đảm bảo đường dẫn chính xác

const LeaveRequests: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      const response = await fetch('http://localhost:3001/leave-requests'); // Địa chỉ API tương ứng
      const data: LeaveRequest[] = await response.json();
      setLeaveRequests(data);
    };

    fetchLeaveRequests();
  }, []);

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300">ID</th>
          <th className="border border-gray-300">Tên Nhân Viên</th>
          <th className="border border-gray-300">Ngày Nghỉ</th>
          <th className="border border-gray-300">Trạng Thái</th>
          <th className="border border-gray-300">Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {leaveRequests.map(request => (
          <tr key={request.id}>
            <td className="border border-gray-300">{request.id}</td>
            <td className="border border-gray-300">{request.employeeName}</td>
            <td className="border border-gray-300">{request.leaveDate}</td>
            <td className="border border-gray-300">{request.status}</td>
            <td className="border border-gray-300">
              <button className="text-blue-500">Chấp Nhận</button>
              <button className="text-red-500">Từ Chối</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaveRequests;
