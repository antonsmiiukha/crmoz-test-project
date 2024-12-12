import {useEffect, useMemo, useRef, useState} from 'react';
import MapView, {AnimatedRegion} from 'react-native-maps';
import {IGeo, IUser} from '../api/user/user.type.ts';
import {
  AnimatedRegionTimingConfig,
  EMapMarkerVariant,
} from '../screen/user/user.type.ts';
import {Region} from 'react-native-maps/lib/sharedTypes';

interface MapProps {
  user: IUser | undefined;
  mapMarkerVariant: EMapMarkerVariant | undefined;
  geoByAddress: IGeo | undefined | null;
}

const DELTA = 30;
const MARKER_ANIMATION_TIME = 0;
const REGION_ANIMATION_TIME = 1000;

export const useMap = ({user, mapMarkerVariant, geoByAddress}: MapProps) => {
  const mapRef = useRef<MapView>(null);

  const [mapMarkerGeo, setMapMarkerGeo] = useState<IGeo | undefined>(undefined);

  useEffect(() => {
    if (mapMarkerVariant === EMapMarkerVariant.Address) {
      setMapMarkerGeo({
        lat: geoByAddress?.lat ?? 0,
        lng: geoByAddress?.lng ?? 0,
      });
    }
  }, [geoByAddress, mapMarkerVariant]);

  useEffect(() => {
    if (user && mapMarkerVariant === EMapMarkerVariant.Geo) {
      setMapMarkerGeo({
        lat: user.address.geo.lat,
        lng: user.address.geo.lng,
      });
    }
  }, [user, mapMarkerVariant]);

  const initialRegion: Region = useMemo(() => {
    return {
      latitude: user?.address.geo.lat ?? 0,
      longitude: user?.address.geo.lng ?? 0,
      latitudeDelta: DELTA,
      longitudeDelta: DELTA,
    };
  }, [user]);

  const markerCoordinate = useRef(new AnimatedRegion(initialRegion)).current;

  useEffect(() => {
    if (mapMarkerGeo) {
      const animationConfig: AnimatedRegionTimingConfig = {
        latitude: mapMarkerGeo.lat,
        longitude: mapMarkerGeo.lng,
        latitudeDelta: DELTA,
        longitudeDelta: DELTA,
        duration: MARKER_ANIMATION_TIME,
        useNativeDriver: false,
      };

      // @ts-ignore
      // Property toValue is missing in type AnimatedRegionTimingConfig but required in type TimingAnimationConfig - For some reason. But it is not. This prop is not required
      const animation = markerCoordinate.timing(animationConfig);
      animation.start();

      return () => {
        animation.stop();
      };
    }
  }, [mapMarkerGeo, markerCoordinate]);

  useEffect(() => {
    if (mapMarkerGeo) {
      mapRef.current?.animateToRegion(
        {
          latitude: mapMarkerGeo.lat,
          longitude: mapMarkerGeo.lng,
          latitudeDelta: DELTA,
          longitudeDelta: DELTA,
        },
        REGION_ANIMATION_TIME,
      );
    }
  }, [mapMarkerGeo]);

  return {
    mapRef,
    markerCoordinate,
    initialRegion,
  };
};
