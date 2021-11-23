import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';

export class ImageService {
  public async getImageFromCamera() {
    const cameraPermissionStatus = await Permissions.askAsync(
      Permissions.CAMERA,
    );

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraPermissionStatus.status !== 'granted' || status !== 'granted') {
      console.log('Permission to access Camera was denied');
    }
    const compression = Platform.OS === 'ios' ? 0.1 : 0.9;
    return ImagePicker.launchCameraAsync({
      quality: compression,
      base64: true,
    });
  }

  public async getImageFromGallery() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      throw new Error('Permission to access Media was denied');
    }

    return ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      base64: true,
    });
  }
}
