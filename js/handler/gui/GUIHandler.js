var GUIHandler = function(){
  this.objectManipulationParameters = {
    "Object": "objectName",
    "Rotate x": 0.0,
    "Rotate y": 0.0,
    "Rotate z": 0.0,
    "Mass": 0.0,
    "Phy. simpl.": false,
    "Slippery": false,
    "Changeable": false,
    "Intersectable": false,
    "Colorizable": false,
    "Has mass": true,
    "Shader precision": "default",
    "FPS Weapon": false,
    "Side": "Both",
    "Hide half": "None",
    "Blending": "None",
    "Texture offset x": 0.0,
    "Texture offset y": 0.0,
    "Opacity": 1.0,
    "AO intensity": 0.0,
    "Emissive int.": 0.0,
    "Emissive col.": "#ffffff",
    "Disp. scale": 0.0,
    "Disp. bias": 0.0,
    "Motion blur": false,
    "mb alpha": 1.0,
    "mb time": OBJECT_TRAIL_MAX_TIME_IN_SECS_DEFAULT
  };
  this.textManipulationParameters = {
    "Text": "textName",
    "Content": "",
    "Text color": "#ffffff",
    "Alpha": 0.0,
    "Has bg": false,
    "Bg color": "#ffffff",
    "Bg alpha": 0.0,
    "Char size": 0.0,
    "Char margin": 0.0,
    "Line margin": 0.0,
    "Clickable": false,
    "Shader precision": "default",
    "Aff. by fog": false,
    "is 2D": false,
    "Margin mode": "Top/Left",
    "Margin X": 50.0,
    "Margin Y": 50.0,
    "Max width%": 100,
    "Max height%": 100
  };
  this.spriteManipulationParameters = {
    "Sprite": "spriteName",
    "Color": "#ffffff",
    "Alpha": 1.0,
    "Margin mode": "Center",
    "Margin X": 50.0,
    "Margin Y": 50.0,
    "Has texture": false,
    "Texture": "",
    "Scale X": 1.0,
    "Scale Y": 1.0,
    "Width fixed": false,
    "Height fixed": false,
    "Width %": 50,
    "Height %": 50,
    "Rotation": 0.0,
    "Clickable": false,
    "Draggable": false,
    "Crop X": 0.01,
    "Crop Y": 0.01
  };
  this.containerManipulationParameters = {
    "Container": "containerName",
    "Center X": 50,
    "Center Y": 50,
    "Width": 10,
    "Height": 10,
    "Padding X": 0,
    "Padding Y": 0,
    "Square": false,
    "Clickable": false,
    "Has border": false,
    "Border color": "#ffffff",
    "Border thickness": 0.005,
    "Has background": false,
    "BG color": "#ffffff",
    "BG alpha": 1,
    "Has BG texture": false,
    "BG texture": ""
  };
  this.bloomParameters = {
    "Threshold": 0.0,
    "Active": false,
    "Strength": 0.0,
    "Exposure": 0.0,
    "Gamma": 0.0,
    "BlurStepAmount": 0,
    "BlurPass1": {"Factor": 0.0, "Color": "#ffffff", "Quality": "high"},
    "BlurPass2": {"Factor": 0.0, "Color": "#ffffff", "Quality": "high"},
    "BlurPass3": {"Factor": 0.0, "Color": "#ffffff", "Quality": "high"},
    "BlurPass4": {"Factor": 0.0, "Color": "#ffffff", "Quality": "high"},
    "BlurPass5": {"Factor": 0.0, "Color": "#ffffff", "Quality": "high"},
    "Done": function(){
      terminal.clear();
      parseCommand("postProcessing bloom hide");
    }
  };
  this.shaderPrecisionParameters = {
    "Crosshair": "low",
    "Basic material": "low",
    "Instanced basic material": "low",
    "Merged basic material": "low",
    "Object trail": "low",
    "Particle": "low",
    "Skybox": "low",
    "Text": "low",
    "Lightning": "low",
    "Sprite": "low",
    "Done": function(){
      guiHandler.hide(guiHandler.guiTypes.SHADER_PRECISION);
      terminal.clear();
      terminal.printInfo(Text.DONE);
      terminal.enable();
    }
  };
  this.workerStatusParameters = {
    "Raycaster": "ON",
    "Physics": "ON",
    "Lightning": "ON",
    "Done": function(){
      terminal.clear();
      parseCommand("workerConfigurations hide");
    }
  }
  this.guiTypes = {
    TEXT: 0, OBJECT: 1, BLOOM: 2, FPS_WEAPON_ALIGNMENT: 3, SHADER_PRECISION: 4, PARTICLE_SYSTEM: 5,
    WORKER_STATUS: 6, MUZZLE_FLASH: 7, TEXTURE_PACK: 8, SKYBOX_CREATION: 9, FOG: 10, FONT: 11,
    CROSSHAIR_CREATION: 12, SCRIPTS: 13, ANIMATION_CREATION: 14, AREA: 15, LIGHTNING: 16, SPRITE: 17,
    CONTAINER: 18, VIRTUAL_KEYBOARD_CREATION: 19
  };
  this.blockingGUITypes = [
    this.guiTypes.FPS_WEAPON_ALIGNMENT, this.guiTypes.PARTICLE_SYSTEM, this.guiTypes.MUZZLE_FLASH,
    this.guiTypes.TEXTURE_PACK, this.guiTypes.SKYBOX_CREATION, this.guiTypes.FOG, this.guiTypes.FONT,
    this.guiTypes.CROSSHAIR_CREATION, this.guiTypes.SCRIPTS, this.guiTypes.ANIMATION_CREATION,
    this.guiTypes.LIGHTNING, this.guiTypes.VIRTUAL_KEYBOARD_CREATION
  ];
}

GUIHandler.prototype.isOneOfBlockingGUIActive = function(){
  for (var i = 0; i<this.blockingGUITypes.length; i++){
    switch (this.blockingGUITypes[i]){
      case this.guiTypes.FPS_WEAPON_ALIGNMENT:
        if (this.datGuiFPSWeaponAlignment){
          return true;
        }
      break;
      case this.guiTypes.PARTICLE_SYSTEM:
        if (this.datGuiPSCreator){
          return true;
        }
      break;
      case this.guiTypes.MUZZLE_FLASH:
        if (this.datGuiMuzzleFlashCreator){
          return true;
        }
      break;
      case this.guiTypes.TEXTURE_PACK:
        if (this.datGuiTexturePack){
          return true;
        }
      break;
      case this.guiTypes.SKYBOX_CREATION:
        if (this.datGuiSkyboxCreation){
          return true;
        }
      break;
      case this.guiTypes.FOG:
        if (this.datGuiFog){
          return true;
        }
      break;
      case this.guiTypes.FONT:
        if (this.datGuiFontCreation){
          return true;
        }
      break;
      case this.guiTypes.CROSSHAIR_CREATION:
        if (this.datGuiCrosshairCreation){
          return true;
        }
      break;
      case this.guiTypes.SCRIPTS:
        if (this.datGuiScripts){
          return true;
        }
      break;
      case this.guiTypes.ANIMATION_CREATION:
        if (this.datGuiAnimationCreation){
          return true;
        }
      break;
      case this.guiTypes.LIGHTNING:
        if (this.datGuiLightningCreation){
          return true;
        }
      break;
      case this.guiTypes.VIRTUAL_KEYBOARD_CREATION:
        if (this.datGuiVirtualKeyboardCreation){
          return true;
        }
      break;
      default:
        throw new Error("Not implemented.")
      break;
    }
  }
  return false;
}

GUIHandler.prototype.afterContainerSelection = function(){
  if (mode != 0){
    return;
  }
  var curSelection = selectionHandler.getSelectedObject();
  if (curSelection && curSelection.isContainer){
    guiHandler.show(guiHandler.guiTypes.CONTAINER);
    guiHandler.enableAllCMControllers();
    guiHandler.containerManipulationParameters["Container"] = curSelection.name;
    guiHandler.containerManipulationParameters["Center X"] = curSelection.centerXPercent;
    guiHandler.containerManipulationParameters["Center Y"] = curSelection.centerYPercent;
    guiHandler.containerManipulationParameters["Width"] = curSelection.widthPercent * curSelection.scaleWidth;
    guiHandler.containerManipulationParameters["Height"] = curSelection.heightPercent * curSelection.scaleHeight;
    guiHandler.containerManipulationParameters["Square"] = !!curSelection.isSquare;
    guiHandler.containerManipulationParameters["Padding X"] = curSelection.paddingXContainerSpace;
    guiHandler.containerManipulationParameters["Padding Y"] = curSelection.paddingYContainerSpace;
    guiHandler.containerManipulationParameters["Clickable"] = !!curSelection.isClickable;
    guiHandler.containerManipulationParameters["Has border"] = !!curSelection.hasBorder;
    guiHandler.containerManipulationParameters["Border color"] = curSelection.borderColor? curSelection.borderColor: "#ffffff";
    guiHandler.containerManipulationParameters["Border thickness"] = curSelection.borderThickness? curSelection.borderThickness: 0.005;
    guiHandler.containerManipulationParameters["Has background"] = !!curSelection.hasBackground;
    guiHandler.containerManipulationParameters["BG color"] = curSelection.hasBackground? curSelection.backgroundColor: "#ffffff";
    guiHandler.containerManipulationParameters["BG alpha"] = curSelection.hasBackground? curSelection.backgroundAlpha: 1,
    guiHandler.containerManipulationParameters["Has BG texture"] = !!curSelection.backgroundTextureName;
    guiHandler.containerManipulationParameters["BG texture"] = curSelection.hasBackground? curSelection.backgroundTextureName: "";
    if (curSelection.alignedParent){
      var alignedLeft = curSelection.alignedParent.isChildAlignedWithType(curSelection, CONTAINER_ALIGNMENT_TYPE_LEFT);
      var alignedRight = curSelection.alignedParent.isChildAlignedWithType(curSelection, CONTAINER_ALIGNMENT_TYPE_RIGHT);
      var alignedBottom = curSelection.alignedParent.isChildAlignedWithType(curSelection, CONTAINER_ALIGNMENT_TYPE_BOTTOM);
      var alignedTop = curSelection.alignedParent.isChildAlignedWithType(curSelection, CONTAINER_ALIGNMENT_TYPE_TOP);
      if (alignedLeft || alignedRight){
        guiHandler.disableController(guiHandler.containerManipulationCenterXController);
      }
      if (alignedTop || alignedBottom){
        guiHandler.disableController(guiHandler.containerManipulationCenterYController);
      }
    }
    if (!curSelection.hasBorder){
      guiHandler.disableController(guiHandler.containerManipulationBorderColorController);
      guiHandler.disableController(guiHandler.containerManipulationBorderThicknessController);
    }
    if (!curSelection.hasBackground){
      guiHandler.disableController(guiHandler.containerManipulationBackgroundColorController);
      guiHandler.disableController(guiHandler.containerManipulationBackgroundAlphaController);
      guiHandler.disableController(guiHandler.containerManipulationBackgroundTextureController);
      guiHandler.disableController(guiHandler.containerManipulationHasBackgroundTextureController);
    }
    if (!curSelection.backgroundTextureName){
      guiHandler.disableController(guiHandler.containerManipulationBackgroundTextureController);
    }
    if (Object.keys(texturePacks).length == 0){
      guiHandler.disableController(guiHandler.containerManipulationHasBackgroundTextureController);
      guiHandler.disableController(guiHandler.containerManipulationBackgroundTextureController);
    }
  }else{
    guiHandler.hide(guiHandler.guiTypes.CONTAINER);
  }
}

