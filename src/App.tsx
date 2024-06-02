import React, { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card";
import { useMksSistema } from "./hooks/useMksSistema";
import "./global.css";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  AlertDialog,  AlertDialogAction,  AlertDialogCancel,  AlertDialogContent,
  AlertDialogHeader,  AlertDialogTitle,  AlertDialogTrigger,} from "@/components/ui/alert-dialog";
import {  NavigationMenu,  NavigationMenuList,} from "@/components/ui/navigation-menu"
import { FaShoppingCart } from "react-icons/fa";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoCloseCircle } from "react-icons/io5";
import Footer from './components/ui/footer';
import { Skeleton } from "@/components/ui/skeleton"


export function App() {
  const { data, isLoading, isError } = useMksSistema();
  const [cartItems, setCartItems] = useState([]);
  const [itemIndexToRemove, setItemIndexToRemove] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      let sum = 0;
      cartItems.forEach((item) => {
        sum += item.price * (item.quantity || 1);
      });
      return sum;
    };

    setTotal(calculateTotal());
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const itemInCart = prevItems.find((item) => item.id === product.id);

      if (itemInCart) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (index) => {
    setItemIndexToRemove(index);
  };

  const confirmRemoveFromCart = (index) => {
    if (index !== null) {
      setCartItems((prevItems) => {
        const newItems = [...prevItems];
        newItems.splice(index, 1);
        return newItems;
      });
    }
    setItemIndexToRemove(null);
  };

  const increaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index].quantity += 1;
      return newItems;
    });
  };

  const decreaseQuantity = (index) => {
    setCartItems((prevItems) => {
      const newItems = [...prevItems];
      if (newItems[index].quantity > 1) {
        newItems[index].quantity -= 1;
      } else {
        newItems.splice(index, 1);
      }
      return newItems;
    });
  };

  return (

    <div className="max-w-12xl mx-auto">
      <div className="container-fluid w-full">
      <NavigationMenu className='nav-mks flex justify-between p-3'>
        <NavigationMenuList>
          MKS <span className='nav-pers'>Sistemas</span>
        </NavigationMenuList>
        <Sheet> 
        <SheetTrigger className='bg-white text-black carrinho flex items-center p-2 rounded-md mr-5' as={Button}>
          <FaShoppingCart className='m-1' />
          {cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}
        </SheetTrigger>
          <SheetContent className='color-fundo border-none pb-0 mb-0 h-screen'>
            <SheetHeader>
              <SheetTitle className='text-white font-bold text-compras'>Carrinho de compras</SheetTitle>
                <ScrollArea className="h-[580px] w-[350px] rounded-md pt-4">
                <SheetDescription>
                {cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                  <div key={index} className="products-car grid grid-cols-1 md:grid-cols-6 items-center mb-4 p-4 bg-white rounded-md">
                    <div className="md:col-span-1 mb-2 md:mb-0">
                      <img className="w-[100px] mx-auto md:mx-0" src={item.photo} alt={item.name} />
                    </div>
                    <div className="col-span-1 md:col-span-2 md:pl-4">
                      <p className="text-center md:text-left">{item.name}</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 flex justify-center md:justify-start">
                      <button onClick={() => decreaseQuantity(index)}>-</button>
                      <p className="inline-block mx-2">{item.quantity}</p>
                      <button onClick={() => increaseQuantity(index)}>+</button>
                    </div>
                    <div className="col-span-1 md:col-span-1 text-center md:text-right">
                      <p>R${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                    </div>
                    <div className="col-span-1 md:col-span-1 text-center md:text-right">
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <IoCloseCircle />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Você deseja realmente excluir esse produto?</AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogAction onClick={() => confirmRemoveFromCart(index)}>Excluir</AlertDialogAction>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  ))
                ) : (
                  <p className='text-white font-bold'>Seu carrinho está vazio</p>
                )}
              </SheetDescription>
                </ScrollArea>
            </SheetHeader>
            <div className="flex justify-between mb-3 text-compras">
              <span className="text-white font-bold">Total:</span>
              <span className="text-white font-bold">R${total.toFixed(2)}</span>
            </div>
            <div>
              <Button className='m-0 w-full'>Finalizar Compra</Button>
            </div>
          </SheetContent>
        </Sheet>
      </NavigationMenu>
      </div>

      <div className="container mt-20 mb-20 flex flex-wrap justify-around max-w-6xl">
        {!isLoading && (
          <>
            {data?.products.map((product) => (
              <Card key={product.id} className="w-full md:w-[%] lg:w-[23%] lg:mb-5 md:mb-0 md:mr-5 h-[400px] lg:h-[500px] xl:h-[400px] flex flex-col justify-between">
              <CardHeader className="flex flex-col items-center">
                <img className="w-[120px] h-[120px] object-contain" src={product.photo} alt={product.name} />
                <CardTitle className="w-full">
                  <div className="flex justify-between mb-3 items-center">
                    <span className="text-base text-center md:text-left">{product.name}</span>
                    <span className="font-bold text-white bg-black rounded px-2 py-1 text-sm">R${product.price}</span>
                  </div>
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className='w-full p-0 mt-auto'>
                <Button className="button-comprar w-full" onClick={() => addToCart(product)}>
                  <RiShoppingBag3Line className='mr-2' /> COMPRAR
                </Button>
              </CardFooter>
            </Card>
            ))}
          </>
        )}
        {isLoading && <Skeleton className="w-[100px] h-[20px] rounded-full" />}
        {isError && <p>Error de conexão com a api!</p>}
      </div>
      <Footer></Footer>
    </div>
  );
}
