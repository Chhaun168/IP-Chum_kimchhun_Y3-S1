import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EquipmentCard from '../components/EquipmentCard.vue';
import type { Equipment } from '../types';

describe('EquipmentCard.vue', () => {
  const mockEquipment: Equipment = {
    id: 1,
    name: 'Arduino Uno R3',
    categoryId: 1,
    description: 'Test description',
    status: 'AVAILABLE',
    totalQty: 5,
  };

  it('renders equipment details correctly', () => {
    const wrapper = mount(EquipmentCard, {
      props: {
        equipment: mockEquipment,
      },
    });

    expect(wrapper.text()).toContain('Arduino Uno R3');
    expect(wrapper.text()).toContain('Test description');
    expect(wrapper.text()).toContain('AVAILABLE');
  });

  it('disables request button when equipment is under maintenance', () => {
    const maintenanceEquipment: Equipment = {
      ...mockEquipment,
      status: 'MAINTENANCE',
    };

    const wrapper = mount(EquipmentCard, {
      props: {
        equipment: maintenanceEquipment,
      },
    });

    const button = wrapper.find('button');
    expect(button.element.disabled).toBe(true);
    expect(button.text()).toBe('Under Maintenance');
  });
});