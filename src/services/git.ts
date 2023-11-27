const { API_URL = '', API_KEY = '' } = process.env
import { GitCommitInfo } from '../type/git'
import axios from 'axios'

export const getCommitById = async (
  owner: string,
  repo: string,
  id: string
) => {
  const headers = { Authorization: `Bearer ${API_KEY}` }
  return await axios
    .get(`${API_URL}/repos/${owner}/${repo}/commits/${id}`, { headers })
    .then((response: { data: GitCommitInfo }) => response.data)
}

export const getCommitDiff = async (
  owner: string,
  repo: string,
  pid: string,
  id: string
) => {
  const headers = { Authorization: `Bearer ${API_KEY}` }
  return await axios
    .get(`${API_URL}/repos/${owner}/${repo}/compare/${pid}...${id}`, {
      headers,
    })
    .then((response: { data: any }) => response.data)
}
