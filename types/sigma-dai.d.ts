declare global {
  interface Window {
    SigmaDaiSdk: {
      processURL: (url: string) => { playerUrl: string, adsUrl: string }
      createSigmaDai: (config: {
        video: HTMLVideoElement
        adContainer: HTMLElement | null
        adsUrl: string
      }) => Promise<{
        onEventTracking: (event: string, callback: (payload: any) => void) => void
        sigmaPlayer: { attachHls: (hls: any) => void }
        destroy: () => void
      }>
    }
    Hls: {
      isSupported: () => boolean
      new(): {
        loadSource: (url: string) => void
        attachMedia: (video: HTMLVideoElement) => void
      }
    }
  }
}

export {}
