 'use client';

import { Employee } from './page';
import { useEffect, useState } from 'react';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]); // List of employees
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null); // Employee to edit
  const [editFormVisible, setEditFormVisible] = useState<boolean>(false); // Toggle form visibility
  const [loading, setLoading] = useState<boolean>(false); // Loading state for data fetching
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Error message

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true); // Set loading before fetching data
    try {
      const response = await fetch('http://localhost:3001/employees');
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi tải dữ liệu');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error);
      setErrorMessage('Không thể tải danh sách nhân viên');
    } finally {
      setLoading(false); // Remove loading state after fetching
    }
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setEditFormVisible(true); // Show the edit form
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.id !== id)); // Remove from list
      } else {
        console.error('Có lỗi xảy ra khi xóa nhân viên');
        setErrorMessage('Không thể xóa nhân viên');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa nhân viên:', error);
      setErrorMessage('Không thể xóa nhân viên');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedEmployee) return;

    try {
      const response = await fetch(`http://localhost:3001/employees/${selectedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedEmployee),
      });

      if (response.ok) {
        const updatedEmployee = await response.json();
        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setSelectedEmployee(null); // Clear selected employee after update
        setEditFormVisible(false); // Hide the form after updating
      } else {
        console.error('Có lỗi xảy ra khi chỉnh sửa nhân viên');
        setErrorMessage('Không thể cập nhật thông tin nhân viên');
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi chỉnh sửa nhân viên:', error);
      setErrorMessage('Không thể cập nhật thông tin nhân viên');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedEmployee) {
      setSelectedEmployee({
        ...selectedEmployee,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold">Danh Sách Nhân Viên</h2>

      {loading && <p>Đang tải danh sách nhân viên...</p>}
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300">ID</th>
            <th className="border border-gray-300">Tên</th>
            <th className="border border-gray-300">Chức Vụ</th>
            <th className="border border-gray-300">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border border-gray-300">{employee.id}</td>
              <td className="border border-gray-300">{employee.name}</td>
              <td className="border border-gray-300">{employee.position}</td>
              <td className="border border-gray-300">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(employee)}
                >
                  Chỉnh Sửa
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(employee.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editFormVisible && selectedEmployee && (
        <form onSubmit={handleFormSubmit} className="mt-4 border p-4">
          <h3 className="text-lg font-semibold mb-2">Chỉnh Sửa Nhân Viên</h3>
          <label className="block mb-2">
            Tên:
            <input
              type="text"
              name="name"
              value={selectedEmployee.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <label className="block mb-2">
            Chức Vụ:
            <input
              type="text"
              name="position"
              value={selectedEmployee.position}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </label>
          <button type="submit" className="bg-blue-500 text-white p-2">
            Cập Nhật
          </button>
          <button
            type="button"
            className="bg-gray-300 p-2 ml-2"
            onClick={() => {
              setEditFormVisible(false);
              setSelectedEmployee(null); // Clear selected employee when form is closed
            }}
          >
            Hủy
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployeeList;
