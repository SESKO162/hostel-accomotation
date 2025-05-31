"use client"

import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  name: string;
  [key: string]: number | string;
}

interface LineChartProps {
  data: ChartData[];
  dataKeys: string[];
  colors?: string[];
  width?: number | string;
  height?: number;
}

export function LineChart({
  data,
  dataKeys,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'],
  width = '100%',
  height = 300,
}: LineChartProps) {
  // Ensure dataKeys is an array and has items before rendering
  const validDataKeys = Array.isArray(dataKeys) && dataKeys.length > 0 ? dataKeys : [];
  
  // If no valid data, show a message
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        No chart data available
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e0e0e0',
              fontSize: '12px',
            }}
          />
          <Legend />
          {validDataKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 6 }}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartProps {
  data: ChartData[];
  dataKey: string;
  xAxisKey: string;
  colors?: string[];
  width?: number | string;
  height?: number;
  barSize?: number;
}

export function BarChart({
  data,
  dataKey,
  xAxisKey,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'],
  width = '100%',
  height = 300,
  barSize = 30,
}: BarChartProps) {
  // If no valid data, show a message
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        No chart data available
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey={xAxisKey}
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e0e0e0',
              fontSize: '12px',
            }}
            formatter={(value: any) => [value, dataKey]}
          />
          <Bar 
            dataKey={dataKey} 
            fill={colors[0]}
            radius={[4, 4, 0, 0]}
            barSize={barSize}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface AreaChartProps {
  data: ChartData[];
  dataKeys: string[];
  colors?: string[];
  width?: number | string;
  height?: number;
  strokeWidth?: number;
}

export function AreaChart({
  data,
  dataKeys,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE'],
  width = '100%',
  height = 300,
  strokeWidth = 2,
}: AreaChartProps) {
  // Ensure dataKeys is an array and has items before rendering
  const validDataKeys = Array.isArray(dataKeys) && dataKeys.length > 0 ? dataKeys : [];
  
  // If no valid data, show a message
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        No chart data available
      </div>
    );
  }


  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="name"
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#e0e0e0' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e0e0e0',
              fontSize: '12px',
            }}
          />
          <Legend />
          {validDataKeys.map((key, index) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[index % colors.length]}
              fillOpacity={0.2}
              fill={colors[index % colors.length]}
              strokeWidth={strokeWidth}
              activeDot={{ r: 4 }}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface DonutChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  width?: number | string;
  height?: number;
  innerRadius?: number | string;
  outerRadius?: number | string;
  label?: boolean;
}

export function DonutChart({
  data,
  colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#FF8042', '#00C49F', '#FFBB28'],
  width = '100%',
  height = 300,
  innerRadius = '60%',
  outerRadius = '80%',
  label = false,
}: DonutChartProps) {
  // If no valid data, show a message
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        width, 
        height, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        No chart data available
      </div>
    );
  }

  return (
    <div style={{ width, height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={5}
            dataKey="value"
            label={label}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              border: '1px solid #e0e0e0',
              fontSize: '12px',
            }}
            formatter={(value: number, name: string, props: any) => [
              value,
              props.payload.name
            ]}
          />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;