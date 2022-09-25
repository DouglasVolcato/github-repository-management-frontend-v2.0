const baseUrl = "https://repository-management.herokuapp.com";

export const repositoryManagementApi = {
  getAllRepo: async () => {
    const response = await fetch(baseUrl + "/repo/get-all-repository", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const data = await response.json();
    return data;
  },

  deleteRepo: async (repoName: any) => {
    const response = await fetch(
      baseUrl + "/repo/delete-repository/" + repoName,
      {
        method: "DELETE",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("userToken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
      }
    );
    const data = await response.json();
    return data;
  },

  editRepo: async (repoName: any, repoBody: any) => {
    const response = await fetch(
      baseUrl + "/repo/update-repository/" + repoName,
      {
        method: "PUT",
        headers: new Headers({
          Authorization: "Bearer " + localStorage.getItem("userToken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ ...repoBody }),
      }
    );
    const data = await response.json();
    return data;
  },

  addRepo: async (repoBody: any) => {
    const response = await fetch(baseUrl + "/repo/create-repository", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ ...repoBody }),
    });
    const data = await response.json();
    return data;
  },

  login: async (body: any) => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    const response = await fetch(baseUrl + "/auth/login", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ ...body }),
    });
    const data = await response.json();
    localStorage.setItem("userToken", data.token);
    localStorage.setItem("userId", data.userId);
    return data;
  },

  createUser: async (userBody: any) => {
    const response = await fetch(baseUrl + "/user/create-user", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ ...userBody }),
    });
    const data = await response.json();
    return data;
  },

  getUserById: async () => {
    const id = localStorage.getItem("userId");
    const response = await fetch(baseUrl + "/user/get-by-id-user/" + id, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const data = await response.json();
    return data;
  },

  deleteUser: async () => {
    const response = await fetch(baseUrl + "/user/delete-user/", {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    });
    const data = await response.json();
    localStorage.removeItem("userId");
    localStorage.removeItem("userToken");
    return data;
  },

  editUser: async (userBody: any) => {
    const response = await fetch(baseUrl + "/user/update-user/", {
      method: "PUT",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ ...userBody }),
    });
    const data = await response.json();
    return data;
  },

  createSecurityKeys: async (body: any) => {
    const response = await fetch(baseUrl + "/security/create-security-keys", {
      method: "POST",
      headers: new Headers({
        Authorization: "Bearer " + localStorage.getItem("userToken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ ...body }),
    });
    const data = await response.json();
    return data;
  },

  getSecurityKeys: async (userEmail: any) => {
    const response = await fetch(
      baseUrl + "/security/get-security-key-references",
      {
        method: "POST",
        headers: new Headers({
          Accept: "application/json",
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ email: userEmail }),
      }
    );
    const data = await response.json();
    return data;
  },

  recoverPassword: async (body: any) => {
    const response = await fetch(baseUrl + "/security/recover-password", {
      method: "POST",
      headers: new Headers({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ ...body }),
    });
    const data = await response.json();
    return data;
  },
};
