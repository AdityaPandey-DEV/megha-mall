import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatsCard.css';

export default function StatsCard({ icon: Icon, label, value, trend, trendValue, color = 'primary' }) {
    const isPositive = trend === 'up';

    return (
        <div className={`stats-card card color-${color}`}>
            <div className="stats-card-header">
                <div className={`stats-card-icon bg-${color}`}>
                    <Icon size={22} />
                </div>
                {trendValue && (
                    <div className={`stats-card-trend ${isPositive ? 'positive' : 'negative'}`}>
                        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>
            <div className="stats-card-value">{value}</div>
            <div className="stats-card-label">{label}</div>
        </div>
    );
}
