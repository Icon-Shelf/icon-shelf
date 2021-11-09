import path from 'path';
import { promises as fs, statSync } from 'fs';

export async function getAllFiles(folderPath: string) {
  const entries = await fs.readdir(folderPath, { withFileTypes: true });

  // Get files within the current directory and add a path key to the file objects
  const files = entries
    .filter((file) => !file.isDirectory() && !/^\..*/.test(file.name))
    .map((file) => {
      const iconPath = path.join(folderPath, file.name);
      const fileStats = statSync(iconPath);

      return {
        ...file,
        imageSrc: iconPath,
        byteSize: fileStats.size,
        createdAt: fileStats.birthtimeMs,
        updatedAt: fileStats.mtimeMs,
      };
    });

  // Get folders within the current directory
  // const folders = entries.filter((folder) => folder.isDirectory());

  /*
    Add the found files within the subdirectory to the files array by calling the
    current function itself
  */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const folderFilesPromise: Promise<any>[] = [];

  // folders.forEach((folder) => {
  //   folderFilesPromise.push(getAllFiles(path.join(folderPath, folder.name)));
  // });

  // const foldersFiles = await Promise.all(folderFilesPromise);

  // foldersFiles.forEach((folderFiles) => files.push(...folderFiles));

  return files;
}
