import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import SuccessModal from "../../components/globalModals/SuccessModal";
import { login } from "../../redux/slices/auth/thunks/login";
import { useNavigate } from "react-router-dom";

interface InitialState {
  email: string,
  password: string
}

const initialState: InitialState = {
  email: "",
  password: ""
};

export default function LoginPage() {
  const loading = useAppSelector((state) => state.auth.loading);
  const token = useAppSelector((state) => state.auth.token);
  const errors = useAppSelector((state) => state.auth.errors);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<InitialState>(initialState);

  useEffect(() => {
    if (token != undefined) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    document.title = 'Giriş Formu';
  }, []);

  return (
    <>
      <SuccessModal />
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Hesabınızda oturum açın</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-Posta
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {
                  errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("email") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.email[0]}</p> : null
                }
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
                {
                  errors != null && Object.keys(errors).includes("errors") && Object.keys(errors.errors).includes("password") ? <p id="helper-text-explanation" className="mt-2 text-xs text-red-500">{errors.errors.password[0]}</p> : null
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={() => dispatch(login(form))}
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {loading ? "Yükleniyor..." : "Oturum Aç"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
