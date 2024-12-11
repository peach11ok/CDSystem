import React from 'react';
import { Satellite } from '@mui/icons-material';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <Satellite className="h-8 w-8 text-blue-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">欢迎使用变化检测系统</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          这里是系统首页，可以展示系统概况、使用说明等信息。
        </p>
      </div>
    </div>
  );
};

export default Dashboard; 