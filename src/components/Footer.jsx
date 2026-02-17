import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <span className="logo-icon">🏪</span>
                            <span className="logo-text">Megha Mall</span>
                        </div>
                        <p className="footer-desc">Your trusted neighbourhood store for quality groceries and kitchen essentials, now available online!</p>
                        <div className="footer-social">
                            <a href="#" className="social-btn" title="Facebook"><Facebook size={18} /></a>
                            <a href="#" className="social-btn" title="Instagram"><Instagram size={18} /></a>
                            <a href="#" className="social-btn whatsapp" title="WhatsApp"><MessageCircle size={18} /></a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <Link to="/">Home</Link>
                        <Link to="/category/groceries">Groceries</Link>
                        <Link to="/category/utensils">Kitchen Utensils</Link>
                        <Link to="/offers">Today's Offers</Link>
                        <Link to="/account">My Account</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Customer Service</h4>
                        <Link to="#">Shipping Policy</Link>
                        <Link to="#">Return & Refund</Link>
                        <Link to="#">Privacy Policy</Link>
                        <Link to="#">Terms & Conditions</Link>
                        <Link to="#">FAQ</Link>
                    </div>

                    <div className="footer-col">
                        <h4>Contact Us</h4>
                        <div className="footer-contact">
                            <MapPin size={15} />
                            <span>Block C, MG Road, Dehradun, Uttarakhand 248001</span>
                        </div>
                        <div className="footer-contact">
                            <Phone size={15} />
                            <span>1800-123-MEGHA</span>
                        </div>
                        <div className="footer-contact">
                            <Mail size={15} />
                            <span>support@meghamall.in</span>
                        </div>
                        <div className="footer-contact">
                            <Clock size={15} />
                            <span>Mon-Sun: 8 AM - 10 PM</span>
                        </div>
                    </div>
                </div>

                <div className="footer-payment">
                    <span>We Accept:</span>
                    <div className="payment-icons">
                        <span className="payment-method">UPI</span>
                        <span className="payment-method">Visa</span>
                        <span className="payment-method">Mastercard</span>
                        <span className="payment-method">RuPay</span>
                        <span className="payment-method">COD</span>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>© 2026 Megha Mall. All rights reserved. Made with ❤️ in India</p>
                </div>
            </div>
        </footer>
    );
}
