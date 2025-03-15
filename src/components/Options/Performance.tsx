// src/components/options/Performance.tsx
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  font-family: Inter;
`;

const ToggleButton = styled.button<{ active: boolean }>`
  background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.theme.buttonText};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  margin-right: 10px;
  transition: all 0.3s ease;
  font-family: Inter;
  
  &:hover {
    background: ${props => props.active ? props.theme.buttonBg : 'rgba(255, 255, 255, 0.3)'};
  }
`;

const Performance = () => {
  const [timeframe, setTimeframe] = useState('week');
  
  // Sample data - would come from your API
  const weekData = [
    { day: 'Mon', sales: 4000, leads: 24, followUps: 18 },
    { day: 'Tue', sales: 3000, leads: 13, followUps: 22 },
    { day: 'Wed', sales: 2000, leads: 18, followUps: 15 },
    { day: 'Thu', sales: 2780, leads: 20, followUps: 21 },
    { day: 'Fri', sales: 1890, leads: 15, followUps: 17 },
  ];
  
  const monthData = [
    { day: 'Week 1', sales: 12000, leads: 85, followUps: 72 },
    { day: 'Week 2', sales: 9800, leads: 66, followUps: 58 },
    { day: 'Week 3', sales: 11200, leads: 78, followUps: 64 },
    { day: 'Week 4', sales: 14500, leads: 92, followUps: 81 },
  ];
  
  return (
    <div>
      <h3 style={{ fontFamily: 'Inter' }}>Performance Dashboard</h3>
      <p style={{ fontFamily: 'Inter' }}>View your performance metrics across different time periods.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <ToggleButton 
          active={timeframe === 'week'} 
          onClick={() => setTimeframe('week')}
        >
          Past Week
        </ToggleButton>
        <ToggleButton 
          active={timeframe === 'month'} 
          onClick={() => setTimeframe('month')}
        >
          Past Month
        </ToggleButton>
      </div>
      
      <AnimatePresence mode="wait">
        <TimelineContainer
          key={timeframe}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={timeframe === 'week' ? weekData : monthData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#5d4b8c" activeDot={{ r: 8 }} />
              <Line yAxisId="left" type="monotone" dataKey="leads" stroke="black" />
              
            </LineChart>
          </ResponsiveContainer>
        </TimelineContainer>
      </AnimatePresence>
    </div>
  );
};

export default Performance;
