import React from 'react';
import FloatingLabelInput from '../components/FloatingLabelInput'; // Adjust the import path to where your component is located

export default {
  title: 'Components/FloatingLabelInput',
  component: FloatingLabelInput,
  argTypes: {
    label: { control: 'text' },
    type: { control: { type: 'select', options: ['text', 'password', 'email'] } }
  }
};

const Template = (args) => <FloatingLabelInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  type: 'text',
  value: '',
  onChange: () => {}
};

export const WithValue = Template.bind({});
WithValue.args = {
  label: 'Password',
  type: 'password',
  value: 'SecretPass',
  onChange: () => {}
};
