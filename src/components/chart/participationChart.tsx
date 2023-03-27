import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { IParticipationChart } from "../../types/types";
const dataX = [
    {name: 'Oct', uv: 100, pv: 2400, amt: 2400},
    {name: 'Nov', uv: 150, pv: 2400, amt: 2400},
    {name: 'Dec', uv: 400, pv: 2400, amt: 2400},
    {name: 'Jan', uv: 100, pv: 2400, amt: 2400}
];

const data = [
    // {month: 'Oct', totalMkr: 190},
    // {month: 'Nov', totalMkr: 189},
    // {month: 'Dec', totalMkr: 185},
    // {month: 'Jan', totalMkr: 189},
    // {month: 'Feb', totalMkr: 199},
    // {month: 'Apr', totalMkr: 202}
] as IParticipationChart[]

export const ParticipationChart = () => {
    return (
        <LineChart width={700} height={300} data={dataX} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
        </LineChart>
      )
}