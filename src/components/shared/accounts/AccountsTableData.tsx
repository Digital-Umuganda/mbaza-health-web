import { roleToString } from '@/helpers/isAuth';
import { User, allowedRoles } from '@/interfaces/user.type';
import moment from 'moment';
import { HiEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AccountsTableData = ({ data }: { data: User[] }) => {
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
            {allowedRoles.includes(item.role) &&
              item.role !== 'ADMIN' && (
                <Link
                  to={`/admin/accounts/${item.id}`}
                  state={{
                    fullName: item.name,
                  }}
                  className="bg-slate-600/10 rounded-lg border p-2 font-medium flex w-fit"
                >
                  <HiEye size={24} />
                </Link>
              )}
          </td>
        </tr>
      ))}
    </>
  );
};

export default AccountsTableData;
