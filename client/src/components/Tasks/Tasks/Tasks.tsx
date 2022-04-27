import React, { useContext, useEffect, useState } from 'react';
import MonthTasksBox from '../MonthTasksBox/MonthTasksBox';
import { months } from '../../../utils/months';
import './Tasks.scss';
import ScrollButton from '../../ScrollButton/ScrollButton';
import { Task } from '../../../common/types';
import { getTasks } from '../../../services/ServerApiServices';
import { plantsContext } from '../../App/App';
import { userContxt } from '../../Authentication/UserContext';

function Tasks(): JSX.Element {
  const [currentMonth, setCurrentMonth] = useState<number>(0);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { myPlants } = useContext(plantsContext);
  const { user } = useContext(userContxt);

  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const nextMonth = (currentMonth + 1) % 12;

  useEffect(() => {
    getTasks().then((tasks: Task[]) => {
      const withUserTasks = [...tasks, ...user.userTasks];
      // filter tasks to those which are relevant to plants saved in myPlants database OR added manually
      const myTasks = withUserTasks.filter((task: Task) =>
        myPlants.some(plant => plant.name === task.crop || task.userCreated),
      );
      setTasks(myTasks);
    });
  }, [myPlants]);

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
          <MonthTasksBox
            setTasks={setTasks}
            tasks={tasks}
            monthNumber={lastMonth}
          />
        </div>
        <div className={`tasks__month tasks__month--${currentMonth}`}>
          <MonthTasksBox
            tasks={tasks}
            setTasks={setTasks}
            monthNumber={currentMonth}
          />
        </div>
        <div className={`tasks__month tasks__month--${nextMonth}`}>
          <MonthTasksBox
            setTasks={setTasks}
            tasks={tasks}
            monthNumber={nextMonth}
          />
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
