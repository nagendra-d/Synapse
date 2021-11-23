import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { BoxElement } from './chat-styled';
import * as DocumentPicker from 'expo-document-picker';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { SUPPORTED_FILES } from '../../constants/dummy';

const fileType = (name: string) => {
  return name.split('.').pop();
};

const AttachDoc: React.FunctionComponent<AttachDocProps> = ({
  onDocumentSelected,
}) => {
  const [loader, setLoader] = useState(false);

  const getDocument = async () => {
    const documentType = Platform.OS === 'ios' ? '*/*' : 'application/*';
    const document = await DocumentPicker.getDocumentAsync({
      type: documentType,
    });
    if (document.type === 'success') {
      const fileName = document.name || '';
      const fileExt = fileType(fileName) || '';
      if (SUPPORTED_FILES.includes(fileExt)) {
        setLoader(true);
        try {
          onDocumentSelected();
        } catch (e) {
          console.log(e);
        }
        setLoader(false);
      } else {
        Alert.alert('Warning!', 'Sorry we do not support this file format');
      }
      setLoader(false);
    }
  };

  return (
    <BoxElement onPress={getDocument} disabled={loader}>
      {(!loader && (
        <Icon name='paperclip' type='feather' size={26} color={'#F6921E'} />
      )) || <ActivityIndicator size={26} color={'#F6921E'} />}
    </BoxElement>
  );
};

type AttachDocProps = {
  onDocumentSelected: () => void;
};

export default AttachDoc;
