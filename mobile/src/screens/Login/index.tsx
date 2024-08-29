import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { styles } from './styles';
import Logo from '../../assets/logo.svg';
import { LoginForm } from '../../components/LoginForm';
import { StackParamList } from '../../routes/AppStack';
import { CreateAccountForm } from '../../components/CreateAccountForm';

export function Login({ navigation }: NativeStackScreenProps<StackParamList, 'Login'>) {
  const [activeForm, setActiveForm] = useState<'login' | 'createAccount'>('login');

  function navigate() {
    navigation.navigate('Otp');
  }
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.welcomeText}>
        Bem-vindo(a) ao BePrepared, introduza o seu contacto cadastrado para aceder ao sistema
      </Text>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveForm('login')}>
          <Text style={activeForm === 'login' ? styles.activeTabButtonText : styles.tabButtonText}>Entrar</Text>
        </TouchableOpacity>
        <View style={styles.tabsSeparator} />
        <TouchableOpacity style={styles.tabButton} onPress={() => setActiveForm('createAccount')}>
          <Text style={activeForm === 'createAccount' ? styles.activeTabButtonText : styles.tabButtonText}>
            Criar conta
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.formContainer}>
        {activeForm === 'login' ? <LoginForm onNavigate={navigate} /> : <CreateAccountForm onNavigate={navigate} />}
      </View>
    </View>
  );
}
