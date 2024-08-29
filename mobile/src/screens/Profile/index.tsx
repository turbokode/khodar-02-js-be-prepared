import { Text, View } from 'react-native';
import { InputWithIcon } from '../../components/InputWithIcon';
import { MapPin, Phone } from 'lucide-react-native';
import { PickerWithIcon } from '../../components/PickerWithIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';

export function Profile() {
  return (
    <View style={styles.container}>
      <InputWithIcon placeholder="Celular" Icon={Phone} />
      <PickerWithIcon title="Província" Icon={MapPin} options={[]} />
      <PickerWithIcon title="Distrito" Icon={MapPin} options={[]} />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
