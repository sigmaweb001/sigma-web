<script lang="ts" setup>
const props = defineProps<{
  hideHandle?: boolean
}>()

const TABINDEX = 0
const RENDERED_CLASS = 'rendered'
const inBetween = (actual: number, min: number, max: number): number => {
  if (actual < min) {
    return min
  }

  if (actual > max) {
    return max
  }

  return actual
}
const isMouseEvent = (event: Event): event is MouseEvent => {
  return event.type === 'mousedown'
}

const isElementAffected = (
  element: HTMLElement,
  e: MouseEvent | TouchEvent,
): boolean => {
  const rect = element.getBoundingClientRect()
  let eventX: number, eventY: number
  if (isMouseEvent(e)) {
    eventX = e.clientX
    eventY = e.clientY
  }
  else {
    eventX = e.touches[0].clientX
    eventY = e.touches[0].clientY
  }

  return (
    eventX >= rect.x
    && eventX <= rect.x + rect.width
    && eventY >= rect.y
    && eventY <= rect.y + rect.height
  )
}

const rootEle = shallowRef() as Ref<HTMLElement>

const tabIndex = ref(TABINDEX)
type SlideKey = 'ArrowLeft' | 'ArrowRight'
type Direction = 1 | -1

const KeySlideOffset: Record<SlideKey, Direction> = {
  ArrowLeft: -1,
  ArrowRight: 1,
}

type SlideDirection = 'horizontal' | 'vertical'
type KeyboardMode = 'enabled' | 'disabled'

const slideDirections: Array<SlideDirection> = ['horizontal', 'vertical']

interface Point {
  x: number
  y: number
}

const getTouchPagePoint = (e: TouchEvent): Point => ({
  x: e.touches[0].pageX,
  y: e.touches[0].pageY,
})

const getMousePagePoint = (e: MouseEvent): Point => ({
  x: e.pageX,
  y: e.pageY,
})

const slideAnimationPeriod = 1000 / 60

const firstElement = shallowRef() as Ref<HTMLElement>
const handleElement = shallowRef() as Ref<HTMLElement>

const imageWidth = ref<number>(0)
const imageHeight = ref<number>(0)
const exposure = ref(50)
const slideOnHover = ref(false)
const slideDirection = ref<SlideDirection>('horizontal')

const keyboard = ref<KeyboardMode>('enabled')

const isMouseDown = ref(false)

const animationDirection = ref<Direction | 0>(0)
const transitionTimer = ref<number>()

const isFocused = ref(false)

const dragByHandle = ref(false)

let resizeObserver: ResizeObserver | null = null
let dragStartHandler: ((e: Event) => void) | null = null

function setHandle(newValue: any) {
  dragByHandle.value = newValue.toString().toLowerCase() !== 'false'
}

function getHandle() {
  return dragByHandle.value
}

function setValue(newValue: any) {
  const newExposure = parseFloat(newValue)

  if (newExposure === exposure.value) {
    return
  }

  exposure.value = newExposure
  enableTransition()
  setExposure()
}

function getHover() {
  return slideOnHover.value
}

function setHover(newValue: any) {
  slideOnHover.value = newValue.toString().toLowerCase() !== 'false'
  removeEventListener('mousemove', onMouseMove)
  if (slideOnHover.value) {
    addEventListener('mousemove', onMouseMove)
  }
}

function getDirection() {
  return slideDirection.value
}

function setDirection(newValue: any) {
  slideDirection.value = newValue.toString().toLowerCase()

  slide(0)

  firstElement.value.classList.remove(...slideDirections)

  if (!slideDirections.includes(slideDirection.value)) {
    return
  }

  firstElement.value.classList.add(slideDirection.value)
}

function getObservedAttributes() {
  return ['hover', 'direction']
}

