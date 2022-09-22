import { nanoid } from 'nanoid'

export default (val = '') => {
  return val + nanoid()
}