GUIHandler.prototype.afterSpriteSelection = function(){
  if (mode != 0){
    return;
  }
  var curSelection = selectionHandler.getSelectedObject();
  if (curSelection && curSelection.isSprite){
    guiHandler.show(guiHandler.guiTypes.SPRITE);
    guiHandler.enableAllSMControllers();
    guiHandler.spriteManipulationParameters["Sprite"] = curSelection.name;
    guiHandler.spriteManipulationParameters["Color"] = "#" + curSelection.mesh.material.uniforms.color.value.getHexString();
    guiHandler.spriteManipulationParameters["Alpha"] = curSelection.mesh.material.uniforms.alpha.value;
    guiHandler.spriteManipulationParameters["Margin mode"] = (curSelection.marginMode == MARGIN_MODE_2D_CENTER) ? "Center" : (curSelection.marginMode == MARGIN_MODE_2D_TOP_LEFT ? "Top/Left" : "Bottom/Right");
    guiHandler.spriteManipulationParameters["Margin X"] = curSelection.marginPercentX;
    guiHandler.spriteManipulationParameters["Margin Y"] = curSelection.marginPercentY;
    guiHandler.spriteManipulationParameters["Has texture"] = !!curSelection.isTextured;
    guiHandler.spriteManipulationParameters["Texture"] = (curSelection.mappedTexturePackName ? curSelection.mappedTexturePackName : "");
    guiHandler.spriteManipulationParameters["Scale X"] = curSelection.mesh.material.uniforms.scale.value.x;
    guiHandler.spriteManipulationParameters["Scale Y"] = curSelection.mesh.material.uniforms.scale.value.y;
    guiHandler.spriteManipulationParameters["Rotation"] = curSelection.mesh.material.uniforms.rotationAngle.value;
    guiHandler.spriteManipulationParameters["Clickable"] = !!curSelection.isClickable;
    guiHandler.spriteManipulationParameters["Draggable"] = !!curSelection.isDraggable;
    guiHandler.spriteManipulationParameters["Crop X"] = (curSelection.cropCoefficientX ? curSelection.cropCoefficientX : 1.0);
    guiHandler.spriteManipulationParameters["Crop Y"] = (curSelection.cropCoefficientY ? curSelection.cropCoefficientY : 1.0);
    guiHandler.spriteManipulationParameters["Width fixed"] = !(typeof curSelection.fixedWidth == UNDEFINED);
    guiHandler.spriteManipulationParameters["Width %"] = (!(typeof curSelection.fixedWidth == UNDEFINED)) ? (curSelection.fixedWidth) : 50;
    guiHandler.spriteManipulationParameters["Height %"] = (!(typeof curSelection.fixedHeight == UNDEFINED)) ? (curSelection.fixedHeight) : 50;
    guiHandler.spriteManipulationParameters["Height fixed"] = !(typeof curSelection.fixedHeight == UNDEFINED);
    if (!curSelection.isTextured){
      guiHandler.disableController(guiHandler.spriteManipulationTextureController);
    }
    if (Object.keys(texturePacks).length == 0){
      guiHandler.disableController(guiHandler.spriteManipulationHasTextureController);
    }
    if (!curSelection.isClickable){
      guiHandler.disableController(guiHandler.spriteManipulationDraggableController);
    }
    if (!(typeof curSelection.fixedWidth == UNDEFINED)){
      guiHandler.disableController(guiHandler.spriteManipulationScaleXController);
    }else{
      guiHandler.disableController(guiHandler.spriteManipulationFixedWidthController);
    }
    if (!(typeof curSelection.fixedHeight == UNDEFINED)){
      guiHandler.disableController(guiHandler.spriteManipulationScaleYController);
    }else{
      guiHandler.disableController(guiHandler.spriteManipulationFixedHeightController);
    }
    if (curSelection.containerParent){
      guiHandler.disableController(guiHandler.spriteManipulationMarginModeController);
      guiHandler.disableController(guiHandler.spriteManipulationMarginXController);
      guiHandler.disableController(guiHandler.spriteManipulationMarginYController);
      guiHandler.disableController(guiHandler.spriteManipulationScaleXController);
      guiHandler.disableController(guiHandler.spriteManipulationScaleYController);
      guiHandler.disableController(guiHandler.spriteManipulationHasFixedWidthController);
      guiHandler.disableController(guiHandler.spriteManipulationHasFixedHeightController);
      guiHandler.disableController(guiHandler.spriteManipulationFixedWidthController);
      guiHandler.disableController(guiHandler.spriteManipulationFixedHeightController);
      guiHandler.disableController(guiHandler.spriteManipulationRotationController);
    }
  }else{
    guiHandler.hide(guiHandler.guiTypes.SPRITE);
  }
  guiHandler.afterContainerSelection();
}

GUIHandler.prototype.afterTextSelection = function(){
  if (mode != 0){
    return;
  }
  var curSelection = selectionHandler.getSelectedObject();
  if (curSelection && curSelection.isAddedText){
    guiHandler.show(guiHandler.guiTypes.TEXT);
    guiHandler.enableAllTMControllers();
    guiHandler.textManipulationParameters["Text"] = curSelection.name;
    guiHandler.textManipulationParameters["Content"] = curSelection.text;
    guiHandler.textManipulationParameters["Text color"] = "#" + curSelection.getColor().getHexString();
    guiHandler.textManipulationParameters["Alpha"] = curSelection.getAlpha();
    guiHandler.textManipulationParameters["Has bg"] = (curSelection.hasBackground);
    if (curSelection.hasBackground){
      guiHandler.textManipulationParameters["Bg color"] = "#" + curSelection.getBackgroundColor().getHexString();
      guiHandler.textManipulationParameters["Bg alpha"] = curSelection.getBackgroundAlpha();
    }else{
      guiHandler.textManipulationParameters["Bg color"] = "#000000"
      guiHandler.textManipulationParameters["Bg alpha"] = 1;
    }
    guiHandler.textManipulationParameters["Char margin"] = curSelection.getMarginBetweenChars();
    guiHandler.textManipulationParameters["Line margin"] = curSelection.getMarginBetweenLines();
    guiHandler.textManipulationParameters["Aff. by fog"] = curSelection.isAffectedByFog;
    guiHandler.textManipulationParameters["is 2D"] = curSelection.is2D;
    if (typeof guiHandler.textManipulationParameters["is 2D"] == UNDEFINED){
      guiHandler.textManipulationParameters["is 2D"] = false;
    }
    if (!guiHandler.textManipulationParameters["Has bg"]){
      guiHandler.disableController(guiHandler.textManipulationBackgroundColorController);
      guiHandler.disableController(guiHandler.textManipulationBackgroundAlphaController);
    }
    guiHandler.textManipulationParameters["Char size"] = curSelection.getCharSize();
    guiHandler.textManipulationParameters["Clickable"] = curSelection.isClickable;
    if (typeof guiHandler.textManipulationParameters["Clickable"] == UNDEFINED){
      guiHandler.textManipulationParameters["Clickable"] = false;
    }
    guiHandler.textManipulationParameters["Margin X"] = curSelection.marginPercentWidth;
    guiHandler.textManipulationParameters["Margin Y"] = curSelection.marginPercentHeight;
    guiHandler.textManipulationParameters["Max width%"] = curSelection.maxWidthPercent;
    guiHandler.textManipulationParameters["Max height%"] = curSelection.maxHeightPercent;
    if (typeof guiHandler.textManipulationParameters["Max width%"] == UNDEFINED){
      guiHandler.textManipulationParameters["Max width%"] = 0;
    }
    if (typeof guiHandler.textManipulationParameters["Max height%"] == UNDEFINED){
      guiHandler.textManipulationParameters["Max height%"] = 0;
    }
    if (curSelection.marginMode == MARGIN_MODE_2D_TOP_LEFT){
      guiHandler.textManipulationParameters["Margin mode"] = "Top/Left";
    }else if (curSelection.marginMode == MARGIN_MODE_2D_BOTTOM_RIGHT){
      guiHandler.textManipulationParameters["Margin mode"] = "Bottom/Right";
    }else{
      guiHandler.textManipulationParameters["Margin mode"] = "Center";
    }
    if (!curSelection.is2D){
      guiHandler.disableController(guiHandler.textManipulationMarginModeController);
      guiHandler.disableController(guiHandler.textManipulationMarginXController);
      guiHandler.disableController(guiHandler.textManipulationMarginYController);
      guiHandler.disableController(guiHandler.textManipulationMaxWidthPercentController);
      guiHandler.disableController(guiHandler.textManipulationMaxHeightPercentController);
    }else{
      guiHandler.disableController(guiHandler.textManipulationAffectedByFogController);
      if (curSelection.containerParent){
        guiHandler.disableController(guiHandler.textManipulationMaxWidthPercentController);
        guiHandler.disableController(guiHandler.textManipulationMaxHeightPercentController);
        guiHandler.disableController(guiHandler.textManipulationMarginXController);
        guiHandler.disableController(guiHandler.textManipulationMarginYController);
      }
    }
    if (curSelection.hasCustomPrecision){
      switch(curSelection.customPrecision){
        case shaderPrecisionHandler.precisionTypes.LOW:
          guiHandler.textManipulationParameters["Shader precision"] = "low";
        break;
        case shaderPrecisionHandler.precisionTypes.MEDIUM:
          guiHandler.textManipulationParameters["Shader precision"] = "medium";
        break;
        case shaderPrecisionHandler.precisionTypes.HIGH:
          guiHandler.textManipulationParameters["Shader precision"] = "high";
        break;
      }
    }else{
      guiHandler.textManipulationParameters["Shader precision"] = "default";
    }
  }else{
    guiHandler.hide(guiHandler.guiTypes.TEXT);
  }
  guiHandler.afterSpriteSelection();
}

