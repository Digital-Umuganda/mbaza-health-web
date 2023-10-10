import { Spinner } from 'flowbite-react';

interface Props {
  isLoading?: boolean;
  children?: React.ReactNode;
}
const DataWidget = ({ isLoading = false, children }: Props) => {
  if (isLoading) {
    return <Spinner size="xl" />;
  }
  return <>{children}</>;
};

export default DataWidget;
