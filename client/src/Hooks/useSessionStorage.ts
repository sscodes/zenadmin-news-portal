const useSessionStorage = () => {
  const setData = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
  };
  const getData = (key: string) => {
    return sessionStorage.getItem(key);
  };
  const deleteData = (key: string) => {
    sessionStorage.removeItem(key);
  };

  return { setData, getData, deleteData };
};

export default useSessionStorage;
