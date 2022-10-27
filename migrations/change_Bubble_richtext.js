module.exports = function (block) {
  if (block.richtext.length > 0) {
    block.richtext = {
      type: 'doc',
      content: block.richtext[0].richtext.content,
    }
  }
}
