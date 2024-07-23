import logo from '../../assets/logo.svg';
import { OctagonAlert } from 'lucide-react';
import './styles.css';
import { MetricsCard } from '../../components/MetricsCard';
import { ButtonWithIcon } from '../../components/ButtonWithIcon';

export function Home() {
  return (
    <div id="home-page">
      <header>
        <img src={logo} alt="Logo Beprepared" />
        <ButtonWithIcon text="Alertar" Icon={OctagonAlert} />
      </header>
      <div className="metrics">
        <MetricsCard title="Cadastros" total={8464} last={46} />
        <MetricsCard title="Alertas" total={7464} last={76} />
        <MetricsCard title="Notificações" total={4877} last={457} />
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
              <tr>
                <td>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex nobis nihil repudiandae minus optio
                  ratione similique voluptates accusantium laboriosam. Consequatur est maiores, excepturi nostrum beatae
                  molestiae aut a blanditiis.
                </td>
                <td>2833</td>
                <td>Maputo - Zimpeto</td>
              </tr>
              <tr>
                <td>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex nobis nihil repudiandae minus optio
                  ratione similique voluptates accusantium laboriosam. Consequatur est maiores, excepturi nostrum beatae
                  molestiae aut a blanditiis.
                </td>
                <td>2833</td>
                <td>Maputo - Zimpeto</td>
              </tr>
              <tr>
                <td>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero ex nobis nihil repudiandae minus optio
                  ratione similique voluptates accusantium laboriosam. Consequatur est maiores, excepturi nostrum beatae
                  molestiae aut a blanditiis.
                </td>
                <td>2833</td>
                <td>Maputo - Zimpeto</td>
              </tr>
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
