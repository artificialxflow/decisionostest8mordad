/** Environment flags for frontend-only mock vs production UI */
export const USE_MOCK_DATA =
  import.meta.env.VITE_USE_MOCK_DATA !== 'false' && import.meta.env.MODE !== 'production';

export const IS_PRODUCTION = import.meta.env.MODE === 'production';
