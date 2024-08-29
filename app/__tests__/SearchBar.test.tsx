import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../Components/SearchBar';

describe('SearchBar Component', () => {
  it('renders input and button correctly', () => {
    render(<SearchBar search="" setSearch={jest.fn()} onSearch={jest.fn()} />);
    expect(screen.getByPlaceholderText('Search for books...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls setSearch on input change', () => {
    const setSearch = jest.fn();
    render(<SearchBar search="" setSearch={setSearch} onSearch={jest.fn()} />);
    fireEvent.change(screen.getByPlaceholderText('Search for books...'), {
      target: { value: 'New Search' },
    });
    expect(setSearch).toHaveBeenCalledWith('New Search');
  });

  it('triggers onSearch when button is clicked', () => {
    const onSearch = jest.fn();
    render(<SearchBar search="test" setSearch={jest.fn()} onSearch={onSearch} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSearch).toHaveBeenCalled();
  });
});
