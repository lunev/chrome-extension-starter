import { act, fireEvent, render, screen, waitFor } from '@test-utils'; // Import necessary testing utilities
import BaseSwitch from './BaseSwitch'; // Import the BaseSwitch component

describe('BaseSwitch Component', () => {
  // Test case to check rendering and behavior of the BaseSwitch component
  it('renders correctly with initial props', () => {
    const mockOnChange = vi.fn(); // Mock function to track onChange calls

    // Render the BaseSwitch component with props
    render(
      <BaseSwitch
        label="Base Switch"
        checked={true} // Initially checked
        hint="Hint text" // Hint text to be displayed
        onChange={mockOnChange} // Pass mock function for onChange
      />,
    );

    // Select the checkbox element by its role and label
    const checkbox = screen.getByRole('checkbox', {
      name: 'Base Switch',
    });

    // Check that the checkbox is in the document and initially checked
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();

    // Check that the hint text is correctly displayed
    const hint = screen.getByText(/hint text/i);
    expect(hint).toBeInTheDocument();

    // Verify that the checkbox has the correct aria-label attribute
    expect(checkbox).toHaveAttribute('aria-label', 'Base Switch');

    // Simulate a user clicking the checkbox to toggle its state
    act(() => {
      fireEvent.click(checkbox);
    });

    // Wait for the checkbox to become unchecked
    waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });

    // Ensure the onChange handler was called after the click event
    expect(mockOnChange).toHaveBeenCalled();
  });
});