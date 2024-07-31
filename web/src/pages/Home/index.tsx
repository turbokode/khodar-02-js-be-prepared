import logo from '../../assets/logo.svg';
import { OctagonAlert, Bell, ChevronRight } from 'lucide-react';
import './styles.css';
import { MetricsCard } from '../../components/MetricsCard';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';
import { useEffect, useState } from 'react';
import { fetchData } from '../../services/api';
import { DialogLayout } from '../../components/Dialog';

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

export function Home() {
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [alerts, setAlerts] = useState<AlertsProps[]>([]);
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [alertDialogOpen, setAlertDialogOpen] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchData<StatsProps>('/stats'),
      fetchData<AlertsProps[]>('/alerts'),
      fetchData<NotificationProps[]>('/notifications')
    ]).then(([stats, alerts, notifications]) => {
      setStats(stats);
      setAlerts(alerts);
      setNotifications(notifications);
    });
  }, []);
  return (
    <div id="home-page">
      <header>
        <img src={logo} alt="Logo Beprepared" />
        <ButtonWithIcon text="Alertar" Icon={OctagonAlert} />
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
            <ButtonWithIcon text="Alertar" Icon={OctagonAlert} size="short" />
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
        buttonText="Alertar"
        IconButton={OctagonAlert}
      >
        Form
      </DialogLayout>
    </div>
  );
}
