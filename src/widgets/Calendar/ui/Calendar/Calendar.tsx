import React, { memo, useCallback, useMemo, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { CalendarWeek } from '../CalendarWeek/CalendarWeek';
import * as styles from './Calendar.module.scss';

const DayNames = (): React.ReactNode => (
  <div className={`${styles.row} ${styles.dayNames}`}>
    <span className={styles.day}>ПН</span>
    <span className={styles.day}>ВТ</span>
    <span className={styles.day}>СР</span>
    <span className={styles.day}>ЧТ</span>
    <span className={styles.day}>ПТ</span>
    <span className={styles.day}>СБ</span>
    <span className={styles.day}>ВС</span>
  </div>
);

const Header = memo(
  ({ renderMonthName, previous, next }: any): React.ReactNode => (
    <header className={styles.header}>
      <div className={`${styles.monthDisplay} ${styles.row}`}>
        <ChevronLeftIcon boxSize={26} _hover={{ cursor: 'pointer' }} onClick={previous} />
        <span className={`${styles.monthLabel}`}>{renderMonthName}</span>
        <ChevronRightIcon boxSize={26} _hover={{ cursor: 'pointer' }} onClick={next} />
      </div>
      <DayNames />
    </header>
  )
);

const today = new Date();

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const previous = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      const prevMonthDate = new Date(prevMonth);
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
      return prevMonthDate;
    });
  }, []);

  const next = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      const nextMonthDate = new Date(prevMonth);
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      return nextMonthDate;
    });
  }, []);

  const select = (date: any) => {
    setSelectedDate(new Date(date));
    const dateClone = new Date(date.getTime());
    setCurrentMonth(dateClone);
  };

  const renderWeeks = () => {
    const weeks = [];
    let done = false;
    const date = new Date(currentMonth);

    date.setDate(1); // Устанавливаем первое число месяца
    date.setDate(date.getDate() - date.getDay() + 1); // Устанавливаем на начало недели (понедельник)

    while (!done) {
      weeks.push(
        <CalendarWeek
          key={date.getTime()}
          date={new Date(date)}
          month={currentMonth}
          select={select}
          selected={selectedDate}
        />
      );

      // Добавляем 7 дней -> переходим на следующую неделю
      date.setDate(date.getDate() + 7);

      // Проверяем что в массиве есть хотя бы две недели
      // Прерываем цикл если добавлена неделя из следующего месяца
      done = weeks.length > 1 && date.getMonth() !== currentMonth.getMonth();
    }

    return weeks;
  };

  const renderMonthName = useMemo(
    () =>
      currentMonth.toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      }),
    [currentMonth]
  );

  return (
    <section className={styles.calendar}>
      <Header renderMonthName={renderMonthName} previous={previous} next={next} />
      {renderWeeks()}
    </section>
  );
};
