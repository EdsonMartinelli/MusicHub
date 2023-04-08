import { IDriveFindFilesCase } from "../cases/driveFindFilesCase/IDriveFindFilesCase"

export class DriveFindFilesController{
    constructor(private readonly driveFindFilesCase: IDriveFindFilesCase){}

    async handle(){
        const result = await this.driveFindFilesCase.execute()
        return result
    }
}