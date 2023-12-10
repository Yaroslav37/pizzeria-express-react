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
        { products.map }
        <li key>

        </li>
      </ul>
    </div>

  )
}