import { useEffect } from 'react';
import { useUIStore } from "../../stores/ui";

// Function to determine group based on hash
const determineGroup = (): number => {
  const randomNumber = Math.random();
  return randomNumber < 0.5 ? 0 : 1;
};

export const useABTest = () => {
  const { setABTestGroup } = useUIStore()

  useEffect(() => {
    // Check if group is already stored in localStorage
    const storedGroup = localStorage.getItem('abTestGroup')
    if (storedGroup !== null) {
      // If group is present, set it in state
      const group = parseInt(storedGroup)
      setABTestGroup(group);
    } else {
      const group = determineGroup();
      localStorage.setItem('abTestGroup', group.toString());
      setABTestGroup(group);

      if ((window as any).gtag) {
        (window as any).gtag('event', group === 0 ? 'experiment_assign_A' : 'experiment_assign_B', {
          event_category: 'funnel', product: 'ab_test',
        })
      }
    }
  }, []);
};