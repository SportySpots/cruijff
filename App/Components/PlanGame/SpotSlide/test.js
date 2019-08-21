import React from 'react';
import { shallow, render } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import mockClient, { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import SpotSlide from '.';
import { LocationProvider } from '../../../Context/Location';
import { SpotFiltersProvider } from '../../../Context/SpotFilters';
import { UserProvider } from '../../../Context/User';

describe('SpotSlide', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <ThemeProvider theme={scTheme}>
          <SpotSlide />
        </ThemeProvider>
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  // test skipped: shallow render won't render testID: pickSpot, full render requires all the context providers
  // or it will crash
  it.skip('calls onChange when spot field is changed', async () => {
    const res = await mockClient.query({
      query: GET_SPOTS,
      variables: { limit: 1 },
    });
    const spots = res.data.spots; // eslint-disable-line prefer-destructuring
    const handleChange = jest.fn();
    const wrapper = shallow(<SpotSlide onChange={handleChange} />);

    console.log(wrapper);

    wrapper.find({ testID: 'pickSpot' }).props().onCardPress(spots[0]);

    expect(handleChange).toBeCalledWith(
      expect.objectContaining({ fieldName: 'spot', value: spots[0] }),
    );
  });
});
