// 简单的Toast实现，替代@capacitor/toast

const Toast = {
  /**
   * 显示一个Toast消息
   * @param {Object} options - Toast配置选项
   * @param {string} options.text - 要显示的文本
   * @param {string} options.duration - 持续时间 ('short' | 'long')
   * @param {string} options.position - 位置 ('top' | 'center' | 'bottom')
   * @returns {Promise<void>}
   */
  show: async (options) => {
    const { text, duration = 'short', position = 'bottom' } = options;
    
    // 创建Toast元素
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = text;
    
    // 设置位置样式
    toast.style.position = 'fixed';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '4px';
    toast.style.zIndex = '10000';
    toast.style.maxWidth = '80%';
    toast.style.textAlign = 'center';
    
    // 根据position设置位置
    if (position === 'top') {
      toast.style.top = '10%';
    } else if (position === 'center') {
      toast.style.top = '50%';
      toast.style.transform = 'translate(-50%, -50%)';
    } else { // bottom
      toast.style.bottom = '10%';
    }
    
    // 添加到DOM
    document.body.appendChild(toast);
    
    // 设置持续时间
    const durationMs = duration === 'long' ? 3500 : 2000;
    
    // 返回Promise
    return new Promise((resolve) => {
      setTimeout(() => {
        // 淡出效果
        toast.style.transition = 'opacity 0.5s';
        toast.style.opacity = '0';
        
        // 移除元素
        setTimeout(() => {
          document.body.removeChild(toast);
          resolve();
        }, 500);
      }, durationMs);
    });
  }
};

export default Toast;