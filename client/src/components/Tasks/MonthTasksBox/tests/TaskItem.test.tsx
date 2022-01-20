import React from 'react';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import mocks from '../../tests/mocks';
import TaskItem from '../../TaskItem/TaskItem';

describe('MonthTasksBox tests', () => {
  let container: Element;
  const mockedProps = {
    deleteThisTask: jest.fn(),
  };

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
        .create(
          <TaskItem
            deleteThisTask={mockedProps.deleteThisTask}
            task={mocks.taskList[0]}
          />,
        )
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
          <TaskItem
            deleteThisTask={mockedProps.deleteThisTask}
            task={mocks.taskList[0]}
          />,
          container,
        );
      });
      const pElement = container.querySelector('p');

      expect(pElement?.textContent).toBe(mocks.taskList[0]['task']);
    });
  });
});
