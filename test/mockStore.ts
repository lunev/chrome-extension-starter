import { configureStore } from '@reduxjs/toolkit';
import NotesSlice from '../src/features/notes/notes-slice';
import { Note } from '../src/types';

interface PreloadedState {
  notes?: {
    data: Note[];
  };
}

export const createMockStore = (initialState: PreloadedState = {}) => {
  return configureStore({
    reducer: {
      notes: NotesSlice,
    },
    preloadedState: {
      notes: {
        data: [
          {
            id: '1',
            title: 'Take a break',
          },
          {
            id: '2',
            title: 'Test',
          },
        ],
        ...initialState.notes,
      },
    },
  });
};
