import React from 'react';
import { createMockStore } from './mockStore';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  route?: string;
  routerProps?: Omit<MemoryRouterProps, 'children'>;
}

const customRender = (
  ui: ReactElement,
  { route = '/', routerProps = {}, ...options }: CustomRenderOptions = {},
) => {
  const store = createMockStore();
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]} {...routerProps}>
        {ui}
      </MemoryRouter>
    </Provider>,
    options,
  );
};

export * from '@testing-library/react';
export { customRender as render };
