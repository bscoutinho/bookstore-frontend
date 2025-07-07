import { useEffect, useState } from 'react';
import { api } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import CartSidebar from '@/components/CartSidebar';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    api.get('/books').then(res => setBooks(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Bookstore</h1>
      <main className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <ul className="space-y-4">
                  {books.map(book => (
                    <li key={book.id} className="border p-4 rounded flex justify-between items-center">
                      <div>
                        <h2 className="font-semibold">{book.title}</h2>
                        <p className="text-sm text-gray-600">by {book.author}</p>
                        <p className="text-blue-700 font-bold">${book.price}</p>
                      </div>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        onClick={() => dispatch(addToCart({ ...book, quantity: 1 }))}
                      >
                        Add to Cart
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-1">
                <CartSidebar />
              </div>
            </div>
          </main>
      
    </div>
  );
}
