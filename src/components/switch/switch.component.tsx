import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {TextComponent} from '../text/text.component.tsx';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {IItem, IItems, ISwitchComponentCallback} from './switch.type.ts';

interface SwitchComponentProps<T> {
  items: IItems<T>;
  onChange: ISwitchComponentCallback<T>;
}

export const SwitchComponent = <T,>({
  items,
  onChange,
}: SwitchComponentProps<T>) => {
  const {tw} = useTailWind();

  const [activeItem, setActiveItem] = useState<IItem<T> | undefined>();

  useEffect(() => {
    onChange(activeItem);
  }, [activeItem, onChange]);

  useEffect(() => {
    items.forEach(item => {
      if (item.default === true) {
        onChange(item);
        setActiveItem(item);
      }
    });
  }, [items, onChange]);

  return (
    <View style={tw`flex flex-row gap-2 w-full`}>
      {items.map(item => (
        <TouchableOpacity
          style={tw`${
            item === activeItem ? 'bg-base-1' : 'bg-base-2'
          } flex-grow rounded-sm flex-1 flex-row items-center justify-center border border-base-3 p-2`}
          onPress={() => setActiveItem(item)}
          key={item.key}
          disabled={item?.available === false || item?.loading === true}
          activeOpacity={0.8}>
          {item.loading ? (
            <ActivityIndicator size="small" />
          ) : (
            <TextComponent
              style={tw`${
                item === activeItem ? 'text-base-2' : 'text-base-1'
              } text-center`}>
              {item.label}
            </TextComponent>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
