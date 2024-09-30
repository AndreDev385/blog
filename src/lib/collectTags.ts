export function collectTags(tags: string[], tagsToAdd: string[]): void {
  for (const tag of tagsToAdd) {
    if (!tags.includes(tag)) {
      tags.push(tag);
    }
  }
}
