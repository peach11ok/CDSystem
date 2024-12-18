import React, { useEffect, useState } from 'react';
import { Satellite, Person, Architecture } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { getAllUsers } = useAuth();
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      const users = await getAllUsers();
      setUserCount(users.length);
    };
    fetchUserCount();
  }, [getAllUsers]);

  return (
    <div className="p-6 space-y-8">
      {/* 顶部空白区域和系统信息 */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg flex items-center justify-between px-8">
        <div className="flex items-center">
          <Satellite className="h-12 w-12 text-white mr-4" />
          <div>
            <h1 className="text-3xl font-bold text-white">遥感图像变化检测系统</h1>
            <p className="text-blue-100 mt-2">当前系统总用户数：{userCount}</p>
          </div>
        </div>
      </div>

      {/* 模型介绍部分 */}
      <div className="space-y-8">
        <div className="flex items-center">
          <Architecture className="h-8 w-8 text-blue-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">变化检测模型介绍</h2>
        </div>

        {/* TFIFNet */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">TFIFNet</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  TFIFNet是一个专门针对遥感图像变化检测设计的深度学习模型。该模型基于Swin Transformer和孪生网络架构。
                  集成特征交互和特征融合的思想，旨在解决小变化区域漏检问题和配准误差问题。
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">核心特点</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>孪生网络并行提取双时态特征</li>
                    <li>在特征提取阶段基于特征交互缓解配准误差问题，最小化配准误差在模型中的传递</li>
                    <li>在特征处理阶段引入跨时态联合注意力，进一步缓解配准误差问题</li>
                    <li>引入邻接层特征作为额外空间信息，共融合三种特征</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <img 
                  src="/images/TFIFNet.jpg" 
                  alt="TFIFNet框架图" 
                  className="w-full h-auto object-contain"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">TFIFNet 模型架构图</p>
              </div>
            </div>
          </div>
        </div>

        {/* TFIFNet+ */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">TFIFNetPro</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  TFIFNet+ 是在 TFIFNet 基础上的改进版本，通过和引入前后景分离模块，
                  进一步提升了变化检测的性能和效率。
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">改进特点</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>增强特征交互模块，引入前后景分离模块</li>
                    <li>优化的网络结构，进一步提升检测精度</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <img 
                  src="/images/TFIFNetPro.jpg" 
                  alt="TFIFNet+框架图" 
                  className="w-full h-auto object-contain"
                />
                <p className="text-sm text-gray-500 mt-2 text-center">TFIFNet+ 模型架构图</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 