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
    get: (key: string) => key === 'token' ? 'mocked-token' : null,
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
  it('displays order details when fetch is successful', async () => {
    render(<ConfirmationPage />);

    await waitFor(() => {
      expect(screen.getByText(/Thank You for Your Order/i)).toBeInTheDocument();
      expect(screen.getByText(mockOrder.name)).toBeInTheDocument();
      expect(screen.getByText(mockOrder.city)).toBeInTheDocument();
      expect(screen.getByText(mockOrder.country)).toBeInTheDocument();
    });
  });

 
});
