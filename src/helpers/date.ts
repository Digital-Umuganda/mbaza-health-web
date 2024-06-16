import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);

const appDayjs = dayjs;

export const dateTimeWithSpaceFormat = 'YYYY-MM-DD HH:mm:ss';

export const dateFormat = 'MMMM D, YYYY';

export default appDayjs;
