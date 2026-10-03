import { TextDecoder, TextEncoder } from 'util';

// The Jest 27 jsdom runtime lacks these browser APIs used by React Router.
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
