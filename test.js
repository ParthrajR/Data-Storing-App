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
  
  const sizes = ['176.82 KB', '900.33 KB'];
  const totalSizeFormatted = sumFormattedFileSizes(sizes);
  
  console.log(`Total Size: ${totalSizeFormatted}`);
  