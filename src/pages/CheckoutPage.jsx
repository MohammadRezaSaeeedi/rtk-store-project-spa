import BasketCard from "../components/BasketCard";
import BasketSidebar from "../components/BasketSidebar";
import { useCart } from "../context/CartProvider"
import styles from "./CheckoutPage.module.css"
import { PiShoppingCartSimpleBold } from "react-icons/pi"
function CheckoutPage( ) {

  const [state , dispatch ] = useCart();

  const clickHandler = ( type , payload ) => dispatch({ type , payload })
  
  if(!state.itemsCounter) {
    return (
    <div className={styles.empty}>
      <p>You do not have any products in the shopping cart ☹</p>
  <PiShoppingCartSimpleBold />
    </div>)
  }
  return (
    <div className={styles.container}>
      <BasketSidebar state={state} clickHandler={clickHandler} />
    <div className={styles.products}>
      {state.selectedItems.map((product) => 
     <BasketCard key={product.id} data={product} clickHandler={clickHandler} />)}
    </div>
  </div>
  )
}

export default CheckoutPage