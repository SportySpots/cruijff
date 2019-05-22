import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import moment from 'moment';
import MockDate from 'mockdate';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import SportDateTimeSlide, { INIT_ERRORS } from '.';

const mockMonth = 10; // november
const mockYear = 2018;
const mockDate = 1;

const validSport = 'SOCCER';
const mockSport = {
  uuid: '1234',
  id: 123,
  name: 'Soccer',
  category: 'SOCCER',
};
let validDate;
let validTime;
const validDuration = 120;
const validCapacity = 12;
const someErrorMsg = 'Some error msg';

describe('SportDateTimeSlide', () => {
  beforeEach(() => {
    const mockMoment = moment.utc({
      year: mockYear,
      month: mockMonth,
      date: mockDate,
    });
    MockDate.set(mockMoment.toDate());

    validDate = moment.utc();
    validTime = moment.utc().clone().add(1, 'hours');
  });

  afterEach(() => {
    MockDate.reset();
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <ThemeProvider theme={scTheme}>
          <SportDateTimeSlide />
        </ThemeProvider>
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('displays error msg on the correct input field', () => {
    [
      {
        fieldName: 'sport',
        testID: 'pickSport',
      },
      {
        fieldName: 'date',
        testID: 'pickDate',
      },
      {
        fieldName: 'time',
        testID: 'pickTime',
      },
    ].forEach(({ fieldName, testID }) => {
      const errorMsg = 'Some error msg';

      const wrapper = shallow(
        <SportDateTimeSlide errors={{ ...cloneDeep(INIT_ERRORS), [fieldName]: [errorMsg] }} />,
      );

      expect(wrapper.find({ testID }).props().error).toBe(I18n.t(errorMsg));
    });
  });

  it('calls onChange when sport, date, time, duration or capacity field is changed', () => {
    [
      {
        fieldName: 'sport',
        testID: 'pickSport',
        value: mockSport,
      },
      {
        fieldName: 'date',
        testID: 'pickDate',
        value: validDate,
      },
      {
        fieldName: 'time',
        testID: 'pickTime',
        value: validTime,
      },
      {
        fieldName: 'duration',
        testID: 'pickDuration',
        value: validDuration,
      },
      {
        fieldName: 'capacity',
        testID: 'pickCapacity',
        value: validCapacity,
      },
    ].forEach(({ fieldName, testID, value }) => {
      const handleChange = jest.fn();
      const wrapper = shallow(<SportDateTimeSlide onChange={handleChange} />);

      wrapper.find({ testID }).props().onChange(value);

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({ fieldName, value }),
      );
    });
  });

  it('renders errors props', () => {
    [
      { fieldName: 'sport', testID: 'pickSport' },
      { fieldName: 'date', testID: 'pickDate' },
      { fieldName: 'time', testID: 'pickTime' },
      // { fieldName: 'duration', testID: 'pickDuration' },
      // { fieldName: 'capacity', testID: 'pickCapacity' },
    ].forEach(({ fieldName, testID }) => {
      const wrapper = shallow(<SportDateTimeSlide />);
      expect(wrapper.find({ testID }).props().error).toBe('');
      wrapper.setProps({
        errors: {
          ...cloneDeep(INIT_ERRORS),
          [fieldName]: [someErrorMsg],
        },
      });
      expect(wrapper.find({ testID }).props().error).toBe(someErrorMsg);
    });
  });

  it('errors when form is submitted without sport, date or time', () => {
    [
      {
        fieldName: 'sport',
        sport: '',
        date: validDate,
        time: validTime,
        errorMsg: 'sportDateTimeSlide.fields.sport.errors.required',
      },
      {
        fieldName: 'date',
        sport: mockSport,
        date: '',
        time: validTime,
        errorMsg: 'sportDateTimeSlide.fields.date.errors.required',
      },
      {
        fieldName: 'time',
        sport: mockSport,
        date: validDate,
        time: '',
        errorMsg: 'sportDateTimeSlide.fields.time.errors.required',
      },
    ].forEach(({
      fieldName,
      sport,
      date,
      time,
      errorMsg,
    }) => {
      const errors = SportDateTimeSlide.validateFields({ sport, date, time });

      expect(errors[fieldName]).toEqual(
        expect.arrayContaining([I18n.t(errorMsg)]),
      );
    });
  });

  it('errors when form is submitted with past date-time', () => {
    const args = {
      sport: mockSport,
      date: validDate.clone().subtract(1, 'days'),
      time: validTime,
    };
    const errors = SportDateTimeSlide.validateFields(args);

    expect(errors.time).toEqual(
      expect.arrayContaining([I18n.t('sportDateTimeSlide.fields.time.errors.pastDateTime')]),
    );
  });

  it('errors when form is submitted with past date-time sooner than 15 min from now', () => {
    const args = {
      sport: mockSport,
      date: validDate,
      time: validTime.clone().subtract(45, 'minutes'),
    };
    const errors = SportDateTimeSlide.validateFields(args);

    expect(errors.time).toEqual(
      expect.arrayContaining([I18n.t('sportDateTimeSlide.fields.time.errors.tooSoon')]),
    );
  });
});
