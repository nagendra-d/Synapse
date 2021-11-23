// External imports
// React & React Native
import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';
import styled from 'styled-components/native';
// Expo
// Relative imports
// Components
import { ModalContainer } from '../modal-container/modal-container';
// Constants
import {
  MODAL_OVERLAY_COLOR_OPAQUE,
  MODAL_TEXT_COLOR,
} from '../../../constants/colors';

const ModalActivityIndicator: React.FunctionComponent<ModalActivityIndicatorProps> = ({
  content = '',
}) => {
  return (
    <Modal transparent={true}>
      <ModalOverlay centered={true}>
        <LocalContainer>
          <ActivityIndicator />
          {!!content.length && (
            <ContentView>
              <ContentText>{content}</ContentText>
            </ContentView>
          )}
        </LocalContainer>
      </ModalOverlay>
    </Modal>
  );
};

const ModalOverlay = styled.View<{ centered: boolean }>`
  flex: 1;
  flex-direction: column;
  justify-content: ${(props) => (props.centered ? 'center' : 'flex-end')};
  align-items: center;
  background-color: ${MODAL_OVERLAY_COLOR_OPAQUE};
  padding-bottom: 10px;
`;

const LocalContainer = styled(ModalContainer)`
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
`;

const ContentView = styled.View`
  justify-content: center;
  align-items: center;
`;

const ContentText = styled.Text`
  margin-top: 10px;
  font-size: 18px;
  text-align: center;
  color: ${MODAL_TEXT_COLOR};
`;

type OwnProps = {
  content?: string;
};

type ModalActivityIndicatorProps = OwnProps;

export default ModalActivityIndicator;
