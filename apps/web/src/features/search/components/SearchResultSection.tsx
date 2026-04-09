import { SearchProductSection } from './SearchProductSection';
import { SearchReviewSection } from './SearchReviewSection';
import type { SubcategoryProductType } from '@/features/subcategory';
import type { SearchTabType } from '../types/search.types';

interface SearchResultSectionProps {
  activeTab: SearchTabType;
  products: SubcategoryProductType[];
  onHeartToggle: (productId: number) => void;
}

export const SearchResultSection = ({
  activeTab,
  products,
  onHeartToggle,
}: SearchResultSectionProps) => {
  return (
    <section className="scrollbar-hide flex h-full flex-col overflow-auto">
      {activeTab === 'product' && (
        <SearchProductSection
          products={products}
          onHeartToggle={onHeartToggle}
        />
      )}
      {activeTab === 'review' && <SearchReviewSection />}
    </section>
  );
};
