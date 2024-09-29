'use client';

import Link from 'next/link';

const UserDashboard = () => {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Trang cá nhân</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Link to Profile Page */}
        <div className="border p-4 shadow-lg">
          <h2 className="text-xl font-semibold">Hồ sơ</h2>
          <p className="mb-4">Xem và chỉnh sửa thông tin hồ sơ của bạn.</p>
          <Link href="/user/profile" className="text-blue-500 hover:underline">
          Đi đến Hồ sơ
          </Link>
        </div>

        {/* Link to Submit Request Page */}
        <div className="border p-4 shadow-lg">
          <h2 className="text-xl font-semibold">Gửi yêu cầu</h2>
          <p className="mb-4">Nộp đơn xin nghỉ phép hoặc yêu cầu liên quan đến công việc.</p>
          <Link href="/user/submit-request" className="text-blue-500 hover:underline">
          Gửi yêu cầu
          </Link>
        </div>

        {/* Link to Track Information Page */}
        <div className="border p-4 shadow-lg">
          <h2 className="text-xl font-semibold">Theo dõi thông tin</h2>
          <p className="mb-4">Theo dõi thông tin cá nhân và trạng thái của bạn.</p>
          <Link href="/user/track-information" className="text-blue-500 hover:underline">
          Thông tin theo dõi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
