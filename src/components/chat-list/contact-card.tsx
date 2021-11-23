import React from 'react';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import styled from 'styled-components/native';
import { ImageSourcePropType } from 'react-native';
import { Icon, Image } from 'react-native-elements';

const ContactCard: React.FunctionComponent<ContactCardProps> = ({
  name,
  image,
  isAdd,
  isMore,
  hideName,
  background,
  color,
  height = 60,
  width = 60,
  size = 26,
  radius = 20,
}) => {
  const renderAvatar = () => {
    return (
      <Image
        source={image!}
        width={width}
        height={height}
        containerStyle={{ width, height, borderRadius: radius }}
        resizeMode={'cover'}
      />
    );
  };

  const renderLetter = () => {
    return (
      <ContactBoxInner
        width={width}
        height={height}
        background={background}
        radius={radius}
      >
        <ContactBoxText color={color}>{name[0]}</ContactBoxText>
      </ContactBoxInner>
    );
  };

  const renderAdd = () => {
    return (
      <ContactBoxInner width={width} height={height} radius={radius}>
        <Icon name={'plus'} type={'feather'} size={size} color={'#F05A28'} />
      </ContactBoxInner>
    );
  };

  const renderMore = () => {
    return (
      <ContactBoxInner width={width} height={height} radius={radius}>
        <Icon
          name={'more-horizontal'}
          type={'feather'}
          size={size}
          color={'#F05A28'}
        />
      </ContactBoxInner>
    );
  };

  const renderInner = () => {
    if (isAdd) {
      return renderAdd();
    } else if (isMore) {
      return renderMore();
    } else if (image) {
      return renderAvatar();
    } else {
      return renderLetter();
    }
    return <ContactBoxInner width={width} height={height} radius={radius} />;
  };

  return (
    <ContactBoxWrapper width={width}>
      <ContactBox width={width} height={height} radius={radius}>
        {renderInner()}
      </ContactBox>
      {(!hideName && <ContactText numberOfLines={1}>{name}</ContactText>) ||
        null}
    </ContactBoxWrapper>
  );
};

type StateProps = {};

type OwnProps = {
  title?: string;
  image?: ImageSourcePropType;
  name: string;
  isAdd?: boolean;
  isMore?: boolean;
  hideName?: boolean;
  background?: string;
  color?: string;
  height?: number;
  width?: number;
  size?: number;
  radius?: number;
} & NavigationInjectedProps;

type TransformerProps = {};

type ContactCardProps = OwnProps & StateProps & TransformerProps;

export default withNavigation(ContactCard);

const ContactBoxWrapper = styled.View<{ width: number }>`
  align-items: center;
  width: ${(props) => props.width}px;
`;

const ContactBox = styled.View<{
  width: number;
  height: number;
  radius: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: #fff;
  border-radius: ${(props) => props.radius}px;
  justify-content: center;
  align-items: center;
`;

const ContactBoxInner = styled.View<{
  width: number;
  height: number;
  background?: string;
  radius: number;
}>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  background: ${(props) => (props.background ? props.background : '#fff')};
  border-radius: ${(props) => props.radius}px;
  justify-content: center;
  align-items: center;
`;

const ContactBoxText = styled.Text<{ color?: string }>`
  font-size: 26px;
  color: ${(props) => (props.color ? props.color : '#333')};
  text-transform: uppercase;
`;

const ContactText = styled.Text`
  color: #fff;
  margin-top: 5px;
  font-family: Roboto_400Regular;
  font-size: 10px;
`;
