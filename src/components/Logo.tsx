// components/Logo.tsx
// 起業の科学 PORTAL ロゴコンポーネント
// 使い方:
//   <Logo />                          → 横組カラー版（デフォルト）
//   <Logo variant="vertical" />       → 縦組
//   <Logo variant="symbol" size={48}/> → シンボル単体
//   <Logo variant="mono" />           → モノクロ
//   <Logo variant="inverse" />        → ダーク背景用反転

import React from 'react';

type LogoVariant = 'horizontal' | 'vertical' | 'symbol' | 'mono' | 'inverse';

interface LogoProps {
  variant?: LogoVariant;
  size?: number;
  className?: string;
  ariaLabel?: string;
}

const COLORS = {
  primary: '#185FA5',
  text: '#1A1A1A',
  white: '#FFFFFF',
  primaryLight: '#5BA3F5',
} as const;

const FONT_JP =
  '-apple-system, BlinkMacSystemFont, "Hiragino Sans", "Yu Gothic", sans-serif';
const FONT_EN =
  '-apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif';

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size,
  className,
  ariaLabel = '起業の科学 PORTAL',
}) => {
  if (variant === 'symbol') {
    const s = size ?? 48;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width={s}
        height={s}
        role="img"
        aria-label={ariaLabel}
        className={className}
      >
        <line x1="24" y1="10" x2="10" y2="36" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="10" x2="38" y2="36" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" />
        <line x1="10" y1="36" x2="38" y2="36" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" />
        <circle cx="24" cy="10" r="6.5" fill={COLORS.primary} />
        <circle cx="10" cy="36" r="6.5" fill={COLORS.text} />
        <circle cx="38" cy="36" r="6.5" fill={COLORS.text} />
      </svg>
    );
  }

  if (variant === 'vertical') {
    const w = size ?? 120;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 120"
        width={w}
        height={w}
        role="img"
        aria-label={ariaLabel}
        className={className}
      >
        <g transform="translate(38, 8)">
          <line x1="22" y1="8" x2="8" y2="34" stroke={COLORS.text} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="22" y1="8" x2="36" y2="34" stroke={COLORS.text} strokeWidth="1.8" strokeLinecap="round" />
          <line x1="8" y1="34" x2="36" y2="34" stroke={COLORS.text} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="22" cy="8" r="6.5" fill={COLORS.primary} />
          <circle cx="8" cy="34" r="6.5" fill={COLORS.text} />
          <circle cx="36" cy="34" r="6.5" fill={COLORS.text} />
        </g>
        <text x="60" y="76" textAnchor="middle" fontFamily={FONT_JP} fontSize="14" fontWeight="500" fill={COLORS.text} letterSpacing="1.5">
          起業の科学
        </text>
        <text x="60" y="98" textAnchor="middle" fontFamily={FONT_EN} fontSize="13" fontWeight="500" fill={COLORS.primary} letterSpacing="4">
          PORTAL
        </text>
      </svg>
    );
  }

  // horizontal / mono / inverse
  const isInverse = variant === 'inverse';
  const isMono = variant === 'mono';
  const lineColor = isInverse ? COLORS.white : COLORS.text;
  const topNodeColor = isInverse ? COLORS.primaryLight : isMono ? COLORS.text : COLORS.primary;
  const sideNodeColor = isInverse ? COLORS.white : COLORS.text;
  const jpColor = isInverse ? COLORS.white : COLORS.text;
  const enColor = isInverse ? COLORS.primaryLight : isMono ? COLORS.text : COLORS.primary;
  const w = size ?? 240;
  const h = (w / 240) * 56;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 240 56"
      width={w}
      height={h}
      role="img"
      aria-label={ariaLabel}
      className={className}
    >
      <g transform="translate(4, 6)">
        <line x1="22" y1="8" x2="8" y2="34" stroke={lineColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="22" y1="8" x2="36" y2="34" stroke={lineColor} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="8" y1="34" x2="36" y2="34" stroke={lineColor} strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="8" r="5.5" fill={topNodeColor} />
        <circle cx="8" cy="34" r="5.5" fill={sideNodeColor} />
        <circle cx="36" cy="34" r="5.5" fill={sideNodeColor} />
      </g>
      <text x="58" y="24" fontFamily={FONT_JP} fontSize="14.5" fontWeight="500" fill={jpColor} letterSpacing="0.8">
        起業の科学
      </text>
      <text x="58" y="44" fontFamily={FONT_EN} fontSize="13" fontWeight="500" fill={enColor} letterSpacing="3.5">
        PORTAL
      </text>
    </svg>
  );
};

export default Logo;
