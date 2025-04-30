import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.alipay',
  appName: '支付宝Demo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystorePassword: undefined,
      keystoreAlias: undefined,
      keystoreAliasPassword: undefined,
      signingType: undefined,
    }
  },
  plugins: {
    // 相机插件配置
    Camera: {
      // 请求权限时显示的提示文本
      promptLabelHeader: '允许使用相机',
      promptLabelText: '此应用需要访问您的相机以进行扫码',
      promptLabelCancel: '取消',
      promptLabelOk: '允许'
    },
    // 条形码扫描器配置
    BarcodeScanner: {
      // 扫描器配置
      detectionSpeed: 'normal', // 扫描速度：normal, fast, accurate
      // 支持的格式
      formats: ['QR_CODE', 'EAN_13', 'CODE_128']
    }
  }
};

export default config;