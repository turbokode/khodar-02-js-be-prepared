import { TouchableOpacity, View, Text } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { styles } from './styles';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<typeof TouchableOpacity> {
  buttonText: string;
}

export function ButtonWithIcon({ buttonText, ...props }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <Text style={styles.buttonText}>{buttonText}</Text>
      <ArrowRight color={'#FFFFFF'} />
    </TouchableOpacity>
  );
}
