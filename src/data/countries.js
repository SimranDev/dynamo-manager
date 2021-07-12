import {Image} from 'react-native';
import React from 'react';

export const countries = [
  {
    label: 'Brazil',
    value: 'Brazil',
    icon: () => <Image source={require('../assets/icons/br.webp')} />,
  },
  {
    label: 'France',
    value: 'France',
    icon: () => <Image source={require('../assets/icons/fr.webp')} />,
  },
  {
    label: 'India',
    value: 'India',
    icon: () => <Image source={require('../assets/icons/in.webp')} />,
  },
  {
    label: 'Turkey',
    value: 'Turkey',
    icon: () => <Image source={require('../assets/icons/tr.webp')} />,
  },
  {
    label: 'USA',
    value: 'USA',
    icon: () => <Image source={require('../assets/icons/us.webp')} />,
  },
];
