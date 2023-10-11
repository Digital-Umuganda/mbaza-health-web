import { getRatingTextColor } from '@/helpers/color';
import { RatingResponse } from '@/interfaces/rating.type';
import moment from 'moment';
import { HiEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AccountDetailTableData = ({
  data,
}: {
  data: RatingResponse[];
}) => {
  return (
    <>
      {data.map(item => (
        <tr
          key={item.Ratings.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <td className="px-6 py-4">
            {moment(item.Ratings.created_at).format('LL')}
          </td>
          <td
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <span className="block w-full max-w-[320px] truncate">
              {item.kinyarwanda_question}
            </span>
          </td>
          <td className="px-6 py-4">
            <span className="block w-full max-w-[320px] truncate">
              {item.english_question}
            </span>
          </td>
          <td
            className={`px-6 py-4 ${getRatingTextColor(
              item.Ratings.rating,
            )}`}
          >
            {item.Ratings.rating}
          </td>
          <td className="px-6 py-4">
            <span className="block w-full max-w-[320px] truncate">
              {item.Ratings.comment}
            </span>
          </td>
          <td className="px-6 py-4">
            <Link
              to="#"
              className="bg-slate-600/10 rounded-lg border p-2 font-medium flex w-fit"
            >
              <HiEye size={24} />
            </Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default AccountDetailTableData;