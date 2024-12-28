export const Languages = ['en-US', 'fr'] as const;
export type Language = (typeof Languages)[number];
