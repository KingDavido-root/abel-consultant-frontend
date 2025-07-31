// Performance monitoring utilities
export const measurePerformance = {
  // Measure page load metrics
  pageLoad: () => {
    if ('performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0];
      const paint = performance.getEntriesByType('paint');
      
      return {
        // Time to First Byte (TTFB)
        ttfb: navigation.responseStart - navigation.requestStart,
        // First Contentful Paint (FCP)
        fcp: paint.find(p => p.name === 'first-contentful-paint')?.startTime,
        // DOM Content Loaded
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
        // Load Complete
        loadComplete: navigation.loadEventEnd - navigation.startTime
      };
    }
    return null;
  },

  // Measure component render time
  componentRender: (componentName, callback) => {
    const start = performance.now();
    callback();
    const end = performance.now();
    
    console.log(`${componentName} render time: ${end - start}ms`);
    return end - start;
  },

  // Track resource loading
  resourceTiming: () => {
    if ('performance' in window) {
      const resources = performance.getEntriesByType('resource');
      return resources.map(resource => ({
        name: resource.name,
        type: resource.initiatorType,
        duration: resource.duration,
        size: resource.transferSize
      }));
    }
    return [];
  },

  // Memory usage monitoring
  memoryUsage: () => {
    if ('memory' in performance) {
      return {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      };
    }
    return null;
  }
};

// Performance optimization utilities
export const performanceOptimizations = {
  // Debounce function for performance optimization
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance optimization
  throttle: (func, limit) => {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Batch DOM updates
  batchDOMUpdates: (updates) => {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        updates();
        resolve();
      });
    });
  }
};
