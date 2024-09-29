'use client'; // Đảm bảo rằng dòng này nằm ở đầu file
import { useRouter } from 'next/navigation'; // Đảm bảo bạn sử dụng đúng import
import LoginForm from "@/app/login/login-form";

const LoginPage = () => {
  const router = useRouter(); // Khởi tạo router

  const handleRedirect = (role: string) => {
    if (role === 'admin') {
      router.push('/admin'); // Chuyển hướng đến trang admin
    } else if ( role === 'user'){
      router.push('/user'); // Chuyển hướng đến trang user
    }
  };

  return (
    <div className="text-xl font-semibold text-center">
      <h1>Đăng Nhập</h1>
      <div className="flex justify-center">
        <LoginForm onRedirect={handleRedirect} /> {/* Truyền hàm callback */}
      </div>
    </div>
  );
};

export default LoginPage;
