import React from 'react';
import Signup from '../components/Signup'; // Adjust the import path to where your component is located

export default {
  title: 'Components/Signup',
  component: Signup
};

const Template = (args) => <Signup {...args} />;

export const Default = Template.bind({});
Default.args = {};
