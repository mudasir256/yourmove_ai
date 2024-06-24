import { useEffect } from 'react';
import { useUIStore } from "../../stores/ui";
import { logEvent } from '../../analytics'

// Function to determine group based on hash
const determineGroup = (): number => {
  const randomNumber = Math.random();
  return randomNumber < 0.5 ? 0 : 1;
};

export const useABTest = () => {
  const { setABTestGroup } = useUIStore()

  useEffect(() => {
    // Check if group is already stored in localStorage
    const storedGroup = localStorage.getItem('experiment_group')
    if (storedGroup !== null) {
      // If group is present, set it in state
      const group = parseInt(storedGroup)
      setABTestGroup(group);
    } else {
      const group = determineGroup();
      localStorage.setItem('experiment_group', group.toString());
      setABTestGroup(group);

      logEvent('experiment_assign', 'ab_test')
    }
  }, []);
};