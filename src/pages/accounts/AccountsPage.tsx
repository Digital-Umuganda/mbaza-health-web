import SelectInput from '@/components/partials/inputs/SelectInput';
import TextInput from '@/components/partials/inputs/TextInput';
import DataWidget from '@/components/shared/data/DataWidget';
import { roleToString } from '@/helpers/isAuth';
import { Role, allowedRoles } from '@/interfaces/user.type';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { HiOutlineUserCircle, HiSearch } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { getUsers } from '@/redux/features/users/user.thunk';
import AccountsTableData from '@/components/shared/accounts/AccountsTableData';
import AppPagination from '@/components/shared/data/AppPagination';
import NewAccount from '@/components/shared/accounts/NewAccount';
import { useSearch } from '@/components/hooks/search';
import { useSearchParams } from 'react-router-dom';

const AccountsPage = () => {
  const [URLSearchParams, SetURLSearchParams] = useSearchParams();
  const [perPage, setPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { debouncedSearch, setSearch } = useSearch();
  const {
    data: { data, pagination },
    loading,
  } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      getUsers({
        search: debouncedSearch,
        currentPage:
          debouncedSearch.length && data.length < 5 ? 1 : currentPage,
        itemsPerPage: perPage,
        role: URLSearchParams.get('role') as Role,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, debouncedSearch, perPage, URLSearchParams]);

  return (
    <>
      <div className="w-full py-4 px-8 bg-white rounded-2xl border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <HiOutlineUserCircle size={24} className="text-amber-400" />
          <p className="text-slate-600 text-2xl font-medium">
            Accounts
          </p>
        </div>
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <TextInput
            placeholder="Search"
            leftIcon={
              <HiSearch size={16} className="text-amber-400" />
            }
            isLoading={loading}
            className="max-w-[320px]"
            onChange={({ target }) => {
              setSearch(target.value);
            }}
          />
          <SelectInput
            leftIcon={
              <HiOutlineUserCircle
                size={16}
                className="text-amber-400"
              />
            }
            placeholder="Role"
            className="max-w-[320px]"
            value={URLSearchParams.get('role') || ''}
            options={[
              {
                value: '',
                label: 'All accounts',
              },
              {
                label: 'COMMUNITY HEALTH WORKER',
                value: 'USER',
              },
              ...allowedRoles.map(role => ({
                value: role,
                label: roleToString(role),
              })),
            ]}
            onChange={({ target }) => {
              setCurrentPage(1);
              SetURLSearchParams({ role: target.value });
            }}
          />

          <NewAccount />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap min-h-[200px]">
          <thead className="text-xs uppercase bg-blue-500 bg-opacity-10 text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                NAMEs
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                PHONE NUMBER
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Annotations /<br />
                Contributions
              </th>
              <th scope="col" className="px-6 py-3">
                Last Login
              </th>
              <th scope="col" className="px-6 py-3 text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <DataWidget isLoading={loading && !data.length}>
              {data.length ? (
                <AccountsTableData data={data} />
              ) : (
                <tr>
                  <td colSpan={6} className="text-center px-6 py-4">
                    No accounts found
                  </td>
                </tr>
              )}
            </DataWidget>
          </tbody>
        </table>
      </div>

      <AppPagination
        {...pagination}
        onPageChange={setCurrentPage}
        onPerPageChange={num => {
          setPerPage(num);
          setCurrentPage(1);
        }}
      />
    </>
  );
};

export default AccountsPage;
