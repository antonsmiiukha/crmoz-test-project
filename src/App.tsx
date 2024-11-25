import React from 'react';
import {PrimaryNavigation} from './navigation/primary.navigation.tsx';
import {TailwindContextProvider} from './context/tailwind/tailwind.context.tsx';

export const App: React.FC = () => {
  return (
    <TailwindContextProvider>
      <PrimaryNavigation />
    </TailwindContextProvider>
  );
};
