import Button from '@/components/partials/buttons/Button';
import TextInput from '@/components/partials/inputs/TextInput';
import { HiPhone, HiKey } from 'react-icons/hi';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { login } from '@/redux/features/auth/auth.thunk';
import { toast } from 'react-toastify';

const LoginPage = () => {
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
      toast.error(err.message);
    }
  };
  return (
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
  );
};

export default LoginPage;
