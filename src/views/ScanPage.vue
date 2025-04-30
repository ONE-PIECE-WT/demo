<template>
  <div class="scan-page">
    <div class="header">
      <button class="back-button" @click="goBack">返回</button>
      <h1>扫一扫</h1>
    </div>
    
    <div class="camera-container">
      <div v-if="!isScanning" class="start-scan-container">
        <button class="start-scan-button" @click="startScan">开始扫描</button>
      </div>
      <div v-else class="scanning-container">
        <div class="scan-frame"></div>
        <p class="scan-tip">将二维码/条形码放入框内</p>
      </div>
    </div>
    
    <div v-if="scanResult" class="result-container">
      <h2>扫描结果:</h2>
      <p>{{ scanResult }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';

const router = useRouter();
const isScanning = ref(false);
const scanResult = ref('');

// 返回上一页
const goBack = async () => {
  try {
    // 如果正在扫描，先停止扫描
    if (isScanning.value) {
      // 移除扫描器激活的类
      document.querySelector('body')?.classList.remove('scanner-active');
      await BarcodeScanner.stopScan();
      isScanning.value = false;
    }
  } catch (error) {
    console.error('停止扫描出错，但继续返回:', error);
    // 即使出错也继续返回，不显示错误提示
  } finally {
    // 确保返回上一页
    router.back();
  }
};

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
                startScan();
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

// 开始扫描
const startScan = async () => {
  try {
    // 检查权限
    const hasPermission = await checkCameraPermission();
    
    if (hasPermission) {
      // 检查Google Barcode Scanner模块
      const moduleAvailable = await checkGoogleBarcodeScannerModule();
      if (!moduleAvailable) {
        return; // 如果模块不可用且正在安装，则退出
      }
      
      isScanning.value = true;
      
      // 添加扫描器激活的类
      document.querySelector('body')?.classList.add('scanner-active');
      
      // 确保UI更新后再开始扫描
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // 开始扫描
      const result = await BarcodeScanner.scan();
      
      // 处理扫描结果
      if (result && result.barcodes && result.barcodes.length > 0) {
        scanResult.value = result.barcodes[0].rawValue;
        console.log('扫描结果:', scanResult.value);
      }
    }
  } catch (error) {
    console.error('扫描出错:', error);
    alert('扫描出错: ' + error.message);
  } finally {
    // 移除扫描器激活的类
    document.querySelector('body')?.classList.remove('scanner-active');
    isScanning.value = false;
  }
};

// 页面加载时自动启动扫描
onMounted(() => {
  // 检查是否支持扫描功能
  BarcodeScanner.isSupported().then((result) => {
    if (result.supported) {
      // 延迟一小段时间再启动扫描，确保页面已完全加载
      setTimeout(() => {
        startScan();
      }, 500);
    } else {
      console.warn('当前设备不支持条码扫描功能');
      alert('当前设备不支持条码扫描功能');
    }
  });
});

// 页面卸载时清理资源
onUnmounted(async () => {
  // 停止扫描
  if (isScanning.value) {
    try {
      // 移除扫描器激活的类
      document.querySelector('body')?.classList.remove('scanner-active');
      await BarcodeScanner.stopScan();
    } catch (error) {
      console.error('停止扫描出错:', error);
    }
    isScanning.value = false;
  }
});


</script>

<style scoped>
.scan-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #000;
  color: white;
}

.header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #1677ff;
}

.back-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-right: 16px;
}

.camera-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

.start-scan-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.start-scan-button {
  background-color: #1677ff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

.scanning-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.scan-frame {
  width: 250px;
  height: 250px;
  border: 2px solid #1677ff;
  border-radius: 16px;
  position: relative;
}

.scan-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #1677ff;
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% { top: 0; }
  100% { top: 100%; }
}

.scan-tip {
  margin-top: 16px;
  color: #ccc;
}

.result-container {
  padding: 16px;
  background-color: #222;
  border-radius: 8px;
  margin: 16px;
}

/* 全屏扫描时的样式 */
:global(body.scanner-active) {
  background: transparent;
  visibility: hidden;
}

:global(body.scanner-active .scan-page) {
  visibility: visible;
}
</style>