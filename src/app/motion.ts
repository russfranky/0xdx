/**
 * Shared motion tokens (Emil Kowalski design-eng).
 * Strong custom ease-out, UI durations under 300ms, stagger 30-80ms.
 * Built-in easings are too weak; never use ease-in for UI.
 */
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];
export const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];
export const DUR_UI = 0.25;
export const DUR_ENTER = 0.2;
export const DUR_EXIT = 0.15;
export const STAGGER = 0.06;
