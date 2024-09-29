// src/app/admin/Payroll.tsx
import React, { useEffect, useState } from 'react';
import { Payroll as PayrollType } from './page'; // Đảm bảo đường dẫn chính xác

const Payroll: React.FC = () => {
  const [payrolls, setPayrolls] = useState<PayrollType[]>([]);

  useEffect(() => {
    const fetchPayrolls = async () => {
      const response = await fetch('http://localhost:3001/payrolls'); // Địa chỉ API tương ứng
      const data: PayrollType[] = await response.json();
      setPayrolls(data);
    };

    fetchPayrolls();
  }, []);

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300">ID Nhân Viên</th>
          <th className="border border-gray-300">Tên Nhân Viên</th>
          <th className="border border-gray-300">Lương</th>
        </tr>
      </thead>
      <tbody>
        {payrolls.map(payroll => (
          <tr key={payroll.employeeId}>
            <td className="border border-gray-300">{payroll.employeeId}</td>
            <td className="border border-gray-300">{payroll.employeeName}</td>
            <td className="border border-gray-300">{payroll.salary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Payroll;
