import Button from '@/components/partials/buttons/Button';
import TextInput from '@/components/partials/inputs/TextInput';
import { HiPhone } from 'react-icons/hi';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { forgotPassword } from '@/redux/features/auth/auth.thunk';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { webAuthPaths } from '@/constants/path';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
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
      await dispatch(forgotPassword(credentials.username)).unwrap();
      toast.success(
        'Check your email or phone number for verification code to reset your password',
      );
      setCredentials({
        username: '',
      });
      navigate(webAuthPaths.resetPassword, {
        state: { username: credentials.username },
      });
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

      <Button
        type="submit"
        label="SUBMIT"
        disabled={loading || !credentials.username}
        className="mt-8 w-full disabled:bg-opacity-60 disabled:cursor-not-allowed"
      />
    </form>
  );
};

export default ForgotPasswordPage;
