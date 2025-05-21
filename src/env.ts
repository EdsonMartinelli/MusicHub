export const ENV_TYPE: typeof process.env.NODE_ENV =
  process.env.NODE_ENV || "development";

export const GOOGLE_API_KEY: string = process.env.GOOGLE_KEY || "";

export const DRIVE_FOLDER_ID: string[] = getArrayFromEnv<string>(
  process.env.DRIVE_FOLDER_ID
);

export const YT_PLAYLIST_ID: string[] = getArrayFromEnv<string>(
  process.env.YT_PLAYLIST_ID
);

export const ORIGIN: string = process.env.NEXT_PUBLIC_ORIGIN || "";

function getArrayFromEnv<T>(variable: string | undefined): T[] {
  if (variable == null) return [];
  try {
    return JSON.parse(variable) as T[];
  } catch (exception) {
    return [];
  }
}
