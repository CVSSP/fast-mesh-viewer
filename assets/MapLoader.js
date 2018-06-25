THREE.MapLoader = (function (THREE) {
  
  /* Loads .map files and linked assets to create a textured mesh.
   */
  function MapLoader(manager) {
    this.manager = (manager !== undefined) ?
                    manager : THREE.DefaultLoadingManager;
  }
  
  Object.assign(MapLoader.prototype, {
    constructor: MapLoader,
    withCredentials: false,
    
    load: function (url, onLoad, onProgress, onError) {
      var scope = this;
      var loader = new THREE.FileLoader(this.manager);
      
      loader.setPath(this.path);
      loader.setWithCredentials(this.withCredentials);
      
      loader.load(url, function(text) {
        var json = JSON.parse(text);
        var mesh = scope.parse(json);
        if (onLoad !== undefined)
          onLoad(mesh);
      }, onProgress, onError);
    },
    
    parse: function (json) {
      var texture = new THREE.TextureLoader(this.manager);
      var material = new THREE.MeshBasicMaterial();
      
      texture.setPath(this.path);
      material.map = texture.load(json.texture);
      
      var shape = new THREE.ImageDataLoader(this.manager);
      var geometry = new THREE.PlaneBufferGeometry(
        1 << json.scale[0] - 1,  // scale is the number of bits storing the
        1 << json.scale[1] - 1,  // integer part for each float. This value
        json.resolution[0] - 1,  // differs for x, y and z coordinates.
        json.resolution[1] - 1
      );
      
      shape.setPath(this.path);
      shape.load(json.shape, json, finalizeGeometry, updateGeometry);
      
      return new THREE.Mesh(geometry, material);
      
      function updateGeometry(data) {
        geometry.attributes.position.array.set(data);
        geometry.attributes.position.needsUpdate = true;
      }
      
      function finalizeGeometry(data) {
        geometry.attributes.position;
        geometry.computeBoundingBox();
        geometry.computeVertexNormals();
      }
    },
    
    setPath: function (value) {
      this.path = value;
      return this;
    },
    
    setWithCredentials: function (value) {
      this.withCredentials = value;
      return this;
    }
  });
  
  return MapLoader;
})(THREE);
