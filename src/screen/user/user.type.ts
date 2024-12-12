export type AnimatedRegionTimingConfig = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
  duration: number;
  useNativeDriver: boolean;
}

export enum EMapMarkerVariant {
  Address = 'address',
  Geo = 'geo',
}
