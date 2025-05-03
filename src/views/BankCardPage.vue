<template>
  <div class="bank-card-page">
    <!-- 顶部导航栏 -->
    <div class="header">
      <div class="back-button" @click="goBack">&#8592; 银行卡</div>
    </div>
    
    <!-- 我的卡片区域 -->
    <div class="my-cards-section">
      <div class="section-header">
        <span class="my-cards-title">我的卡</span>
        <div class="security-tag">安全保障中</div>
        <div class="all-cards">全部银行卡(3张) &#8250;</div>
      </div>
      
      <!-- 银行卡列表 -->
      <div class="card-list">
        <!-- 光大银行卡 -->
        <div class="bank-card orange-card">
          <div class="card-header">
            <div class="bank-logo">E</div>
            <div class="bank-info">
              <div class="bank-name">光大银行(1102)</div>
              <div class="card-type">储蓄卡</div>
            </div>
            <div class="card-arrow">&#8250;</div>
          </div>
          <div class="card-actions">
            <div class="action">查账单</div>
            <div class="action">查卡号</div>
            <div class="action">转入</div>
          </div>
        </div>
        
        <!-- 建设银行卡 -->
        <div class="bank-card blue-card">
          <div class="card-header">
            <div class="bank-logo ccb-logo">建</div>
            <div class="bank-info">
              <div class="bank-name">建设银行(1103)</div>
              <div class="card-type">储蓄卡</div>
            </div>
            <div class="card-arrow">&#8250;</div>
          </div>
          <div class="card-actions">
            <div class="action">查账单</div>
            <div class="action">查卡号</div>
            <div class="action">转入</div>
          </div>
        </div>
      </div>
      
      <!-- 添加银行卡按钮 -->
      <div class="add-card-button" @click="goToAddBankCard">
        <div class="add-icon">+</div>
        <div class="add-text">添加银行卡</div>
        <div class="share-button">分享给亲友</div>
      </div>
      
      <!-- 快速添加区域 -->
      <div class="quick-add-section">
        <div class="section-title">快速添加</div>
        <div class="quick-add-options">
          <div class="quick-option">
            <div class="option-icon">&#9998;</div>
            <div class="option-text">输入卡号添加</div>
          </div>
          <div class="quick-option" @click="scanBankCard">
            <div class="option-icon">&#128247;</div>
            <div class="option-text">扫描添加</div>
          </div>
          <div class="quick-option" @click="readNfcCard">
            <div class="option-icon">&#128246;</div>
            <div class="option-text">NFC读卡</div>
          </div>
        </div>
        <div class="free-input-option">免输卡号添加</div>
        
        <!-- 推荐银行 -->
        <div class="recommended-banks">
          <div class="bank-item">
            <div class="bank-icon abc">农</div>
            <div class="bank-name">农业银行</div>
            <div class="bank-promo">信用卡5元红包</div>
          </div>
          <div class="bank-item">
            <div class="bank-icon icbc">工</div>
            <div class="bank-name">工商银行</div>
          </div>
          <div class="bank-item">
            <div class="bank-icon ccb">建</div>
            <div class="bank-name">建设银行</div>
            <div class="bank-promo">信用卡8元红包</div>
          </div>
        </div>
      </div>
      
      <!-- 常用工具 -->
      <div class="common-tools">
        <div class="section-title">常用工具</div>
        <div class="tools-grid">
          <div class="tool-item">
            <div class="tool-icon new-tag">&#128196;</div>
            <div class="tool-name">银行卡账单</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#128176;</div>
            <div class="tool-name">添加卡</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#128178;</div>
            <div class="tool-name">额度查询</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#10067;</div>
            <div class="tool-name">常见问题</div>
          </div>
          <div class="tool-item">
            <div class="tool-icon">&#128218;</div>
            <div class="tool-name">用卡小课堂</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { NFC } from '@exxili/capacitor-nfc';
import { Capacitor } from '@capacitor/core';
import Toast from '../utils/Toast';

const router = useRouter();

// 隐藏底部导航栏
onMounted(async () => {
  const footer = document.querySelector('.footer-fixed');
  if (footer) {
    footer.style.display = 'none';
  }
  
  
});



