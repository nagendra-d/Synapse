import * as React from 'react';
import { Portal, Modal } from 'react-native-paper';
import { MODAL_TEXT_COLOR } from '../../../constants/colors';
import styled from 'styled-components/native';
import { ModalContainer } from '../modal-container/modal-container';
import {
  GlobalActivityIndicatorState,
  Provider,
} from './global-activity-context';
import { ActivityIndicator } from 'react-native';

export class GlobalActivityIndicatorProvider extends React.PureComponent<
  {},
  GlobalActivityIndicatorState
> {
  public state: GlobalActivityIndicatorState = {
    content: '',
    isLoading: false,
  };

  private showActivityIndicator = (content: string): void =>
    this.setState({ content, isLoading: true });

  private hideActivityIndicator = (): void =>
    this.setState({ content: '', isLoading: false });

  public render() {
    const { children } = this.props;
    const { isLoading, content } = this.state;
    const { showActivityIndicator, hideActivityIndicator } = this;
    return (
      <React.Fragment>
        <Provider
          value={{
            ...this.state,
            showActivityIndicator,
            hideActivityIndicator,
          }}
          children={children}
        />
        <Portal>
          <Modal visible={isLoading} dismissable={false}>
            <LocalContainer>
              <ActivityIndicator />
              {!!content.length && (
                <ContentView>
                  <ContentText>{content}</ContentText>
                </ContentView>
              )}
            </LocalContainer>
          </Modal>
        </Portal>
      </React.Fragment>
    );
  }
}

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