function connectedCallback() {
  if (!rootEle.value.hasAttribute('tabindex')) {
    tabIndex.value = TABINDEX
  }

  dragStartHandler = (e) => {
    e.preventDefault()
    return false
  }
  rootEle.value.addEventListener('dragstart', dragStartHandler)

  resizeObserver = new ResizeObserver(resetDimensions)
  resizeObserver.observe(rootEle.value)

  setExposure(0)

  keyboard.value = 'disabled'

  rootEle.value.addEventListener('keydown', onKeyDown)
  rootEle.value.addEventListener('keyup', onKeyUp)

  rootEle.value.addEventListener('focus', onFocus)
  rootEle.value.addEventListener('blur', onBlur)
  rootEle.value.addEventListener('touchstart', onTouchStart, {
    passive: true,
  })
  rootEle.value.addEventListener('touchmove', onTouchMove, {
    passive: false,
  })
  rootEle.value.addEventListener('touchend', onTouchEnd)
  rootEle.value.addEventListener('mousedown', onMouseDown)

  setHandle(rootEle.value.hasAttribute('handle')
    ? rootEle.value.getAttribute('handle')
    : dragByHandle.value)

  setHover(rootEle.value.hasAttribute('hover')
    ? rootEle.value.getAttribute('hover')
    : slideOnHover.value)

  setDirection(rootEle.value.hasAttribute('direction')
    ? rootEle.value.getAttribute('direction')
    : slideDirection.value)

  resetDimensions()
  if (!rootEle.value.classList.contains(RENDERED_CLASS)) {
    rootEle.value.classList.add(RENDERED_CLASS)
  }
}

onMounted(() => {
  connectedCallback()
})

function disconnectedCallback() {
  if (transitionTimer.value) {
    window.clearTimeout(transitionTimer.value)
  }

  if (dragStartHandler && rootEle.value) {
    rootEle.value.removeEventListener('dragstart', dragStartHandler)
    dragStartHandler = null
  }

  if (rootEle.value) {
    rootEle.value.removeEventListener('keydown', onKeyDown)
    rootEle.value.removeEventListener('keyup', onKeyUp)
    rootEle.value.removeEventListener('focus', onFocus)
    rootEle.value.removeEventListener('blur', onBlur)
    rootEle.value.removeEventListener('touchstart', onTouchStart)
    rootEle.value.removeEventListener('touchmove', onTouchMove)
    rootEle.value.removeEventListener('touchend', onTouchEnd)
    rootEle.value.removeEventListener('mousedown', onMouseDown)
  }

  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onWindowMouseUp)

  removeEventListener('mousemove', onMouseMove)

  if (resizeObserver && rootEle.value) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
}

onBeforeUnmount(() => {
  disconnectedCallback()
})

function attributeChangedCallback(name, oldValue, newValue) {
  if (name === 'hover') {
    setHover(newValue)
  }

  if (name === 'direction') {
    setDirection(newValue)
  }

  if (name === 'keyboard') {
    keyboard.value = newValue === 'disabled' ? 'disabled' : 'enabled'
  }
}
const exposureCssVar = computed(() => `${100 - exposure.value}%`)

function setExposure(increment = 0) {
  exposure.value = inBetween(exposure.value + increment, 0, 100)
}

function slide(increment = 0) {
  setExposure(increment)

  const event = new Event('slide')
  dispatchEvent(event)
}

function onMouseMove(e: MouseEvent) {
  if (isMouseDown.value || slideOnHover.value) {
    const currentPoint = getMousePagePoint(e)
    slideToPage(currentPoint)
  }
};

const bodyUserSelectStyle = ref('')

function onMouseDown(e: MouseEvent) {
  if (slideOnHover.value) {
    return
  }

  if (getHandle() && !isElementAffected(handleElement.value, e)) {
    return
  }

  e.preventDefault()

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onWindowMouseUp)
  isMouseDown.value = true
  enableTransition()

  const currentPoint = getMousePagePoint(e)
  slideToPage(currentPoint)

  // this.focus();
  rootEle.value.focus()
  bodyUserSelectStyle.value = window.document.body.style.userSelect
  window.document.body.style.userSelect = 'none'
};

function onWindowMouseUp() {
  isMouseDown.value = false
  window.document.body.style.userSelect = bodyUserSelectStyle.value
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onWindowMouseUp)
};

const touchStartPoint = ref<Point | null>(null)
const isTouchComparing = ref(false)
const hasTouchMoved = ref(false)