const goToAddBankCard = () => {
  router.push('/addbankcard');
};

const goBack = () => {
  router.back();
};

// 检查相机权限
const checkCameraPermission = async () => {
  try {
    // 检查相机权限
    const permissionStatus = await Camera.checkPermissions();
    
    if (permissionStatus.camera !== 'granted') {
      // 请求相机权限
      const requestResult = await Camera.requestPermissions();
      
      if (requestResult.camera !== 'granted') {
        // 用户拒绝了权限
        await Toast.show({
          text: '需要相机权限才能扫描银行卡',
          duration: 'long',
          position: 'center'
        });
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('检查相机权限失败:', error);
    await Toast.show({
      text: '无法检查相机权限',
      duration: 'short',
      position: 'bottom'
    });
    return false;
  }
};



// 扫描银行卡并跳转到添加银行卡页面
const scanBankCard = async () => {
  try {
    // 先检查相机权限
    const hasPermission = await checkCameraPermission();
    if (!hasPermission) {
      return;
    }
    
    // 打开相机
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      promptLabelHeader: '扫描银行卡',
      promptLabelCancel: '取消',
      promptLabelPhoto: '扫描'
    });
    
    // 模拟银行卡识别过程
    simulateCardScan(image.webPath);
    
  } catch (error) {
    console.error('相机操作失败:', error);
    if (error.message !== 'User cancelled photos app') {
      await Toast.show({
        text: '无法访问相机或操作被取消',
        duration: 'short',
        position: 'bottom'
      });
    }
  }
};

// 模拟银行卡扫描过程
const simulateCardScan = (imagePath) => {
  console.log('正在处理图片:', imagePath);
  
  // 显示加载状态
  const loadingMessage = '正在扫描银行卡...';
  Toast.show({
    text: loadingMessage,
    duration: 'short',
    position: 'center'
  });
  
  // 模拟处理延迟
  setTimeout(() => {
    // 生成一个随机的16位银行卡号
    const randomCardNumber = Array(16).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
    
    // 跳转到添加银行卡页面并传递卡号参数
    router.push({
      path: '/addbankcard',
      query: { cardNumber: randomCardNumber }
    });
  }, 1000);
};

// 使用NFC读取银行卡信息
const readNfcCard = async () => {
  try {
    // 显示加载状态
    await Toast.show({
      text: '请将银行卡靠近手机背面NFC区域',
      duration: 'long',
      position: 'center'
    });
    
    // 检查NFC是否可用
    const nfcStatus = await NFC.isEnabled();
    if (!nfcStatus.value) {
      await Toast.show({
        text: '请先开启NFC功能',
        duration: 'long',
        position: 'center'
      });
      return;
    }
    
    // 检查NFC权限 - NFC权限已在AndroidManifest.xml中声明
    // 在Android上，我们需要检查NFC是否开启
    if (Capacitor.getPlatform() === 'android') {
      try {
        // 检查NFC是否开启
        const nfcEnabled = await NFC.isEnabled();
        if (!nfcEnabled.value) {
          await Toast.show({
            text: '请在系统设置中开启NFC功能',
            duration: 'long',
            position: 'center'
          });
          return;
        }
      } catch (error) {
        console.error('检查NFC状态失败:', error);
        await Toast.show({
          text: '无法检查NFC状态，请确保NFC已开启',
          duration: 'long',
          position: 'center'
        });
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
      let cardNumber = '';
      
      // 尝试从NFC数据中提取银行卡号
      if (data && data.messages && data.messages.length > 0) {
        for (const message of data.messages) {
          if (message.records && message.records.length > 0) {
            for (const record of message.records) {
              // 银行卡号通常存储在特定类型的记录中
              // 这里简化处理，实际应用中需要根据具体的银行卡NFC数据格式进行解析
              if (record.payload) {
                const payload = record.payload;
                // 尝试提取数字序列作为卡号
                const matches = payload.match(/\d{16,19}/);
                if (matches && matches.length > 0) {
                  cardNumber = matches[0];
                  break;
                }
              }
            }
          }
        }
      }
      
      // 如果无法从NFC中提取卡号，生成一个模拟卡号
      if (!cardNumber) {
        cardNumber = Array(16).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
        console.log('无法从NFC中读取卡号，使用模拟卡号:', cardNumber);
      }
      
      // 停止NFC扫描
      NFC.stopScan().catch(err => console.error('停止NFC扫描失败:', err));
      
      // 移除监听器
      nfcTagListener.remove();
      
      // 跳转到添加银行卡页面并传递卡号参数
      router.push({
        path: '/addbankcard',
        query: { cardNumber: cardNumber }
      });
    });
    
    // 监听NFC错误
    const nfcErrorListener = NFC.addListener('nfcError', (error) => {
      console.error('NFC错误:', error);
      Toast.show({
        text: '读取NFC失败: ' + (error.message || '未知错误'),
        duration: 'long',
        position: 'center'
      });
      // 停止NFC扫描
      NFC.stopScan().catch(err => console.error('停止NFC扫描失败:', err));
      nfcErrorListener.remove();
    });
    
  } catch (error) {
    console.error('NFC操作失败:', error);
    await Toast.show({
      text: '无法启动NFC或设备不支持NFC功能',
      duration: 'long',
      position: 'center'
    });
    // 确保出错时也停止NFC扫描
    NFC.stopScan().catch(err => console.error('停止NFC扫描失败:', err));
  }
};
</script>

