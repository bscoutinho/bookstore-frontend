'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice'
import Link from 'next/link'

export default function CartSidebar() {
  const cart = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cart.map(item => (
            <li key={item.id}>
              <div className="flex justify-between items-center">
                <div>
                  <p>{item.title}</p>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e =>
                      dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))
                    }
                    className="w-16 mt-1"
                  />
                </div>
                <div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    className="text-red-500 text-sm"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 font-bold">Total: ${total.toFixed(2)}</div>
      <Link href="/checkout">
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full">
          Go to Checkout
        </button>
      </Link>
    </div>
  )
}
