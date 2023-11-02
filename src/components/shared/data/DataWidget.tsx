import { Spinner } from 'flowbite-react';

interface Props {
  isLoading?: boolean;
  children?: React.ReactNode;
}
const DataWidget = ({ isLoading = false, children }: Props) => {
  if (isLoading) {
    return (
      <p className="flex flex-col items-center p-4">
        <Spinner size="xl" />
      </p>
    );
  }
  return <>{children}</>;
};

export default DataWidget;
