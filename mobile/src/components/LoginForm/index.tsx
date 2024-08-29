import { Phone } from 'lucide-react-native';
import { InputWithIcon } from '../InputWithIcon';
import { ButtonWithIcon } from '../ButtonWithIcon';

interface FormProps {
  onNavigate: () => void;
}
export function LoginForm({ onNavigate }: FormProps) {
  function handleSubmitForm() {
    onNavigate();
  }
  return (
    <>
      <InputWithIcon placeholder="Contacto" Icon={Phone} keyboardType="numeric" />
      <ButtonWithIcon buttonText="Entrar" onPress={handleSubmitForm} />
    </>
  );
}
