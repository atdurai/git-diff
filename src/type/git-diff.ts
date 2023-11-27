import { APIGatewayEvent } from 'aws-lambda'

export interface HttpGenericResponse {
  statusCode: number
  headers?: any
  body?: any
}

export interface GenericAPIEvent extends Omit<APIGatewayEvent, 'body'> {}

export interface CommitInfo {
  oid: string
  subject: string
  body: string
  author: GitUser
  committer: GitUser
  parents: {
    oid: string
  }[]
}

interface GitUser {
  name: string
  email: string
  date: Date
  avatarUrl: string
}

export interface CommitDiff {
  changeKind: ChangeKind
  baseFile: File | null
  headFile: File | null
  //hunks: Hunk[]
  patch: string
}

interface File {
  path: string
}

interface Hunk {
  header: string
  lines: Line[]
}

interface Line {
  baseLineNumber: number | null
  headLineNumber: number | null
  content: string
}

enum ChangeKind {
  ADDED,
  COPIED,
  DELETED,
  MODIFIED,
  RENAMED,
  TYPE_CHANGED,
}
