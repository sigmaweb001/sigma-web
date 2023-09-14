import speakingurl from 'speakingurl'

// Courtesy of Kitty Giraudel
// https://twitter.com/KittyGiraudel
// https://kittygiraudel.com/2022/05/19/table-of-contents-with-sanity-portable-text/

function getChildrenText(props) {
  return props.children
    .map(node => (typeof node === 'string' ? node : node.text || ''))
    .join('')
}

function findHeadings(ast) {
  return filter(ast, node => /h\d/.test(node.style)).map((node) => {
    const text = getChildrenText(node)
    const slug = speakingurl(text)

    return { ...node, text, slug }
  })
}

function filter(ast, match) {
  return ast.reduce((acc, node) => {
    if (match(node))
      acc.push(node)
    if (node.children)
      acc.push(...filter(node.children, match))
    return acc
  }, [])
}

function get(object, path) {
  return path.reduce((prev, curr) => prev[curr], object)
}
function getObjectPath(path) {
  return path.length === 0
    ? path
    : ['subheadings'].concat(path.join('.subheadings.').split('.'))
}

function parseOutline(ast) {
  // console.log(ast);
  const outline = { subheadings: [] }
  const headings = findHeadings(ast)
  const path = []
  let lastLevel = 0

  headings.forEach((heading) => {
    const level = Number(heading.style.slice(1))
    heading.subheadings = []

    if (level < lastLevel)
      for (let i = lastLevel; i >= level; i--) path.pop()
    else if (level === lastLevel)
      path.pop()

    const prop = get(outline, getObjectPath(path))
    prop.subheadings.push(heading)
    path.push(prop.subheadings.length - 1)
    lastLevel = level
  })

  return outline.subheadings
}

export default parseOutline
