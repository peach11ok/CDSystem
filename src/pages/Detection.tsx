import React, { useState } from 'react';
import ModelSelector from '../components/ModelSelector';
import ImageUploader from '../components/ImageUploader';
import ResultDisplay from '../components/ResultDisplay';
import { DetectionResult, DetectionRecord, StoredUser } from '../types';
import { Science, CloudUpload, Compare } from '@mui/icons-material';
import ProcessingModal from '../components/ProcessingModal';
import ResultModal from '../components/ResultModal';
import { useAuth } from '../contexts/AuthContext';

interface SelectedImages {
  image1: string;
  image2: string;
}

const Detection: React.FC = () => {
  const { user } = useAuth();
  const [selectedImages, setSelectedImages] = useState<SelectedImages | null>(null);
  const [selectedModels, setSelectedModels] = useState({
    detectionModel: '',
    segmentationModel: ''
  });
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleDetectionStart = async () => {
    if (!selectedImages || !user) return;
    
    setIsProcessing(true);
    try {
      // 模拟检测过程
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockResult: DetectionResult = {
        changedAreas: ['区域1', '区域2'],
        confidence: 0.95,
        segmentationData: {
          image1: ['建筑', '道路'],
          image2: ['建筑', '绿地']
        },
        changeDetectionImage: '/path/to/change/detection/result.jpg',
        segmentationImages: {
          image1: '/path/to/segmentation/result1.jpg',
          image2: '/path/to/segmentation/result2.jpg'
        }
      };

      setResult(mockResult);
      setShowResult(true);

      // 保存检测记录
      const newRecord: DetectionRecord = {
        id: Math.random().toString(),
        userId: user.id,
        timestamp: new Date().toISOString(),
        inputImages: selectedImages,
        models: selectedModels,
        results: {
          changeDetectionImage: mockResult.changeDetectionImage,
          segmentationImages: mockResult.segmentationImages,
          changedAreas: mockResult.changedAreas,
          changeTypes: mockResult.segmentationData.image2.filter(
            (type, index) => type !== mockResult.segmentationData.image1[index]
          )
        }
      };
    } catch (error) {
      console.error('检测失败:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageUpload = (type: 'image1' | 'image2', file: File | null) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImages(prev => ({
      ...prev || { image1: '', image2: '' },
      [type]: imageUrl
    }));
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-6">
        {/* 模型选择部分 */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Science className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">选择模型</h2>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                变化检测模型
              </label>
              <ModelSelector
                type="detection"
                value={selectedModels.detectionModel}
                onChange={(model) => setSelectedModels(prev => ({ ...prev, detectionModel: model }))}
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                语义分割模型
              </label>
              <ModelSelector
                type="segmentation"
                value={selectedModels.segmentationModel}
                onChange={(model) => setSelectedModels(prev => ({ ...prev, segmentationModel: model }))}
              />
            </div>
          </div>
        </div>

        {/* 图片上传部分 */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <CloudUpload className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-900">上传双时态图片</h2>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <ImageUploader
              label="上传图片1"
              onChange={(file) => handleImageUpload('image1', file)}
            />
            <ImageUploader
              label="上传图片2"
              onChange={(file) => handleImageUpload('image2', file)}
            />
          </div>
        </div>

        {/* 检测按钮 */}
        <div className="flex justify-center mb-8">
          <button
            className="relative flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleDetectionStart}
            disabled={!selectedModels.detectionModel || !selectedModels.segmentationModel || !selectedImages || isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
                <span className="opacity-0">检测中...</span>
              </>
            ) : (
              <>
                <Compare className="h-5 w-5 mr-2" />
                开始检测
              </>
            )}
          </button>
        </div>
      </div>

      {/* 处理中弹窗 */}
      <ProcessingModal isOpen={isProcessing} />

      {/* 结果弹窗 */}
      {result && (
        <ResultModal
          isOpen={showResult}
          onClose={() => setShowResult(false)}
          result={result}
          selectedImages={selectedImages}
          selectedModels={selectedModels}
        />
      )}
    </div>
  );
};

export default Detection; 