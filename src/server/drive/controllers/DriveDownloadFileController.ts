import { IDriveDownloadFileCase } from "../cases/driveDownloadFileCase/IDriveDownloadFileCase"

export class DriveDownloadFileController{
    constructor(private readonly driveDownloadFileCase: IDriveDownloadFileCase){}

    async handle(){
        const result = await this.driveDownloadFileCase.execute()
        return result
    }
}
