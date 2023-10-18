import SelectInput from '@/components/partials/inputs/SelectInput';
import Http from '@/config/http';
import { formatNumber } from '@/helpers/function';
import { chatRatings } from '@/interfaces/rating.type';
import { IStatRating } from '@/interfaces/stat.type';
import { Progress } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiClock, HiHome } from 'react-icons/hi';

const AdminDashboardPage = () => {
  const [userStat, setUserStat] = useState({
    totalUsers: 0,
    musanze: 0,
    gicumbi: 0,
    nyanza: 0,
  });
  const [time, setTime] = useState<'today' | 'week' | 'month'>(
    'today',
  );
  const [linguistStatRatings, setLinguistStatRatings] = useState<
    IStatRating[]
  >([]);
  const [healthWorkerStatRatings, setHealthWorkerStatRatings] =
    useState<IStatRating[]>([]);

  const getLinguistStats = async () => {
    try {
      const linguistRequests = chatRatings.map(rating =>
        new Http().default.get<Omit<IStatRating, 'title'>>(
          `/user/statistics/ratings?role=LINGUIST&rating=${rating}`,
        ),
      );
      const linguistStats = await Promise.all(linguistRequests);
      setLinguistStatRatings(
        chatRatings.map((rating, index) => ({
          title: rating,
          ...linguistStats[index].data,
        })),
      );
    } catch (error) {
      // TODO: Handle error
    }
  };

  const getHealthWorkerStats = async () => {
    try {
      const healthWorkerRequests = chatRatings.map(rating =>
        new Http().default.get<Omit<IStatRating, 'title'>>(
          `/user/statistics/ratings?role=PROFESSIONAL_HEALTH_WORKER&rating=${rating}`,
        ),
      );
      const healthWorkerStats = await Promise.all(
        healthWorkerRequests,
      );
      setHealthWorkerStatRatings(
        chatRatings.map((rating, index) => ({
          title: rating,
          ...healthWorkerStats[index].data,
        })),
      );
    } catch (error) {
      // TODO: Handle error
    }
  };

  const getUsers = async () => {
    try {
      const { data } = await new Http().default.get(
        '/user/statistics/users',
      );
      setUserStat(data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    Promise.all([
      getLinguistStats(),
      getHealthWorkerStats(),
      getUsers(),
    ]);
  }, []);

  const getTotalLinguist = (items: IStatRating[]) => {
    switch (time) {
      case 'month':
        return items.reduce((acc, curr) => acc + curr.month, 0);
      case 'week':
        return items.reduce((acc, curr) => acc + curr.week, 0);
      case 'today':
        return items.reduce((acc, curr) => acc + curr.today, 0);
      default:
        return items.reduce((acc, curr) => acc + curr.month, 0);
    }
  };

  return (
    <>
      <div className="w-full py-4 px-8 bg-white rounded-2xl border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <HiHome size={24} className="text-amber-400" />
          <p className="text-slate-600 text-2xl font-medium">
            Dashboard
          </p>
        </div>
        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
          <SelectInput
            leftIcon={
              <HiClock size={16} className="text-amber-400" />
            }
            value={time}
            placeholder="Role"
            className="max-w-[320px]"
            options={[
              {
                label: 'Today',
                value: 'today',
              },
              {
                label: 'This Week',
                value: 'week',
              },
              {
                value: 'month',
                label: 'This Month',
              },
            ]}
            onChange={({ target }) => {
              setTime(target.value as 'today' | 'week' | 'month');
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap my-4 gap-x-4 gap-y-3">
        <div className="w-96 h-48 bg-white rounded-2xl border flex items-stretch divide-x divide-slate-600/10">
          <div className="w-1/2 p-4 py-3 flex flex-col justify-center">
            <p className="text-amber-400 text-5xl font-light font-['Inter']">
              {formatNumber(getTotalLinguist(linguistStatRatings))}
            </p>
            <p className="mt-4 text-slate-600 text-sm font-medium font-['Inter']">
              Translations Reviewed
            </p>
            <p className="mt-1 text-slate-600 text-xs font-medium font-['Inter']">
              By Linguists
            </p>
            <Progress
              progress={45}
              className="mt-4 hidden"
              color="yellow"
            />
          </div>

          <div className="w-1/2 p-4 py-3 flex flex-col justify-center">
            {linguistStatRatings.map(stat => (
              <p
                key={stat.title}
                className="text-slate-600 text-opacity-60 text-sm mt-1 font-['Inter']"
              >
                <span className="text-slate-600 text-opacity-100 font-semibold">
                  {Math.floor(
                    (stat[time] * 100) /
                      getTotalLinguist(linguistStatRatings) || 0,
                  )}
                  %
                </span>{' '}
                {stat.title}
              </p>
            ))}
          </div>
        </div>

        <div className="w-96 h-48 bg-white rounded-2xl border flex items-stretch divide-x divide-slate-600/10">
          <div className="w-1/2 p-4 py-3 flex flex-col justify-center">
            <p className="text-amber-400 text-5xl font-light font-['Inter']">
              {formatNumber(
                getTotalLinguist(healthWorkerStatRatings),
              )}
            </p>
            <p className="mt-4 text-slate-600 text-sm font-medium font-['Inter']">
              Responses Reviewed
            </p>
            <p className="mt-1 text-slate-600 text-xs font-medium font-['Inter']">
              By Professional Health Workers
            </p>
            <Progress
              progress={45}
              className="mt-4 hidden"
              color="green"
            />
          </div>

          <div className="w-1/2 p-4 py-3 flex flex-col justify-center">
            {healthWorkerStatRatings.map(stat => (
              <p
                key={stat.title}
                className="text-slate-600 text-opacity-60 text-sm mt-1 font-['Inter']"
              >
                <span className="text-slate-600 text-opacity-100 font-semibold">
                  {Math.floor(
                    (stat[time] * 100) /
                      getTotalLinguist(healthWorkerStatRatings) || 0,
                  )}
                  %
                </span>{' '}
                {stat.title}
              </p>
            ))}
          </div>
        </div>

        <div className="w-96 h-48 bg-white rounded-2xl border flex items-stretch divide-x divide-slate-600/10">
          <div className="w-1/2 p-4 py-3 flex flex-col justify-center">
            <p className="text-amber-400 text-5xl font-light font-['Inter']">
              {formatNumber(userStat.totalUsers)}
            </p>
            <p className="mt-4 text-slate-600 text-sm font-medium font-['Inter']">
              Users
            </p>
            <p className="mt-1 text-slate-600 text-xs font-medium font-['Inter']">
              In different locations
            </p>
            <Progress
              progress={45}
              className="mt-4 hidden"
              color="green"
            />
          </div>

          <div className="w-1/2 p-4 py-3 flex flex-col justify-center">
            <p className="text-slate-600 text-opacity-60 text-sm mt-1 font-['Inter']">
              <span className="text-slate-600 text-opacity-100 font-semibold">
                {Math.floor(
                  (userStat.musanze * 100) / userStat.totalUsers || 0,
                )}
                %
              </span>{' '}
              Musanze
            </p>
            <p className="text-slate-600 text-opacity-60 text-sm mt-1 font-['Inter']">
              <span className="text-slate-600 text-opacity-100 font-semibold">
                {Math.floor(
                  (userStat.gicumbi * 100) / userStat.totalUsers || 0,
                )}
                %
              </span>{' '}
              Gicumbi
            </p>
            <p className="text-slate-600 text-opacity-60 text-sm mt-1 font-['Inter']">
              <span className="text-slate-600 text-opacity-100 font-semibold">
                {Math.floor(
                  (userStat.nyanza * 100) / userStat.totalUsers || 0,
                )}
                %
              </span>{' '}
              Nyanza
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
