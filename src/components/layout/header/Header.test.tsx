import { screen, render } from '@test-utils';
import Header from './Header';

describe('header', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('renders logo', () => {
    const logo = screen.getByRole('img', { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  it('renders preferences link', () => {
    const preferencesLink = screen.getByRole('link', { name: /preferences/i });
    expect(preferencesLink).toBeInTheDocument();
  });
});
