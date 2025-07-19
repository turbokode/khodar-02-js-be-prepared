import { Text, View } from 'react-native';
import { InputWithIcon } from '../../components/InputWithIcon';
import { MapPin, Phone } from 'lucide-react-native';
import { PickerWithIcon } from '../../components/PickerWithIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styles } from './styles';
import { useEffect, useState } from 'react';
import { fetchData, updateData } from '../../services/api';
import { SubscriberData, useAuth } from '../../contexts/auth';

interface LocationProps {
  id: string;
  designation: string;
}

export function Profile() {
  const { subscriber, updateSubscriber } = useAuth();
  const [phone, setPhone] = useState(subscriber?.phone);
  const [provinceId, setProvinceId] = useState(subscriber?.provinceId);
  const [districtId, setDistrictId] = useState(subscriber?.districtId);
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districts, setDistricts] = useState<LocationProps[]>([]);

  useEffect(() => {
    fetchData<LocationProps[]>('/provinces')
      .then((provinces) => {
        setProvinces(provinces);
      })
      .catch((error) => {
        console.log(error);
      });
    getDistricts();
  }, []);

  useEffect(() => {
    getDistricts();
  }, [provinceId]);

  function getDistricts() {
    fetchData<LocationProps[]>(`/districts/${provinceId}`).then((response) => {
      setDistricts(response);
    });
  }

  function handleUpdateSubscriber() {
    updateData<SubscriberData>('/subscribers', {
      phone,
      provinceId,
      districtId
    }).then((response) => {
      updateSubscriber({
        id: response.id,
        deviceId: response.deviceId,
        districtId: response.districtId,
        phone: response.phone,
        provinceId: response.provinceId
      });
      alert('Dados atualizados com sucesso');
    });
  }

  function handleChangeProvince(value: string) {
    setProvinceId(value);
    setDistrictId('');
  }

  return (
    <View style={styles.container}>
      <InputWithIcon placeholder="Celular" Icon={Phone} value={phone} onChangeText={setPhone} />
      <PickerWithIcon
        title="Província"
        Icon={MapPin}
        options={provinces}
        selectedValue={provinceId}
        onValueChange={handleChangeProvince}
      />
      <PickerWithIcon
        title="Distrito"
        Icon={MapPin}
        options={districts}
        selectedValue={districtId}
        onValueChange={(value) => setDistrictId(value)}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateSubscriber}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
