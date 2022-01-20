import React from 'react';
import renderer from 'react-test-renderer';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import mocks from './mocks';
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
    test('backend task display', async () => {
      act(() => {
        render(
          <TaskItem
            deleteThisTask={mockedProps.deleteThisTask}
            task={mocks.taskList[1]}
          />,
          container,
        );
      });

      expect(container.textContent).toContain(mocks.taskList[1]['task']);
      expect(container.textContent).toContain(mocks.taskList[1]['crop']);

      const deleteBtn = container.querySelector('.div1 button');
      expect(deleteBtn).toBeFalsy();
    });

    test('user created task display', async () => {
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

      const deleteBtn = container.querySelector('.div1 button');
      expect(deleteBtn).toBeTruthy();
    });
  });
});
