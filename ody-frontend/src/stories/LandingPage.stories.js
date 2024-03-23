import React from 'react';
import LandingPage from '../components/LandingPage'; // Adjust the import path to where your component is located

export default {
  title: 'Components/LandingPage',
  component: LandingPage
};

const Template = (args) => <LandingPage {...args} />;

export const Default = Template.bind({});
