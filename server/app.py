from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os
import time
from werkzeug.utils import send_from_directory

# 初始化 Flask 应用
app = Flask(__name__)

# 配置跨域请求
CORS(app)

# 配置上传文件的存储路径
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# 确保上传文件夹存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_images():
    if 'image1' not in request.files or 'image2' not in request.files:
        return jsonify({'error': '请上传两张图片'}), 400
    
    image1 = request.files['image1']
    image2 = request.files['image2']
    
    if image1.filename == '' or image2.filename == '':
        return jsonify({'error': '未选择文件'}), 400
    
    result = {}
    for image, key in [(image1, 'image1'), (image2, 'image2')]:
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            # 为文件名添加时间戳，避免重名
            timestamp = str(int(time.time()))
            new_filename = f"{timestamp}_{filename}"
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], new_filename)
            image.save(filepath)
            result[key] = f"/uploads/{new_filename}"
    
    return jsonify(result)

# 提供访问上传文件的路由
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# 基础路由
@app.route('/')
def hello():
    print('服务器运行正常')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
