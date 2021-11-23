import React from 'react';
import { NavigationFocusInjectedProps } from 'react-navigation';
import { ImageBackground } from 'react-native';
import { SPLASH } from '../assets/app';
import { TouchableRipple } from 'react-native-paper';
import styledNative from 'styled-components-native';
import styled from 'styled-components/native';
import { AuthScreens } from '../navigation/screens';
import moment from 'moment';
import * as requests from '../state/requests';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../state/types';

const GettingStartedScreen: React.FunctionComponent<GettingStartedScreenProps> = ({
  navigation,
  updateIsFirstTime,
}) => {
  const onGettingStartedClicked = () => {
    updateIsFirstTime(true);
    navigation.navigate(AuthScreens.Login);
  };

  return (
    <ImageBackgroundStyled source={SPLASH}>
      <TouchableRippleStyled
        rippleColor='rgba(0, 0, 0, .2)'
        onPress={onGettingStartedClicked}
        borderless={true}
      >
        <TouchableText>Get Started</TouchableText>
      </TouchableRippleStyled>
      <FlexView>
        <Accreditation>
          &copy; Copyrights Synapse {moment().format('YYYY')}
        </Accreditation>
      </FlexView>
    </ImageBackgroundStyled>
  );
};

const ImageBackgroundStyled = styledNative(ImageBackground)`
  .style {
    flex: 1;
    resize-mode: cover;
    justify-content: flex-end;
    padding: 40px;
  }
`;

const TouchableRippleStyled = styledNative(TouchableRipple)`
  .style {
    background-color: #FFF;
    border-radius: 50px;
    padding: 17px 20px;
    align-items: center;
  }
`;

const TouchableText = styled.Text`
  font-family: Roboto_500Medium;
  font-size: 18px;
  color: #333;
`;

const Accreditation = styled.Text`
  font-size: 12px;
  font-weight: 300;
  color: #fff;
`;

const FlexView = styled.View`
  align-items: center;
  margin-top: 15px;
`;

type OwnProps = NavigationFocusInjectedProps & {};

type TransformerProps = {
  updateIsFirstTime: typeof requests.ui.updateIsFirstTime;
};

type GettingStartedScreenProps = OwnProps & TransformerProps;

export default connect<{}, TransformerProps, OwnProps, AppState>(
  () => ({}),
  (dispatch) => {
    return bindActionCreators(
      {
        updateIsFirstTime: requests.ui.updateIsFirstTime,
      },
      dispatch,
    );
  },
)(GettingStartedScreen);
