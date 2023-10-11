import { Rate } from '@/interfaces/rating.type';

export const getRatingTextColor = (rating: Rate) => {
  switch (rating) {
    case 'GOOD':
      return 'text-green-500';
    case 'FAIR':
      return 'text-amber-500';
    case 'BAD':
      return 'text-red-500';
    case 'MISLEADING':
      return 'text-slate-500';
    default:
      return 'text-gray-500';
  }
};
