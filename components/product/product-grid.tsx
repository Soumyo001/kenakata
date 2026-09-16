import { ProductType } from "@/lib/types";
import ProductCard from "./product-card";

const ProductGrid = ({products}: {products: ProductType[]}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => <ProductCard key={product.id} product={product}/>)}
    </div>
  )
}

export default ProductGrid