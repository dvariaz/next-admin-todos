import { render, RenderResult } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import ProfileCard from '@/features/shared/components/ProfileCard';

const props = {
  name: 'John Doe',
  photoSrc: 'https://randomuser.me/api/portraits/lego/1.jpg',
  roles: ['admin', 'user']
}

describe('Shared: Components', () => {
  describe('ProfileCard', () => {
    let wrapper: RenderResult;

    beforeEach(() => {
      wrapper = render(<ProfileCard {...props} />);
    })

    it('should render correctly', async () => {
      const profilePic = await wrapper.findByTestId('profile-pic');
      const name = await wrapper.findByTestId('profile-name');
      const roles = await wrapper.findByTestId('profile-roles');

      expect(profilePic).toBeDefined();
      expect(name).toBeDefined();
      expect(roles).toBeDefined();
      expect(roles.textContent).toBe(props.roles.join(', '));
    })
  })
})
