import middy from '@middy/core'
import jsonBodyParser from '@middy/http-json-body-parser'
import { Handler } from 'aws-lambda'
import { successResponse, errorResponse } from '../utils/http'
import { CommitInfo, HttpGenericResponse } from '../type/git-diff'
import { getCommitById, getCommitDiff } from '../services/git'
import { parseGitPatch, patchDiff } from '../utils/helper'

const commitById: Handler = async ({
  pathParameters,
}: {
  pathParameters: { owner: string; repository: string; oid: string }
}): Promise<HttpGenericResponse> => {
  try {
    const { owner, repository, oid } = pathParameters
    const result = await getCommitById(owner, repository, oid)
    const { sha, commit, author, committer, parents } = result
    const reponse: CommitInfo = {
      oid: sha,
      subject: commit.message.split('\n\n')[0],
      body: commit.message.split('\n\n').slice(1).join('\n'),
      author: { ...commit.author, avatarUrl: author.avatar_url },
      committer: { ...commit.committer, avatarUrl: committer.avatar_url },
      parents: parents.map((parent: { sha: string }) => ({ oid: parent.sha })),
    }
    return successResponse(reponse)
  } catch (err) {
    return errorResponse({ message: 'An error occurred' })
  }
}

export const commit = middy(commitById).use(jsonBodyParser())

const commiDiff: Handler = async ({
  pathParameters,
}: {
  pathParameters: { owner: string; repository: string; oid: string }
}): Promise<HttpGenericResponse> => {
  try {
    const { owner, repository, oid } = pathParameters
    const { files } = await getCommitById(owner, repository, oid)
    const result = await parseGitPatch(files)
    return successResponse(result)
  } catch (err) {
    return errorResponse({ message: 'An error occurred' })
  }
}

export const diff = middy(commiDiff).use(jsonBodyParser())
