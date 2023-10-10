import SelectInput from '@/components/partials/inputs/SelectInput';
import { ITEMS_PER_PAGE } from '@/constants/pagination';
import { Pagination } from 'flowbite-react';
import { HiTable } from 'react-icons/hi';

interface Props {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
}
const AppPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 1,
  onPageChange = () => {},
  onPerPageChange = () => {},
}: Props) => {
  const perPageOptions = ITEMS_PER_PAGE.filter(
    item => item <= totalItems,
  ).map(item => ({
    value: item.toString(),
    label: item.toString(),
  }));
  return (
    <div className="flex flex-wrap items-center gap-3 justify-end mt-6">
      <Pagination
        currentPage={currentPage}
        layout="table"
        onPageChange={onPageChange}
        totalPages={totalPages}
        showIcons
        className="flex flex-row-reverse items-center flex-wrap gap-3"
      />
      {perPageOptions.length > 0 && (
        <SelectInput
          className="max-w-[120px]"
          options={perPageOptions}
          leftIcon={<HiTable size={16} className="text-amber-400" />}
          onChange={({ target }) => {
            onPerPageChange(Number(target.value));
          }}
        />
      )}
    </div>
  );
};

export default AppPagination;
