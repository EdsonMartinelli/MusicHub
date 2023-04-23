export interface IDriveDownloadFileCase{
    execute: (id: string) => Promise<Blob>
}