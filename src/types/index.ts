export const AGE_LIMITS = {
  LEVEL1: "LEVEL1",
  LEVEL2: "LEVEL2",
  LEVEL3: "LEVEL3",
  LEVEL4: "LEVEL4",
  LEVEL5: "LEVEL5",
} as const;

export const AGE_LIMIT = {
  LEVEL1: "Suitable for all",
  LEVEL2: "Parental Guidance",
  LEVEL3: "Suitable for 12 years and over",
  LEVEL4: "Suitable only for 15 years and over",
  LEVEL5: "Suitable only for adult",
} as const;

export type AgeLimit = keyof typeof AGE_LIMIT;

export type Film = {
  _id: string;
  cover_image: string;
  title: string;
  description: string;
  age_limit: AgeLimit;
};
