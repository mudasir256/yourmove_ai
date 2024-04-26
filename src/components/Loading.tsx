// loading.tsx
import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loadingAnimation.json';

interface Props {
  titles?: string[];
  updateInterval?: number; // Add a prop for update speed
}

export const Loading = ({ titles, updateInterval = 2000 }: Props) => { // Default interval to 2000 ms
  const [currentTitle, setCurrentTitle] = useState(titles ? titles[0] : '');

  useEffect(() => {
    if (titles && titles.length > 1) {
      const intervalId = setInterval(() => {
        setCurrentTitle(prev => {
          const currentIndex = titles.indexOf(prev);
          const nextIndex = (currentIndex + 1) % titles.length;
          return titles[nextIndex];
        });
      }, updateInterval);
      return () => clearInterval(intervalId);
    }
  }, [titles, updateInterval]); // Include updateInterval in dependency array

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="-mt-64">
        <div className="flex items-center justify-center h-44">
          <Lottie animationData={loadingAnimation} loop={true} />
        </div>
        {currentTitle && (
          <div className="text-center -mt-6">
            <h2 className="text-2xl font-semibold">{currentTitle}</h2>
          </div>
        )}
      </div>
    </div>
  );
};