GUIHandler.prototype.afterObjectSelection = function(){
  if (mode != 0 || isDeployment){
    return;
  }
  var curSelection = selectionHandler.getSelectedObject();
  if (curSelection && (curSelection.isAddedObject || curSelection.isObjectGroup)){
    guiHandler.show(guiHandler.guiTypes.OBJECT);
    guiHandler.enableAllOMControllers();
    var obj = curSelection;
    obj.visualiseBoundingBoxes();
    guiHandler.objectManipulationParameters["Object"] = obj.name;
    if (obj.isAddedObject){
      guiHandler.objectManipulationParameters["Rotate x"] = 0;
      guiHandler.objectManipulationParameters["Rotate y"] = 0;
      guiHandler.objectManipulationParameters["Rotate z"] = 0;
      guiHandler.objectManipulationParameters["Opacity"] = obj.getOpacity();
      if (obj.metaData.isSlippery){
        guiHandler.objectManipulationParameters["Slippery"] = true;
      }else{
        guiHandler.objectManipulationParameters["Slippery"] = false;
      }
      if (obj.isChangeable){
        guiHandler.objectManipulationParameters["Changeable"] = true;
      }else{
        guiHandler.objectManipulationParameters["Changeable"] = false;
      }
      if (obj.isIntersectable){
        guiHandler.objectManipulationParameters["Intersectable"] = true;
      }else{
        guiHandler.objectManipulationParameters["Intersectable"] = false;
      }
      if (obj.isColorizable){
        guiHandler.objectManipulationParameters["Colorizable"] = true;
      }else{
        guiHandler.objectManipulationParameters["Colorizable"] = false;
      }
      if (obj.hasDisplacementMap()){
        guiHandler.objectManipulationParameters["Disp. scale"] = obj.getDisplacementScale();
        guiHandler.objectManipulationParameters["Disp. bias"] = obj.getDisplacementBias();
      }else{
        guiHandler.disableController(guiHandler.omDisplacementScaleController);
        guiHandler.disableController(guiHandler.omDisplacementBiasController);
      }
      if (!obj.hasTexture()){
        guiHandler.disableController(guiHandler.omTextureOffsetXController);
        guiHandler.disableController(guiHandler.omTextureOffsetYController);
      }else{
        guiHandler.objectManipulationParameters["Texture offset x"] = obj.getTextureOffsetX();
        guiHandler.objectManipulationParameters["Texture offset y"] = obj.getTextureOffsetY();
      }
      if (!obj.hasAOMap()){
        guiHandler.disableController(guiHandler.omAOIntensityController);
      }else{
        guiHandler.objectManipulationParameters["AO intensity"] = obj.getAOIntensity();
      }
      if (!obj.hasEmissiveMap()){
        guiHandler.disableController(guiHandler.omEmissiveIntensityController);
        guiHandler.disableController(guiHandler.omEmissiveColorController);
      }else{
        guiHandler.objectManipulationParameters["Emissive int."] = obj.getEmissiveIntensity();
        guiHandler.objectManipulationParameters["Emissive col."] = "#"+obj.getEmissiveColor().getHexString();
      }
      if (!obj.isSlicable()){
        guiHandler.objectManipulationParameters["Hide half"] = "None";
        guiHandler.disableController(guiHandler.omHideHalfController);
      }else{
        if (!(typeof obj.metaData.slicedType == UNDEFINED)){
          guiHandler.objectManipulationParameters["Hide half"] = "Part "+(obj.metaData.slicedType + 1)
        }else{
          guiHandler.objectManipulationParameters["Hide half"] = "None";
        }
      }
      guiHandler.objectManipulationParameters["Side"] = "Both";
      if (obj.metaData.renderSide){
        if (obj.metaData.renderSide == 1){
          guiHandler.objectManipulationParameters["Side"] = "Front";
        }else if (obj.metaData.renderSide == 2){
          guiHandler.objectManipulationParameters["Side"] = "Back";
        }
      }
      if (obj.mesh.material.blending == NO_BLENDING){
        guiHandler.disableController(guiHandler.omOpacityController);
      }
      guiHandler.objectManipulationParameters["Phy. simpl."] = false;
      guiHandler.disableController(guiHandler.omPhysicsSimplifiedController);
      obj.mesh.add(axesHelper);
    }else if (obj.isObjectGroup){
      guiHandler.objectManipulationParameters["Rotate x"] = 0;
      guiHandler.objectManipulationParameters["Rotate y"] = 0;
      guiHandler.objectManipulationParameters["Rotate z"] = 0;
      if (obj.isSlippery){
        guiHandler.objectManipulationParameters["Slippery"] = true;
      }else{
        guiHandler.objectManipulationParameters["Slippery"] = false;
      }
      if (obj.isChangeable){
        guiHandler.objectManipulationParameters["Changeable"] = true;
      }else{
        guiHandler.objectManipulationParameters["Changeable"] = false;
      }
      if (obj.isIntersectable){
        guiHandler.objectManipulationParameters["Intersectable"] = true;
      }else{
        guiHandler.objectManipulationParameters["Intersectable"] = false;
      }
      if (obj.isColorizable){
        guiHandler.objectManipulationParameters["Colorizable"] = true;
      }else{
        guiHandler.objectManipulationParameters["Colorizable"] = false;
      }
      if (obj.isPhysicsSimplified){
        guiHandler.disableController(guiHandler.omMassController);
      }
      guiHandler.objectManipulationParameters["Opacity"] = obj.getOpacity();
      var hasAOMap = false;
      var hasEmissiveMap = false;
      var hasDisplacementMap = false;
      for (var childObjName in obj.group){
        if (obj.group[childObjName].hasAOMap()){
          hasAOMap = true;
        }
        if (obj.group[childObjName].hasEmissiveMap()){
          hasEmissiveMap = true;
        }
        if (obj.group[childObjName].hasDisplacementMap()){
          hasDisplacementMap = true;
        }
      }
      if (!hasAOMap){
        guiHandler.disableController(guiHandler.omAOIntensityController);
      }else{
        guiHandler.objectManipulationParameters["AO intensity"] = obj.getAOIntensity();
      }
      if (!hasEmissiveMap){
        guiHandler.disableController(guiHandler.omEmissiveIntensityController);
        guiHandler.disableController(guiHandler.omEmissiveColorController);
      }else{
        guiHandler.objectManipulationParameters["Emissive int."] = obj.getEmissiveIntensity();
        guiHandler.objectManipulationParameters["Emissive col."] = "#"+obj.getEmissiveColor().getHexString();
      }
      if (!hasDisplacementMap){
        guiHandler.disableController(guiHandler.omDisplacementScaleController);
        guiHandler.disableController(guiHandler.omDisplacementBiasController);
      }else{
        guiHandler.objectManipulationParameters["Disp. scale"] = obj.getDisplacementScale();
        guiHandler.objectManipulationParameters["Disp. bias"] = obj.getDisplacementBias();
      }
      if (!obj.hasTexture){
        guiHandler.disableController(guiHandler.omTextureOffsetXController);
        guiHandler.disableController(guiHandler.omTextureOffsetYController);
      }else{
        guiHandler.objectManipulationParameters["Texture offset x"] = obj.getTextureOffsetX();
        guiHandler.objectManipulationParameters["Texture offset y"] = obj.getTextureOffsetY();
      }
      guiHandler.disableController(guiHandler.omHideHalfController);
      if (obj.cannotSetMass){
        guiHandler.disableController(guiHandler.omHasMassController);
      }

      guiHandler.objectManipulationParameters["Side"] = "Both";
      if (obj.renderSide){
        if (obj.renderSide == 1){
          guiHandler.objectManipulationParameters["Side"] = "Front";
        }else if (obj.renderSide == 2){
          guiHandler.objectManipulationParameters["Side"] = "Back";
        }
      }
      if (obj.isPhysicsSimplified){
        guiHandler.objectManipulationParameters["Phy. simpl."] = true;
      }else{
        guiHandler.objectManipulationParameters["Phy. simpl."] = false;
      }
      if (obj.noMass || obj.physicsBody.mass > 0){
        guiHandler.disableController(guiHandler.omPhysicsSimplifiedController);
      }
      obj.mesh.add(axesHelper);
    }
    guiHandler.objectManipulationParameters["Motion blur"] = !(typeof obj.objectTrailConfigurations == UNDEFINED);
    if (obj.objectTrailConfigurations){
      guiHandler.objectManipulationParameters["mb alpha"] = obj.objectTrailConfigurations.alpha;
      guiHandler.objectManipulationParameters["mb time"] = obj.objectTrailConfigurations.time;
    }else{
      guiHandler.objectManipulationParameters["mb alpha"] = 1.0;
      guiHandler.objectManipulationParameters["mb time"] = OBJECT_TRAIL_MAX_TIME_IN_SECS_DEFAULT;
      guiHandler.disableController(guiHandler.omObjectTrailAlphaController);
      guiHandler.disableController(guiHandler.omObjectTrailTimeController);
    }
    guiHandler.objectManipulationParameters["Mass"] = obj.physicsBody.mass;
    if (obj.noMass){
      guiHandler.disableController(guiHandler.omMassController);
    }
    guiHandler.objectManipulationParameters["Has mass"] = !obj.noMass;
    guiHandler.objectManipulationParameters["Blending"] = obj.getBlendingText();
    if (obj.mesh.material.blending == NO_BLENDING){
      guiHandler.disableController(guiHandler.omOpacityController);
    }
    guiHandler.omMassController.updateDisplay();
    if (obj.isFPSWeapon){
      guiHandler.objectManipulationParameters["FPS Weapon"] = true;
      guiHandler.disableController(guiHandler.omHasMassController);
      guiHandler.disableController(guiHandler.omIntersectableController);
      guiHandler.disableController(guiHandler.omChangeableController);
    }else{
      guiHandler.objectManipulationParameters["FPS Weapon"] = false;
    }
    if (obj.hasCustomPrecision){
      switch(obj.customPrecision){
        case shaderPrecisionHandler.precisionTypes.LOW:
          guiHandler.objectManipulationParameters["Shader precision"] = "low";
        break;
        case shaderPrecisionHandler.precisionTypes.MEDIUM:
          guiHandler.objectManipulationParameters["Shader precision"] = "medium";
        break;
        case shaderPrecisionHandler.precisionTypes.HIGH:
          guiHandler.objectManipulationParameters["Shader precision"] = "high";
        break;
      }
    }else{
      guiHandler.objectManipulationParameters["Shader precision"] = "default";
    }
  }else{
    guiHandler.hide(guiHandler.guiTypes.OBJECT);
  }
  guiHandler.afterTextSelection();
}

GUIHandler.prototype.omGUIRotateEvent = function(axis, val){
  var obj = selectionHandler.getSelectedObject();
  terminal.clear();
  parseCommand("rotateObject "+obj.name+" "+axis+" "+val);
  if (axis == "x"){
    guiHandler.objectManipulationParameters["Rotate x"] = 0;
    guiHandler.omRotationXController.updateDisplay();
  }else if (axis == "y"){
    guiHandler.objectManipulationParameters["Rotate y"] = 0;
    guiHandler.omRotationYController.updateDisplay();
  }else if (axis == "z"){
    guiHandler.objectManipulationParameters["Rotate z"] = 0;
    guiHandler.omRotationZController.updateDisplay();
  }
}

GUIHandler.prototype.disableController = function(controller, noOpacityAdjustment){
  controller.domElement.style.pointerEvents = "none";
  if (!noOpacityAdjustment){
    controller.domElement.style.opacity = .5;
  }
}

GUIHandler.prototype.enableController = function(controller){
  controller.domElement.style.pointerEvents = "";
  controller.domElement.style.opacity = 1;
}

GUIHandler.prototype.enableAllCMControllers = function(){
  guiHandler.enableController(guiHandler.containerManipulationNameController);
  guiHandler.enableController(guiHandler.containerManipulationCenterXController);
  guiHandler.enableController(guiHandler.containerManipulationCenterYController);
  guiHandler.enableController(guiHandler.containerManipulationWidthController);
  guiHandler.enableController(guiHandler.containerManipulationHeightController);
  guiHandler.enableController(guiHandler.containerManipulationSquareController);
  guiHandler.enableController(guiHandler.containerManipulationPaddingXController);
  guiHandler.enableController(guiHandler.containerManipulationPaddingYController);
  guiHandler.enableController(guiHandler.containerManipulationClickableController);
  guiHandler.enableController(guiHandler.containerManipulationHasBorderController);
  guiHandler.enableController(guiHandler.containerManipulationBorderColorController);
  guiHandler.enableController(guiHandler.containerManipulationBorderThicknessController);
  guiHandler.enableController(guiHandler.containerManipulationHasBackgroundController);
  guiHandler.enableController(guiHandler.containerManipulationBackgroundColorController);
  guiHandler.enableController(guiHandler.containerManipulationBackgroundAlphaController);
  guiHandler.enableController(guiHandler.containerManipulationHasBackgroundTextureController);
  guiHandler.enableController(guiHandler.containerManipulationBackgroundTextureController);
}

