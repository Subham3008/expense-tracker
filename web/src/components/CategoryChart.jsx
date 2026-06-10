import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import EmptyState from './EmptyState.jsx';

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  currency: 'INR',
  maximumFractionDigits: 0,
  style: 'currency',
});

const CategoryChart = ({ data }) => {
  if (data.length === 0) {
    return (
      <EmptyState
        description="Add expenses in multiple categories to compare where money goes."
        title="No chart data yet"
      />
    );
  }

  return (
    <div className="chart-frame" aria-label="Spending by category">
      <ResponsiveContainer height={280} width="100%">
        <BarChart data={data} margin={{ bottom: 0, left: 0, right: 8, top: 10 }}>
          <CartesianGrid stroke="#e6eee9" strokeDasharray="4 4" vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="category"
            tick={{ fill: '#68766f', fontSize: 12, fontWeight: 700 }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: '#68766f', fontSize: 12, fontWeight: 700 }}
            tickFormatter={(value) => currencyFormatter.format(value)}
            tickLine={false}
            width={72}
          />
          <Tooltip
            cursor={{ fill: '#eef5f1' }}
            formatter={(value) => [currencyFormatter.format(value), 'Spent']}
            labelStyle={{ color: '#101815', fontWeight: 800 }}
          />
          <Bar dataKey="amount" fill="#126149" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
