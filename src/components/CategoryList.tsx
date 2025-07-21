import { css } from '@emotion/react';
import { toast } from 'react-toastify';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categoryApi';
import type { CategoryItem } from '../types/category';

const sectionStyle = css({
  background: colors.backgroundDefault,
  borderRadius: 16,
  padding: parseInt(spacing.spacing6),
  marginBottom: parseInt(spacing.spacing5),
});

const listStyle = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: parseInt(spacing.spacing8),
});

const itemStyle = css({
  textAlign: 'center',
  width: 80,
});

const imgStyle = css({
  borderRadius: 12,
});

const nameStyle = css({
  marginTop: parseInt(spacing.spacing2),
  ...typography.body2Regular,
  color: colors.textDefault,
});

const spinnerStyle = css({
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: '4px solid #3498db',
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: 'spin 1s linear infinite',
  //가운데에
  display: 'inline-block',
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
});

const CategoryList = () => {
  const [categoryData, setCategoryData] = useState<CategoryItem[]>([]); // 상태로 categoryData 관리
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchCategories();
        setCategoryData(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div css={spinnerStyle}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (error || categoryData.length === 0) {
    return null; // 에러가 발생하거나 데이터가 없으면 아무것도 렌더링하지 않음
  }

  return (
    <section css={sectionStyle}>
      <div css={listStyle}>
        {categoryData.map((item) => (
          <div key={item.themeId} css={itemStyle}>
            <img
              src={item.image}
              alt={item.name}
              width={56}
              height={56}
              css={imgStyle}
            />
            <div css={nameStyle}>{item.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
