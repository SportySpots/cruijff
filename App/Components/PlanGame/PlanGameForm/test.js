import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import moment from 'moment';
import MockDate from 'mockdate';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import { createMockClient, ApolloMockProvider } from '../../../GraphQL';
import PlanGameForm from '.';

const mockMonth = 10; // november
const mockYear = 2018;
const mockDate = 1;

const validSport = 'SOCCER';
let validDate;
let validTime;
const validDuration = 120;
const validCapacity = 12;
const someErrorMsg = 'Some error msg';

const INIT_STATE = {
  curSlide: 0,
  sport: null,
  date: null,
  time: null,
  duration: 90,
  capacity: null,
  spot: null,
  title: I18n.t('titleDescriptionSlide.fields.title.defaultValue'),
  description: '',
  errors: {
    sport: [],
    date: [],
    time: [],
    title: [],
    description: [],
  },
};

describe('PlanGameForm', () => {
  let spots;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_SPOTS,
      variables: { limit: 1 },
    });
    spots = res.data.spots; // eslint-disable-line prefer-destructuring
  });

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
        <PlanGameForm />
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('holds the expected initial state on first render', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    expect(wrapper.instance().state).toMatchObject(INIT_STATE);
  });

  it('disables next btn on initial render', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    expect(wrapper.instance().disableNext).toBe(true);
  });

  it('enables next btn after sport, date and time field are set', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({
      sport: validSport,
      date: validDate,
      time: validTime,
    });

    expect(wrapper.instance().disableNext).toBe(false);
  });

  it('increments curSlide index after sport, date and time field are set and handleNext is fired', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({
      sport: validSport,
      date: validDate,
      time: validTime,
    });

    wrapper.instance().handleNext();

    expect(wrapper.instance().state.curSlide).toBe(1);
  });

  it('disables next btn on SpotSlide on initial render', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 1 });

    expect(wrapper.instance().disableNext).toBe(true);
  });

  it('enables next btn on SpotSlide after spot is set', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 1 });

    wrapper.instance().setState({ spot: spots[0] });

    expect(wrapper.instance().disableNext).toBe(false);
  });

  it('increments curSlide index after spot field is set and handleNext is fired', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 1 });

    wrapper.instance().setState({ spot: spots[0] });

    wrapper.instance().handleNext();

    expect(wrapper.instance().state.curSlide).toBe(2);
  });

  it('enables next btn on TitleDescriptionSlide on initial render', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 2 });

    expect(wrapper.instance().disableNext).toBe(false);
  });

  it('disabled next btn on TitleDescriptionSlide if title is unset', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 2 });

    wrapper.instance().setState({ title: '' });

    expect(wrapper.instance().disableNext).toBe(true);
  });

  it('increments curSlide index after spot field is set and handleNext is fired', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 1 });

    wrapper.instance().setState({ spot: spots[0] });

    wrapper.instance().handleNext();

    expect(wrapper.instance().state.curSlide).toBe(2);
  });

  it('decrements curSlide index when calling handleBack', () => {
    const wrapper = shallow(<PlanGameForm username="username" />);

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({ curSlide: 2 });

    expect(wrapper.instance().state.curSlide).toBe(2);

    wrapper.instance().handleBack();

    expect(wrapper.instance().state.curSlide).toBe(1);

    wrapper.instance().handleBack();

    expect(wrapper.instance().state.curSlide).toBe(0);

    // Attempt to go back after reaching curSlide = 0
    wrapper.instance().handleBack();

    expect(wrapper.instance().state.curSlide).toBe(0);
  });

  it('aborts form submission if onBeforeHook throws', () => {
    const handleBefore = jest.fn().mockImplementation(() => { throw new Error(); });
    const handleClientCancel = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <PlanGameForm
        username="username"
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({
      curSlide: 2,
      sport: validSport,
      date: validDate,
      time: validTime,
      spot: spots[0],
    });

    wrapper.instance().handleNext();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).toBeCalled();
    expect(handleSuccess).not.toBeCalled();
  });

  it('calls onSuccessHook when sport, date, time, spot and title are provided', () => {
    const handleBefore = jest.fn();
    const handleClientCancel = jest.fn();
    const handleClientError = jest.fn();
    const handleSuccess = jest.fn();

    const wrapper = shallow(
      <PlanGameForm
        username="username"
        onBeforeHook={handleBefore}
        onClientCancelHook={handleClientCancel}
        onClientErrorHook={handleClientError}
        onSuccessHook={handleSuccess}
      />,
    );

    // Sanity check
    expect(wrapper.instance().state).toMatchObject(INIT_STATE);

    wrapper.instance().setState({
      curSlide: 2,
      sport: validSport,
      date: validDate,
      time: validTime,
      spot: spots[0],
    });

    wrapper.instance().handleNext();

    expect(handleBefore).toBeCalled();
    expect(handleClientCancel).not.toBeCalled();
    expect(handleSuccess).toBeCalledWith(
      expect.objectContaining({
        sport: validSport,
        date: validDate,
        time: validTime,
        spot: spots[0],
      }),
    );
  });
});
