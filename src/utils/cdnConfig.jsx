// CDN configuration
const CDN_URL = process.env.REACT_APP_CDN_URL || '';

export const getCDNUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${CDN_URL}${path.startsWith('/') ? path : `/${path}`}`;
};

// Image CDN transformations
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url) return '';
  
  const {
    width,
    height,
    quality = 80,
    format = 'webp'
  } = options;

  const params = new URLSearchParams();
  
  if (width) params.append('w', width);
  if (height) params.append('h', height);
  if (quality) params.append('q', quality);
  if (format) params.append('fm', format);

  const baseUrl = getCDNUrl(url);
  return `${baseUrl}${params.toString() ? `?${params.toString()}` : ''}`;
};

// Preload critical assets
export const preloadCriticalAssets = (assets) => {
  assets.forEach(asset => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = getCDNUrl(asset.url);
    link.as = asset.type;
    if (asset.crossorigin) link.crossOrigin = asset.crossorigin;
    document.head.appendChild(link);
  });
};

// Load assets based on viewport
export const lazyLoadAssets = (assets) => {
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element.dataset.src) {
              element.src = getCDNUrl(element.dataset.src);
              observer.unobserve(element);
            }
          }
        });
      },
      { rootMargin: '50px' }
    );

    assets.forEach(element => observer.observe(element));
  }
};
