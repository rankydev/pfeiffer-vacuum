export const renderHeadline = (content, level) =>
  `<h${level}>${content}</h${level}>`

export const renderSubline = (content, level) => {
  const classes = `tw-subline tw-subline-${level}`
  return renderParagaph(renderSpan(content, classes))
}

export const renderParagaph = (content) => `<p>${content}</p>`

export const renderSpan = (content, classes) =>
  `<span class="${classes}">${content}</span>`
