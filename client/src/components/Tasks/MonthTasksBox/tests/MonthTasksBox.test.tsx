import React from 'react';
import renderer from 'react-test-renderer';
import MonthTasksBox from '../MonthTasksBox';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { getSeason } from '../getSeasonFunction';
import mocks from './mocks';

let container: Element;

describe('MonthTasksBox tests', () => {
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
    test('month season description', () => {
      const monthName = 'January';
      const monthNumber = 1;
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
});

export {};
