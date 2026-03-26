// Matrix Rain Effect
(function () {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;

  const fontSize = 14;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/\\|{}[]#$%&@!?';
  let cols = Math.floor(W / fontSize);
  let drops = Array(cols).fill(1);

  function draw() {
    ctx.fillStyle = 'rgba(13,13,13,0.05)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      // Brighter head character
      if (drops[i] * fontSize < H * 0.1) {
        ctx.fillStyle = '#ffffff';
      } else {
        ctx.fillStyle = '#00ff41';
      }

      ctx.fillText(char, x, y);

      if (y > H && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  let interval = setInterval(draw, 45);

  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / fontSize);
    drops = Array(cols).fill(1);
  });

  // Pause matrix when tab is hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearInterval(interval);
    } else {
      interval = setInterval(draw, 45);
    }
  });
})();
