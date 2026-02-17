import { Users, Clock, CheckCircle2, AlertCircle, MoreVertical } from 'lucide-react';
import './AdminStaffActivity.css';

const staffMembers = [
    { id: 1, name: 'Ravi Kumar', role: 'Store Manager', status: 'online', avatar: 'RK', ordersToday: 18, avgTime: '12 min', rating: 4.8 },
    { id: 2, name: 'Priya Sharma', role: 'Packing Staff', status: 'online', avatar: 'PS', ordersToday: 24, avgTime: '8 min', rating: 4.9 },
    { id: 3, name: 'Amit Verma', role: 'Delivery Boy', status: 'offline', avatar: 'AV', ordersToday: 15, avgTime: '25 min', rating: 4.5 },
    { id: 4, name: 'Sneha Gupta', role: 'Billing Staff', status: 'online', avatar: 'SG', ordersToday: 30, avgTime: '5 min', rating: 4.7 },
    { id: 5, name: 'Rahul Negi', role: 'Delivery Boy', status: 'away', avatar: 'RN', ordersToday: 12, avgTime: '28 min', rating: 4.3 },
    { id: 6, name: 'Meena Devi', role: 'Inventory Manager', status: 'online', avatar: 'MD', ordersToday: 8, avgTime: '15 min', rating: 4.6 },
];

const activityLog = [
    { time: '2:45 PM', user: 'Priya Sharma', action: 'Packed order ORD-1001', type: 'success' },
    { time: '2:30 PM', user: 'Ravi Kumar', action: 'Updated stock for Toor Dal', type: 'info' },
    { time: '2:15 PM', user: 'Amit Verma', action: 'Delivered order ORD-0998', type: 'success' },
    { time: '2:00 PM', user: 'Sneha Gupta', action: 'Applied coupon WELCOME100 on ORD-1003', type: 'info' },
    { time: '1:45 PM', user: 'Rahul Negi', action: 'Delivery delayed for ORD-0999', type: 'warning' },
    { time: '1:30 PM', user: 'Meena Devi', action: 'Flagged low stock for Cumin Powder', type: 'warning' },
    { time: '1:15 PM', user: 'Priya Sharma', action: 'Packed order ORD-1000', type: 'success' },
    { time: '1:00 PM', user: 'Ravi Kumar', action: 'Added new product: Organic Honey', type: 'info' },
    { time: '12:45 PM', user: 'Amit Verma', action: 'Picked up order ORD-0997 for delivery', type: 'info' },
    { time: '12:30 PM', user: 'Sneha Gupta', action: 'Processed payment for ORD-1002', type: 'success' },
];

export default function AdminStaffActivity() {
    const onlineCount = staffMembers.filter((s) => s.status === 'online').length;

    return (
        <div className="admin-staff">
            <div className="dashboard-page-header">
                <h1 className="dashboard-page-title">Staff Activity</h1>
                <p className="dashboard-page-subtitle">Monitor staff performance and real-time activity</p>
            </div>

            {/* Staff Summary */}
            <div className="staff-summary">
                <div className="staff-stat card">
                    <Users size={20} className="staff-stat-icon" />
                    <div>
                        <span className="staff-stat-val">{staffMembers.length}</span>
                        <span className="staff-stat-label">Total Staff</span>
                    </div>
                </div>
                <div className="staff-stat card online">
                    <CheckCircle2 size={20} className="staff-stat-icon" />
                    <div>
                        <span className="staff-stat-val">{onlineCount}</span>
                        <span className="staff-stat-label">Online Now</span>
                    </div>
                </div>
                <div className="staff-stat card">
                    <Clock size={20} className="staff-stat-icon" />
                    <div>
                        <span className="staff-stat-val">107</span>
                        <span className="staff-stat-label">Orders Today</span>
                    </div>
                </div>
                <div className="staff-stat card">
                    <AlertCircle size={20} className="staff-stat-icon" />
                    <div>
                        <span className="staff-stat-val">2</span>
                        <span className="staff-stat-label">Issues</span>
                    </div>
                </div>
            </div>

            <div className="staff-grid">
                {/* Staff Cards */}
                <div className="staff-cards-section">
                    <h3 className="staff-section-title">Team Members</h3>
                    <div className="staff-cards">
                        {staffMembers.map((member) => (
                            <div key={member.id} className="staff-card card">
                                <div className="staff-card-header">
                                    <div className="staff-avatar-wrap">
                                        <div className="staff-avatar">{member.avatar}</div>
                                        <span className={`staff-status-dot ${member.status}`} />
                                    </div>
                                    <div className="staff-card-info">
                                        <strong>{member.name}</strong>
                                        <span className="staff-role">{member.role}</span>
                                    </div>
                                    <button className="btn btn-ghost btn-icon"><MoreVertical size={16} /></button>
                                </div>
                                <div className="staff-card-metrics">
                                    <div className="staff-metric">
                                        <span className="staff-metric-value">{member.ordersToday}</span>
                                        <span className="staff-metric-label">Orders</span>
                                    </div>
                                    <div className="staff-metric">
                                        <span className="staff-metric-value">{member.avgTime}</span>
                                        <span className="staff-metric-label">Avg Time</span>
                                    </div>
                                    <div className="staff-metric">
                                        <span className="staff-metric-value">⭐ {member.rating}</span>
                                        <span className="staff-metric-label">Rating</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity Log */}
                <div className="activity-log-section">
                    <h3 className="staff-section-title">Activity Log</h3>
                    <div className="activity-log card">
                        {activityLog.map((entry, i) => (
                            <div key={i} className={`activity-entry ${entry.type}`}>
                                <span className="activity-time">{entry.time}</span>
                                <div className="activity-dot" />
                                <div className="activity-content">
                                    <strong>{entry.user}</strong>
                                    <span>{entry.action}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
