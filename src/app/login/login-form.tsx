'use client'; // Đảm bảo điều này ở đây để làm thành phần client

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});
type FormValues = z.infer<typeof formSchema>;

interface LoginFormProps {
  onRedirect: (role: string) => void; // Nhận props onRedirect
}

const LoginForm = ({ onRedirect }: LoginFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      const response = await fetch(`http://localhost:3001/users?username=${values.username}&password=${values.password}`);
      const data = await response.json();

      if (data.length > 0) {
        const user = data[0];
        console.log("Đăng nhập thành công:", user);

        // Gọi hàm onRedirect để chuyển hướng
        onRedirect(user.role);
      } else {
        console.error("Sai tên đăng nhập hoặc mật khẩu");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w[600px] flex-shrink-0">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tài Khoản</FormLabel>
              <FormControl>
                <Input placeholder="Nhập Tài Khoản" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Nhập Mật Khẩu" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Đăng Nhập</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
