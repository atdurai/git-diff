import { GitFile } from '../type/git'
export const parseGitPatch = async (files: GitFile[]) => {
  return files.map((file) => ({
    changeKind: file.status.toUpperCase(),
    baseFile: { path: file.filename },
    headFile: { path: file.filename },
    patch: file.patch,
  }))
}
