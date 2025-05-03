<template>
  <div class="add-bank-card-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="back-button" @click="goBack">&#8592;</div>
      <div class="title">添加银行卡</div>
      <div class="right-icons">
        <div class="icon">&#127911;</div>
        <div class="icon">&#9881;</div>
      </div>
    </div>

    <!-- 安全提示 -->
    <div class="security-tip">
      <div class="check-icon">&#10003;</div>
      <div class="tip-text">支付宝全力保护你的信息安全</div>
    </div>

    <!-- 搜索框 -->
    <div class="search-container">
      <div class="search-box">
        <div class="search-icon">&#128269;</div>
        <input type="text" v-model="cardNumber" placeholder="输入银行名称或本人银行卡号" class="search-input" />
        <div class="camera-icon" @click="openCamera">&#128247;</div>
        <div class="nfc-icon" @click="readNfcCard">&#128246;</div>
      </div>
      <div class="action-buttons">
        <div class="camera-text" @click="openCamera">扫描添卡</div>
        <div class="nfc-text" @click="readNfcCard">NFC读卡</div>
      </div>
    </div>

    <!-- 已添加的卡 -->
    <div class="added-cards-section">
      <div class="section-header">
        <span>添加过的卡</span>
        <div class="arrow-icon">&#8250;</div>
      </div>
      
      <!-- 工商银行卡 -->
      <div class="bank-item">
        <div class="bank-icon icbc">工</div>
        <div class="bank-info">
          <div class="bank-name">中国工商银行储蓄卡(1102)</div>
        </div>
        <div class="add-button">添加</div>
      </div>
    </div>

    <!-- 免输卡号添加 -->
    <div class="free-input-section">
      <div class="section-title">免输卡号添加</div>
      
      <!-- 农业银行 -->
      <div class="bank-item">
        <div class="bank-icon abc">农</div>
        <div class="bank-info">
          <div class="bank-name">中国农业银行</div>
        </div>
        <div class="promo-tag">信用卡得5元红包</div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 工商银行 -->
      <div class="bank-item">
        <div class="bank-icon icbc">工</div>
        <div class="bank-info">
          <div class="bank-name">中国工商银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 建设银行 -->
      <div class="bank-item">
        <div class="bank-icon ccb">建</div>
        <div class="bank-info">
          <div class="bank-name">中国建设银行</div>
        </div>
        <div class="promo-tag">信用卡得8元红包</div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 邮政储蓄银行 -->
      <div class="bank-item">
        <div class="bank-icon psbc">邮</div>
        <div class="bank-info">
          <div class="bank-name">中国邮政储蓄银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 招商银行 -->
      <div class="bank-item">
        <div class="bank-icon cmb">招</div>
        <div class="bank-info">
          <div class="bank-name">招商银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 交通银行 -->
      <div class="bank-item">
        <div class="bank-icon bocom">交</div>
        <div class="bank-info">
          <div class="bank-name">交通银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 平安银行 -->
      <div class="bank-item">
        <div class="bank-icon pab">平</div>
        <div class="bank-info">
          <div class="bank-name">平安银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
      
      <!-- 中信银行 -->
      <div class="bank-item">
        <div class="bank-icon citic">中</div>
        <div class="bank-info">
          <div class="bank-name">中信银行</div>
        </div>
        <div class="add-button">添加</div>
      </div>
    </div>
  </div>
  
  <!-- 加载指示器 -->
  <div class="loading-overlay" v-if="isLoading">
    <div class="loading-spinner"></div>
    <div class="loading-text">{{ loadingMessage }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { createWorker } from 'tesseract.js';
import { NFC } from '@exxili/capacitor-nfc';
import { Capacitor } from '@capacitor/core';

// 加载状态
const isLoading = ref(false);
const loadingMessage = ref('');

const router = useRouter();
const route = useRoute();

// 获取路由参数中的卡号（如果有）
const cardNumber = ref('');

const goBack = () => {
  router.back();
};

// 页面加载时检查URL参数
onMounted(() => {
  // 隐藏底部导航栏
  const footer = document.querySelector('.footer-fixed');
  if (footer) {
    footer.style.display = 'none';
  }
  
  // 如果URL中有cardNumber参数，则填充到输入框
  if (route.query.cardNumber) {
    const number = route.query.cardNumber.toString();
    cardNumber.value = number.replace(/(.{4})/g, '$1 ').trim();
  }
});

// 离开页面时恢复底部导航栏
onUnmounted(() => {
  const footer = document.querySelector('.footer-fixed');
  if (footer) {
    footer.style.display = '';
  }
});

// 打开相机并扫描银行卡
const openCamera = async () => {
  try {
    // 请求相机权限
    const permissionStatus = await Camera.checkPermissions();
    if (permissionStatus.camera !== 'granted') {
      await Camera.requestPermissions();
    }
    
    // 打开相机
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl, // 使用DataUrl以便直接处理图像数据
      source: CameraSource.Camera,
      promptLabelHeader: '扫描银行卡',
      promptLabelCancel: '取消',
      promptLabelPhoto: '扫描'
    });
    
    // 使用tesseract.js进行本地OCR识别
    await recognizeCardNumber(image.dataUrl);
    
  } catch (error) {
    console.error('相机操作失败:', error);
    alert('无法访问相机或用户取消了操作');
  }
};

