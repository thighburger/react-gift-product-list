import { css } from '@emotion/react';
import { useCallback } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { spacing } from '../styles/spacing';
import { typography } from '../styles/typography';
import { useAuth } from '@/contexts/AuthContext';
import { type Product } from '../types/product';
import { spinnerStyle } from '../styles/common';

const sectionStyle = css({ margin: `${spacing.spacing8} 0` });
const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: parseInt(spacing.spacing6),
});
const cardStyle = css({
  background: colors.backgroundDefault,
  borderRadius: 16,
  padding: parseInt(spacing.spacing4),
  boxShadow: '0 2px 8px #0001',
  textAlign: 'center',
  position: 'relative',
  cursor: 'pointer',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 4px 12px #0002',
  }
});

const imgStyle = css({ objectFit: 'cover', borderRadius: 12 });
const nameStyle = css({ marginTop: parseInt(spacing.spacing3), ...typography.body2Bold, color: colors.textDefault });
const priceStyle = css({ marginTop: parseInt(spacing.spacing2), ...typography.body2Regular, color: colors.textDefault });
const brandStyle = css({ marginTop: parseInt(spacing.spacing1), ...typography.label2Regular, color: colors.textSub });

const emptyStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: colors.textSub,
  flexDirection: 'column',
  gap: spacing.spacing2,
});

interface ThemeProductGridProps {
  products: Product[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

const ThemeProductGrid = ({ products, loading = false, hasMore = false, onLoadMore }: ThemeProductGridProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // useInfiniteScroll 훅 사용
  const onLoadMoreCallback = useCallback(() => {
    if (onLoadMore) onLoadMore();
  }, [onLoadMore]);
  const observerRef = useInfiniteScroll<HTMLDivElement>({
    loading,
    hasMore,
    onLoadMore: onLoadMoreCallback,
  });

  // 상품 클릭 핸들러
  const handleProductClick = (productId: number) => {
    if (isAuthenticated) {
      navigate(`/order/${productId}`);
    } else {
      navigate('/login', { state: { from: `/order/${productId}` } });
    }
  };


  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div css={spinnerStyle}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section css={sectionStyle}>
        <div css={emptyStyle}>
          <div>상품을 불러올 수 없습니다.</div>
          <div>잠시 후 다시 시도해주세요.</div>
        </div>
      </section>
    );
  }

  return (
    <section css={sectionStyle}>
      <div css={gridStyle}>
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div
              key={product.id}
              css={cardStyle}
              onClick={() => handleProductClick(product.id)}
              ref={isLast && hasMore ? observerRef : undefined}
            >
              <img
                src={product.imageURL}
                alt={product.name}
                width={160}
                height={120}
                css={imgStyle}
              />
              <div css={nameStyle}>{product.name}</div>
              <div css={priceStyle}>{product.price.sellingPrice.toLocaleString()}원</div>
              <div css={brandStyle}>{product.brandInfo.name}</div>
            </div>
          );
        })}
      </div>
      {/* 더보기 버튼은 무한스크롤로 대체, 필요시 유지 가능 */}
    </section>
  );
};

export default ThemeProductGrid;
