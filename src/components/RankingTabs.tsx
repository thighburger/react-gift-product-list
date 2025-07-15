import { css } from '@emotion/react'
import { colors } from '../styles/colors'
import { spacing } from '../styles/spacing'
import { typography } from '../styles/typography'
import { useState, useEffect } from 'react';

function usePersistentState(key, defaultValue) {
  const [state, setState] = useState(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

const peopleTab= [
  { label: '전체', value: 'all' ,icon: 'ALL' },
  { label: '여성', value: 'female', icon: '👩' },
  { label: '남성', value: 'male', icon: '👨' },
  { label: '청소년이', value: 'teen' , icon: '🧑' },
]

const wantedTab = [
    {label: '받고 싶어한', value: 'wanted'},
    {label: '많이 선물한', value: 'gifted'},
    {label: '위시로 받은', value: 'wished'},
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

const RankingTabs = () => {
  const [selected, setSelected] = usePersistentState('rankingTab', 'female');
  const [selectedWantedTab, setSelectedWantedTab] = usePersistentState('wantedTab', 'wanted');

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
            onClick={() => setSelected(tab.value)}
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
              onClick={() => setSelectedWantedTab(tab.value)}
            >
              {tab.label}
            </button>
        ))}
      </div>
    </>
  )
}

export default RankingTabs

