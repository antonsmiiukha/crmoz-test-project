import {create, TailwindFn} from 'twrnc';
import React, {createContext, PropsWithChildren, useMemo} from 'react';
import {twConfig} from '../../utils/theme.tw.ts';

type ITailWindContext = {tw: TailwindFn};

export const TwContext = createContext<ITailWindContext>({
  tw: create(),
});

export const TailwindContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const tw = useMemo<TailwindFn>(() => {
    return create(twConfig);
  }, []);

  return (
    <TwContext.Provider
      value={{
        tw: tw,
      }}>
      {children}
    </TwContext.Provider>
  );
};
