import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components/native';
import cloneDeep from 'lodash/cloneDeep';
import I18n from '../../../I18n';
import { ApolloMockProvider } from '../../../GraphQL/ApolloMockClient';
import scTheme from '../../../Themes/scTheme'; // styled-components theme
import TitleDescriptionSlide, {
  TITLE_MAX_CHARS,
  DESCRIPTION_MAX_CHARS,
  INIT_ERRORS,
} from '.';

const errorMsg = 'Some error msg';
const validText = 'Some text';
const longTitle = new Array(TITLE_MAX_CHARS + 2).join('a'); // aaaaa... length = TITLE_MAX_CHARS + 1
const longDescription = new Array(DESCRIPTION_MAX_CHARS + 2).join('a'); // aaaaa... length = DESCRIPTION_MAX_CHARS + 1
const someErrorMsg = 'Some error msg';

describe('TitleDescriptionSlide', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(
      <ApolloMockProvider>
        <ThemeProvider theme={scTheme}>
          <TitleDescriptionSlide />
        </ThemeProvider>
      </ApolloMockProvider>,
    ).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('displays error msg on the correct input field', () => {
    ['title', 'description'].forEach((fieldName) => {
      const wrapper = shallow(
        <TitleDescriptionSlide
          errors={{
            ...cloneDeep(INIT_ERRORS),
            [fieldName]: [errorMsg],
          }}
        />,
      );

      expect(wrapper.find({ testID: fieldName }).props().error).toBe(I18n.t(errorMsg));
    });
  });

  it('calls onChange when title or description field is changed', () => {
    ['title', 'description'].forEach((fieldName) => {
      const handleChange = jest.fn();
      const wrapper = shallow(<TitleDescriptionSlide onChange={handleChange} />);

      wrapper.find({ testID: fieldName }).props().onChangeText(validText);

      expect(handleChange).toBeCalledWith(
        expect.objectContaining({ fieldName, value: validText }),
      );
    });
  });

  it('renders errors props', () => {
    [
      { fieldName: 'title', testID: 'title' },
      { fieldName: 'description', testID: 'description' },
    ].forEach(({ fieldName, testID }) => {
      const wrapper = shallow(<TitleDescriptionSlide />);
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

  it('errors when form is submitted without title', () => {
    const errors = TitleDescriptionSlide.validateFields({ title: '', description: validText });

    expect(errors.title).toEqual(
      expect.arrayContaining([I18n.t('titleDescriptionSlide.fields.title.errors.required')]),
    );
  });

  it('errors when form is submitted with title or description > MAX_CHARS', () => {
    const args = {
      title: longTitle,
      description: longDescription,
    };
    const errors = TitleDescriptionSlide.validateFields(args);

    expect(errors.title).toEqual(
      expect.arrayContaining([I18n.t('titleDescriptionSlide.fields.title.errors.tooLong')]),
    );
    expect(errors.description).toEqual(
      expect.arrayContaining([I18n.t('titleDescriptionSlide.fields.description.errors.tooLong')]),
    );
  });
});
