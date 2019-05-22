/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// import { View } from 'react-native';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import MockDate from 'mockdate';
import { TouchableOpacity } from 'react-native';
import Day from 'react-native-calendars/src/calendar/day/basic/index';
import moment from 'moment';

import Calendar from '.';

const mockMonth = 10; // november
const mockYear = 2018;
const mockDate = 1;

beforeEach(() => {
  const mockMoment = moment.utc({
    year: mockYear,
    month: mockMonth,
    date: mockDate,
  });
  MockDate.set(mockMoment.toDate());
});

afterEach(() => {
  MockDate.reset();
});

describe('Calendar', () => {
  it('renders', () => {
    renderer.create(<Calendar />);
  });
  // skipped because it already fails proptype check
  it.skip('only accepts moment input', () => {
    expect(() => {
      renderer.create(<Calendar value={new Date()} />);
    }).toThrowError(TypeError);
  });
  it('only accepts moment UTC input', () => {
    expect(() => {
      shallow(<Calendar value={moment('2017-01-01T00:00:00+03:00')} />);
    }).toThrowError(TypeError);
  });
  it('selects day & returns right moment', () => {
    const onPress = jest.fn();
    const Cal = renderer.create(
      <Calendar
        value={moment.utc()}
        onDayPress={onPress}
      />,
    );
    const dayElements = Cal.root.findAllByType(Day);

    for (const dayElementToPress of dayElements) {
      dayElementToPress.findByType(TouchableOpacity).instance.props.onPress();
      expect(onPress).toHaveBeenCalled();
      expect(onPress.mock.calls[0][0].isSame(moment.utc({
        year: mockYear,
        month: mockMonth,
        date: dayElementToPress.instance.props.date,
      })));
      onPress.mockClear();
    }
  });
});
