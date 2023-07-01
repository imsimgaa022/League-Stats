import { useEffect } from 'react';

const useLocalStorage = (key) => {
  const hasKey = () => {
    return localStorage.getItem(key) !== null;
  };

  useEffect(() => {
    // Optional: You can perform any additional logic here when the component mounts or unmounts
    // For example, you can log something or update a state variable
    console.log('Component mounted');

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  return hasKey();
};

export default useLocalStorage;
