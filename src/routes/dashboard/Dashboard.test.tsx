import { fireEvent, render, screen, waitFor } from '@test-utils';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  // Test to ensure the Dashboard component renders properly with initial props
  it('renders correctly with initial props', () => {
    render(<Dashboard />);

    // Check that the Dashboard component is rendered
    const dashboard = screen.getByTestId('dashboard');
    expect(dashboard).toBeInTheDocument();

    // Verify the heading "Dashboard" is displayed
    const heading = screen.getByText(/Dashboard/i);
    expect(heading).toBeInTheDocument();

    // Ensure a form element is present in the Dashboard
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
  });

  // Test to verify the Dashboard renders correctly with empty notes
  it('renders correctly with empty notes', () => {
    const customInitialState = {
      notes: { data: [] }, // No notes available
      preferences: { active: false, muted: true },
    };

    render(<Dashboard />, { initialState: customInitialState });

    // Check that the "no notes" message is displayed
    const noNotesText = screen.getByText(/There are no notes yet/i);
    expect(noNotesText).toBeInTheDocument();
  });

  // Test to ensure form validation works when submitting an empty form
  it('submit form correctly', async () => {
    render(<Dashboard />);

    // Ensure the form is present in the DOM
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    // Trigger the form submission without filling out required fields
    fireEvent.submit(form);

    // Wait for validation error message to appear
    await waitFor(() => {
      const validationErrorText = screen.getByText(/title is required/i);
      expect(validationErrorText).toBeInTheDocument();
    });
  });

  // Test to verify form submission with a valid input
  it('submits form with correct value', async () => {
    render(<Dashboard />);

    // Find the input textbox and form elements
    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    // Simulate entering text into the input
    fireEvent.change(input, { target: { value: 'New Note' } });

    // Submit the form with the valid input
    fireEvent.submit(form);

    // Wait for the new note to be added and displayed
    await waitFor(() => {
      const newNote = screen.getByText(/new note/i);
      expect(newNote).toBeInTheDocument();
    });
  });

  it('removes note correctly', async () => {
    // Render the Dashboard component
    const { container } = render(<Dashboard />);

    // Find the "Remove note" button with the specific note name
    const button = screen.getByRole('button', {
      name: /Remove note: Take a break/i,
    });

    // Ensure the button is present in the DOM
    expect(button).toBeInTheDocument();

    // Simulate a click event on the "Remove note" button
    fireEvent.click(button);

    // Wait for the note to be removed from the DOM
    await waitFor(() => {
      // Select all remaining notes in the DOM
      const notes = container.querySelectorAll('.note');

      // Verify that only one note remains
      expect(notes.length).toBe(1);
    });
  });
});
