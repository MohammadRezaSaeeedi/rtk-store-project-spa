import React , { createContext , useState , useEffect , useContext } from 'react'
import api from '../services/config';


const productContext = createContext();

function ProductsProvider({children}) {
    const [products , setProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setProducts(await api.get("/products"))
            } catch (error) {
                console.log(error.message)
            }
        };
        fetchProducts();
    } , [])
  return (
    <productContext.Provider value={products} >
        {children}
    </productContext.Provider>
  )
}

const useProducts = () => {
    const products = useContext(productContext)
    return products
}


export default ProductsProvider
export { useProducts }