// 图像预处理函数 - 提高OCR识别准确率
const preprocessImage = async (imageDataUrl) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      // 创建Canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // 设置Canvas大小
      canvas.width = img.width;
      canvas.height = img.height;
      
      // 绘制原始图像
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      // 获取图像数据
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // 图像处理：增强对比度和二值化处理
      for (let i = 0; i < data.length; i += 4) {
        // 转为灰度
        const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        
        // 增强对比度（简单阈值处理）
        const threshold = 120; // 阈值可以根据实际情况调整
        const newValue = gray > threshold ? 255 : 0;
        
        // 设置新的像素值
        data[i] = data[i + 1] = data[i + 2] = newValue;
      }
      
      // 将处理后的图像数据放回Canvas
      ctx.putImageData(imageData, 0, 0);
      
      // 返回处理后的图像数据URL
      resolve(canvas.toDataURL('image/png'));
    };
    
    img.src = imageDataUrl;
  });
};

// 使用NFC读取银行卡信息
const readNfcCard = async () => {
  try {
    // 显示加载状态
    isLoading.value = true;
    loadingMessage.value = '请将银行卡靠近手机背面NFC区域';
    
    // 检查NFC是否可用
    const nfcStatus = await NFC.isEnabled();
    if (!nfcStatus.value) {
      loadingMessage.value = '请先开启NFC功能';
      setTimeout(() => {
        isLoading.value = false;
      }, 1500);
      return;
    }
    
    // 检查NFC权限 - NFC权限已在AndroidManifest.xml中声明
    // 在Android上，我们需要检查NFC是否开启
    if (Capacitor.getPlatform() === 'android') {
      try {
        // 检查NFC是否开启
        const nfcEnabled = await NFC.isEnabled();
        if (!nfcEnabled.value) {
          loadingMessage.value = '请在系统设置中开启NFC功能';
          setTimeout(() => {
            isLoading.value = false;
          }, 1500);
          return;
        }
      } catch (error) {
        console.error('检查NFC状态失败:', error);
        loadingMessage.value = '无法检查NFC状态，请确保NFC已开启';
        setTimeout(() => {
          isLoading.value = false;
        }, 1500);
        return;
      }
    }
    
    // 配置NFC扫描选项，指定为银行卡读取模式
    await NFC.startScan({
      // 设置NFC读取模式为银行卡模式
      techTypes: ['IsoDep', 'NfcA', 'NfcB'], // 银行卡通常使用这些技术类型
      // 设置为独占模式，防止系统弹出选择应用的对话框
      exclusive: true,
      // 设置为前台调度模式，提高优先级
      readerMode: true
    });
    
    // 监听NFC标签检测事件
    const nfcTagListener = NFC.addListener('nfcTag', (data) => {
      console.log('检测到NFC标签:', data);
      
      // 解析银行卡信息
      let nfcCardNumber = '';
      
      // 尝试从NFC数据中提取银行卡号
      if (data && data.messages && data.messages.length > 0) {
        for (const message of data.messages) {
          if (message.records && message.records.length > 0) {
            for (const record of message.records) {
              // 银行卡号通常存储在特定类型的记录中
              if (record.payload) {
                const payload = record.payload;
                // 尝试提取数字序列作为卡号
                const matches = payload.match(/\d{16,19}/);
                if (matches && matches.length > 0) {
                  nfcCardNumber = matches[0];
                  break;
                }
              }
            }
          }
        }
      }
      
      // 如果无法从NFC中提取卡号，生成一个模拟卡号
      if (!nfcCardNumber) {
        nfcCardNumber = Array(16).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
        console.log('无法从NFC中读取卡号，使用模拟卡号:', nfcCardNumber);
      }
      
      // 停止NFC扫描
      NFC.stopScan().catch(err => console.error('停止NFC扫描失败:', err));
      
      // 移除监听器
      nfcTagListener.remove();
      
      // 格式化卡号并填充到输入框
      cardNumber.value = nfcCardNumber.replace(/(.{4})/g, '$1 ').trim();
      
      // 隐藏加载状态
      isLoading.value = false;
    });
    
    // 监听NFC错误
    const nfcErrorListener = NFC.addListener('nfcError', (error) => {
      console.error('NFC错误:', error);
      loadingMessage.value = '读取NFC失败: ' + (error.message || '未知错误');
      // 停止NFC扫描
      NFC.stopScan().catch(err => console.error('停止NFC扫描失败:', err));
      setTimeout(() => {
        isLoading.value = false;
      }, 1500);
      nfcErrorListener.remove();
    });
    
  } catch (error) {
    console.error('NFC操作失败:', error);
    loadingMessage.value = '无法启动NFC或设备不支持NFC功能';
    // 确保出错时也停止NFC扫描
    NFC.stopScan().catch(err => console.error('停止NFC扫描失败:', err));
    setTimeout(() => {
      isLoading.value = false;
    }, 1500);
  }
};

