import React, { useEffect, useState } from 'react';

type Props = {
  onCompleted?: VoidFunction
  totalTime?: number
  complete?: boolean
  titles?: string[]
}

export const ProgressBar = ({ onCompleted, totalTime = 150, complete, titles = [] }: Props) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentTitle, setCurrentTitle] = useState<string>(titles.length > 0 ? titles[0] : "")

  useEffect(() => {
    if (complete) setProgress(totalTime)
  }, [complete])

  useEffect(() => {
    if (titles.length > 1) {
      const updateInterval = 5000
      const intervalId = setInterval(() => {
        setCurrentTitle(prev => {
          const currentIndex = titles.indexOf(prev);
          const nextIndex = (currentIndex + 1) % titles.length;
          return titles[nextIndex];
        });
      }, updateInterval);
      return () => clearInterval(intervalId);
    }
  }, [titles]);

  useEffect(() => {
    const updateInterval = 1000; // update every second

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= totalTime) {
          clearInterval(interval);
          onCompleted?.()
          return totalTime;
        }
        return prevProgress + 1;
      });
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const percentage = (progress / totalTime) * 100;

  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`bg-brand-primary h-2 rounded-full transition-all ease-linear ${complete ? "duration-250" : "duration-1000"}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {titles ? (<div className="text-center mt-2">
        <h2 className="text-2xl font-semibold">{currentTitle}</h2>
      </div>) : (<p className="text-black text-right mt-2">{`${Math.round(percentage)}%`}</p>)}
    </>
  );
};
