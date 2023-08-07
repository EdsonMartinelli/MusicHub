export interface IDriveFindFilesCase {
  execute: () => Promise<{
    list: { name: string; id: string; createdTime: string }[];
  }>;
}
