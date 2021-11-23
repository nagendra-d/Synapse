// External imports
// React & React Native
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

// Relative imports
// Constants
import {
  DARK_GREY,
  DRAWER_HEADER_TEXT,
  LIGHT_GREY,
} from '../../constants/colors';

const { height } = Dimensions.get('window');

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 40px 15px 40px 35px;
`;

export const HeaderContent = styled.TouchableOpacity`
  flex-direction: row;
`;

export const TouchableDrawerItem = styled.TouchableOpacity`
  ${height > 696
    ? `padding: 15px 20px 15px 35px`
    : `padding: 10px 20px 10px 35px`};
  flex-shrink: 0;
`;

export const DrawerTopContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-top: 20px;
`;

export const IconWrapper = styled.View`
  align-self: center;
`;

export const DrawerHeaderTextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  margin-left: 15px;
  padding-bottom: 5px;
  align-self: center;
`;

export const DrawerHeaderText = styled.Text<{ hasRightMargin: boolean }>`
  color: ${DRAWER_HEADER_TEXT};
  font-size: 20px;
  align-self: center;
`;

export const DrawerItemText = styled.Text`
  font-size: 18px;
`;

export const MenuItem = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const SwitchAppText = styled.Text`
  font-size: 18px;
  color: ${DARK_GREY};
`;

export const AppVersionWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  ${height > 696
    ? `padding: 15px 20px 15px 35px`
    : `padding: 10px 20px 10px 35px`};
`;

export const AppVersionText = styled(SwitchAppText)`
  font-size: 14px;
`;

export const Separator = styled.View`
  height: 2px;
  margin: 25px 0;
  width: 100%;
  background-color: ${LIGHT_GREY};
`;
