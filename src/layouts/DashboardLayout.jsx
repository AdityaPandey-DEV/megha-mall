import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import './DashboardLayout.css';

export default function DashboardLayout({ type = 'staff' }) {
    return (
        <div className="dashboard-layout">
            <Sidebar type={type} />
            <main className="dashboard-main">
                <Outlet />
            </main>
        </div>
    );
}
