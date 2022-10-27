module.exports = function (block) {
  if (block.description.length > 0) {
    block.description = {
      type: 'doc',
      content: block.description[0].richtext.content,
    }
  }
}
