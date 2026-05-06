import React, { useState, useMemo } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { allApps } from '../data';
import { AppCard } from '../components/AppCard';
import { Check, ShieldCheck, CheckCircle2 } from 'lucide-react';
import './ProductPage.css';
import { BackButton } from '../components/BackButton';
import { useStock } from '../context/StockContext';
import { PaymentSteps } from '../components/PaymentSteps';

export const ProductPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Determine initial payment visibility from navigation state or ?step= query param
  const navStep = (location.state && (location.state as any).openStep) as number | undefined;
  const qp = searchParams.get('step');
  const qpStep = qp ? parseInt(qp, 10) : NaN;
  const initialVisible = Number.isFinite(navStep) && navStep ? true : (!isNaN(qpStep) ? qpStep > 0 : false);
  const [showPayment, setShowPayment] = useState<boolean>(initialVisible);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedSubModelIdx, setSelectedSubModelIdx] = useState(0);
  
  const app = useMemo(() => allApps.find(a => a.id === productId), [productId]);
  const relatedApps = useMemo(() => {
    if (!app) return [];
    return allApps.filter(a => a.category === app.category && a.id !== app.id).slice(0, 4);
  }, [app]);

  if (!app) {
    return <div className="container py-20 text-center"><h2 className="text-secondary">Product Not Found</h2></div>;
  }

  const basePrice = app.ourPrice + (app.subModels ? app.subModels[selectedSubModelIdx].priceDelta : 0);
  const currentPrice = basePrice;

  return (
    <div className="product-page">
      <div className="container mt-6">
        <BackButton />
      </div>

      {/* Product Header */}
      <div className="product-header container">
         <div className="product-hero glass-card">
           <img src={app.logoUrl} alt={app.name} className="product-hero-logo" />
           <div className="product-hero-info">
             <div className="badge-tag price-tag mb-2">PREMIUM UNLOCKED</div>
             <h1 className="product-name">{app.name}</h1>
             <div className="product-rating">
               ⭐ {app.rating} from {Math.floor(Math.random() * 5000) + 1000} users
             </div>
             <div className="verification-block mt-4">
                <ShieldCheck size={20} className="animate-pulse-icon" />
                <div className="verification-text">
                  <strong>Verified Clean</strong>
                  <div className="verification-sub">Scanned with VirusTotal &amp; internal checks • Monthly re-validation</div>
                </div>
             </div>
             <div className="status-indicators mt-3">
               <span>✅ VirusTotal Verified</span>
               <span>✅ Pre-Activated</span>
               <span>✅ No Malware</span>
             </div>
             {(() => {
               const live = useStock(app.id);
               const value = typeof live === 'number' ? live : app.stock;
               return typeof value === 'number' ? <div className="stock-info mt-3">Only <strong>{value}</strong> left in stock</div> : null;
             })()}
           </div>
         </div>
      </div>

      <div className="container product-grid">
        <div className="main-col">
          {/* Pricing Section */}
          <div className="pricing-section">
            {/* SubModel Selector */}
            {app.subModels && (
              <div className="submodels-selector glass-card">
                <h3 className="section-title-sm">Select Model:</h3>
                <div className="submodel-buttons">
                  {app.subModels.map((sub, idx) => (
                    <button 
                      key={idx}
                      className={`submodel-btn ${selectedSubModelIdx === idx ? 'active' : ''}`}
                      onClick={() => setSelectedSubModelIdx(idx)}
                    >
                      <span className="submodel-name">{sub.name}</span>
                      <span className="submodel-price">+{sub.priceDelta} KSH</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Single Pricing Card */}
            <div className="pricing-card glass-card" onClick={() => setShowPayment(true)}>
              <div className="ribbon">LIFETIME ACCESS</div>
              <h3>One-Time Payment</h3>
              <div className="price-display">
                 <span className="big-price">{currentPrice}</span> KSH
              </div>
              <span className="period">/lifetime access</span>
              <p className="savings-text">No monthly subscriptions or hidden fees</p>
              <ul className="plan-perks">
                <li><Check size={16}/> Permanent lifetime access</li>
                <li><Check size={16}/> Instant credentials delivered</li>
                <li><Check size={16}/> Developer API unlocks</li>
              </ul>
              <button className="btn-primary w-full pulse-btn" onClick={(e) => { e.stopPropagation(); setShowPayment(true); }}>PROCEED TO CHECKOUT</button>
            </div>

            {/* Features */}
            <div className="app-description glass-card mt-6">
              <h3 className="section-title-sm">What Premium Gives You:</h3>
              <ul className="features-list">
                {app.features.split('•').map((feat, idx) => (
                  <li key={idx}><CheckCircle2 size={18} className="text-primary"/> {feat.trim()}</li>
                ))}
              </ul>
              <div className="tech-specs mt-4">
                <p><strong>Size:</strong> {app.size}</p>
                <p><strong>Version:</strong> 2026.1 (Latest + Pre-Activated)</p>
              </div>
            </div>

            {/* Payment Panel — simplified to a single clean panel */}
            {showPayment && (
              <div ref={(el) => { if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }} className="purchase-block mt-6">
                {!showConfirmation ? (
                  <PaymentSteps price={currentPrice} phone={"0701648600"} payerName={"Regina"} onConfirm={() => setShowConfirmation(true)} />
                ) : (
                  <div className="confirmation-panel glass-card">
                    <div className="confirmation-accent-bar"></div>
                    <div className="confirmation-inner">
                      <div className="confirmation-icon">🎉</div>
                      <h2>Payment Received!</h2>
                      <p className="confirmation-text">We're verifying your payment now. You'll receive your download link &amp; credentials via WhatsApp within <strong>2-30 minutes</strong>.</p>
                      <div className="confirmation-steps">
                        <div className="conf-step"><span className="conf-num">1</span> Verifying your screenshot</div>
                        <div className="conf-step"><span className="conf-num">2</span> Sending download link + credentials</div>
                        <div className="conf-step"><span className="conf-num">3</span> You install and enjoy!</div>
                      </div>
                      <p className="support-note">Need help? We reply 24/7 on WhatsApp</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Install guide */}
            <div className="install-guide glass-card mt-6 install-block">
              <h3 className="section-title-sm">📥 How to Install:</h3>
              <div className="step-list">
                <div className="step">
                  <span className="step-num">1</span>
                  <p>Download from the link we send via WhatsApp</p>
                </div>
                <div className="step">
                  <span className="step-num">2</span>
                  <p>Android: Enable 'Unknown Sources'. PC: Run as Admin</p>
                </div>
                <div className="step">
                  <span className="step-num">3</span>
                  <p>Enter the provided credentials and enjoy!</p>
                </div>
              </div>
              <div className="warning-box mt-4">
                ⚠️ Private logins — sharing credentials = automatic ban. One user per purchase.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Apps */}
      {relatedApps.length > 0 && (
        <div className="container mt-12 mb-12">
          <h2 className="section-title">You May Also Like</h2>
          <div className="apps-grid">
            {relatedApps.map(rApp => (
              <AppCard key={rApp.id} app={rApp} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
