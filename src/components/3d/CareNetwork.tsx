import { useEffect, useRef } from 'react';

interface CareNetworkProps {
  className?: string;
  size?: number;
}

interface Node {
  x: number; y: number; label: string; icon: string; radius: number; color: string;
}

export function CareNetwork({ className = '', size = 400 }: CareNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const nodes: Node[] = [
      { x: cx, y: cy, label: 'Patient', icon: '🏥', radius: 28, color: '#1F6849' },
      { x: cx - 120, y: cy - 80, label: 'PHC', icon: '🏛', radius: 20, color: '#2DA84D' },
      { x: cx + 120, y: cy - 80, label: 'Doctor', icon: '👨‍⚕', radius: 20, color: '#35C45A' },
      { x: cx - 140, y: cy + 40, label: 'Diagnostics', icon: '🔬', radius: 18, color: '#46A780' },
      { x: cx + 140, y: cy + 40, label: 'Pharmacy', icon: '💊', radius: 18, color: '#61C895' },
      { x: cx, y: cy + 120, label: 'Follow-up', icon: '📋', radius: 18, color: '#87DBAB' },
      { x: cx - 80, y: cy + 100, label: 'Referral', icon: '🔗', radius: 16, color: '#46A780' },
      { x: cx + 80, y: cy + 100, label: 'Specialist', icon: '🏨', radius: 16, color: '#2DA84D' },
    ];

    const edges = [0, 1, 2, 3, 4, 5, 6, 7].map((_, i) => i).filter(i => i > 0).map(i => [0, i] as [number, number]);
    const additionalEdges: [number, number][] = [[1, 2], [3, 6], [4, 7], [5, 6], [5, 7]];

    let time = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);
      time += 0.008;

      // Draw edges
      [...edges, ...additionalEdges].forEach(([a, b]) => {
        const na = nodes[a], nb = nodes[b];
        const gradient = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        gradient.addColorStop(0, 'rgba(31, 104, 73, 0.2)');
        gradient.addColorStop(0.5, 'rgba(45, 168, 77, 0.35)');
        gradient.addColorStop(1, 'rgba(31, 104, 73, 0.2)');

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Animated particle along edge
        const t = (Math.sin(time * 2 + a * 0.5 + b * 0.3) + 1) / 2;
        const px = na.x + (nb.x - na.x) * t;
        const py = na.y + (nb.y - na.y) * t;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(45, 168, 77, 0.6)';
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const bobY = Math.sin(time * 1.5 + i * 0.7) * 3;
        const nx = node.x;
        const ny = node.y + bobY;

        // Glow
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.radius * 2);
        glow.addColorStop(0, `${node.color}22`);
        glow.addColorStop(1, `${node.color}00`);
        ctx.beginPath();
        ctx.arc(nx, ny, node.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(nx, ny, node.radius, 0, Math.PI * 2);
        const circleGrad = ctx.createRadialGradient(nx - 4, ny - 4, 0, nx, ny, node.radius);
        circleGrad.addColorStop(0, '#ffffff');
        circleGrad.addColorStop(1, `${node.color}20`);
        ctx.fillStyle = circleGrad;
        ctx.fill();
        ctx.strokeStyle = `${node.color}60`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = node.color;
        ctx.font = `${i === 0 ? 'bold 11px' : '10px'} Inter, system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny + node.radius + 14);
      });

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: size, height: size }}
    />
  );
}
