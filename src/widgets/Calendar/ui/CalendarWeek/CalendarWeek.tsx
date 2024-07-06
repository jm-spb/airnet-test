import * as styles from './CalendarWeek.module.scss';

interface WeekProps {
  date: Date;
  month: Date;
  select: (date: Date) => void;
  selected: Date;
}

const isSameDay = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

const Day = ({
  day,
  selected,
  select,
}: {
  day: any;
  selected: Date;
  select: (date: Date) => void;
}): React.ReactNode => {
  const { date, isCurrentMonth, isToday, number } = day;

  const handleClick = () => {
    select(date);
  };

  return (
    <span
      className={`${styles.day} ${isToday ? styles.today : ''} ${
        isCurrentMonth ? '' : styles.differentMonth
      } ${isSameDay(date, selected) ? styles.selected : ''}`}
      onClick={handleClick}>
      {number}
    </span>
  );
};

export const CalendarWeek = ({ date, month, select, selected }: WeekProps): React.ReactNode => {
  const days = Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + i);

    return {
      name: currentDate.toLocaleDateString('en-US', { weekday: 'short' }).substring(0, 1),
      number: currentDate.getDate(),
      isCurrentMonth: currentDate.getMonth() === month.getMonth(),
      isToday: isSameDay(currentDate, new Date()),
      date: currentDate,
    };
  });

  return (
    <div className={`${styles.row} ${styles.week}`}>
      {days.map((day) => (
        <Day key={day.number} day={day} selected={selected} select={select} />
      ))}
    </div>
  );
};