GUIHandler.prototype.enableAllTMControllers = function(){
  guiHandler.enableController(guiHandler.textManipulationTextNameController);
  guiHandler.enableController(guiHandler.textManipulationContentController);
  guiHandler.enableController(guiHandler.textManipulationTextColorController);
  guiHandler.enableController(guiHandler.textManipulationAlphaController);
  guiHandler.enableController(guiHandler.textManipulationHasBackgroundController);
  guiHandler.enableController(guiHandler.textManipulationBackgroundColorController);
  guiHandler.enableController(guiHandler.textManipulationBackgroundAlphaController);
  guiHandler.enableController(guiHandler.textManipulationCharacterSizeController);
  guiHandler.enableController(guiHandler.textManipulationCharacterMarginController);
  guiHandler.enableController(guiHandler.textManipulationLineMarginController);
  guiHandler.enableController(guiHandler.textManipulationClickableController);
  guiHandler.enableController(guiHandler.textManipulationAffectedByFogController);
  guiHandler.enableController(guiHandler.textManipulationIs2DController);
  guiHandler.enableController(guiHandler.textManipulationMarginModeController);
  guiHandler.enableController(guiHandler.textManipulationMarginXController);
  guiHandler.enableController(guiHandler.textManipulationMarginYController);
  guiHandler.enableController(guiHandler.textManipulationMaxWidthPercentController);
  guiHandler.enableController(guiHandler.textManipulationMaxHeightPercentController);
  guiHandler.enableController(guiHandler.textManipulationShaderPrecisionController);
}

GUIHandler.prototype.enableAllSMControllers = function(){
  guiHandler.enableController(guiHandler.spriteManipulationSpriteNameController);
  guiHandler.enableController(guiHandler.spriteManipulationColorController);
  guiHandler.enableController(guiHandler.spriteManipulationAlphaController);
  guiHandler.enableController(guiHandler.spriteManipulationMarginModeController);
  guiHandler.enableController(guiHandler.spriteManipulationMarginXController);
  guiHandler.enableController(guiHandler.spriteManipulationMarginYController);
  guiHandler.enableController(guiHandler.spriteManipulationHasTextureController);
  guiHandler.enableController(guiHandler.spriteManipulationTextureController);
  guiHandler.enableController(guiHandler.spriteManipulationScaleXController);
  guiHandler.enableController(guiHandler.spriteManipulationScaleYController);
  guiHandler.enableController(guiHandler.spriteManipulationRotationController);
  guiHandler.enableController(guiHandler.spriteManipulationClickableController);
  guiHandler.enableController(guiHandler.spriteManipulationDraggableController);
  guiHandler.enableController(guiHandler.spriteManipulationCropCoefficientXController);
  guiHandler.enableController(guiHandler.spriteManipulationCropCoefficientYController);
  guiHandler.enableController(guiHandler.spriteManipulationFixedWidthController);
  guiHandler.enableController(guiHandler.spriteManipulationFixedHeightController);
  guiHandler.enableController(guiHandler.spriteManipulationHasFixedWidthController);
  guiHandler.enableController(guiHandler.spriteManipulationHasFixedHeightController);
}

GUIHandler.prototype.enableAllOMControllers = function(){
  guiHandler.enableController(guiHandler.omRotationXController);
  guiHandler.enableController(guiHandler.omRotationYController);
  guiHandler.enableController(guiHandler.omRotationZController);
  guiHandler.enableController(guiHandler.omMassController);
  guiHandler.enableController(guiHandler.omPhysicsSimplifiedController);
  guiHandler.enableController(guiHandler.omSlipperyController);
  guiHandler.enableController(guiHandler.omChangeableController);
  guiHandler.enableController(guiHandler.omIntersectableController);
  guiHandler.enableController(guiHandler.omColorizableController);
  guiHandler.enableController(guiHandler.omHasMassController);
  guiHandler.enableController(guiHandler.omTextureOffsetXController);
  guiHandler.enableController(guiHandler.omTextureOffsetYController);
  guiHandler.enableController(guiHandler.omOpacityController);
  guiHandler.enableController(guiHandler.omEmissiveIntensityController);
  guiHandler.enableController(guiHandler.omEmissiveColorController);
  guiHandler.enableController(guiHandler.omDisplacementScaleController);
  guiHandler.enableController(guiHandler.omDisplacementBiasController);
  guiHandler.enableController(guiHandler.omAOIntensityController);
  guiHandler.enableController(guiHandler.omHideHalfController);
  guiHandler.enableController(guiHandler.omBlendingController);
  guiHandler.enableController(guiHandler.omSideController);
  guiHandler.enableController(guiHandler.omFPSWeaponController);
  guiHandler.enableController(guiHandler.omShaderPrecisionController);
  guiHandler.enableController(guiHandler.omHasObjectTrailController);
  guiHandler.enableController(guiHandler.omObjectTrailAlphaController);
  guiHandler.enableController(guiHandler.omObjectTrailTimeController);
}

GUIHandler.prototype.show = function(guiType){
  switch(guiType){
    case this.guiTypes.OBJECT:
      if (!this.datGuiObjectManipulation){
        this.initializeObjectManipulationGUI();
      }
    return;
    case this.guiTypes.TEXT:
      if (!this.datGuiTextManipulation){
        this.initializeTextManipulationGUI();
      }
    return;
    case this.guiTypes.SPRITE:
      if (!this.datGuiSpriteManipulation){
        this.initializeSpriteManipulationGUI();
      }
    return;
    case this.guiTypes.CONTAINER:
      if (!this.datGuiContainerManipulation){
        this.initializeContainerManipulationGUI();
      }
    return;
    case this.guiTypes.BLOOM:
      if (!this.datGuiBloom){
        this.initializeBloomGUI();
        postProcessiongConfigurationsVisibility.bloom = true;
      }
    return;
    case this.guiTypes.SHADER_PRECISION:
      if (!this.datGuiShaderPrecision){
        this.initializeShaderPrecisionGUI();
      }
    return;
    case this.guiTypes.WORKER_STATUS:
      if (!this.datGuiWorkerStatus){
        this.initializeWorkerStatusGUI();
      }
    return;
  }
  throw new Error("Unknown guiType.");
}

GUIHandler.prototype.unbindSubFolderEvents = function(gui){
  var folders = gui.__folders;
  for (var folderName in folders){
    dat.dom.dom.unbind(window, "resize", folders[folderName].__resizeHandler);
    var len = folders[folderName].__controllers.length;
    for (var i = 0; i<len; i++){
      folders[folderName].remove(folders[folderName].__controllers[0]);
    }
    gui.removeFolder(folders[folderName]);
  }
}

GUIHandler.prototype.removeControllers = function(gui){
  var len = gui.__controllers.length;
  for (var i = 0; i<len; i++){
    gui.remove(gui.__controllers[0]);
  }
}

GUIHandler.prototype.destroyGUI = function(gui){
  this.removeControllers(gui);
  this.unbindSubFolderEvents(gui);
  gui.destroy();
}

GUIHandler.prototype.hide = function(guiType){
  switch(guiType){
    case this.guiTypes.OBJECT:
      if (this.datGuiObjectManipulation){
        this.destroyGUI(this.datGuiObjectManipulation);
        this.datGuiObjectManipulation = 0;
      }
    return;
    case this.guiTypes.TEXT:
      if (this.datGuiTextManipulation){
        this.destroyGUI(this.datGuiTextManipulation);
        this.datGuiTextManipulation = 0;
      }
    return;
    case this.guiTypes.SPRITE:
      if (this.datGuiSpriteManipulation){
        this.destroyGUI(this.datGuiSpriteManipulation);
        this.datGuiSpriteManipulation = 0;
      }
    return;
    case this.guiTypes.CONTAINER:
      if (this.datGuiContainerManipulation){
        this.destroyGUI(this.datGuiContainerManipulation);
        this.datGuiContainerManipulation = 0;
      }
    return;
    case this.guiTypes.BLOOM:
      if (this.datGuiBloom){
        this.destroyGUI(this.datGuiBloom);
        postProcessiongConfigurationsVisibility.bloom = false;
        this.datGuiBloom = 0;
      }
    return;
    case this.guiTypes.AREA:
      if (this.datGuiAreaConfigurations){
        this.destroyGUI(this.datGuiAreaConfigurations);
        this.datGuiAreaConfigurations = 0;
        areaConfigurationsVisible = false;
      }
    return;
    case this.guiTypes.FPS_WEAPON_ALIGNMENT:
      if (this.datGuiFPSWeaponAlignment){
        this.destroyGUI(this.datGuiFPSWeaponAlignment);
        this.datGuiFPSWeaponAlignment = 0;
      }
      fpsWeaponGUIHandler.onHidden();
    return;
    case this.guiTypes.SHADER_PRECISION:
      if (this.datGuiShaderPrecision){
        this.destroyGUI(this.datGuiShaderPrecision);
        this.datGuiShaderPrecision = 0;
      }
    return;
    case this.guiTypes.PARTICLE_SYSTEM:
      if (this.datGuiPSCreator){
        this.destroyGUI(this.datGuiPSCreator);
        this.datGuiPSCreator = 0;
      }
    return;
    case this.guiTypes.WORKER_STATUS:
      if (this.datGuiWorkerStatus){
        this.destroyGUI(this.datGuiWorkerStatus);
        this.datGuiWorkerStatus = 0;
      }
    return;
    case this.guiTypes.MUZZLE_FLASH:
      if (this.datGuiMuzzleFlashCreator){
        this.destroyGUI(this.datGuiMuzzleFlashCreator);
        this.datGuiMuzzleFlashCreator = 0;
      }
    return;
    case this.guiTypes.TEXTURE_PACK:
      if (this.datGuiTexturePack){
        this.destroyGUI(this.datGuiTexturePack);
        this.datGuiTexturePack = 0;
      }
    return;
    case this.guiTypes.SKYBOX_CREATION:
      if (this.datGuiSkyboxCreation){
        this.destroyGUI(this.datGuiSkyboxCreation);
        this.datGuiSkyboxCreation = 0;
      }
    return;
    case this.guiTypes.FOG:
      if (this.datGuiFog){
        this.destroyGUI(this.datGuiFog);
        this.datGuiFog = 0;
      }
    return;
    case this.guiTypes.FONT:
      if (this.datGuiFontCreation){
        this.destroyGUI(this.datGuiFontCreation);
        this.datGuiFontCreation = 0;
      }
    return;
    case this.guiTypes.CROSSHAIR_CREATION:
      if (this.datGuiCrosshairCreation){
        this.destroyGUI(this.datGuiCrosshairCreation);
        this.datGuiCrosshairCreation = 0;
      }
    return;
    case this.guiTypes.SCRIPTS:
      if (this.datGuiScripts){
        this.destroyGUI(this.datGuiScripts);
        this.datGuiScripts = 0;
      }
    return;
    case this.guiTypes.ANIMATION_CREATION:
      if (this.datGuiAnimationCreation){
        this.destroyGUI(this.datGuiAnimationCreation);
        this.datGuiAnimationCreation = 0;
      }
    return;
    case this.guiTypes.LIGHTNING:
      if (this.datGuiLightningCreation){
        this.destroyGUI(this.datGuiLightningCreation);
        this.datGuiLightningCreation = 0;
      }
    return;
    case this.guiTypes.VIRTUAL_KEYBOARD_CREATION:
      if (this.datGuiVirtualKeyboardCreation){
        this.destroyGUI(this.datGuiVirtualKeyboardCreation);
        this.datGuiVirtualKeyboardCreation = 0;
      }
    return;
  }
  throw new Error("Unknown guiType.");
}

GUIHandler.prototype.hideAll = function(){
  for (var key in this.guiTypes){
    this.hide(this.guiTypes[key]);
  }
}

GUIHandler.prototype.getPrecisionType = function(key){
  if (key == "low"){
    return shaderPrecisionHandler.precisionTypes.LOW;
  }
  if (key == "medium"){
    return shaderPrecisionHandler.precisionTypes.MEDIUM;
  }
  if (key == "high"){
    return shaderPrecisionHandler.precisionTypes.HIGH;
  }
  throw new Error("Unknown type.");
}

