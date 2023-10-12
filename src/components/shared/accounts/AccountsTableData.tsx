import { roleToString } from '@/helpers/isAuth';
import { User, allowedRoles } from '@/interfaces/user.type';
import { blockUser } from '@/redux/features/users/user.thunk';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Button, Modal } from 'flowbite-react';
import moment from 'moment';
import { useState } from 'react';
import {
  HiBan,
  HiEye,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AccountsTableData = ({ data }: { data: User[] }) => {
  const [confirmBlock, setConfirmBlock] = useState<User | null>(null);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.user);

  const onBlockUser = async () => {
    if (!confirmBlock) return;
    try {
      const message = await dispatch(
        blockUser(confirmBlock.id),
      ).unwrap();
      toast.success(message);
      setConfirmBlock(null);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
    }
  };
  return (
    <>
      {data.map(item => (
        <tr
          key={item.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {item.name}
          </th>
          <td className="px-6 py-4">{item.email || '-'}</td>
          <td className="px-6 py-4">{item.phone_number || '-'}</td>
          <td className="px-6 py-4">{roleToString(item.role)}</td>
          <td className="px-6 py-4">
            {item.last_login
              ? moment(item.last_login).fromNow()
              : '-'}
          </td>
          <td className="px-6 py-4">
            <p className="flex space-x-2 justify-end">
              {allowedRoles.includes(item.role) && (
                <Link
                  to={`/admin/accounts/${item.id}`}
                  state={{
                    fullName: item.name,
                  }}
                  className={`bg-slate-600/10 rounded-lg border p-1 font-medium flex w-fit ${
                    item.role !== 'ADMIN' ? 'hidden' : 'block'
                  }`}
                >
                  <HiEye size={24} />
                </Link>
              )}
              <button
                type="button"
                title="Block or unblock user"
                className="bg-red-600/10 rounded-lg border p-1 font-medium flex w-fit"
                onClick={() => setConfirmBlock(item)}
              >
                <HiBan size={24} className="text-red-500" />
              </button>
            </p>
          </td>
        </tr>
      ))}

      <Modal
        show={!!confirmBlock}
        size="md"
        popup
        onClose={() => setConfirmBlock(null)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to block or unblock user:{' '}
              <span className="font-medium text-gray-900">
                {confirmBlock?.name}
              </span>
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={onBlockUser}
                isProcessing={loading}
              >
                Yes, I'm sure
              </Button>
              <Button
                color="gray"
                onClick={() => setConfirmBlock(null)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AccountsTableData;
