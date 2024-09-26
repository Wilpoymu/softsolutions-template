import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Enero', ventas: 4000, compras: 2400 },
  { name: 'Febrero', ventas: 3000, compras: 1398 },
  { name: 'Marzo', ventas: 2000, compras: 9800 },
  { name: 'Abril', ventas: 2780, compras: 3908 },
  { name: 'Mayo', ventas: 1890, compras: 4800 },
  { name: 'Junio', ventas: 2390, compras: 3800 },
  { name: 'Julio', ventas: 3490, compras: 4300 },
];

export default function LineChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ventas" stroke="#8884d8" />
        <Line type="monotone" dataKey="compras" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
