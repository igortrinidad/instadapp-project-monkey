

export const promptExample = `Given the following fruit, output the closest color hex value that matches the color of that fruit.

Fruit:
{{ fruit }}

Color hex string:
`;

export const colors = [
  'indigo-500',
  'amber-500',
  'lime-500',
  'green-500',
  'teal-500',
  'cyan-500',
  'sky-500',
  'blue-500',
  'violet-500',
  'purple-500',
  'fuchsia-500',
  'pink-500',
]


export const regexExtractVariablePattern = /\{\{\s*([^}]+)\s*\}\}/g;

export const regexSplitContentKeepingVariablesPattern = /({{[^{}]+}})/g;

export const regexTestVariable = /^{{\s\w+\s}}$/;

export const regexExtractSingleVariable = /{{\s*(.*?)\s*}}/;
