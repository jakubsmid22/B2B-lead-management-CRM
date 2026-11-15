import axios from "axios";
import { useEffect, useState, type SubmitEventHandler } from "react";
import { replace, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import api, { type ApiAuthErrorResponse } from "~/api/api";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("token") && navigate("/leads", { replace: true });
  }, []);

  const handleLogin: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post<{ token: string }>("/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/leads", { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiAuthErrorResponse>(error)) {
        if (error.response?.status === 401) {
          toast.error(error.response.data?.error);
        } else {
          toast.error("Chyba serveru, zkus to prosím později.");
        }
      } else {
        toast.error("Neočekávaná chyba aplikace.");
      }
    }
  };

  return (
    <main className="bg-app-bg text-primary-text flex h-screen w-screen items-center justify-center">
      <ToastContainer position="top-center" />
      <div className="bg-surface w-full max-w-125 space-y-5 rounded-md p-5">
        <h1 className="text-center text-xl md:text-2xl xl:text-3xl">LOGIN</h1>
        <form onSubmit={handleLogin} className="space-y-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="cursor-pointer">
              Přihlašovací jméno
            </label>
            <input
              type="text"
              id="username"
              placeholder="Přihlašovací jméno"
              className="border-borders cursor-pointer rounded-md border-2 p-2"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="cursor-pointer">
              Heslo
            </label>
            <input
              type="password"
              id="password"
              placeholder="Heslo"
              className="border-borders cursor-pointer rounded-md border-2 p-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <input
            type="submit"
            value="PŘIHLÁSIT"
            className="bg-primary-button mt-5 w-full cursor-pointer rounded-md py-3 text-white"
          />
        </form>
      </div>
    </main>
  );
};

export default Login;
