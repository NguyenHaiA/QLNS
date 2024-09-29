'use client';
import './layout.css';
import { useEffect, useState } from 'react';


// Định nghĩa kiểu cho Profile
interface Profile {
  id: number; // Thêm ID nếu cần thiết để cập nhật
  name: string;
  email: string;
  position: string;
}

const UserProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null); // Sử dụng Profile hoặc null
  const [isEditing, setIsEditing] = useState(false); // Để kiểm soát chế độ chỉnh sửa
  const [formData, setFormData] = useState<Profile | null>(null); // Dữ liệu form

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('http://localhost:3001/profiles/1'); // Thay đổi ID nếu cần
        const data: Profile = await response.json(); // Gán kiểu Profile cho data
        setProfile(data);
        setFormData(data); // Khởi tạo dữ liệu form với thông tin profile
      } catch (error) {
        console.error("Có lỗi xảy ra khi lấy dữ liệu:", error);
      }
    }

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleSave = async () => {
    if (!formData) return;

    try {
      const response = await fetch(`http://localhost:3001/profiles/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false); // Đóng chế độ chỉnh sửa
      } else {
        console.error("Có lỗi xảy ra khi lưu dữ liệu");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi lưu dữ liệu:", error);
    }
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="profile-container text-center">
      <h1 className="text-2xl font-bold mb-4">Hồ sơ của bạn</h1>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="Họ Tên"
            value={formData?.name}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
            className="profile-input"
          />
          <input
            type="text"
            name="Vị trí"
            value={formData?.position}
            onChange={handleChange}
            className="profile-input"
          />
          <button onClick={handleSave} className="profile-button profile-button-primary">
            Lưu
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="profile-button profile-button-secondary ml-2"
          >
            Quay Lại
          </button>
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Position:</strong> {profile.position}</p>
          <button onClick={() => setIsEditing(true)} className="profile-button profile-button-primary mt-4">
            Chỉnh sửa
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
