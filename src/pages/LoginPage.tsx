import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { login } from '@/lib/api/auth';
import { LoginResponse } from "@/lib/types/auth";

interface GoogleCredentialResponse {
  email: string;
  name: string;
  picture: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");;
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(undefined);
    try {
      // Call mock login API (use email as username)
      const res = await login({ username, password });
      const decodedToken = jwtDecode<any>(res.token);
      localStorage.setItem('authToken', res.token);
      localStorage.setItem('email', decodedToken.email);
      localStorage.setItem('role', decodedToken.role);
      localStorage.setItem('name', decodedToken.name);
      navigate('/home');
    } catch (error: any) {
      setErrorMsg(error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-[425px]:max-w-[222px] max-w-[313px]">
        <div className="space-y-8 p-8">
          <div className="space-y-6 w-full ">
            <h2 className="text-xl font-medium">เข้าสู่ระบบ</h2>
            <div className="flex justify-start py-2 w-full">
              <form onSubmit={handleLogin} className="space-y-4 w-full">
                <div>
                  <Label htmlFor="email">บัญชีพนักงาน</Label>
                  <Input
                    id="username"
                    className="mt-3 rounded-[12px]"
                    type="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" >รหัสผ่าน</Label>
                  <Input
                    id="password"
                    type="password"
                    className="mt-3 rounded-[12px]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'กำลังเข้าสู่ระบบ...' : 'ค้นหา'}
                </Button>
              </form>
            </div>
          </div>

          {errorMsg && (
            <Alert variant="destructive" className="mt-6 p-4">
              <AlertTitle className="text-base">เข้าสู่ระบบไม่สำเร็จ</AlertTitle>
              <AlertDescription className="mt-1">
                {errorMsg || "การเข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
} 