import React from 'react';
import { 
  BarChart3, Calendar, ArrowUpRight, ArrowDownRight, TrendingUp, Award, CalendarCheck, CalendarX, Clock, ShieldCheck, CheckCircle2, CalendarDays
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
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
    current: isBase ? 80 + (i*1.5) + Math.random()*5 : 75 + (i*1.5) + (idNum%5),
    previous: isBase ? 75 + (i*1.2) + Math.random()*5 : 70 + (i*1.2) + (idNum%5)
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
