// -------------------------------
// TYPES / INTERFACES
// -------------------------------

/**
 *  RGB object type with red, green and blue components.
 */
export type RGB = {
  r: number
  g: number
  b: number
}
/**
*  RGB list (array) type with red, green and blue components.
*/
export type RgbArray = [number, number, number]
/**
*  Hexadecimal representation of a color.
*/
export type HexColor = string
/**
*  Color represented as hexadecimal value or as RGB object or list.
*/
export type Color = RGB | RgbArray | HexColor
/**
*  Interface for defining black and white colors; used to amplify the contrast
*  of the color inversion.
*/
export interface BlackWhite {
  black: HexColor
  white: HexColor
  threshold?: number
}

// -------------------------------
// CONSTANTS
// -------------------------------

const DEFAULT_THRESHOLD = Math.sqrt(1.05 * 0.05) - 0.05
const RE_HEX = /^(?:[0-9a-f]{3}){1,2}$/i
const DEFAULT_BW: BlackWhite = {
  black: '#000000',
  white: '#ffffff',
  threshold: DEFAULT_THRESHOLD,
}

// -------------------------------
// HELPER METHODS
// -------------------------------

function padz(str: string, len: number = 2): string {
  return (new Array(len).join('0') + str).slice(-len)
}

function hexToRgbArray(hex: string): RgbArray {
  if (hex.slice(0, 1) === '#') hex = hex.slice(1)
  if (!RE_HEX.test(hex)) throw new Error(`Invalid HEX color: "${hex}"`)
  // normalize / convert 3-chars hex to 6-chars.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  return [
    parseInt(hex.slice(0, 2), 16), // r
    parseInt(hex.slice(2, 4), 16), // g
    parseInt(hex.slice(4, 6), 16), // b
  ]
}

function toRgbArray(c: Color): RgbArray {
  if (!c) throw new Error('Invalid color value')
  if (Array.isArray(c)) return c as RgbArray
  return typeof c === 'string' ? hexToRgbArray(c) : [c.r, c.g, c.b]
}

// http://stackoverflow.com/a/3943023/112731
function getLuminance(c: RgbArray): number {
  let i, x
  const a = [] // so we don't mutate
  for (i = 0; i < c.length; i++) {
    x = c[i] / 255
    a[i] = x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2]
}

function invertToBW(color, bw: BlackWhite | boolean, asArr?: boolean): RgbArray | HexColor {
  const options = (bw === true)
    ? DEFAULT_BW
    : Object.assign({}, DEFAULT_BW, bw)
  return getLuminance(color) > options.threshold
    ? (asArr ? hexToRgbArray(options.black) : options.black)
    : (asArr ? hexToRgbArray(options.white) : options.white)
}

// -------------------------------
// PUBLIC MEMBERS
// -------------------------------

/**
*  Generates inverted (opposite) version of the given color.
*  @param {Color} color - Color to be inverted.
*  @param {BlackWhite|boolean} [bw=false] - Whether to amplify the inversion to
*  black or white. Provide an object to customize black/white colors.
*  @returns {HexColor} - Hexadecimal representation of the inverted color.
*/
function invert(color: Color, bw: BlackWhite | boolean = false): HexColor {
  color = toRgbArray(color)
  if (bw) return invertToBW(color, bw) as HexColor
  return '#' + color.map(c => padz((255 - c).toString(16))).join('')
}
export default invert
