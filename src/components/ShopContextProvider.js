import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null)

export const ShopContextProvider = (props) => {
  const [cart, setCart] = useState([]);
  const [numInCart, setnumInCart] = useState(0)

  useEffect(() => {
    setnumInCart(checkQty())
  }, [cart])

  const addCart = (product) => {
    const itemInCart = cart.filter(item => item.item.id === product.id)
    setCart((prevState) => {
      if(itemInCart.length === 1) {
        const newItem = prevState.map(item => {
          if(item.item.id === product.id) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        })
        return newItem
      } else {
          return [...prevState, {item: product, quantity: 1}]
      }
    })
  }

  const removeItem = (id) => {
    setCart((prevState) => {
      return prevState.filter(item => item.item.id !== id)
    })
  }
  
  const increaseQty = (id) => {
    setCart((prevState) => {
      const newItem = prevState.map(item => {
        console.log(item)
        if(item.item.id === id) {
          return {...item, quantity: item.quantity + 1}
        }
        return item
      })
      return newItem
    })
    console.log(id)
  }
  const decreaseQty = (id) => {
    setCart((prevState) => {
      const newItem = prevState.map(item => {
        if(item.item.id === id) {
          return {...item, quantity: item.quantity - 1}
        }
        return item
      })
      return newItem
    })
  }
  const totalPrice = () => {
    return cart.map(item => item.item.price * item.quantity).reduce((a,b)=> a+b, 0).toFixed(2)
  }

  const checkQty = () => {
    return cart.map(item => item.quantity).reduce((a,b) => a+b, 0)
  }
  const contextValue = {
    addCart,
    removeItem,
    increaseQty,
    decreaseQty,
    totalPrice,
    numInCart,
    cart
  }
  
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}