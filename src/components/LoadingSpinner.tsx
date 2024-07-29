const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-6 h-6 border-gray-300 animate-spin rounded-full border-4 border-t-gray-500" />
    </div >
  );
};

export default LoadingSpinner;