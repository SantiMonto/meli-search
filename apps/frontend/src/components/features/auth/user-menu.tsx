'use client';

import { useAuth } from '@/core/contexts/auth.context';
import { useCart } from '@/core/contexts/cart.context';
import { ChevronDown } from 'lucide-react';

/**
 * User Menu Component
 * Dropdown menu for authenticated users
 * Shows user avatar, name, and logout option
 */
export function UserMenu() {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();

  const handleLogout = () => {
    clearCart();
    logout();
  };

  if (!user) return null;

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 hover:text-blue-600">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
          {user.firstName?.[0]?.toUpperCase()}
          {user.lastName?.[0]?.toUpperCase()}
        </span>
        <span className="max-w-[100px] truncate text-sm">{user.firstName}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full hidden pt-2 group-hover:block z-50 min-w-[200px]">
        <div className="rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-3 text-gray-700 border-b border-gray-100">
            <p className="font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.identifier}</p>
          </div>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}
