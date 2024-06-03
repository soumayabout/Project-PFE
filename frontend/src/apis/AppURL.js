import { BaseURL } from "./BaseURL";

export const AppURL = {
  register: () => `${BaseURL}/users/register`,
  login: () => `${BaseURL}/users/login`,
  user: () => `${BaseURL}/users/user`,
  listUsers: () => `${BaseURL}/users`,

  checkToken: () => `${BaseURL}/check-token`,

  storeSpecialty: () => `${BaseURL}/specialties`,
  updateSpecialty: (id) => `${BaseURL}/specialties/${id}/update`,
  deleteSpecialty: (id) => `${BaseURL}/specialties/${id}/delete`,
  showSpecialty: (id) => `${BaseURL}/specialties/${id}/show`,
  listSpecialties: () => `${BaseURL}/specialties`,

  storeProject: () => `${BaseURL}/projects`,
  updateProject: (id) => `${BaseURL}/projects/${id}/update`,
  deleteProject: (id) => `${BaseURL}/projects/${id}/delete`,
  showProject: (id) => `${BaseURL}/projects/${id}/show`,
  listProjects: () => `${BaseURL}/projects`,

  projectChoice: () => `${BaseURL}/projects/choices`,
  projectschoosed: () => `${BaseURL}/projects/choosed`,
  userprojectChoice: (id) => `${BaseURL}/projects/choices/${id}`,
};
