import { useState } from 'react'
import GlobalStyle from '@/styles/GlobalStyle'
import Header from '@/components/Header'
import FriendSelector from '@/components/FriendSelector'
import CategoryList from '@/components/CategoryList'
import NoticeBanner from '@/components/NoticeBanner'
import RankingTabs from '@/components/RankingTabs'
import ProductGrid from '@/components/ProductGrid'

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

function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const handleDataChange = (newProducts: Product[]) => {
    setProducts(newProducts)
    setLoading(false)
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' , alignItems: 'center'}}>
      <GlobalStyle />
      <Header />
      <FriendSelector />
      <CategoryList />
      <NoticeBanner />
      <RankingTabs onDataChange={handleDataChange} />
      <ProductGrid products={products} loading={loading} />
    </div>
  )
}

export default Home;