const baseUrl = "https://api.github.com/users/";

export const gitHubApi = {
  getRepositories: async (userName:string) => {
    const response = await fetch(baseUrl + userName + "/repos?per_page=10000", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  },
};
