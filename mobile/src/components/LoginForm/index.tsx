import { Phone } from 'lucide-react-native';
import { InputWithIcon } from '../InputWithIcon';
import { ButtonWithIcon } from '../ButtonWithIcon';
import { useState } from 'react';
import { postData } from '../../services/api';

interface FormProps {
  onNavigate: (phone: string) => void;
}
export function LoginForm({ onNavigate }: FormProps) {
  const [phone, setPhone] = useState('');

  function handleSubmitForm() {
    postData('/auth/subscribers', {
      phone
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
      <InputWithIcon placeholder="Contacto" Icon={Phone} keyboardType="numeric" value={phone} onChangeText={setPhone} />
      <ButtonWithIcon buttonText="Entrar" onPress={handleSubmitForm} />
    </>
  );
}
