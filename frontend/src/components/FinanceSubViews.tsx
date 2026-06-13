'use client';

import React, { useState } from 'react';
import { 
  LayoutDashboard, CreditCard, AlertTriangle, TrendingUp, Wallet, FileText, 
  DollarSign, Bell, Calendar, ArrowUpRight, Download, Search, Sparkles, 
  Plus, Phone, Printer, MoreHorizontal, Edit, HelpCircle, Briefcase, 
  GraduationCap, Clipboard, FileSpreadsheet, Send, ShieldAlert, Award, 
  Check, ChevronDown, Clock, Shield, PiggyBank, Banknote, ShoppingCart, 
  ShieldCheck, Brain, ArrowDown, ArrowUp, Zap, CheckCircle2, ChevronRight, X, Layers
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

// =====================================================
// HELPER CHART COMPONENTS (CUSTOM SVGs)
// =====================================================

interface SparklineProps {
  points?: number[];
  color: string;
  isHovered?: boolean;
}

const Sparkline: React.FC<SparklineProps> = ({ points, color, isHovered = false }) => {
  if (!points || points.length === 0) return null;
  const width = 160;
  const height = 34;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;
  const coords = points.map((p, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - 2 - ((p - min) / range) * (height - 8);
    return { x, y };
  });

  const linePath = coords.map((c, idx) => `${idx === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ');
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  const gradId = React.useId().replace(/:/g, '');

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ overflow: 'visible', display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={isHovered ? 0.25 : 0.12} style={{ transition: 'stop-opacity 0.3s ease' }} />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <path
        d={areaPath}
        fill={`url(#${gradId})`}
      />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={isHovered ? 2.0 : 1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ transition: 'stroke-width 0.3s ease' }}
      />
      {coords.map((c, idx) => (
        <circle
          key={idx}
          cx={c.x}
          cy={c.y}
          r={isHovered ? 2.8 : 1.6}
          fill="#ffffff"
          stroke={color}
          strokeWidth={isHovered ? 1.6 : 1.1}
          style={{ transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
        />
      ))}
    </svg>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: React.ReactNode;
  sparklinePoints?: number[];
  sparklineColor?: string;
  badge?: string;
  iconBg?: string;
  iconColor?: string;
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, value, change, isPositive, subtext, icon, sparklinePoints, sparklineColor = '#3b82f6', badge, iconBg, iconColor
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div 
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '16px 16px 0px 16px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minWidth: '200px',
        boxShadow: hovered ? '0 12px 20px -8px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)' : '0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        height: '135px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'capitalize', letterSpacing: '0.01em' }}>{title}</span>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: iconBg || (isPositive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)'),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: iconColor || (isPositive ? '#10b981' : '#ef4444'),
          transition: 'all 0.3s ease',
          transform: hovered ? 'scale(1.1)' : 'none'
        }}>
          {icon}
        </div>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
        <span style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>{value}</span>
        {change && (
          <span style={{
            fontSize: '10px',
            fontWeight: 700,
            background: isPositive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
            color: isPositive ? '#10b981' : '#ef4444',
            padding: '2px 6px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '1px',
            transition: 'all 0.3s ease',
            transform: hovered ? 'scale(1.05)' : 'none'
          }}>
            {isPositive ? '↑' : '↓'} {change}
          </span>
        )}
        {badge && (
          <span style={{
            fontSize: '9px',
            fontWeight: 600,
            background: 'rgba(148, 163, 184, 0.1)',
            color: '#64748b',
            padding: '1px 5px',
            borderRadius: '4px',
            marginLeft: 'auto'
          }}>{badge}</span>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', marginTop: '4px', color: '#94a3b8', zIndex: 1 }}>
        <span>{subtext}</span>
      </div>

      {sparklinePoints && (
        <div style={{ marginTop: 'auto', width: 'calc(100% + 32px)', margin: '8px -16px 0px -16px', overflow: 'hidden' }}>
          <Sparkline points={sparklinePoints} color={sparklineColor} isHovered={hovered} />
        </div>
      )}
    </div>
  );
};

interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  size?: number;
  strokeWidth?: number;
  data: DonutSegment[];
  centerText: string;
  centerSubtext: string;
}

const DonutChart: React.FC<DonutChartProps> = ({ 
  size = 130, strokeWidth = 14, data, centerText, centerSubtext 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let accumulatedLength = 0;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <svg width={size} height={size}>
        <g transform={`rotate(-90 ${size/2} ${size/2})`}>
          {data.map((item, idx) => {
            const strokeLength = (item.value / total) * circumference;
            const strokeOffset = -accumulatedLength;
            accumulatedLength += strokeLength;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                strokeLinecap="butt"
              />
            );
          })}
        </g>
      </svg>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <span style={{ fontSize: size < 110 ? '12px' : '16px', fontWeight: 700, color: '#0f172a' }}>{centerText}</span>
        <span style={{ fontSize: size < 110 ? '8px' : '9px', color: '#64748b', marginTop: '1px', textAlign: 'center', maxWidth: `${size - strokeWidth * 2 - 4}px`, lineHeight: 1.1 }}>{centerSubtext}</span>
      </div>
    </div>
  );
};

interface SemiCircleGaugeProps {
  size?: number;
  strokeWidth?: number;
  value: number;
  max?: number;
  label: string;
  sublabel: string;
}

const SemiCircleGauge: React.FC<SemiCircleGaugeProps> = ({ 
  size = 110, strokeWidth = 12, value, max = 100, label, sublabel 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeLength = percentage * circumference;
  const strokeOffset = circumference - strokeLength;

  return (
    <div style={{ position: 'relative', width: size, height: size / 2 + 10, display: 'inline-block', overflow: 'hidden' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(180deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={0}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', lineHeight: 1 }}>{label}</span>
        <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 600, marginTop: '2px' }}>{sublabel}</span>
      </div>
    </div>
  );
};

interface CircularRingProps {
  size?: number;
  strokeWidth?: number;
  value: number;
  max?: number;
  label: string;
  color?: string;
}

const CircularRing: React.FC<CircularRingProps> = ({ 
  size = 60, strokeWidth = 6, value, max = 100, label, color = "#10b981" 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = value / max;
  const strokeLength = percentage * circumference;
  const strokeOffset = circumference - strokeLength;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'inline-block' }}>
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#f1f5f9"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`}
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '11px',
        fontWeight: 700,
        color: '#0f172a',
      }}>
        {label}
      </div>
    </div>
  );
};

interface LineSeries {
  label: string;
  color: string;
  data: number[];
}

interface MainLineChartProps {
  series: LineSeries[];
  labels: string[];
  yMax: number;
  formatY: (val: number) => string;
  hoverIndex: number | null;
  setHoverIndex: (idx: number | null) => void;
  tooltipRenderer?: (idx: number) => React.ReactNode;
}

const MainLineChart: React.FC<MainLineChartProps> = ({ 
  series, labels, yMax, formatY, hoverIndex, setHoverIndex, tooltipRenderer 
}) => {
  const width = 640;
  const height = 180;
  const paddingLeft = 40;
  const paddingRight = 10;
  const paddingTop = 10;
  const paddingBottom = 20;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const pointsCount = labels.length;

  const getX = (index: number) => {
    return paddingLeft + (index / (pointsCount - 1)) * chartWidth;
  };

  const getY = (val: number) => {
    return paddingTop + chartHeight - (val / yMax) * chartHeight;
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p, idx) => {
          const y = paddingTop + chartHeight * p;
          const val = yMax * (1 - p);
          return (
            <g key={idx}>
              <line
                x1={paddingLeft}
                y1={y}
                x2={width - paddingRight}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 8}
                y={y + 3}
                textAnchor="end"
                fontSize="9.5px"
                fill="#64748b"
                fontWeight="600"
              >
                {formatY(val)}
              </text>
            </g>
          );
        })}

        {/* Labels */}
        {labels.map((l, idx) => {
          const x = getX(idx);
          return (
            <text
              key={idx}
              x={x}
              y={height - 4}
              textAnchor="middle"
              fontSize="9.5px"
              fill="#64748b"
              fontWeight="600"
            >
              {l}
            </text>
          );
        })}

        {/* Lines and circle markers */}
        {series.map((s, sIdx) => {
          const coords = s.data.map((val, idx) => `${getX(idx)},${getY(val)}`).join(' ');
          return (
            <g key={sIdx}>
              <polyline
                fill="none"
                stroke={s.color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={coords}
              />
              {s.data.map((val, idx) => (
                <circle
                  key={idx}
                  cx={getX(idx)}
                  cy={getY(val)}
                  r={hoverIndex === idx ? 5 : 3.5}
                  fill={hoverIndex === idx ? s.color : '#ffffff'}
                  stroke={s.color}
                  strokeWidth="2"
                  style={{ transition: 'all 0.1s ease' }}
                />
              ))}
            </g>
          );
        })}

        {/* Hover elements */}
        {hoverIndex !== null && hoverIndex >= 0 && hoverIndex < pointsCount && (
          <g>
            <line
              x1={getX(hoverIndex)}
              y1={paddingTop}
              x2={getX(hoverIndex)}
              y2={paddingTop + chartHeight}
              stroke="#cbd5e1"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            {series.map((s, sIdx) => (
              <circle
                key={sIdx}
                cx={getX(hoverIndex)}
                cy={getY(s.data[hoverIndex])}
                r="3.5"
                fill="#ffffff"
                stroke={s.color}
                strokeWidth="2"
              />
            ))}
          </g>
        )}

        {/* Hitboxes */}
        {labels.map((_, idx) => {
          const xStart = idx === 0 ? paddingLeft : getX(idx) - (chartWidth / (pointsCount - 1)) / 2;
          const xEnd = idx === pointsCount - 1 ? width - paddingRight : getX(idx) + (chartWidth / (pointsCount - 1)) / 2;
          return (
            <rect
              key={idx}
              x={xStart}
              y={paddingTop}
              width={xEnd - xStart}
              height={chartHeight}
              fill="transparent"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoverIndex(idx)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          );
        })}
      </svg>

      {/* Tooltip Overlay */}
      {hoverIndex !== null && tooltipRenderer && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: `${Math.min(Math.max(getX(hoverIndex) - 70, 45), width - 150)}px`,
          zIndex: 10,
          background: '#1e293b',
          color: '#ffffff',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '11px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {tooltipRenderer(hoverIndex)}
        </div>
      )}
    </div>
  );
};

interface BudgetBarItem {
  label: string;
  budget: number;
  actual: number;
}

