import { Text, View, TextInput, TextInputProps } from "react-native";
import { styles } from "./style";

interface Props extends TextInputProps {
  value: string;
  label: string;
  secure?: boolean;
}

export default function InputField({ label, value, secure, ...rest }: Props) {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput value={value} secureTextEntry={secure} {...rest} />
    </View>
  );
}
