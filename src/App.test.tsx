// @ts-nocheck
import { render, screen, fireEvent, within, getByTestId } from '@testing-library/react';
import { useState } from 'react';
import App from './App';
import HomeCard from './pages/home/components/home';


const changedChk = async (v: string) => {
  const response = await fetch(
      `https://restcountries.com/v2/name/` + v
  )
  return response;
};

test('check home component is rendered in app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Select a Country/);
  expect(linkElement).toBeInTheDocument();
});


test('when rendered button should be grey', () => {
  render(<App />);
  const checkButton = screen.getByTestId("button");
  expect(checkButton).toHaveClass("grey")
});

test('Check api returning objects list', async () => {
  await expect(typeof changedChk("india")).toBe('object');
});


test('Autocomplete, button Color blue & check capital in DOM', async () => {
  render(<App />);
  const autocomplete = getByTestId('autocomplete')

// click into the component
autocomplete.focus()

// type "a"
fireEvent.change(document.activeElement, { target: { value: 'india' } })

// arrow down to first option
fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' })

// select element
fireEvent.keyDown(document.activeElement, { key: 'Enter' })

expect(autocomplete.value).toEqual('British Indian Ocean Territory')
expect(screen.getByTestId("button")).toHaveClass("blue")
expect(screen.getByText(/Capital : Diego Garcia/)).toBeInTheDocument();
});

