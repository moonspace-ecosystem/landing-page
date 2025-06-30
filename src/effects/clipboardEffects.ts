import { Effect } from 'effect';

// Error types
export class ClipboardError extends Error {
  readonly _tag = 'ClipboardError';
  constructor(message: string) {
    super(message);
    this.name = 'ClipboardError';
  }
}

// Copy text to clipboard using Effect
export const copyToClipboard = (
  text: string
): Effect.Effect<never, ClipboardError, void> => {
  return Effect.gen(function* (_) {
    try {
      // Try to use the modern clipboard API first
      return yield* _(Effect.tryPromise({
        try: async () => {
          await navigator.clipboard.writeText(text);
        },
        catch: (error) => {
          // If modern API fails, try the older approach
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      }));
    } catch (error) {
      return yield* _(Effect.fail(new ClipboardError(`Failed to copy to clipboard: ${String(error)}`)));
    }
  });
};
