import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

export interface SubscriberData {
  id: string;
  deviceId: string;
  phone: string;
  districtId: string;
  provinceId: string;
}

interface AuthContextData {
  subscriber: SubscriberData | null;
  updateSubscriber: (subscriber: SubscriberData) => void;
  loggedIn: boolean;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: PropsWithChildren) {
  const [subscriber, setSubscriber] = useState<SubscriberData | null>(null);

  function updateSubscriber(subscriber: SubscriberData) {
    setSubscriber(subscriber);
    api.defaults.headers.Authorization = subscriber.deviceId;
    const jsonValue = JSON.stringify(subscriber);
    AsyncStorage.setItem('@BePrepared:subscriber', jsonValue);
  }

  function logout() {
    // setAdmin(null);
    AsyncStorage.clear().then(() => {
      setSubscriber(null);
      api.defaults.headers.Authorization = ``;
    });
  }

  useEffect(() => {
    AsyncStorage.getItem('@BePrepared:subscriber').then((value) => {
      if (value) {
        const parsedValue = JSON.parse(value);
        setSubscriber(parsedValue);
        api.defaults.headers.Authorization = parsedValue.deviceId;
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn: !!subscriber, subscriber, logout, updateSubscriber }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

const user = {
  createdAt: '2024-09-02T07:06:51.845Z',
  deviceId: 'device_id_333661.73279014626',
  district: {
    createdAt: '2024-07-04T10:33:29.071Z',
    designation: 'Maputo',
    id: '00265e07-3013-4896-af6d-29a5782a01e7',
    provinceId: '758ece2a-9fd1-4d30-b8d0-5f47a2f27dcc',
    updatedAt: '2024-07-04T10:33:29.071Z'
  },
  districtId: '00265e07-3013-4896-af6d-29a5782a01e7',
  id: 'f4fd71f2-e104-440c-a20d-3fbc2c60ed61',
  phone: '846476284',
  province: {
    createdAt: '2024-07-04T10:33:29.071Z',
    designation: 'Maputo Cidade',
    id: '758ece2a-9fd1-4d30-b8d0-5f47a2f27dcc',
    updatedAt: '2024-07-04T10:33:29.071Z'
  },
  provinceId: '758ece2a-9fd1-4d30-b8d0-5f47a2f27dcc',
  updatedAt: '2024-09-02T07:09:36.698Z',
  verified: true
};