function onTouchStart(e: TouchEvent) {
  if (dragByHandle.value && !isElementAffected(handleElement.value, e)) {
    return
  }

  touchStartPoint.value = getTouchPagePoint(e)

  if (isFocused.value) {
    enableTransition()

    slideToPage(touchStartPoint.value)
  }
};

function onTouchMove(e: TouchEvent) {
  if (touchStartPoint.value === null) {
    return
  }

  const currentPoint = getTouchPagePoint(e)

  if (isTouchComparing.value) {
    slideToPage(currentPoint)
    e.preventDefault()
    return false
  }

  if (!hasTouchMoved.value) {
    const offsetY = Math.abs(currentPoint.y - touchStartPoint.value.y)
    const offsetX = Math.abs(currentPoint.x - touchStartPoint.value.x)

    if (
      (slideDirection.value === 'horizontal' && offsetY < offsetX)
      || (slideDirection.value === 'vertical' && offsetY > offsetX)
    ) {
      isTouchComparing.value = true
      // this.focus();
      rootEle.value.focus()
      slideToPage(currentPoint)
      e.preventDefault()
      return false
    }

    hasTouchMoved.value = true
  }
};

function onTouchEnd() {
  isTouchComparing.value = false
  hasTouchMoved.value = false
  touchStartPoint.value = null
};

function onBlur() {
  stopSlideAnimation()
  isFocused.value = false
  firstElement.value.classList.remove('focused')
}

function onFocus() {
  isFocused.value = true
  firstElement.value.classList.add('focused')
};

function onKeyDown(e: KeyboardEvent) {
  if (keyboard.value === 'disabled') {
    return
  }

  const direction = KeySlideOffset[e.key]

  if (animationDirection.value === direction) {
    return
  }

  if (direction === undefined) {
    return
  }

  animationDirection.value = direction
  startSlideAnimation()
};

function onKeyUp(e: KeyboardEvent) {
  if (keyboard.value === 'disabled') {
    return
  }

  const direction = KeySlideOffset[e.key]

  if (direction === undefined) {
    return
  }

  if (animationDirection.value !== direction) {
    return
  }

  stopSlideAnimation()
}

function slideToPage(currentPoint: Point) {
  if (slideDirection.value === 'horizontal') {
    slideToPageX(currentPoint.x)
  }

  if (slideDirection.value === 'vertical') {
    slideToPageY(currentPoint.y)
  }
}

function slideToPageX(pageX: number) {
  const x = pageX - rootEle.value.getBoundingClientRect().left - window.scrollX
  exposure.value = (x / imageWidth.value) * 100
  slide(0)
}

function slideToPageY(pageY: number) {
  const y = pageY - rootEle.value.getBoundingClientRect().top - window.scrollY
  exposure.value = (y / imageHeight.value) * 100
  slide(0)
}

function enableTransition() {
  const transitionTime = 100
  firstElement.value.style.setProperty(
    '--transition-time',
    `${transitionTime}ms`,
  )

  transitionTimer.value = window.setTimeout(() => {
    firstElement.value.style.setProperty(
      '--transition-time',
      `var(--default-transition-time)`,
    )
    transitionTimer.value = null
  }, transitionTime)
}

function startSlideAnimation() {
  let lastTimestamp: number | null = null
  const initialDirection = animationDirection.value
  firstElement.value.style.setProperty(
    '--transition-time',
    `var(--keyboard-transition-time)`,
  )
  const slide = (now: number) => {
    if (
      animationDirection.value === 0
      || initialDirection !== animationDirection.value
    ) {
      return
    }

    if (lastTimestamp === null) {
      lastTimestamp = now
    }

    const interval = now - lastTimestamp,
      distance = (interval / slideAnimationPeriod) * animationDirection.value
    slide(distance)

    // This is necessary to speed up the key up event in Desktop Safari
    setTimeout(() => window.requestAnimationFrame(slide), 0)

    lastTimestamp = now
  }

  window.requestAnimationFrame(slide)
}

function stopSlideAnimation() {
  animationDirection.value = 0
  firstElement.value.style.setProperty(
    '--transition-time',
    `var(--default-transition-time)`,
  )
}

