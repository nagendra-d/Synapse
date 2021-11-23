import styled from 'styled-components/native';
import { Surface } from 'react-native-paper';
import { MODAL_BACKGROUND } from '../../../constants/colors';

export const ModalContainer = styled(Surface)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${MODAL_BACKGROUND};
  border-radius: 10px;
  elevation: ${`2`};
`;