<style scoped>
.bank-card-page {
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, white, transparent);
  min-height: 100vh;
}

/* 隐藏底部导航栏 */
:deep(.tab-bar) {
  display: none !important;
}

/* 顶部导航栏 */
.header {
  background-color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #eee;
}

.back-button {
  font-size: 16px;
  font-weight: 500;
}

/* 我的卡片区域 */
.my-cards-section {
  padding: 15px;
}

.section-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}

.my-cards-title {
  font-size: 16px;
  font-weight: 500;
}

.security-tag {
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
  margin-left: 10px;
}

.all-cards {
  position: absolute;
  right: 0;
  font-size: 14px;
  color: #666;
}

/* 银行卡样式 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.bank-card {
  border-radius: 10px;
  padding: 15px;
  color: white;
}

.orange-card {
  background-color: #ff8c00;
}

.blue-card {
  background-color: #1e90ff;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.bank-logo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 10px;
}

.ccb-logo {
  color: #1e90ff;
}

.bank-info {
  flex: 1;
}

.bank-name {
  font-size: 16px;
  font-weight: 500;
}

.card-type {
  font-size: 12px;
  opacity: 0.8;
}

.card-arrow {
  font-size: 20px;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  padding-top: 15px;
}

.action {
  text-align: center;
  flex: 1;
}

/* 添加银行卡按钮 */
.add-card-button {
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  position: relative;
}

.add-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 20px;
  color: #1677ff;
}

.add-text {
  font-size: 16px;
}

.share-button {
  position: absolute;
  right: 15px;
  background-color: #f0f0f0;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 14px;
  color: #666;
}

/* 快速添加区域 */
.quick-add-section {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 15px;
}

.quick-add-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.quick-option {
  display: flex;
  align-items: center;
  flex: 1;
}

.option-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.free-input-option {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

/* 推荐银行 */
.recommended-banks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.bank-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
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
  margin-right: 10px;
  color: white;
  font-weight: bold;
}

.abc {
  background-color: #4CAF50;
}

.icbc {
  background-color: #F44336;
}

.ccb {
  background-color: #1e90ff;
}

.bank-promo {
  position: absolute;
  right: 0;
  color: #ff6b6b;
  font-size: 12px;
}

/* 常用工具 */
.common-tools {
  background-color: white;
  border-radius: 10px;
  padding: 15px;
}

.tools-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.tool-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(20% - 16px);
}

.tool-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  position: relative;
}

.new-tag::after {
  content: '已更新';
  position: absolute;
  top: -5px;
  right: -15px;
  background-color: #ff6b6b;
  color: white;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 4px;
}

.tool-name {
  font-size: 12px;
  text-align: center;
}
</style>