export const captureScreenshot = async (element: HTMLElement): Promise<string> => {
  try {
    // 获取窗口元素的位置和大小
    const rect = element.getBoundingClientRect();
    const scale = window.devicePixelRatio;
    
    // 使用原生截图 API
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: {
        displaySurface: "browser",
        width: { ideal: rect.width * scale },
        height: { ideal: rect.height * scale }
      },
      audio: false
    });

    // 创建视频元素来捕获流
    const video = document.createElement('video');
    video.srcObject = stream;
    await video.play();

    // 创建 canvas
    const canvas = document.createElement('canvas');
    canvas.width = rect.width * scale;
    canvas.height = rect.height * scale;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 计算实际的屏幕坐标
      const x = rect.left + window.scrollX;
      const y = rect.top + window.scrollY;

      // 直接绘制指定区域
      ctx.drawImage(
        video, 
        x * scale, 
        y * scale, 
        rect.width * scale, 
        rect.height * scale,
        0,
        0,
        rect.width * scale,
        rect.height * scale
      );
    }

    // 停止流
    stream.getTracks().forEach(track => track.stop());

    // 转换为图片
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Screenshot failed:', error);
    return '';
  }
};

// 下载图片
export const downloadScreenshot = (dataUrl: string, filename: string) => {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}; 