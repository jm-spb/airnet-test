import React, { memo, useCallback, useState } from 'react';
import { Container, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import * as styles from './Calendar.module.scss';

interface CalendarWeekProps {
  date: Date;
  month: Date;
  selected: Date;
}

interface TableHeaderProps {
  renderMonthName: string;
  previous: () => void;
  next: () => void;
}

const dayNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const RenderDayNames = memo(
  (): React.ReactNode => (
    <Thead>
      <Tr h="6rem">
        {dayNames.map((day: string) => (
          <Th
            key={day}
            color="secondary"
            fontSize="fontSizeM"
            textAlign="center"
            borderBottom="solid 1px lightgray"
            _notFirst={{ borderLeft: 'solid 1px lightgray' }}>
            {day}
          </Th>
        ))}
      </Tr>
    </Thead>
  )
);

const Header = memo<TableHeaderProps>(
  ({ renderMonthName, previous, next }): React.ReactNode => (
    <Flex
      h="6rem"
      fontSize="fontSizeM"
      bg="primary"
      color="textPrimaryLight"
      textTransform="uppercase"
      fontWeight="bold"
      justifyContent="space-between"
      alignItems="center">
      <ChevronLeftIcon boxSize={26} _hover={{ cursor: 'pointer' }} onClick={previous} />
      <span>{renderMonthName}</span>
      <ChevronRightIcon boxSize={26} _hover={{ cursor: 'pointer' }} onClick={next} />
    </Flex>
  )
);

const isSameDay = (date1: Date, date2: Date): boolean =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

const Week = memo(({ date, month, selected }: CalendarWeekProps): React.ReactNode => {
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
    <Tr>
      {days.map(({ date, isCurrentMonth, isToday, name, number }) => (
        <Td
          key={number}
          data-date={date}
          className={`${isToday ? styles.todayCell : ''} 
          ${isCurrentMonth ? '' : styles.differentMonth} 
          ${isSameDay(date, selected) ? styles.selected : ''}
          `}
          h="10rem"
          borderBottom="solid 1px lightgray"
          _notFirst={{ borderLeft: 'solid 1px lightgray' }}
          cursor="pointer"
          _hover={{ backgroundColor: 'lightgray' }}>
          {number}
        </Td>
      ))}
    </Tr>
  );
});

const today = new Date();
export const Calendar = (): React.ReactNode => {
  const [currentMonth, setCurrentMonth] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date>(today);

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

  const handleDayClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLTableCellElement;
    if (target.tagName === 'TD') {
      const selectedDay = new Date(target.dataset.date);
      setSelectedDate(selectedDay);
      const dateClone = new Date(selectedDay.getTime());
      setCurrentMonth(dateClone);
    }
  };

  const renderTableWeeks = (): React.ReactNode => {
    const weeks: React.ReactNode[] = [];
    let done = false;
    const date = new Date(currentMonth);

    date.setDate(1); // Устанавливаем первое число месяца
    date.setDate(date.getDate() - date.getDay() + 1); // Устанавливаем на начало недели (понедельник)

    while (!done) {
      weeks.push(
        <Week
          key={date.getTime()}
          date={new Date(date)}
          month={currentMonth}
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

  const renderMonthName = currentMonth.toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
  });

  return (
    <Container maxW="90rem">
      <Header renderMonthName={renderMonthName} previous={previous} next={next} />
      <TableContainer bg="backgroundContent">
        <Table>
          <RenderDayNames />
          <Tbody onClick={handleDayClick}>{renderTableWeeks()}</Tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};
