import Geocoder from 'react-native-geocoding';
import {IAddress, IGeo} from '../api/user/user.type.ts';
import {useEffect, useState} from 'react';
import {GEOCODER_API_KEY} from '../config/google.ts';

Geocoder.init(GEOCODER_API_KEY, {language: 'en'});

export const useGeoByAddress = (address: IAddress | undefined) => {
  const [geo, setGeo] = useState<IGeo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (address !== undefined) {
      setLoading(true);
      Geocoder.from(
        `${address.city} ${address.suite} ${address.street} ${address.zipcode}`,
      )
        .then(json => {
          setGeo(json.results[0].geometry.location);
        })
        .catch(() => {
          setGeo(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [address]);

  return {geo, loading};
};
