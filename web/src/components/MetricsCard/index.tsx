import './styles.css';
interface MetricsCardProps {
  title: string;
  total: number;
  last: number;
}
export function MetricsCard({ title, total, last }: MetricsCardProps) {
  return (
    <section id="metrics-card-block">
      <header>
        <h2>{title}</h2>
        <div>{total}</div>
      </header>
      <span className="details">Recentes: {last}</span>
      <p>Métricas dos últimos 28 dias</p>
    </section>
  );
}
