import { Button, Modal } from 'flowbite-react';
import { ChangeEvent, useState } from 'react';
import {
  HiMail,
  HiOutlineLocationMarker,
  HiOutlineUserCircle,
  HiPhone,
  HiUser,
} from 'react-icons/hi';
import imigongo from '@/assets/images/imigongo.png';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { toast } from 'react-toastify';
import TextInput from '@/components/partials/inputs/TextInput';
import SelectInput from '@/components/partials/inputs/SelectInput';
import { Role, allowedRoles } from '@/interfaces/user.type';
import { roleToString } from '@/helpers/isAuth';
import { addresses } from '@/constants/address';
import { createUser } from '@/redux/features/users/user.thunk';

export default function NewAccount() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };

  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.user);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    address: addresses[0],
    role: allowedRoles[1],
    email: '',
    phone_number: '',
  });
  const onChangePersonalInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdatePersonalInfo = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      await dispatch(createUser(personalInfo)).unwrap();
      setOpenModal(undefined);
      toast.success('Account created successfully');
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return (
    <>
      <Button
        onClick={() => props.setOpenModal('NewAccountForm')}
        type="button"
        className="group flex items-center justify-center p-0.5 relative focus:z-10 focus:outline-none border-transparent enabled:hover:bg-amber-800 focus:ring-amber-300 dark:bg-amber-600 dark:enabled:hover:bg-amber-700 dark:focus:ring-amber-800 focus:ring-2 uppercase px-4 py-1.5 bg-amber-400 hover:bg-amber-500 rounded-lg border text-center text-black text-base font-bold font-['Inter']"
      >
        New ACCOUNT
      </Button>
      <Modal
        show={props.openModal === 'NewAccountForm'}
        size="2xl"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        <Modal.Header />
        <Modal.Body className="relative">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <HiOutlineUserCircle
                size={24}
                className="text-amber-400"
              />
              <h3 className="text-blue-500 text-2xl font-normal font-['Inter']">
                New Account
              </h3>
            </div>
            <img
              src={imigongo}
              alt="Imigongo"
              className="w-full rounded-full left-0 right-0 absolute"
            />

            <form
              onSubmit={handleUpdatePersonalInfo}
              className="grid sm:grid-cols-2 gap-x-10 gap-y-4 w-full pt-12"
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

              <TextInput
                leftIcon={<HiPhone size={16} />}
                placeholder="Phone Number(2507********)"
                name="phone_number"
                type="tel"
                value={personalInfo.phone_number}
                onChange={onChangePersonalInfo}
              />

              <TextInput
                leftIcon={<HiMail size={16} />}
                placeholder="Email"
                name="email"
                type="email"
                value={personalInfo.email}
                onChange={onChangePersonalInfo}
              />

              <SelectInput
                leftIcon={<HiUser size={16} />}
                placeholder="Role"
                name="role"
                value={personalInfo.role}
                onChange={({ target }) => {
                  setPersonalInfo(prev => ({
                    ...prev,
                    role: target.value as Role,
                  }));
                }}
                options={allowedRoles.map(role => ({
                  value: role,
                  label: roleToString(role),
                }))}
                className="col-span-full"
              />

              <button
                type="submit"
                disabled={loading}
                className="disabled:cursor-not-allowed disabled:bg-opacity-10 disabled:text-slate-600 mt-6 ml-auto bg-blue-500/70 hover:bg-blue-500 text-white font-bold py-3 px-12 rounded col-span-full"
              >
                Create Account
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
