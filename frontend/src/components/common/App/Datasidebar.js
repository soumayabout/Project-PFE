import React from "react";
import { BiGridAlt, BiListUl, BiPlusCircle, BiUser } from "react-icons/bi";

export const AdminDatasidebar = [
  {
    title: "Tableau de bord",
    link: "/admin/dashboard",
    icon: <BiGridAlt />,
  },
  {
    title: "Utilisateur",
    icon: <BiUser />,
    subItems: [
      {
        title: "Liste des utilisateurs",
        subIcon: <BiListUl />,
        link: "/admin/users",
      },
      {
        title: "Nouveau utilisateur",
        subIcon: <BiPlusCircle />,
        link: "/admin/users/new",
      },
    ],
  },
  {
    title: "Spécialité",
    icon: <BiListUl />,
    subItems: [
      {
        title: "Liste des spécialités",
        subIcon: <BiListUl />,
        link: "/admin/specialties",
      },
      {
        title: "Nouvelle spécialité",
        subIcon: <BiPlusCircle />,
        link: "/admin/specialties/new",
      },
    ],
  },
].map((item, index) => ({ ...item, id: index + 1 }));

export const StudentDatasidebar = [
  {
    title: "Tableau de bord",
    link: "/student/dashboard",
    icon: <BiGridAlt />,
  },
  {
    title: "Projet",
    icon: <BiListUl />,
    subItems: [
      {
        title: "Choisir un projet",
        subIcon: <BiPlusCircle />,
        link: "/student/choose/project",
      },
      {
        title: "Mon Project",
        subIcon: <BiPlusCircle />,
        link: "/student/project",
      },
    ],
  },
].map((item, index) => ({ ...item, id: index + 1 }));

export const ProfDatasidebar = [
  {
    title: "Tableau de bord",
    link: "/teacher/dashboard",
    icon: <BiGridAlt />,
  },
  {
    title: "Projet",
    icon: <BiListUl />,
    subItems: [
      {
        title: "Ajouter un projet",
        subIcon: <BiPlusCircle />,
        link: "/teacher/project/new",
      },
      {
        title: "Liste des projet",
        subIcon: <BiListUl />,
        link: "/teacher/projects",
      },
      {
        title: "Projects choisi",
        subIcon: <BiListUl />,
        link: "/teacher/choosed/projects",
      },
    ],
  },
].map((item, index) => ({ ...item, id: index + 1 }));
