import { DriveDownloadFileCase } from "../cases/driveDownloadFileCase/DriveDownloadFileCase";
import { DriveDownloadFileController } from "../controllers/DriveDownloadFileController";

export function driveDownloadFileFactory(){
    return new DriveDownloadFileController(new DriveDownloadFileCase())
}