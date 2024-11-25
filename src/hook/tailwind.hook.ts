import {useContext} from 'react';
import {TwContext} from '../context/tailwind/tailwind.context.tsx';

export const useTailWind = () => {
  return useContext(TwContext);
};
