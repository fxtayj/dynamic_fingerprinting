// Generated by CoffeeScript 1.10.0
function webGLTest(collector) {

  var Loader, root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  Loader = (function() {
    function Loader() {
      var colorName, colorName1, simpleName, susanName;
      //this.checkID();
      this.numberOfAssets = 0;
      this.numLoaded = 0;
      susanName = './js/webgl/assets/susan.json';
      simpleName = './js/webgl/assets/simple.json';
      colorName = './js/webgl/assets/random_0.png';
      colorName1 = './js/webgl/assets/random_1.png';
      this.loadJSONResource(susanName, (function(_this) {
        return function(err, susanModel) {
          _this.susanModel = susanModel;
          if (err) {
            alert('error getting susan model');
            console.log(err);
          } else {
            _this.assetLoaded();
          }
          return true;
        };
      })(this));
      this.loadJSONResource(simpleName, (function(_this) {
        return function(err, simpleModel) {
          _this.simpleModel = simpleModel;
          if (err) {
            alert('error getting simpleModel');
            console.log(err);
          } else {
            _this.assetLoaded();
          }
          return true;
        };
      })(this));
      this.loadImage(colorName, (function(_this) {
        return function(err, texture) {
          _this.texture = texture;
          if (err) {
            alert('error getting color.png');
            console.log(err);
          } else {
            _this.assetLoaded();
          }
          return true;
        };
      })(this));
      this.loadImage(colorName1, (function(_this) {
        return function(err, texture1) {
          _this.texture1 = texture1;
          if (err) {
            alert('error getting colors.png');
            console.log(err);
          } else {
            _this.assetLoaded();
          }
          return true;
        };
      })(this));
    }

    Loader.prototype.assetLoaded = function() {
      this.numLoaded++;
      if (this.numLoaded === this.numberOfAssets) {
        return this.beginTests();
      }
    };

    Loader.prototype.loadTextResource = function(url, callback) {
      var request;
      ++this.numberOfAssets;
      request = new XMLHttpRequest();
      request.open('GET', url + "?please-dont-cache=" + (Math.random()), true);
      request.onload = function() {
        if (request.status < 200 || request.status > 299) {
          return callback("Error: HTTP Status " + request.status + " on resource " + url);
        } else {
          return callback(null, request.responseText);
        }
      };
      request.send();
      return true;
    };

    Loader.prototype.loadImage = function(url, callback) {
      var image;
      ++this.numberOfAssets;
      image = new Image();
      image.onload = function() {
        return callback(null, image);
      };
      image.src = url;
      return true;
    };

    Loader.prototype.loadJSONResource = function(url, callback) {
      this.loadTextResource(url, function(err, result) {
        var e, error;
        if (err) {
          return callback(err);
        } else {
          try {
            return callback(null, JSON.parse(result));
          } catch (error) {
            e = error;
            return callback(e);
          }
        }
      });
      return true;
    };

    Loader.prototype.beginTests = function() {
      var Tester, canvasContainer, d, i, index, j, k, l, len, maxFirst, postProgress, ref, ref1, ref2, ref3, ref4, ref5, sender, test, vert;
      this.susanVertices = this.susanModel.meshes[0].vertices;
      this.susanIndices = [].concat.apply([], this.susanModel.meshes[0].faces);
      this.susanTexCoords = this.susanModel.meshes[0].texturecoords[0];
      this.susanNormals = this.susanModel.meshes[0].normals;
      this.simpleVertices = (function() {
        var j, len, ref, results;
        ref = this.simpleModel.meshes[0].vertices;
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          vert = ref[j];
          results.push(vert / 20.0);
        }
        return results;
      }).call(this);
      this.simpleIndices = [].concat.apply([], this.simpleModel.meshes[0].faces);
      this.simpleTexCoords = this.simpleModel.meshes[0].texturecoords[0];
      this.simpleNormals = this.simpleModel.meshes[0].normals;
      this.combinedVertices = new Array(this.simpleIndices.length + this.susanIndices.length);
      for (i = j = 0, ref = this.susanVertices.length; j < ref; i = j += 3) {
        this.combinedVertices[i + 0] = this.susanVertices[i + 0];
        this.combinedVertices[i + 1] = this.susanVertices[i + 1] + 1.3;
        this.combinedVertices[i + 2] = this.susanVertices[i + 2];
      }
      for (i = k = 0, ref1 = this.simpleVertices.length; k < ref1; i = k += 3) {
        this.combinedVertices[i + 0 + this.susanVertices.length] = this.simpleVertices[i + 0];
        this.combinedVertices[i + 1 + this.susanVertices.length] = this.simpleVertices[i + 1] - 1.3;
        this.combinedVertices[i + 2 + this.susanVertices.length] = this.simpleVertices[i + 2];
      }
      this.combinedIndices = new Array(this.simpleIndices.length + this.susanIndices.length);
      [].splice.apply(this.combinedIndices, [0, this.susanIndices.length - 0].concat(ref2 = this.susanIndices)), ref2;
      maxFirst = this.susanIndices.reduce(function(a, b) {
        return Math.max(a, b);
      });
      [].splice.apply(this.combinedIndices, [(ref3 = this.susanIndices.length), this.combinedIndices.length - ref3].concat(ref4 = (function() {
        var l, len, ref5, results;
        ref5 = this.simpleIndices;
        results = [];
        for (l = 0, len = ref5.length; l < len; l++) {
          index = ref5[l];
          results.push(index + 1 + maxFirst);
        }
        return results;
      }).call(this))), ref4;
      root.sender = collector;
      this.combinedTexCoords = this.susanTexCoords.concat(this.simpleTexCoords);
      this.combinedNormals = this.susanNormals.concat(this.simpleNormals);
      this.testList = [];
      this.testList.push(new CubeTest('normal'));
      this.testList.push(new CubeTest('aa'));
      this.testList.push(new CameraTest());
      this.testList.push(new LineTest('normal'));
      this.testList.push(new LineTest('aa'));
      this.testList.push(new TextureTest(this.susanVertices, this.susanIndices, this.susanTexCoords, this.texture));
      this.testList.push(new TextureTest(this.combinedVertices, this.combinedIndices, this.combinedTexCoords, this.texture));
      this.testList.push(new SimpleLightTest(this.susanVertices, this.susanIndices, this.susanTexCoords, this.susanNormals, this.texture));
      this.testList.push(new SimpleLightTest(this.combinedVertices, this.combinedIndices, this.combinedTexCoords, this.combinedNormals, this.texture));
      this.testList.push(new MoreLightTest(this.combinedVertices, this.combinedIndices, this.combinedTexCoords, this.combinedNormals, this.texture));
      this.testList.push(new TwoTexturesMoreLightTest(this.combinedVertices, this.combinedIndices, this.combinedTexCoords, this.combinedNormals, this.texture, this.texture1));
      this.testList.push(new TransparentTest(this.combinedVertices, this.combinedIndices, this.combinedTexCoords, this.combinedNormals, this.texture));
      this.testList.push(new LightingTest());
      this.testList.push(new ClippingTest());
      this.testList.push(new BubbleTest());
      this.testList.push(new CompressedTextureTest());
      this.testList.push(new ShadowTest());
      this.asyncTests = [];
      //language detection is done by another js file
      //this.asyncTests.push(new LanguageDector());

      root.sender.finished = true;
      this.numberOfTests = this.testList.length + this.asyncTests.length;
      this.numComplete = 0;

      postProgress = (function(_this) {
        return function() {
          _this.numComplete ++;
          if (_this.numComplete === _this.numberOfTests) {
            return collector.webglFinished();
          }
        };
      })(this);
      d = 256;

      Tester = (function() {
        function Tester(testList, dest) {
          var testDone;
          this.testList = testList;
          this.canvas = $("<canvas width='" + d + "' height='" + d + "'/>").appendTo(dest)[0];
          this.numTestsComplete = 0;
          testDone = (function(_this) {
            return function() {
              _this.numTestsComplete++;
              postProgress();
              if (_this.numTestsComplete < _this.testList.length) {
                return _this.testList[_this.numTestsComplete].begin(_this.canvas, testDone);
              }
            };
          })(this);
          this.testList[0].begin(this.canvas, testDone);
        }
        return Tester;
      })();

      canvasContainer =  $('body');
      $("<canvas id='can_aa' width='" + d + "' height='" + d + "'/>").appendTo(canvasContainer);
      new Tester(this.testList, canvasContainer);
      ref5 = this.asyncTests;
      for (l = 0, len = ref5.length; l < len; l++) {
        test = ref5[l];
        test.begin(postProgress);
      }
      return true;
    };

    return Loader;

  })();

  $(function() {
    var loader;
    return loader = new Loader();
  });
}