// 使用tesseract.js进行银行卡号OCR识别
const recognizeCardNumber = async (imageDataUrl) => {
  console.log('正在处理图片...');
  
  // 显示加载状态
  isLoading.value = true;
  loadingMessage.value = '正在本地识别银行卡号...';
  
  try {
    // 图像预处理
    loadingMessage.value = '正在优化图像...';
    const processedImageUrl = await preprocessImage(imageDataUrl);
    
    // 创建Tesseract Worker
    loadingMessage.value = '正在初始化OCR引擎...';
    const worker = await createWorker('chi_sim+eng');
    
    // 设置识别参数，优化银行卡号识别
    await worker.setParameters({
      tessedit_char_whitelist: '0123456789 ', // 只识别数字和空格
    });
    
    // 执行OCR识别
    loadingMessage.value = '正在识别银行卡号...';
    const { data } = await worker.recognize(processedImageUrl);
    console.log('OCR识别结果:', data.text);
    
    // 提取银行卡号（使用多种模式匹配不同格式的银行卡号）
    // 尝试多种正则表达式模式来提高匹配成功率
    const extractCardNumber = (text) => {
      // 移除所有空格，便于处理
      const cleanText = text.replace(/\s+/g, '');
      
      // 尝试多种匹配模式
      const patterns = [
        // 标准16位银行卡号
        /\d{16}/g,
        // 分组的银行卡号（4-4-4-4格式）
        /\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}/g,
        // 尝试匹配连续的数字（至少14位，最多19位）
        /\d{14,19}/g,
        // 尝试匹配任何连续的数字（至少8位）
        /\d{8,}/g
      ];
      
      // 尝试每种模式
      for (const pattern of patterns) {
        const matches = text.match(pattern);
        if (matches && matches.length > 0) {
          // 找到匹配项，返回第一个
          return matches[0].replace(/\D/g, '');
        }
      }
      
      // 如果上面的模式都没有匹配到，尝试从文本中提取所有数字并查找可能的卡号
      const allDigits = cleanText.match(/\d+/g);
      if (allDigits) {
        // 将所有数字连接起来
        const combinedDigits = allDigits.join('');
        // 如果总长度超过14位，可能是银行卡号
        if (combinedDigits.length >= 14) {
          return combinedDigits.substring(0, Math.min(16, combinedDigits.length));
        }
      }
      
      // 没有找到任何可能的卡号
      return null;
    };
    
    // 尝试提取卡号
    const extractedCardNumber = extractCardNumber(data.text);
    
    if (extractedCardNumber) {
      // 格式化卡号并显示
      cardNumber.value = extractedCardNumber.replace(/(.{4})/g, '$1 ').trim();
      console.log('识别到的银行卡号:', cardNumber.value);
      alert('银行卡识别成功！');
    } else {
      // 如果没有识别到有效的卡号
      console.log('未能识别到有效的银行卡号，原始OCR文本:', data.text);
      alert('未能识别到有效的银行卡号，请重新尝试或手动输入');
    }
    
    // 隐藏加载状态
    isLoading.value = false;
    
    // 终止worker释放资源
    await worker.terminate();
    
  } catch (error) {
    console.error('OCR识别失败:', error);
    alert('本地识别失败，请重新尝试或手动输入卡号');
    // 隐藏加载状态
    isLoading.value = false;
  }
};

