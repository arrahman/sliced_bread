import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ConfirmationPage from '../../app/order/[orderId]/page';
import '@testing-library/jest-dom';

beforeEach(() => {
    jest.clearAllMocks();
  });

// Mock Next.js navigation hooks
jest.mock('next/navigation', () => ({
  useParams: () => ({
    orderId: 'test-order-id',
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: () => null,
  }),
}));

const mockOrder = {
  id: 'test-order-id',
  name: 'John Doe',
  quantity: 3,
  city: 'New York',
  state: 'NY',
  country: 'USA',
  createdAt: new Date().toISOString(),
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ order: mockOrder }),
  })
) as jest.Mock;

describe('ConfirmationPage', () => {
 

  it('shows error message if token is missing', async () => {
 
    render(<ConfirmationPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Missing token')).toBeInTheDocument();
    });
  });
});
