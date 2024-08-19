import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'antd';

import styles from './index.module.less'

export default () => {
  // 为 canvasRef 和各个状态变量添加类型
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [time, setTime] = useState<string>('');
  const [second, setSecond] = useState<string>('');
  const [week, setWeek] = useState<string>('');
  const [date, setDate] = useState<string>('');

  // 更新时间
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setSecond(now.getSeconds().toString().padStart(2, '0'));
      setWeek(now.toLocaleDateString('zh-CN', { weekday: 'long' }));
      setDate(now.toLocaleDateString());
      drawClock(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 绘制时钟
  const drawClock = (now: Date) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const radius = canvas.height / 2;
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(radius, radius);
        ctx.rotate(-Math.PI / 2);

        // 绘制表盘
        drawFace(ctx, radius);
        drawNumbers(ctx, radius);
        drawTime(ctx, now, radius);

        ctx.rotate(Math.PI / 2);
        ctx.translate(-radius, -radius);
      }
    }
  };

  // 绘制表盘
  const drawFace = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.9, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    const grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
  };

  // 绘制数字
  const drawNumbers = (ctx: CanvasRenderingContext2D, radius: number) => {
    ctx.font = `${radius * 0.15}px Arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (let num = 1; num <= 12; num++) {
      const ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.8);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.8);
      ctx.rotate(-ang);
    }
  };

  // 绘制指针
  const drawTime = (ctx: CanvasRenderingContext2D, now: Date, radius: number) => {
    const hour = now.getHours() % 12;
    const minute = now.getMinutes();
    const second = now.getSeconds();

    // 时针
    const hourPos = (hour + minute / 60) * Math.PI / 6;
    drawHand(ctx, hourPos, radius * 0.5, radius * 0.07);

    // 分针
    const minutePos = (minute + second / 60) * Math.PI / 30;
    drawHand(ctx, minutePos, radius * 0.8, radius * 0.07);

    // 秒针
    const secondPos = second * Math.PI / 30;
    drawHand(ctx, secondPos, radius * 0.9, radius * 0.02, 'red');
  };

  const drawHand = (
    ctx: CanvasRenderingContext2D,
    pos: number,
    length: number,
    width: number,
    color: string = 'black'
  ) => {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  };

  return <Card style={{
    // borderColor: 'black',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    marginRight: 20,
  }}>
    <div className={styles.timeBox}>
      <div className={styles.clockBox}>
        <canvas ref={canvasRef} height="100" width="100"></canvas>
      </div>
      <div className={styles.timeItem}>
        <div className={styles.time}>{time}</div>
        <div className={styles.second}>{second}</div>
      </div>
      <div className={styles.dateItem}>
        <div className={styles.week}>{week}</div>
        <div className={styles.date}>{date}</div>
      </div>
    </div>
  </Card>
}
