import React, {useMemo} from 'react';
import {IGeo} from '../../api/user/user.type.ts';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useTailWind} from '../../hook/tailwind.hook.ts';

interface MapComponentProps {
  geo: IGeo;
}

export const MapComponent: React.FC<MapComponentProps> = ({geo}) => {
  const {tw} = useTailWind();

  const region = useMemo(() => {
    return {
      latitude: parseFloat(geo.lat),
      longitude: parseFloat(geo.lng),
      latitudeDelta: 30,
      longitudeDelta: 30,
    };
  }, [geo]);

  return (
    <View style={tw`w-full h-100`}>
      <MapView region={region} style={tw`h-full w-full`}>
        <Marker
          style={tw`w-full h-full`}
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>
    </View>
  );
};
