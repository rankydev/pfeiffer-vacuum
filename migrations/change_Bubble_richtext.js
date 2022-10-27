module.exports = function (block) {
  if (block.richtext.length > 0) {
    let newRichtext = {
      type: 'doc',
      content: block.richtext[0].richtext.content,
    }
    block.richtext = newRichtext
  }
}
