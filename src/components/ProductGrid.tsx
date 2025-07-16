import { css } from '@emotion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { colors } from '../styles/colors'
import { spacing } from '../styles/spacing'
import { typography } from '../styles/typography'
import { useAuth } from '@/contexts/AuthContext'
import { type Product } from '../services/productService'

const sectionStyle = css({ margin: `${spacing.spacing8} 0` })
const gridStyle = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: parseInt(spacing.spacing6),
})
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
})
const rankStyle = (rank: number) => css({
  position: 'absolute',
  left: parseInt(spacing.spacing3),
  top: parseInt(spacing.spacing3),
  background: rank <= 3 ? colors.red700 : colors.gray300,
  color: colors.gray00,
  borderRadius: '50%',
  width: 24,
  height: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...typography.body2Bold,
})
const imgStyle = css({ objectFit: 'cover', borderRadius: 12 })
const nameStyle = css({ marginTop: parseInt(spacing.spacing3), ...typography.body2Bold, color: colors.textDefault })
const priceStyle = css({ marginTop: parseInt(spacing.spacing2), ...typography.body2Regular, color: colors.textDefault })
const brandStyle = css({ marginTop: parseInt(spacing.spacing1), ...typography.label2Regular, color: colors.textSub })
const buttonWrapStyle = css({ textAlign: 'center', marginTop: spacing.spacing6 })
const moreBtnStyle = css({
  margin: '0 auto',
  padding: `${spacing.spacing2} ${spacing.spacing6}`,
  borderRadius: 8,
  border: 'none',
  background: colors.gray200,
  color: colors.gray900,
  cursor: 'pointer',
  ...typography.body2Bold,
})

const emptyStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: colors.textSub,
  flexDirection: 'column',
  gap: spacing.spacing2,
})

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

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const INITIAL_DISPLAY_COUNT = 6;

const ProductGrid = ({ products, loading = false }: ProductGridProps) => {
  const [showAll, setShowAll] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  // 상품 클릭 핸들러
  const handleProductClick = (productId: number) => {
    if (isAuthenticated) {
      navigate(`/order/${productId}`);
    } else {
      navigate('/login', { state: { from: `/order/${productId}` } });
    }
  };

  // 로딩 중일 때
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div css={spinnerStyle}></div>
        <p>로딩 중...</p>
      </div>
    );
  }

  // 데이터가 없을 때
  if (!products || products.length === 0) {
    return (
      <section css={sectionStyle}>
        <div css={emptyStyle}>
          <div>랭킹 데이터를 불러올 수 없습니다.</div>
          <div>잠시 후 다시 시도해주세요.</div>
        </div>
      </section>
    )
  }

  const displayProducts = showAll ? products : products.slice(0, INITIAL_DISPLAY_COUNT)

  return (
    <section css={sectionStyle}>
      <div css={gridStyle}>
        {displayProducts.map((product, index) => (
          <div
            key={product.id}
            css={cardStyle}
            onClick={() => handleProductClick(product.id)}
          >
            <span css={rankStyle(index + 1)}>{index + 1}</span>
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
        ))}
      </div>
      {products.length > INITIAL_DISPLAY_COUNT && (
        <div css={buttonWrapStyle}>
          <button
            onClick={() => setShowAll(v => !v)}
            css={moreBtnStyle}
          >
            {showAll ? '접기' : '더보기'}
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductGrid
