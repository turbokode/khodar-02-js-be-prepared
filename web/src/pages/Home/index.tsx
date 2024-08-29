import logo from '../../assets/logo.svg';
import { OctagonAlert, Bell, ChevronRight, SendHorizontal, Power } from 'lucide-react';
import { MetricsCard } from '../../components/MetricsCard';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { fetchData, postData } from '../../services/api';
import { DialogLayout } from '../../components/Dialog';
import { SelectWithIcon } from '../../components/SelectWithIcon';
import { TextareaWithIcon } from '../../components/TextareaWithIcon';
import './styles.css';
import { AuthContext, useAuth } from '../../contexts/auth';
import { useNavigate } from 'react-router-dom';

interface StatsPropsSchema {
  total: number;
  last: number;
}

interface StatsProps {
  subscribers: StatsPropsSchema;
  alerts: StatsPropsSchema;
  notifications: StatsPropsSchema;
}

interface AlertsProps {
  id: string;
  title: string;
  message: string;
  districtId: string;
  provinceId: string;
  createdAt: Date;
  province: {
    id: string;
    designation: string;
  };
  district: {
    id: string;
    designation: string;
  };
}

interface NotificationProps {
  id: string;
  subscriberId: string;
  message: string;
  createdAt: Date;
  subscriber: {
    id: string;
    phone: string;
    deviceId: string;
    verified: boolean;
  };
}

interface LocationProps {
  id: string;
  designation: string;
}

export function Home() {
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [alerts, setAlerts] = useState<AlertsProps[]>([]);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [provinces, setProvinces] = useState<LocationProps[]>([]);
  const [districts, setDistricts] = useState<LocationProps[]>([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);

  const [selectedProvinceId, setSelectedProvinceId] = useState('');
  const [selectedDistrictId, setSelectedDistrictId] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    Promise.all([
      fetchData<StatsProps>('/stats'),
      fetchData<AlertsProps[]>('/alerts'),
      fetchData<NotificationProps[]>('/notifications'),
      fetchData<LocationProps[]>('/provinces')
    ]).then(([stats, alerts, notifications, provinces]) => {
      setStats(stats);
      setAlerts(alerts);
      setNotifications(notifications);
      setProvinces(provinces);
    });
  }, []);

  useEffect(() => {
    fetchData<LocationProps[]>(`/districts/${selectedProvinceId}`).then((response) => {
      setDistricts(response);
    });
  }, [selectedProvinceId]);

  function handleSubmitAlert(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postData('/alerts', { message, provinceId: selectedProvinceId, districtId: selectedDistrictId, title: 'Alerta' })
      .then(() => {
        loadAlerts();
        setAlertDialogOpen(false);
      })
      .catch((error) => {
        console.log(error);
        alert('Falha no envio do alerta');
      });
  }

  function loadAlerts() {
    fetchData<AlertsProps[]>('/alerts').then((alerts) => {
      setAlerts(alerts);
    });
  }

  function handleLogout() {
    logout();
    navigate('/');
  }
  return (
    <div id="home-page">
      <header>
        <img src={logo} alt="Logo Beprepared" />
        <div className="actions">
          <ButtonWithIcon text="Alertar" Icon={OctagonAlert} onClick={(e) => setAlertDialogOpen(true)} />
          <button className="logout" onClick={handleLogout} type="button">
            <Power />
          </button>
        </div>
      </header>
      <div className="metrics">
        <MetricsCard title="Cadastros" total={stats?.subscribers.total || 0} last={stats?.subscribers.last || 0} />
        <MetricsCard title="Alertas" total={stats?.alerts.total || 0} last={stats?.alerts.last || 0} />
        <MetricsCard
          title="Notificações"
          total={stats?.notifications.total || 0}
          last={stats?.notifications.last || 0}
        />
      </div>

      <div className="alerts-list">
        <main>
          <header>
            <h1>
              <OctagonAlert size={24} color="#000" />
              <span>Lista de Alertas</span>
            </h1>
            <ButtonWithIcon text="Alertar" Icon={OctagonAlert} size="short" onClick={(e) => setAlertDialogOpen(true)} />
          </header>
          <table>
            <thead>
              <tr>
                <th>Mensagem</th>
                <th>Alcance</th>
                <th>Localização</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id}>
                  <td>{alert.message}</td>
                  <td>2833</td>
                  <td>
                    {alert.province.designation} - {alert.district.designation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <aside>
          <header>
            <Bell size={24} color="#000" />
            <h2>Notificações</h2>
            <span>{notifications.length}</span>
          </header>
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <section>
                  <div className="circle"></div>
                  <span>{notification.subscriber.phone}</span> | <span className="message">{notification.message}</span>
                </section>
                <ChevronRight size={12} color="#000" />
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <DialogLayout
        open={alertDialogOpen}
        onOpenChange={setAlertDialogOpen}
        title="Novo alerta"
        IconTitle={OctagonAlert}
      >
        <form onSubmit={handleSubmitAlert}>
          <fieldset>
            <SelectWithIcon
              name="provinces"
              label="Provincia"
              options={provinces}
              required
              onChange={(e) => {
                setSelectedProvinceId(e.target.value);
              }}
            />
            <SelectWithIcon
              name="districts"
              label="Distritos"
              required
              options={districts}
              onChange={(e) => {
                setSelectedDistrictId(e.target.value);
              }}
            />
          </fieldset>
          <small>Alcance: 1243 pessoas</small>

          <TextareaWithIcon
            label="Escreva o seu alerta"
            name="message"
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="form-submit-button">
            <ButtonWithIcon type="submit" text="Alertar" Icon={SendHorizontal} />
          </div>
        </form>
      </DialogLayout>
    </div>
  );
}
