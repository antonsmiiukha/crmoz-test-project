import React, {memo, MutableRefObject} from 'react';
import {View} from 'react-native';
import MapView, {AnimatedRegion, Marker} from 'react-native-maps';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {LatLng, Region} from 'react-native-maps/lib/sharedTypes';

interface MapComponentProps {
  markerCoordinate: AnimatedRegion | undefined;
  mapRef: MutableRefObject<MapView | null> | undefined;
  initialRegion: Region;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  markerCoordinate,
  mapRef,
  initialRegion,
}) => {
  const {tw} = useTailWind();

  return (
    <View style={tw`w-full h-100`}>
      <MapView ref={mapRef} initialRegion={initialRegion} style={tw`flex-1`}>
        {/* According to the documentation, it should support this type */}
        <Marker.Animated coordinate={markerCoordinate as unknown as LatLng} />
      </MapView>
    </View>
  );
};

export const MapComponentMemoized = memo(MapComponent, () => true);
