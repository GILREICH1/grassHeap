import React from 'react';
import renderer from 'react-test-renderer';
import MonthTasksBox from '../MonthTasksBox';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { getSeason } from '../getSeasonFunction';
import mocks from './mocks';

describe('MonthTasksBox tests', () => {
  let container: Element;
  const monthName = 'January';
  const monthNumber = 1;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
    }
  });

  describe('layout', () => {
    test('snapshot', () => {
      const tree = renderer
        .create(<MonthTasksBox monthName="January" monthNumber={1} />)
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('props', () => {
    test('no tasks', async () => {
      jest.mock('../../../../services/ServerApiServices', () => {
        const getTasksByMonth = jest.fn(() => Promise.resolve([]));

        const deleteTask = jest.fn();
        return { getTasksByMonth, deleteTask };
      });

      act(() => {
        render(
          <MonthTasksBox monthName={monthName} monthNumber={monthNumber} />,
          container,
        );
      });
      const pElement = container.querySelector('p');

      expect(pElement?.textContent).toBe(
        'No tasks for your plants this month!',
      );
    });

    // TODO mock plants && user context
    //   test('tasks', async () => {
    //     jest.mock('../../../../services/ServerApiServices', () => {
    //       const getTasksByMonth = async () => mocks.taskList;

    //       const deleteTask = jest.fn();
    //       return { getTasksByMonth, deleteTask };
    //     });

    //     act(() => {
    //       render(
    //         <MonthTasksBox monthName={monthName} monthNumber={monthNumber} />,
    //         container,
    //       );
    //     });

    //     // expect(container.querySelector("p").textContent).toBe();
    //     expect(container.textContent).toContain(mocks.taskList[0]['task']);
    //   });
  });

  test('renders month season description', () => {
    act(() => {
      render(
        <MonthTasksBox monthName={monthName} monthNumber={monthNumber} />,
        container,
      );
    });

    const seasonEmoji = getSeason(monthNumber);
    const h2Content = container.querySelector('h2');
    expect(h2Content).toBeTruthy();
    expect(h2Content?.textContent).toBe(`${monthName} ${seasonEmoji}`);
  });
});