GUIHandler.prototype.initializeWorkerStatusGUI = function(){
  if (!guiHandler.onOff){
    guiHandler.onOff = ["ON", "OFF"];
  }
  guiHandler.workerStatusParameters["Raycaster"] = (RAYCASTER_WORKER_ON)? "ON": "OFF";
  guiHandler.workerStatusParameters["Physics"] = (PHYSICS_WORKER_ON)? "ON": "OFF";
  guiHandler.workerStatusParameters["Lightning"] = (LIGHTNING_WORKER_ON)? "ON": "OFF";
  guiHandler.datGuiWorkerStatus = new dat.GUI({hideable: false});
  guiHandler.datGuiWorkerStatus.add(guiHandler.workerStatusParameters, "Raycaster", guiHandler.onOff).onChange(function(val){
    RAYCASTER_WORKER_ON = (val == "ON");
    raycasterFactory.refresh();
    rayCaster = raycasterFactory.get();
  }).listen();
  guiHandler.datGuiWorkerStatus.add(guiHandler.workerStatusParameters, "Physics", guiHandler.onOff).onChange(function(val){
    PHYSICS_WORKER_ON = (val == "ON");
    physicsFactory.refresh();
    physicsWorld = physicsFactory.get();
  }).listen();
  guiHandler.datGuiWorkerStatus.add(guiHandler.workerStatusParameters, "Lightning", guiHandler.onOff).onChange(function(val){
    LIGHTNING_WORKER_ON = (val == "ON");
    for (var lightningName in lightnings){
      lightnings[lightningName].init(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 100, 0));
    }
    if (LIGHTNING_WORKER_ON){
      lightningHandler.reset();
      for (var lightningName in lightnings){
        lightningHandler.onLightningCreation(lightnings[lightningName]);
        if (lightnings[lightningName].isCorrected){
          lightningHandler.onSetCorrectionProperties(lightnings[lightningName]);
        }
      }
    }
  }).listen();
  guiHandler.datGuiWorkerStatus.add(guiHandler.workerStatusParameters, "Done");
}

GUIHandler.prototype.initializeShaderPrecisionGUI = function(){
  guiHandler.datGuiShaderPrecision = new dat.GUI({hideable: false});
  guiHandler.shaderPrecisionParameters["Crosshair"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.CROSSHAIR);
  guiHandler.shaderPrecisionParameters["Basic material"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.BASIC_MATERIAL);
  guiHandler.shaderPrecisionParameters["Instanced basic material"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.INSTANCED_BASIC_MATERIAL);
  guiHandler.shaderPrecisionParameters["Merged basic material"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.MERGED_BASIC_MATERIAL);
  guiHandler.shaderPrecisionParameters["Object trail"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.OBJECT_TRAIL);
  guiHandler.shaderPrecisionParameters["Particle"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.PARTICLE);
  guiHandler.shaderPrecisionParameters["Skybox"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.SKYBOX);
  guiHandler.shaderPrecisionParameters["Text"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.TEXT);
  guiHandler.shaderPrecisionParameters["Lightning"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.LIGHTNING);
  guiHandler.shaderPrecisionParameters["Sprite"] = shaderPrecisionHandler.getShaderPrecisionTextForType(shaderPrecisionHandler.types.SPRITE);
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Crosshair", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.CROSSHAIR, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Basic material", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.BASIC_MATERIAL, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Instanced basic material", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.INSTANCED_BASIC_MATERIAL, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Merged basic material", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.MERGED_BASIC_MATERIAL, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Object trail", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.OBJECT_TRAIL, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Particle", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.PARTICLE, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Skybox", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.SKYBOX, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Text", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.TEXT, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Lightning", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.LIGHTNING, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Sprite", ["low", "medium", "high"]).onChange(function(val){
    shaderPrecisionHandler.setShaderPrecisionForType(shaderPrecisionHandler.types.SPRITE, guiHandler.getPrecisionType(val));
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.datGuiShaderPrecision.add(guiHandler.shaderPrecisionParameters, "Done");
}

GUIHandler.prototype.initializeObjectManipulationGUI = function(){
  guiHandler.datGuiObjectManipulation = new dat.GUI({hideable: false});
  guiHandler.datGuiObjectManipulation.domElement.addEventListener("mousedown", function(e){
    omGUIFocused = true;
  });
  guiHandler.omObjController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Object").listen();
  guiHandler.disableController(guiHandler.omObjController, true);
  guiHandler.omRotationXController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Rotate x").onChange(function(val){
    guiHandler.omGUIRotateEvent("x", val);
  });
  guiHandler.omRotationYController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Rotate y").onChange(function(val){
    guiHandler.omGUIRotateEvent("y", val);
  });
  guiHandler.omRotationZController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Rotate z").onChange(function(val){
    guiHandler.omGUIRotateEvent("z", val);
  });
  guiHandler.omMassController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Mass").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    terminal.clear();
    parseCommand("setMass "+obj.name+" "+val);
    if (!isNaN(val) && parseFloat(val) > 0){
      guiHandler.disableController(guiHandler.omPhysicsSimplifiedController);
    }else{
      guiHandler.enableController(guiHandler.omPhysicsSimplifiedController);
    }
  });
  guiHandler.omPhysicsSimplifiedController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Phy. simpl.").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    if (obj.isAddedObject || obj.noMass || obj.physicsBody.mass > 0){
      guiHandler.objectManipulationParameters["Phy. simpl."] = false;
      return;
    }
    terminal.clear();
    if (val){
      if (!obj.boundingBoxes){
        obj.generateBoundingBoxes();
      }
      var box3 = new THREE.Box3();
      for (var i = 0; i<obj.boundingBoxes.length; i++){
        box3.expandByPoint(obj.boundingBoxes[i].min);
        box3.expandByPoint(obj.boundingBoxes[i].max);
      }
      var sizeVec = new THREE.Vector3();
      box3.getSize(sizeVec);
      var xSize = (sizeVec.x <= 0)? surfacePhysicalThickness: sizeVec.x;
      var ySize = (sizeVec.y <= 0)? surfacePhysicalThickness: sizeVec.y;
      var zSize = (sizeVec.z <= 0)? surfacePhysicalThickness: sizeVec.z;
      parseCommand("simplifyPhysics "+obj.name+" "+xSize+" "+ySize+" "+zSize);
    }else{
      parseCommand("unsimplifyPhysics "+obj.name);
    }
    if (physicsDebugMode){
      terminal.skip = true;
      parseCommand("switchPhysicsDebugMode");
      parseCommand("switchPhysicsDebugMode");
      terminal.skip = false;
    }
  }).listen();
  guiHandler.omSlipperyController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Slippery").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    terminal.clear();
    if (val){
      parseCommand("setSlipperiness "+obj.name+" on");
    }else{
      parseCommand("setSlipperiness "+obj.name+" off");
    }
  }).listen();
  guiHandler.omChangeableController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Changeable").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    if (obj.isFPSWeapon){
      guiHandler.objectManipulationParameters["Changeable"] = true;
      return;
    }
    terminal.clear();
    obj.setChangeableStatus(val);
    if (obj.isChangeable){
      terminal.printInfo(Text.OBJECT_MARKED_AS.replace(Text.PARAM1, "changeable"));
    }else{
      terminal.printInfo(Text.OBJECT_MARKED_AS.replace(Text.PARAM1, "unchangeable"));
    }
  }).listen();
  guiHandler.omIntersectableController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Intersectable").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    if (obj.isFPSWeapon){
      guiHandler.objectManipulationParameters["Intersectable"] = false;
      return;
    }
    terminal.clear();
    obj.setIntersectableStatus(val);
    if (obj.isIntersectable){
      terminal.printInfo(Text.OBJECT_INTERSECTABLE);
    }else{
      terminal.printInfo(Text.OBJECT_UNINTERSECTABLE);
    }
  }).listen();
  guiHandler.omColorizableController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Colorizable").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    terminal.clear();
    obj.isColorizable = val;
    if (obj.isColorizable){
      macroHandler.injectMacro("HAS_FORCED_COLOR", obj.mesh.material, false, true);
      obj.mesh.material.uniforms.forcedColor = new THREE.Uniform(new THREE.Vector4(-50, 0, 0, 0));
      terminal.printInfo(Text.OBJECT_MARKED_AS.replace(Text.PARAM1, "colorizable"));
    }else{
      delete obj.mesh.material.uniforms.forcedColor;
      macroHandler.removeMacro("HAS_FORCED_COLOR", obj.mesh.material, false, true);
      terminal.printInfo(Text.OBJECT_MARKED_AS.replace(Text.PARAM1, "uncolorizable"));
    }
    obj.mesh.material.needsUpdate = true;
  }).listen();
  guiHandler.omHasMassController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Has mass").onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    if (obj.isObjectGroup && obj.cannotSetMass){
      guiHandler.objectManipulationParameters["Has mass"] = false;
      return;
    }
    if (obj.isFPSWeapon){
      guiHandler.objectManipulationParameters["Has mass"] = false;
      return;
    }
    terminal.clear();
    obj.setNoMass(!val);
    if (val){
      guiHandler.enableController(guiHandler.omMassController);
      guiHandler.enableController(guiHandler.omPhysicsSimplifiedController);
      terminal.printInfo(Text.PHYSICS_ENABLED);
    }else{
      guiHandler.disableController(guiHandler.omMassController);
      guiHandler.disableController(guiHandler.omPhysicsSimplifiedController);
      terminal.printInfo(Text.PHYSICS_DISABLED);
    }
    if (physicsDebugMode){
      debugRenderer.refresh();
    }
    guiHandler.omMassController.updateDisplay();
  }).listen();
  guiHandler.omShaderPrecisionController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Shader precision", ["default", "low", "medium", "high"]).onChange(function(val){
    switch (val){
      case "default":
        selectionHandler.getSelectedObject().useDefaultPrecision();
      break;
      case "low":
        selectionHandler.getSelectedObject().useCustomShaderPrecision(shaderPrecisionHandler.precisionTypes.LOW);
      break;
      case "medium":
        selectionHandler.getSelectedObject().useCustomShaderPrecision(shaderPrecisionHandler.precisionTypes.MEDIUM);
      break;
      case "high":
        selectionHandler.getSelectedObject().useCustomShaderPrecision(shaderPrecisionHandler.precisionTypes.HIGH);
      break;
    }
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.omFPSWeaponController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "FPS Weapon").onChange(function(val){
    if (val){
      selectionHandler.getSelectedObject().useAsFPSWeapon();
      guiHandler.disableController(guiHandler.omHasMassController);
      guiHandler.disableController(guiHandler.omChangeableController);
      guiHandler.disableController(guiHandler.omIntersectableController);
      guiHandler.disableController(guiHandler.omMassController);
      guiHandler.objectManipulationParameters["Has mass"] = false;
      guiHandler.objectManipulationParameters["Changeable"] = true;
      guiHandler.objectManipulationParameters["Intersectable"] = false;
    }else{
      selectionHandler.getSelectedObject().resetFPSWeaponProperties();
      guiHandler.enableController(guiHandler.omHasMassController);
      guiHandler.enableController(guiHandler.omChangeableController);
      guiHandler.enableController(guiHandler.omIntersectableController);
      if (!selectionHandler.getSelectedObject().noMass){
        guiHandler.enableController(guiHandler.omMassController);
      }
      guiHandler.objectManipulationParameters["Has mass"] = true;
      guiHandler.objectManipulationParameters["Changeable"] = false;
      guiHandler.objectManipulationParameters["Intersectable"] = true;
      for (var lightningName in lightnings){
        if (lightnings[lightningName].attachToFPSWeapon && lightnings[lightningName].fpsWeaponConfigurations.weaponObj.name == selectionHandler.getSelectedObject().name){
          lightnings[lightningName].detachFromFPSWeapon();
        }
      }
    }
    if (physicsDebugMode){
      debugRenderer.refresh();
    }
    guiHandler.omMassController.updateDisplay();
    if (val){
      terminal.clear();
      terminal.printInfo(Text.OBJECT_WILL_BE_USED_AS_FPS_WEAPON);
    }else{
      terminal.clear();
      terminal.printInfo(Text.OK);
    }
  }).listen();
  guiHandler.omSideController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Side", [
    "Both", "Front", "Back"
  ]).onChange(function(val){
    var pseudoVal = 0;
    if (val == "Front"){
      pseudoVal = 1;
    }else if (val == "Back"){
      pseudoVal = 2;
    }
    selectionHandler.getSelectedObject().handleRenderSide(pseudoVal);
  }).listen();
  guiHandler.omHideHalfController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Hide half", [
    "None", "Part 1", "Part 2", "Part 3", "Part 4"
  ]).onChange(function(val){
    if (val == "None"){
      selectionHandler.getSelectedObject().sliceInHalf(4);
    }else if (val == "Part 1"){
      selectionHandler.getSelectedObject().sliceInHalf(0);
    }else if (val == "Part 2"){
      selectionHandler.getSelectedObject().sliceInHalf(1);
    }else if (val == "Part 3"){
      selectionHandler.getSelectedObject().sliceInHalf(2);
    }else if (val == "Part 4"){
      selectionHandler.getSelectedObject().sliceInHalf(3);
    }
    rayCaster.updateObject(selectionHandler.getSelectedObject());
  }).listen();
  guiHandler.omBlendingController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Blending", [
    "None", "Normal", "Additive", "Subtractive", "Multiply"
  ]).onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    if (obj.isAddedObject || obj.isObjectGroup){
      guiHandler.enableController(guiHandler.omOpacityController);
    }
    if (val == "None"){
      obj.setBlending(NO_BLENDING);
      if (obj.isAddedObject || obj.isObjectGroup){
        guiHandler.disableController(guiHandler.omOpacityController);
      }
    }else if (val == "Normal"){
      obj.setBlending(NORMAL_BLENDING);
    }else if (val == "Additive"){
      obj.setBlending(ADDITIVE_BLENDING);
    }else if (val == "Subtractive"){
      obj.setBlending(SUBTRACTIVE_BLENDING);
    }else if (val == "Multiply"){
      obj.setBlending(MULTIPLY_BLENDING);
    }
  }).listen();
  guiHandler.omEmissiveColorController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Emissive col.").onFinishChange(function(val){
    REUSABLE_COLOR.set(val);
    selectionHandler.getSelectedObject().setEmissiveColor(REUSABLE_COLOR);
  }).listen();
  guiHandler.omTextureOffsetXController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Texture offset x").min(-2).max(2).step(0.001).onChange(function(val){
    selectionHandler.getSelectedObject().setTextureOffsetX(val);
  }).listen();
  guiHandler.omTextureOffsetYController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Texture offset y").min(-2).max(2).step(0.001).onChange(function(val){
    selectionHandler.getSelectedObject().setTextureOffsetY(val);
  }).listen();
  guiHandler.omOpacityController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Opacity").min(0).max(1).step(0.01).onChange(function(val){
    var obj = selectionHandler.getSelectedObject();
    obj.updateOpacity(val);
    obj.initOpacitySet = false;
    obj.initOpacity = obj.opacity;
    if (obj.isObjectGroup){
      for (var objName in obj.group){
        obj.group[objName].updateOpacity(val * obj.group[objName].opacityWhenAttached);
      }
    }
  }).listen();
  guiHandler.omAOIntensityController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "AO intensity").min(0).max(10).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setAOIntensity(val);
  }).listen();
  guiHandler.omEmissiveIntensityController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Emissive int.").min(0).max(100).step(0.01).onChange(function(val){
    selectionHandler.getSelectedObject().setEmissiveIntensity(val);
  }).listen();
  guiHandler.omDisplacementScaleController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Disp. scale").min(-50).max(50).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setDisplacementScale(val);
  }).listen();
  guiHandler.omDisplacementBiasController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Disp. bias").min(-50).max(50).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setDisplacementBias(val);
  }).listen();
  guiHandler.omHasObjectTrailController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "Motion blur").onChange(function(val){
    if (val){
      selectionHandler.getSelectedObject().objectTrailConfigurations = {alpha: guiHandler.objectManipulationParameters["mb alpha"], time: guiHandler.objectManipulationParameters["mb time"]};
      guiHandler.enableController(guiHandler.omObjectTrailAlphaController);
      guiHandler.enableController(guiHandler.omObjectTrailTimeController);
    }else{
      delete selectionHandler.getSelectedObject().objectTrailConfigurations;
      guiHandler.disableController(guiHandler.omObjectTrailAlphaController);
      guiHandler.disableController(guiHandler.omObjectTrailTimeController);
    }
  }).listen();
  guiHandler.omObjectTrailAlphaController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "mb alpha").min(0.01).max(1).step(0.01).onChange(function(val){
    selectionHandler.getSelectedObject().objectTrailConfigurations.alpha = val;
  }).listen();
  guiHandler.omObjectTrailTimeController = guiHandler.datGuiObjectManipulation.add(guiHandler.objectManipulationParameters, "mb time").min(1/15).max(OBJECT_TRAIL_MAX_TIME_IN_SECS_DEFAULT).step(1/60).onChange(function(val){
    selectionHandler.getSelectedObject().objectTrailConfigurations.time = val;
  }).listen();
}

