import { css } from '@emotion/react';

// 공통 스피너 스타일
export const spinnerStyle = css({
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  display: 'inline-block',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

// 로딩 컨테이너 스타일
export const loadingContainerStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px',
  padding: '20px',
  textAlign: 'center',
});