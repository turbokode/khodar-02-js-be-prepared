import { TextInput, View } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';
import { ComponentProps } from 'react';

interface Option {
  id: string;
  designation: string;
}

interface InputProps extends ComponentProps<typeof Picker> {
  title: string;
  options: Option[];
  Icon: LucideIcon;
}
export function PickerWithIcon({ title, options, Icon, ...props }: InputProps) {
  return (
    <View style={styles.container}>
      <Icon color={'#000000'} />
      <Picker
        style={styles.picker}
        prompt={title}
        {...props}

        // selectedValue={selectedLanguage} onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label={title} value={title} enabled={false} />
        {options.map((option) => (
          <Picker.Item label={option.designation} value={option.id} key={option.id} />
        ))}
      </Picker>
    </View>
  );
}
