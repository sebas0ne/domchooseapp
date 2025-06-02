// src/utils/CanvasGenerator.js
export async function generateAndShareCanvas(option, attempt = 1) {
    const size = 500;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
  
    // Fondo
    ctx.fillStyle = '#DDD0C8';
    ctx.fillRect(0, 0, size, size);
  
    // Título
    ctx.fillStyle = '#323232';
    ctx.font = '28px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('YOUR OPTION IS', size / 2, 30);
  
    // Círculo
    const circleX = size / 2;
    const circleY = size / 2 + 20;
    const radius = 130;
  
    ctx.fillStyle = '#323232';
    ctx.beginPath();
    ctx.arc(circleX, circleY, radius, 0, 2 * Math.PI);
    ctx.fill();
  
    // Texto en el círculo
    ctx.fillStyle = '#DDD0C8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '20px Arial';
  
    const maxTextWidth = radius * 1.6;
    const lineHeight = 26;
  
    const wrapText = (ctx, text, x, y, maxWidth, lineHeight) => {
      const words = text.split(' ');
      let line = '';
      const lines = [];
  
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
  
        if (testWidth > maxWidth && n > 0) {
          lines.push(line.trim());
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line.trim());
  
      const totalHeight = lines.length * lineHeight;
      let startY = y - totalHeight / 2 + lineHeight / 2;
  
      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, startY + i * lineHeight);
      }
    };
  
    wrapText(ctx, option, circleX, circleY - 20, maxTextWidth, lineHeight);
  
    // Intento
    ctx.font = '18px Arial';
    ctx.fillText(`FIRST ATTEMPT: ${attempt}`, circleX, circleY + 65);
  
    // Convertir a Blob
    return new Promise((resolve) => {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
  
        const file = new File([blob], 'option.png', { type: 'image/png' });
  
        // Intentar compartir
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: 'My Random Option',
              text: 'Check out the option I got!',
              files: [file],
            });
          } catch (error) {
            console.error('Error al compartir:', error);
          }
        } else {
          // Fallback: descarga
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'option.png';
          link.click();
          URL.revokeObjectURL(url);
        }
  
        resolve();
      }, 'image/png');
    });
  }