const BudgetVsActualChart: React.FC<{ data: BudgetBarItem[] }> = ({ data }) => {
  const yMax = 6;
  const height = 150;
  const width = 280;
  const paddingLeft = 35;
  const paddingBottom = 20;
  const paddingTop = 10;
  
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingLeft;
  
  return (
    <div style={{ width: '100%' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {[0, 2, 4, 6].map((val, idx) => {
          const y = paddingTop + chartHeight - (val / yMax) * chartHeight;
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={y} x2={width} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={paddingLeft - 6} y={y + 3} textAnchor="end" fontSize="9px" fill="#94a3b8" fontWeight="600">
                ₹{val}Cr
              </text>
            </g>
          );
        })}
        
        {data.map((item, idx) => {
          const groupWidth = chartWidth / data.length;
          const xGroupStart = paddingLeft + idx * groupWidth;
          const barWidth = 9;
          const gap = 3;
          
          const budgetHeight = (item.budget / yMax) * chartHeight;
          const actualHeight = (item.actual / yMax) * chartHeight;
          
          const xBudget = xGroupStart + (groupWidth - barWidth * 2 - gap) / 2;
          const xActual = xBudget + barWidth + gap;
          
          const yBudget = paddingTop + chartHeight - budgetHeight;
          const yActual = paddingTop + chartHeight - actualHeight;
          
          return (
            <g key={idx}>
              <rect x={xBudget} y={yBudget} width={barWidth} height={budgetHeight} fill="#cbd5e1" rx="1.5" />
              <rect x={xActual} y={yActual} width={barWidth} height={actualHeight} fill="#2563eb" rx="1.5" />
              <text
                x={xGroupStart + groupWidth / 2}
                y={height - 4}
                textAnchor="middle"
                fontSize="9px"
                fill="#64748b"
                fontWeight="600"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

const ExpenseByCategoryChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const yMax = 6;
  const height = 150;
  const width = 280;
  const paddingLeft = 35;
  const paddingBottom = 20;
  const paddingTop = 10;
  
  const chartHeight = height - paddingTop - paddingBottom;
  const chartWidth = width - paddingLeft;
  
  return (
    <div style={{ width: '100%' }}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {[0, 2, 4, 6].map((val, idx) => {
          const y = paddingTop + chartHeight - (val / yMax) * chartHeight;
          return (
            <g key={idx}>
              <line x1={paddingLeft} y1={y} x2={width} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              <text x={paddingLeft - 6} y={y + 3} textAnchor="end" fontSize="9px" fill="#94a3b8" fontWeight="600">
                ₹{val}Cr
              </text>
            </g>
          );
        })}
        
        {data.map((item, idx) => {
          const groupWidth = chartWidth / data.length;
          const xGroupStart = paddingLeft + idx * groupWidth;
          const barWidth = 14;
          
          const barHeight = (item.value / yMax) * chartHeight;
          const xBar = xGroupStart + (groupWidth - barWidth) / 2;
          const yBar = paddingTop + chartHeight - barHeight;
          
          return (
            <g key={idx}>
              <rect x={xBar} y={yBar} width={barWidth} height={barHeight} fill={item.color} rx="2" />
              <text
                x={xGroupStart + groupWidth / 2}
                y={height - 4}
                textAnchor="middle"
                fontSize="9px"
                fill="#64748b"
                fontWeight="600"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};


// =====================================================
// VIEW COMPONENTS
// =====================================================

// 1. EXECUTIVE DASHBOARD SUBVIEW
export function ExecutiveDashboardSubView() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const labels = ['Apr \'25', 'May \'25', 'Jun \'25', 'Jul \'25', 'Aug \'25', 'Sep \'25', 'Oct \'25', 'Nov \'25', 'Dec \'25', 'Jan \'26', 'Feb \'26', 'Mar \'26'];
  
  const perfSeries = [
    { label: 'Revenue', color: '#2563eb', data: [1.8, 2.85, 2.2, 2.5, 2.0, 2.9, 2.7, 3.3, 3.1, 3.7, 3.5, 4.1] },
    { label: 'Expenses', color: '#ef4444', data: [1.2, 2.38, 1.8, 2.0, 1.6, 2.2, 2.1, 2.6, 2.4, 3.0, 2.8, 3.3] },
    { label: 'Net Surplus', color: '#10b981', data: [0.6, 0.47, 0.4, 0.5, 0.4, 0.7, 0.6, 0.7, 0.7, 0.7, 0.7, 0.8] }
  ];

  const cashPosData = [
    { label: 'Operating Cash', value: 1.28, color: '#2563eb' },
    { label: 'Reserves', value: 1.84, color: '#10b981' },
    { label: 'Restricted', value: 0.80, color: '#8b5cf6' }
  ];

  const revSourceData = [
    { label: 'Tuition Fees', value: 12.86, percentage: '69.9%', color: '#2563eb' },
    { label: 'Transport Fees', value: 2.80, percentage: '15.2%', color: '#a855f7' },
    { label: 'Hostel Fees', value: 1.88, percentage: '10.2%', color: '#10b981' },
    { label: 'Examination Fees', value: 1.10, percentage: '6.0%', color: '#ec4899' },
    { label: 'Other Revenue', value: 1.76, percentage: '9.6%', color: '#f97316' }
  ];

  const budgetActualData = [
    { label: 'Academics', budget: 5.2, actual: 4.8 },
    { label: 'Infrastructure', budget: 3.5, actual: 3.2 },
    { label: 'Transport', budget: 2.8, actual: 3.1 },
    { label: 'Admin', budget: 1.8, actual: 1.6 },
    { label: 'Others', budget: 2.0, actual: 1.9 }
  ];

  const tooltipRenderer = (idx: number) => {
    return (
      <>
        <div style={{ fontWeight: 700, marginBottom: '4px' }}>{labels[idx]}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <span>Revenue:</span> <span style={{ fontWeight: 600 }}>₹{perfSeries[0].data[idx].toFixed(2)} Cr</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <span>Expenses:</span> <span style={{ fontWeight: 600 }}>₹{perfSeries[1].data[idx].toFixed(2)} Cr</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', color: '#10b981' }}>
          <span>Net Surplus:</span> <span style={{ fontWeight: 700 }}>₹{perfSeries[2].data[idx].toFixed(2)} Cr</span>
        </div>
      </>
    );
  };

  return (
    <div className="cfo-dashboard-container" style={{ 
      padding: '20px', 
      background: '#f8fafc', 
      height: '100%', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .cfo-dashboard-container, .cfo-dashboard-container * {
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
        }
      `}</style>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Executive Dashboard</h1>
            <span style={{ cursor: 'pointer', color: '#94a3b8' }}>☆</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Real-time financial overview and key performance indicators of the institution.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select style={{ 
            padding: '6px 12px', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e1', 
            background: '#ffffff', 
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            outline: 'none'
          }}>
            <option>Session 2025 - 2026</option>
          </select>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500
          }}>
            <Calendar size={14} />
            <span>01 Apr 2025 - 31 Mar 2026</span>
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <KPICard 
          title="Total Revenue (YTD)" 
          value="₹18.40 Cr" 
          change="12.6%" 
          isPositive={true} 
          subtext="vs last year ₹16.34 Cr"
          icon={<CreditCard size={16} />}
          sparklinePoints={[1.5, 1.8, 1.4, 2.1, 1.9, 2.4, 2.2, 2.7, 2.5, 2.9, 2.8, 3.2]}
          sparklineColor="#3b82f6"
          iconBg="rgba(37, 99, 235, 0.08)"
          iconColor="#2563eb"
        />
        <KPICard 
          title="Net Surplus (YTD)" 
          value="₹3.22 Cr" 
          change="15.3%" 
          isPositive={true} 
          subtext="vs last year ₹2.79 Cr"
          icon={<TrendingUp size={16} />}
          sparklinePoints={[0.4, 0.6, 0.5, 0.7, 0.6, 0.8, 0.7, 0.9, 0.8, 1.0, 0.9, 1.1]}
          sparklineColor="#10b981"
          iconBg="rgba(16, 185, 129, 0.08)"
          iconColor="#10b981"
        />
        <KPICard 
          title="Collection Efficiency" 
          value="96.8%" 
          change="2.6%" 
          isPositive={true} 
          subtext="vs last month 94.2%"
          icon={<Clock size={16} />}
          sparklinePoints={[92, 93, 91, 94, 93, 95, 94, 96, 95, 96, 95, 96.8]}
          sparklineColor="#8b5cf6"
          iconBg="rgba(139, 92, 246, 0.08)"
          iconColor="#8b5cf6"
        />
        <KPICard 
          title="Outstanding Dues" 
          value="₹18.45 Lakh" 
          change="6.2%" 
          isPositive={false} 
          subtext="vs last month ₹19.65 Lakh"
          icon={<DollarSign size={16} />}
          sparklinePoints={[24, 23, 25, 22, 21, 23, 20, 19, 21, 18, 19, 18.45]}
          sparklineColor="#f97316"
          iconBg="rgba(249, 115, 22, 0.08)"
          iconColor="#f97316"
        />
        <KPICard 
          title="Budget Utilization" 
          value="82.4%" 
          change="5.1%" 
          isPositive={true} 
          subtext="vs last month 77.3%"
          icon={<Layers size={16} />}
          sparklinePoints={[75, 78, 76, 79, 78, 81, 80, 82, 81, 83, 82, 82.4]}
          sparklineColor="#06b6d4"
          iconBg="rgba(6, 182, 212, 0.08)"
          iconColor="#06b6d4"
        />
      </div>

      {/* Row 2: Performance, Cash Position, Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px' }}>
        {/* Financial Performance Trend */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Financial Performance Trend</span>
              <HelpCircle size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                display: 'flex',
                background: '#f1f5f9',
                borderRadius: '6px',
                padding: '2px'
              }}>
                {['MTD', 'QTD', 'YTD', '1Y', 'All'].map(t => (
                  <button key={t} style={{
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: 600,
                    borderRadius: '4px',
                    border: 'none',
                    background: t === 'YTD' ? '#ffffff' : 'transparent',
                    color: t === 'YTD' ? '#2563eb' : '#64748b',
                    cursor: 'pointer',
                    boxShadow: t === 'YTD' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
                  }}>{t}</button>
                ))}
              </div>
              <MoreHorizontal size={16} color="#64748b" style={{ cursor: 'pointer' }} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, color: '#64748b', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>
              <span>Revenue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
              <span>Expenses</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
              <span>Net Surplus</span>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '180px', display: 'flex', alignItems: 'center' }}>
            <MainLineChart 
              series={perfSeries} 
              labels={labels} 
              yMax={5} 
              formatY={(v) => `₹${v}Cr`} 
              hoverIndex={hoverIdx} 
              setHoverIndex={setHoverIdx}
              tooltipRenderer={tooltipRenderer}
            />
          </div>
        </div>

        {/* Cash Liquidity */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Cash Liquidity</span>
          
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
            <DonutChart 
              data={cashPosData} 
              centerText="₹3.92 Cr" 
              centerSubtext="Total" 
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px', marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
              <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2563eb' }}></span>
                Operating Cash
              </span>
              <span style={{ fontWeight: 600, color: '#334155' }}>₹1.28 Cr</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
              <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
                Reserves
              </span>
              <span style={{ fontWeight: 600, color: '#334155' }}>₹1.84 Cr</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '4px' }}>
              <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></span>
                Restricted
              </span>
              <span style={{ fontWeight: 600, color: '#334155' }}>₹80 Lakh</span>
            </div>
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            View Cash Flow <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Critical CFO Insights */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Critical CFO Insights (YTD)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {[
              { title: 'Hostel Fee Defaulters Spike', desc: '87 students have high outstanding dues above ₹20,000.', color: '#ef4444', icon: <AlertTriangle size={14} /> },
              { title: 'Salary Disbursement Pending', desc: '15 staff members payroll pending approval for disbursement.', color: '#f59e0b', icon: <Clock size={14} /> },
              { title: 'Quarterly Tax Return Audit Due', desc: 'Compliance filing is due on 15 June 2026.', color: '#2563eb', icon: <FileText size={14} /> }
            ].map((al, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '12px',
                padding: '12px 14px',
                borderRadius: '6px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderLeft: `4px solid ${al.color}`,
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                transition: 'all 0.2s'
              }}>
                <div style={{ color: al.color, marginTop: '2px', display: 'flex', alignItems: 'center' }}>{al.icon}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>{al.title}</span>
                  <span style={{ fontSize: '10.5px', color: '#64748b', lineHeight: 1.4 }}>{al.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            Resolve Alerts <ArrowUpRight size={12} />
          </a>
        </div>
      </div>

      {/* Row 3: Revenue by Source, Top Revenue Units, Budget vs Actual, Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
        {/* Revenue by Source */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Revenue by Source (YTD)</span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '12px 0', flex: 1 }}>
            <div style={{ flexShrink: 0 }}>
              <DonutChart 
                data={revSourceData} 
                centerText="₹18.40 Cr" 
                centerSubtext="Total Revenue" 
                size={96}
                strokeWidth={9}
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10px', flex: 1 }}>
              {revSourceData.map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '2px', alignItems: 'center' }}>
                  <span style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: r.color }}></span>
                    {r.label}
                  </span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>
                    ₹{r.value.toFixed(2)} Cr <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '9px' }}>({r.percentage})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            View Revenue Analytics <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Fee Collection Components */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Fee Collection components (YTD)</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
            {[
              { label: 'Tuition Fees', amount: '₹12.86 Cr', pct: 96.8, color: '#2563eb' },
              { label: 'Transport Fees', amount: '₹2.80 Cr', pct: 94.6, color: '#06b6d4' },
              { label: 'Hostel Fees', amount: '₹1.88 Cr', pct: 95.7, color: '#8b5cf6' },
              { label: 'Food Services', amount: '₹58.00 L', pct: 89.6, color: '#f59e0b' },
              { label: 'Others', amount: '₹30.00 L', pct: 90.0, color: '#64748b' }
            ].map((e, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                  <span style={{ fontWeight: 500, color: '#475569' }}>{e.label}</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{e.amount} <span style={{ color: '#10b981', fontWeight: 600 }}>({e.pct.toFixed(1)}%)</span></span>
                </div>
                <div style={{ width: '100%', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${e.pct}%`, height: '100%', background: e.color, borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            View Detailed Components <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Budget vs Actual */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Budget vs Actual (YTD)</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: 600, color: '#64748b', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '7px', height: '7px', background: '#cbd5e1', borderRadius: '1.5px' }}></span>
              <span>Budget</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '7px', height: '7px', background: '#2563eb', borderRadius: '1.5px' }}></span>
              <span>Actual</span>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <BudgetVsActualChart data={budgetActualData} />
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            View Budget Report <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Quick Actions</span>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
            {[
              { label: 'Fee Collection', desc: 'Record and track fees', icon: <CreditCard size={14} />, target: 'finance-fee-collection', color: '#2563eb' },
              { label: 'Defaulters List', desc: 'Recovery & reminders', icon: <AlertTriangle size={14} />, target: 'finance-defaulters', color: '#ef4444' },
              { label: 'Payroll Manager', desc: 'Staff salaries & slips', icon: <Wallet size={14} />, target: 'finance-payroll', color: '#10b981' },
              { label: 'Financial Reports', desc: 'P&L, Balance Sheet', icon: <FileText size={14} />, target: 'finance-reports', color: '#8b5cf6' }
            ].map((a, idx) => {
              const setFinanceSubView = useAppStore(s => s.setFinanceSubView);
              return (
                <button 
                  key={idx} 
                  onClick={() => setFinanceSubView(a.target as any)}
                  style={{
                    background: '#ffffff',
                    border: '1px solid #f1f5f9',
                    borderRadius: '6px',
                    padding: '10px 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                    transition: 'all 0.2s',
                    outline: 'none',
                    width: '100%'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#cbd5e1';
                    e.currentTarget.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#f1f5f9';
                    e.currentTarget.style.background = '#ffffff';
                  }}
                >
                  <div style={{
                    minWidth: '24px',
                    height: '24px',
                    borderRadius: '4px',
                    background: `rgba(${a.color === '#2563eb' ? '37, 99, 235' : a.color === '#ef4444' ? '239, 68, 68' : a.color === '#10b981' ? '16, 185, 129' : '139, 92, 246'}, 0.08)`,
                    color: a.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {a.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2 }}>{a.label}</span>
                    <span style={{ fontSize: '8px', color: '#64748b', marginTop: '1px' }}>{a.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 4: Recent Activity, Approvals, Financial Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1.5fr', gap: '20px', marginBottom: '10px' }}>
        {/* Recent Activity */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Recent Activity</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', flex: 1, paddingLeft: '8px', marginTop: '4px' }}>
            {/* Dotted vertical line guide */}
            <div style={{
              position: 'absolute',
              left: '11px',
              top: '4px',
              bottom: '4px',
              width: '1px',
              borderLeft: '1.5px dotted #cbd5e1',
              zIndex: 0
            }} />
            
            {[
              { text: '₹42,500 Tuition fee received from Aarav Sharma (Class X-A).', time: '2 mins ago', dotColor: '#10b981' },
              { text: 'Salary disbursement for May 2026 initiated for 142 staff members.', time: '1 hour ago', dotColor: '#2563eb' },
              { text: 'Requisition order approved for Lab Equipment: ₹2,40,000.', time: '4 hours ago', dotColor: '#f59e0b' }
            ].map((al, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
                position: 'relative',
                zIndex: 1
              }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: '#ffffff', 
                  border: `2.5px solid ${al.dotColor}`,
                  marginTop: '4px',
                  flexShrink: 0
                }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: '#334155', lineHeight: 1.4, fontWeight: 500 }}>{al.text}</span>
                  <span style={{ fontSize: '9px', color: '#94a3b8' }}>{al.time}</span>
                </div>
              </div>
            ))}
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            View Full Activity Log <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Approvals & Requisitions */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Approvals & Requisitions</span>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#2563eb',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer'
            }}>View All</button>
          </div>

          <div style={{ flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <th style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, paddingBottom: '8px' }}>Request Item</th>
                  <th style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, paddingBottom: '8px' }}>Department</th>
                  <th style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, paddingBottom: '8px', textAlign: 'right' }}>Amount</th>
                  <th style={{ fontSize: '10px', color: '#64748b', fontWeight: 600, paddingBottom: '8px', textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Lab Equipment', dept: 'Science Lab', amt: '₹2,40,000', status: 'Pending' },
                  { name: 'Library Books', dept: 'Library', amt: '₹85,000', status: 'Pending' },
                  { name: 'Transport Diesel', dept: 'Logistics', amt: '₹1,20,000', status: 'Approved' }
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: i === 2 ? 'none' : '1px solid #f8fafc' }}>
                    <td style={{ fontSize: '11px', color: '#1e293b', padding: '8px 0', fontWeight: 600 }}>{row.name}</td>
                    <td style={{ fontSize: '10.5px', color: '#475569', padding: '8px 0' }}>{row.dept}</td>
                    <td style={{ fontSize: '11px', color: '#0f172a', padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>{row.amt}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right' }}>
                      {row.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                          <span style={{ fontSize: '9px', color: '#10b981', fontWeight: 700, cursor: 'pointer' }}>Approve</span>
                          <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 700, cursor: 'pointer' }}>Reject</span>
                        </div>
                      ) : (
                        <span style={{
                          fontSize: '8px',
                          background: 'rgba(16, 185, 129, 0.08)',
                          color: '#10b981',
                          fontWeight: 700,
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Financial Health Score */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '14px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Financial Health Score</span>
            <HelpCircle size={12} color="#94a3b8" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <SemiCircleGauge value={88} max={100} label="88/100" sublabel="Excellent" />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10.5px' }}>
              {[
                { label: 'Profitability', val: '88/100', color: '#10b981' },
                { label: 'Liquidity', val: '90/100', color: '#10b981' },
                { label: 'Solvency', val: '89/100', color: '#10b981' },
                { label: 'Leverage', val: '85/100', color: '#10b981' }
              ].map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f8fafc', paddingBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>• {h.label}</span>
                  <span style={{ fontWeight: 600, color: '#1e293b' }}>{h.val}</span>
                </div>
              ))}
            </div>
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '16px' }}>
            View Financial Health Details <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

// 2. FEE COLLECTION SUBVIEW
export function FeeCollectionSubView() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const labels = ['Apr \'25', 'May \'25', 'Jun \'25', 'Jul \'25', 'Aug \'25', 'Sep \'25', 'Oct \'25', 'Nov \'25', 'Dec \'25', 'Jan \'26', 'Feb \'26', 'Mar \'26'];
  
  const series = [
    { label: 'Tuition Fees', color: '#2563eb', data: [15, 20, 18, 22, 19, 25, 23, 28, 26, 30, 32, 35] },
    { label: 'Transport Fees', color: '#10b981', data: [5, 8, 7, 10, 9, 12, 11, 13, 12, 14, 15, 17] },
    { label: 'Hostel Fees', color: '#8b5cf6', data: [3, 5, 4, 6, 5, 8, 7, 9, 8, 9, 10, 11] },
    { label: 'Examination Fees', color: '#f59e0b', data: [1, 2, 1, 3, 2, 4, 3, 5, 4, 5, 5, 6] },
    { label: 'Other Fees', color: '#06b6d4', data: [2, 3, 2, 4, 3, 5, 4, 5, 4, 5, 6, 7] }
  ];

  const payMethods = [
    { label: 'Online Payment', value: 62.4, color: '#2563eb' },
    { label: 'UPI', value: 18.7, color: '#10b981' },
    { label: 'Card', value: 9.3, color: '#8b5cf6' },
    { label: 'Cash', value: 7.1, color: '#f59e0b' },
    { label: 'Cheque', value: 2.5, color: '#64748b' }
  ];

  const tooltipRenderer = (idx: number) => {
    const total = series.reduce((sum, s) => sum + s.data[idx], 0);
    return (
      <>
        <div style={{ fontWeight: 700, marginBottom: '4px' }}>{labels[idx]}</div>
        {series.map((s, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <span>{s.label}:</span> <span>₹{(s.data[idx] * 100000).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', borderTop: '1px solid #475569', paddingTop: '4px', marginTop: '4px', fontWeight: 700 }}>
          <span>Total:</span> <span>₹{(total * 100000).toLocaleString('en-IN')}</span>
        </div>
      </>
    );
  };

  // Heatmap helper matrix: 6 rows (X to V), 12 columns
  const heatmapData = [
    [3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3], // X
    [3, 3, 2, 3, 3, 2, 2, 3, 2, 3, 3, 3], // IX
    [3, 2, 2, 3, 2, 2, 1, 2, 2, 2, 3, 3], // VIII
    [2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2], // VII
    [2, 2, 1, 2, 1, 1, 0, 1, 1, 2, 2, 2], // VI
    [1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1], // V
  ];

  const classRows = [
    { name: 'X', coll: '₹1,72,40,000', due: '₹1,75,20,000', pct: 98 },
    { name: 'IX', coll: '₹1,68,10,000', due: '₹1,83,50,000', pct: 91 },
    { name: 'VIII', coll: '₹1,42,80,000', due: '₹1,63,60,000', pct: 87 },
    { name: 'VII', coll: '₹1,23,40,000', due: '₹1,48,20,000', pct: 83 },
    { name: 'VI', coll: '₹98,60,000', due: '₹1,21,70,000', pct: 81 },
    { name: 'V', coll: '₹78,00,000', due: '₹1,03,30,000', pct: 75 },
    { name: 'IV', coll: '₹56,70,000', due: '₹78,60,000', pct: 72 },
    { name: 'III', coll: '₹34,20,000', due: '₹46,50,000', pct: 74 },
    { name: 'II', coll: '₹18,30,000', due: '₹24,20,000', pct: 76 },
    { name: 'I', coll: '₹9,60,000', due: '₹12,60,000', pct: 77 }
  ];

  const recentTxns = [
    { rcpt: 'RCPT-2026-00501', name: 'Aarav Sharma', id: 'ACX-STU-H4D9K7P2', class: 'X-A', cat: 'Tuition Fees', amt: '₹25,000', method: 'UPI', time: '31 May, 2026 11:24 AM', by: 'Rajesh Kumar' },
    { rcpt: 'RCPT-2026-00500', name: 'Riya Patel', id: 'ACX-STU-KBL3M2N1', class: 'IX-B', cat: 'Transport Fees', amt: '₹6,000', method: 'Card', time: '31 May, 2026 10:58 AM', by: 'Anita Singh' },
    { rcpt: 'RCPT-2026-00489', name: 'Vivaan Mehta', id: 'ACX-STU-P6T5R8V3', class: 'X-A', cat: 'Hostel Fees', amt: '₹12,500', method: 'Net Banking', time: '31 May, 2026 10:35 AM', by: 'Rajesh Kumar' },
    { rcpt: 'RCPT-2026-00498', name: 'Ananya Singh', id: 'ACX-STU-W7X2Y9Z1', class: 'VIII-C', cat: 'Examination Fees', amt: '₹2,000', method: 'UPI', time: '31 May, 2026 10:12 AM', by: 'Anita Singh' },
    { rcpt: 'RCPT-2026-00497', name: 'Kabir Verma', id: 'ACX-STU-G3H8J6K4', class: 'X-B', cat: 'Tuition Fees', amt: '₹18,000', method: 'Card', time: '31 May, 2026 09:45 AM', by: 'Rajesh Kumar' }
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f8fafc', 
      height: '100%', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Fee Collection</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Track and analyze fee collections in real-time with intelligent insights.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search anything..." style={{
              padding: '6px 10px 6px 30px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '13px',
              width: '180px',
              outline: 'none'
            }} />
          </div>

          <select style={{ 
            padding: '6px 12px', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e1', 
            background: '#ffffff', 
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            outline: 'none'
          }}>
            <option>2025 - 2026</option>
          </select>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            <Download size={14} /> Export Report
          </button>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#2563eb',
            fontSize: '13px',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            <FileText size={14} /> Generate Collection Report
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <KPICard 
          title="TOTAL FEE COLLECTED (YTD)" 
          value="₹12.86 Cr" 
          change="12.6%" 
          isPositive={true} 
          subtext="92.4% collected"
          icon={<CreditCard size={16} />}
          sparklinePoints={[8.5, 9.2, 9.0, 9.6, 9.4, 10.0, 9.8, 10.4, 10.2, 10.8, 10.6, 12.86]}
          sparklineColor="#3b82f6"
        />
        <KPICard 
          title="NET COLLECTION RATE" 
          value="96.8%" 
          change="2.6%" 
          isPositive={true} 
          subtext="vs last month"
          icon={<Wallet size={16} />}
          sparklinePoints={[92, 93, 91, 94, 93, 95, 94, 96, 95, 96, 95, 96.8]}
          sparklineColor="#10b981"
        />
        <KPICard 
          title="TRANSACTION VOLUME" 
          value="16,840 Transactions" 
          change="8.4%" 
          isPositive={true} 
          subtext="91.2% digital"
          icon={<Layers size={16} />}
          sparklinePoints={[12000, 13000, 12500, 13500, 13000, 14200, 13800, 14800, 14500, 15500, 15000, 16840]}
          sparklineColor="#8b5cf6"
        />
        <KPICard 
          title="OUTSTANDING DUES (YTD)" 
          value="₹18.45 Lakh" 
          change="4.2%" 
          isPositive={false} 
          subtext="vs last month"
          icon={<TrendingUp size={16} />}
          sparklinePoints={[22, 24, 21, 23, 20, 22, 19, 21, 18, 20, 19, 18.45]}
          sparklineColor="#f97316"
        />
      </div>

      {/* Row 2: Overview, Channel, PG Health */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1.2fr', gap: '20px' }}>
        {/* Collection Trends */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Collection Trends</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <select style={{ 
                padding: '4px 8px', 
                borderRadius: '6px', 
                border: '1px solid #cbd5e1', 
                background: '#ffffff', 
                fontSize: '11px',
                color: '#334155',
                fontWeight: 500,
                outline: 'none'
              }}>
                <option>Monthly</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '10px', fontWeight: 600, color: '#64748b', marginBottom: '16px', flexWrap: 'wrap' }}>
            {series.map((s, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }}></span>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, minHeight: '180px', display: 'flex', alignItems: 'center' }}>
            <MainLineChart 
              series={series} 
              labels={labels} 
              yMax={50} 
              formatY={(v) => `₹${v}L`} 
              hoverIndex={hoverIdx} 
              setHoverIndex={setHoverIdx}
              tooltipRenderer={tooltipRenderer}
            />
          </div>
        </div>

        {/* Collection Channel */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Collection Channel</span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '8px 0', flex: 1 }}>
            <DonutChart 
              data={payMethods} 
              centerText="62.4%" 
              centerSubtext="Online" 
              size={90}
              strokeWidth={10}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9px', flex: 1 }}>
              {payMethods.map((pm, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
                  <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: pm.color }}></span>
                    {pm.label}
                  </span>
                  <span style={{ fontWeight: 700, color: '#334155' }}>{pm.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dues Trend & PG Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Outstanding Dues Trend */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            flex: 1
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>Outstanding Dues Trend</span>
                <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a', marginTop: '4px' }}>₹18.45 Lakh</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '11px' }}>
                <span style={{ color: '#ef4444', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1px' }}>
                  <ArrowDown size={11} /> 4.2%
                </span>
                <span style={{ color: '#94a3b8', marginTop: '2px' }}>vs last month</span>
              </div>
            </div>
            
            <div style={{ height: '20px', marginTop: '12px' }}>
              <Sparkline points={[22, 24, 21, 23, 20, 22, 19, 21, 18, 20, 19, 18.45]} color="#ef4444" />
            </div>
          </div>

          {/* Payment Gateway Health */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            flex: 1
          }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginBottom: '8px' }}>Payment Gateway Health</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10px' }}>
              {[
                { name: 'Razorpay', success: '99.8% Success', color: '#10b981' },
                { name: 'HDFC PG', success: '99.2% Success', color: '#10b981' },
                { name: 'Cashfree', success: '98.7% Success', color: '#10b981' },
                { name: 'UPI Gateway', success: '99.9% Success', color: '#10b981' },
                { name: 'Paytm PG', success: '98.1% Success', color: '#10b981' }
              ].map((pg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '3px' }}>
                  <span style={{ color: '#334155', fontWeight: 500 }}>{pg.name}</span>
                  <span style={{ color: pg.color, fontWeight: 700 }}>{pg.success}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Class-wise, Installment Status, Heatmap, Fee Category Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr', gap: '20px' }}>
        {/* Class-wise & Section-wise */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Class-wise Collection</span>
          
          <div style={{ flex: 1, overflowY: 'auto', maxHeight: '180px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#64748b', fontWeight: 600 }}>
                  <th style={{ paddingBottom: '6px' }}>Class</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Collected</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {classRows.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '6px 0', fontWeight: 600, color: '#334155' }}>Class {c.name}</td>
                    <td style={{ padding: '6px 0', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{c.coll}</td>
                    <td style={{ padding: '6px 0', textAlign: 'right', color: '#f97316' }}>{c.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Installment Status (YTD) */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Installment Status (YTD)</span>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#64748b', fontWeight: 600 }}>
                  <th style={{ paddingBottom: '6px' }}>Installment</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Demand</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Collected</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Overdue</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Installment 1', demand: '₹3.50 Cr', collected: '₹3.48 Cr', overdue: '₹50 K' },
                  { name: 'Installment 2', demand: '₹3.50 Cr', collected: '₹3.42 Cr', overdue: '₹1.50 L' },
                  { name: 'Installment 3', demand: '₹3.50 Cr', collected: '₹3.15 Cr', overdue: '₹8.00 L' },
                  { name: 'Installment 4', demand: '₹3.50 Cr', collected: '₹2.79 Cr', overdue: '₹25.00 L' }
                ].map((inst, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '8px 0', fontWeight: 600, color: '#334155' }}>{inst.name}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#64748b' }}>{inst.demand}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{inst.collected}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#ef4444', fontWeight: 600 }}>{inst.overdue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Collection Heatmap */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Collection Heatmap</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'flex', fontSize: '9px', color: '#94a3b8', fontWeight: 600, paddingLeft: '20px', marginBottom: '4px' }}>
              {['Apr', 'Jun', 'Aug', 'Oct', 'Dec', 'Feb'].map((m) => (
                <span key={m} style={{ flex: 1, textAlign: 'center' }}>{m}</span>
              ))}
            </div>

            {['X', 'IX', 'VIII', 'VII', 'VI', 'V'].map((cName, rIdx) => (
              <div key={rIdx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '14px', fontSize: '9px', color: '#64748b', fontWeight: 700, textAlign: 'right' }}>{cName}</span>
                <div style={{ display: 'flex', gap: '3px', flex: 1 }}>
                  {heatmapData[rIdx].slice(0, 6).map((val, cIdx) => {
                    const color = val === 3 ? '#10b981' : val === 2 ? '#34d399' : val === 1 ? '#f59e0b' : '#fef08a';
                    return (
                      <div
                        key={cIdx}
                        title={`Class ${cName}: ${val === 3 ? '90-100%' : val === 2 ? '75-90%' : val === 1 ? '60-75%' : '<60%'}`}
                        style={{
                          flex: 1,
                          aspectRatio: '1',
                          background: color,
                          borderRadius: '2px',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '4px', fontSize: '7px', color: '#64748b', fontWeight: 600, justifyContent: 'center', marginTop: '12px' }}>
            <span style={{ width: '6px', height: '6px', background: '#fef08a', borderRadius: '1px' }}></span>
            <span>&lt;75%</span>
            <span style={{ width: '6px', height: '6px', background: '#f59e0b', borderRadius: '1px' }}></span>
            <span>75-90%</span>
            <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '1px' }}></span>
            <span>90%+</span>
          </div>
        </div>

        {/* Fee Category Distribution */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Fee Category Distribution</span>
          
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#64748b', fontWeight: 600 }}>
                  <th style={{ paddingBottom: '6px' }}>Category</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Collected</th>
                  <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Outstanding</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Tuition Fees', collected: '₹12.42 Cr', out: '₹44.00 L', color: '#2563eb' },
                  { name: 'Transport Fees', collected: '₹2.65 Cr', out: '₹15.00 L', color: '#10b981' },
                  { name: 'Hostel Fees', collected: '₹1.80 Cr', out: '₹8.00 L', color: '#8b5cf6' },
                  { name: 'Food Services', collected: '₹52.00 L', out: '₹6.00 L', color: '#f59e0b' }
                ].map((cat, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '8px 0', fontWeight: 600, color: '#334155', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.color }}></span>
                      {cat.name}
                    </td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#10b981', fontWeight: 600 }}>{cat.collected}</td>
                    <td style={{ padding: '8px 0', textAlign: 'right', color: '#f97316', fontWeight: 600 }}>{cat.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Row 4: Recent Collections Table */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Recent Collections <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 400 }}>Real-time transactions</span></span>
          <button style={{
            background: 'transparent',
            border: 'none',
            color: '#2563eb',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer'
          }}>View all transactions →</button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
              <th style={{ paddingBottom: '8px' }}>Receipt No.</th>
              <th style={{ paddingBottom: '8px' }}>Student Name</th>
              <th style={{ paddingBottom: '8px' }}>Akedex ID</th>
              <th style={{ paddingBottom: '8px' }}>Class</th>
              <th style={{ paddingBottom: '8px' }}>Fee Category</th>
              <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Amount</th>
              <th style={{ paddingBottom: '8px' }}>Payment Method</th>
              <th style={{ paddingBottom: '8px' }}>Date & Time</th>
              <th style={{ paddingBottom: '8px' }}>Received By</th>
              <th style={{ paddingBottom: '8px' }}>Status</th>
              <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentTxns.map((row, i) => (
              <tr key={i} style={{ borderBottom: i === 4 ? 'none' : '1px solid #f1f5f9' }}>
                <td style={{ padding: '10px 0', color: '#2563eb', fontWeight: 600 }}>{row.rcpt}</td>
                <td style={{ padding: '10px 0', fontWeight: 600, color: '#334155' }}>{row.name}</td>
                <td style={{ padding: '10px 0', color: '#64748b' }}>{row.id}</td>
                <td style={{ padding: '10px 0', color: '#475569' }}>{row.class}</td>
                <td style={{ padding: '10px 0', color: '#475569' }}>{row.cat}</td>
                <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{row.amt}</td>
                <td style={{ padding: '10px 0', color: '#475569' }}>
                  <span style={{
                    fontSize: '9px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}>{row.method}</span>
                </td>
                <td style={{ padding: '10px 0', color: '#64748b' }}>{row.time}</td>
                <td style={{ padding: '10px 0', color: '#475569' }}>{row.by}</td>
                <td style={{ padding: '10px 0' }}>
                  <span style={{
                    fontSize: '9px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    color: '#10b981',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>Paid</span>
                </td>
                <td style={{ padding: '10px 0', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', color: '#64748b' }}>
                    <Search size={12} style={{ cursor: 'pointer' }} />
                    <Printer size={12} style={{ cursor: 'pointer' }} />
                    <MoreHorizontal size={12} style={{ cursor: 'pointer' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 3. DEFAULTERS & RECOVERY SUBVIEW
export function DefaultersRecoverySubView() {
  const [activeTab, setActiveTab] = useState('all');
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const labels = ['1 May', '8 May', '15 May', '22 May', '31 May'];
  const recoverySeries = [
    { label: 'Recovery Rate', color: '#2563eb', data: [75.0, 75.8, 76.2, 76.0, 76.4] }
  ];

  const duesAgeingData = [
    { label: '0-30 Days', value: 6.25, color: '#10b981' },
    { label: '31-60 Days', value: 5.40, color: '#f59e0b' },
    { label: '61-90 Days', value: 3.65, color: '#f97316' },
    { label: '90+ Days', value: 3.15, color: '#ef4444' }
  ];

  const defaulters = [
    { name: 'Aarav Sharma', parent: 'Rajesh Sharma', id: 'ACX-STU-H4D9K7P2', class: 'X-A', due: '₹25,000', overdue: '₹25,000', days: '45 Days', risk: 'High', date: '10 Apr 2026' },
    { name: 'Riya Patel', parent: 'Mahesh Patel', id: 'ACX-STU-KBL3M2N1', class: 'IX-B', due: '₹18,500', overdue: '₹18,500', days: '32 Days', risk: 'Medium', date: '15 Apr 2026' },
    { name: 'Vivaan Mehta', parent: 'Hiren Mehta', id: 'ACX-STU-P6T5R8V3', class: 'X-A', due: '₹15,000', overdue: '₹15,000', days: '28 Days', risk: 'Medium', date: '18 Apr 2026' },
    { name: 'Ananya Singh', parent: 'Sandeep Singh', id: 'ACX-STU-W7X2Y9Z1', class: 'VIII-C', due: '₹9,800', overdue: '₹9,800', days: '15 Days', risk: 'Low', date: '25 Apr 2026' },
    { name: 'Kabir Verma', parent: 'Deepak Verma', id: 'ACX-STU-G3H8J6K4', class: 'X-B', due: '₹8,000', overdue: '₹8,000', days: '12 Days', risk: 'Low', date: '28 Apr 2026' }
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f8fafc', 
      height: '100%', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Defaulters & Recovery</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Track outstanding dues and manage recovery efficiently.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search student, ID or parents..." style={{
              padding: '6px 10px 6px 30px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '13px',
              width: '210px',
              outline: 'none'
            }} />
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            <Download size={14} /> Export
          </button>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#2563eb',
            fontSize: '13px',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            <Send size={14} /> Send Bulk Reminder
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <KPICard 
          title="TOTAL OUTSTANDING" 
          value="₹18,45,000" 
          change="4.2%" 
          isPositive={false} 
          subtext="vs last month"
          icon={<DollarSign size={16} />}
          sparklinePoints={[22, 24, 21, 23, 20, 22, 19, 21, 18, 20, 19, 18.45]}
          sparklineColor="#ef4444"
          badge="328 Students"
        />
        <KPICard 
          title="TOTAL DEFAULTERS" 
          value="87" 
          change="12.4%" 
          isPositive={false} 
          subtext="vs last month"
          icon={<AlertTriangle size={16} />}
          sparklinePoints={[77, 80, 78, 82, 81, 85, 83, 86, 85, 89, 86, 87]}
          sparklineColor="#f97316"
        />
        <KPICard 
          title="RECOVERY RATE" 
          value="76.4%" 
          change="4.6%" 
          isPositive={true} 
          subtext="vs last month"
          icon={<TrendingUp size={16} />}
          sparklinePoints={[73, 74, 73, 75, 74, 76, 75, 77, 76, 78, 76, 76.4]}
          sparklineColor="#10b981"
        />
        <KPICard 
          title="PROMISE TO PAY (PTP)" 
          value="120 Cases" 
          change="₹6.4 Lakhs" 
          isPositive={true} 
          subtext="value overdue"
          icon={<Clock size={16} />}
          sparklinePoints={[90, 95, 100, 105, 100, 110, 108, 115, 112, 118, 115, 120]}
          sparklineColor="#8b5cf6"
        />
        <KPICard 
          title="ESCALATED CASES" 
          value="41 Students" 
          change="6.2%" 
          isPositive={false} 
          subtext="vs last month"
          icon={<Brain size={16} />}
          sparklinePoints={[35, 38, 36, 39, 38, 41, 40, 42, 41, 43, 42, 41]}
          sparklineColor="#3b82f6"
        />
      </div>

      {/* Row 2: Table Section */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
      }}>
        {/* Table Filters Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[
              { id: 'all', label: 'All Defaulters (328)' },
              { id: 'high', label: 'High Risk (87)' },
              { id: 'medium', label: 'Medium Risk (154)' },
              { id: 'low', label: 'Low Risk (87)' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: activeTab === t.id ? '#2563eb' : 'transparent',
                  color: activeTab === t.id ? '#ffffff' : '#64748b',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <select style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
              <option>All Classes</option>
            </select>
            <select style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
              <option>All Fee Categories</option>
            </select>
            <select style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
              <option>May 2026</option>
            </select>
          </div>
        </div>

        {/* Defaulter Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
              <th style={{ paddingBottom: '10px' }}>Student</th>
              <th style={{ paddingBottom: '10px' }}>Akedex ID</th>
              <th style={{ paddingBottom: '10px' }}>Class</th>
              <th style={{ paddingBottom: '10px', textAlign: 'right' }}>Total Due</th>
              <th style={{ paddingBottom: '10px', textAlign: 'right' }}>Overdue</th>
              <th style={{ paddingBottom: '10px', textAlign: 'right' }}>Days Overdue</th>
              <th style={{ paddingBottom: '10px', textAlign: 'center' }}>Risk Level</th>
              <th style={{ paddingBottom: '10px' }}>Last Payment</th>
              <th style={{ paddingBottom: '10px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {defaulters
              .filter(d => activeTab === 'all' || d.risk.toLowerCase() === activeTab)
              .map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '10px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '50%',
                        background: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '10px'
                      }}>{row.name.split(' ').map(n=>n[0]).join('')}</div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, color: '#334155' }}>{row.name}</span>
                        <span style={{ fontSize: '9px', color: '#94a3b8' }}>Father: {row.parent}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '10px 0', color: '#64748b' }}>{row.id}</td>
                  <td style={{ padding: '10px 0', color: '#475569' }}>{row.class}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', color: '#475569' }}>{row.due}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', color: '#ef4444', fontWeight: 600 }}>{row.overdue}</td>
                  <td style={{ padding: '10px 0', textAlign: 'right', color: '#ef4444', fontWeight: 600 }}>{row.days}</td>
                  <td style={{ padding: '10px 0', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      background: row.risk === 'High' ? 'rgba(239, 68, 68, 0.08)' : row.risk === 'Medium' ? 'rgba(245, 158, 11, 0.08)' : 'rgba(16, 185, 129, 0.08)',
                      color: row.risk === 'High' ? '#ef4444' : row.risk === 'Medium' ? '#f59e0b' : '#10b981',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}>{row.risk}</span>
                  </td>
                  <td style={{ padding: '10px 0', color: '#64748b' }}>{row.date}</td>
                  <td style={{ padding: '10px 0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', color: '#2563eb' }}>
                      <span title="Send Reminder" style={{ cursor: 'pointer', display: 'inline-flex' }}><Send size={12} /></span>
                      <span title="Call Parent" style={{ cursor: 'pointer', color: '#64748b', display: 'inline-flex' }}><Phone size={12} /></span>
                      <span title="Generate Notice" style={{ cursor: 'pointer', color: '#64748b', display: 'inline-flex' }}><FileText size={12} /></span>
                      <MoreHorizontal size={12} style={{ cursor: 'pointer', color: '#64748b' }} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {/* Footer info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '14px', fontSize: '11px', color: '#64748b' }}>
          <span>Showing 1 to 5 of 328 students</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ padding: '2px 8px', background: '#2563eb', color: '#ffffff', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>1</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>2</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>3</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>4</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>5</span>
            <span style={{ padding: '2px 4px' }}>...</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer' }}>66</span>
            <span style={{ padding: '2px 8px', cursor: 'pointer', fontWeight: 600 }}>&gt;</span>
          </div>
        </div>
      </div>

      {/* Row 3: Ageing, Recovery Performance, Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1.5fr', gap: '20px', marginBottom: '10px' }}>
        {/* Dues Ageing Summary */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Dues Ageing Summary</span>
          
          <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
            <DonutChart 
              data={duesAgeingData} 
              centerText="₹18.45 L" 
              centerSubtext="Total Due" 
              size={120}
              strokeWidth={12}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10.5px', marginTop: '12px' }}>
            {duesAgeingData.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '3px' }}>
                <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: d.color }}></span>
                  {d.label}
                </span>
                <span style={{ fontWeight: 600, color: '#334155' }}>
                  ₹{d.value.toFixed(2)} Lakh <span style={{ color: '#94a3b8', fontWeight: 400 }}>({((d.value / 18.45) * 100).toFixed(1)}%)</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Performance */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Recovery Performance</span>
            <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
              <option>This Month</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '14px' }}>
            <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f172a' }}>76.4%</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10.5px' }}>
              <span style={{ color: '#64748b' }}>Recovery Rate</span>
              <span style={{ color: '#10b981', fontWeight: 600 }}>↑ 4.6% <span style={{ fontWeight: 400, color: '#94a3b8' }}>vs last month</span></span>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '130px', display: 'flex', alignItems: 'center' }}>
            <MainLineChart 
              series={recoverySeries} 
              labels={labels} 
              yMax={100} 
              formatY={(v) => `${v}%`} 
              hoverIndex={hoverIdx} 
              setHoverIndex={setHoverIdx}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>Quick Actions</span>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
            {[
              { label: 'Send Reminder', desc: 'Send SMS / Email', icon: <Send size={14} />, color: '#3b82f6' },
              { label: 'Auto Notice', desc: 'Generate Notice', icon: <FileText size={14} />, color: '#ef4444' },
              { label: 'Payment Plan', desc: 'Create Payment Plan', icon: <Calendar size={14} />, color: '#3b82f6' },
              { label: 'Call Parent', desc: 'Contact Parent', icon: <Phone size={14} />, color: '#10b981' },
              { label: 'Collection Report', desc: 'View Report', icon: <FileSpreadsheet size={14} />, color: '#f59e0b' },
              { label: 'Recovery Settings', desc: 'Manage Rules', icon: <Shield size={14} />, color: '#8b5cf6' }
            ].map((a, idx) => (
              <button key={idx} style={{
                background: '#ffffff',
                border: '1px solid #f1f5f9',
                borderRadius: '6px',
                padding: '10px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#f1f5f9';
                e.currentTarget.style.background = '#ffffff';
              }}
              >
                <div style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: `rgba(${a.color === '#3b82f6' ? '59, 130, 246' : a.color === '#ef4444' ? '239, 68, 68' : a.color === '#10b981' ? '16, 185, 129' : '245, 158, 11'}, 0.08)`,
                  color: a.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {a.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2 }}>{a.label}</span>
                  <span style={{ fontSize: '8px', color: '#64748b', marginTop: '1px' }}>{a.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. PAYROLL MANAGEMENT SUBVIEW
export function PayrollSubView() {
  const [activeTab, setActiveTab] = useState('payroll');

  const deptPayroll = [
    { label: 'Academics', value: 1540000, color: '#2563eb' },
    { label: 'Administration', value: 785000, color: '#10b981' },
    { label: 'Support Staff', value: 595000, color: '#8b5cf6' },
    { label: 'Transport', value: 280000, color: '#f59e0b' },
    { label: 'Others', value: 80000, color: '#64748b' }
  ];

  const deductionsData = [
    { label: 'PF (Employee)', value: 245600, color: '#2563eb' },
    { label: 'Professional Tax', value: 68900, color: '#10b981' },
    { label: 'TDS', value: 125000, color: '#8b5cf6' },
    { label: 'Other Deductions', value: 58650, color: '#f59e0b' }
  ];

  const payrollEmployees = [
    { name: 'Dr. Rakesh Sharma', id: 'EMP-ACX-0001', dept: 'Academics', desig: 'Principal', sal: '₹1,45,000', ded: '₹18,650', net: '₹1,26,350' },
    { name: 'Ms. Priya Mehta', id: 'EMP-ACX-0015', dept: 'Academics', desig: 'Head of Department', sal: '₹85,000', ded: '₹10,200', net: '₹74,800' },
    { name: 'Mr. Vikram Singh', id: 'EMP-ACX-0023', dept: 'Administration', desig: 'Administrator', sal: '₹65,000', ded: '₹7,800', net: '₹57,200' },
    { name: 'Mrs. Neha Patel', id: 'EMP-ACX-0031', dept: 'Academics', desig: 'Teacher', sal: '₹45,000', ded: '₹5,400', net: '₹39,600' },
    { name: 'Mr. Arjun Verma', id: 'EMP-ACX-0042', dept: 'Transport', desig: 'Transport Manager', sal: '₹38,000', ded: '₹4,560', net: '₹33,440' },
    { name: 'Mr. Suresh Yadav', id: 'EMP-ACX-0058', dept: 'Support Staff', desig: 'Lab Assistant', sal: '₹22,000', ded: '₹2,640', net: '₹19,360' },
    { name: 'Mrs. Kavita Joshi', id: 'EMP-ACX-0067', dept: 'Administration', desig: 'Accountant', sal: '₹32,000', ded: '₹3,840', net: '₹28,160' },
    { name: 'Mr. Deepak Kumar', id: 'EMP-ACX-0079', dept: 'Support Staff', desig: 'Office Assistant', sal: '₹20,000', ded: '₹2,400', net: '₹17,600' }
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f8fafc', 
      height: '100%', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Payroll Management</h1>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Manage staff salaries, payroll processing and payments with accuracy and compliance.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input type="text" placeholder="Search staff, employee ID..." style={{
              padding: '6px 10px 6px 30px',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '13px',
              width: '210px',
              outline: 'none'
            }} />
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            <FileText size={14} /> Reports
          </button>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: 'none',
            background: '#2563eb',
            fontSize: '13px',
            color: '#ffffff',
            fontWeight: 600,
            cursor: 'pointer'
          }}>
            <Zap size={14} /> Process Payroll
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <KPICard 
          title="TOTAL PAYROLL COST (YTD)" 
          value="₹2,86,45,000" 
          change="8.4%" 
          isPositive={true} 
          subtext="98.4% budgeted"
          icon={<Wallet size={16} />}
          sparklinePoints={[30.0, 30.5, 30.2, 31.0, 30.5, 31.8, 31.2, 32.2, 31.5, 32.5, 32.0, 32.8]}
          sparklineColor="#3b82f6"
        />
        <KPICard 
          title="NET SALARY PAID" 
          value="₹2,45,18,000" 
          change="12.6%" 
          isPositive={true} 
          subtext="vs last month"
          icon={<CheckCircle2 size={16} />}
          sparklinePoints={[22, 23.5, 22.8, 23.2, 23.0, 24.1, 23.8, 24.5, 24.0, 24.8, 24.2, 24.518]}
          sparklineColor="#10b981"
        />
        <KPICard 
          title="PENDING APPROVALS" 
          value="12" 
          change="₹4.2 Lakhs" 
          isPositive={false} 
          subtext="pending action"
          icon={<Clock size={16} />}
          sparklinePoints={[8, 12, 10, 14, 11, 15, 12, 16, 13, 18, 15, 12]}
          sparklineColor="#ef4444"
        />
        <KPICard 
          title="NEXT PAYROLL DATE" 
          value="30 Jun 2026" 
          change="" 
          isPositive={true} 
          subtext="18 Days Left"
          icon={<Calendar size={16} />}
        />
        <KPICard 
          title="COMPLIANCE PAID" 
          value="₹41,27,000" 
          change="100%" 
          isPositive={true} 
          subtext="100% on time"
          icon={<CreditCard size={16} />}
          sparklinePoints={[35, 36, 35.5, 37, 36.5, 38, 37.5, 39, 38.5, 40, 39.5, 41.27]}
          sparklineColor="#8b5cf6"
          badge="100%"
        />
      </div>

      {/* Stepper Timeline */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Payroll Timeline - May 2026</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, justifyContent: 'center', maxWidth: '75%' }}>
          {[
            { label: 'Timesheet Review', date: '20 May 2026', done: true },
            { label: 'Taxes & Deductions', date: '21 May 2026', done: true },
            { label: 'Review & Approve', date: '22 May 2026', done: true },
            { label: 'Payment Routing', date: '23 May 2026', done: true },
            { label: 'Paid', date: '31 May 2026', done: 'paid' }
          ].map((st, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '90px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: st.done === 'paid' ? '#2563eb' : '#10b981',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={14} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#334155', textAlign: 'center' }}>{st.label}</span>
                <span style={{ fontSize: '8.5px', color: '#94a3b8' }}>{st.date}</span>
              </div>
              {i < 4 && <div style={{ height: '2px', background: '#e2e8f0', flex: 1, marginTop: '-20px' }} />}
            </React.Fragment>
          ))}
        </div>

        <span style={{
          fontSize: '9.5px',
          background: 'rgba(16, 185, 129, 0.08)',
          color: '#10b981',
          fontWeight: 700,
          padding: '4px 8px',
          borderRadius: '4px'
        }}>✓ Completed</span>
      </div>

      {/* Row 3: Employee Table (Left) & Sidebar (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Payroll Table */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          {/* Table Header Controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button
                onClick={() => setActiveTab('payroll')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: activeTab === 'payroll' ? '#2563eb' : '#64748b',
                  borderBottom: activeTab === 'payroll' ? '2px solid #2563eb' : 'none',
                  paddingBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                Employee Payroll
              </button>
              <button
                onClick={() => setActiveTab('reimb')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: activeTab === 'reimb' ? '#2563eb' : '#64748b',
                  borderBottom: activeTab === 'reimb' ? '2px solid #2563eb' : 'none',
                  paddingBottom: '8px',
                  cursor: 'pointer'
                }}
              >
                Reimbursements
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
                <option>May 2026</option>
              </select>
              <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
                <option>All Departments</option>
              </select>
              <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
                <option>All Designations</option>
              </select>
              <select style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', background: '#ffffff', outline: 'none' }}>
                <option>All Statuses</option>
              </select>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ paddingBottom: '8px' }}>Employee</th>
                <th style={{ paddingBottom: '8px' }}>Employee ID</th>
                <th style={{ paddingBottom: '8px' }}>Department</th>
                <th style={{ paddingBottom: '8px' }}>Designation</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Basic Salary</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Deductions</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Net Payable</th>
                <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Status</th>
                <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {payrollEmployees.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#e2e8f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '9px'
                      }}>{row.name.split(' ').map(n=>n[0]).join('')}</div>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{row.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{row.id}</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{row.dept}</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{row.desig}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#475569' }}>{row.sal}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#ef4444' }}>{row.ded}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{row.net}</td>
                  <td style={{ padding: '8px 0', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      color: '#10b981',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>Paid</span>
                  </td>
                  <td style={{ padding: '8px 0', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', color: '#64748b' }}>
                      <Search size={12} style={{ cursor: 'pointer' }} />
                      <Printer size={12} style={{ cursor: 'pointer' }} />
                      <MoreHorizontal size={12} style={{ cursor: 'pointer' }} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '11px', color: '#64748b' }}>
            <span>Showing 1 to 8 of 128 employees</span>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <span style={{ padding: '2px 8px', background: '#2563eb', color: '#ffffff', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>1</span>
              <span style={{ padding: '2px 8px', cursor: 'pointer' }}>2</span>
              <span style={{ padding: '2px 8px', cursor: 'pointer' }}>3</span>
              <span style={{ padding: '2px 4px' }}>...</span>
              <span style={{ padding: '2px 8px', cursor: 'pointer' }}>16</span>
              <span style={{ padding: '2px 8px', cursor: 'pointer', fontWeight: 600 }}>&gt;</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Dept Donut, Bank details, Quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Department Summary Donut */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Payroll Summary by Department</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
              <DonutChart 
                data={deptPayroll} 
                centerText="₹32.80 L" 
                centerSubtext="Total Paid" 
                size={100}
                strokeWidth={11}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9px', flex: 1 }}>
                {deptPayroll.map((dp, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: dp.color }}></span>
                      {dp.label}
                    </span>
                    <span style={{ fontWeight: 700, color: '#334155' }}>
                      {((dp.value / 3280000) * 100).toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payroll Bank Summary */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            gap: '8px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Payroll Bank Summary</span>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px',
              borderRadius: '6px',
              background: '#f8fafc',
              border: '1px solid #cbd5e1'
            }}>
              <div style={{ color: '#2563eb' }}><ShieldCheck size={20} /></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e293b' }}>Paid via HDFC Bank - Salary A/C</span>
                <span style={{ fontSize: '9px', color: '#64748b', marginTop: '2px' }}>A/C No. **** 4567</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px', marginTop: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '3px' }}>
                <span style={{ color: '#64748b' }}>No. of Employees Paid</span>
                <span style={{ fontWeight: 600 }}>128</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '3px' }}>
                <span style={{ color: '#64748b' }}>Total Amount Paid</span>
                <span style={{ fontWeight: 600 }}>₹32,80,000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9', paddingBottom: '3px' }}>
                <span style={{ color: '#64748b' }}>Transaction ID</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>PAY-250523-001</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Payment Date</span>
                <span style={{ fontWeight: 600, color: '#334155' }}>23 May 2026, 10:45 AM</span>
              </div>
            </div>

            <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '8px' }}>
              View Payment Details <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}>
            <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Quick Actions</span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { label: 'Add Allowance / Deduction', icon: <Plus size={12} /> },
                { label: 'Payroll Settings', icon: <Shield size={12} /> },
                { label: 'Generate Payslips', icon: <FileText size={12} /> },
                { label: 'Salary Structure', icon: <Layers size={12} /> }
              ].map((act, i) => (
                <button key={i} style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#334155',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#cbd5e1';
                  e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.background = '#ffffff';
                }}
                >
                  <span style={{ color: '#2563eb' }}>{act.icon}</span>
                  <span style={{ textAlign: 'left', lineHeight: 1.2 }}>{act.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Salary Structure, Deductions & Compliance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.3fr 1.5fr', gap: '20px', marginBottom: '10px' }}>
        {/* Salary Structure Summary */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Salary Structure Summary</span>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '10.5px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9', color: '#64748b', fontWeight: 600 }}>
                <th style={{ paddingBottom: '6px' }}>Category</th>
                <th style={{ paddingBottom: '6px', textAlign: 'center' }}>Employees</th>
                <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Avg. Basic</th>
                <th style={{ paddingBottom: '6px', textAlign: 'right' }}>Avg. CTC</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Teaching Staff', count: 72, basic: '₹56,250', ctc: '₹7,21,000' },
                { name: 'Administrative Staff', count: 28, basic: '₹42,150', ctc: '₹5,15,000' },
                { name: 'Support Staff', count: 28, basic: '₹22,180', ctc: '₹2,85,000' },
                { name: 'Total', count: 128, basic: '₹42,450', ctc: '₹15,21,000', bold: true }
              ].map((row, i) => (
                <tr key={i} style={{ 
                  borderBottom: i === 3 ? 'none' : '1px solid #f8fafc',
                  fontWeight: row.bold ? 700 : 400,
                  color: row.bold ? '#0f172a' : '#475569'
                }}>
                  <td style={{ padding: '6px 0' }}>{row.name}</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>{row.count}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>{row.basic}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>{row.ctc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Deductions Overview */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Deductions Overview</span>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            <DonutChart 
              data={deductionsData} 
              centerText="₹4.98 L" 
              centerSubtext="Total Deductions" 
              size={110}
              strokeWidth={11}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '9px', flex: 1 }}>
              {deductionsData.map((d, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
                  <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: d.color }}></span>
                    {d.label.split(' ')[0]}
                  </span>
                  <span style={{ fontWeight: 700, color: '#334155' }}>
                    {((d.value / 498150) * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statutory Compliance */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Statutory Compliance</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {[
              { label: 'PF Compliance', date: 'April 2026' },
              { label: 'ESI Compliance', date: 'April 2026' },
              { label: 'TDS Filing', date: 'Q4 FY 2025-26' },
              { label: 'Professional Tax', date: 'April 2026' }
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', borderBottom: '1px solid #f8fafc', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={8} />
                  </span>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{c.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#64748b', fontSize: '9.5px' }}>{c.date}</span>
                  <span style={{
                    fontSize: '8px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    color: '#10b981',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>Completed</span>
                </div>
              </div>
            ))}
          </div>

          <a href="#" style={{ fontSize: '11px', fontWeight: 600, color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '2px', marginTop: '8px' }}>
            View Compliance Details <ArrowUpRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

// 5. FINANCIAL REPORTS SUBVIEW
export function FinancialReportsSubView() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const labels = ['Apr \'25', 'May \'25', 'Jun \'25', 'Jul \'25', 'Aug \'25', 'Sep \'25', 'Oct \'25', 'Nov \'25', 'Dec \'25', 'Jan \'26', 'Feb \'26', 'Mar \'26'];
  const cashFlowSeries = [
    { label: 'Cash Inflow', color: '#2563eb', data: [1.8, 2.85, 2.2, 2.5, 2.0, 2.9, 2.7, 3.3, 3.1, 3.7, 3.5, 4.1] },
    { label: 'Cash Outflow', color: '#ef4444', data: [1.2, 2.38, 1.8, 2.0, 1.6, 2.2, 2.1, 2.6, 2.4, 3.0, 2.8, 3.3] },
    { label: 'Net Cash Flow', color: '#10b981', data: [0.6, 0.47, 0.4, 0.5, 0.4, 0.7, 0.6, 0.7, 0.7, 0.7, 0.7, 0.8] }
  ];

  const payMethods = [
    { label: 'Net Banking', value: 42.4, color: '#2563eb' },
    { label: 'UPI', value: 28.7, color: '#10b981' },
    { label: 'Cards', value: 18.2, color: '#8b5cf6' },
    { label: 'Cash', value: 7.1, color: '#f59e0b' },
    { label: 'Cheque', value: 3.6, color: '#64748b' }
  ];

  const deptPayroll = [
    { label: 'Academics', value: 1540000, color: '#2563eb' },
    { label: 'Administration', value: 785000, color: '#10b981' },
    { label: 'Support Staff', value: 595000, color: '#8b5cf6' },
    { label: 'Transport', value: 280000, color: '#f59e0b' },
    { label: 'Others', value: 80000, color: '#64748b' }
  ];

  const tooltipRenderer = (idx: number) => {
    return (
      <>
        <div style={{ fontWeight: 700, marginBottom: '4px' }}>{labels[idx]}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
          <span>Inflow:</span> <span style={{ fontWeight: 600 }}>₹{cashFlowSeries[0].data[idx].toFixed(2)} Cr</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', color: '#ef4444' }}>
          <span>Outflow:</span> <span style={{ fontWeight: 600 }}>₹{cashFlowSeries[1].data[idx].toFixed(2)} Cr</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px', borderTop: '1px solid #475569', paddingTop: '4px', marginTop: '4px', color: '#10b981', fontWeight: 700 }}>
          <span>Net Flow:</span> <span>₹{cashFlowSeries[2].data[idx].toFixed(2)} Cr</span>
        </div>
      </>
    );
  };

  const budgetRows = [
    { dept: 'Academics', budget: '₹5.20 Cr', actual: '₹4.80 Cr', util: '92.3%', status: 'Under Budget', color: '#10b981' },
    { dept: 'Infrastructure', budget: '₹3.50 Cr', actual: '₹3.20 Cr', util: '91.4%', status: 'Under Budget', color: '#10b981' },
    { dept: 'Transport', budget: '₹2.80 Cr', actual: '₹3.10 Cr', util: '110.7%', status: 'Over Budget', color: '#ef4444' },
    { dept: 'Support Services', budget: '₹1.80 Cr', actual: '₹1.60 Cr', util: '88.9%', status: 'Under Budget', color: '#10b981' },
    { dept: 'Others', budget: '₹2.00 Cr', actual: '₹1.90 Cr', util: '95.0%', status: 'Within Budget', color: '#2563eb' }
  ];

  const recentTxns = [
    { date: '31 May 2026, 11:24 AM', desc: 'Aarav Sharma - Tuition Fee', cat: 'Fee Collection', amt: '₹25,000', ref: 'RCPT-00501', status: 'Paid' },
    { date: '30 May 2026, 04:30 PM', desc: 'HDFC Bank Transfer - May Salaries', cat: 'Payroll', amt: '₹1,09,80,000', ref: 'TXN-PAY-0089', status: 'Disbursed' },
    { date: '28 May 2026, 02:15 PM', desc: 'Lab Equipment Vendor', cat: 'Infrastructure', amt: '₹2,40,000', ref: 'INV-LAB-881', status: 'Paid' },
    { date: '25 May 2026, 10:12 AM', desc: 'Library Books Vendor', cat: 'Academics', amt: '₹85,000', ref: 'INV-LIB-442', status: 'Paid' },
    { date: '24 May 2026, 09:45 AM', desc: 'Transport Fuel', cat: 'Operations', amt: '₹1,20,000', ref: 'RCPT-FUEL-902', status: 'Paid' }
  ];

  return (
    <div style={{ 
      padding: '20px', 
      background: '#f8fafc', 
      height: '100%', 
      overflowY: 'auto', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px',
      fontFamily: 'system-ui, sans-serif'
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: 0 }}>Financial Analytics</h1>
            <span style={{ cursor: 'pointer', color: '#94a3b8' }}>☆</span>
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0' }}>Access, generate and schedule financial statements and reports.</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select style={{ 
            padding: '6px 12px', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e1', 
            background: '#ffffff', 
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            outline: 'none'
          }}>
            <option>Session 2025 - 2026</option>
          </select>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500
          }}>
            <Calendar size={14} />
            <span>01 Apr 2025 - 31 Mar 2026</span>
          </div>

          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #cbd5e1',
            background: '#ffffff',
            fontSize: '13px',
            color: '#334155',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            <Download size={14} /> Export
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <KPICard 
          title="Net Available Cash" 
          value="₹11,18,72,500" 
          change="12.6%" 
          isPositive={true} 
          subtext="vs last year"
          icon={<CreditCard size={16} />}
          sparklinePoints={[1.5, 1.8, 1.4, 2.1, 1.9, 2.4, 2.2, 2.7, 2.5, 2.9, 2.8, 3.2]}
          sparklineColor="#10b981"
        />
        <KPICard 
          title="Operating Expenses" 
          value="₹1,84,10,000" 
          change="8.4%" 
          isPositive={false} 
          subtext="utilization"
          icon={<Wallet size={16} />}
          sparklinePoints={[24, 23, 25, 22, 21, 23, 20, 19, 21, 18, 19, 18.41]}
          sparklineColor="#ef4444"
        />
        <KPICard 
          title="Pending Collection" 
          value="₹12,80,000" 
          change="328 Students" 
          isPositive={true} 
          subtext="outstanding dues"
          icon={<Clock size={16} />}
          sparklinePoints={[92, 93, 91, 94, 93, 95, 94, 96, 95, 96, 95, 96.8]}
          sparklineColor="#3b82f6"
        />
        <KPICard 
          title="Payroll Management" 
          value="₹1,09,80,000" 
          change="Paid" 
          isPositive={true} 
          subtext="this month"
          icon={<Layers size={16} />}
          sparklinePoints={[75, 78, 76, 79, 78, 81, 80, 82, 81, 83, 82, 82.4]}
          sparklineColor="#8b5cf6"
        />
      </div>

      {/* Row 2: Cash Flow Trend & Efficiency/Distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
        {/* Net Cash Flow Trend */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>Net Cash Flow Trend (Monthly)</span>
              <HelpCircle size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 600, color: '#64748b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }}></span>
                <span>Inflow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span>
                <span>Outflow</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span>
                <span>Net Flow</span>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '180px', display: 'flex', alignItems: 'center' }}>
            <MainLineChart 
              series={cashFlowSeries} 
              labels={labels} 
              yMax={5} 
              formatY={(v) => `₹${v}Cr`} 
              hoverIndex={hoverIdx} 
              setHoverIndex={setHoverIdx}
              tooltipRenderer={tooltipRenderer}
            />
          </div>
        </div>

        {/* Efficiency Gauges & Outstanding & Distribution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Efficiency Rings */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CircularRing value={82.4} max={100} label="82.4%" color="#3b82f6" size={64} strokeWidth={6} />
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, textAlign: 'center' }}>Operating Efficiency</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <CircularRing value={96.8} max={100} label="96.8%" color="#10b981" size={64} strokeWidth={6} />
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500, textAlign: 'center' }}>Collection Efficiency</span>
            </div>
          </div>

          {/* Outstanding Dues Sparkline */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>Outstanding Dues Trend</span>
                <span style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a', marginTop: '2px' }}>₹18.45 Lakh</span>
              </div>
              <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 600 }}>↓ 4.2% vs last month</span>
            </div>
            <div style={{ height: '20px', marginTop: '8px' }}>
              <Sparkline points={[22, 24, 21, 23, 20, 22, 19, 21, 18, 20, 19, 18.45]} color="#ef4444" />
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div style={{
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
          }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Payment Method Distribution</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <DonutChart 
                data={payMethods} 
                centerText="42.4%" 
                centerSubtext="Net Banking" 
                size={80}
                strokeWidth={9}
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '9px', flex: 1 }}>
                {payMethods.slice(0, 4).map((pm, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc', paddingBottom: '2px' }}>
                    <span style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: pm.color }}></span>
                      {pm.label}
                    </span>
                    <span style={{ fontWeight: 700, color: '#334155' }}>{pm.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Cash Flow Breakdown & Department Payroll */}
      <div style={{ display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: '20px' }}>
        {/* Cash Flow Breakdown (YTD) */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Cash Flow Breakdown (YTD)</span>
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
            {[
              { label: 'Opening Balance', amt: '₹1.12 Cr', desc: 'As of 01 Apr 2025', color: '#2563eb' },
              { label: 'Cash Inflow', amt: '₹12.86 Cr', desc: 'Tuition & other fees', color: '#10b981' },
              { label: 'Cash Outflow', amt: '₹1.84 Cr', desc: 'Salaries & expenses', color: '#ef4444' },
              { label: 'Net Cash Flow', amt: '₹11.02 Cr', desc: 'Net surplus', color: '#10b981' },
              { label: 'Closing Balance', amt: '₹12.14 Cr', desc: 'As of 31 May 2026', color: '#2563eb' }
            ].map((item, idx) => (
              <div key={idx} style={{
                flex: 1,
                padding: '10px',
                borderRadius: '6px',
                background: '#f8fafc',
                border: '1px solid #f1f5f9',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                <span style={{ fontSize: '9px', color: '#64748b', fontWeight: 600 }}>{item.label}</span>
                <span style={{ fontSize: '14px', fontWeight: 700, color: item.color }}>{item.amt}</span>
                <span style={{ fontSize: '8px', color: '#94a3b8' }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payroll Department Summary */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Payroll Department Summary</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DonutChart 
              data={deptPayroll} 
              centerText="₹32.8 L" 
              centerSubtext="Total Cost" 
              size={64}
              strokeWidth={8}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '9px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ color: '#64748b' }}>Academics</span>
                <span style={{ fontWeight: 700, color: '#334155' }}>₹15.4 L</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ color: '#64748b' }}>Admin</span>
                <span style={{ fontWeight: 700, color: '#334155' }}>₹7.8 L</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f8fafc' }}>
                <span style={{ color: '#64748b' }}>Support</span>
                <span style={{ fontWeight: 700, color: '#334155' }}>₹5.9 L</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Budget Allocation & Compliance */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        {/* Department-wise Budget Allocation */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Department-wise Budget Allocation</span>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ paddingBottom: '8px' }}>Department</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Budgeted</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Actual Spent</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Utilization</th>
                <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {budgetRows.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', fontWeight: 600, color: '#334155' }}>{row.dept}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#475569' }}>{row.budget}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#0f172a', fontWeight: 600 }}>{row.actual}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', color: '#475569' }}>{row.util}</td>
                  <td style={{ padding: '8px 0', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      background: `${row.color}14`,
                      color: row.color,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Statutory Compliance Checklist */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '10px' }}>Statutory Compliance</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, justifyContent: 'center' }}>
            {[
              { label: 'PF Compliance', date: 'April 2026' },
              { label: 'ESI Compliance', date: 'April 2026' },
              { label: 'TDS Filing', date: 'Q4 FY 2025-26' },
              { label: 'GST Return Filing', date: 'April 2026' }
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', borderBottom: '1px solid #f8fafc', paddingBottom: '4px' }}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={8} />
                  </span>
                  <span style={{ fontWeight: 600, color: '#334155' }}>{c.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#64748b', fontSize: '9.5px' }}>{c.date}</span>
                  <span style={{
                    fontSize: '8px',
                    background: 'rgba(16, 185, 129, 0.08)',
                    color: '#10b981',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5: Recent Transactions & Quick Actions */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '10px' }}>
        {/* Recent Transactions */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>Recent Transactions</span>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', fontWeight: 600 }}>
                <th style={{ paddingBottom: '8px' }}>Date & Time</th>
                <th style={{ paddingBottom: '8px' }}>Description</th>
                <th style={{ paddingBottom: '8px' }}>Category</th>
                <th style={{ paddingBottom: '8px', textAlign: 'right' }}>Amount</th>
                <th style={{ paddingBottom: '8px' }}>Reference</th>
                <th style={{ paddingBottom: '8px', textAlign: 'center' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTxns.map((row, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{row.date}</td>
                  <td style={{ padding: '8px 0', fontWeight: 600, color: '#334155' }}>{row.desc}</td>
                  <td style={{ padding: '8px 0', color: '#475569' }}>{row.cat}</td>
                  <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: 700, color: '#0f172a' }}>{row.amt}</td>
                  <td style={{ padding: '8px 0', color: '#64748b' }}>{row.ref}</td>
                  <td style={{ padding: '8px 0', textAlign: 'center' }}>
                    <span style={{
                      fontSize: '9px',
                      background: 'rgba(16, 185, 129, 0.08)',
                      color: '#10b981',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Report Management Actions */}
        <div style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
          borderRadius: '8px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
        }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', marginBottom: '14px' }}>Report Management Actions</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, justifyContent: 'center' }}>
            {[
              { label: 'Schedule New Report', desc: 'Auto-email configurations', icon: <Clock size={14} />, color: '#3b82f6' },
              { label: 'Configure Email Delivery', desc: 'Set recipient email lists', icon: <Send size={14} />, color: '#10b981' },
              { label: 'Manage Report Templates', desc: 'Customize layouts & charts', icon: <Edit size={14} />, color: '#8b5cf6' },
              { label: 'Tax Filing Settings', desc: 'PAN, TAN & GST credentials', icon: <Shield size={14} />, color: '#ef4444' }
            ].map((a, idx) => (
              <button key={idx} style={{
                background: '#ffffff',
                border: '1px solid #f1f5f9',
                borderRadius: '6px',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                transition: 'all 0.2s',
                outline: 'none',
                width: '100%'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1';
                e.currentTarget.style.background = '#f8fafc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#f1f5f9';
                e.currentTarget.style.background = '#ffffff';
              }}
              >
                <div style={{
                  minWidth: '24px',
                  height: '24px',
                  borderRadius: '4px',
                  background: `rgba(${a.color === '#3b82f6' ? '59, 130, 246' : a.color === '#10b981' ? '16, 185, 129' : a.color === '#8b5cf6' ? '139, 92, 246' : '239, 68, 68'}, 0.08)`,
                  color: a.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {a.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: '#1e293b', lineHeight: 1.2 }}>{a.label}</span>
                  <span style={{ fontSize: '8px', color: '#64748b', marginTop: '1px' }}>{a.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
