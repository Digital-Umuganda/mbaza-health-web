import SelectInput from '@/components/partials/inputs/SelectInput';
import TextInput from '@/components/partials/inputs/TextInput';
import DataWidget from '@/components/shared/data/DataWidget';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  HiArrowLeft,
  HiOutlineUserCircle,
  HiSearch,
} from 'react-icons/hi';
import { useEffect, useMemo } from 'react';
import { getRatings } from '@/redux/features/ratings/rating.thunk';
import AppPagination from '@/components/shared/data/AppPagination';
import AccountDetailTableData from '@/components/shared/accounts/AccountDetailTableData';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Rate, chatRatings } from '@/interfaces/rating.type';
import Secure from '@/helpers/secureLS';
import { roleToPath } from '@/helpers/isAuth';

const AccountDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const profile = Secure.getProfile();
  const user_id = id ?? profile?.id;
  const { state } = useLocation();
  const {
    data: { data, pagination },
    loading,
  } = useAppSelector(state => state.rating);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRatings({ user_id }));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(
      getRatings({
        user_id,
        currentPage: page,
        itemsPerPage: pagination.itemsPerPage,
      }),
    );
  };

  const onChangePerPage = (perPage: number) => {
    dispatch(
      getRatings({
        user_id,
        itemsPerPage: perPage,
      }),
    );
  };

  const handleSelectRating = (rating: Rate) => {
    dispatch(
      getRatings({
        user_id,
        rating,
        itemsPerPage: pagination.itemsPerPage,
      }),
    );
  };

  const handleSearch = (search: string) => {
    if (loading) return;
    dispatch(
      getRatings({
        user_id,
        search,
        itemsPerPage: pagination.itemsPerPage,
      }),
    );
  };

  const fullName = useMemo(() => {
    if (state?.fullName) {
      return state.fullName;
    } else if (!id && Secure.getProfile()?.name) {
      return Secure.getProfile()?.name;
    } else {
      return 'Ratings';
    }
  }, [id, state?.fullName]);

  return (
    <>
      <div className="w-full py-4 px-8 bg-white rounded-2xl border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          {profile?.role === 'ADMIN' && (
            <Link
              to={`/${roleToPath(profile?.role as string)}/accounts`}
              className="bg-blue-500/10 p-2 rounded-full"
            >
              <HiArrowLeft size={16} className="text-blue-500" />
            </Link>
          )}
          <p className="text-slate-600 text-2xl font-medium">
            {profile?.role === 'ADMIN'
              ? fullName
              : 'ANNOTATION HISTORY'}
          </p>
        </div>
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <TextInput
            placeholder="Search"
            leftIcon={
              <HiSearch size={16} className="text-amber-400" />
            }
            className="max-w-[320px]"
            onChange={({ target }) => {
              handleSearch(target.value);
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
            options={[
              {
                value: '',
                label: 'All ratings',
              },
              ...chatRatings.map(item => ({
                value: item,
                label: item,
              })),
            ]}
            onChange={({ target }) => {
              handleSelectRating(target.value as Rate);
            }}
          />
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <thead className="text-xs uppercase bg-blue-500 bg-opacity-10 text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Kinyarwanda
              </th>
              <th scope="col" className="px-6 py-3">
                English
              </th>
              <th scope="col" className="px-6 py-3">
                Rating
              </th>
              <th scope="col" className="px-6 py-3">
                Comment
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <DataWidget isLoading={loading && !data.length}>
              {data.length ? (
                <AccountDetailTableData data={data} />
              ) : (
                <tr>
                  <td colSpan={6} className="text-center px-6 py-4">
                    No ratings found
                  </td>
                </tr>
              )}
            </DataWidget>
          </tbody>
        </table>
      </div>

      <AppPagination
        {...pagination}
        onPageChange={onChangePage}
        onPerPageChange={onChangePerPage}
      />
    </>
  );
};

export default AccountDetailPage;
