import React from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  type: 'detection' | 'segmentation';
}

const ModelSelector: React.FC<Props> = ({ value, onChange, type }) => {
  const models = type === 'detection' 
    ? [
        { id: 'model1', name: 'TFIFNet' },
        { id: 'model2', name: 'TFIFNetPro' },
      ]
    : [
        { id: 'seg1', name: 'DeepLabV3' },
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