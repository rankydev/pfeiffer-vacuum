import {
  renderHeadline,
  renderSubline,
  renderParagaph,
  renderSpan,
} from './richtext.js'

describe('richtext util', () => {
  describe('renderHeadline', () => {
    it('should return the correct html given a headline and a heading level', () => {
      const headline = 'Some headline'
      const level = 3
      const result = renderHeadline(headline, level)

      expect(result).toBe(`<h${level}>${headline}</h${level}>`)
    })
  })

  describe('renderSubline', () => {
    it('should return the correct html given a subline and a level', () => {
      const subline = 'Some subline'
      const level = 3
      const result = renderSubline(subline, level)
      const classes = `tw-subline tw-subline-${level}`

      expect(result).toBe(`<p><span class="${classes}">${subline}</span></p>`)
    })
  })

  describe('renderParagaph', () => {
    it('should return the correct html given content', () => {
      const content = 'Some conent'
      const result = renderParagaph(content)

      expect(result).toBe(`<p>${content}</p>`)
    })
  })

  describe('renderSpan', () => {
    it('should return the correct html given contnent and css classes', () => {
      const content = 'Some span'
      const classes = 'some-class another-class'
      const result = renderSpan(content, classes)

      expect(result).toBe(`<span class="${classes}">${content}</span>`)
    })
  })
})
