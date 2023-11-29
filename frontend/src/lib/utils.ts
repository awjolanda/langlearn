import { BaseCourse, ObjectWithId } from "@/types/general";

export const validateJSON = (json: string) => {
  try {
    JSON.parse(json);
  } catch (error) {
    return false;
  }
  return true;
};

export const isStringNullOrEmpty = (string?: string) => {
  return string === null || string === undefined || string === "";
};

export const areStringsNullOrEmpty = (...strings: any[]) => {
  return strings.some(isStringNullOrEmpty);
};

export const updateArrayWithElement = <T extends ObjectWithId>(
  updatedElement: T,
  srcArr: T[]
): T[] => {
  const index = srcArr.findIndex((element) => element.id === updatedElement.id);
  const updatedArr: T[] = [...srcArr];
  updatedArr[index] = updatedElement;
  return updatedArr;
};
