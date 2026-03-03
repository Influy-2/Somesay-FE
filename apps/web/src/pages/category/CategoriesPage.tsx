import { CategoryAccordion } from '@/features/category/components/CategoryAccordion';
import { CategoryType } from '@somesay/shared';

// 임시 Mock 데이터
const CATEGORY_MOCK_DATA: CategoryType[] = [
  {
    id: 1,
    title: '스킨케어',
    subCategories: [
      { id: 101, name: '스킨/토너' },
      { id: 102, name: '로션/에멀전' },
      { id: 103, name: '에센스/앰플/세럼' },
      { id: 104, name: '크림' },
      { id: 105, name: '미스트/오일' },
    ],
  },
  {
    id: 2,
    title: '클렌징',
    subCategories: [
      { id: 201, name: '클렌징 폼' },
      { id: 202, name: '클렌징 오일' },
      { id: 203, name: '클렌징 밤' },
      { id: 204, name: '클렌징 워터/밀크' },
      { id: 205, name: '필링/스크럽' },
    ],
  },
  {
    id: 3,
    title: '마스크/팩',
    subCategories: [
      { id: 301, name: '시트 마스크' },
      { id: 302, name: '스킨/토너 패드' },
      { id: 303, name: '코팩' },
      { id: 304, name: '기타 마스크' },
    ],
  },
  {
    id: 4,
    title: '선케어',
    subCategories: [
      { id: 401, name: '선크림' },
      { id: 402, name: '선앰플' },
    ],
  },
  {
    id: 5,
    title: '베이스 메이크업',
    subCategories: [
      { id: 501, name: '메이크업 베이스' },
      { id: 502, name: '쿠션' },
      { id: 503, name: '파운데이션' },
    ],
  },
];

export const CategoriesPage = () => {
  return (
    <>
      <header className="flex h-13.5 w-full items-center justify-center bg-white px-4 py-2.5">
        <h1 className="body1-sb">카테고리</h1>
      </header>

      <div className="pt-5">
        <ul className="flex flex-col">
          {CATEGORY_MOCK_DATA.map((category) => (
            <CategoryAccordion key={category.id} category={category} />
          ))}
        </ul>
      </div>
    </>
  );
};
