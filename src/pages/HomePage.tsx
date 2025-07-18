import { useState } from 'react'
import GlobalStyle from '@/styles/GlobalStyle'
import Header from '@/components/Header'
import FriendSelector from '@/components/FriendSelector'
import CategoryList from '@/components/CategoryList'
import NoticeBanner from '@/components/NoticeBanner'
import RankingTabs from '@/components/RankingTabs'
import ProductGrid from '@/components/ProductGrid'
import { type Product } from '@/types/product'

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const handleRankingProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts)
    setLoading(false)
  }

  return (
    <div>
      <GlobalStyle />
      <Header />
      <FriendSelector />
      <CategoryList />
      <NoticeBanner />
      <RankingTabs onDataChange={handleRankingProductsChange} />
      <ProductGrid products={products} loading={loading} />
    </div>
  )
}

export default Home;