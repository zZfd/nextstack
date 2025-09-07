import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Home from '../../../app/page';

// Mock tRPC
const mockUseQuery = vi.fn();
vi.mock('@nexstack/trpc', () => ({
  trpc: {
    post: {
      all: {
        useQuery: mockUseQuery,
      },
    },
  },
}));

// Mock UI components
vi.mock('@nexstack/ui', () => ({
  MyButton: ({ children }: { children: React.ReactNode }) => (
    <button data-testid="my-button">{children}</button>
  ),
}));

// Mock Tamagui components
vi.mock('tamagui', () => ({
  View: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Text: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  H1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  YStack: ({ children, ...props }: any) => <div {...props}>{children}</div>,
}));

describe('Home Page', () => {
  it('renders correctly', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<Home />);
    
    expect(screen.getByText('Web SEO (Next.js)')).toBeInTheDocument();
    expect(screen.getByText('SEO-optimized application with server-side rendering')).toBeInTheDocument();
    expect(screen.getByTestId('my-button')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    mockUseQuery.mockReturnValue({
      isLoading: true,
      data: undefined,
    });

    render(<Home />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders posts when data is available', () => {
    const mockPosts = [
      { id: '1', title: 'Test Post 1', content: 'Content 1' },
      { id: '2', title: 'Test Post 2', content: 'Content 2' },
    ];

    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: mockPosts,
    });

    render(<Home />);
    
    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('renders empty state when no posts', () => {
    mockUseQuery.mockReturnValue({
      isLoading: false,
      data: [],
    });

    render(<Home />);
    
    expect(screen.getByText('Posts:')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});