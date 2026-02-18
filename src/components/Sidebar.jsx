import { NavLink, useLocation } from 'react-router-dom';
import { Package, ClipboardList, AlertTriangle, BarChart3, ShoppingBag, FileText, Users, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const staffLinks = [
    { to: '/staff', icon: ClipboardList, label: 'Orders', end: true },
    { to: '/staff/products', icon: Package, label: 'Products' },
    { to: '/staff/inventory', icon: AlertTriangle, label: 'Inventory Alerts' },
];

const adminLinks = [
    { to: '/admin', icon: BarChart3, label: 'Overview', end: true },
    { to: '/admin/products', icon: ShoppingBag, label: 'Product Analytics' },
    { to: '/admin/reports', icon: FileText, label: 'Reports' },
    { to: '/admin/staff', icon: Users, label: 'Staff Activity' },
];

export default function Sidebar({ type = 'staff' }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout } = useAuth();
    const links = type === 'admin' ? adminLinks : staffLinks;

    return (
        <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
            <div className="sidebar-header">
                {!collapsed && (
                    <div className="sidebar-brand">
                        <img src="/favicon.svg" alt="Megha Mall" className="sidebar-brand-icon" width="32" height="32" />
                        <div>
                            <span className="sidebar-brand-name">Megha Mall</span>
                            <span className="sidebar-brand-role">{type === 'admin' ? 'Admin' : 'Staff'} Panel</span>
                        </div>
                    </div>
                )}
                <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        end={link.end}
                        className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        title={link.label}
                    >
                        <link.icon size={20} />
                        {!collapsed && <span>{link.label}</span>}
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                {user && !collapsed && (
                    <div className="sidebar-user">
                        <div className="sidebar-user-avatar">{user.name?.charAt(0)}</div>
                        <div className="sidebar-user-info">
                            <span className="sidebar-user-name">{user.name}</span>
                            <span className="sidebar-user-role">{user.role}</span>
                        </div>
                    </div>
                )}
                <button className="sidebar-link logout-link" onClick={logout} title="Back to Store">
                    <LogOut size={20} />
                    {!collapsed && <span>Back to Store</span>}
                </button>
            </div>
        </aside>
    );
}
