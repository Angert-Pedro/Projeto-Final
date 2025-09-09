import {
  Image,
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageSourcePropType,
} from "react-native";
import "./styles";

type Props = TouchableOpacityProps & {
  ButtonText: string;
  ButtonIcon: ImageSourcePropType;
};

export default function HeaderButton({ ButtonText, ButtonIcon }: Props) {
  return (
    <View>
      <TouchableOpacity>
        <Image source={ButtonIcon} alt="" />
        <Text>{ButtonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
