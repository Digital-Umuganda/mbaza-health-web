export type Role =
  | 'ADMIN'
  | 'USER'
  | 'LINGUIST'
  | 'PROFESSIONAL_HEALTH_WORKER';

export interface User {
  email: string;
  name: string;
  phone_number: string | null;
  address: string;
  id: string;
  token: string;
  last_login: string;
  verified_fields: string;
  role: Role;
  created_by: string | null;
}

export const allowedRoles: Role[] = [
  'ADMIN',
  'LINGUIST',
  'PROFESSIONAL_HEALTH_WORKER',
];
