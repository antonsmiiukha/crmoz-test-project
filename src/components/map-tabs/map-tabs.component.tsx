import React, {ReactNode, useCallback} from 'react';
import {IAddress, IGeo} from '../../api/user/user.type.ts';
import {useWindowDimensions, View} from 'react-native';
import {SceneRendererProps, TabView} from 'react-native-tab-view';
import {TextComponent} from '../text/text.component.tsx';
import {useGeoByAddress} from '../../hook/geo-by-address.hook.ts';
import {MapComponent} from '../map/map.component.tsx';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {TabHeaderComponent} from './tab-header.component.tsx';
import {WarningIcon} from '../../icons/warning.icon.tsx';

interface MapTabsComponentProps {
  address: IAddress;
}

enum EMapVariant {
  Address = 'address',
  Geo = 'geo',
}

interface ITab {
  key: string;
  title: string;
}

type ITabs = Array<ITab>;

const routes: ITabs = [
  {key: EMapVariant.Address, title: 'Address'},
  {key: EMapVariant.Geo, title: 'Geo location'},
];

const geoPlaceholder: IGeo = {lat: 0, lng: 0};

export const MapTabsComponent: React.FC<MapTabsComponentProps> = ({
  address,
}) => {
  const {tw} = useTailWind();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState<number>(0);
  const {geoByAddress} = useGeoByAddress(address);

  const renderScene = useCallback<
    (
      props: SceneRendererProps & {
        route: ITab;
      },
    ) => ReactNode
  >(
    ({route}) => {
      switch (route.key) {
        case EMapVariant.Address:
          return <MapComponent geo={geoByAddress ?? geoPlaceholder} />;
        case EMapVariant.Geo:
          return <MapComponent geo={address.geo} />;
      }
      return <TextComponent>{route.key}</TextComponent>;
    },
    [address.geo, geoByAddress],
  );

  return (
    <View style={tw`flex flex-col gap-2 w-full`}>
      {geoByAddress === null && (
        <View
          style={tw`flex flex-row flex-grow w-full gap-1 items-center px-2`}>
          <View style={tw`w-5 h-5`}>
            <WarningIcon />
          </View>
          <TextComponent style={tw`text-xs`}>
            We could not find the location of the user by address
          </TextComponent>
        </View>
      )}
      <TabView
        renderTabBar={TabHeaderComponent}
        style={tw`h-100`}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width, height: 100}}
      />
    </View>
  );
};
