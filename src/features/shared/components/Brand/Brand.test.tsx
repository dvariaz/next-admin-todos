import { describe, beforeEach, it, expect  } from 'vitest';
import { render, RenderResult } from '@testing-library/react';

import Brand from '@/features/shared/components/Brand';

describe('Shared: Components', () => {
  describe('Brand', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      wrapper = render(<Brand />);
    })

    it('should render correctly', async () => {
      const icon = await wrapper.findByTestId('brand-icon');
      const text = await wrapper.findByTestId('brand-text');

      expect(icon).toBeDefined();
      expect(text).toBeDefined();
    })
  })
})
