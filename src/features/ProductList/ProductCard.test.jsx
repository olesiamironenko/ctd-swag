import { describe, expect, it, vi } from 'vitest';
import ProductCard from './ProductCard';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ProductCard component', () => {
  function setup(jsx) {
    return {
      user: userEvent.setup(),
      ...render(jsx),
    };
  }
  const testProduct = {
    id: 'testId',
    name: 'Test Product',
    description: 'Test product description',
    handleAddItemToCart: vi.fn((id) => id),
  };

  it('includes an h2 containing "Test Product"', () => {
    render(
      <ProductCard
        name={testProduct.name}
        description={testProduct.description}
      />
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      testProduct.name
    );
  });
  it('button fires callback', async () => {
    const { user } = setup(
      <ProductCard
        name={testProduct.name}
        description={testProduct.description}
        id={testProduct.id}
        handleAddItemToCart={testProduct.handleAddItemToCart}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(testProduct.handleAddItemToCart).toHaveBeenCalled();
    vi.clearAllMocks();
  });
  it('callback returns product id', async () => {
    const { user } = setup(
      <ProductCard
        name={testProduct.name}
        description={testProduct.description}
        id={testProduct.id}
        handleAddItemToCart={testProduct.handleAddItemToCart}
      />
    );
    await user.click(screen.getByRole('button'));
    expect(testProduct.handleAddItemToCart).toHaveReturnedWith(testProduct.id);
    vi.clearAllMocks();
  });
});
