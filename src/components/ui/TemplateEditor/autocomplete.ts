import { CompletionSource } from '@codemirror/autocomplete';

export const editorFunctionOptions = [
  {
    label: 'camelCase',
    apply: 'camelCase(',
  },
  {
    label: 'capitalize',
    apply: 'capitalize(',
  },
  {
    label: 'kebabCase',
    apply: 'kebabCase(',
  },
  {
    label: 'lowerCase',
    apply: 'lowerCase(',
  },
  {
    label: 'lowerFirst',
    apply: 'lowerFirst(',
  },
  {
    label: 'snakeCase',
    apply: 'snakeCase(',
  },
  {
    label: 'startCase',
    apply: 'startCase(',
  },
  {
    label: 'toLower',
    apply: 'toLower(',
  },
  {
    label: 'toUpper',
    apply: 'toUpper(',
  },
  {
    label: 'upperCase',
    apply: 'upperCase(',
  },
  {
    label: 'upperFirst',
    apply: 'upperFirst(',
  },
  {
    label: 'endsWith',
    apply: 'endsWith(',
  },
  {
    label: 'trim',
    apply: 'trim(',
  },
  {
    label: 'trimEnd',
    apply: 'trimEnd(',
  },
  {
    label: 'trimStart',
    apply: 'trimStart(',
  },
  {
    label: 'truncate',
    apply: 'truncate(',
  },
  {
    label: 'escape',
    apply: 'escape(',
  },
  {
    label: 'escapeRegExp',
    apply: 'escapeRegExp(',
  },
  {
    label: 'pad',
    apply: 'pad(',
  },
  {
    label: 'padEnd',
    apply: 'padEnd(',
  },
  {
    label: 'padStart',
    apply: 'padStart(',
  },
  {
    label: 'parseInt',
    apply: 'parseInt(',
  },
  {
    label: 'repeat',
    apply: 'repeat(',
  },
  {
    label: 'replace',
    apply: 'replace(',
  },
  {
    label: 'split',
    apply: 'split(',
  },
  {
    label: 'startsWith',
    apply: 'startsWith(',
  },
  {
    label: 'unescape',
    apply: 'unescape(',
  },
  {
    label: 'words',
    apply: 'words(',
  },
];

export const completionSource: CompletionSource[] = [
  async (ctx) => {
    const matchBefore = await ctx.matchBefore(/_\.\w*$/);

    if (matchBefore) {
      return {
        from: matchBefore.from + 2,
        options: editorFunctionOptions,
      };
    }
    return null;
  },
];
