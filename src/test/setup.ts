import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// make cleanup automatic after each test
afterEach(() => {
  cleanup();
});

// เพิ่ม global types สำหรับ TypeScript
declare global {
  namespace NodeJS {
    interface Global {
      describe: typeof import('vitest')['describe'];
      it: typeof import('vitest')['it'];
      expect: typeof import('vitest')['expect'];
      vi: typeof import('vitest')['vi'];
    }
  }
}