import Button from '@/components/partials/buttons/Button';
import TextInput from '@/components/partials/inputs/TextInput';
import { HiCheckCircle } from 'react-icons/hi';
import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { verifyUser } from '@/redux/features/auth/auth.thunk';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const VerifyAccountPage = () => {
  const location = useLocation();
  const { username } = location.state as { username: string };
  const [credentials, setCredentials] = useState({
    verification_code: '',
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
      const user = await dispatch(
        verifyUser({ ...credentials, username }),
      ).unwrap();
      toast.success('Account verification successful');
      setCredentials({
        verification_code: '',
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
        leftIcon={<HiCheckCircle size={16} />}
        placeholder="Enter verification code"
        name="verification_code"
        value={credentials.verification_code}
        onChange={onChange}
      />

      <Button
        type="submit"
        label="SUBMIT"
        disabled={
          loading || !credentials.verification_code || !username
        }
        className="mt-8 w-full disabled:bg-opacity-60 disabled:cursor-not-allowed"
      />
    </form>
  );
};

export default VerifyAccountPage;
