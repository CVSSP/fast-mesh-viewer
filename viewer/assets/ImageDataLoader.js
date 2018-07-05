THREE.ImageDataLoader = (function (THREE) {
  
  /* Accumulates data, adding resolution every turn.
   */
  function Accumulator(length, offsets, scales) {
    var noff = offsets.length;
    var translation = offsets.map(function(o){return -o;});
    
    var data = new Float32Array(length);
    
    for (var i=0, l=data.length; i<l; i+=noff) {
      data.set(translation, i);
    }
    
    return {
      /* The data array.
       */
      data: data,
      
      /* Processes new data and adds to existing values.
       */
      addData: function (new_data, index, strides) {
        var new_data_scale = scales.map(function (s) {
          return Math.pow(2, s - index * 8 - 8);
        });
        strides = strides || 4; // Default: RGBA.
        for (var i=0, j=0; i<length; i+=noff, j+=strides) {
          for (var k=0; k<noff; k++) {
            data[i+k] += new_data[j+k] * new_data_scale[k];
          }
        }
      },
      
      /* Adds RGBA pixel values to data.
       */
      addImageData: function (image, index) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        var d = context.getImageData(0, 0, image.width, image.height).data;
        this.addData(d, index, 4);
      }
    }
  }
  
  //
  
  /* Loads array data from pixel values over multiple images.
   */
  function ImageDataLoader(manager) {
    this.manager = (manager !== undefined) ?
                    manager : THREE.DefaultLoadingManager;
  }
  
  Object.assign(ImageDataLoader.prototype, {
    constructor: ImageDataLoader,
    crossOrigin: 'Anonymous',
    
    load: function (urls, params, onLoad, onProgress, onError) {
      var npix = params.resolution[0] * params.resolution[1];
      var noff = params.offset.length;
      var acc = new Accumulator(npix * noff, params.offset, params.scale);
      var loader = new THREE.ImageLoader(this.manager);
      var loading = 0;
      
      loader.setCrossOrigin(this.crossOrigin);
      loader.setPath(this.path);
      
      if (typeof urls === 'string') {
        urls = [urls];
      }
      
      loading = urls.length;
      
      urls.forEach(function (url, index) {
        loader.load(url, function (image) {
        
          acc.addImageData(image, index);
          
          if (onProgress !== undefined) {
            onProgress(acc.data);
          }
          if (--loading === 0) {
            onLoad(acc.data);
            delete acc;
          }
        }, undefined, onError);
      });
    },

    setCrossOrigin: function (value) {
      this.crossOrigin = value;
      return this;
    },
    
    setPath: function (value) {
      this.path = value;
      return this;
    }
  });
  
  return ImageDataLoader;
})(THREE);
