import React, { useState } from 'react';
import { 
  BarChart3, Calendar, ArrowUpRight, ArrowDownRight, ArrowLeft, TrendingUp, Award, CalendarCheck, CalendarX, Clock, ShieldCheck, CheckCircle2, CalendarDays,
  DollarSign, AlertTriangle, Plus, Search, Filter, ChevronRight, CreditCard, Download, Eye, MoreVertical, X, Percent, Trophy, Star, Trash2, Building,
  FileSpreadsheet, FileText, UserCheck, Printer, Folder, CheckCircle, Shield, ShieldAlert, MessageSquare, LogOut, HelpCircle, Layers, Medal, Target, Users, Hash, MapPin, Zap
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart
} from 'recharts';

// --- Shared Recharts Components ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: entry.color }}></span>
            <span style={{ fontWeight: 500 }}>{entry.name}:</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{entry.value}{entry.unit || '%'}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// --- ACADEMICS TAB ---
export function StudentAcademicsTab({ studentId }: { studentId: string }) {
  const idNum = parseInt(studentId.replace(/\D/g, '') || '1');
  const isBase = idNum === 1;

  // Exact data matching screenshot for base student
  const gpa = isBase ? '7.9' : (7.5 + (idNum % 20) / 10).toFixed(1);
  const gpaDiff = isBase ? '+0.6' : '+' + (0.2 + (idNum % 5) / 10).toFixed(1);
  const avgPct = isBase ? '88.4' : (82.0 + (idNum % 15)).toFixed(1);
  const pctDiff = isBase ? '+5.2' : '+' + (2.0 + (idNum % 6)).toFixed(1);
  const rank = isBase ? 12 : 1 + (idNum % 40);
  const rankDiff = isBase ? '+5' : '+' + (1 + (idNum % 5));

  const subjects = isBase ? [
    { name: 'English', current: 85, previous: 78, grade: 'A', prevGrade: 'B+', change: '+7%', changeGrade: '+1' },
    { name: 'Maths', current: 92, previous: 84, grade: 'A+', prevGrade: 'A', change: '+8%', changeGrade: '+1' },
    { name: 'Science', current: 88, previous: 81, grade: 'A', prevGrade: 'A', change: '+7%', changeGrade: '-' },
    { name: 'Social Sci.', current: 76, previous: 70, grade: 'B+', prevGrade: 'B', change: '+6%', changeGrade: '+1' },
    { name: 'Hindi', current: 90, previous: 86, grade: 'A+', prevGrade: 'A', change: '+4%', changeGrade: '-' },
    { name: 'Sanskrit', current: 95, previous: 92, grade: 'A+', prevGrade: 'A+', change: '+3%', changeGrade: '-' },
    { name: 'Computer', current: 87, previous: 79, grade: 'A', prevGrade: 'B+', change: '+8%', changeGrade: '+1' },
    { name: 'Physical Ed.', current: 93, previous: 88, grade: 'A+', prevGrade: 'A', change: '+5%', changeGrade: '+1' }
  ] : [
    { name: 'English', current: 85 - (idNum%5), previous: 78 - (idNum%4), grade: 'A', prevGrade: 'B+', change: '+7%', changeGrade: '+1' },
    { name: 'Maths', current: 92 - (idNum%3), previous: 84 - (idNum%6), grade: 'A+', prevGrade: 'A', change: '+8%', changeGrade: '+1' },
    { name: 'Science', current: 88 - (idNum%7), previous: 81 - (idNum%5), grade: 'A', prevGrade: 'A', change: '+7%', changeGrade: '-' },
    { name: 'Social Sci.', current: 76 - (idNum%4), previous: 70 - (idNum%3), grade: 'B+', prevGrade: 'B', change: '+6%', changeGrade: '+1' },
    { name: 'Hindi', current: 90 - (idNum%2), previous: 86 - (idNum%4), grade: 'A+', prevGrade: 'A', change: '+4%', changeGrade: '-' },
    { name: 'Sanskrit', current: 95 - (idNum%5), previous: 92 - (idNum%2), grade: 'A+', prevGrade: 'A+', change: '+3%', changeGrade: '-' },
    { name: 'Computer', current: 87 - (idNum%6), previous: 79 - (idNum%4), grade: 'A', prevGrade: 'B+', change: '+8%', changeGrade: '+1' },
    { name: 'Physical Ed.', current: 93 - (idNum%3), previous: 88 - (idNum%5), grade: 'A+', prevGrade: 'A', change: '+5%', changeGrade: '+1' }
  ];

  const gpaTrend = [{v: 6.8}, {v: 7.1}, {v: 7.0}, {v: 7.3}, {v: parseFloat(gpa)}];
  const pctTrend = [{v: 78}, {v: 80}, {v: 81}, {v: 83}, {v: parseFloat(avgPct)}];
  const rankTrend = [{v: 17}, {v: 18}, {v: 15}, {v: 14}, {v: rank}]; // Lower is better

  const trendData = Array.from({length: 10}).map((_, i) => ({
    name: `W${i+1}`,
    current: isBase ? 30 + (i * 6) + Math.random() * 5 : 20 + (i * 7) + (idNum%3),
    previous: isBase ? 15 + (i * 6.5) + Math.random() * 3 : 18 + (i * 6) + (idNum%4)
  }));

  const pieData = [
    { name: 'A+', value: 2, color: '#8b5cf6' },
    { name: 'A', value: 3, color: '#3b82f6' },
    { name: 'B+', value: 2, color: '#10b981' },
    { name: 'B', value: 1, color: '#f59e0b' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease', fontFamily: 'var(--font-sans)' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          
          
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '4px' }}>Compare With</span>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none', width: '140px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <option>Previous Term</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '4px' }}>This Term (Term 1)</span>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none', width: '160px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <option>2024-25</option>
            </select>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '16px' }}>vs</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '4px' }}>Previous Term (Term 4)</span>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none', width: '160px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <option>2023-24</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Overall GPA</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{gpa} <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)' }}>/10</span></div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowUpRight size={12}/> {gpaDiff} from previous term</div>
            </div>
            <div style={{ width: '80px', height: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={gpaTrend}>
                  <defs>
                    <linearGradient id="colorGpa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorGpa)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Average Percentage</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{avgPct}%</div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowUpRight size={12}/> {pctDiff}% from previous term</div>
            </div>
            <div style={{ width: '80px', height: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={pctTrend}>
                  <defs>
                    <linearGradient id="colorPct" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPct)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Rank</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>{rank} <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)' }}>/ 42</span></div>
              <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowUpRight size={12}/> {rankDiff} positions</div>
            </div>
            <div style={{ width: '80px', height: '40px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rankTrend}>
                  <Line type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2.5} dot={false} isAnimationActive={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Total Subjects</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.5px' }}>8</div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '4px' }}>No Change</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Award size={24} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Passed Subjects</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.5px' }}>8 <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)' }}>/ 8</span></div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 500, marginTop: '4px' }}>No Change</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle2 size={24} />
          </div>
        </div>
      </div>

      {/* Middle Row Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Grouped Bar Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Overall Performance Comparison</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'50%',background:'#8b5cf6' }}></span> This Term (Term 1)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'50%',background:'#c4b5fd' }}></span> Previous Term (Term 4)</span>
              </div>
              <select style={{ border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', padding: '6px 12px', outline: 'none', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600 }}>
                <option>View as Bar Chart</option>
              </select>
            </div>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjects} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barGap={2} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v)=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-tertiary)' }} />
                <Bar dataKey="current" name="This Term" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={16} isAnimationActive={false}>
                  {/* labels handled elegantly by Recharts if needed, but omitted to match image cleanly */}
                </Bar>
                <Bar dataKey="previous" name="Previous Term" fill="#c4b5fd" radius={[4, 4, 0, 0]} maxBarSize={16} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '8px' }}>Subjects</div>
        </div>

        {/* Line Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Performance Trend</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'12px',height:'2px',background:'#8b5cf6' }}></span> This Term (Term 1)</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'12px',height:'2px',background:'#c4b5fd', borderTop: '2px dashed #c4b5fd' }}></span> Previous Term (Term 4)</span>
              </div>
              <select style={{ border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', padding: '6px 12px', outline: 'none', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600 }}>
                <option>Weekly</option>
              </select>
            </div>
          </div>
          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v)=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="current" name="This Term" stroke="#8b5cf6" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="previous" name="Previous Term" stroke="#c4b5fd" strokeWidth={3} strokeDasharray="5 5" dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '8px' }}>Weeks</div>
        </div>

      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr', gap: '20px' }}>
        
        {/* Table */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Subject Wise Comparison</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', flex: 1 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Subject</th>
                <th colSpan={2} style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>This Term (Term 1)<br/><span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-tertiary)', marginTop: '4px', display: 'inline-block' }}>Score &nbsp;&nbsp;&nbsp; Grade</span></th>
                <th colSpan={2} style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Previous Term (Term 4)<br/><span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-tertiary)', marginTop: '4px', display: 'inline-block' }}>Score &nbsp;&nbsp;&nbsp; Grade</span></th>
                <th colSpan={2} style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Change<br/><span style={{ fontSize: '10px', fontWeight: 500, color: 'var(--text-tertiary)', marginTop: '4px', display: 'inline-block' }}>Score &nbsp;&nbsp;&nbsp; Grade</span></th>
              </tr>
            </thead>
            <tbody>
              {subjects.slice(0, 5).map((sub, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '14px 8px', fontWeight: 600, color: 'var(--text-primary)' }}>{sub.name}</td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 700 }}>{sub.current}%</td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: 'var(--text-primary)', fontWeight: 700 }}>{sub.grade}</td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>{sub.previous}%</td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 500 }}>{sub.prevGrade}</td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: '#10b981', fontWeight: 700 }}><ArrowUpRight size={12} style={{ display:'inline', verticalAlign:'middle' }}/> {sub.change}</td>
                  <td style={{ padding: '14px 8px', textAlign: 'center', color: sub.changeGrade === '-' ? 'var(--text-tertiary)' : '#10b981', fontWeight: 700 }}>
                    {sub.changeGrade !== '-' && <ArrowUpRight size={12} style={{ display:'inline', verticalAlign:'middle' }}/>} {sub.changeGrade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 700, cursor: 'pointer', display: 'inline-block', padding: '8px 16px', background: '#f3e8ff', borderRadius: '8px' }}>View All Subjects</span>
          </div>
        </div>

        {/* Doughnut Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Grade Distribution</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', flex: 1 }}>
            <div style={{ position: 'relative', width: '160px', height: '160px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} dataKey="value" stroke="none" isAnimationActive={false}>
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>8</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Subjects</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {pieData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', width: '40px' }}>
                    <span style={{ width:'10px',height:'10px',borderRadius:'50%',background: item.color }}></span> {item.name}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{item.value} ({Math.round(item.value/8*100)}%)</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '16px' }}>
            <ArrowUpRight size={14} /> Improved distribution from previous term
          </div>
        </div>

        {/* Highlights */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 20px 0', color: 'var(--text-primary)' }}>Academic Highlights</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
            
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fef3c7', color: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Award size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Great Progress!</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5', fontWeight: 500 }}>You have improved in 6 out of 8 subjects compared to the previous term.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0f2fe', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <TrendingUp size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Consistent Performer</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5', fontWeight: 500 }}>Your performance trend shows consistent improvement over the weeks.</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Top Performer</div>
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5', fontWeight: 500 }}>You are in the top 15% of your class.</div>
              </div>
            </div>

          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 700, cursor: 'pointer', display: 'inline-block' }}>View Detailed Analysis</span>
          </div>
        </div>

      </div>

    </div>
  );
}

