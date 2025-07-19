import React, { useEffect, useState } from 'react';
import { InputWithIcon } from '../InputWithIcon';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { PickerWithIcon } from '../PickerWithIcon';
import { Phone, MapPin } from 'lucide-react-native';
import { fetchData, postData } from '../../services/api';

interface FormProps {
  onNavigate: (phone: string) => void;
}

interface LocationProps {
  id: string;
  designation: string;
}

export function CreateAccountForm({ onNavigate }: FormProps) {
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districts, setDistricts] = useState<LocationProps[]>([]);
  const [provinceId, setProvinceId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchData<LocationProps[]>('/provinces')
      .then((provinces) => {
        setProvinces(provinces);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchData<LocationProps[]>(`/districts/${provinceId}`).then((response) => {
      setDistricts(response);
    });
  }, [provinceId]);

  function handleSubmitForm() {
    postData('/subscribers', {
      phone,
      provinceId,
      districtId
    })
      .then((response) => {
        onNavigate(phone);
      })
      .catch((error) => {
        alert('Erro ao criar conta');
      });
  }

  return (
    <>
      <>
        <InputWithIcon
          placeholder="Contacto"
          Icon={Phone}
          keyboardType="numeric"
          value={phone}
          onChangeText={setPhone}
        />
        <PickerWithIcon
          placeholder="Provincia"
          Icon={MapPin}
          options={provinces}
          title="Província"
          selectedValue={provinceId}
          onValueChange={(value) => setProvinceId(value)}
        />
        <PickerWithIcon
          placeholder="Distrito"
          Icon={MapPin}
          options={districts}
          title="Distrito"
          selectedValue={districtId}
          onValueChange={(value) => setDistrictId(value)}
        />
        <ButtonWithIcon buttonText="Criar conta" onPress={handleSubmitForm} />
      </>
    </>
  );
}
