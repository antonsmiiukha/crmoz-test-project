import React, {MutableRefObject} from 'react';
import {IUser} from '../../api/user/user.type.ts';
import {ScrollView, View} from 'react-native';
import {ScreenComponent} from '../screen/screen.component.tsx';
import {useTailWind} from '../../hook/tailwind.hook.ts';
import {TextComponent} from '../text/text.component.tsx';
import {MapComponentMemoized} from '../map/map.component.tsx';
import {SwitchComponent} from '../switch/switch.component.tsx';
import MapView, {AnimatedRegion} from 'react-native-maps';
import {Region} from 'react-native-maps';
import {EMapMarkerVariant} from '../../screen/user/user.type.ts';
import {IItems, ISwitchComponentCallback} from '../switch/switch.type.ts';

interface UserComponentProps {
  user: IUser;
  addressVariants: IItems<EMapMarkerVariant>;
  onChangeAddressVariant: ISwitchComponentCallback<EMapMarkerVariant>;
  markerCoordinate: AnimatedRegion | undefined;
  mapRef: MutableRefObject<MapView | null> | undefined;
  initialRegion: Region;
}

export const UserComponent: React.FC<UserComponentProps> = ({
  user,
  addressVariants,
  onChangeAddressVariant,
  markerCoordinate,
  mapRef,
  initialRegion,
}) => {
  const {tw} = useTailWind();

  return (
    <ScreenComponent>
      <ScrollView>
        <View style={tw`flex flex-col gap-2`}>
          <TextComponent style={tw`text-xl font-bold`}>User card</TextComponent>
          <View style={tw`flex flex-col gap-1`}>
            <TextComponent>ID: {user.id}</TextComponent>
            <TextComponent>Name: {user.name}</TextComponent>
            <TextComponent>Username: {user.username}</TextComponent>
            <TextComponent>Email: {user.email}</TextComponent>
            <TextComponent>Phone: {user.phone}</TextComponent>
            <TextComponent>Website: {user.website}</TextComponent>
            <View style={tw`flex flex-col gap-1`}>
              <TextComponent>Address:</TextComponent>
              <View style={tw`flex flex-col gap-0.5 pl-1`}>
                <TextComponent>Street: {user.address.street}</TextComponent>
                <TextComponent>Suite: {user.address.suite}</TextComponent>
                <TextComponent>City: {user.address.city}</TextComponent>
                <TextComponent>Zipcode: {user.address.zipcode}</TextComponent>
              </View>
            </View>
            <View style={tw`flex flex-col gap-1`}>
              <TextComponent>Company:</TextComponent>
              <View style={tw`flex flex-col gap-0.5 pl-1`}>
                <TextComponent>Street: {user.company.name}</TextComponent>
                <TextComponent>
                  catchPhrase: {user.company.catchPhrase}
                </TextComponent>
                <TextComponent>bs: {user.company.bs}</TextComponent>
              </View>
            </View>
          </View>
          <SwitchComponent<EMapMarkerVariant>
            items={addressVariants}
            onChange={onChangeAddressVariant}
          />
          <MapComponentMemoized
            mapRef={mapRef}
            markerCoordinate={markerCoordinate}
            initialRegion={initialRegion}
          />
        </View>
      </ScrollView>
    </ScreenComponent>
  );
};
