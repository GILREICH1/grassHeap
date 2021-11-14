import React, { useEffect, useState } from 'react';
import MonthTaskBox from '../MonthTasksBox/MonthTasksBox';
import { months } from '../../../utils/months';
import './Tasks.scss';
import ScrollButton from '../../ScrollButton/ScrollButton';

function Tasks(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState<number>(0);

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const nextMonth = (currentMonth + 1) % 12;

  useEffect(() => {
    const today: Date = new Date();
    const thisMonth = today.getMonth();
    setCurrentMonth(thisMonth);
  }, []);

  return (
    <div className="Tasks">
      <ScrollButton
        disabled={false}
        type="back"
        onClick={() => setCurrentMonth(lastMonth)}></ScrollButton>
      <div className="tasks__allmonths">
        <div className={`tasks__month tasks__month--${lastMonth}`}>
          <MonthTaskBox monthNumber={lastMonth} monthName={months[lastMonth]} />
        </div>
        <div className={`tasks__month tasks__month--${currentMonth}`}>
          <MonthTaskBox
            monthNumber={currentMonth}
            monthName={months[currentMonth]}
          />
        </div>
        <div className={`tasks__month tasks__month--${nextMonth}`}>
          <MonthTaskBox monthNumber={nextMonth} monthName={months[nextMonth]} />
        </div>
      </div>
      <ScrollButton
        disabled={false}
        type="forward"
        onClick={() => setCurrentMonth(nextMonth)}></ScrollButton>
    </div>
  );
}

export default Tasks;
