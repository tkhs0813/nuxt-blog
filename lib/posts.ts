export function getAllTags() {}

export async function getPostData(id: string) {
  const postData = await require(`../static/output/${id}.json`)

  return postData
}

export function getSortedPostsData() {}
