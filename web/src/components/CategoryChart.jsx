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
import { formatCurrency } from '../utils/formatCurrency.js';

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
    <div
      className="min-h-[280px] w-full rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-500/20 dark:bg-white/[0.035] sm:min-h-[330px] sm:p-5"
      aria-label="Spending by category"
    >
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
            tickFormatter={(value) => formatCurrency(value, { compact: true, maximumFractionDigits: 0 })}
            tickLine={false}
            width={72}
          />
          <Tooltip
            cursor={{ fill: '#eef5f1' }}
            formatter={(value) => [
              formatCurrency(value, { compact: true, maximumFractionDigits: 0 }),
              'Spent',
            ]}
            labelStyle={{ color: '#101815', fontWeight: 800 }}
          />
          <Bar dataKey="amount" fill="#126149" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
