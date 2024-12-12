import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {UserComponent} from '../../components/user/user.component.tsx';
import {IUser, IUserRequest, IUserResponse} from '../../api/user/user.type.ts';

import {useApi} from '../../hook/api.hook.ts';
import {ERequestName} from '../../api/api.ts';
import {useGeoByAddress} from '../../hook/geo-by-address.hook.ts';
import {
  EPrimaryNavigationList,
  PrimaryNavigationStackProps,
} from '../../navigation/primary-navigation.type.ts';
import {LoadingComponent} from '../../components/loading/loading.component.tsx';
import {EMapMarkerVariant} from './user.type.ts';
import {useMap} from '../../hook/map.hook.ts';
import {
  IItems,
  ISwitchComponentCallback,
} from '../../components/switch/switch.type.ts';

export const UserScreen: React.FC<
  PrimaryNavigationStackProps<EPrimaryNavigationList.User>
> = ({
  route: {
    params: {userId},
  },
}) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const userRequest = useMemo<IUserRequest>(() => {
    return {
      userId: userId,
    };
  }, [userId]);

  const {
    data: userResponse,
    loading: userLoading,
    code: userResponseCode,
  } = useApi<IUserRequest, IUserResponse>(ERequestName.User, userRequest);

  useEffect(() => {
    if (userResponse) {
      setUser({
        ...userResponse,
        address: {
          ...userResponse.address,
          geo: {
            lat: parseFloat(userResponse.address.geo.lat),
            lng: parseFloat(userResponse.address.geo.lat),
          },
        },
      });
    }
  }, [userResponse]);

  const {geo: geoByAddress, loading: geoByAddressLoading} = useGeoByAddress(
    user?.address,
  );

  const [mapMarkerVariant, setMapMarkerVariant] = useState<
    EMapMarkerVariant | undefined
  >(undefined);

  useEffect(() => {
    setMapMarkerVariant(user && EMapMarkerVariant.Geo);
  }, [user]);

  const addressVariants = useMemo<IItems<EMapMarkerVariant>>(
    () => [
      {
        label: 'User geo location',
        value: EMapMarkerVariant.Geo,
        loading: false,
        available: true,
        default: true,
        key: 1,
      },
      {
        label: geoByAddress ? 'User address' : 'User address not available',
        value: EMapMarkerVariant.Address,
        available: geoByAddress !== null,
        loading: geoByAddressLoading,
        key: 2,
      },
    ],
    [geoByAddress, geoByAddressLoading],
  );

  const onChangeAddressVariant = useCallback<
    ISwitchComponentCallback<EMapMarkerVariant>
  >(
    item => {
      if (item !== undefined) {
        setMapMarkerVariant(item.value);
      }
    },
    [setMapMarkerVariant],
  );

  const {mapRef, markerCoordinate, initialRegion} = useMap({
    user: user,
    mapMarkerVariant: mapMarkerVariant,
    geoByAddress: geoByAddress,
  });

  if (!user || userResponseCode !== 200 || userLoading) {
    return <LoadingComponent />;
  }

  return (
    <UserComponent
      user={user}
      addressVariants={addressVariants}
      onChangeAddressVariant={onChangeAddressVariant}
      mapRef={mapRef}
      markerCoordinate={markerCoordinate}
      initialRegion={initialRegion}
    />
  );
};
