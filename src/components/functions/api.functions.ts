import { repositoryManagementApi } from "../apis/repositoryManagementApi";
import { gitHubApi } from "../apis/githubApi";

export const Api = {
  getNotes: async () => {
    const data: [] = await repositoryManagementApi.getAllRepo();
    return data;
  },

  logUser: async (user: any) => {
    const apiAnswer = await repositoryManagementApi.login(user);
    try {
      if (apiAnswer.message.includes("Wrong password.")) {
        alert("Wrong password.");
      } else if (apiAnswer.message.includes("Email not found.")) {
        alert("Email not registered.");
      }
    } catch (err) {
      alert("Successfully logged in!");
      return await Api.getLoggedUser();
    }
  },

  getLoggedUser: async () => {
    return await repositoryManagementApi.getUserById();
  },

  getKeyReferences: async (userEmail: any) => {
    const data: [] = await repositoryManagementApi.getSecurityKeys(userEmail);
    return data;
  },

  sendKeys: async (userEmail: any, newPassword: any, keys: any) => {
    const response = await repositoryManagementApi.recoverPassword({
      email: userEmail,
      password: newPassword,
      keys: [keys.key1, keys.key2, keys.key3],
    });

    try {
      if (response.message) {
        alert(response.message);
        return true;
      } else {
        alert("Password updated!");
        return false;
      }
    } catch (err) {
      alert("Password updated!");
      return false;
    }
  },

  createSecuritKeys: async (userEmail: any, keys: any) => {
    const response = await repositoryManagementApi.createSecurityKeys({
      email: userEmail,
      keys: [
        { key: keys.key1, reference: keys.reference1 },
        { key: keys.key2, reference: keys.reference2 },
        { key: keys.key3, reference: keys.reference3 },
      ],
    });

    try {
      if (response.message.includes("Security keys already registered")) {
        alert("Security keys already registered.");
        return false;
      }
    } catch (err) {
      alert("Security keys created.");
      return true;
    }
  },

  editUser: async (editedUser: any) => {
    const updates = { ...editedUser };
    const response = await repositoryManagementApi.editUser(updates);
    if (response.name) {
      alert("Profile updated");
      return true;
    } else {
      if (response.message.includes("at least, 6 characters")) {
        alert("The password must have, at least, 6 characters.");
        return false;
      } else {
        alert("There was an error updating the profile.");
        return false;
      }
    }
  },

  deleteUser: async () => {
    if (window.confirm("Are you sure to delete your profile?")) {
      await repositoryManagementApi.deleteUser().then(() => {
        window.location.reload();
      });
    }
  },

  createUser: async (newUser: any) => {
    const apiAnswer = await repositoryManagementApi.createUser(newUser);

    try {
      if (apiAnswer.message.includes("Email already exists in database")) {
        alert("Email already registrated.");
        return false;
      } else if (apiAnswer.message.includes("at least, 6 characters")) {
        alert("The password must have, at least, 6 characters.");
        return false;
      }
    } catch (err) {
      alert("Successfully registered!");
      return true;
    }
  },

  getAllRepositories: async (username: any) => {
    const repos: [] = await gitHubApi.getRepositories(username).then((data) =>
      data.sort((a: any, b: any) => {
        return a.name.toLowerCase() < b.name.toLowerCase()
          ? -1
          : a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : 0;
      })
    );
    return repos;
  },

  createNote: async (repo: any) => {
    return await repositoryManagementApi.addRepo(repo);
  },

  deleteNote: async (repoName: any) => {
    if (window.confirm("Are you sure to delete this note?")) {
      repositoryManagementApi.deleteRepo(repoName);
    }
  },

  updateNote: async (repoName: any, newNote: any) => {
    repositoryManagementApi.editRepo(repoName, newNote);
  },

  sortFunction: (arr: any) => {
    const priorityHigh = arr
      .filter((i: any) => i.priority === "High")
      .sort((a: any, b: any) => {
        return a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 0 : -1;
      });
    const priorityMedium = arr
      .filter((i: any) => i.priority === "Medium")
      .sort((a: any, b: any) => {
        return a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 0 : -1;
      });
    const priorityLow = arr
      .filter((i: any) => i.priority === "Low")
      .sort((a: any, b: any) => {
        return a.deadline > b.deadline ? 1 : a.deadline === b.deadline ? 0 : -1;
      });

    return priorityHigh.concat(priorityMedium).concat(priorityLow);
  },
};
