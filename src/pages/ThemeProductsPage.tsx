import { css } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import GlobalStyle from '@/styles/GlobalStyle';
import Header from '@/components/Header';
import { fetchThemeInfo, fetchThemeProducts } from '@/api/categoryApi';
import ThemeProductGrid from '@/components/ThemeProductGrid';
import type { ThemeInfo } from '@/types/category';
import { type Product } from '@/types/product';
import { spinnerStyle } from '@/styles/common';

const heroStyle = (backgroundColor: string) => css({
  background: backgroundColor,
  padding: `${spacing.spacing8} ${spacing.spacing4}`,
  minHeight: '80px',
  display: 'flex',
  flexDirection: 'column',
});

const heroTitleStyle = css({
  ...typography.title1Bold,
  color: 'white',
  marginBottom: spacing.spacing1,
});

const heroDescriptionStyle = css({
  ...typography.body1Regular,
  color: colors.textSub,
  maxWidth: '600px',
});

const loadingStyle = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '200px',
  color: colors.textSub,
  flexDirection: 'column',
  gap: spacing.spacing2,
});

const ThemeProductsPage = () => {
  const { themeId } = useParams<{ themeId: string }>();
  const navigate = useNavigate();
  const [themeInfo, setThemeInfo] = useState<ThemeInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 상품 목록 상태
  const [products, setProducts] = useState<Product[]>([]);
  const [productLoading, setProductLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // 테마 정보 로딩
  useEffect(() => {
    const loadThemeInfo = async () => {
      if (!themeId) {
        navigate('/', { replace: true });
        return;
      }
      try {
        setLoading(true);
        const data = await fetchThemeInfo(Number(themeId));
        setThemeInfo(data);
      } catch (err: any) {
        console.error('테마 정보 로드 실패:', err);
        if (err.message === 'THEME_NOT_FOUND') {
          navigate('/', { replace: true });
          return;
        }
        setError('테마 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadThemeInfo();
  }, [themeId, navigate]);

  // 상품 목록 로딩
  useEffect(() => {
    if (!themeId) return;
    const loadProducts = async () => {
      setProductLoading(true);
      try {
        const result = await fetchThemeProducts(Number(themeId), 0, 10);
        setProducts(result.list);
        setCursor(result.cursor);
        setHasMore(result.hasMoreList);
      } catch (err) {
        setProducts([]);
        setHasMore(false);
      } finally {
        setProductLoading(false);
      }
    };
    loadProducts();
  }, [themeId]);

  // 더보기 핸들러
  const handleLoadMore = async () => {
    if (!themeId || !hasMore) return;
    setProductLoading(true);
    try {
      const result = await fetchThemeProducts(Number(themeId), cursor, 10);
      setProducts(prev => {
        const ids = new Set(prev.map(p => p.id));
        const newList = result.list.filter(p => !ids.has(p.id));
        return [...prev, ...newList];
      });
      setCursor(result.cursor);
      setHasMore(result.hasMoreList);
    } catch (err) {
      setHasMore(false);
    } finally {
      setProductLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <div css={loadingStyle}>
          <div css={spinnerStyle}></div>
          <div>테마 정보를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  if (error || !themeInfo) {
    return (
      <div>
        <GlobalStyle />
        <Header />
        <div css={loadingStyle}>
          <div>테마를 찾을 수 없습니다.</div>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              background: colors.kakaoYellow,
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '16px'
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GlobalStyle />
      <Header />
      {/* 히어로 영역 */}
      <section css={heroStyle(themeInfo.backgroundColor)}>
        <h2 css={heroTitleStyle}>{themeInfo.name}</h2>
        <h1 css={heroTitleStyle}>{themeInfo.title}</h1>
        <p css={heroDescriptionStyle}>{themeInfo.description}</p>
      </section>
      {/* 상품 목록 영역 */}
      <ThemeProductGrid
        products={products}
        loading={productLoading && products.length === 0}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default ThemeProductsPage;