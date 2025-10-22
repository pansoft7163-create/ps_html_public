# OCR 技术学习资料库

欢迎来到 OCR（光学字符识别）技术学习资料库！本仓库为你提供了一个系统化的 14 天学习计划，帮助你从零开始掌握 OCR 技术。

## 📁 目录结构

```
ocr-learning/
├── index.html          # 交互式学习计划页面（14 天进阶路线）
├── resources.md        # OCR 技术资源汇总文档
└── README.md          # 本文件
```

## 🎯 学习计划概览

本学习计划分为 **4 个阶段，共 14 天**，涵盖从基础到实战的完整学习路径：

### 📖 第一阶段：OCR 基础入门 (Day 1-3)
- **Day 1**: OCR 技术概述与发展历史
- **Day 2**: 传统 OCR 技术原理
- **Day 3**: Tesseract OCR 安装与使用

### 🧠 第二阶段：深度学习 OCR 技术 (Day 4-7)
- **Day 4**: 深度学习基础与 CNN 应用
- **Day 5**: 文字检测技术：CTPN、DBNet
- **Day 6**: CRNN 文字识别算法详解
- **Day 7**: Transformer 在 OCR 中的应用

### 🛠️ 第三阶段：主流 OCR 工具实战 (Day 8-11)
- **Day 8**: PaddleOCR 完整实战
- **Day 9**: EasyOCR 快速上手
- **Day 10**: OCR 工具对比与选型
- **Day 11**: OCR 模型训练与微调

### 🚀 第四阶段：高级应用与项目实战 (Day 12-14)
- **Day 12**: OCR 后处理与优化技术
- **Day 13**: OCR 系统部署与服务化
- **Day 14**: 综合项目实战

## 🚀 快速开始

### 方式一：使用交互式学习计划页面

1. 打开 `index.html` 文件（可以直接在浏览器中打开）
2. 按照 Day 1 到 Day 14 的顺序学习
3. 完成每天的学习后，勾选复选框标记进度
4. 学习进度会自动保存在浏览器本地存储中

### 方式二：查阅资源文档

打开 `resources.md` 文件，查看详细的：
- 开源 OCR 工具介绍
- 深度学习模型和论文
- 数据集资源
- 学习教程和视频
- 实用工具推荐

## 🎓 学习建议

### 对于零基础学习者
1. **循序渐进**: 严格按照 Day 1 到 Day 14 的顺序学习
2. **动手实践**: 每天都要运行代码示例，不要只看理论
3. **做好笔记**: 记录重点概念和遇到的问题
4. **坚持完成**: 每天投入 2-3 小时，坚持 14 天

### 对于有基础的学习者
1. **选择性学习**: 可以跳过已掌握的基础内容
2. **深入研究**: 重点关注 Day 6-7 的深度学习部分
3. **项目驱动**: 直接从 Day 14 的项目实战开始
4. **源码阅读**: 深入研读 PaddleOCR、CRNN 等开源项目

## 🛠️ 必备工具和环境

### 软件环境
- **Python**: 3.7 或更高版本
- **操作系统**: Windows / macOS / Linux 均可

### Python 库
```bash
# 基础库
pip install numpy opencv-python pillow matplotlib

# OCR 工具
pip install pytesseract
pip install paddlepaddle paddleocr
pip install easyocr

# 深度学习框架（可选）
pip install torch torchvision
pip install tensorflow
```

### 硬件建议
- **CPU**: Intel i5 或同等性能
- **内存**: 8GB 及以上
- **GPU**: （可选）NVIDIA GPU 可加速模型训练和推理

## 📚 主要学习内容

### 核心技术栈
- **传统 OCR**: 图像预处理、特征提取、模板匹配
- **深度学习**: CNN、RNN、LSTM、Transformer
- **文字检测**: CTPN、EAST、DBNet、PSENet
- **文字识别**: CRNN、Attention OCR、TrOCR
- **主流工具**: Tesseract、PaddleOCR、EasyOCR

### 实战项目方向
- 📋 智能票据识别系统
- 🪪 证件信息提取系统
- 📚 PDF 文档转文本工具
- 🚗 车牌识别系统
- 📝 手写笔记数字化
- 🌐 多语言实时翻译

## 🌟 特色亮点

1. **系统化学习路径**: 14 天从零到精通的完整规划
2. **理论与实践结合**: 每天都包含理论学习和实践操作
3. **工具对比分析**: 详细对比主流 OCR 工具的优劣
4. **项目驱动学习**: 最后以实战项目巩固所学知识
5. **进度可视化**: 交互式页面实时跟踪学习进度
6. **资源全面**: 包含论文、数据集、教程、工具等

## 📊 学习效果评估

完成本学习计划后，你将能够：

- ✅ 理解 OCR 技术的基本原理和发展历程
- ✅ 掌握传统 OCR 和深度学习 OCR 的区别
- ✅ 熟练使用 Tesseract、PaddleOCR、EasyOCR 等工具
- ✅ 理解 CRNN、Transformer 等核心算法
- ✅ 能够训练和微调自己的 OCR 模型
- ✅ 具备部署 OCR 服务的能力
- ✅ 完成一个完整的 OCR 应用项目

## 🤝 贡献与反馈

如果你在学习过程中有任何问题或建议，欢迎：
- 提交 Issue 反馈问题
- 分享你的学习心得
- 贡献更多学习资源

## 📖 参考资料

- [PaddleOCR 官方文档](https://github.com/PaddlePaddle/PaddleOCR)
- [EasyOCR GitHub](https://github.com/JaidedAI/EasyOCR)
- [Tesseract 官方文档](https://github.com/tesseract-ocr/tesseract)
- [CRNN 论文](https://arxiv.org/abs/1507.05717)
- [Awesome OCR](https://github.com/kba/awesome-ocr)

## 📅 版本历史

- **v1.0** (2025-10-22): 初始版本发布
  - 创建 14 天学习计划
  - 整理 OCR 技术资源
  - 设计交互式学习页面

## 📜 许可证

本学习资料库采用 MIT 许可证，欢迎自由使用和分享。

---

**开始你的 OCR 学习之旅吧！** 🚀

打开 `index.html` 开始第一天的学习！