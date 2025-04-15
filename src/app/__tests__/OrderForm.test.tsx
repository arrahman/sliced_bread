import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrderForm from '../components/OrderForm';

const mockPush = jest.fn();

// ✅ MOCK useRouter from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Success" }),
  })
) as jest.Mock;

describe('OrderForm Component', () => {
  it('renders all fields and submit button', () => {
    render(<OrderForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/quantity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/state\/province/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get splash!!/i })).toBeInTheDocument();
  });

  it('shows validation errors if required fields are empty on submit', async () => {
    render(<OrderForm />);

    try {
      fireEvent.click(screen.getByRole("button", { name: /get splash!!/i }));
      screen.debug(); // inspect output
    } catch (error) {
      console.error("Test failed during submit:", error);
    }

 
    await waitFor(() => {
      expect(screen.getByText("City is required")).toBeInTheDocument();
      expect(screen.getByText("State/Province is required")).toBeInTheDocument();
      expect(screen.getByText("Country is required")).toBeInTheDocument();
    });


  });

  it('shows validation errors if required fields are empty on submit', async () => {
    render(<OrderForm />);

    fireEvent.click(screen.getByRole('button', { name: /get splash!!/i }));

    await waitFor(() => {
      expect(screen.getByText("City is required")).toBeInTheDocument();
      expect(screen.getByText("State/Province is required")).toBeInTheDocument();
      expect(screen.getByText("Country is required")).toBeInTheDocument();
    });
  });

  it('submits the form with valid data and checks payload/response', async () => {
    const mockFetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ orderId: 'test-order-id' }),
      })
    );

    global.fetch = mockFetch as jest.Mock;

    render(<OrderForm />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/quantity/i), {
      target: { value: '3' },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: 'Canada' },
    });
    fireEvent.change(screen.getByLabelText(/state\/province/i), {
      target: { value: 'Ontario' },
    });
    fireEvent.change(screen.getByLabelText(/city/i), {
      target: { value: 'Toronto' },
    });

    fireEvent.click(screen.getByRole('button', { name: /get splash!!/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Jane Doe',
          quantity: '3',
          city: 'Toronto',
          state: 'Ontario',
          country: 'Canada',
        }),
      });

    });
  });
});
