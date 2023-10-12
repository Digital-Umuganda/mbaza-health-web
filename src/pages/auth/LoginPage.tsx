import Button from '@/components/partials/buttons/Button';
import TextInput from '@/components/partials/inputs/TextInput';
import { HiPhone, HiKey, HiExclamation } from 'react-icons/hi';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { login } from '@/redux/features/auth/auth.thunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { webAuthPaths } from '@/constants/path';
import { Toast } from 'flowbite-react';

const LoginPage = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const { loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError('');
    try {
      const user = await dispatch(login(credentials)).unwrap();
      toast.success('Login successful');
      setCredentials({
        username: '',
        password: '',
      });

      window.location.href = `${user.role
        .toLocaleLowerCase()
        .replace(/_/g, '-')}/home`;
    } catch (error) {
      const err = error as Error;
      if (err.message?.toLowerCase()?.includes('verify your')) {
        navigate(webAuthPaths.sendTwoFactorCode, {
          state: { username: credentials.username },
        });
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
      {error.length > 0 && (
        <Toast className={`mt-4 bg-red-500 text-white`}>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
            <HiExclamation className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">{error}</div>
          <Toast.Toggle onDismiss={() => setError('')} />
        </Toast>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col mt-10">
        <TextInput
          leftIcon={<HiPhone size={16} />}
          placeholder="Email or Phone Number"
          name="username"
          value={credentials.username}
          onChange={onChange}
        />

        <TextInput
          leftIcon={<HiKey size={16} />}
          className="mt-4"
          placeholder="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />

        <Button
          type="submit"
          label="Login"
          disabled={
            loading || !credentials.username || !credentials.password
          }
          className="mt-8 w-full disabled:bg-opacity-60 disabled:cursor-not-allowed"
        />
      </form>
    </>
  );
};

export default LoginPage;
