// import { getRatingTextColor } from '@/helpers/color';
import appDayjs, { dateFormat } from '@/helpers/date';
import { roleToPath } from '@/helpers/isAuth';
import Secure from '@/helpers/secureLS';
import { RatingResponse } from '@/interfaces/rating.type';
import { HiEye } from 'react-icons/hi';
import { Link, useSearchParams } from 'react-router-dom';

const AccountDetailTableData = ({
  data,
}: {
  data: RatingResponse[];
}) => {
  const profile = Secure.getProfile();

  const [searchParams] = useSearchParams();
  const role = searchParams.get('role');

  return (
    <>
      {data.map(item => {
        const baseLink =
          profile?.role === 'ADMIN'
            ? `/admin/${role}`
            : `/${roleToPath(profile?.role as string)}`;
        const hrefLink = `${baseLink}/home?id=${
          profile?.role === 'PROFESSIONAL_HEALTH_WORKER'
            ? item.Ratings.chat_id
            : profile?.role === 'ADMIN' &&
              role === 'professional-health-worker'
            ? item.Ratings.chat_id
            : item.Ratings.question_answer_id
        }`;
        return (
          <tr
            key={item.Ratings.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <td className="px-6 py-4">
              {appDayjs(item.Ratings.created_at).format(dateFormat)}
            </td>
            {!item.title ? (
              <>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  title={item.kinyarwanda_question}
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
              </>
            ) : (
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                title={item.title}
              >
                <span className="block w-full max-w-[320px] truncate">
                  {item.title}
                </span>
              </td>
            )}
            {/* <td
            className={`px-6 py-4 ${getRatingTextColor(
              item.Ratings.rating,
            )}`}
          >
            {item.Ratings.rating}
          </td> */}
            <td
              className="px-6 py-4"
              title={item.Ratings.comment || '-'}
            >
              <span className="block w-full max-w-[320px] truncate">
                {item.Ratings.comment || '-'}
              </span>
            </td>
            <td className="px-6 py-4">
              <Link
                to={hrefLink}
                className="bg-slate-600/10 rounded-lg border p-2 font-medium flex w-fit"
              >
                <HiEye size={24} />
              </Link>
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default AccountDetailTableData;
