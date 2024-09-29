'use client';

import { useEffect, useState } from 'react';

// Định nghĩa kiểu cho Request
interface Request {
  id: number;
  title: string;
  status: string;
}

const SubmitRequest = () => {
  const [requests, setRequests] = useState<Request[]>([]); // Sử dụng kiểu mảng Request
  const [newRequest, setNewRequest] = useState<{ title: string; status: string }>({ title: '', status: '' }); // State cho yêu cầu mới

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch('http://localhost:3001/requests');
        const data: Request[] = await response.json(); // Gán kiểu Request[] cho dữ liệu
        setRequests(data);
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    }

    fetchRequests();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn reload trang

    try {
      const response = await fetch('http://localhost:3001/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newRequest.title, status: newRequest.status }),
      });

      if (response.ok) {
        const savedRequest = await response.json();
        setRequests((prevRequests) => [...prevRequests, savedRequest]); // Cập nhật danh sách yêu cầu
        setNewRequest({ title: '', status: '' }); // Reset form
      } else {
        console.error("Có lỗi xảy ra khi gửi yêu cầu");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu:", error);
    }
  };

  if (requests.length === 0) {
    return <p>No requests found.</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gửi yêu cầu</h1>
      
      {/* Form để gửi yêu cầu mới */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="Tiêu đề"
          value={newRequest.title}
          onChange={handleChange}
          placeholder="Nhập tiêu đề yêu cầu"
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="Trạng thái"
          value={newRequest.status}
          onChange={handleChange}
          placeholder="Nhập trạng thái yêu cầu"
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Gửi yêu cầu</button>
      </form>

      {/* Danh sách yêu cầu đã gửi */}
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="border p-2 mb-2">
            <h2 className="text-xl">{request.title}</h2>
            <p>Status: {request.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubmitRequest;
