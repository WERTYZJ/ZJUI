function FileSize() {
  return (fileSize) => {
    if (!fileSize) {
      return 'fileSizeErr'
    }
    var a = fileSize / 1024
    if (a < 1) {
      return (a / 1024).toFixed(2) + 'B'
    }
    if (a < 1024 && a >= 1) {
      return a.toFixed(2) + 'KB'
    }
    if (a >= 1024 && a < 1024 * 1024) {
      return (a / 1024).toFixed(2) + 'MB'
    }
    if (a >= 1024 * 1024) {
      return (a / 1024).toFixed(2) + 'GB'
    }
  };
}
export default FileSize;