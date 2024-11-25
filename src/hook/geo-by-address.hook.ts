import Geocoder from 'react-native-geocoding';
import {IAddress, IGeo} from '../api/user/user.type.ts';
import {useEffect, useState} from 'react';
import {GEOCODER_API_KEY} from '../config/google.ts';

Geocoder.init(GEOCODER_API_KEY);

export const useGeoByAddress = (address: IAddress | undefined) => {
  const [geo, setGeo] = useState<IGeo | null | undefined>(undefined);

  useEffect(() => {
    if (address !== undefined) {
      Geocoder.from(
        `${address.city} ${address.suite} ${address.street} ${address.zipcode}`,
      )
        .then(json => {
          setGeo(json.results[0].geometry.location);
        })
        .catch(() => {
          setGeo(null);
        });
    }
  }, [address]);

  return {geoByAddress: geo};
};
