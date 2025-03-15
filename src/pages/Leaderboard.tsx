import React from 'react';

const Leaderboard: React.FC = () => {
  // Sample data; replace with actual data fetching logic
  const leaderboardData = [
    { name: 'Alice', sales: 150 },
    { name: 'Bob', sales: 120 },
    { name: 'Charlie', sales: 100 },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold">Leaderboard</h2>
      <ul>
        {leaderboardData.map((rep, index) => (
          <li key={index} className="flex justify-between py-2">
            <span>{rep.name}</span>
            <span>{rep.sales} Sales</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
