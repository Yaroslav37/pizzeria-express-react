import { useState, useEffect } from 'react'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('http://localhost:3001/products')
      setLoading(false)
      setProducts(data)
    }
    fetchData();
  }, []);

  if (loading) {
    return <p>loading...</p>
  }
  
  return (
    <div>
      <ul>
        { products.map((product) => (
          <li key={product.id}>
            <img height={200} width={200} src={product.image_url} />
            <p>{product.description}</p>
          </li>
        )) }
      </ul>
    </div>

  )
}

export default Products