import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Tag from '.';

const text = 'Football';

storiesOf('Common.Tag', module)
  .add('Tag success', () => (
    <Tag status="success" value={text} />
  ))
  .add('Tag error', () => (
    <Tag status="error" value={text} />
  ))
  .add('Tag warning', () => (
    <Tag status="warning" value={text} />
  ))
  .add('Tag info', () => (
    <Tag status="info" value={text} />
  ))
  .add('Tag info long text', () => (
    <Tag status="info" value={`${text} ${text} ${text} ${text} ${text}`} />
  ));
