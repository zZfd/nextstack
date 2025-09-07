import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, jest } from '@jest/globals';
import { MyButton } from '../MyButton';

// Mock Tamagui Provider
const MockProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div data-testid="tamagui-provider">{children}</div>
);

describe('MyButton', () => {
  it('renders correctly', () => {
    render(
      <MockProvider>
        <MyButton>Click me</MyButton>
      </MockProvider>
    );
    
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles onClick events', () => {
    const handleClick = jest.fn();
    
    render(
      <MockProvider>
        <MyButton onPress={handleClick}>Click me</MyButton>
      </MockProvider>
    );
    
    const button = screen.getByText('Click me');
    fireEvent.press(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    render(
      <MockProvider>
        <MyButton disabled>Disabled Button</MyButton>
      </MockProvider>
    );
    
    const button = screen.getByText('Disabled Button');
    expect(button).toBeDisabled();
  });

  it('accepts custom props', () => {
    render(
      <MockProvider>
        <MyButton testID="custom-button" backgroundColor="red">
          Custom Button
        </MyButton>
      </MockProvider>
    );
    
    const button = screen.getByTestId('custom-button');
    expect(button).toBeInTheDocument();
  });
});