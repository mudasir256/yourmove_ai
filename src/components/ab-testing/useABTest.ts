import { useEffect, useState } from 'react';
import { useUIStore } from "../../stores/ui";
import { fetchIP } from "../../queries"

const generateHash = (ip: string): number => {
  const ipArray = ip.split('.').map(Number);
  return ipArray.reduce((acc, val) => acc + val, 0);
};

// Function to determine group based on hash
const determineGroup = (hash: number): number => {
  return hash % 2 === 0 ? 0 : 1;
};

export const useABTest = () => {
  const { setABTestGroup } = useUIStore()
  const [ip, setIP] = useState<string>('');

  useEffect(() => {
    try {
      fetchIP().then(response => setIP(response.data.ip))
    } catch (err) {
      console.log("Error fetching IP")
    }
  }, []);

  useEffect(() => {
    console.log("MY IP ADDRESS IS:: ", ip)
    // Check if group is already stored in localStorage
    const storedGroup = 1 //parseInt(localStorage.getItem('ABTestGroup') || '0', 10);

    if (storedGroup !== null && !isNaN(storedGroup)) {
      console.log("RESTORING GROUP::")
      // If group is present, set it in state
      setABTestGroup(storedGroup);
      console.log("MY A/B TESTING GROUP IS:: ", storedGroup)
    } else {
      console.log("ASSIGNING GROUP::")
      const hash = generateHash(ip);
      console.log("IP HASH:: ", hash)
      const group = determineGroup(hash);
      localStorage.setItem('ABTestGroup', group.toString());

      setABTestGroup(group);
      if ((window as any).gtag) {
        (window as any).gtag('event', group === 0 ? 'experiment_assign_A' : 'experiment_assign_B', {
          event_category: 'funnel', product: 'ab_test',
        })
      }
      console.log("MY A/B TESTING GROUP IS:: ", group)
    }
  }, [ip]);
};