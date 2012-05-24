using UnityEngine;

using System.Collections;
using System.Collections.Generic;
using System;
using EasyRoads3D;

public class RoadObjectScript : MonoBehaviour {
static public string version = "";
public int objectType = 0;
public bool displayRoad = true;
public float roadWidth = 5.0f;
public float indent = 3.0f;
public float surrounding = 5.0f;
public float raise = 1.0f;
public float raiseMarkers = 0.5f;
public int smooth = 0;	
public bool OOQDOOQQ = false;
public bool renderRoad = true;
public bool beveledRoad = false;
public bool applySplatmap = false;
public int splatmapLayer = 4;
public bool autoUpdate = true;
public float geoResolution = 5.0f;
public int roadResolution = 1;
public float tuw =  15.0f;
public int splatmapSmoothLevel;
public float opacity = 1.0f;
public int expand = 0;
public int offsetX = 0;
public int offsetY = 0;
private Material surfaceMaterial;
public float surfaceOpacity = 1.0f;
public float smoothDistance = 1.0f;
public float smoothSurDistance = 3.0f;
private bool handleInsertFlag;
public bool handleVegetation = true;
public float OCQDQCQCQC = 2.0f;
public float ODOCCDCDOC = 1f;
public int materialType = 0;
String[] materialStrings;
private MarkerScript[] mSc;

private bool OOOCQQQDOO;
private bool[] ODOCOODCDQ = null;
private bool[] OQDDCOQQCC = null;
public string[] OODODOQDCO;
public string[] ODODQOQO;
public int[] ODODQOQOInt;
public int OQDQQCQDOO = -1;
public int OCCDDQODCQ = -1;
static public GUISkin ODQOQCOCQC;
static public GUISkin OQDQQCOOCQ;
public bool OOODCOOOOO = false;
private Vector3 cPos;
private Vector3 ePos;
public bool OCQQDCDQDD;
static public Texture2D OQDCOQDQOO;
public int markers = 1;
public OOQOCDODQC OOCQDCOCCQ;
private GameObject ODOQDQOO;
public bool OCDCCCOCOC;
public bool doTerrain;
private Transform OODQDQDQQQ = null;
public GameObject[] OODQDQDQQQs;
private static string ODQDCCDOQD = null;
private Transform obj;
private string ODOCQOCDDQ;
public static string erInit = "";
static public Transform OCDCCOOCQC;
private RoadObjectScript ODCODQOOQD;
public bool flyby;


private Vector3 pos;
private float fl;
private float oldfl;
private bool ODCODDCOOQ;
private bool OCQDDDQCDC;
private bool OQDODQDQDD;
public Transform ODOQQDCQDD;
public int OdQODQOD = 1;
public float OOQQQDOD = 0f;
public float OOQQQDODOffset = 0f;
public float OOQQQDODLength = 0f;
public bool ODODDDOO = false;
static public string[] ODOQDOQO;
static public string[] ODODOQQO; 
static public string[] ODODQOOQ;
public int ODQDOOQO = 0;
public string[] ODQQQQQO;  
public string[] ODODDQOO; 
public bool[] ODODQQOD; 
public int[] OOQQQOQO; 
public int ODOQOOQO = 0; 

public bool forceY = false;
public float yChange = 0f;
public float floorDepth = 2f;
public float waterLevel = 1.5f; 
public bool lockWaterLevel = true;
public float lastY = 0f;
public string distance = "0";
public string markerDisplayStr = "Hide Markers";
static public string[] objectStrings;
public string objectText = "Road";
public bool applyAnimation = false;
public float waveSize = 1.5f;
public float waveHeight = 0.15f;
public bool snapY = true;

private TextAnchor origAnchor;
public bool autoODODDQQO;
public Texture2D roadTexture;
public Texture2D roadMaterial;
public string[] ODQDDODCCD;
public string[] ODDQOCCCOQ;
public int selectedWaterMaterial;
public int selectedWaterScript;
private bool doRestore = false;
public bool doFlyOver;
public static GameObject tracer;
public Camera goCam;
public float speed = 1f;
public float offset = 0f;
public bool camInit;
public GameObject customMesh = null;
static public bool disableFreeAlerts = true;
public bool multipleTerrains;
public bool editRestore = true;
public Material roadMaterialEdit;
static public int backupLocation = 0;
public string[] backupStrings = new string[2]{"Outside Assets folder path","Inside Assets folder path"};
public void ODQDOOODOD(ArrayList arr, String[] DOODQOQO, String[] OODDQOQO){
OdQODQOD = 1;
OOOQOCDDDO(transform, arr, DOODQOQO, OODDQOQO);
}
public void OCQCQODQOQ(MarkerScript markerScript){

OODQDQDQQQ = markerScript.transform;



List<GameObject> tmp = new List<GameObject>();
for(int i=0;i<OODQDQDQQQs.Length;i++){
if(OODQDQDQQQs[i] != markerScript.gameObject)tmp.Add(OODQDQDQQQs[i]);
}




tmp.Add(markerScript.gameObject);
OODQDQDQQQs = tmp.ToArray();
OODQDQDQQQ = markerScript.transform;

OOCQDCOCCQ.OCQCQCDCDD(OODQDQDQQQ, OODQDQDQQQs, markerScript.OOQQOQCQOD, markerScript.OQODODCQCQ, ODOQQDCQDD, out markerScript.OODQDQDQQQs, out markerScript.trperc, OODQDQDQQQs);

OCCDDQODCQ = -1;
}
public void OQDCQOOODC(MarkerScript markerScript){
if(markerScript.OQODODCQCQ != markerScript.ODOOQQOO || markerScript.OQODODCQCQ != markerScript.ODOOQQOO){
OOCQDCOCCQ.OCQCQCDCDD(OODQDQDQQQ, OODQDQDQQQs, markerScript.OOQQOQCQOD, markerScript.OQODODCQCQ, ODOQQDCQDD, out markerScript.OODQDQDQQQs, out markerScript.trperc, OODQDQDQQQs);
markerScript.ODQDOQOO = markerScript.OOQQOQCQOD;
markerScript.ODOOQQOO = markerScript.OQODODCQCQ;
}
if(ODCODQOOQD.autoUpdate) OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
}
public void ResetMaterials(MarkerScript markerScript){
if(OOCQDCOCCQ != null)OOCQDCOCCQ.OCQCQCDCDD(OODQDQDQQQ, OODQDQDQQQs, markerScript.OOQQOQCQOD, markerScript.OQODODCQCQ, ODOQQDCQDD, out markerScript.OODQDQDQQQs, out markerScript.trperc, OODQDQDQQQs);
}
public void OQQODCQQDO(MarkerScript markerScript){
if(markerScript.OQODODCQCQ != markerScript.ODOOQQOO){
OOCQDCOCCQ.OCQCQCDCDD(OODQDQDQQQ, OODQDQDQQQs, markerScript.OOQQOQCQOD, markerScript.OQODODCQCQ, ODOQQDCQDD, out markerScript.OODQDQDQQQs, out markerScript.trperc, OODQDQDQQQs);
markerScript.ODOOQQOO = markerScript.OQODODCQCQ;
}
OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
}
private void OCQDDQQCCQ(string ctrl, MarkerScript markerScript){
int i = 0;
foreach(Transform tr in markerScript.OODQDQDQQQs){
MarkerScript wsScript = (MarkerScript) tr.GetComponent<MarkerScript>();
if(ctrl == "rs") wsScript.LeftSurrounding(markerScript.rs - markerScript.ODOQQOOO, markerScript.trperc[i]);
else if(ctrl == "ls") wsScript.RightSurrounding(markerScript.ls - markerScript.DODOQQOO, markerScript.trperc[i]);
else if(ctrl == "ri") wsScript.LeftIndent(markerScript.ri - markerScript.OOQOQQOO, markerScript.trperc[i]);
else if(ctrl == "li") wsScript.RightIndent(markerScript.li - markerScript.ODODQQOO, markerScript.trperc[i]);
else if(ctrl == "rt") wsScript.LeftTilting(markerScript.rt - markerScript.ODDQODOO, markerScript.trperc[i]);
else if(ctrl == "lt") wsScript.RightTilting(markerScript.lt - markerScript.ODDOQOQQ, markerScript.trperc[i]);
else if(ctrl == "floorDepth") wsScript.FloorDepth(markerScript.floorDepth - markerScript.oldFloorDepth, markerScript.trperc[i]);
i++;
}
}
public void OQQDCOQOCO(){
if(markers > 1) OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
}
public void OOOQOCDDDO(Transform tr, ArrayList arr, String[] DOODQOQO, String[] OODDQOQO){
version = "2.4.3";
ODQOQCOCQC = (GUISkin)Resources.Load("ER3DSkin", typeof(GUISkin));


OQDCOQDQOO = (Texture2D)Resources.Load("ER3DLogo", typeof(Texture2D));
if(RoadObjectScript.objectStrings == null){
RoadObjectScript.objectStrings = new string[3];
RoadObjectScript.objectStrings[0] = "Road Object"; RoadObjectScript.objectStrings[1]="River Object";RoadObjectScript.objectStrings[2]="Procedural Mesh Object";
}
obj = tr;
OOCQDCOCCQ = new OOQOCDODQC();
ODCODQOOQD = obj.GetComponent<RoadObjectScript>();
foreach(Transform child in obj){
if(child.name == "Markers") ODOQQDCQDD = child;
}
ODOOOQCCOD.OCODDCCDQC();
OOQOCDODQC.terrainList.Clear();
Terrain[] terrains = (Terrain[])FindObjectsOfType(typeof(Terrain));
foreach(Terrain terrain in terrains) {
Terrains t = new Terrains();
t.terrain = terrain;
if(!terrain.gameObject.GetComponent<EasyRoads3DTerrainID>()){
EasyRoads3DTerrainID terrainscript = (EasyRoads3DTerrainID)terrain.gameObject.AddComponent("EasyRoads3DTerrainID");
string id = UnityEngine.Random.Range(100000000,999999999).ToString();
terrainscript.terrainid = id;
t.id = id;
}else{
t.id = terrain.gameObject.GetComponent<EasyRoads3DTerrainID>().terrainid;
}
OOCQDCOCCQ.OCODDCCDQC(t);
}
if(roadMaterialEdit == null){
roadMaterialEdit = (Material)Resources.Load("materials/roadMaterialEdit", typeof(Material));
}
if(objectType == 0 && GameObject.Find(gameObject.name + "/road") == null){
GameObject road = new GameObject("road");
road.transform.parent = transform;
}

OOCQDCOCCQ.OOODQODOOQ(obj, ODQDCCDOQD, ODCODQOOQD.roadWidth, surfaceOpacity, out OCQQDCDQDD, out indent, applyAnimation, waveSize, waveHeight);
OOCQDCOCCQ.ODOCCDCDOC = ODOCCDCDOC;
OOCQDCOCCQ.OCQDQCQCQC = OCQDQCQCQC;
OOCQDCOCCQ.OdQODQOD = OdQODQOD + 1;
OOCQDCOCCQ.OOQQQDOD = OOQQQDOD;
OOCQDCOCCQ.OOQQQDODOffset = OOQQQDODOffset;
OOCQDCOCCQ.OOQQQDODLength = OOQQQDODLength;
OOCQDCOCCQ.objectType = objectType;
OOCQDCOCCQ.snapY = snapY;
OOCQDCOCCQ.terrainRendered = OCDCCCOCOC;
OOCQDCOCCQ.handleVegetation = handleVegetation;
OOCQDCOCCQ.raise = raise;
OOCQDCOCCQ.roadResolution = roadResolution;
OOCQDCOCCQ.multipleTerrains = multipleTerrains;
OOCQDCOCCQ.editRestore = editRestore;
OOCQDCOCCQ.roadMaterialEdit = roadMaterialEdit;
if(backupLocation == 0)OQDODDQQDD.backupFolder = "/EasyRoads3D";
else OQDODDQQDD.backupFolder =  "/Assets/EasyRoads3D/backups";

ODODQOQO = OOCQDCOCCQ.OCDODQCQCQ();
ODODQOQOInt = OOCQDCOCCQ.OOQOOQCQOO();


if(OCDCCCOCOC){




doRestore = true;
}


ODDQOCDCOQ();

if(arr != null || ODODQOOQ == null) OQCCDOCOQQ(arr, DOODQOQO, OODDQOQO);


if(doRestore) return;
}
public void UpdateBackupFolder(){
}
public void ODDDOQODQQ(){
if(!ODODDDOO || objectType == 2){
if(ODOCOODCDQ != null){
for(int i = 0; i < ODOCOODCDQ.Length; i++){
ODOCOODCDQ[i] = false;
OQDDCOQQCC[i] = false;
}
}
}
}

public void ODCODOCOQD(Vector3 pos){


if(!displayRoad){
displayRoad = true;
OOCQDCOCCQ.OQOQDOOQOC(displayRoad, ODOQQDCQDD);
}
pos.y += ODCODQOOQD.raiseMarkers;
if(forceY && ODOQDQOO != null){
float dist = Vector3.Distance(pos, ODOQDQOO.transform.position);
pos.y = ODOQDQOO.transform.position.y + (yChange * (dist / 100f));
}else if(forceY && markers == 0) lastY = pos.y;
GameObject go = null;
if(ODOQDQOO != null) go = (GameObject)Instantiate(ODOQDQOO);
else go = (GameObject)Instantiate(Resources.Load("marker", typeof(GameObject)));
Transform newnode = go.transform;
newnode.position = pos;
newnode.parent = ODOQQDCQDD;
markers++;
string n;
if(markers < 10) n = "Marker000" + markers.ToString();
else if (markers < 100) n = "Marker00" + markers.ToString();
else n = "Marker0" + markers.ToString();
newnode.gameObject.name = n;
MarkerScript scr = newnode.GetComponent<MarkerScript>();
scr.OCQQDCDQDD = false;
scr.objectScript = obj.GetComponent<RoadObjectScript>();
if(ODOQDQOO == null){
scr.waterLevel = ODCODQOOQD.waterLevel;
scr.floorDepth = ODCODQOOQD.floorDepth;
scr.ri = ODCODQOOQD.indent;
scr.li = ODCODQOOQD.indent;
scr.rs = ODCODQOOQD.surrounding;
scr.ls = ODCODQOOQD.surrounding;
scr.tension = 0.5f;
if(objectType == 1){

pos.y -= waterLevel;
newnode.position = pos;
}
}
if(objectType == 2){
if(scr.surface != null)scr.surface.gameObject.active = false;
}
ODOQDQOO = newnode.gameObject;
if(markers > 1){
OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
if(materialType == 0){
OOCQDCOCCQ.OCOCQCODQC(materialType);
}
}
}
public void OQOOQDQQQC(float geo, bool renderMode, bool camMode){
OOCQDCOCCQ.OQQQDDCODC.Clear();
int ii = 0;
OQDQDOODCQ k;
foreach(Transform child  in obj)
{
if(child.name == "Markers"){
foreach(Transform marker   in child) {
MarkerScript markerScript = marker.GetComponent<MarkerScript>();
markerScript.objectScript = obj.GetComponent<RoadObjectScript>();
if(!markerScript.OCQQDCDQDD) markerScript.OCQQDCDQDD = OOCQDCOCCQ.OQOOQODDCQ(marker);
k  = new OQDQDOODCQ();
k.position = marker.position;
k.num = OOCQDCOCCQ.OQQQDDCODC.Count;
k.object1 = marker;
k.object2 = markerScript.surface;
k.tension = markerScript.tension;
k.ri = markerScript.ri;
if(k.ri < 1)k.ri = 1f;
k.li =markerScript.li;
if(k.li < 1)k.li = 1f;
k.rt = markerScript.rt;
k.lt = markerScript.lt;
k.rs = markerScript.rs;
if(k.rs < 1)k.rs = 1f;
k.ODCDDDDOOQ = markerScript.rs;
k.ls = markerScript.ls;
if(k.ls < 1)k.ls = 1f;
k.OODOOQQCDQ = markerScript.ls;
k.renderFlag = markerScript.bridgeObject;
k.OQQCCOOQCO = markerScript.distHeights;
k.newSegment = markerScript.newSegment;
k.floorDepth = markerScript.floorDepth;
k.waterLevel = waterLevel;
k.lockWaterLevel = markerScript.lockWaterLevel;
k.sharpCorner = markerScript.sharpCorner;
k.OCCCQOODOC = OOCQDCOCCQ;
markerScript.markerNum = ii;
markerScript.distance = "-1";
markerScript.ODOCDDQQQC = "-1";
OOCQDCOCCQ.OQQQDDCODC.Add(k);
ii++;
}
}
}
distance = "-1";

OOCQDCOCCQ.OOCDOOCOOD = ODCODQOOQD.roadWidth;

OOCQDCOCCQ.ODQQDQOCDD(geo, obj, ODCODQOOQD.OOQDOOQQ, renderMode, camMode, objectType);
}
public void StartCam(){

OQOOQDQQQC(0.5f, false, true);

}
public void ODDQOCDCOQ(){
int i = 0;
foreach(Transform child  in obj)
{
if(child.name == "Markers"){
i = 1;
string n;
foreach(Transform marker in child) {
if(i < 10) n = "Marker000" + i.ToString();
else if (i < 100) n = "Marker00" + i.ToString();
else n = "Marker0" + i.ToString();
marker.name = n;
ODOQDQOO = marker.gameObject;
i++;
}
}
}
markers = i - 1;

OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
}
public void OQOOQCQOCQ(){
RoadObjectScript[] scripts = (RoadObjectScript[])FindObjectsOfType(typeof(RoadObjectScript));
ArrayList rObj = new ArrayList();
foreach (RoadObjectScript script in scripts) {
if(script.transform != transform) rObj.Add(script.transform);
}
if(ODODQOQO == null){
ODODQOQO = OOCQDCOCCQ.OCDODQCQCQ();
ODODQOQOInt = OOCQDCOCCQ.OOQOOQCQOO();
}
OQOOQDQQQC(0.5f, true, false);

OOCQDCOCCQ.OODQDCODDC(Vector3.zero, ODCODQOOQD.raise, obj, ODCODQOOQD.OOQDOOQQ, rObj, handleVegetation);
OQOOQOCDCC();
}
public ArrayList RebuildObjs(){
RoadObjectScript[] scripts = (RoadObjectScript[])FindObjectsOfType(typeof(RoadObjectScript));
ArrayList rObj = new ArrayList();
foreach (RoadObjectScript script in scripts) {
if(script.transform != transform) rObj.Add(script.transform);
}
return rObj;
}
public void OCODQQDDDC(){

OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
if(OOCQDCOCCQ != null) OOCQDCOCCQ.OCODQQDDDC();
ODODDDOO = false;
}
public void OQOOQOCDCC(){
OOCQDCOCCQ.OQOOQOCDCC(ODCODQOOQD.applySplatmap, ODCODQOOQD.splatmapSmoothLevel, ODCODQOOQD.renderRoad, ODCODQOOQD.tuw, ODCODQOOQD.roadResolution, ODCODQOOQD.raise, ODCODQOOQD.opacity, ODCODQOOQD.expand, ODCODQOOQD.offsetX, ODCODQOOQD.offsetY, ODCODQOOQD.beveledRoad, ODCODQOOQD.splatmapLayer, ODCODQOOQD.OdQODQOD, OOQQQDOD, OOQQQDODOffset, OOQQQDODLength);
}
public void ODDDDCQCDC(){
OOCQDCOCCQ.ODDDDCQCDC(ODCODQOOQD.renderRoad, ODCODQOOQD.tuw, ODCODQOOQD.roadResolution, ODCODQOOQD.raise, ODCODQOOQD.beveledRoad, ODCODQOOQD.OdQODQOD, OOQQQDOD, OOQQQDODOffset, OOQQQDODLength);
}
public void OCQDOOOCQC(Vector3 pos, bool doInsert){


if(!displayRoad){
displayRoad = true;
OOCQDCOCCQ.OQOQDOOQOC(displayRoad, ODOQQDCQDD);
}

int first = -1;
int second = -1;
float dist1 = 10000;
float dist2 = 10000;
Vector3 newpos = pos;
OQDQDOODCQ k;
OQDQDOODCQ k1 = (OQDQDOODCQ)OOCQDCOCCQ.OQQQDDCODC[0];
OQDQDOODCQ k2 = (OQDQDOODCQ)OOCQDCOCCQ.OQQQDDCODC[1];

OOCQDCOCCQ.OCQQOCDOOQ(pos, out first, out second, out dist1, out dist2, out k1, out k2, out newpos);
pos = newpos;
if(doInsert && first >= 0 && second >= 0){
if(ODCODQOOQD.OOQDOOQQ && second == OOCQDCOCCQ.OQQQDDCODC.Count - 1){
ODCODOCOQD(pos);
}else{
k = (OQDQDOODCQ)OOCQDCOCCQ.OQQQDDCODC[second];
string name = k.object1.name;
string n;
int j = second + 2;
for(int i = second; i < OOCQDCOCCQ.OQQQDDCODC.Count - 1; i++){
k = (OQDQDOODCQ)OOCQDCOCCQ.OQQQDDCODC[i];
if(j < 10) n = "Marker000" + j.ToString();
else if (j < 100) n = "Marker00" + j.ToString();
else n = "Marker0" + j.ToString();
k.object1.name = n;
j++;
}
k = (OQDQDOODCQ)OOCQDCOCCQ.OQQQDDCODC[first];
Transform newnode = (Transform)Instantiate(k.object1.transform, pos, k.object1.rotation);
newnode.gameObject.name = name;
newnode.parent = ODOQQDCQDD;
MarkerScript scr = newnode.GetComponent<MarkerScript>();
scr.OCQQDCDQDD = false;
float	totalDist = dist1 + dist2;
float perc1 = dist1 / totalDist;
float paramDif = k1.ri - k2.ri;
scr.ri = k1.ri - (paramDif * perc1);
paramDif = k1.li - k2.li;
scr.li = k1.li - (paramDif * perc1);
paramDif = k1.rt - k2.rt;
scr.rt = k1.rt - (paramDif * perc1);
paramDif = k1.lt - k2.lt;
scr.lt = k1.lt - (paramDif * perc1);
paramDif = k1.rs - k2.rs;
scr.rs = k1.rs - (paramDif * perc1);
paramDif = k1.ls - k2.ls;
scr.ls = k1.ls - (paramDif * perc1);
OQOOQDQQQC(ODCODQOOQD.geoResolution, false, false);
if(materialType == 0)OOCQDCOCCQ.OCOCQCODQC(materialType);
if(objectType == 2) scr.surface.gameObject.active = false;
}
}
ODDQOCDCOQ();
}
public void OQODDOQQQC(){

DestroyImmediate(ODCODQOOQD.OODQDQDQQQ.gameObject);
OODQDQDQQQ = null;
ODDQOCDCOQ();
}
public void OOCCCCDCCQ(){

if(OOCQDCOCCQ == null){
OOOQOCDDDO(transform, null, null, null);
}
OOQOCDODQC.OOCOQDCDOO = true;
if(!OCDCCCOCOC){
geoResolution = 0.5f;
ODDQOCDCOQ();
if(objectType < 2) OQOOQCQOCQ();
Debug.Log("water 3.2");


}
if(displayRoad && objectType < 2){
OOCQDCOCCQ.road.transform.parent = null;
OOCQDCOCCQ.road.layer = 0;
OOCQDCOCCQ.road.name = gameObject.name;
}
else if(OOCQDCOCCQ.road != null)DestroyImmediate(OOCQDCOCCQ.road);
}
public void ODDQCDCQQD(){
}
public ArrayList OQCCDCOCQC(){
ArrayList param = new ArrayList();
foreach(Transform child in obj){
if(child.name == "Markers"){
foreach(Transform marker in child){
MarkerScript markerScript = marker.GetComponent<MarkerScript>();

param.Add(markerScript.ODDGDOOO);
param.Add(markerScript.ODDQOODO);
param.Add(markerScript.ODDQOOO);
}
}
}
return param;
}
public void OQQQCCDCQQ(){
ArrayList arrNames = new ArrayList();
ArrayList arrInts = new ArrayList();
ArrayList arrIDs = new ArrayList();

for(int i=0;i<ODODOQQO.Length;i++){
if(ODODQQOD[i] == true){
arrNames.Add(ODODQOOQ[i]);
arrIDs.Add(ODODOQQO[i]);
arrInts.Add(i);
}
}
ODODDQOO = (string[]) arrNames.ToArray(typeof(string));
OOQQQOQO = (int[]) arrInts.ToArray(typeof(int));
}
public void QOQDDDOOQ(){
foreach(Transform child  in obj) {
if(child.name == "Markers"){
foreach(Transform marker  in child) {
DestroyImmediate(marker.gameObject);
}}
		}
}
public void OQCCDOCOQQ(ArrayList arr, String[] DOODQOQO, String[] OODDQOQO){



ODODOQQO = DOODQOQO;
ODODQOOQ = OODDQOQO;






ArrayList markerArray = new ArrayList();
if(obj == null)OOOQOCDDDO(transform, null, null, null);
foreach(Transform child  in obj) {
if(child.name == "Markers"){
foreach(Transform marker  in child) {
MarkerScript markerScript = marker.GetComponent<MarkerScript>();
markerScript.OQODQQDO.Clear();
markerScript.ODOQQQDO.Clear();
markerScript.OQQODQQOO.Clear();
markerScript.ODDOQQOO.Clear();
markerArray.Add(markerScript);
}
}
}
mSc = (MarkerScript[]) markerArray.ToArray(typeof(MarkerScript));





ArrayList arBools = new ArrayList();



int counter1 = 0;
int counter2 = 0;
if(ODQQQQQO != null){

if(arr == null)return;
if(arr.Count == 0) return;



for(int i = 0; i < ODODOQQO.Length; i++){
ODODDQQO so = (ODODDQQO)arr[i];
for(int j = 0; j < ODQQQQQO.Length; j++){
if(ODODOQQO[i] == ODQQQQQO[j]){
counter1++;


if(ODODQQOD.Length > j ) arBools.Add(ODODQQOD[j]);
else arBools.Add(false);

foreach(MarkerScript scr  in mSc) {


int l = -1;
for(int k = 0; k < scr.ODDOOQDO.Length; k++){
if(so.id == scr.ODDOOQDO[k]){
l = k;
break;
}
}
if(l >= 0){
scr.OQODQQDO.Add(scr.ODDOOQDO[l]);
scr.ODOQQQDO.Add(scr.ODDGDOOO[l]);
scr.OQQODQQOO.Add(scr.ODDQOOO[l]);

if(so.sidewaysDistanceUpdate == 0 || (so.sidewaysDistanceUpdate == 2 && (float)scr.ODDQOODO[l] != so.oldSidwaysDistance)){
scr.ODDOQQOO.Add(scr.ODDQOODO[l]);

}else{
scr.ODDOQQOO.Add(so.splinePosition);

}




}else{
scr.OQODQQDO.Add(so.id);
scr.ODOQQQDO.Add(so.markerActive);
scr.OQQODQQOO.Add(true);
scr.ODDOQQOO.Add(so.splinePosition);
}

}
}
}
}
}


for(int i = 0; i < ODODOQQO.Length; i++){
ODODDQQO so = (ODODDQQO)arr[i];
bool flag = false;
for(int j = 0; j < ODQQQQQO.Length; j++){

if(ODODOQQO[i] == ODQQQQQO[j])flag = true;
}
if(!flag){
counter2++;

arBools.Add(false);

foreach(MarkerScript scr  in mSc) {
scr.OQODQQDO.Add(so.id);
scr.ODOQQQDO.Add(so.markerActive);
scr.OQQODQQOO.Add(true);
scr.ODDOQQOO.Add(so.splinePosition);
}

}
}

ODODQQOD = (bool[]) arBools.ToArray(typeof(bool));


ODQQQQQO = new String[ODODOQQO.Length];
ODODOQQO.CopyTo(ODQQQQQO,0);





ArrayList arInt= new ArrayList();
for(int i = 0; i < ODODQQOD.Length; i++){
if(ODODQQOD[i]) arInt.Add(i);
}
OOQQQOQO  = (int[]) arInt.ToArray(typeof(int));


foreach(MarkerScript scr  in mSc) {
scr.ODDOOQDO = (string[]) scr.OQODQQDO.ToArray(typeof(string));
scr.ODDGDOOO = (bool[]) scr.ODOQQQDO.ToArray(typeof(bool));
scr.ODDQOOO = (bool[]) scr.OQQODQQOO.ToArray(typeof(bool));
scr.ODDQOODO = (float[]) scr.ODDOQQOO.ToArray(typeof(float));

}



}
public bool CheckWaterHeights(){
bool flag = true;
float y = Terrain.activeTerrain.transform.position.y;
foreach(Transform child  in obj) {
if(child.name == "Markers"){
foreach(Transform marker  in child) {
//MarkerScript markerScript = marker.GetComponent<MarkerScript>();
if(marker.position.y - y <= 0.1f) flag = false;
}
}
}
return flag;
}
}
