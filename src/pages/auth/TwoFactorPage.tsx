import Button from '@/components/partials/buttons/Button';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { forgotPassword } from '@/redux/features/auth/auth.thunk';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { webAuthPaths } from '@/constants/path';

const TwoFactorPage = () => {
  const {
    state: { username },
  } = useLocation();
  const navigate = useNavigate();
  const { loading } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      await dispatch(forgotPassword(username)).unwrap();
      toast.success(
        'Check your email or phone number for verification code',
      );
      navigate(webAuthPaths.verifyTwoFactorCode, {
        state: { username: username },
      });
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-10">
      <Button
        type="submit"
        label="Send"
        disabled={loading || !username}
        className="mt-8 w-full disabled:bg-opacity-60 disabled:cursor-not-allowed"
      />
    </form>
  );
};

export default TwoFactorPage;
