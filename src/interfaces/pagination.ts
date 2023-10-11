import { Rate } from './rating.type';

export interface PaginatedData<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    search?: string;
  };
}

export interface Params<T>
  extends Partial<PaginatedData<T>['pagination']> {
  role?: string;
  user_id?: string;
  rating?: Rate;
}
