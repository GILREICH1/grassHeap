import React from 'react';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import mocks from './mocks';
import TaskList from '../../TaskList/TaskList';

describe('MonthTasksBox tests', () => {
  let container: Element;
  const mockedProps = {
    deleteThisTask: jest.fn(),
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      unmountComponentAtNode(container);
      container.remove();
    }
  });

  describe('layout', () => {
    test('snapshot without tasks', () => {
      const tree = renderer
        .create(
          <TaskList deleteThisTask={mockedProps.deleteThisTask} tasks={[]} />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('snapshot with tasks', () => {
      const tree = renderer
        .create(
          <TaskList
            deleteThisTask={mockedProps.deleteThisTask}
            tasks={mocks.taskList}
          />,
        )
        .toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('props', () => {
    test('no tasks', async () => {
      act(() => {
        render(
          <TaskList deleteThisTask={mockedProps.deleteThisTask} tasks={[]} />,
          container,
        );
      });

      expect(container?.textContent).toBe(
        'No tasks for your plants this month!',
      );
    });
  });
});
