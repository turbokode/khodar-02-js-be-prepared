import React from 'react';
import { InputWithIcon } from '../InputWithIcon';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { PickerWithIcon } from '../PickerWithIcon';
import { Phone, MapPin } from 'lucide-react-native';

interface FormProps {
  onNavigate: () => void;
}

export function CreateAccountForm({ onNavigate }: FormProps) {
  function handleSubmitForm() {
    onNavigate();
  }
  return (
    <>
      <>
        <InputWithIcon placeholder="Contacto" Icon={Phone} keyboardType="numeric" />
        <PickerWithIcon
          placeholder="Provincia"
          Icon={MapPin}
          options={[
            { id: '1', designation: 'Maputo' },
            { id: '2', designation: 'Gaza' }
          ]}
          title="Província"
        />
        <PickerWithIcon placeholder="Distrito" Icon={MapPin} options={[]} title="Distrito" />
        <ButtonWithIcon buttonText="Criar conta" onPress={handleSubmitForm} />
      </>
    </>
  );
}
