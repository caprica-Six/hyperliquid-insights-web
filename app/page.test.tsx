import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('should render the home page', () => {
    render(<HomePage />);
    const pageTitle = screen.getByText('Home Page');
    expect(pageTitle).toBeInTheDocument();
  });
});
