// Created with Motiva Layama v1.6 https://www.motivacg.com/layama

function getLayamaCameras()
{
   var layamaCameras = new BABYLON.SmartArray(0);
   layamaCameras.push({n: "Layama test 0010000", a: "VRayCam001", p: new BABYLON.Vector3(1859.74, 150, 193.753), l: new BABYLON.Vector3(1859.74, 150, 193.653)});
   layamaCameras.push({n: "Layama test 0010001", a: "VRayCam002", p: new BABYLON.Vector3(1839.44, 150, 11.8872), l: new BABYLON.Vector3(1839.44, 150, 11.7872)});
   layamaCameras.push({n: "Layama test 0010002", a: "VRayCam003", p: new BABYLON.Vector3(1687.11, 150, 29.0129), l: new BABYLON.Vector3(1687.06, 150, 29.0976)});
   layamaCameras.push({n: "Layama test 0010003", a: "VRayCam004", p: new BABYLON.Vector3(1710.01, 150, -306.437), l: new BABYLON.Vector3(1710.06, 150, -306.355)});
   layamaCameras.push({n: "Layama test 0010004", a: "VRayCam005", p: new BABYLON.Vector3(1982.76, 150, -311.014), l: new BABYLON.Vector3(1982.82, 150, -310.932)});
   layamaCameras.push({n: "Layama test 0010005", a: "VRayCam006", p: new BABYLON.Vector3(2124.9, 150, 11.8872), l: new BABYLON.Vector3(2125, 150, 11.8857)});
   layamaCameras.push({n: "Layama test 0010006", a: "VRayCam007", p: new BABYLON.Vector3(2059.5, 150, 341.291), l: new BABYLON.Vector3(2059.53, 150, 341.194)});
   layamaCameras.push({n: "Layama test 0010007", a: "VRayCam008", p: new BABYLON.Vector3(2403.99, 150, 16.6132), l: new BABYLON.Vector3(2403.96, 150, 16.7076)});
   layamaCameras.push({n: "Layama test 0010008", a: "VRayCam009", p: new BABYLON.Vector3(2422.09, 150, -150.79), l: new BABYLON.Vector3(2422.19, 150, -150.789)});
   layamaCameras.push({n: "Layama test 0010009", a: "VRayCam010", p: new BABYLON.Vector3(2480.56, 150, 376.84), l: new BABYLON.Vector3(2480.66, 150, 376.84)});
   layamaCameras.push({n: "Layama test 0010010", a: "VRayCam011", p: new BABYLON.Vector3(2324.86, 150, 376.84), l: new BABYLON.Vector3(2324.92, 150, 376.918)});
   layamaCameras.push({n: "Layama test 0010011", a: "VRayCam012", p: new BABYLON.Vector3(2743.27, 150, 432.937), l: new BABYLON.Vector3(2743.18, 150, 432.888)});
   layamaCameras.push({n: "Layama test 0010012", a: "VRayCam013", p: new BABYLON.Vector3(2472.99, 150, 183.029), l: new BABYLON.Vector3(2472.9, 150, 182.996)});
   layamaCameras.push({n: "Layama test 0010013", a: "VRayCam014", p: new BABYLON.Vector3(2422.09, 150, -331.582), l: new BABYLON.Vector3(2422.09, 150, -331.482)});
   layamaCameras.push({n: "Layama test 0010014", a: "VRayCam015", p: new BABYLON.Vector3(1702.16, 150, 135.178), l: new BABYLON.Vector3(1702.06, 150, 135.179)});
   layamaCameras.push({n: "Layama test 0010015", a: "VRayCam016", p: new BABYLON.Vector3(2593.65, 150, 16.6132), l: new BABYLON.Vector3(2593.55, 150, 16.604)});
   layamaCameras.push({n: "Layama test 0010016", a: "VRayCam017", p: new BABYLON.Vector3(2860.13, 150, -96.5286), l: new BABYLON.Vector3(2860.06, 150, -96.4531)});
   layamaCameras.push({n: "Layama test 0010017", a: "VRayCam018", p: new BABYLON.Vector3(2776.49, 150, -223.216), l: new BABYLON.Vector3(2776.48, 150, -223.316)});
   layamaCameras.push({n: "Layama test 0010018", a: "VRayCam019", p: new BABYLON.Vector3(2917.64, 150, 105.499), l: new BABYLON.Vector3(2917.54, 150, 105.513)});
   layamaCameras.push({n: "Layama test 0010019", a: "VRayCam020", p: new BABYLON.Vector3(2937.2, 150, 239.707), l: new BABYLON.Vector3(2937.14, 150, 239.793)});
   layamaCameras.push({n: "Layama test 0010020", a: "VRayCam021", p: new BABYLON.Vector3(2797.77, 150, 125.016), l: new BABYLON.Vector3(2797.75, 150, 125.113)});
   layamaCameras.push({n: "Layama test 0010021", a: "VRayCam022", p: new BABYLON.Vector3(2794.61, 150, 277.824), l: new BABYLON.Vector3(2794.57, 150, 277.73)});
   return layamaCameras;
}

function getLayamaResolutions()
{
   var layamaResolutions = new BABYLON.SmartArray(0);
   layamaResolutions.push("1024");
   layamaResolutions.push("1024");
   return layamaResolutions;
}

function getOnScreenLogoUsage()
{
   return 6;
}

function getLayamaControls()
{
   return {defMove: false, defRot: 1, altMove: true, altRot: 2};
}

function getLayamaAlternatives()
{
   var layamaAlternatives = new BABYLON.SmartArray(0);
   layamaAlternatives.push({n: "base", u: "./jpg/base/", i:"./jpg/alternative.png"});
   layamaAlternatives.push({n: "Alternative_1", u: "./jpg/Alternative_1/", i:"./jpg/alternative.png"});
   return layamaAlternatives;
}

