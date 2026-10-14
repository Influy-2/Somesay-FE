import type { ChangeEventHandler, ReactNode } from 'react';

import { ArrowBackIcon } from '@/shared/icons';

import { PageHeader } from '../pageHeader/PageHeader';
import { SearchBar } from '../search/SearchBar';

// 입력·결과 모드가 함께 쓰는 공통 props입니다.
interface ProductSearchHeaderBaseProps {
  value: string;
  backLabel: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  onClear: () => void;
  onBack: () => void;
}

// 카테고리 탭은 ProductSelectionBrowser가 그리므로 결과 모드는 제목·우측 버튼만 더 받습니다.
type ProductSearchHeaderProps =
  | (ProductSearchHeaderBaseProps & {
      mode: 'input';
    })
  | (ProductSearchHeaderBaseProps & {
      mode: 'result';
      /** 결과 화면 제목입니다. 지정하지 않으면 '검색 결과'를 씁니다. */
      title?: string;
      /** 헤더 오른쪽에 둘 버튼들입니다(예: 마이페이지의 '추가'). */
      right?: ReactNode[];
    });

// 뒤로가기 버튼을 두 모드에서 똑같이 쓰려고 분리했습니다.
const BackButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button type="button" onClick={onClick} aria-label={label}>
    <ArrowBackIcon />
  </button>
);

// 검색어 입력 모드와 결과 모드를 한 컴포넌트에서 전환하는 헤더입니다.
export const ProductSearchHeader = (props: ProductSearchHeaderProps) => {
  // 두 모드가 같은 검색창을 쓰되, 입력 모드에서만 자동 포커스를 줍니다.
  const searchBar = (
    <SearchBar
      placeholder="제품명 또는 브랜드명 검색"
      value={props.value}
      onChange={props.onChange}
      onSubmit={props.onSubmit}
      onClear={props.onClear}
      autoFocus={props.mode === 'input'}
    />
  );

  // 입력 모드: 상단에 고정되는 헤더에 뒤로가기와 검색창만 둡니다.
  if (props.mode === 'input') {
    return (
      <header className="z-header fixed top-0 flex h-13.5 w-full max-w-110 min-w-[20rem] items-center gap-3 bg-white px-4 py-2.5">
        <BackButton label={props.backLabel} onClick={props.onBack} />
        <div className="min-w-0 flex-1">{searchBar}</div>
      </header>
    );
  }

  // 결과 모드: 바로 아래에 Browser의 탭이 오므로 검색창-탭 간격(gap-4)을 pb-4로 남깁니다. 탭 아래 여백은 Browser가 맡습니다.
  return (
    <div className="flex flex-col gap-4 pb-4">
      <PageHeader
        title={props.title ?? '검색 결과'}
        left={<BackButton label={props.backLabel} onClick={props.onBack} />}
        {...(props.right ? { right: props.right } : {})}
      />
      <div className="px-4">{searchBar}</div>
    </div>
  );
};
