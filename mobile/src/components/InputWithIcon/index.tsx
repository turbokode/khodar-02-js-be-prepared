import { TextInput, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { styles } from './styles';
import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<typeof TextInput> {
  placeholder: string;
  Icon: LucideIcon;
}
export function InputWithIcon({ placeholder, Icon, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Icon color={'#000000'} />
      <TextInput placeholder={placeholder} style={styles.inputText} {...props} />
    </View>
  );
}
