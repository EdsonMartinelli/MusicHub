import { DriveFindFilesCase } from "../cases/driveFindFilesCase/DriveFindFilesCase";
import { DriveFindFilesController } from "../controllers/DriveFindFilesController";

export function driveFindFilesFactory(){
    return new DriveFindFilesController(new DriveFindFilesCase())
}