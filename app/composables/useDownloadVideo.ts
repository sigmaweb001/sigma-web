export function useDownloadVideo() {
  const toast = useToast()

  async function startDownload(url: string, filename: string, isEn: boolean) {
    let loadingToast: any
    try {
      // Show loading state
      loadingToast = toast.add({
        title: isEn ? 'Preparing to download...' : 'Đang chuẩn bị tải xuống...',
        description: isEn ? 'Please wait for a moment' : 'Vui lòng đợi trong giây lát',
        color: 'info',
        duration: Infinity,
        close: false,
      })

      // Fetch the video as a blob
      const response = await fetch(url)
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const downloadAnchor = document.createElement('a')

      // Use a simple anchor for download
      if (downloadAnchor) {
        downloadAnchor.href = objectUrl
        downloadAnchor.download = filename
        downloadAnchor.click()
        // Revoke the object URL after a short delay
        setTimeout(() => URL.revokeObjectURL(objectUrl), 1000)
      }

      toast.remove(loadingToast.id)

      toast.add({
        title: isEn ? 'Download successful' : 'Tải xuống thành công',
        description: isEn ? filename : 'Tải xuống thành công',
        color: 'success',
      })
    }
    catch (error) {
      toast.add({
        title: isEn ? 'Download failed' : 'Tải xuống thất bại',
        description: isEn ? 'An error occurred while downloading the video' : 'Có lỗi xảy ra khi tải video',
        color: 'error',
      })
      console.error('Download error:', error)
      toast.remove(loadingToast.id)
    }
  }

  return {
    startDownload,
  }
}
