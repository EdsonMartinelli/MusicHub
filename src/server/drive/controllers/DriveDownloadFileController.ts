import { IDriveDownloadFileCase } from "../cases/driveDownloadFileCase/IDriveDownloadFileCase"

export class DriveDownloadFileController{
    constructor(private readonly driveDownloadFileCase: IDriveDownloadFileCase){}

    async handle(id: string){
        const result = await this.driveDownloadFileCase.execute(id)
        return result
    }
}
