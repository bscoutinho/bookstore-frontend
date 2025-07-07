'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { clearCart } from '@/store/slices/cartSlice'

export default function CheckoutPage() {
  const cart = useSelector((state: RootState) => state.cart.items)
  const dispatch = useDispatch()
  const router = useRouter()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handlePlaceOrder = () => {
    alert('Order placed successfully!')
    dispatch(clearCart())
    router.push('/')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="font-semibold">
                  ${(item.quantity * item.price).toFixed(2)}
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={handlePlaceOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

