export interface GitCommitInfo {
  sha: string
  commit: {
    author: GitUser
    committer: GitUser
    message: string
  }
  author: User | null
  committer: User | null
  parents: {
    sha: string
  }[]
  files: GitFile[]
}

interface GitUser {
  name: string
  email: string
  date: Date
}

interface User {
  id: number
  avatar_url: string
}

export interface GitFile {
  filename: string
  status: string
  patch: string
}