GUIHandler.prototype.initializeContainerManipulationGUI = function(){
  guiHandler.datGuiContainerManipulation = new dat.GUI({hideable: false});
  guiHandler.datGuiContainerManipulation.domElement.addEventListener("mousedown", function(e){
    cmGUIFocused = true;
  });
  guiHandler.containerManipulationNameController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Container").listen();
  guiHandler.containerManipulationCenterXController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Center X").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setCenter(val, selectionHandler.getSelectedObject().centerYPercent);
  }).listen();
  guiHandler.containerManipulationCenterYController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Center Y").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setCenter(selectionHandler.getSelectedObject().centerXPercent, val);
  }).listen();
  guiHandler.containerManipulationWidthController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Width").min(0.1).max(150).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setWidth(val);
    if (selectionHandler.getSelectedObject().alignedParent){
      var ary = selectionHandler.getSelectedObject().alignedParent.alignedContainerInfos[selectionHandler.getSelectedObject().name];
      for (var i = 0; i<ary.length; i++){
        selectionHandler.getSelectedObject().alignedParent.handleAlignment(ary[i]);
      }
    }
  }).listen();
  guiHandler.containerManipulationHeightController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Height").min(0.1).max(150).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setHeight(val);
    if (selectionHandler.getSelectedObject().alignedParent){
      var ary = selectionHandler.getSelectedObject().alignedParent.alignedContainerInfos[selectionHandler.getSelectedObject().name];
      for (var i = 0; i<ary.length; i++){
        selectionHandler.getSelectedObject().alignedParent.handleAlignment(ary[i]);
      }
    }
  }).listen();
  guiHandler.containerManipulationPaddingXController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Padding X").min(0).max(99.9).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setPaddingX(val);
  }).listen();
  guiHandler.containerManipulationPaddingYController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Padding Y").min(0).max(99.9).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setPaddingY(val);
  }).listen();
  guiHandler.containerManipulationSquareController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Square").onChange(function(val){
    selectionHandler.getSelectedObject().isSquare = val;
    if (val){
      selectionHandler.getSelectedObject().makeSquare();
    }else{
      selectionHandler.getSelectedObject().setWidth(selectionHandler.getSelectedObject().widthPercent * selectionHandler.getSelectedObject().scaleWidth);
      selectionHandler.getSelectedObject().setHeight(selectionHandler.getSelectedObject().heightPercent * selectionHandler.getSelectedObject().scaleHeight);
      selectionHandler.getSelectedObject().scaleWidth = 1;
      selectionHandler.getSelectedObject().scaleHeight = 1;
    }
  }).listen();
  guiHandler.containerManipulationClickableController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Clickable").onChange(function(val){
    selectionHandler.getSelectedObject().isClickable = val;
  }).listen();
  guiHandler.containerManipulationHasBorderController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Has border").onChange(function(val){
    if (val){
      selectionHandler.getSelectedObject().setBorder(guiHandler.containerManipulationParameters["Border color"], guiHandler.containerManipulationParameters["Border thickness"]);
      guiHandler.enableController(guiHandler.containerManipulationBorderColorController);
      guiHandler.enableController(guiHandler.containerManipulationBorderThicknessController);
    }else{
      selectionHandler.getSelectedObject().removeBorder();
      guiHandler.disableController(guiHandler.containerManipulationBorderColorController);
      guiHandler.disableController(guiHandler.containerManipulationBorderThicknessController);
    }
  }).listen();
  guiHandler.containerManipulationBorderColorController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Border color").onFinishChange(function(val){
    selectionHandler.getSelectedObject().setBorder(guiHandler.containerManipulationParameters["Border color"], guiHandler.containerManipulationParameters["Border thickness"]);
  }).listen();
  guiHandler.containerManipulationBorderThicknessController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Border thickness").min(0.001).max(0.1).step(0.0001).onChange(function(val){
    selectionHandler.getSelectedObject().setBorder(guiHandler.containerManipulationParameters["Border color"], guiHandler.containerManipulationParameters["Border thickness"]);
  }).listen();
  guiHandler.containerManipulationHasBackgroundController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Has background").onChange(function(val){
    var allTexturePackNames = Object.keys(texturePacks);
    if (val){
      guiHandler.enableController(guiHandler.containerManipulationBackgroundColorController);
      guiHandler.enableController(guiHandler.containerManipulationBackgroundAlphaController);
      if (allTexturePackNames.length > 0){
        guiHandler.enableController(guiHandler.containerManipulationHasBackgroundTextureController);
        guiHandler.enableController(guiHandler.containerManipulationBackgroundTextureController);
      }
      var bgColor = guiHandler.containerManipulationParameters["BG color"];
      var bgAlpha = guiHandler.containerManipulationParameters["BG alpha"];
      var bgTextureName = (guiHandler.containerManipulationParameters["Has BG texture"] && guiHandler.containerManipulationParameters["BG texture"])? guiHandler.containerManipulationParameters["BG texture"]: null;
      selectionHandler.getSelectedObject().setBackground(bgColor, bgAlpha, bgTextureName);
    }else{
      guiHandler.disableController(guiHandler.containerManipulationBackgroundColorController);
      guiHandler.disableController(guiHandler.containerManipulationBackgroundAlphaController);
      guiHandler.disableController(guiHandler.containerManipulationHasBackgroundTextureController);
      guiHandler.disableController(guiHandler.containerManipulationBackgroundTextureController);
      selectionHandler.getSelectedObject().removeBackground();
    }
  }).listen();
  guiHandler.containerManipulationBackgroundColorController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "BG color").onFinishChange(function(val){
    var bgColor = val;
    var bgAlpha = guiHandler.containerManipulationParameters["BG alpha"];
    var bgTextureName = (guiHandler.containerManipulationParameters["Has BG texture"] && guiHandler.containerManipulationParameters["BG texture"])? guiHandler.containerManipulationParameters["BG texture"]: null;
    selectionHandler.getSelectedObject().setBackground(bgColor, bgAlpha, bgTextureName);
  }).listen();
  guiHandler.containerManipulationBackgroundAlphaController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "BG alpha").min(0).max(1).step(0.01).onChange(function(val){
    var bgColor = guiHandler.containerManipulationParameters["BG color"];
    var bgAlpha = val;
    var bgTextureName = (guiHandler.containerManipulationParameters["Has BG texture"] && guiHandler.containerManipulationParameters["BG texture"])? guiHandler.containerManipulationParameters["BG texture"]: null;
    selectionHandler.getSelectedObject().setBackground(bgColor, bgAlpha, bgTextureName);
  }).listen();
  guiHandler.containerManipulationHasBackgroundTextureController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "Has BG texture").onChange(function(val){
     var hasBG = guiHandler.containerManipulationParameters["Has background"];
     var allTexturePackNames = Object.keys(texturePacks);
     if (!hasBG || allTexturePackNames.length == 0){
       guiHandler.containerManipulationParameters["Has BG texture"] = false;
       return;
     }
     var bgColor = guiHandler.containerManipulationParameters["BG color"];
     var bgAlpha = guiHandler.containerManipulationParameters["BG alpha"];
     if (val){
       if (!texturePacks[guiHandler.containerManipulationParameters["BG texture"]]){
         guiHandler.containerManipulationParameters["BG texture"] = allTexturePackNames[0];
       }
       guiHandler.enableController(guiHandler.containerManipulationBackgroundTextureController);
       selectionHandler.getSelectedObject().setBackground(bgColor, bgAlpha, guiHandler.containerManipulationParameters["BG texture"]);
     }else{
       guiHandler.disableController(guiHandler.containerManipulationBackgroundTextureController);
       selectionHandler.getSelectedObject().setBackground(bgColor, bgAlpha, null);
     }
  }).listen();
  guiHandler.containerManipulationBackgroundTextureController = guiHandler.datGuiContainerManipulation.add(guiHandler.containerManipulationParameters, "BG texture", Object.keys(texturePacks)).onChange(function(val){
    var bgColor = guiHandler.containerManipulationParameters["BG color"];
    var bgAlpha = guiHandler.containerManipulationParameters["BG alpha"];
    selectionHandler.getSelectedObject().setBackground(bgColor, bgAlpha, val);
  }).listen();
}

