export interface IDriveDownloadFileCase{
    execute: () => Promise<Blob>
}