import SelectInput from '@/components/partials/inputs/SelectInput';
import TextInput from '@/components/partials/inputs/TextInput';
import { addresses } from '@/constants/address';
import { roleToString } from '@/helpers/isAuth';
import Secure from '@/helpers/secureLS';
import {
  changePassword,
  updateProfile,
} from '@/redux/features/auth/auth.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { ChangeEvent, useState } from 'react';
import {
  HiLockClosed,
  HiLockOpen,
  HiMail,
  HiOutlineLocationMarker,
  HiOutlineUser,
  HiOutlineUserCircle,
  HiPhone,
  HiUser,
} from 'react-icons/hi';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const user = Secure.getProfile();
  const [personalInfo, setPersonalInfo] = useState({
    name: user?.name || '',
    address: user?.address || '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
  });
  if (!user) {
    return <Navigate to="/login" replace={true} />;
  }

  const onChangePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswords(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePersonalInfo = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      await dispatch(updateProfile(personalInfo)).unwrap();
      toast.success('Profile updated successfully');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const handleUpdatePassword = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      await dispatch(changePassword(passwords)).unwrap();
      toast.success('Password updated successfully');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setPasswords({
        oldPassword: '',
        newPassword: '',
      });
    }
  };
  return (
    <>
      <div className="w-full py-4 px-8 bg-white rounded-2xl border flex items-center space-x-3">
        <HiUser size={24} className="text-amber-400" />
        <p className="text-slate-600 text-2xl font-medium">
          My Account
        </p>
      </div>

      <div className="mt-4 mx-auto flex flex-col items-center justify-center p-8 w-full max-w-4xl min-h-72 bg-white rounded-2xl border">
        <div className="p-4 bg-slate-600 bg-opacity-10 rounded-full border">
          <HiOutlineUser size={24} className="text-slate-600" />
        </div>
        <h1 className="mt-3 text-center text-slate-600 text-2xl font-light font-['Inter']">
          {user.name}
        </h1>
        <p className="mt-3 text-center text-green-500 font-bold font-['Inter'] uppercase">
          {roleToString(user.role)}
        </p>
      </div>

      <div className="mt-4 mx-auto flex flex-col items-center justify-center p-8 w-full max-w-4xl min-h-72 bg-white rounded-2xl border">
        <div className="text-slate-600 text-base font-medium font-['Inter'] w-full">
          Personal Information
        </div>
        <form
          onSubmit={handleUpdatePersonalInfo}
          className="grid sm:grid-cols-2 gap-x-10 gap-y-2 w-full mt-3"
        >
          <TextInput
            leftIcon={<HiUser size={16} />}
            placeholder="Full Name"
            name="name"
            value={personalInfo.name}
            onChange={onChangePersonalInfo}
          />
          <SelectInput
            leftIcon={<HiOutlineLocationMarker size={16} />}
            placeholder="Address"
            name="address"
            value={personalInfo.address}
            onChange={({ target }) => {
              setPersonalInfo(prev => ({
                ...prev,
                address: target.value,
              }));
            }}
            options={addresses.map(address => ({
              value: address,
              label: address,
            }))}
          />
          {user.phone_number && (
            <TextInput
              leftIcon={<HiPhone size={16} />}
              placeholder="Phone Number"
              name="phone_number"
              value={user.phone_number}
              disabled={true}
              readOnly
            />
          )}

          {user.email && (
            <TextInput
              leftIcon={<HiMail size={16} />}
              placeholder="Email"
              name="email"
              value={user.email}
              disabled={true}
              readOnly
            />
          )}

          <TextInput
            leftIcon={<HiOutlineUserCircle size={16} />}
            placeholder="Role"
            name="role"
            value={user.role}
            disabled={true}
            readOnly
          />

          <button
            type="submit"
            disabled={loading}
            className="disabled:cursor-not-allowed disabled:bg-opacity-10 disabled:text-slate-600 mt-6 ml-auto bg-blue-500/70 hover:bg-blue-500 text-white font-bold py-2 px-12 rounded col-span-full"
          >
            Update
          </button>
        </form>

        <div className="mt-8 text-slate-600 text-base font-medium font-['Inter'] w-full">
          Edit Password
        </div>
        <form
          onSubmit={handleUpdatePassword}
          className="grid sm:grid-cols-2 gap-x-10 gap-y-2 w-full mt-3"
        >
          <TextInput
            leftIcon={<HiLockClosed size={16} />}
            placeholder="Old Password"
            name="oldPassword"
            value={passwords.oldPassword}
            onChange={onChangePassword}
            type="password"
          />
          <TextInput
            leftIcon={<HiLockOpen size={16} />}
            placeholder="New Password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={onChangePassword}
            type="password"
          />

          <button
            type="submit"
            disabled={loading}
            className="disabled:cursor-not-allowed disabled:bg-opacity-10 disabled:text-slate-600 mt-6 ml-auto bg-blue-500/70 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded col-span-full"
          >
            Update Password
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
