/* eslint-disable import/extensions,import/no-unresolved */
import doc from 'grommet/components/Paragraph/doc.js';
import { packages, categories } from '../lookups.js';
import { _starter } from './_starter.js';
import { color } from './color.js';
import { margin } from './margin.js';
import { size } from './size.js';


export const Paragraph = {
  name: 'Paragraph',
  category: categories.type,
  package: packages.grommet,
  doc: doc.doc({}).toJSON(),
  themeDoc: doc.themeDoc,
  examples: {
    _starter,
    color,
    margin,
    size,
  },
};

