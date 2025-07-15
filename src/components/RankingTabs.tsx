import { css } from '@emotion/react'
import { colors } from '../styles/colors'
import { spacing } from '../styles/spacing'
import { typography } from '../styles/typography'
import { useState, useEffect } from 'react';
import { fetchProductRanking } from '../services/productService';

function usePersistentState(key: string, defaultValue: string) {
  const [state, setState] = useState(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState] as const;
}

const peopleTab = [
  { label: '전체', value: 'ALL' ,icon: 'ALL' },
  { label: '여성', value: 'FEMALE', icon: '👩' },
  { label: '남성', value: 'MALE', icon: '👨' },
  { label: '청소년', value: 'TEEN' , icon: '🧑' },
]

const wantedTab = [
    {label: '많이 찜한', value: 'MANY_WISH'},
    {label: '많이 받은', value: 'MANY_RECEIVE'},
    {label: '많이 찜하고 받은', value: 'MANY_WISH_RECEIVE'},
]
const containerStyle = css({
  display: 'flex',
  gap: 0,
  justifyContent: 'space-between',
  width: '100%',
  padding: `0 ${spacing.spacing4}`,
})

const tabButtonStyle = (selected: boolean) => css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 60,
  height: 60,
  borderRadius: 20,
  border: 'none',
  background: selected ? colors.blue100 : colors.gray100,
  boxShadow: selected ? '0 2px 8px #217cf933' : 'none',
  color: selected ? colors.blue700 : colors.textSub,
  cursor: 'pointer',
  transition: 'all 0.2s',
  ...typography.body2Regular,
  fontWeight: selected ? 700 : 400,
  padding: 0,
  margin: '0 8px',
})

const iconStyle = css({ fontSize: 15 })
const labelStyle = css({ marginTop: spacing.spacing2 })
const wantedTabStyle = css({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  borderRadius: 20,
  padding: `${spacing.spacing2} ${spacing.spacing4}`,
  boxShadow: '0 2px 8px rgba(33, 124, 249, 0.2)',
  color: colors.blue700,
  marginTop: spacing.spacing4,
  ...typography.body2Regular,
});

interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

interface RankingTabsProps {
  onDataChange: (products: Product[]) => void;
}

const RankingTabs = ({ onDataChange }: RankingTabsProps) => {
  const [selected, setSelected] = usePersistentState('rankingTab', 'FEMALE');
  const [selectedWantedTab, setSelectedWantedTab] = usePersistentState('wantedTab', 'MANY_WISH');

  // API 호출 함수
  const fetchRankingData = async (targetType: string, rankType: string) => {
    try {
      const products = await fetchProductRanking(targetType, rankType);
      onDataChange(products);
    } catch (error) {
      console.error('랭킹 데이터를 불러오는데 실패했습니다:', error);
      onDataChange([]); // 에러 시 빈 배열 전달
    }
  };

  // 탭 변경 시 API 호출
  useEffect(() => {
    fetchRankingData(selected, selectedWantedTab);
  }, [selected, selectedWantedTab]);

  const handleTargetTabChange = (value: string) => {
    setSelected(value);
  };

  const handleRankTabChange = (value: string) => {
    setSelectedWantedTab(value);
  };

  return (
    <>
      <h3 style={{
        ...typography.body1Bold,
        color: colors.gray900, 
        margin: 0,
        marginBottom: spacing.spacing4,
      }}>실시간 급상승 선물랭킹</h3>
      <div css={containerStyle}>
        {peopleTab.map(tab => (
          <button
            key={tab.value}
            onClick={() => handleTargetTabChange(tab.value)}
            css={tabButtonStyle(selected === tab.value)}
          >
            <span css={iconStyle}>{tab.icon}</span>
            <span css={labelStyle}>{tab.label}</span>
          </button>
        ))}
      </div>
      <div css={wantedTabStyle}>
        {wantedTab.map(tab => (
            <button
              key={tab.value}
              css={tabButtonStyle(selectedWantedTab === tab.value)}
              onClick={() => handleRankTabChange(tab.value)}
            >
              {tab.label}
            </button>
        ))}
      </div>
    </>
  )
}

export default RankingTabs

