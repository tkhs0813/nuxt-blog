import {sourceFileArray, fileMap} from '../summary.json'

export function getAllPostId(): string[] {
  let ids = []
  for(let i = 0; i < sourceFileArray.length; i++) {
    const sourceFile = sourceFileArray[i]
    let id = ''
    id = sourceFile.replace(/\.md/, '')
    id = id.replace(/posts\//, '')
    ids.push(id)
  }
  return ids
}

export function getAllTags() {}

export async function getPostData(id: string) {
  const postData = await require(`../output/${id}.json`)

  return postData
}

export function getSortedPostsData() {}
