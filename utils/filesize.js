const formatFileSize = (sizeInBytes) => {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
    let size = sizeInBytes;
    let unitIndex = 0;
  
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
  
    return `${size.toFixed(2)} ${units[unitIndex]}`;
  };

  function sumFormattedFileSizes(sizes) {
    const totalSizeBytes = sizes.reduce((accumulator, size) => {
      const [value, unit] = size.split(' ');
  
      // Convert to bytes based on unit
      const sizeInBytes = parseFloat(value) * getConversionFactor(unit);
  
      return accumulator + sizeInBytes;
    }, 0);
  
    return formatBytes(totalSizeBytes);
  }

  function formatBytes(bytes) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
  
    for (let i = 0; i < units.length; i++) {
      if (size < 1024 || i === units.length - 1) {
        return `${size.toFixed(2)} ${units[i]}`;
      }
      size /= 1024;
    }
  }

  function getConversionFactor(unit) {
    const unitFactors = {
      'B': 1,
      'KB': 1024,
      'MB': 1024 * 1024,
      'GB': 1024 * 1024 * 1024,
      'TB': 1024 * 1024 * 1024 * 1024,
    };
  
    return unitFactors[unit] || 1;
  }

  module.exports = { formatFileSize, sumFormattedFileSizes,  formatBytes, getConversionFactor}