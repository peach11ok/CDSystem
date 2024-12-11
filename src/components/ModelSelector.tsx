import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  type: 'detection' | 'segmentation';
}

const ModelSelector: React.FC<Props> = ({ value, onChange, type }) => {
  const models = type === 'detection' 
    ? [
        { id: 'model1', name: '变化检测模型1' },
        { id: 'model2', name: '变化检测模型2' },
        { id: 'model3', name: '变化检测模型3' },
      ]
    : [
        { id: 'seg1', name: '语义分割模型1' },
        { id: 'seg2', name: '语义分割模型2' },
        { id: 'seg3', name: '语义分割模型3' },
      ];

  return (
    <div className="mb-4">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-40 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">
          请选择{type === 'detection' ? '检测' : '分割'}模型
        </option>
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelector; 