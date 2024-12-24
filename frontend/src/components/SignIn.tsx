import { useState, ChangeEvent, FormEvent } from "react";
import fetch from "../fetch";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

export const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const response = await fetch.post("auth/signin", {
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("user-token", response.data.access_token);
        navigate("/favorites", { replace: true });
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-96"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          type="submit"
        >
          Sign In
        </button>
        <button
          className="w-full bg-white-500 text-blue-500 py-2 rounded mt-3"
          onClick={() => navigate("/auth/signup", { replace: true })}
        >
          Sign Up
        </button>
        {error && (
          <p className="w-full text-red-500 text-center mt-3">{error}</p>
        )}
      </form>
    </div>
  );
};

export default SignIn;