function resetDimensions() {
  const offsetWidth = rootEle.value.offsetWidth
  const offsetHeight = rootEle.value.offsetHeight
  imageWidth.value = offsetWidth
  imageHeight.value = offsetHeight
};
</script>

<template>
  <div
    ref="rootEle"
    :tabindex="tabIndex"
    class="slider"
  >
    <div
      id="second"
      class="second"
    >
      <slot name="second" />
    </div>
    <div
      ref="firstElement"
      class="first"
      :style="{ '--exposure': exposureCssVar }"
    >
      <div class="first-overlay">
        <div class="first-overlay-container">
          <slot name="first" />
        </div>
      </div>
      <div class="handle-container">
        <div class="divider" />
        <div
          ref="handleElement"
          class="handle"
        >
          <slot name="handle">
            <!-- Custom handle overlay -->
            <div
              v-if="!hideHandle"
              class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <button
                class="pointer-events-auto backdrop-blur-md bg-gray-900/60 border border-white/20 hover:bg-gray-900/80 transition-colors duration-200 rounded-full flex items-center gap-1 px-2 py-1 text-white text-sm font-semibold shadow-lg"
              >
                <UIcon
                  name="i-heroicons:chevron-left-20-solid"
                  class="size-6"
                />
                <span
                  class="truncate"
                >
                  Kéo để so sánh
                </span>
                <UIcon
                  name="i-heroicons:chevron-right-20-solid"
                  class="size-6"
                />
              </button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.slider {
  --divider-width: 1px;
  --divider-color: #fff;
  --divider-shadow: none;
  --default-handle-width: 50px;
  --default-handle-color: #fff;
  --default-handle-opacity: 1;
  --default-handle-shadow: none;
  --handle-position-start: 50%;
  position: relative;
  display: inline-block;
  overflow: hidden;
  line-height: 0;
}

.slotted {
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-drag: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.first {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  line-height: normal;
  font-size: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  --exposure: 50%;
  --keyboard-transition-time: 0ms;
  --default-transition-time: 0ms;
  --transition-time: var(--default-transition-time);
}

.first .first-overlay-container {
  position: relative;
  clip-path: inset(0 var(--exposure) 0 0);
  transition: clip-path var(--transition-time);
  height: 100%;
}

.first .first-overlay {
  overflow: hidden;
  height: 100%;
}

.first.focused {
  will-change: clip-path;
}

.first.focused .first-overlay-container {
  will-change: clip-path;
}

.second {
  position: relative;
}

.handle-container {
  transform: translateX(50%);
  position: absolute;
  top: 0;
  right: var(--exposure);
  height: 100%;
  transition: right var(--transition-time), bottom var(--transition-time);
}

.focused .handle-container {
  will-change: right;
}

.divider {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.divider:after {
  content: ' ';
  display: block;
  height: 100%;
  border-left-width: var(--divider-width);
  border-left-style: solid;
  border-left-color: var(--divider-color);
  box-shadow: var(--divider-shadow);
}

.handle {
  position: absolute;
  top: var(--handle-position-start);
  pointer-events: none;
  box-sizing: border-box;
  margin-left: 1px;
  transform: translate(calc(-50% - 0.5px), -50%);
  line-height: 0;
}

.default-handle {
  width: var(--default-handle-width);
  opacity: var(--default-handle-opacity);
  transition: all 1s;
  filter: drop-shadow(var(--default-handle-shadow));
}

.default-handle path {
  stroke: var(--default-handle-color);
}

.vertical .first-overlay-container {
  clip-path: inset(0 0 var(--exposure) 0);
}

.vertical .handle-container {
  transform: translateY(50%);
  height: auto;
  top: unset;
  bottom: var(--exposure);
  width: 100%;
  left: 0;
  flex-direction: row;
}

.vertical .divider:after {
  height: 1px;
  width: 100%;
  border-top-width: var(--divider-width);
  border-top-style: solid;
  border-top-color: var(--divider-color);
  border-left: 0;
}

.vertical .handle {
  top: auto;
  left: var(--handle-position-start);
  transform: translate(calc(-50% - 0.5px), -50%) rotate(90deg);
}
</style>
