export const captureScreenshot = async (): Promise<void> => {
  try {
    // 检查是否支持 navigator.clipboard.write
    if (!navigator.clipboard?.write) {
      alert('您的浏览器不支持截图功能，请使用系统自带的截图工具');
      return;
    }

    // 触发系统截图
    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "window"
      }
    });

    // 停止视频流
    mediaStream.getTracks().forEach(track => track.stop());

    // 提示用户使用系统截图工具
    alert('请使用系统截图工具(如 Win+Shift+S 或 Command+Shift+4)来捕获窗口');

  } catch (error) {
    console.error('Screenshot failed:', error);
    alert('截图失败，请使用系统自带的截图工具');
  }
};

// 移除下载功能，因为使用系统截图工具会自动处理保存 