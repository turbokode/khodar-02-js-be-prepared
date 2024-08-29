import React from 'react';
import { Text, View } from 'react-native';
import { KeySquare, Lock } from 'lucide-react-native';
import { InputWithIcon } from '../../components/InputWithIcon';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/AppStack';

export function Otp({ navigation }: NativeStackScreenProps<StackParamList, 'Otp'>) {
  function handleSubmitOtp() {
    navigation.navigate('HomeDrawer');
  }
  return (
    <View style={styles.container}>
      <KeySquare color="#000000" size={84} />
      <Text style={styles.descriptionText}>
        Introduza o código enviado para 841234567 isso serve para confirmar o acesso ao contacto
      </Text>
      <InputWithIcon Icon={Lock} placeholder="OTP" />
      <ButtonWithIcon buttonText="Confirmar" onPress={handleSubmitOtp} />
    </View>
  );
}
