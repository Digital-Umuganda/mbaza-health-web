import Http from '@/config/http';
import { formatNumber } from '@/helpers/function';
import { useEffect, useState } from 'react';
import { HiChevronDoubleRight, HiHome } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const AdminDashboardPage = () => {
  const [stat, setStat] = useState({
    count_chats: 0,
    count_messages: 0,
    count_annotations_by_linguists: 0,
    count_annotations_by_health_workers: 0,
    count_annotations_by_voice_annotators: 0,
  });

  const getStatistics = async () => {
    try {
      const { data } = await new Http().default.get('/stat/count');
      setStat(data);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    Promise.all([getStatistics()]);
  }, []);

  return (
    <>
      <div className="w-full py-4 px-8 bg-white rounded-2xl border flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <HiHome size={24} className="text-amber-400" />
          <p className="text-slate-600 text-2xl font-medium">
            Dashboard
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-12 gap-y-6 pb-3 my-4">
        <div className="border px-8 py-6 flex flex-col justify-center shrink-0 w-80 bg-white rounded-2xl">
          <h3 className="font-semibold text-[#3D576F]">
            Questions Asked
          </h3>
          <p className="mt-4 text-amber-400 text-5xl font-light font-['Inter']">
            {formatNumber(stat.count_messages)}
          </p>
          <p className="mt-4 text-[#A7B1BB] text-sm">
            By Community Health Workers
          </p>
          <p className="mt-4 text-[#A7B1BB] text-xs">
            <span className="font-medium text-[#3D576F]">
              {' '}
              {formatNumber(stat.count_chats)}
            </span>{' '}
            Conversations
          </p>
          <p className="my-3 text-[#A7B1BB] text-xs">
            <span className="font-medium text-[#3D576F]">
              {' '}
              {formatNumber(stat.count_messages)}
            </span>{' '}
            Answers
          </p>

          <Link
            to={`/admin/accounts?role=USER`}
            className="flex items-center text-[#478CCA] mt-auto w-fit"
          >
            View Details <HiChevronDoubleRight className="ml-2" />
          </Link>
        </div>

        <div className="border px-8 py-6 flex flex-col justify-center shrink-0 w-96 bg-white rounded-2xl">
          <h3 className="font-semibold text-[#3D576F]">
            Translations Annotated
          </h3>
          <p className="mt-4 text-amber-400 text-5xl font-light font-['Inter']">
            {formatNumber(stat.count_annotations_by_linguists)}
          </p>
          <p className="mt-4 text-[#A7B1BB] text-sm">By Linguists</p>
          <p className="my-4 text-[#A7B1BB] text-xs">
            <span className="font-medium text-[#3D576F]">
              {' '}
              {(
                stat.count_annotations_by_linguists /
                stat.count_messages
              ).toFixed(2)}
              %
            </span>{' '}
            of all questions
          </p>
          <Link
            to={`/admin/accounts?role=LINGUIST`}
            className="flex items-center text-[#478CCA] mt-auto w-fit"
          >
            View Details <HiChevronDoubleRight className="ml-2" />
          </Link>
        </div>

        <div className="border px-8 py-6 flex flex-col justify-center shrink-0 w-96 bg-white rounded-2xl">
          <h3 className="font-semibold text-[#3D576F]">
            Conversations Annotated
          </h3>
          <p className="mt-4 text-amber-400 text-5xl font-light font-['Inter']">
            {formatNumber(stat.count_annotations_by_health_workers)}
          </p>
          <p className="mt-4 text-[#A7B1BB] text-sm">
            By Professional Health Workers
          </p>
          <p className="my-4 text-[#A7B1BB] text-xs">
            <span className="font-medium text-[#3D576F]">
              {' '}
              {(
                stat.count_annotations_by_health_workers /
                stat.count_chats
              ).toFixed(2)}
              %
            </span>{' '}
            of all conversations
          </p>

          <Link
            to={`/admin/accounts?role=PROFESSIONAL_HEALTH_WORKER`}
            className="flex items-center text-[#478CCA] mt-auto w-fit"
          >
            View Details <HiChevronDoubleRight className="ml-2" />
          </Link>
        </div>

        <div className="border px-8 py-6 flex flex-col justify-center shrink-0 w-96 bg-white rounded-2xl">
          <h3 className="font-semibold text-[#3D576F]">
            Audios Annotated
          </h3>
          <p className="mt-4 text-amber-400 text-5xl font-light font-['Inter']">
            {formatNumber(stat.count_annotations_by_voice_annotators)}
          </p>
          <p className="mt-4 text-[#A7B1BB] text-sm">
            By Voice Annotators
          </p>
          <p className="my-4 text-[#A7B1BB] text-xs">
            <span className="font-medium text-[#3D576F]">
              {' '}
              {(
                stat.count_annotations_by_voice_annotators /
                stat.count_messages
              ).toFixed(2)}
              %
            </span>{' '}
            of all answers
          </p>
          <Link
            to={`/admin/accounts?role=VOICE_ANNOTATOR`}
            className="flex items-center text-[#478CCA] mt-auto w-fit"
          >
            View Details <HiChevronDoubleRight className="ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