// --- ATTENDANCE TAB ---
export function StudentAttendanceTab({ studentId }: { studentId: string }) {
  const idNum = parseInt(studentId.replace(/\D/g, '') || '1');
  const isBase = idNum === 1;
  
  const overallAtt = isBase ? '91' : (88.0 + (idNum % 10)).toFixed(0);
  const classesAttended = isBase ? 182 : 170 + (idNum % 25);
  const classesMissed = isBase ? 18 : 200 - classesAttended;
  const onTime = isBase ? '94' : (90.0 + (idNum % 8)).toFixed(0);

  const months = ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'];
  const monthData = months.map((m, i) => ({
    name: m,
    current: isBase ? 85 + Math.sin(i)*5 + (i%2) * 5 : 85 + Math.sin(i)*5 + (idNum%5),
    previous: isBase ? 80 + Math.sin(i)*6 + (i%3) * 3 : 80 + Math.sin(i)*6 + (idNum%4)
  }));

  const weekData = Array.from({length: 15}).map((_, i) => ({
    name: `W${i+1}`,
    current: isBase ? 80 + (i*1.5) + (i%5)*2 : 75 + (i*1.5) + (idNum%5),
    previous: isBase ? 75 + (i*1.2) + (i%4)*2 : 70 + (i*1.2) + (idNum%5)
  }));

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat'];
  const dayData = days.map((d, i) => ({
    name: d,
    current: isBase ? 90 + Math.sin(i)*8 : 85 + Math.sin(i)*10,
    previous: isBase ? 85 + Math.sin(i)*6 : 80 + Math.sin(i)*8
  }));

  const absenceData = [
    { name: 'Sick Leave', value: 9, color: '#f43f5e' },
    { name: 'Personal Leave', value: 4, color: '#f59e0b' },
    { name: 'Medical', value: 3, color: '#3b82f6' },
    { name: 'Other', value: 2, color: '#8b5cf6' }
  ];
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease', paddingBottom: '80px', position: 'relative', fontFamily: 'var(--font-sans)' }}>
      {/* Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          
          
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '4px' }}>Compare With</span>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none', width: '140px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <option>Previous Term</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '4px' }}>This Term (Term 1)</span>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none', width: '160px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <option>2024-25</option>
            </select>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '16px' }}>VS</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', paddingLeft: '4px' }}>Previous Term (Term 4)</span>
            <select style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', color: 'var(--text-primary)', outline: 'none', width: '160px', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
              <option>2023-24</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Overall Attendance</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.5px' }}>{overallAtt}%</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowUpRight size={12}/> 3.6% from previous term</div>
          </div>
          <div style={{ position: 'relative', width: '60px', height: '60px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{value: Number(overallAtt)}, {value: 100 - Number(overallAtt)}]} cx="50%" cy="50%" innerRadius={20} outerRadius={28} dataKey="value" stroke="none" startAngle={90} endAngle={-270} isAnimationActive={false}>
                  <Cell fill="#10b981" />
                  <Cell fill="#e2e8f0" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>{overallAtt}%</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Classes Attended</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.5px' }}>{classesAttended} <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)' }}>/ 200</span></div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowUpRight size={12}/> 7 classes</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarCheck size={24} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Classes Missed</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.5px' }}>{classesMissed} <span style={{ fontSize: '11px', fontWeight: 500, color: 'var(--text-tertiary)' }}>/ 200</span></div>
            <div style={{ fontSize: '11px', color: '#ef4444', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowDownRight size={12}/> 3 classes</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fee2e2', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarX size={24} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>On Time Arrival</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', letterSpacing: '-0.5px' }}>{onTime}%</div>
            <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 600, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '2px' }}><ArrowUpRight size={12}/> 4.2% from previous term</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Clock size={24} />
          </div>
        </div>

        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>Attendance Status</div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981', marginTop: '8px', letterSpacing: '-0.5px' }}>Excellent</div>
          </div>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#d1fae5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* Comparison Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Attendance Comparison</h3>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'50%',background:'#10b981' }}></span> This Term (Term 1)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'50%',background:'var(--text-tertiary)' }}></span> Previous Term (Term 4)</span>
          </div>
          
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v)=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="current" name="This Term" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg-secondary)' }} activeDot={{ r: 6 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="previous" name="Previous Term" stroke="#94a3b8" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: 'var(--bg-secondary)' }} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '8px' }}>Months</div>
        </div>

        {/* Trend Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Attendance Trend</h3>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', padding: '6px 12px', outline: 'none', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600 }}>
              <option>Weekly</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'12px',height:'2px',background:'#10b981' }}></span> This Term (Term 1)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'12px',height:'2px',background:'var(--text-tertiary)', borderTop:'2px dashed #94a3b8' }}></span> Previous Term (Term 4)</span>
          </div>
          
          <div style={{ height: '260px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weekData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v)=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="current" name="This Term" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} isAnimationActive={false} />
                <Line type="monotone" dataKey="previous" name="Previous Term" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={3} dot={false} isAnimationActive={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 600, marginTop: '8px' }}>Weeks</div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.8fr', gap: '20px' }}>
        
        {/* Attendance by Day */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Attendance by Day</h3>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', padding: '6px 12px', outline: 'none', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600 }}>
              <option>This Term</option>
            </select>
          </div>
          <div style={{ height: '200px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }} barGap={2} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v)=>`${v}%`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--bg-tertiary)' }} />
                <Bar dataKey="current" name="This Term" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={16} isAnimationActive={false} />
                <Bar dataKey="previous" name="Previous Term" fill="#cbd5e1" radius={[4, 4, 0, 0]} maxBarSize={16} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'2px',background:'#10b981' }}></span> This Term (Term 1)</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'2px',background:'#cbd5e1' }}></span> Previous Term (Term 4)</span>
          </div>
        </div>

        {/* Absence Breakdown */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 700, margin: '0 0 24px 0', color: 'var(--text-primary)' }}>Absence Breakdown (This Term)</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '24px', flex: 1 }}>
            <div style={{ position: 'relative', width: '130px', height: '130px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={absenceData} cx="50%" cy="50%" innerRadius={45} outerRadius={60} dataKey="value" stroke="none" isAnimationActive={false}>
                    {absenceData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>18</span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>Classes Missed</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {absenceData.map(x => (
                <div key={x.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, width: '130px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                    <span style={{ width:'8px',height:'8px',borderRadius:'50%',background:x.color }}></span> {x.name}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>{x.value} ({Math.round(x.value/18*100)}%)</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <span style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 700, cursor: 'pointer', display: 'inline-block' }}>View Absence Details</span>
          </div>
        </div>

        {/* Heatmap */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>Monthly Attendance Heatmap (This Term)</h3>
            <select style={{ border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '11px', padding: '6px 12px', outline: 'none', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', fontWeight: 600 }}>
              <option>This Term</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', flex: 1, gap: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, marginTop: '16px' }}>
              {months.map(m => <span key={m} style={{ height: '10px', lineHeight: '10px' }}>{m}</span>)}
            </div>
            <div style={{ flex: 1, overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px', marginBottom: '6px' }}>
                {[1,5,10,15,20,25,30].map(d => <span key={d} style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>{d}</span>)}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(31, 1fr)', gap: '2px' }}>
                {Array.from({length: 12 * 31}).map((_, i) => {
                  const rand = (i * idNum * 17) % 100;
                  const color = rand < 82 ? '#10b981' : rand < 87 ? '#f59e0b' : rand < 92 ? '#ef4444' : 'var(--border-secondary)';
                  return <div key={i} style={{ width: '100%', aspectRatio: '1/1', background: color, borderRadius: '1.5px' }}></div>
                })}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginTop: '24px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'2px',background:'#10b981' }}></span> Present</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'2px',background:'#f59e0b' }}></span> Late</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'2px',background:'#ef4444' }}></span> Absent</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ width:'10px',height:'10px',borderRadius:'2px',background:'var(--border-secondary)', border:'1px solid #e2e8f0' }}></span> No Class / Holiday</span>
          </div>
        </div>

      </div>

      {/* Footer Sticky Bar */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--bg-secondary)', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 -4px 15px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f3e8ff', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarDays size={24} />
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Term Summary</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>(This Term vs Previous Term)</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Overall Attendance</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>91% <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={12}/>3.6%</span></div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Classes Attended</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>182 <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={12}/>7</span></div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Classes Missed</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>18 <span style={{ fontSize: '11px', color: '#ef4444', display: 'flex', alignItems: 'center' }}><ArrowDownRight size={12}/>3</span></div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>On Time Arrival</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>94% <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={12}/>4.2%</span></div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Longest Streak</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>21 Days</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '6px' }}>Attendance Rank</div>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>5 / 42 <span style={{ fontSize: '11px', color: '#10b981', display: 'flex', alignItems: 'center' }}><ArrowUpRight size={12}/>3</span></div>
          </div>
        </div>

        <button style={{ background: '#f3e8ff', border: '1px solid #d8b4fe', borderRadius: '10px', padding: '12px 24px', fontSize: '13px', fontWeight: 700, color: '#7c3aed', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
          <BarChart3 size={18} /> View Full Attendance Report
        </button>
      </div>

    </div>
  );
}

// =====================================================
// --- ACHIEVEMENTS TAB ---
// =====================================================
export function StudentAchievementsTab({ studentId, sData }: { studentId: string; sData: any }) {
  const [activeCarousel, setActiveCarousel] = useState(0);
  const [activeKpiView, setActiveKpiView] = useState<string | null>(null);
  const [achievementsSearch, setAchievementsSearch] = useState('');
  const [achievementsFilter, setAchievementsFilter] = useState('All');
  const [certSearch, setCertSearch] = useState('');
  const [certFilter, setCertFilter] = useState('All');
  const [compFilter, setCompFilter] = useState('All');

  const achievementsList = [
    { id: 1, title: 'First Prize in Science Exhibition', category: 'Academic Excellence', level: 'Inter School', date: '20 Mar 2025', points: 150, description: 'Designed a working model of a smart solar grid that won first prize among 40 participating schools.' },
    { id: 2, title: 'Best Speaker Award', category: 'Co-Curricular', level: 'District', date: '15 Feb 2025', points: 120, description: 'Awarded best speaker at the annual inter-school English debate competition on sustainable future.' },
    { id: 3, title: 'Chess Tournament Winner', category: 'Sports', level: 'Zonal', date: '28 Jan 2025', points: 100, description: 'Secured first place in the under-17 zonal chess championship without dropping a single game.' },
    { id: 4, title: 'Academic Topper Award', category: 'Academic Excellence', level: 'School', date: '10 Jan 2025', points: 100, description: 'Awarded for scoring 95%+ across all major subjects in the second term examination.' },
    { id: 5, title: 'Second Prize in Painting', category: 'Co-Curricular', level: 'Inter School', date: '05 Dec 2024', points: 80, description: 'Received second prize for watercolor painting in the category of nature preservation.' },
    { id: 6, title: 'Blood Donation Camp Coordinator', category: 'Community Service', level: 'School', date: '20 Nov 2024', points: 50, description: 'Led the student council coordination team for the school blood donation drive, securing over 150 donors.' },
    { id: 7, title: 'Zonal Olympiad Gold Medal', category: 'Academic Excellence', level: 'State', date: '15 Oct 2024', points: 200, description: 'Placed 8th in the state mathematics Olympiad, earning a gold medal and certificate of excellence.' },
    { id: 8, title: 'Football Championship Runner Up', category: 'Sports', level: 'Zonal', date: '12 Sep 2024', points: 80, description: 'Vice-captain of the school football team that reached the finals of the zonal football federation tournament.' },
    { id: 9, title: 'Best Student Leader of the Year', category: 'Leadership', level: 'School', date: '15 Aug 2024', points: 150, description: 'Recognized for excellent administrative performance and peer guidance as the Head Boy.' },
    { id: 10, title: 'Tree Plantation Drive Leader', category: 'Community Service', level: 'School', date: '05 Jun 2024', points: 60, description: 'Organized and executed a plantation drive planting 500 saplings in and around the school campus.' }
  ];

  const certificatesList = [
    { id: 1, title: 'Science Exhibition Excellence', authority: 'State Science Forum', date: '20 Mar 2025', credId: 'SSF-2025-0849', category: 'Academic Excellence', size: '156 KB', status: 'Verified' },
    { id: 2, title: 'Debate Champion Certificate', authority: 'National Debating Society', date: '15 Feb 2025', credId: 'NDS-D-8841', category: 'Co-Curricular', size: '142 KB', status: 'Verified' },
    { id: 3, title: 'Chess Championship Certificate', authority: 'Zonal Sports Authority', date: '28 Jan 2025', credId: 'ZSA-C-9920', category: 'Sports', size: '204 KB', status: 'Verified' },
    { id: 4, title: 'Academic Topper Award', authority: 'Board of Secondary Education', date: '10 Jan 2025', credId: 'BSE-TERM2-881', category: 'Academic Excellence', size: '310 KB', status: 'Verified' },
    { id: 5, title: 'Clean and Green Initiative', authority: 'Eco Green Club India', date: '05 Jun 2024', credId: 'EGC-2024-4411', category: 'Community Service', size: '98 KB', status: 'Pending' },
    { id: 6, title: 'Student Council Leadership Cert', authority: 'Akedex Education Foundation', date: '15 Aug 2024', credId: 'AEF-LEAD-3312', category: 'Leadership', size: '188 KB', status: 'Verified' }
  ];

  const awardsList = [
    { id: 1, title: 'Academic Excellence Trophy', type: 'Trophy', rank: 'Gold', subtitle: 'Quarterly Exam Topper', date: '10 Jan 2025', iconColor: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
    { id: 2, title: 'Inter-School Science Shield', type: 'Shield', rank: 'Gold', subtitle: 'First Place Presentation', date: '20 Mar 2025', iconColor: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
    { id: 3, title: 'Best Debate Orator Medal', type: 'Medal', rank: 'Gold', subtitle: 'Best Speaker overall', date: '15 Feb 2025', iconColor: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
    { id: 4, title: 'Zonal Chess Tournament Medal', type: 'Medal', rank: 'Gold', subtitle: 'Winner Under-17 Category', date: '28 Jan 2025', iconColor: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
    { id: 5, title: 'Regional Mathematics Silver Medal', type: 'Medal', rank: 'Silver', subtitle: '8th State Rank Olympiad', date: '15 Oct 2024', iconColor: '#94a3b8', bg: 'rgba(148, 163, 184, 0.08)' },
    { id: 6, title: 'Zonal Football Cup (Runner Up)', type: 'Trophy', rank: 'Silver', subtitle: 'Tournament Finalist', date: '12 Sep 2024', iconColor: '#94a3b8', bg: 'rgba(148, 163, 184, 0.08)' },
    { id: 7, title: 'Outstanding Leader Badge', type: 'Badge', rank: 'Honor Roll', subtitle: 'Head Boy Contribution', date: '15 Aug 2024', iconColor: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)' },
    { id: 8, title: 'Green Earth Activist Star', type: 'Star', rank: 'Special Mention', subtitle: 'Planted 500 Saplings', date: '05 Jun 2024', iconColor: 'var(--accent-green)', bg: 'var(--accent-green-dim)' }
  ];

  const competitionsList = [
    { id: 1, name: 'State Science Fair 2025', organizer: 'Dept. of Science & Tech', date: '20 Mar 2025', level: 'State', position: '1st Place', result: 'Won', score: '98/100' },
    { id: 2, name: 'Annual English Inter-School Debate', organizer: 'St. Xavier Academy', date: '15 Feb 2025', level: 'Inter School', position: 'Best Speaker', result: 'Won', score: '95/100' },
    { id: 3, name: 'Zonal U-17 Chess Championship', organizer: 'Zonal Sports Council', date: '28 Jan 2025', level: 'Zonal', position: '1st Place', result: 'Won', score: '7.0/7.0 pts' },
    { id: 4, name: 'State Math Olympiad 2024', organizer: 'Math Olympiad Foundation', date: '15 Oct 2024', level: 'State', position: '8th Rank', result: 'Runner Up', score: '185/200' },
    { id: 5, name: 'Zonal Football Federation Cup', organizer: 'Zonal Football Club', date: '12 Sep 2024', level: 'Zonal', position: 'Runner Up', result: 'Runner Up', score: '3-1 in Finals' },
    { id: 6, name: 'Inter-School Painting Competition', organizer: 'Art & Culture Society', date: '05 Dec 2024', level: 'Inter School', position: '2nd Place', result: 'Runner Up', score: '90/100' },
    { id: 7, name: 'District Spell Bee 2024', organizer: 'Literary Club', date: '10 Nov 2024', level: 'District', position: 'Finalist', result: 'Participated', score: '88/100' },
    { id: 8, name: 'Akedex Zonal Hackathon', organizer: 'Akedex Edu Tech', date: '18 Jul 2024', level: 'National', position: 'Top 10', result: 'Participated', score: '84/100' },
    { id: 9, name: 'Annual Inter-House Essay Writing', organizer: 'School Literary Society', date: '10 Aug 2024', level: 'School', position: '1st Place', result: 'Won', score: '92/100' },
    { id: 10, name: 'District Science Quiz Bowl', organizer: 'District Board of Ed', date: '15 Nov 2024', level: 'District', position: 'Semifinalist', result: 'Participated', score: '76/100' },
    { id: 11, name: 'Zonal Quiz Competition', organizer: 'Zonal Quiz Club', date: '04 Oct 2024', level: 'Zonal', position: '3rd Place', result: 'Participated', score: '82/100' },
    { id: 12, name: 'State Level Drama Competition', organizer: 'National School of Drama', date: '18 Dec 2024', level: 'State', position: 'Consolation Prize', result: 'Participated', score: '85/100' }
  ];

  const leaderboardData = [
    { rank: 1, name: 'Rohan Mehta', class: '10-A', score: 910, achievements: 32, avatar: 'RM' },
    { rank: 2, name: 'Aditi Rao', class: '10-B', score: 875, achievements: 30, avatar: 'AR' },
    { rank: 3, name: 'Priya Sharma (You)', class: '10-A', score: 845, achievements: 28, avatar: 'PS', isSelf: true },
    { rank: 4, name: 'Aravind Swamy', class: '10-A', score: 810, achievements: 25, avatar: 'AS' },
    { rank: 5, name: 'Sneha Gupta', class: '10-C', score: 790, achievements: 24, avatar: 'SG' }
  ];

  const rankHistoryData = [
    { term: 'Term 1 2023', schoolRank: 15, classRank: 4 },
    { term: 'Term 2 2023', schoolRank: 12, classRank: 3 },
    { term: 'Term 1 2024', schoolRank: 8, classRank: 2 },
    { term: 'Term 2 2024', schoolRank: 5, classRank: 2 },
    { term: 'Term 1 2025', schoolRank: 3, classRank: 1 }
  ];

  const mockOverviewData = [
    { month: 'Apr', achievements: 3, certificates: 2, score: 200 },
    { month: 'May', achievements: 4, certificates: 3, score: 250 },
    { month: 'Jun', achievements: 5, certificates: 4, score: 300 },
    { month: 'Jul', achievements: 4, certificates: 3, score: 280 },
    { month: 'Aug', achievements: 7, certificates: 5, score: 450 },
    { month: 'Sep', achievements: 3, certificates: 2, score: 400 },
    { month: 'Oct', achievements: 6, certificates: 4, score: 550 },
    { month: 'Nov', achievements: 8, certificates: 6, score: 700 },
    { month: 'Dec', achievements: 5, certificates: 3, score: 650 },
    { month: 'Jan', achievements: 7, certificates: 5, score: 720 },
    { month: 'Feb', achievements: 6, certificates: 4, score: 680 },
    { month: 'Mar', achievements: 8, certificates: 6, score: 845 }
  ];

  const categoryPieData = [
    { name: 'Academic Excellence', value: 10, color: '#8b5cf6', percentage: '36%' },
    { name: 'Co-Curricular', value: 8, color: '#3b82f6', percentage: '29%' },
    { name: 'Sports', value: 5, color: '#10b981', percentage: '18%' },
    { name: 'Community Service', value: 3, color: '#f59e0b', percentage: '11%' },
    { name: 'Leadership', value: 2, color: '#ec4899', percentage: '6%' }
  ];

  const awardsCarousel = [
    { title: 'Academic Excellence', subtitle: 'Quarterly Award', date: '10 Jan 2025', type: 'gold' },
    { title: 'Best Speaker', subtitle: 'Debate Competition', date: '15 Feb 2025', type: 'blue' },
    { title: 'Science Winner', subtitle: 'Inter School', date: '20 Mar 2025', type: 'yellow' },
    { title: 'Chess Champion', subtitle: 'Zonal Level', date: '28 Jan 2025', type: 'green' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
      
      {/* 6-CARD KPI METRICS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
        {[
          { id: 'achievements', label: 'Total Achievements', val: '28', desc: 'All Time', trend: '7 this year', icon: <Trophy size={18} />, color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)' },
          { id: 'certificates', label: 'Certificates Earned', val: '16', desc: 'All Time', trend: '5 this year', icon: <FileText size={18} />, color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.08)' },
          { id: 'awards', label: 'Awards Won', val: '8', desc: 'All Time', trend: '2 this year', icon: <Award size={18} />, color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
          { id: 'competitions', label: 'Competitions', val: '12', desc: 'Participated', trend: '3 this year', icon: <Calendar size={18} />, color: 'var(--accent-green)', bg: 'var(--accent-green-dim)' },
          { id: 'score', label: 'Achievement Score', val: '845/1000', desc: 'Excellent', trend: '65 pts', icon: <TrendingUp size={18} />, color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)' },
          { id: 'rank', label: 'Rank (School)', val: '3 / 842', desc: 'Top Performer', trend: '2 positions', icon: <Star size={18} />, color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.08)' }
        ].map((card, idx) => (
          <div 
            key={card.id} 
            onClick={() => setActiveKpiView(card.id)}
            style={{ 
              background: activeKpiView === card.id ? card.bg : '#ffffff', 
              border: activeKpiView === card.id ? `1px solid ${card.color}` : '1px solid var(--border-primary)', 
              borderRadius: '12px', 
              padding: '16px', 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '14px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = `0 4px 16px rgba(0,0,0,0.08)`;
              e.currentTarget.style.borderColor = card.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
              if (activeKpiView !== card.id) e.currentTarget.style.borderColor = 'var(--border-primary)';
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {card.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{card.label}</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{card.val}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                <span style={{ whiteSpace: 'nowrap' }}>{card.desc}</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '1px', whiteSpace: 'nowrap' }}>
                  <ArrowUpRight size={10} /> {card.trend}
                </span>
              </div>
            </div>
            <ChevronRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0, opacity: 0.5 }} />
          </div>
        ))}
      </div>

      {!activeKpiView && (
        <>
          {/* Row 2: Overview Composed Chart, Categories Pie, Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr 1fr', gap: '20px', alignItems: 'stretch' }}>
            
            {/* Composed Chart */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Achievement Overview</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Monthly achievements earned over time</span>
                </div>
                <select style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', fontSize: '10px', padding: '4px 8px', outline: 'none', background: 'transparent', color: 'var(--text-secondary)' }}>
                  <option>This Year</option>
                </select>
              </div>
              <div style={{ flex: 1, minHeight: '260px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockOverviewData} margin={{ top: 10, right: -15, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-secondary)" />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={8} />
                    <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 2, 4, 6, 8, 10]} />
                    <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 200, 400, 600, 800, 1000]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }} />
                    <Bar yAxisId="left" name="Achievements" dataKey="achievements" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={12} isAnimationActive={false} />
                    <Bar yAxisId="left" name="Certificates" dataKey="certificates" fill="#c4b5fd" radius={[4, 4, 0, 0]} maxBarSize={12} isAnimationActive={false} />
                    <Line yAxisId="right" name="Score" dataKey="score" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#ffffff', stroke: '#8b5cf6', strokeWidth: 1.5 }} isAnimationActive={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Categories Pie Chart */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Achievements by Category</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>This Year</span>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '100%' }}>
                <div style={{ position: 'relative', width: '120px', height: '120px', flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={categoryPieData} cx="50%" cy="50%" innerRadius={38} outerRadius={50} dataKey="value" stroke="none" isAnimationActive={false}>
                        {categoryPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800 }}>28</span>
                    <span style={{ fontSize: '8px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: 0 }}>
                  {categoryPieData.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: 600 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: 0 }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }}></span>
                        <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                      </span>
                      <span style={{ color: 'var(--text-primary)', paddingLeft: '4px', flexShrink: 0 }}>{item.value} ({item.percentage})</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px', borderTop: '1px solid var(--border-secondary)', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('achievements')}>View all categories →</span>
              </div>
            </div>

            {/* Timeline */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Achievement Timeline</h3>
                <span style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('achievements')}>View full timeline</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, paddingLeft: '8px', position: 'relative' }}>
                {/* Vertical line running behind dots */}
                <div style={{ position: 'absolute', left: '11.5px', top: '4px', bottom: '4px', width: '1px', background: 'var(--border-primary)' }}></div>
                {[
                  { date: '20 Mar 2025', title: 'First Prize in Science Exhibition', desc: 'Inter School Competition' },
                  { date: '15 Feb 2025', title: 'Best Speaker Award', desc: 'English Debate Competition' },
                  { date: '28 Jan 2025', title: 'Chess Tournament Winner', desc: 'Zonal Level Competition' },
                  { date: '10 Jan 2025', title: 'Academic Excellence Award', desc: 'Quarterly Recognition' },
                  { date: '05 Dec 2024', title: 'Second Prize in Painting', desc: 'Inter School Competition' }
                ].map((evt, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-purple)', border: '2px solid var(--bg-secondary)', zIndex: 1, marginTop: '4px', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{evt.date}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{evt.title}</span>
                      <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>{evt.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '16px', borderTop: '1px solid var(--border-secondary)', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('achievements')}>View all achievements →</span>
              </div>
            </div>

          </div>

          {/* Row 3: Recent Achievements, Awards & Recognitions, Certificate Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.2fr', gap: '20px', alignItems: 'stretch' }}>
            
            {/* Recent Achievements */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Recent Achievements</h3>
                <span style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('achievements')}>View all</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {[
                  { title: 'First Prize in Science Exhibition', desc: 'Inter School Competition', date: '20 Mar 2025', bg: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-purple)', icon: <Trophy size={14} /> },
                  { title: 'Best Speaker Award', desc: 'English Debate Competition', date: '15 Feb 2025', bg: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)', icon: <Award size={14} /> },
                  { title: 'Chess Tournament Winner', desc: 'Zonal Level Competition', date: '28 Jan 2025', bg: 'var(--accent-green-dim)', color: 'var(--accent-green)', icon: <Award size={14} /> },
                  { title: 'Academic Excellence Award', desc: 'Quarterly Recognition', date: '10 Jan 2025', bg: 'rgba(245, 158, 11, 0.08)', color: 'var(--accent-amber)', icon: <Trophy size={14} /> }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: idx < 3 ? '1px solid var(--border-secondary)' : 'none', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ width: '28px', height: '28px', borderRadius: '6px', background: item.bg, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: '1.3' }}>{item.title}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{item.desc}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{item.date}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Recognitions */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Awards & Recognitions</h3>
                <span style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('awards')}>View all</span>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                <div style={{ 
                  width: '100%', 
                  border: '1px solid var(--border-primary)', 
                  borderRadius: '10px', 
                  padding: '16px 12px', 
                  background: 'var(--bg-tertiary)', 
                  display: 'flex', 
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  alignItems: 'center', 
                  gap: '8px', 
                  minHeight: '150px' 
                }}>
                  {[
                    { title: 'Academic Excellence', date: '10 Jan 2025', icon: <Trophy size={18} />, bg: 'rgba(245, 158, 11, 0.08)', color: 'var(--accent-amber)' },
                    { title: 'Best Speaker', date: '15 Feb 2025', icon: <Award size={18} />, bg: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)' },
                    { title: 'Science Winner', date: '20 Mar 2025', icon: <Trophy size={18} />, bg: 'rgba(245, 158, 11, 0.08)', color: 'var(--accent-amber)' },
                    { title: 'Chess Champion', date: '28 Jan 2025', icon: <Award size={18} />, bg: 'var(--accent-green-dim)', color: 'var(--accent-green)' }
                  ].map((award, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                      <span style={{ 
                        width: '36px', 
                        height: '36px', 
                        borderRadius: '50%', 
                        background: award.bg, 
                        color: award.color, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {award.icon}
                      </span>
                      <div>
                        <h4 style={{ 
                          fontSize: '10px', 
                          fontWeight: 800, 
                          margin: 0, 
                          color: 'var(--text-primary)', 
                          lineHeight: '1.2',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          height: '24px'
                        }} title={award.title}>
                          {award.title}
                        </h4>
                        <span style={{ fontSize: '8.5px', color: 'var(--text-tertiary)', display: 'block', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>{award.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certificate Highlights */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Certificate Highlights</h3>
                <span style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('certificates')}>View all</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {[
                  { title: 'Science Exhibition Certificate', desc: 'Inter School Competition', date: '20 Mar 2025' },
                  { title: 'Debate Competition Certificate', desc: 'English Debate', date: '15 Feb 2025' },
                  { title: 'Chess Tournament Certificate', desc: 'Zonal Level Competition', date: '28 Jan 2025' }
                ].map((cert, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 12px', background: 'var(--bg-tertiary)', gap: '12px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      {/* Miniature certificate frame */}
                      <div style={{ width: '38px', height: '26px', border: '1.5px double #d97706', borderRadius: '2px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '1px' }}>
                        <div style={{ width: '100%', height: '100%', border: '0.5px solid #d97706', background: '#fffefb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: '4px', transform: 'scale(0.8)', color: '#d97706', fontWeight: 700 }}>CERT</span>
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '160px' }}>{cert.title}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{cert.date}</div>
                      </div>
                    </div>
                    <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-tertiary)', padding: '4px' }}>
                      <Download size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '16px', borderTop: '1px solid var(--border-secondary)', paddingTop: '10px' }}>
                <span style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }} onClick={() => setActiveKpiView('certificates')}>View all certificates →</span>
              </div>
            </div>

          </div>
        </>
      )}

      {/* DETAILED KPI SUB-PAGES */}
      {activeKpiView === 'achievements' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => setActiveKpiView(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-purple)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Achievements
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Trophy size={20} style={{ color: 'var(--accent-purple)' }} /> Total Achievements Detail
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total: <strong style={{ color: 'var(--text-primary)' }}>28</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>National/State: <strong style={{ color: 'var(--text-primary)' }}>3</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>Zonal: <strong style={{ color: 'var(--text-primary)' }}>3</strong></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            {/* Left Column: List, Search, Filter */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    placeholder="Search achievements..." 
                    value={achievementsSearch}
                    onChange={(e) => setAchievementsSearch(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px 8px 34px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <select 
                  value={achievementsFilter} 
                  onChange={(e) => setAchievementsFilter(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', outline: 'none' }}
                >
                  <option value="All">All Categories</option>
                  <option value="Academic Excellence">Academic Excellence</option>
                  <option value="Co-Curricular">Co-Curricular</option>
                  <option value="Sports">Sports</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                {achievementsList
                  .filter(item => {
                    const matchesSearch = item.title.toLowerCase().includes(achievementsSearch.toLowerCase()) || 
                                          item.description.toLowerCase().includes(achievementsSearch.toLowerCase());
                    const matchesFilter = achievementsFilter === 'All' || item.category === achievementsFilter;
                    return matchesSearch && matchesFilter;
                  })
                  .map((item) => (
                    <div key={item.id} style={{ padding: '14px', border: '1px solid var(--border-primary)', borderRadius: '10px', background: 'var(--bg-tertiary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--accent-purple)' }}>{item.category} • {item.level}</span>
                          <h4 style={{ fontSize: '12px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{item.title}</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
                          <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-tertiary)' }}>{item.date}</span>
                          <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-green)', background: 'var(--accent-green-dim)', padding: '2px 6px', borderRadius: '4px' }}>+{item.points} pts</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{item.description}</p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Column: Trend & Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Monthly Trend</h3>
                <div style={{ height: '160px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockOverviewData.slice(-6)} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} ticks={[0, 2, 4, 6, 8, 10]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line dataKey="achievements" name="Achievements" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Points Breakdown</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'State & Higher Level', count: 2, points: '350 pts', pct: '41%' },
                    { label: 'Inter School / Zonal', count: 4, points: '380 pts', pct: '45%' },
                    { label: 'School Level', count: 4, points: '250 pts', pct: '30%' }
                  ].map((level, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, paddingBottom: '6px', borderBottom: idx < 2 ? '1px solid var(--border-secondary)' : 'none' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{level.label} ({level.count})</span>
                      <span style={{ color: 'var(--text-primary)' }}>{level.points}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeKpiView === 'certificates' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => setActiveKpiView(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-blue)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Achievements
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={20} style={{ color: 'var(--accent-blue)' }} /> Certificates Earned
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total: <strong style={{ color: 'var(--text-primary)' }}>16</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: '#10b981' }}>Verified: <strong style={{ color: 'var(--text-primary)' }}>14</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: '#f59e0b' }}>Pending: <strong style={{ color: 'var(--text-primary)' }}>2</strong></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '3fr 1.2fr', gap: '20px' }}>
            {/* Left Panel: Search & Cards */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                  <input 
                    type="text" 
                    placeholder="Search certificates..." 
                    value={certSearch}
                    onChange={(e) => setCertSearch(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px 8px 34px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', outline: 'none' }}
                  />
                </div>
                <select 
                  value={certFilter} 
                  onChange={(e) => setCertFilter(e.target.value)}
                  style={{ padding: '8px 12px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)', outline: 'none' }}
                >
                  <option value="All">All Categories</option>
                  <option value="Academic Excellence">Academic Excellence</option>
                  <option value="Co-Curricular">Co-Curricular</option>
                  <option value="Sports">Sports</option>
                  <option value="Community Service">Community Service</option>
                  <option value="Leadership">Leadership</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
                {certificatesList
                  .filter(item => {
                    const matchesSearch = item.title.toLowerCase().includes(certSearch.toLowerCase()) || 
                                          item.authority.toLowerCase().includes(certSearch.toLowerCase());
                    const matchesFilter = certFilter === 'All' || item.category === certFilter;
                    return matchesSearch && matchesFilter;
                  })
                  .map((item) => (
                    <div key={item.id} style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-primary)', borderRadius: '10px', padding: '14px', background: 'var(--bg-tertiary)', gap: '12px', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        {/* Cert Miniature Frame */}
                        <div style={{ width: '56px', height: '38px', border: '2px double #d97706', borderRadius: '3px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '2px' }}>
                          <div style={{ width: '100%', height: '100%', border: '0.5px solid #d97706', background: '#fffefb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '5px', transform: 'scale(0.8)', color: '#d97706', fontWeight: 800, whiteSpace: 'nowrap' }}>COE CERT</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                          <h4 style={{ fontSize: '11.5px', fontWeight: 700, margin: 0, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h4>
                          <span style={{ fontSize: '9px', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.authority}</span>
                          <span style={{ fontSize: '8.5px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>ID: {item.credId}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-secondary)', paddingTop: '10px', fontSize: '9.5px', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: item.status === 'Verified' ? '#10b981' : '#f59e0b', background: item.status === 'Verified' ? 'var(--accent-green-dim)' : 'rgba(245, 158, 11, 0.08)', padding: '2px 6px', borderRadius: '4px' }}>
                            {item.status}
                          </span>
                          <span style={{ color: 'var(--text-muted)' }}>{item.date}</span>
                        </div>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', border: 'none', background: 'none', color: 'var(--accent-blue)', cursor: 'pointer', padding: 0, fontWeight: 700 }}>
                          <Download size={12} /> {item.size}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Panel: Actions / Upload */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Dropzone mock */}
              <div style={{ background: 'var(--bg-secondary)', border: '2px dashed var(--border-primary)', borderRadius: '12px', padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.08)', color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>Upload Certificate</h4>
                  <p style={{ fontSize: '9px', color: 'var(--text-secondary)', margin: 0 }}>PDF, PNG, JPG up to 5MB</p>
                </div>
              </div>

              {/* Stats breakdown */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Certificate Issuers</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { issuer: 'National Boards & Govt', count: 5 },
                    { issuer: 'Inter-School Forums', count: 6 },
                    { issuer: 'Zonal Athletic Board', count: 3 },
                    { issuer: 'School Internal Boards', count: 2 }
                  ].map((x, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, paddingBottom: '6px', borderBottom: idx < 3 ? '1px solid var(--border-secondary)' : 'none' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>{x.issuer}</span>
                      <span style={{ color: 'var(--text-primary)' }}>{x.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeKpiView === 'awards' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => setActiveKpiView(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-amber)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Achievements
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Award size={20} style={{ color: 'var(--accent-amber)' }} /> Awards Won Showcase
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Awards: <strong style={{ color: 'var(--text-primary)' }}>8</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--accent-amber)' }}>Gold/1st: <strong style={{ color: 'var(--text-primary)' }}>4</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>Silver/2nd: <strong style={{ color: 'var(--text-primary)' }}>2</strong></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
            {/* Left: Trophy Case Visual Case */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Trophy Case</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {awardsList.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      border: '1px solid var(--border-primary)', 
                      borderRadius: '12px', 
                      padding: '16px 12px', 
                      background: 'var(--bg-tertiary)', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      textAlign: 'center', 
                      gap: '12px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    {/* Visual award color block top */}
                    <div style={{ width: '100%', height: '4px', background: item.iconColor, position: 'absolute', top: 0, left: 0 }} />
                    
                    <div style={{ 
                      width: '42px', 
                      height: '42px', 
                      borderRadius: '50%', 
                      background: item.bg, 
                      color: item.iconColor, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      fontSize: '20px'
                    }}>
                      {item.type === 'Trophy' ? <Trophy size={20} /> : <Award size={20} />}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
                      <h4 style={{ 
                        fontSize: '10.5px', 
                        fontWeight: 800, 
                        margin: 0, 
                        color: 'var(--text-primary)',
                        lineHeight: 1.3,
                        minHeight: '28px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }} title={item.title}>
                        {item.title}
                      </h4>
                      <span style={{ fontSize: '8.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.subtitle}</span>
                      <span style={{ fontSize: '9px', color: item.iconColor, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '4px' }}>{item.rank}</span>
                    </div>

                    <div style={{ fontSize: '8px', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-secondary)', width: '100%', paddingTop: '8px', fontFamily: 'var(--font-mono)' }}>
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Chronological Awards Timeline */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Chronology</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '380px', overflowY: 'auto', paddingRight: '4px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '13.5px', top: '8px', bottom: '8px', width: '1px', background: 'var(--border-primary)' }} />
                {awardsList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.iconColor, border: '2px solid var(--bg-secondary)', zIndex: 1, marginTop: '5px', flexShrink: 0 }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{item.date}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.title}</span>
                      <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)' }}>{item.subtitle} • {item.rank}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeKpiView === 'competitions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => setActiveKpiView(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-green)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Achievements
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Target size={20} style={{ color: 'var(--accent-green)' }} /> Competitions Log
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Participations: <strong style={{ color: 'var(--text-primary)' }}>12</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--accent-green)' }}>Won / 1st: <strong style={{ color: 'var(--text-primary)' }}>3</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--accent-blue)' }}>Runner Up: <strong style={{ color: 'var(--text-primary)' }}>3</strong></span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {[
              { label: 'Win Rate', val: '25%', sub: '3 Wins out of 12', color: 'var(--accent-green)', bg: 'var(--accent-green-dim)' },
              { label: 'State Events', val: '3', sub: 'Olympiad & Fairs', color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.08)' },
              { label: 'Zonal & District', val: '5', sub: 'Debate, Chess, Sports', color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
              { label: 'Average Score', val: '87.4%', sub: 'Performance rating', color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)' }
            ].map((m, idx) => (
              <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>{m.label}</span>
                <span style={{ fontSize: '18px', fontWeight: 800, color: m.color }}>{m.val}</span>
                <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', marginTop: '2px' }}>{m.sub}</span>
              </div>
            ))}
          </div>

          {/* List/Table of Competitions */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Detailed Participation Record</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'Won', 'Runner Up', 'Participated'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setCompFilter(f)}
                    style={{ 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      border: '1px solid var(--border-primary)', 
                      background: compFilter === f ? 'var(--accent-green)' : 'var(--bg-tertiary)', 
                      color: compFilter === f ? '#ffffff' : 'var(--text-secondary)',
                      fontSize: '10px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border-primary)', color: 'var(--text-secondary)', fontWeight: 700 }}>
                    <th style={{ padding: '10px' }}>Date</th>
                    <th style={{ padding: '10px' }}>Competition Name</th>
                    <th style={{ padding: '10px' }}>Organizer</th>
                    <th style={{ padding: '10px' }}>Level</th>
                    <th style={{ padding: '10px' }}>Result / Position</th>
                    <th style={{ padding: '10px' }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {competitionsList
                    .filter(item => compFilter === 'All' || item.result === compFilter)
                    .map((item) => (
                      <tr key={item.id} style={{ borderBottom: '1px solid var(--border-secondary)', color: 'var(--text-primary)' }}>
                        <td style={{ padding: '10px', fontWeight: 500, color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{item.date}</td>
                        <td style={{ padding: '10px', fontWeight: 700 }}>{item.name}</td>
                        <td style={{ padding: '10px', color: 'var(--text-secondary)' }}>{item.organizer}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ 
                            fontSize: '9px', 
                            background: item.level === 'State' || item.level === 'National' ? 'rgba(59, 130, 246, 0.08)' : 'var(--border-secondary)', 
                            color: item.level === 'State' || item.level === 'National' ? 'var(--accent-blue)' : 'var(--text-secondary)', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            fontWeight: 700
                          }}>
                            {item.level}
                          </span>
                        </td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ 
                            fontWeight: 700, 
                            color: item.result === 'Won' ? 'var(--accent-green)' : item.result === 'Runner Up' ? 'var(--accent-blue)' : 'var(--text-secondary)'
                          }}>
                            {item.position}
                          </span>
                        </td>
                        <td style={{ padding: '10px', fontWeight: 700 }}>{item.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeKpiView === 'score' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => setActiveKpiView(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: 'var(--accent-purple)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Achievements
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={20} style={{ color: 'var(--accent-purple)' }} /> Achievement Score Breakdown
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Score: <strong style={{ color: 'var(--accent-purple)' }}>845 / 1000</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>Percentile: <strong style={{ color: '#10b981' }}>98.2%</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>Rating: <strong style={{ color: 'var(--text-primary)' }}>Outstanding</strong></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1.4fr', gap: '20px' }}>
            {/* Left Column: Accumulation Area Chart */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Points Accumulation History</h3>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Monthly progress leading up to 845 points</span>
              </div>
              <div style={{ height: '220px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockOverviewData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} ticks={[0, 200, 400, 600, 800, 1000]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="score" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" isAnimationActive={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right Column: Score Breakdown & Leaderboard */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Breakdown category bars */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Category Point Allocation</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { cat: 'Academic Excellence', score: 350, max: 400, color: '#8b5cf6' },
                    { cat: 'Co-Curricular Activities', score: 250, max: 300, color: '#3b82f6' },
                    { cat: 'Sports & Athletics', score: 150, max: 200, color: '#10b981' },
                    { cat: 'Leadership & Services', score: 95, max: 100, color: '#f59e0b' }
                  ].map((c, idx) => (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontWeight: 600 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{c.cat}</span>
                        <span style={{ color: 'var(--text-primary)' }}>{c.score} / {c.max} pts</span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'var(--border-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${(c.score / c.max) * 100}%`, height: '100%', background: c.color, borderRadius: '3px' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top 5 Leaderboard */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Achievements Leaderboard (Grade 10)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {leaderboardData.map((student) => (
                    <div key={student.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 8px', borderRadius: '6px', background: student.isSelf ? 'rgba(139, 92, 246, 0.06)' : 'transparent', border: student.isSelf ? '1px solid rgba(139, 92, 246, 0.15)' : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: student.rank === 1 ? 'var(--accent-amber)' : 'var(--text-secondary)', width: '16px' }}>#{student.rank}</span>
                        <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: student.isSelf ? 'var(--accent-purple)' : 'var(--border-secondary)', color: student.isSelf ? '#ffffff' : 'var(--text-secondary)', fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {student.avatar}
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: student.isSelf ? 700 : 500, color: 'var(--text-primary)' }}>{student.name}</span>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: student.isSelf ? 'var(--accent-purple)' : 'var(--text-secondary)' }}>{student.score} pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeKpiView === 'rank' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                onClick={() => setActiveKpiView(null)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', color: '#f43f5e', fontWeight: 700, fontSize: '12px', cursor: 'pointer', padding: 0 }}
              >
                <ArrowLeft size={14} /> Back to Achievements
              </button>
              <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={20} style={{ color: '#f43f5e' }} /> Rank Standing & Details
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '11px', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '8px 16px', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-secondary)' }}>School Rank: <strong style={{ color: '#f43f5e' }}>3 / 842</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>Class Rank: <strong style={{ color: '#f43f5e' }}>1 / 42</strong></span>
              <span style={{ color: 'var(--border-primary)', borderLeft: '1px solid' }}></span>
              <span style={{ color: 'var(--text-secondary)' }}>Percentile: <strong style={{ color: '#10b981' }}>99.6%</strong></span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr', gap: '20px' }}>
            {/* Left: Rank Trend and metrics cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Split Rank Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {[
                  { label: 'School Rank', val: '3 / 842', trend: 'Up 2 positions', icon: <Building size={16} />, color: '#f43f5e', bg: 'rgba(244, 63, 94, 0.08)' },
                  { label: 'Class Rank', val: '1 / 42', trend: 'Held Position 1', icon: <Users size={16} />, color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)' },
                  { label: 'Zonal Rank', val: '12 / 2400', trend: 'Top 0.5% in zone', icon: <MapPin size={16} />, color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.08)' }
                ].map((card, idx) => (
                  <div key={idx} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: card.color }}>
                      {card.icon}
                      <span style={{ fontSize: '9.5px', fontWeight: 700, color: 'var(--text-secondary)' }}>{card.label}</span>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{card.val}</div>
                    <div style={{ fontSize: '8.5px', color: '#10b981', fontWeight: 600 }}>{card.trend}</div>
                  </div>
                ))}
              </div>

              {/* LineChart Trend */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Ranking Progress</h3>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>School and class rankings over the last terms (Lower is better)</span>
                </div>
                <div style={{ height: '180px', width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={rankHistoryData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-secondary)" vertical={false} />
                      <XAxis dataKey="term" tick={{ fontSize: 8.5, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} />
                      <YAxis reversed={true} tick={{ fontSize: 9, fill: 'var(--text-secondary)' }} axisLine={false} tickLine={false} domain={[1, 16]} ticks={[1, 4, 8, 12, 16]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                      <Line dataKey="schoolRank" name="School Rank" stroke="#f43f5e" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                      <Line dataKey="classRank" name="Class Rank" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} isAnimationActive={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Right Column: Leaderboard of Class */}
            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Class Toppers List (Class 10-A)</h3>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Academic ranking in current division based on CGPA / exams</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
                {[
                  { rank: 1, name: 'Priya Sharma (You)', score: '9.8 CGPA', details: '95.6% Marks', avatar: 'PS', isSelf: true },
                  { rank: 2, name: 'Rohan Mehta', score: '9.6 CGPA', details: '94.2% Marks', avatar: 'RM' },
                  { rank: 3, name: 'Aravind Swamy', score: '9.4 CGPA', details: '92.0% Marks', avatar: 'AS' },
                  { rank: 4, name: 'Tanya Goel', score: '9.2 CGPA', details: '90.5% Marks', avatar: 'TG' },
                  { rank: 5, name: 'Kunal Sen', score: '9.0 CGPA', details: '89.4% Marks', avatar: 'KS' }
                ].map((student) => (
                  <div key={student.rank} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', background: student.isSelf ? 'rgba(244, 63, 94, 0.05)' : 'var(--bg-tertiary)', border: student.isSelf ? '1px solid rgba(244, 63, 94, 0.15)' : '1px solid var(--border-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 800, color: student.rank === 1 ? '#f43f5e' : 'var(--text-secondary)', width: '16px' }}>#{student.rank}</span>
                      <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: student.isSelf ? '#f43f5e' : 'var(--border-secondary)', color: student.isSelf ? '#ffffff' : 'var(--text-secondary)', fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {student.avatar}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                        <span style={{ fontSize: '11px', fontWeight: student.isSelf ? 700 : 600, color: 'var(--text-primary)' }}>{student.name}</span>
                        <span style={{ fontSize: '9px', color: 'var(--text-tertiary)' }}>{student.details}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: student.isSelf ? '#f43f5e' : 'var(--text-secondary)' }}>{student.score}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// =====================================================
// --- FEES TAB ---
// =====================================================
export function StudentFeesTab({ studentId, sData }: { studentId: string; sData: any }) {
  const isPaid = sData.feeStatus === 'Paid';
  const [showFeeModal, setShowFeeModal] = useState(false);

  const mockOverviewData = [
    { name: 'Term 1', paid: 30000, due: 30000, overdue: 0, cumulative: 25 },
    { name: 'Term 2', paid: 28500, due: 31000, overdue: 1500, cumulative: 54 },
    { name: 'Term 3', paid: 0, due: 30000, overdue: 0, cumulative: 54 },
    { name: 'Term 4', paid: 0, due: 30000, overdue: 0, cumulative: 70.42 }
  ];

  const breakdownPieData = [
    { name: 'Tuition Fee', value: 60000, color: '#8b5cf6', percentage: '50%' },
    { name: 'Admission Fee', value: 10000, color: '#3b82f6', percentage: '8.3%' },
    { name: 'Development Fee', value: 15000, color: '#10b981', percentage: '12.5%' },
    { name: 'Examination Fee', value: 10000, color: '#f59e0b', percentage: '8.3%' },
    { name: 'Transport Fee', value: 15000, color: '#ec4899', percentage: '12.5%' },
    { name: 'Other Fee', value: 10000, color: '#06b6d4', percentage: '8.3%' }
  ];

  const customFeeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>{label} (Jul - Sep)</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#10b981', fontWeight: 600 }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span> Paid Amount: ₹ 28,500</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontWeight: 600 }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></span> Due Amount: ₹ 31,000</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontWeight: 600 }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }}></span> Overdue Amount: ₹ 1,500</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b5cf6', fontWeight: 600 }}><span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#8b5cf6' }}></span> Cumulative Paid %: 54%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
      
      {/* 5-CARD KPI METRICS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Fees (This Year)', val: '₹ 1,20,000', trend: 'Fee Details →', trendColor: 'var(--accent-purple)', icon: <CreditCard size={18} />, color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)' },
          { label: 'Total Paid', val: '₹ 84,500', trend: '70.42% of total', icon: <Download size={18} />, color: 'var(--accent-green)', bg: 'var(--accent-green-dim)' },
          { label: 'Pending Amount', val: '₹ 35,500', trend: '29.58% left', icon: <Clock size={18} />, color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)' },
          { label: 'Next Due Date', val: '15 Jun 2025', trend: 'Term 2 Installment', icon: <Calendar size={18} />, color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.08)' },
          { label: 'Overdue Amount', val: '₹ 5,500', valColor: 'var(--accent-red)', trend: 'Late fees active', trendColor: 'var(--accent-red)', icon: <AlertTriangle size={18} />, color: 'var(--accent-red)', bg: 'var(--accent-red-dim)' }
        ].map((card, idx) => (
          <div 
            key={idx} 
            style={{ 
              background: '#ffffff', 
              border: '1px solid var(--border-primary)', 
              borderRadius: '12px', 
              padding: '16px', 
              display: 'flex', 
              flexDirection: 'row', 
              alignItems: 'center', 
              gap: '14px', 
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
            }}
          >
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {card.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{card.label}</span>
              <div style={{ fontSize: '18px', fontWeight: 800, color: card.valColor || 'var(--text-primary)', lineHeight: 1.2 }}>{card.val}</div>
              <div style={{ fontSize: '9px', color: card.trendColor || 'var(--text-muted)', fontWeight: card.trendColor ? 600 : 400, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Fee Payment Overview, Fee Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '20px', alignItems: 'stretch' }}>
        
        {/* Composed Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Fee Payment Overview</h3>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Track your payments and dues over time</span>
            </div>
            <select style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', fontSize: '10px', padding: '4px 8px', outline: 'none', background: 'transparent', color: 'var(--text-secondary)' }}>
              <option>This Academic Year</option>
            </select>
          </div>
          
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={mockOverviewData} margin={{ top: 10, right: -15, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-secondary)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 500 }} dy={8} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 20000, 40000, 60000, 80000, 100000]} tickFormatter={(v) => `₹${v/1000}K`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--text-secondary)', fontWeight: 500 }} ticks={[0, 25, 50, 75, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={customFeeTooltip} />
                <Legend verticalAlign="top" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '10px', fontWeight: 600 }} />
                <Bar yAxisId="left" name="Paid Amount" dataKey="paid" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={12} isAnimationActive={false} />
                <Bar yAxisId="left" name="Due Amount" dataKey="due" fill="#8b5cf6" radius={[4, 4, 0, 0]} maxBarSize={12} isAnimationActive={false} />
                <Bar yAxisId="left" name="Overdue Amount" dataKey="overdue" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={12} isAnimationActive={false} />
                <Line yAxisId="right" name="Cumulative Paid %" dataKey="cumulative" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#ffffff', stroke: '#8b5cf6', strokeWidth: 1.5 }} isAnimationActive={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div style={{ background: 'var(--accent-cyan-dim)', border: '1px solid rgba(6,182,212,0.15)', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-primary)', fontWeight: 600 }}>
            <span style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(6,182,212,0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Star size={10} /></span>
            <span>You have saved ₹ 2,500 through early payments and discounts.</span>
          </div>
        </div>

        {/* Donut Chart */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Fee Breakdown</h3>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>This Year</span>
            </div>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '16px', width: '100%' }}>
            <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={breakdownPieData} cx="50%" cy="50%" innerRadius={35} outerRadius={46} dataKey="value" stroke="none" isAnimationActive={false}>
                    {breakdownPieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '11px', fontWeight: 800 }}>₹1.2L</span>
                <span style={{ fontSize: '8px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
              {breakdownPieData.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', minWidth: 0 }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.color, flexShrink: 0 }}></span>
                    <span style={{ color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.name}>{item.name}</span>
                  </span>
                  <span style={{ color: 'var(--text-primary)', flexShrink: 0, paddingLeft: '4px' }}>{item.percentage}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '12px', borderTop: '1px solid var(--border-secondary)', paddingTop: '10px' }}>
            <span 
              onClick={() => setShowFeeModal(true)}
              style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}
            >
              View full fee structure →
            </span>
          </div>
        </div>

      </div>

      {/* Row 3: Due Installments Table (2/3 width) & Recent Transactions (1/3 width) */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'stretch' }}>
        
        {/* Due Installments */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Due Installments</h3>
            <span style={{ fontSize: '11px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}>View all installments →</span>
          </div>
          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Installment</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Period</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Due Date</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Amount</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Paid</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Due</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '8px 4px', color: 'var(--text-tertiary)', fontWeight: 700, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Term 2', period: 'Jul - Sep 2025', date: '15 Jun 2025', amt: '30,000', paid: '28,500', due: '1,500', status: 'PARTIAL', statusText: 'Partial Due', bg: 'rgba(245,158,11,0.08)', color: 'var(--accent-amber)' },
                  { name: 'Term 3', period: 'Oct - Dec 2025', date: '15 Sep 2025', amt: '30,000', paid: '0', due: '30,000', status: 'UPCOMING', statusText: 'Upcoming', bg: 'rgba(59,130,246,0.08)', color: 'var(--accent-blue)' },
                  { name: 'Term 4', period: 'Jan - Mar 2026', date: '15 Dec 2025', amt: '30,000', paid: '0', due: '30,000', status: 'UPCOMING', statusText: 'Upcoming', bg: 'rgba(59,130,246,0.08)', color: 'var(--accent-blue)' }
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--border-secondary)' }}>
                    <td style={{ padding: '10px 4px', fontWeight: 700 }}>{row.name}</td>
                    <td style={{ padding: '10px 4px', color: 'var(--text-secondary)' }}>{row.period}</td>
                    <td style={{ padding: '10px 4px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{row.date}</td>
                    <td style={{ padding: '10px 4px', fontFamily: 'var(--font-mono)' }}>₹ {row.amt}</td>
                    <td style={{ padding: '10px 4px', fontFamily: 'var(--font-mono)' }}>₹ {row.paid}</td>
                    <td style={{ padding: '10px 4px', fontFamily: 'var(--font-mono)', fontWeight: 700, color: row.status === 'PARTIAL' ? 'var(--accent-amber)' : 'inherit' }}>₹ {row.due}</td>
                    <td style={{ padding: '10px 4px' }}>
                      <span style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 700, background: row.bg, color: row.color, padding: '2px 6px', borderRadius: '4px' }}>{row.statusText}</span>
                    </td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>
                      <button style={{ background: 'var(--accent-purple)', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '9px', fontWeight: 700, cursor: 'pointer' }}>Pay Now</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions (right column) */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>Recent Transactions</h3>
            <span style={{ fontSize: '10px', color: 'var(--accent-purple)', fontWeight: 600, cursor: 'pointer' }}>View all</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {[
              { date: '20 May 2025', name: 'Term 2 Installment', amt: '28,500', status: 'SUCCESS' },
              { date: '10 Apr 2025', name: 'Term 1 Installment', amt: '28,500', status: 'SUCCESS' },
              { date: '15 Feb 2025', name: 'Admission Fee', amt: '10,000', status: 'SUCCESS' },
              { date: '05 Jan 2025', name: 'Development Fee', amt: '15,000', status: 'SUCCESS' },
              { date: '28 Dec 2024', name: 'Transport Fee', amt: '15,000', status: 'SUCCESS' }
            ].map((t, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: idx < 4 ? '1px solid var(--border-secondary)' : 'none', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>{t.date}</span>
                  <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>₹ {t.amt}</span>
                  <span style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 700, background: 'var(--accent-green-dim)', color: 'var(--accent-green)', padding: '1px 4px', borderRadius: '4px' }}>Success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Dismissible Alert Banner */}
      <div style={{ background: 'rgba(139, 92, 246, 0.06)', border: '1px solid rgba(139, 92, 246, 0.15)', borderRadius: '10px', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CalendarDays size={14} /></span>
          <div>
            <strong style={{ fontSize: '12px', color: 'var(--text-primary)' }}>Stay Updated</strong>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Enable notifications to never miss fee due dates and important updates.</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ background: 'var(--accent-purple)', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '6px 14px', fontSize: '10.5px', fontWeight: 700, cursor: 'pointer' }}>Enable Notifications</button>
          <span style={{ color: 'var(--text-tertiary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><X size={14} /></span>
        </div>
      </div>

      {showFeeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.55)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {/* Print Button */}
          <button
            onClick={() => {
              const printContent = document.getElementById('lbs-fee-document')?.innerHTML;
              if (printContent) {
                const win = window.open('', '', 'height=800,width=1000');
                if (win) {
                  win.document.write('<html><head><title>LBS Fee Structure 2025-26</title>');
                  win.document.write('<style>');
                  win.document.write('body { font-family: "Times New Roman", Times, Georgia, serif; padding: 40px; color: #000; }');
                  win.document.write('table { width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 20px; }');
                  win.document.write('th, td { border: 1px solid #000; padding: 6px 8px; font-size: 11px; text-align: center; }');
                  win.document.write('th { font-weight: bold; }');
                  win.document.write('td.left-align { text-align: left; }');
                  win.document.write('.text-underline { text-decoration: underline; }');
                  win.document.write('</style>');
                  win.document.write('</head><body>');
                  win.document.write(printContent);
                  win.document.write('</body></html>');
                  win.document.close();
                  setTimeout(() => {
                    win.print();
                  }, 300);
                }
              }
            }}
            style={{
              position: 'absolute',
              top: '24px',
              right: '80px',
              background: 'rgba(30, 41, 59, 0.85)',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              zIndex: 10000,
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.85)'}
            title="Print Document"
          >
            <Printer size={20} />
          </button>

          {/* Close Button */}
          <button 
            onClick={() => setShowFeeModal(false)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'rgba(30, 41, 59, 0.85)',
              border: 'none',
              cursor: 'pointer',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              zIndex: 10000,
              transition: 'background-color 0.2s',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(30, 41, 59, 0.85)'}
            title="Close"
          >
            <X size={20} />
          </button>

          {/* Paper Sheet Container */}
          <div style={{
            backgroundColor: '#ffffff',
            color: '#000000',
            width: '90%',
            maxWidth: '850px',
            maxHeight: '92vh',
            borderRadius: '4px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid #1e293b',
            animation: 'scaleIn 0.2s ease-out'
          }}>
            {/* Scrollable Document Area */}
            <div 
              id="lbs-fee-document"
              style={{
                padding: '40px 50px',
                overflowY: 'auto',
                flex: 1,
                fontFamily: "'Times New Roman', Times, Georgia, serif",
                backgroundColor: '#ffffff'
              }}
            >
              {/* Document Header block with Emblem */}
              <div style={{
                position: 'relative',
                minHeight: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '10px'
              }}>
                {/* High-Fidelity Black Ink Seal Logo */}
                <div style={{
                  position: 'absolute',
                  left: '10px',
                  top: '0px'
                }}>
                  <svg width="65" height="65" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                    <circle cx="50" cy="50" r="44" stroke="#000" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="40" stroke="#000" strokeWidth="0.8" strokeDasharray="2 2" />
                    <circle cx="50" cy="50" r="32" stroke="#000" strokeWidth="1" />
                    
                    {/* Laurels/Leaves on the sides */}
                    <path d="M23 50 C21 62, 27 72, 37 77 C29 73, 24 63, 25 50 Z" fill="#000" />
                    <path d="M77 50 C79 62, 73 72, 63 77 C71 73, 76 63, 75 50 Z" fill="#000" />
                    
                    {/* Top and Bottom Ribbon banners */}
                    <path d="M 23 23 C 35 15, 65 15, 77 23 L 73 28 C 63 21, 37 21, 27 28 Z" fill="#000" />
                    <path d="M 20 78 C 32 86, 68 86, 80 78 L 76 73 C 66 80, 34 80, 24 73 Z" fill="#000" />
                    
                    {/* Center Shield Emblem */}
                    <path d="M42 40 L58 40 L56 62 C56 68, 44 68, 44 62 Z" stroke="#000" strokeWidth="1.2" fill="none" />
                    <circle cx="50" cy="48" r="4" stroke="#000" strokeWidth="1.2" />
                    <line x1="50" y1="52" x2="50" y2="60" stroke="#000" strokeWidth="1.2" />
                    <path d="M47 60 L53 60" stroke="#000" strokeWidth="1.2" />
                    
                    {/* Ribbon Curved Text labels */}
                    <path id="modal-top-text-path" d="M 26 23 C 36 17, 64 17, 74 23" fill="none" />
                    <text fontSize="5" fontWeight="bold" fill="#fff" letterSpacing="1">
                      <textPath href="#modal-top-text-path" startOffset="50%" textAnchor="middle">L B S</textPath>
                    </text>
                    
                    <path id="modal-bottom-text-path" d="M 23 78 C 33 84, 67 84, 77 78" fill="none" />
                    <text fontSize="5" fontWeight="bold" fill="#fff">
                      <textPath href="#modal-bottom-text-path" startOffset="50%" textAnchor="middle">KERALA</textPath>
                    </text>
                  </svg>
                </div>
                
                {/* Centered Letterhead Details */}
                <div style={{ textAlign: 'center', paddingLeft: '80px', paddingRight: '80px' }}>
                  <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#b22222', letterSpacing: '0.3px', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    LBS INSTITUTE OF TECHNOLOGY FOR WOMEN
                  </h1>
                  <p style={{ margin: '2px 0 0 0', fontSize: '10.5px', fontWeight: 'bold', color: '#000000', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    (A Government of Kerala Undertaking)
                  </p>
                  <p style={{ margin: '1px 0 0 0', fontSize: '10.5px', color: '#000000', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    POOJAPPURA, THIRUVANANTHAPURAM, KERALA - 695 012
                  </p>
                  <p style={{ margin: '1px 0 0 0', fontSize: '10px', color: '#000000', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    Phone: 0471-2349232, Fax: 0471-2343393
                  </p>
                  <p style={{ margin: '1px 0 0 0', fontSize: '10px', color: '#000000', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    website: lbitw.ac.in &nbsp; email: principal@lbsitw.ac.in
                  </p>
                </div>
              </div>

              {/* Physical Divider */}
              <div style={{ borderBottom: '1px solid #000000', margin: '8px 0 16px 0' }}></div>

              {/* Title & Direction */}
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '13.5px', fontWeight: 'bold', color: '#000000', margin: '0 0 4px 0', textDecoration: 'underline', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                  B.Tech Fee Structure 2025-26
                </h2>
                <h3 style={{ fontSize: '11px', fontWeight: 'bold', color: '#000000', margin: 0, textDecoration: 'underline', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                  Amount to be remitted to the Director Account
                </h3>
              </div>

              {/* B.Tech Fee Structure Table */}
              <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse', 
                  fontSize: '11px', 
                  fontFamily: "'Times New Roman', Times, Georgia, serif",
                  border: '1px solid #000000'
                }}>
                  <thead>
                    <tr style={{ background: '#ffffff' }}>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '38px', fontWeight: 'bold', color: '#000000' }}>Sl. No</th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', fontWeight: 'bold', color: '#000000', textAlign: 'center' }}>Item</th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '110px', fontWeight: 'bold', color: '#000000' }}>
                        <div>Merit</div>
                        <div>(Full Fee)</div>
                      </th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '110px', fontWeight: 'bold', color: '#000000' }}>
                        <div>Merit</div>
                        <div>(Lower Fee)</div>
                      </th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '110px', fontWeight: 'bold', color: '#000000' }}>
                        <div>SC/ST/OEC/</div>
                        <div>OBC (H)</div>
                      </th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '90px', fontWeight: 'bold', color: '#000000' }}>TFW</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { no: '1.', item: 'Admission Fees', meritFull: 'Rs. 1000/-', meritLow: 'Rs. 1000/-', scst: '0', tfw: 'Rs. 1000/-' },
                      { no: '2.', item: 'Tuition Fee [Rs. 165000 in CIWG]', meritFull: 'Rs. 76750/- (per year)', meritLow: 'Rs. 47250/- (per year)', scst: '0', tfw: '0' },
                      { no: '3.', item: 'Special Fee', meritFull: 'Rs. 1500/-', meritLow: 'Rs. 1500/-', scst: '0', tfw: 'Rs. 1500/-' },
                      { no: '4.', item: 'Caution Deposit', meritFull: 'Rs. 5000/-', meritLow: 'Rs. 5000/-', scst: 'Rs. 5000/-', tfw: 'Rs. 5000/-' },
                      { no: '5.', item: 'Establishment Charge', meritFull: 'Rs. 2000/-', meritLow: 'Rs. 2000/-', scst: '0', tfw: 'Rs. 2000/-' },
                      { no: '6.', item: 'University Registration Fee', meritFull: 'Rs. 1050/-', meritLow: 'Rs. 2050/-', scst: '0', tfw: 'Rs. 2050/-' },
                      { no: '7.', item: 'Examination Fee(First & Second Semester) (subject to changes as per the KTU decision)', meritFull: 'Rs. 3300/-', meritLow: 'Rs. 3300/-', scst: '0', tfw: 'Rs. 3300/-' },
                      { no: '8.', item: 'Arts & Sports Fee', meritFull: 'Rs. 500/-', meritLow: 'Rs. 530/-', scst: '0', tfw: 'Rs. 530/-' },
                      { no: '9.', item: 'Student Affiliation Fee', meritFull: 'Rs. 790/-', meritLow: 'Rs. 790/-', scst: '0', tfw: 'Rs. 790/-' },
                      { no: '10.', item: 'Online Academic Management Fee', meritFull: 'Rs. 450/-', meritLow: 'Rs. 450/-', scst: 'Rs. 450/-', tfw: 'Rs. 450/-' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ background: '#ffffff' }}>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>{row.no}</td>
                        <td style={{ padding: '6px 6px', border: '1px solid #000000', color: '#000000', textAlign: 'left' }}>{row.item}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>
                          {row.no === '2.' ? (
                            <>
                              <div>Rs. 76750/-</div>
                              <div style={{ fontSize: '9.5px' }}>(per year)</div>
                            </>
                          ) : row.meritFull}
                        </td>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>
                          {row.no === '2.' ? (
                            <>
                              <div>Rs. 47250/-</div>
                              <div style={{ fontSize: '9.5px' }}>(per year)</div>
                            </>
                          ) : row.meritLow}
                        </td>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>{row.scst}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>{row.tfw}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#ffffff', fontWeight: 'bold' }}>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000' }}></td>
                      <td style={{ padding: '6px 6px', border: '1px solid #000000', color: '#000000', textAlign: 'right' }}>TOTAL.</td>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>Rs. 94,370/-</td>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>Rs. 64,870/-</td>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>Rs. 5,450/-</td>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>Rs. 17,620/-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Other Fee Structure Title */}
              <div style={{ textAlign: 'center', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '13px', fontWeight: 'bold', color: '#000000', margin: 0, textDecoration: 'underline', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                  Other Fee Structure 2025 – 26
                </h2>
              </div>

              {/* Other Fee Table */}
              <div style={{ overflowX: 'auto', marginBottom: '20px', maxWidth: '520px', margin: '0 auto 20px auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse', 
                  fontSize: '11px', 
                  fontFamily: "'Times New Roman', Times, Georgia, serif",
                  border: '1px solid #000000'
                }}>
                  <thead>
                    <tr style={{ background: '#ffffff' }}>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '50px', fontWeight: 'bold', color: '#000000' }}>Sl. No</th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', fontWeight: 'bold', color: '#000000', textAlign: 'center' }}>Item</th>
                      <th style={{ padding: '6px 4px', border: '1px solid #000000', width: '110px', fontWeight: 'bold', color: '#000000' }}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { no: '1', item: 'Parent Teachers Association [PTA]', amount: 'Rs. 5775/-' },
                      { no: '2', item: 'Career Guidance & Placement [CGPU]', amount: 'Rs. 1050/-' },
                      { no: '3', item: 'College Union', amount: 'Rs. 1260/-' },
                      { no: '4', item: 'Dept. Assoc. Association Fee', amount: 'Rs. 1100/-' },
                      { no: '5', item: 'Institution Development Fund', amount: 'Rs. 2000/-' },
                      { no: '6', item: 'Cooperative Society', amount: 'Rs. 110/-' },
                      { no: '7', item: 'Library Fee', amount: 'Rs. 1000/-' },
                      { no: '8', item: 'Professional Body Fee', amount: 'Rs. 1000/-' }
                    ].map((row, idx) => (
                      <tr key={idx} style={{ background: '#ffffff' }}>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>{row.no}</td>
                        <td style={{ padding: '6px 6px', border: '1px solid #000000', color: '#000000', textAlign: 'left' }}>{row.item}</td>
                        <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>{row.amount}</td>
                      </tr>
                    ))}
                    <tr style={{ background: '#ffffff', fontWeight: 'bold' }}>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000' }}></td>
                      <td style={{ padding: '6px 6px', border: '1px solid #000000', color: '#000000', textAlign: 'right' }}>TOTAL.</td>
                      <td style={{ padding: '6px 4px', border: '1px solid #000000', color: '#000000', textAlign: 'center' }}>Rs. 13,295/-</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Signature Block */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', paddingRight: '16px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ height: '35px' }}></div>
                  <strong style={{ fontSize: '11px', color: '#000000', letterSpacing: '0.5px', textTransform: 'uppercase', fontFamily: "'Times New Roman', Times, Georgia, serif" }}>
                    PRINCIPAL
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// =====================================================
// --- DOCUMENTS TAB ---
// =====================================================
export function StudentDocumentsTab({ studentId, sData }: { studentId: string; sData: any }) {
  const [selectedDocId, setSelectedDocId] = useState('d1');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const documents = [
    { id: 'd1', name: 'Aadhaar Card', category: 'Identity Proof', status: 'VERIFIED', date: '12 Feb 2019', expiry: '-', verifiedOn: '15 Feb 2025', verifiedBy: 'Admin (Ritika Sharma)', number: '1234 5678 9012', docRef: 'DOC-2026-00024' },
    { id: 'd2', name: 'Caste Certificate', category: 'Certificate', status: 'PENDING', date: '18 Mar 2023', expiry: '-', verifiedOn: '-', verifiedBy: '-' },
    { id: 'd3', name: 'Birth Certificate', category: 'Identity Proof', status: 'VERIFIED', date: '05 Apr 2011', expiry: '-', verifiedOn: '07 Apr 2025', verifiedBy: 'Admin' },
    { id: 'd4', name: 'Passport', category: 'Identity Proof', status: 'VERIFIED', date: '22 Jan 2024', expiry: '21 Jan 2034', verifiedOn: '25 Jan 2024', verifiedBy: 'Admin' },
    { id: 'd5', name: 'Income Certificate', category: 'Certificate', status: 'REJECTED', date: '10 Aug 2023', expiry: '-', verifiedOn: '12 Aug 2023', verifiedBy: 'Admin' },
    { id: 'd6', name: 'Vaccination Certificate', category: 'Medical', status: 'VERIFIED', date: '15 Jun 2022', expiry: '-', verifiedOn: '16 Jun 2022', verifiedBy: 'Admin' },
    { id: 'd7', name: 'Passport Size Photo', category: 'Photo', status: 'VERIFIED', date: '01 Apr 2025', expiry: '-', verifiedOn: '01 Apr 2025', verifiedBy: 'Admin' },
    { id: 'd8', name: 'Previous School TC', category: 'Academic', status: 'PENDING', date: '28 Mar 2025', expiry: '-', verifiedOn: '-', verifiedBy: '-' }
  ];

  const filteredDocuments = documents.filter(d => {
    if (searchQuery && !d.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (statusFilter === 'VERIFIED' && d.status !== 'VERIFIED') return false;
    if (statusFilter === 'PENDING' && d.status !== 'PENDING') return false;
    if (statusFilter === 'REJECTED' && d.status !== 'REJECTED') return false;
    if (statusFilter === 'EXPIRING' && d.expiry === '-') return false;
    return true;
  });

  const selectedDoc = documents.find(d => d.id === selectedDocId) || documents[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', animation: 'fadeIn 0.3s ease', fontFamily: 'var(--font-sans)', color: 'var(--text-primary)' }}>
      
      {/* 5-CARD KPI METRICS STRIP */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Documents', val: '24', trend: 'All Documents', color: 'var(--accent-purple)', bg: 'rgba(139, 92, 246, 0.08)', action: 'View all →', actionColor: 'var(--accent-purple)', filter: 'ALL' },
          { label: 'Verified Documents', val: '18', trend: '75% of total', color: 'var(--accent-green)', bg: 'var(--accent-green-dim)', action: 'Verified →', actionColor: 'var(--accent-green)', filter: 'VERIFIED' },
          { label: 'Pending Verification', val: '4', trend: '16.7% of total', color: 'var(--accent-amber)', bg: 'rgba(245, 158, 11, 0.08)', action: 'Review →', actionColor: 'var(--accent-amber)', filter: 'PENDING' },
          { label: 'Rejected Documents', val: '2', trend: '8.3% of total', color: 'var(--accent-red)', bg: 'var(--accent-red-dim)', action: 'Rejected →', actionColor: 'var(--accent-red)', filter: 'REJECTED' },
          { label: 'Expiring Soon', val: '1', trend: 'In 90 days', color: 'var(--accent-blue)', bg: 'rgba(59, 130, 246, 0.08)', action: 'Details →', actionColor: 'var(--accent-blue)', filter: 'EXPIRING' }
        ].map((card, idx) => {
          const isActive = statusFilter === card.filter;
          return (
            <div 
              key={idx} 
              onClick={() => setStatusFilter(card.filter)}
              style={{ 
                background: isActive ? 'var(--bg-tertiary)' : '#ffffff', 
                border: isActive ? `1px solid ${card.color}` : '1px solid var(--border-primary)', 
                borderRadius: '12px', 
                padding: '16px', 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: '14px', 
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.05)' : '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease, background 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                }
              }}
            >
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Folder size={18} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0, flex: 1 }}>
                <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-tertiary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{card.label}</span>
                <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>{card.val}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9px', marginTop: '2px', gap: '4px' }}>
                  <span style={{ color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{card.trend}</span>
                  <span style={{ color: card.actionColor, fontWeight: 700, whiteSpace: 'nowrap' }}>{card.action}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2: Document list & Preview Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', alignItems: 'stretch' }}>
        
        {/* Document List */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '320px' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input 
                  type="text" 
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '6px 12px 6px 32px', fontSize: '11.5px', outline: 'none', background: 'transparent', color: 'var(--text-primary)' }} 
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '11.5px', padding: '6px 12px', outline: 'none', background: 'transparent', color: 'var(--text-secondary)' }}
              >
                <option value="ALL">All Status</option>
                <option value="VERIFIED">Verified</option>
                <option value="PENDING">Pending</option>
                <option value="REJECTED">Rejected</option>
                <option value="EXPIRING">Expiring</option>
              </select>
              <button style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', fontSize: '11.5px', padding: '6px 12px', background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <Filter size={12} /> More Filters
              </button>
            </div>
            <button style={{ background: 'var(--accent-purple)', color: '#ffffff', border: 'none', borderRadius: '8px', padding: '6px 14px', fontSize: '11.5px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Plus size={14} /> Upload Document
            </button>
          </div>

          <div style={{ overflowX: 'auto', flex: 1 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11.5px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Document Name</th>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Issue Date</th>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Expiry Date</th>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700 }}>Verified On</th>
                  <th style={{ padding: '10px 8px', color: 'var(--text-tertiary)', fontWeight: 700, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.length > 0 ? filteredDocuments.map((doc) => {
                  const isSelected = doc.id === selectedDocId;
                  const statusBg = doc.status === 'VERIFIED' ? 'var(--accent-green-dim)' : doc.status === 'PENDING' ? 'rgba(245,158,11,0.08)' : 'var(--accent-red-dim)';
                  const statusColor = doc.status === 'VERIFIED' ? 'var(--accent-green)' : doc.status === 'PENDING' ? 'var(--accent-amber)' : 'var(--accent-red)';
                  return (
                    <tr 
                      key={doc.id} 
                      onClick={() => setSelectedDocId(doc.id)}
                      style={{ borderBottom: '1px solid var(--border-secondary)', cursor: 'pointer', background: isSelected ? 'var(--bg-tertiary)' : 'transparent', transition: 'all 0.15s' }}
                    >
                      <td style={{ padding: '12px 8px', fontWeight: 700 }}>{doc.name}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{doc.category}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 700, background: statusBg, color: statusColor, padding: '2px 6px', borderRadius: '4px' }}>{doc.status}</span>
                      </td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{doc.date}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{doc.expiry}</td>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)', fontSize: '10.5px' }}>
                        {doc.verifiedOn !== '-' ? (
                          <span>{doc.verifiedOn} <span style={{ color: 'var(--text-tertiary)' }}>by {doc.verifiedBy}</span></span>
                        ) : '-'}
                      </td>
                      <td style={{ padding: '12px 8px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px', color: 'var(--text-tertiary)' }} onClick={(e) => e.stopPropagation()}>
                          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: '2px' }} title="View"><Eye size={13} /></button>
                          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: '2px' }} title="Download"><Download size={13} /></button>
                          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', padding: '2px' }} title="More"><MoreVertical size={13} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan={7} style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                      No documents found for this filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-secondary)', borderTop: '1px solid var(--border-secondary)', paddingTop: '14px' }}>
            <span>Showing 1 to 8 of 24 documents</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', background: 'transparent', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>&lt;</button>
              <button style={{ border: 'none', borderRadius: '6px', background: 'var(--accent-purple)', color: '#ffffff', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, cursor: 'pointer' }}>1</button>
              <button style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', background: 'transparent', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>2</button>
              <button style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', background: 'transparent', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>3</button>
              <button style={{ border: '1px solid var(--border-primary)', borderRadius: '6px', background: 'transparent', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>&gt;</button>
            </div>
          </div>
        </div>

        {/* Aadhaar Preview Panel */}
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, margin: 0 }}>{selectedDoc.name}</h3>
            {selectedDoc.status === 'VERIFIED' && (
              <span style={{ fontSize: '8px', textTransform: 'uppercase', fontWeight: 700, background: 'var(--accent-green-dim)', color: 'var(--accent-green)', padding: '2px 6px', borderRadius: '4px' }}>Verified</span>
            )}
          </div>
          
          {selectedDoc.id === 'd1' ? (
            /* Indian Aadhaar Card Graphic */
            <div style={{ 
              width: '100%', 
              border: '1px solid #cbd5e1', 
              borderRadius: '8px', 
              padding: '12px 12px 0 12px', 
              background: 'linear-gradient(to bottom, #fffefc, #ffffff, #f9fdfa)', 
              color: '#1e293b', 
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.05)', 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '10px',
              overflow: 'hidden'
            }}>
              {/* Header */}
              <div style={{ 
                borderBottom: '2px solid #ea580c', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                paddingBottom: '4px' 
              }}>
                <span style={{ fontSize: '7px', fontWeight: 800, color: '#ea580c', letterSpacing: '0.3px' }}>भारत सरकार</span>
                
                {/* Stylized Miniature Ashoka Lion Emblem */}
                <svg width="12" height="16" viewBox="0 0 30 40" style={{ fill: '#d97706', display: 'block' }}>
                  <path d="M10,2 C10,2 15,0 20,2 C22,4 20,12 20,12 L10,12 Z" />
                  <path d="M6,12 L24,12 L22,16 L8,16 Z" fill="#b45309" />
                  <rect x="12" y="16" width="6" height="12" />
                  <circle cx="15" cy="32" r="4" />
                  <line x1="8" y1="36" x2="22" y2="36" stroke="#d97706" strokeWidth="2" />
                </svg>
                
                <span style={{ fontSize: '7px', fontWeight: 800, color: '#16a34a', letterSpacing: '0.3px' }}>GOVERNMENT OF INDIA</span>
              </div>

              {/* Main Content */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                {/* Photo with double border */}
                <div style={{ 
                  width: '56px', 
                  height: '68px', 
                  border: '1px solid #cbd5e1', 
                  padding: '1px',
                  background: '#ffffff', 
                  display: 'flex', 
                  overflow: 'hidden',
                  flexShrink: 0
                }}>
                  <img 
                    src="/student_avatar.png" 
                    alt="Aditya Kumar" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        const fall = document.createElement('div');
                        fall.style.width = '100%';
                        fall.style.height = '100%';
                        fall.style.background = '#e2e8f0';
                        fall.style.display = 'flex';
                        fall.style.alignItems = 'center';
                        fall.style.justifyContent = 'center';
                        fall.innerHTML = `<span style="font-size: 8px; color: #94a3b8; font-weight: 700">PHOTO</span>`;
                        parent.appendChild(fall);
                      }
                    }}
                  />
                </div>
                {/* Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '8.5px', fontWeight: 600, flex: 1, minWidth: 0 }}>
                  <div style={{ color: '#0f172a', fontSize: '9px', fontWeight: 700 }}>आदित्य कुमार</div>
                  <div style={{ color: '#0f172a', fontSize: '9px', fontWeight: 800 }}>Aditya Kumar</div>
                  <div style={{ color: '#475569', marginTop: '2px' }}>जन्म तिथि / DOB: 10/03/2011</div>
                  <div style={{ color: '#475569' }}>पुरुष / MALE</div>
                </div>
                
                {/* Aadhaar QR Code / Logo Graphic Panel */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                  {/* Detailed Fingerprint SVG */}
                  <svg width="22" height="26" viewBox="0 0 24 30" style={{ fill: 'none', stroke: '#dc2626', strokeWidth: '1.2' }}>
                    <path d="M12,4 C7.5,4 4,7.5 4,12 C4,13 4.2,14 4.5,15" />
                    <path d="M12,7 C9,7 6.5,9.5 6.5,12.5 C6.5,13.5 6.8,14.5 7.2,15.2" />
                    <path d="M12,10 C10.5,10 9,11.2 9,13 C9,14 9.2,15 9.7,15.8" />
                    <path d="M12,1 C5.4,1 0,6.4 0,13 C0,15 0.5,17 1.2,18.5" />
                    <path d="M12,4 C16.5,4 20,7.5 20,12 C20,14 19.2,15.8 18,17.2" />
                    <path d="M12,7 C15,7 17.5,9.5 17.5,12.5 C17.5,13.8 16.8,15.2 15.8,16" />
                    <path d="M12,10 C13.5,10 15,11.2 15,13 C15,14 14.5,15 13.8,15.6" />
                    <path d="M12,1 C18.6,1 24,6.4 24,13 C24,16 22.8,18.8 21,20.8" />
                  </svg>
                  
                  {/* Simulated QR matrix */}
                  <div style={{ 
                    width: '32px', 
                    height: '32px', 
                    background: '#ffffff', 
                    border: '1px solid #94a3b8', 
                    padding: '2px', 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(5, 1fr)', 
                    gap: '1px' 
                  }}>
                    <div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#fff' }}></div><div style={{ background: '#000' }}></div>
                    <div style={{ background: '#000' }}></div><div style={{ background: '#fff' }}></div><div style={{ background: '#fff' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#fff' }}></div>
                    <div style={{ background: '#fff' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div>
                    <div style={{ background: '#000' }}></div><div style={{ background: '#fff' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#fff' }}></div><div style={{ background: '#000' }}></div>
                    <div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#fff' }}></div><div style={{ background: '#000' }}></div><div style={{ background: '#000' }}></div>
                  </div>
                </div>
              </div>

              {/* Number bar with large spaced formatting */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                fontSize: '14px', 
                fontWeight: 700, 
                borderTop: '1px solid #e2e8f0', 
                paddingTop: '6px', 
                color: '#dc2626', 
                letterSpacing: '2.5px', 
                fontFamily: 'var(--font-mono)' 
              }}>
                1234 5678 9012
              </div>

              {/* Bottom tag full-width banner matching Indian National Green */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                background: '#16a34a', 
                color: '#ffffff',
                padding: '5px 0', 
                fontSize: '7.5px', 
                fontWeight: 800, 
                margin: '4px -12px 0 -12px',
                letterSpacing: '0.5px'
              }}>
                मेरा आधार, मेरी पहचान
              </div>
            </div>
          ) : (
            /* General Document Preview Placeholder */
            <div style={{ width: '100%', height: '140px', border: '1px dashed var(--border-primary)', borderRadius: '8px', background: 'var(--bg-tertiary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <FileText size={32} style={{ color: 'var(--text-tertiary)' }} />
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedDoc.name}</span>
                <span style={{ fontSize: '9.5px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>Preview is being loaded...</span>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-secondary)', paddingTop: '16px' }}>
            {[
              { label: 'Document ID', val: selectedDoc.docRef || `DOC-2026-${(20000 + parseInt(selectedDoc.id.replace(/\D/g, '') || '1') * 24)}` },
              { label: 'Issue Date', val: selectedDoc.date },
              { label: 'Document Number', val: selectedDoc.number || `REF-${(70000 + parseInt(selectedDoc.id.replace(/\D/g, '') || '1') * 13)}` },
              { label: 'Linked With', val: sData.fullName },
              { label: 'Uploaded On', val: selectedDoc.verifiedOn !== '-' ? `${selectedDoc.verifiedOn}, 10:30 AM` : '28 Mar 2025, 02:45 PM' },
              { label: 'Uploaded By', val: selectedDoc.verifiedBy !== '-' ? selectedDoc.verifiedBy : 'Admin (Ritika Sharma)' }
            ].map((row, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', paddingBottom: '6px', borderBottom: '1px solid var(--border-secondary)' }}>
                <span style={{ color: 'var(--text-tertiary)' }}>{row.label}</span>
                <strong style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{row.val}</strong>
              </div>
            ))}
          </div>

          {/* Verification Box */}
          {selectedDoc.status === 'VERIFIED' ? (
            <div style={{ background: 'var(--accent-green-dim)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <CheckCircle2 size={16} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '11.5px', color: 'var(--accent-green)', display: 'block' }}>Verified & Valid</strong>
                <span style={{ fontSize: '9.5px', color: 'var(--accent-green)', display: 'block', marginTop: '2px', lineHeight: '1.4' }}>This document has been verified and is valid. Verified by {selectedDoc.verifiedBy} on {selectedDoc.verifiedOn}.</span>
              </div>
            </div>
          ) : selectedDoc.status === 'PENDING' ? (
            <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Clock size={16} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '11.5px', color: 'var(--accent-amber)', display: 'block' }}>Verification Pending</strong>
                <span style={{ fontSize: '9.5px', color: 'var(--accent-amber)', display: 'block', marginTop: '2px', lineHeight: '1.4' }}>This document is currently in the verification queue. Our registrars will review it shortly.</span>
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--accent-red-dim)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <AlertTriangle size={16} style={{ color: 'var(--accent-red)', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '11.5px', color: 'var(--accent-red)', display: 'block' }}>Verification Rejected</strong>
                <span style={{ fontSize: '9.5px', color: 'var(--accent-red)', display: 'block', marginTop: '2px', lineHeight: '1.4' }}>This document was rejected due to blurry scan details. Please upload a high-resolution version.</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}

