import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { KeySquare, Lock } from 'lucide-react-native';
import { InputWithIcon } from '../../components/InputWithIcon';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { styles } from './styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../../routes/AppStack';
import { postData } from '../../services/api';
import { SubscriberData, useAuth } from '../../contexts/auth';
import messaging from '@react-native-firebase/messaging';

export function Otp({ navigation, route }: NativeStackScreenProps<StackParamList, 'Otp'>) {
  const { phone } = route.params;
  const [otp, setOtp] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const { updateSubscriber } = useAuth();

  useEffect(() => {
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        messaging()
          .getToken()
          .then((token) => {
            console.log(token);
            setDeviceId(token);
          });
      }
    }
    requestUserPermission();
  }, []);

  function handleSubmitOtp() {
    postData<SubscriberData>('/auth/subscribers/otp', {
      otp: Number(otp),
      deviceId,
      phone
    })
      .then((response) => {
        updateSubscriber({
          id: response.id,
          deviceId: response.deviceId,
          districtId: response.districtId,
          phone: response.phone,
          provinceId: response.provinceId
        });
        navigation.navigate('HomeDrawer');
      })
      .catch((error) => {
        // console.log(error);
        alert('Erro ao criar conta');
      });
  }
  return (
    <View style={styles.container}>
      <KeySquare color="#000000" size={84} />
      <Text style={styles.descriptionText}>
        Introduza o código enviado para {phone} isso serve para confirmar o acesso ao contacto
      </Text>
      <InputWithIcon Icon={Lock} placeholder="OTP" value={otp} onChangeText={setOtp} keyboardType="numeric" />
      <ButtonWithIcon buttonText="Confirmar" onPress={handleSubmitOtp} />
    </View>
  );
}
