import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export const PERMISSION_DENIED = 'location-permission:denied';

export class LocationService {
  public async getLocation() {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      const { status: askStatus } = await Permissions.askAsync(
        Permissions.LOCATION,
      );
      if (askStatus !== 'granted') {
        throw new Error(PERMISSION_DENIED);
      }
    }
    const { coords } = await Location.getCurrentPositionAsync({ accuracy: 3 });
    const { latitude, longitude } = coords;
    return {
      latitude,
      longitude,
    };
  }
}
