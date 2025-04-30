<template>
  <div class="quick-actions">
    <div class="action-item" @click="goToScan">
      <i class="icon icon-scan">📷</i>
      <span>扫一扫</span>
    </div>
    <div class="action-item">
      <i class="icon icon-payment">💰</i>
      <span>收付款</span>
    </div>
    <div class="action-item">
      <i class="icon icon-travel">✈️</i>
      <span>出行</span>
    </div>
    <div class="action-item">
      <i class="icon icon-card">💳</i>
      <span>卡包</span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';
import { ref } from 'vue';

const router = useRouter();
const scanResult = ref('');

// 检查相机权限
const checkCameraPermission = async () => {
  try {
    // 检查当前权限状态
    const { camera } = await BarcodeScanner.checkPermissions();
    
    if (camera === 'granted') {
      return true;
    } else if (camera === 'prompt') {
      // 如果权限状态是prompt，请求权限
      const { camera: newStatus } = await BarcodeScanner.requestPermissions();
      return newStatus === 'granted';
    } else if (camera === 'denied' || camera === 'denied-always') {
      // 如果权限被拒绝，尝试再次请求
      const { camera: newStatus } = await BarcodeScanner.requestPermissions();
      if (newStatus !== 'granted') {
        alert('需要相机权限才能扫描，请在设置中开启权限');
        return false;
      }
      return true;
    }
    return false;
  } catch (error) {
    console.error('检查权限出错:', error);
    alert('检查相机权限出错: ' + error.message);
    return false;
  }
};

// 检查Google Barcode Scanner模块是否可用
const checkGoogleBarcodeScannerModule = async () => {
  try {
    // 仅在Android平台上检查
    if (Capacitor.getPlatform() === 'android') {
      try {
        // 检查Google Barcode Scanner模块是否可用
        const { available } = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();
        
        if (!available) {
          // 如果模块不可用，显示提示并尝试安装
          console.log('Google Barcode Scanner模块不可用，正在尝试安装...');
          alert('需要安装扫码组件才能使用扫码功能，正在为您安装...');
          
          // 添加安装进度监听器
          const progressListener = await BarcodeScanner.addListener(
            'googleBarcodeScannerModuleInstallProgress',
            (event) => {
              console.log(`安装进度: ${event.state}`);
              if (event.state === 'COMPLETED') {
                alert('扫码组件安装完成，现在可以使用扫码功能了');
                progressListener.remove();
                // 安装完成后重新尝试扫描
                goToScan();
              } else if (event.state === 'FAILED') {
                alert('扫码组件安装失败，请稍后再试');
                progressListener.remove();
              }
            }
          );
          
          // 开始安装模块
          await BarcodeScanner.installGoogleBarcodeScannerModule();
          return false;
        }
      } catch (e) {
        console.log('检查Google Barcode Scanner模块不支持或出错:', e);
        // 如果不支持这些方法，继续尝试扫描
      }
    }
    return true;
  } catch (error) {
    console.error('检查Google Barcode Scanner模块出错:', error);
    return true; // 如果检查出错，仍然尝试扫描
  }
};

// 直接调用扫码功能
const goToScan = async () => {
  try {
    // 检查设备是否支持扫描
    const { supported } = await BarcodeScanner.isSupported();
    if (!supported) {
      alert('当前设备不支持条码扫描功能');
      return;
    }
    
    // 检查权限
    const hasPermission = await checkCameraPermission();
    
    if (hasPermission) {
      // 检查Google Barcode Scanner模块
      const moduleAvailable = await checkGoogleBarcodeScannerModule();
      if (!moduleAvailable) {
        return; // 如果模块不可用且正在安装，则退出
      }
      
      // 添加扫描器激活的类
      document.querySelector('body')?.classList.add('scanner-active');
      
      // 确保UI更新后再开始扫描
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 直接调用扫描API
      const result = await BarcodeScanner.scan();
      
      // 处理扫描结果
      if (result && result.barcodes && result.barcodes.length > 0) {
        scanResult.value = result.barcodes[0].rawValue;
        alert('扫描结果: ' + result.barcodes[0].rawValue);
        console.log('扫描结果:', result.barcodes[0].rawValue);
      }
    }
  } catch (error) {
    console.error('扫描出错:', error);
    // 检查错误是否是由用户取消操作引起的
    if (error.message && (error.message.includes('cancelled') || error.message.includes('cancel') || error.message.includes('返回'))) {
      // 用户取消操作，不显示错误提示
      console.log('用户取消了扫描操作');
    } else {
      // 其他错误才显示提示
      alert('扫描出错: ' + error.message);
    }
  } finally {
    // 移除扫描器激活的类
    document.querySelector('body')?.classList.remove('scanner-active');
  }
};

</script>

<style scoped>
.quick-actions {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1677ff; /* Blue background like the header */
  color: white;
  padding: 15px 0;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* 防止水平滚动 */
}

.action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
}

.icon {
  font-size: 24px; /* Larger icons */
  margin-bottom: 5px;
}
</style>