export const useGetJobs = async () => {
  const fetchJobs = async () => {
    try {
      const response = await globalThis.fetch(
        'https://backapijobs-production-ad45.up.railway.app/api/v1/jobs?page=0&size=5'
      );
      const a = await response.json();
      return a.jobs;
    } catch (error) {
      console.log('hay un error');
    }
  };
  const a = await fetchJobs();
  return a;
};
