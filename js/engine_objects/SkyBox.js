var SkyBox = function(name, directoryName, fileExtension, callback){

  this.name = name;
  this.directoryName = directoryName;
  this.fileExtension = fileExtension;

  this.hasBack = false;
  this.hasDown = false;
  this.hasFront = false;
  this.hasLeft = false;
  this.hasRight = false;
  this.hasUp = false;

  if (callback){
    this.callback = callback;
  }

  this.backFilePath = skyBoxRootDirectory+directoryName+"/"+"back."+fileExtension;
  this.downFilePath = skyBoxRootDirectory+directoryName+"/"+"down."+fileExtension;
  this.frontFilePath = skyBoxRootDirectory+directoryName+"/"+"front."+fileExtension;
  this.leftFilePath = skyBoxRootDirectory+directoryName+"/"+"left."+fileExtension;
  this.rightFilePath = skyBoxRootDirectory+directoryName+"/"+"right."+fileExtension;
  this.upFilePath = skyBoxRootDirectory+directoryName+"/"+"up."+fileExtension;

  var cachedData = skyboxCache[this.name];

  if (this.fileExtension.toUpperCase() == "TGA" && !cachedData){
    this.backLoader = new THREE.TGALoader();
    this.downLoader = new THREE.TGALoader();
    this.frontLoader = new THREE.TGALoader();
    this.leftLoader = new THREE.TGALoader();
    this.rightLoader = new THREE.TGALoader();
    this.upLoader = new THREE.TGALoader();
  }else if (!cachedData){
    this.backLoader = new THREE.TextureLoader();
    this.downLoader = new THREE.TextureLoader();
    this.frontLoader = new THREE.TextureLoader();
    this.leftLoader = new THREE.TextureLoader();
    this.rightLoader = new THREE.TextureLoader();
    this.upLoader = new THREE.TextureLoader();
  }

  if (!cachedData){
    this.loadTextures();
  }else{
    this.backTexture = cachedData.backTexture;
    this.downTexture = cachedData.downTexture;
    this.frontTexture = cachedData.frontTexture;
    this.leftTexture = cachedData.leftTexture;
    this.rightTexture = cachedData.rightTexture;
    this.upTexture = cachedData.upTexture;
    this.hasBack = cachedData.hasBack;
    this.hasDown = cachedData.hasDown;
    this.hasFront = cachedData.hasFront;
    this.hasLeft = cachedData.hasLeft;
    this.hasRight = cachedData.hasRight;
    this.hasUp = cachedData.hasUp;
    skyBoxes[this.name] = this;
    this.callbackCheck();
  }

}

SkyBox.prototype.export = function(){
  var exportObject = new Object();
  exportObject.name = this.name;
  exportObject.directoryName = this.directoryName;
  exportObject.fileExtension = this.fileExtension;
  exportObject.hasBack = this.hasBack;
  exportObject.hasDown = this.hasDown;
  exportObject.hasFront = this.hasFront;
  exportObject.hasLeft = this.hasLeft;
  exportObject.hasRight = this.hasRight;
  exportObject.hasUp = this.hasUp;
  exportObject.backFilePath = this.backFilePath;
  exportObject.downFilePath = this.downFilePath;
  exportObject.frontFilePath = this.frontFilePath;
  exportObject.leftFilePath = this.leftFilePath;
  exportObject.rightFilePath =this.rightFilePath;
  exportObject.upFilePath = this.upFilePath;
  return exportObject;
}

SkyBox.prototype.loadTextures = function(){

  var that = this;

  //BACK
  this.backLoader.load(this.backFilePath,
    function(textureData){
      that.backTexture = textureData;
      that.hasBack = true;
      that.callbackCheck();
      //that.backTexture.flipY = false;
    },
    function(xhr){

    },
    function(xhr){
      that.hasBack = false;
      that.callbackCheck();
    }
  );
  //DOWN
  this.downLoader.load(this.downFilePath,
    function(textureData){
      that.downTexture = textureData;
      that.hasDown = true;
      that.callbackCheck();
      //that.downTexture.flipY = false;
    },
    function(xhr){

    },
    function(xhr){
      that.hasDown = false;
      that.callbackCheck();
    }
  );
  //FRONT
  this.frontLoader.load(this.frontFilePath,
    function(textureData){
      that.frontTexture = textureData;
      that.hasFront = true;
      that.callbackCheck();
      //that.frontTexture.flipY = false;
    },
    function(xhr){

    },
    function(xhr){
      that.hasFront = false;
      that.callbackCheck();
    }
  );
  //LEFT
  this.leftLoader.load(this.leftFilePath,
    function(textureData){
      that.leftTexture = textureData;
      that.hasLeft = true;
      that.callbackCheck();
      //that.leftTexture.flipY = false;
    },
    function(xhr){

    },
    function(xhr){
      that.hasLeft = false;
      that.callbackCheck();
    }
  );
  //RIGHT
  this.rightLoader.load(this.rightFilePath,
    function(textureData){
      that.rightTexture = textureData;
      that.hasRight = true;
      that.callbackCheck();
      //that.rightTexture.flipY = false;
    },
    function(xhr){

    },
    function(xhr){
      that.hasRight = false;
      that.callbackCheck();
    }
  );
  //UP
  this.upLoader.load(this.upFilePath,
    function(textureData){
      that.upTexture = textureData;
      that.hasUp = true;
      that.callbackCheck();
      //that.upTexture.flipY = false;
    },
    function(xhr){

    },
    function(xhr){
      that.hasUp = false;
      that.callbackCheck();
    }
  );
  skyboxCache[this.name] = this;
}

SkyBox.prototype.isUsable = function(){
  return (
    this.hasBack &&
    this.hasDown &&
    this.hasFront &&
    this.hasLeft &&
    this.hasRight &&
    this.hasUp
  );
}

SkyBox.prototype.callbackCheck = function(){
  if (this.isUsable() && this.callback){
    this.callback();
  }
}

SkyBox.prototype.printInfo = function(){
  terminal.printHeader(Text.SKYBOXINFO_HEADER);
  terminal.printInfo(Text.SKYBOXINFO_NAME.replace(
    Text.PARAM1, this.name
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_DIRNAME.replace(
    Text.PARAM1, this.directoryName
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_FILEEXTENSION.replace(
    Text.PARAM1, this.fileExtension
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_FILEPATHS, true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_BACK.replace(
    Text.PARAM1, this.backFilePath
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_DOWN.replace(
    Text.PARAM1, this.downFilePath
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_FRONT.replace(
    Text.PARAM1, this.frontFilePath
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_LEFT.replace(
    Text.PARAM1, this.leftFilePath
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_RIGHT.replace(
    Text.PARAM1, this.rightFilePath
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_UP.replace(
    Text.PARAM1, this.upFilePath
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TEXTURES, true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_BACK.replace(
    Text.PARAM1, this.hasBack
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_DOWN.replace(
    Text.PARAM1, this.hasDown
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_FRONT.replace(
    Text.PARAM1, this.hasFront
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_LEFT.replace(
    Text.PARAM1, this.hasLeft
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_RIGHT.replace(
    Text.PARAM1, this.hasRight
  ), true);
  terminal.printInfo(Text.SKYBOXINFO_TREE_UP.replace(
    Text.PARAM1, this.hasUp
  ), false);
}