GUIHandler.prototype.initializeSpriteManipulationGUI = function(){
  guiHandler.datGuiSpriteManipulation = new dat.GUI({hideable: false});
  guiHandler.datGuiSpriteManipulation.domElement.addEventListener("mousedown", function(e){
    smGUIFocused = true;
  });
  guiHandler.spriteManipulationSpriteNameController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Sprite").listen();
  guiHandler.spriteManipulationColorController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Color").onFinishChange(function(val){
    selectionHandler.getSelectedObject().setColor(val);
  }).listen();
  guiHandler.spriteManipulationAlphaController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Alpha").min(0).max(1).step(0.01).onChange(function(val){
    selectionHandler.getSelectedObject().setAlpha(val);
  }).listen();
  guiHandler.spriteManipulationMarginModeController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Margin mode", ["Top/Left", "Bottom/Right", "Center"]).onChange(function(val){
    var marginMode = MARGIN_MODE_2D_CENTER;
    if (val == "Top/Left"){
      marginMode = MARGIN_MODE_2D_TOP_LEFT;
    }else if (val == "Bottom/Right"){
      marginMode = MARGIN_MODE_2D_BOTTOM_RIGHT;
    }
    selectionHandler.getSelectedObject().marginMode = marginMode;
    selectionHandler.getSelectedObject().set2DCoordinates(selectionHandler.getSelectedObject().marginPercentX, selectionHandler.getSelectedObject().marginPercentY);
  }).listen();
  guiHandler.spriteManipulationMarginXController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Margin X").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().set2DCoordinates(val, selectionHandler.getSelectedObject().marginPercentY);
  }).listen();
  guiHandler.spriteManipulationMarginYController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Margin Y").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().set2DCoordinates(selectionHandler.getSelectedObject().marginPercentX, val);
  }).listen();
  guiHandler.spriteManipulationHasTextureController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Has texture").onChange(function(val){
    if (Object.keys(texturePacks).length == 0){
      guiHandler.spriteManipulationParameters["Has texture"] = false;
      return;
    }
    if (val){
      guiHandler.enableController(guiHandler.spriteManipulationTextureController);
      var textureName = guiHandler.spriteManipulationParameters["Texture"];
      if (texturePacks[textureName]){
        selectionHandler.getSelectedObject().mapTexture(texturePacks[textureName]);
      }
    }else{
      guiHandler.disableController(guiHandler.spriteManipulationTextureController);
      selectionHandler.getSelectedObject().removeTexture();
    }
  }).listen();
  guiHandler.spriteManipulationTextureController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Texture", Object.keys(texturePacks)).onChange(function(val){
    selectionHandler.getSelectedObject().mapTexture(texturePacks[val]);
  }).listen();
  guiHandler.spriteManipulationScaleXController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Scale X").min(0.1).max(20).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setScale(val, selectionHandler.getSelectedObject().mesh.material.uniforms.scale.value.y);
    selectionHandler.getSelectedObject().originalWidth = selectionHandler.getSelectedObject().calculateWidthPercent();
    selectionHandler.getSelectedObject().originalWidthReference = renderer.getCurrentViewport().z;
    selectionHandler.getSelectedObject().originalScreenResolution = screenResolution;
  }).listen();
  guiHandler.spriteManipulationScaleYController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Scale Y").min(0.1).max(20).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setScale(selectionHandler.getSelectedObject().mesh.material.uniforms.scale.value.x, val);
    selectionHandler.getSelectedObject().originalHeight = selectionHandler.getSelectedObject().calculateHeightPercent();
    selectionHandler.getSelectedObject().originalHeightReference = renderer.getCurrentViewport().w;
    selectionHandler.getSelectedObject().originalScreenResolution = screenResolution;
  }).listen();
  guiHandler.spriteManipulationHasFixedWidthController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Width fixed").onChange(function(val){
    if (selectionHandler.getSelectedObject().containerParent){
      guiHandler.spriteManipulationParameters["Width fixed"] = true;
      return;
    }
    if (val){
      selectionHandler.getSelectedObject().fixedWidth = guiHandler.spriteManipulationParameters["Width %"];
      selectionHandler.getSelectedObject().setWidthPercent(selectionHandler.getSelectedObject().fixedWidth);
      guiHandler.disableController(guiHandler.spriteManipulationScaleXController);
      guiHandler.enableController(guiHandler.spriteManipulationFixedWidthController);
    }else {
      delete selectionHandler.getSelectedObject().fixedWidth;
      guiHandler.spriteManipulationParameters["Scale X"] = 1;
      selectionHandler.getSelectedObject().setScale(1, selectionHandler.getSelectedObject().mesh.material.uniforms.scale.value.y);
      guiHandler.disableController(guiHandler.spriteManipulationFixedWidthController);
      guiHandler.enableController(guiHandler.spriteManipulationScaleXController);
    }
    selectionHandler.getSelectedObject().originalWidth = selectionHandler.getSelectedObject().calculateWidthPercent();
    selectionHandler.getSelectedObject().originalWidthReference = renderer.getCurrentViewport().z;
    selectionHandler.getSelectedObject().originalScreenResolution = screenResolution;
  }).listen();
  guiHandler.spriteManipulationFixedWidthController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Width %").min(0.1).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setWidthPercent(val);
    selectionHandler.getSelectedObject().fixedWidth = val;
    selectionHandler.getSelectedObject().originalWidth = selectionHandler.getSelectedObject().calculateWidthPercent();
    selectionHandler.getSelectedObject().originalWidthReference = renderer.getCurrentViewport().z;
    selectionHandler.getSelectedObject().originalScreenResolution = screenResolution;
  }).listen();
  guiHandler.spriteManipulationHasFixedHeightController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Height fixed").onChange(function(val){
    if (selectionHandler.getSelectedObject().containerParent){
      guiHandler.spriteManipulationParameters["Height fixed"] = true;
      return;
    }
    if (val){
      selectionHandler.getSelectedObject().fixedHeight = guiHandler.spriteManipulationParameters["Height %"];
      selectionHandler.getSelectedObject().setHeightPercent(selectionHandler.getSelectedObject().fixedHeight);
      guiHandler.disableController(guiHandler.spriteManipulationScaleYController);
      guiHandler.enableController(guiHandler.spriteManipulationFixedHeightController);
    }else {
      delete selectionHandler.getSelectedObject().fixedHeight;
      guiHandler.spriteManipulationParameters["Scale Y"] = 1;
      selectionHandler.getSelectedObject().setScale(selectionHandler.getSelectedObject().mesh.material.uniforms.scale.value.x, 1);
      guiHandler.disableController(guiHandler.spriteManipulationFixedHeightController);
      guiHandler.enableController(guiHandler.spriteManipulationScaleYController);
    }
    selectionHandler.getSelectedObject().originalHeight = selectionHandler.getSelectedObject().calculateHeightPercent();
    selectionHandler.getSelectedObject().originalHeightReference = renderer.getCurrentViewport().w;
    selectionHandler.getSelectedObject().originalScreenResolution = screenResolution;
  }).listen();
  guiHandler.spriteManipulationFixedHeightController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Height %").min(0.1).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().setHeightPercent(val);
    selectionHandler.getSelectedObject().fixedHeight = val;
    selectionHandler.getSelectedObject().originalHeight = selectionHandler.getSelectedObject().calculateHeightPercent();
    selectionHandler.getSelectedObject().originalHeightReference = renderer.getCurrentViewport().w;
    selectionHandler.getSelectedObject().originalScreenResolution = screenResolution;
  }).listen();
  guiHandler.spriteManipulationRotationController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Rotation").min(0).max(360).step(0.01).onChange(function(val){
    selectionHandler.getSelectedObject().setRotation(val);
  }).listen();
  guiHandler.spriteManipulationClickableController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Clickable").onChange(function(val){
    selectionHandler.getSelectedObject().isClickable = val;
    if (!val){
       selectionHandler.getSelectedObject().isDraggable = false;
       guiHandler.spriteManipulationParameters["Draggable"] = false;
       guiHandler.disableController(guiHandler.spriteManipulationDraggableController);
    } else{
      guiHandler.enableController(guiHandler.spriteManipulationDraggableController);
    }
  }).listen();
  guiHandler.spriteManipulationDraggableController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Draggable").onChange(function(val){
    if (!selectionHandler.getSelectedObject().isClickable){
      guiHandler.spriteManipulationParameters["Draggable"] = false;
      return;
    }
    selectionHandler.getSelectedObject().isDraggable = val;
  }).listen();
  guiHandler.spriteManipulationCropCoefficientXController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Crop X").min(0.01).max(1).step(0.01).onChange(function(val) {
    var sprite = selectionHandler.getSelectedObject();
    var coefY = sprite.cropCoefficientY ? sprite.cropCoefficientY : 1.0;
    sprite.setCropCoefficient(val, coefY);
  }).listen();
  guiHandler.spriteManipulationCropCoefficientYController = guiHandler.datGuiSpriteManipulation.add(guiHandler.spriteManipulationParameters, "Crop Y").min(0.01).max(1).step(0.01).onChange(function(val) {
    var sprite = selectionHandler.getSelectedObject();
    var coefX = sprite.cropCoefficientX ? sprite.cropCoefficientX : 1.0;
    sprite.setCropCoefficient(coefX, val);
  }).listen();
}

