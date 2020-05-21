import { fileMap } from '../static/summary.json'

export function getAllTags() {}

export async function getPostData(id: string) {
  const postData = await require(`../static/output/${id}.json`)

  return postData
}

export function getFileNames(): string[] {
  const fileNames: string[] = []
  Object.keys(fileMap).forEach((key) => {
    fileNames.push(key)
  })

  return fileNames
}

function getPostsData() {
  const fileNames = getFileNames()
  return fileNames.map((fileName: string) => {
    // @ts-ignore
    const file = fileMap[fileName]
    const id = file.sourceBase.replace(/\.md$/, '')

    return {
      id,
      title: file.title,
      date: file.date,
      tags: file.tags
    }
  })
}

export function getSortedPostsData() {
  const postsData = getPostsData()

  return postsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
