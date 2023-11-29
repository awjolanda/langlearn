import { BaseCourse } from "@/types/general";

const baseUrl = "http://localhost:3001/api";
const coursesUrl = baseUrl + "/courses";

export const createCourse = async (course: BaseCourse) => {
  const response = await fetch(coursesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok)
    return Promise.reject("Ein Fehler ist aufgetreten: " + response.status);

  return await response.json();
};

export const updateCourse = async (id: Number, course: BaseCourse) => {
  const response = await fetch(`${coursesUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  if (!response.ok)
    return Promise.reject("Ein Fehler ist aufgetreten: " + response.status);
  return await response.json();
};

export const deleteCourse = async (id: Number) => {
  const response = await fetch(`${coursesUrl}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok)
    return Promise.reject("Ein Fehler ist aufgetreten: " + response.status);
};
