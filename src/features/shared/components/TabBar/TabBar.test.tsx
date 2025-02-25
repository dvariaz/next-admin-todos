import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';

import TabBar from '@/features/shared/components/TabBar';

const props = {
  tabItems: [
    {id: '0', label: 'Tab 1'},
    {id: '1', label: 'Tab 2'},
    {id: '2', label: 'Tab 3'}
  ],
  onChangeTab: vi.fn()
}

describe('Shared: Components', () => {
  describe('TabBar', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      wrapper = render(<TabBar {...props} />);
    })

    afterEach(() => {
      vi.clearAllMocks();
      cleanup();
    })

    it('should render correctly', async () => {
      const tabBar = await wrapper.findByTestId('tab-bar');

      expect(tabBar).toBeDefined();

      const tabItems = await wrapper.findAllByTestId('tab-item');

      expect(tabItems.length).toBe(props.tabItems.length);
    })

    it('should call onChangeTab with first tab if there is no valid current tab', async () => {
      expect(props.onChangeTab).toHaveBeenCalledTimes(1);
    })

    it('shouldn\'t call onChangeTab if there is a valid initial current tab', async () => {
      vi.clearAllMocks();
      wrapper = render(<TabBar {...props} currentTabId={props.tabItems[0].id} />);

      expect(props.onChangeTab).not.toHaveBeenCalled();
    })

    it('should call onChangeTab when a tab is clicked', async () => {
      const [firstTabItem] = await wrapper.findAllByTestId('tab-item');

      fireEvent.click(firstTabItem);

      expect(props.onChangeTab).toHaveBeenCalled();
    })
  })
})