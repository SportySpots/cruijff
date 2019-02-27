import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import { createMockClient, ApolloMockProvider } from '../../../GraphQL';
import SpotSlide from '.';

describe('SpotSlide', () => {
  let spots;

  beforeAll(async () => {
    const mockClient = createMockClient();
    const res = await mockClient.query({
      query: GET_SPOTS,
      variables: { limit: 1 },
    });
    spots = res.data.spots; // eslint-disable-line prefer-destructuring
  });

  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <SpotSlide />
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('calls onChange when spot field is changed', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(<SpotSlide onChange={handleChange} />);

    wrapper.find({ testID: 'pickSpot' }).props().onCardPress(spots[0]);

    expect(handleChange).toBeCalledWith(
      expect.objectContaining({ fieldName: 'spot', value: spots[0] }),
    );
  });
});