GUIHandler.prototype.initializeTextManipulationGUI = function(){
  guiHandler.datGuiTextManipulation = new dat.GUI({hideable: false});
  guiHandler.datGuiTextManipulation.domElement.addEventListener("mousedown", function(e){
    tmGUIFocused = true;
  });
  guiHandler.textManipulationTextNameController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Text").listen();
  guiHandler.textManipulationContentController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Content").onChange(function(val){
    var addedText = selectionHandler.getSelectedObject();
    val = val.split("\\n").join("\n");
    var val2 = val.split("\n").join("");
    if (val2.length > addedText.strlen){
      terminal.clear();
      terminal.printError(Text.THIS_TEXT_IS_ALLOCATED_FOR.replace(Text.PARAM1, addedText.strlen));
      guiHandler.textManipulationParameters["Content"] = addedText.text;
      return;
    }
    addedText.setText(val);
    if (addedText.containerParent){
      addedText.containerParent.insertAddedText(addedText);
    }
  }).listen();
  guiHandler.textManipulationTextColorController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Text color").onFinishChange(function(val){
    selectionHandler.getSelectedObject().setColor(val);
  }).listen();
  guiHandler.textManipulationAlphaController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Alpha").min(0).max(1).step(0.01).onChange(function(val){
    selectionHandler.getSelectedObject().setAlpha(val);
  }).listen();
  guiHandler.textManipulationHasBackgroundController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Has bg").onChange(function(val){
    if (val){
      selectionHandler.getSelectedObject().setBackground("#000000", 1);
      guiHandler.enableController(guiHandler.textManipulationBackgroundColorController);
      guiHandler.enableController(guiHandler.textManipulationBackgroundAlphaController);
    }else{
      selectionHandler.getSelectedObject().removeBackground();
      guiHandler.disableController(guiHandler.textManipulationBackgroundColorController);
      guiHandler.disableController(guiHandler.textManipulationBackgroundAlphaController);
    }
    guiHandler.textManipulationParameters["Bg color"] = "#000000";
    guiHandler.textManipulationParameters["Alpha"] = 1;
  }).listen();
  guiHandler.textManipulationBackgroundColorController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Bg color").onFinishChange(function(val){
    selectionHandler.getSelectedObject().setBackground(val, selectionHandler.getSelectedObject().getBackgroundAlpha());
  }).listen();
  guiHandler.textManipulationBackgroundAlphaController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Bg alpha").min(0).max(1).step(0.01).onChange(function(val){
    selectionHandler.getSelectedObject().setBackground(
      "#" + selectionHandler.getSelectedObject().getBackgroundColor().getHexString(),
      val
    );
  }).listen();
  guiHandler.textManipulationCharacterSizeController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Char size").min(0.5).max(200).step(0.5).onChange(function(val){
    selectionHandler.getSelectedObject().setCharSize(val);
    selectionHandler.getSelectedObject().refCharSize= val;
    selectionHandler.getSelectedObject().refInnerHeight = window.innerHeight;
    selectionHandler.getSelectedObject().handleResize();
    if (selectionHandler.getSelectedObject().containerParent){
      selectionHandler.getSelectedObject().containerParent.insertAddedText(selectionHandler.getSelectedObject());
    }
  }).listen();
  guiHandler.textManipulationCharacterMarginController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Char margin").min(0.5).max(100).step(0.5).onChange(function(val){
    selectionHandler.getSelectedObject().setMarginBetweenChars(val);
    selectionHandler.getSelectedObject().handleResize();
    if (selectionHandler.getSelectedObject().containerParent){
      selectionHandler.getSelectedObject().containerParent.insertAddedText(selectionHandler.getSelectedObject());
    }
  }).listen();
  guiHandler.textManipulationLineMarginController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Line margin").min(0.5).max(100).step(0.5).onChange(function(val){
    selectionHandler.getSelectedObject().setMarginBetweenLines(val);
    selectionHandler.getSelectedObject().handleResize();
    if (selectionHandler.getSelectedObject().containerParent){
      selectionHandler.getSelectedObject().containerParent.insertAddedText(selectionHandler.getSelectedObject());
    }
  }).listen();
  guiHandler.textManipulationClickableController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Clickable").onChange(function(val){
    selectionHandler.getSelectedObject().isClickable = val;
  }).listen();
  guiHandler.textManipulationShaderPrecisionController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Shader precision", ["default", "low", "medium", "high"]).onChange(function(val){
    switch(val){
      case "default":
        selectionHandler.getSelectedObject().useDefaultPrecision();
      break;
      case "low":
        selectionHandler.getSelectedObject().useCustomShaderPrecision(shaderPrecisionHandler.precisionTypes.LOW);
      break;
      case "medium":
        selectionHandler.getSelectedObject().useCustomShaderPrecision(shaderPrecisionHandler.precisionTypes.MEDIUM);
      break;
      case "high":
        selectionHandler.getSelectedObject().useCustomShaderPrecision(shaderPrecisionHandler.precisionTypes.HIGH);
      break;
    }
    terminal.clear();
    terminal.printInfo(Text.SHADER_PRECISION_ADJUSTED);
  }).listen();
  guiHandler.textManipulationAffectedByFogController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Aff. by fog").onChange(function(val){
    selectionHandler.getSelectedObject().setAffectedByFog(val);
  }).listen();
  guiHandler.textManipulationIs2DController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "is 2D").onChange(function(val){
    sceneHandler.onAddedTextDeletion(selectionHandler.getSelectedObject());
    selectionHandler.getSelectedObject().set2DStatus(val);
    sceneHandler.onAddedTextCreation(selectionHandler.getSelectedObject());
    refreshRaycaster("Ok")
    if (val){
      guiHandler.enableController(guiHandler.textManipulationMarginModeController);
      guiHandler.enableController(guiHandler.textManipulationMarginXController);
      guiHandler.enableController(guiHandler.textManipulationMarginYController);
      guiHandler.enableController(guiHandler.textManipulationMaxWidthPercentController);
      guiHandler.enableController(guiHandler.textManipulationMaxHeightPercentController);
      guiHandler.disableController(guiHandler.textManipulationAffectedByFogController);
      selectionHandler.getSelectedObject().set2DCoordinates(
        selectionHandler.getSelectedObject().marginPercentWidth, selectionHandler.getSelectedObject().marginPercentHeight
      );
      selectionHandler.getSelectedObject().setAffectedByFog(false);
      guiHandler.textManipulationParameters["Aff. by fog"] = false;
    }else{
      guiHandler.disableController(guiHandler.textManipulationMarginModeController);
      guiHandler.disableController(guiHandler.textManipulationMarginXController);
      guiHandler.disableController(guiHandler.textManipulationMarginYController);
      guiHandler.disableController(guiHandler.textManipulationMaxWidthPercentController);
      guiHandler.disableController(guiHandler.textManipulationMaxHeightPercentController);
      guiHandler.enableController(guiHandler.textManipulationAffectedByFogController);
      if (selectionHandler.getSelectedObject().containerParent){
        selectionHandler.getSelectedObject().containerParent.removeAddedText();
      }
    }
    selectionHandler.getSelectedObject().handleResize();
    var obj = selectionHandler.getSelectedObject();
    selectionHandler.resetCurrentSelection();
    selectionHandler.select(obj);
  }).listen();
  guiHandler.textManipulationMarginModeController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Margin mode", ["Top/Left", "Bottom/Right", "Center"]).onChange(function(val){
    if (val == "Top/Left"){
      selectionHandler.getSelectedObject().marginMode = MARGIN_MODE_2D_TOP_LEFT;
    }else if (val == "Bottom/Right"){
      selectionHandler.getSelectedObject().marginMode = MARGIN_MODE_2D_BOTTOM_RIGHT;
    }else{
      selectionHandler.getSelectedObject().marginMode = MARGIN_MODE_2D_CENTER;
    }
    selectionHandler.getSelectedObject().set2DCoordinates(selectionHandler.getSelectedObject().marginPercentWidth, selectionHandler.getSelectedObject().marginPercentHeight);
    if (selectionHandler.getSelectedObject().containerParent){
      selectionHandler.getSelectedObject().containerParent.insertAddedText(selectionHandler.getSelectedObject());
    }
  }).listen();
  guiHandler.textManipulationMarginXController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Margin X").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().set2DCoordinates(
      val, selectionHandler.getSelectedObject().marginPercentHeight
    );
    selectionHandler.getSelectedObject().handleResize();
  }).listen();
  guiHandler.textManipulationMarginYController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Margin Y").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().set2DCoordinates(
      selectionHandler.getSelectedObject().marginPercentWidth, val
    );
    selectionHandler.getSelectedObject().handleResize();
  }).listen();
  guiHandler.textManipulationMaxWidthPercentController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Max width%").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().maxWidthPercent = val;
    selectionHandler.getSelectedObject().handleResize();
  }).listen();
  guiHandler.textManipulationMaxHeightPercentController = guiHandler.datGuiTextManipulation.add(guiHandler.textManipulationParameters, "Max height%").min(0).max(100).step(0.1).onChange(function(val){
    selectionHandler.getSelectedObject().maxHeightPercent = val;
    selectionHandler.getSelectedObject().handleResize();
  }).listen();
}

GUIHandler.prototype.initializeBloomGUI = function(){
  guiHandler.datGuiBloom = new dat.GUI({hideable: false});
  guiHandler.bloomThresholdController = guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "Threshold").min(0).max(1).step(0.01).onChange(function(val){
    bloom.setThreshold(val);
  }).listen();
  guiHandler.bloomActiveController = guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "Strength").min(0).max(100).step(0.1).onChange(function(val){
    bloom.setBloomStrength(val);
  }).listen();
  guiHandler.bloomExposureController = guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "Exposure").min(0).max(100).step(0.01).onChange(function(val){
    bloom.setExposure(val);
  }).listen();
  guiHandler.bloomGammaController = guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "Gamma").min(0).max(100).step(0.01).onChange(function(val){
    bloom.setGamma(val);
  }).listen();
  guiHandler.bloomBlurStepAmountController = guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "BlurStepAmount").min(1).max(5).step(1).onChange(function(val){
    bloom.setBlurStepCount(val);
    for (var i = 0; i < 5; i++){
      guiHandler.enableController(guiHandler["blurPassFactorController"+(i+1)]);
      guiHandler.enableController(guiHandler["blurPassTintColorController"+(i+1)]);
      guiHandler.enableController(guiHandler["blurPassTapController"+(i+1)]);
    }
    for (var i = val; i < 5; i++){
      guiHandler.disableController(guiHandler["blurPassFactorController"+(i+1)]);
      guiHandler.disableController(guiHandler["blurPassTintColorController"+(i+1)]);
      guiHandler.disableController(guiHandler["blurPassTapController"+(i+1)]);
    }
  }).listen();
  guiHandler.bloomActiveController = guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "Active").onChange(function(val){
    renderer.bloomOn = val;
  }).listen();
  for (var i = 0; i<5; i++){
    var blurPassFolder = guiHandler.datGuiBloom.addFolder("BlurPass"+(i+1));
    guiHandler["blurPassFactorController"+(i+1)] = blurPassFolder.add(guiHandler.bloomParameters["BlurPass"+(i+1)], "Factor").min(0).max(1).step(0.01).onChange(function(val){
      bloom.setBloomFactor(this.index, val);
    }.bind({index: i})).listen();
    guiHandler["blurPassTapController"+(i+1)] = blurPassFolder.add(guiHandler.bloomParameters["BlurPass"+(i+1)], "Quality", ["high", "medium", "low"]).onChange(function(val){
      var tapAmount;
      if (val == "high"){
        tapAmount = 13;
      }else if (val == "medium"){
        tapAmount = 9;
      }else if (val == "low"){
        tapAmount = 5;
      }else{
        throw new Error("Unknown tap type.");
      }
      bloom.setTapForLevel(this.index, tapAmount);
    }.bind({index: i})).listen();
    guiHandler["blurPassTintColorController"+(i+1)] = blurPassFolder.add(guiHandler.bloomParameters["BlurPass"+(i+1)], "Color").onFinishChange(function(val){
      REUSABLE_COLOR.set(val);
      bloom.setBloomTintColor(this.index, REUSABLE_COLOR.r, REUSABLE_COLOR.g, REUSABLE_COLOR.b);
    }.bind({index: i})).listen();
  }
  guiHandler.datGuiBloom.add(guiHandler.bloomParameters, "Done");
}