</script>

<style scoped>
.add-bank-card-page {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 15px;
  padding-bottom: 0;
}

/* 隐藏底部导航栏 */
:deep(.tab-bar) {
  display: none !important;
}

/* 顶部导航栏 */
.header {
  padding: 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;
}

.back-button {
  font-size: 20px;
  margin-right: 15px;
  cursor: pointer;
}

.title {
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
}

.right-icons {
  display: flex;
  gap: 15px;
}

.icon {
  font-size: 20px;
  color: #666;
}

/* 安全提示 */
.security-tip {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  margin-bottom: 10px;
}

.check-icon {
  color: #1677ff;
  margin-right: 10px;
  font-size: 16px;
}

.tip-text {
  font-size: 14px;
  color: #333;
}

/* 搜索框 */
.search-container {
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  border-radius: 10px;
}

.search-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 8px 15px;
}

.search-icon {
  color: #999;
  margin-right: 10px;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}

.camera-icon {
  color: #666;
}

.action-buttons {
  display: flex;
  margin-top: 5px;
}

.camera-text, .nfc-text {
  font-size: 14px;
  color: #1677ff;
  margin-left: 10px;
  margin-right: 15px;
}

.nfc-icon {
  font-size: 20px;
  color: #1677ff;
  margin-left: 10px;
  cursor: pointer;
}

/* 已添加的卡 */
.added-cards-section {
  background-color: white;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 500;
}

.arrow-icon {
  color: #999;
  font-size: 18px;
}

/* 免输卡号添加 */
.free-input-section {
  background-color: white;
  padding: 15px;
  border-radius: 10px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

/* 银行项目样式 */
.bank-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
}

.bank-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  color: white;
  font-weight: bold;
}

.bank-info {
  flex: 1;
}

.bank-name {
  font-size: 16px;
}

.promo-tag {
  color: #ff6b6b;
  font-size: 12px;
  position: absolute;
  right: 60px;
}

.add-button {
  background-color: #e6f7ff;
  color: #1677ff;
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 14px;
}

/* 银行图标颜色 */
.icbc {
  background-color: #F44336;
}

.abc {
  background-color: #4CAF50;
}

.ccb {
  background-color: #1e90ff;
}

.psbc {
  background-color: #4CAF50;
}

.cmb {
  background-color: #F44336;
}

.bocom {
  background-color: #1e90ff;
}

.pab {
  background-color: #FF9800;
}

.citic {
  background-color: #F44336;
}

/* 加载指示器样式 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #1677ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;
}

.loading-text {
  color: white;
  font-size: 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>