import { serviceWorkerInit } from './service-worker';

describe('Service Worker', () => {
  it('should log "Service worker installed."', () => {
    // Mock the console.log function
    console.log = vi.fn();

    // Call the imported function
    serviceWorkerInit();

    // Check if console.log was called with the correct argument
    expect(console.log).toHaveBeenCalledWith('Service worker installed.');
  });
});
