'use client';

import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';
import { useState, useCallback } from 'react';
import { API_BASE_URL } from '@/lib/api';

const trackingStatuses = [
  { key: 'processed', label: 'Order Processed', description: 'Your order has been received and verified by our fulfillment team.' },
  { key: 'shipped', label: 'Shipped', description: 'Your package has left our warehouse and is in the hands of the carrier.' },
  { key: 'in_transit', label: 'In Transit', description: 'Your package is actively moving toward the destination address.' },
  { key: 'delivered', label: 'Delivered', description: 'Your package has been successfully delivered to the address on file.' },
];

type TrackingStep = {
  status: string;
  timestamp: string;
  location: string;
  description: string;
};

type TrackingData = {
  orderId: string;
  status: string;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  steps: TrackingStep[];
};

function SkeletonLine({ width = '100%', height = '16px' }: { width?: string; height?: string }) {
  return (
    <div style={{
      width,
      height,
      borderRadius: '8px',
      background: 'linear-gradient(90deg, var(--bg-raised) 25%, rgba(255,255,255,0.04) 50%, var(--bg-raised) 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    }} />
  );
}

function TrackingTimeline({ steps, status }: { steps: TrackingStep[]; status: string }) {
  const order = ['processed', 'shipped', 'in_transit', 'delivered'];
  const currentIdx = order.indexOf(status);

  return (
    <div style={{ padding: '24px 0' }}>
      {trackingStatuses.map((ts, idx) => {
        const isCompleted = idx <= currentIdx;
        const isCurrent = idx === currentIdx;
        const stepData = steps?.find((s) => s.status === ts.key);
        return (
          <div key={ts.key} style={{ display: 'flex', gap: '20px', position: 'relative' }}>
            {idx < trackingStatuses.length - 1 && (
              <div style={{
                position: 'absolute', left: '19px', top: '44px', width: '2px',
                height: 'calc(100% - 8px)',
                background: isCompleted && idx < currentIdx ? 'var(--accent-light)' : 'var(--border)',
                transition: 'background 0.5s',
              }} />
            )}
            <div style={{
              flexShrink: 0, width: '40px', height: '40px', borderRadius: '50%',
              border: `2px solid ${isCompleted ? 'var(--accent-light)' : 'var(--border)'}`,
              background: isCompleted ? 'var(--accent-light)' : 'var(--bg-raised)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
              boxShadow: isCurrent ? '0 0 0 6px rgba(99,102,241,0.15)' : 'none',
              zIndex: 1,
            }}>
              {isCompleted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--border)' }} />
              )}
            </div>
            <div style={{ paddingBottom: '32px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <h3 style={{
                    fontSize: '15px', fontWeight: 700, marginBottom: '4px',
                    color: isCurrent ? 'var(--accent-light)' : isCompleted ? 'var(--text-1)' : 'var(--text-3)',
                  }}>
                    {ts.label}
                    {isCurrent && (
                      <span style={{ marginLeft: '10px', fontSize: '10px', fontWeight: 700, background: 'var(--accent-light)', color: '#fff', padding: '2px 8px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Current
                      </span>
                    )}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-3)', margin: 0 }}>{stepData?.description || ts.description}</p>
                </div>
                {stepData?.timestamp && (
                  <span style={{ fontSize: '12px', color: 'var(--text-3)', whiteSpace: 'nowrap' }}>{stepData.timestamp}</span>
                )}
              </div>
              {stepData?.location && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-2)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {stepData.location}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function TrackOrderPage() {
  const { t } = useTranslation();
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);

  const fetchTracking = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/support/orders/track/${id}`);
      if (!res.ok) throw new Error(`Order not found (status ${res.status})`);
      const data = await res.json();
      setTrackingData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tracking information. Please try again.');
      setTrackingData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) fetchTracking(orderId.trim());
  };

  const handlePoll = async () => {
    if (!orderId.trim()) return;
    setPolling(true);
    await fetchTracking(orderId.trim());
    setPolling(false);
  };

  const cs: React.CSSProperties = { minHeight: '100vh', background: 'var(--bg-surface)', color: 'var(--text-1)', fontFamily: 'Inter, system-ui, sans-serif', paddingBottom: '80px' };
  const hero: React.CSSProperties = { background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(16,185,129,0.06) 100%)', borderBottom: '1px solid var(--border)', padding: '60px 24px 48px', textAlign: 'center' };
  const mw: React.CSSProperties = { maxWidth: '760px', margin: '0 auto', padding: '0 24px' };
  const bc: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-3)', marginBottom: '24px', justifyContent: 'center' };
  const card: React.CSSProperties = { background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '16px', padding: '28px 24px', backdropFilter: 'blur(12px)' };
  const inputCss: React.CSSProperties = { width: '100%', padding: '14px 18px', background: 'var(--bg-surface)', border: '1px solid var(--border)', borderRadius: '10px', color: 'var(--text-1)', fontSize: '15px', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.2s', fontFamily: 'Inter, system-ui, sans-serif' };
  const btnCss: React.CSSProperties = { padding: '14px 28px', background: 'var(--accent-light)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '15px', cursor: 'pointer', whiteSpace: 'nowrap' };

  return (
    <div style={cs}>
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div style={hero}>
        <div style={bc}>
          <Link href="/" style={{ color: 'var(--text-3)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-1)' }}>Track Order</span>
        </div>
        <h1 style={{ fontSize: '44px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>Track Your Order</h1>
        <p style={{ fontSize: '17px', color: 'var(--text-2)', maxWidth: '480px', margin: '0 auto' }}>
          Enter your order ID below to get real-time updates on your shipment status.
        </p>
      </div>

      <div style={{ ...mw, marginTop: '48px' }}>
        {/* Search Form */}
        <div style={card}>
          <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>Enter Order ID</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-2)', marginBottom: '20px' }}>Your order ID can be found in your confirmation email or account order history.</p>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="e.g. ZN-20240601-0042"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={inputCss}
                onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--accent-light)'; }}
                onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'var(--border)'; }}
              />
              <button type="submit" style={btnCss} disabled={loading}>
                {loading ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" opacity="0.3" />
                      <path d="M21 12c0-4.97-4.03-9-9-9" />
                    </svg>
                    Tracking...
                  </span>
                ) : 'Track Order'}
              </button>
            </div>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div style={{ ...card, marginTop: '24px', background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', gap: '14px', animation: 'fadeSlideIn 0.3s ease' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--red)', margin: '0 0 4px' }}>Tracking Failed</p>
              <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0 }}>{error}</p>
            </div>
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && (
          <div style={{ ...card, marginTop: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <SkeletonLine width="40%" height="20px" />
              <SkeletonLine width="60%" />
              <div style={{ display: 'flex', gap: '16px' }}>
                <SkeletonLine width="80px" height="80px" />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
                  <SkeletonLine width="50%" />
                  <SkeletonLine width="70%" />
                </div>
              </div>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <SkeletonLine width="40px" height="40px" />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <SkeletonLine width="30%" />
                    <SkeletonLine width="55%" height="12px" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tracking Result */}
        {trackingData && !loading && (
          <div style={{ marginTop: '24px', animation: 'fadeSlideIn 0.35s ease' }}>
            <div style={{ ...card, marginBottom: '20px', background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(16,185,129,0.06) 100%)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Order ID</p>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 12px' }}>{trackingData.orderId}</h2>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {trackingData.carrier && (
                      <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>
                        <strong style={{ color: 'var(--text-1)' }}>Carrier:</strong> {trackingData.carrier}
                      </span>
                    )}
                    {trackingData.trackingNumber && (
                      <span style={{ fontSize: '13px', color: 'var(--text-2)' }}>
                        <strong style={{ color: 'var(--text-1)' }}>Tracking #:</strong> {trackingData.trackingNumber}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '6px' }}>Estimated Delivery</p>
                  <p style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent-light)', margin: 0 }}>{trackingData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Shipment Timeline</h3>
                <button
                  onClick={handlePoll}
                  disabled={polling}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-2)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: polling ? 'spin 1s linear infinite' : 'none' }}>
                    <path d="M23 4v6h-6M1 20v-6h6" />
                    <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                  </svg>
                  {polling ? 'Refreshing...' : 'Refresh Now'}
                </button>
              </div>
              <TrackingTimeline steps={trackingData.steps || []} status={trackingData.status} />
            </div>
          </div>
        )}

        {/* Help section when no results */}
        {!trackingData && !loading && (
          <div style={{ ...card, marginTop: '24px', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ color: 'var(--accent-light)', marginBottom: '12px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>Can't find your order?</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0, lineHeight: 1.6 }}>
                Check your confirmation email for the order ID. Need help? <Link href="/contact" style={{ color: 'var(--accent-light)', textDecoration: 'none' }}>Contact our support team</Link>.
              </p>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ color: 'var(--green)', marginBottom: '12px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.63 19.79 19.79 0 01.22 1C.22.55.56.1 1.1.1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L5.18 7.38a16 16 0 006.56 6.56l1.65-1.16a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>Need live assistance?</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0, lineHeight: 1.6 }}>
                Our support team is available Mon–Fri, 9am–6pm EST. Call us at <strong style={{ color: 'var(--text-1)' }}>+1 (800) 555-0192</strong>.
              </p>
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <div style={{ color: '#a78bfa', marginBottom: '12px' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px' }}>How long does shipping take?</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-2)', margin: 0, lineHeight: 1.6 }}>
                Standard shipping takes 3–5 business days. Express is 1–2 days. See our <Link href="/shipping-returns" style={{ color: '#a78bfa', textDecoration: 'none' }}>shipping guide</Link>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
