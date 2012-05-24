import EasyRoads3D;
import EasyRoads3DEditor;
@CustomEditor(RoadObjectScript)
class RoadObjectEditorScript extends Editor
{
var counter : int;
var pe : float;
var tv : boolean;
var tvDone : boolean;
var debugDone : boolean;
var res : boolean;
var col : Collider;

function OnEnable(){
if(target.backupLocation == -1){
target.backupLocation = EditorPrefs.GetInt("ER3DbckLocation", 0);
}
if(target.OOCQDCOCCQ == null){
ODQDCCDCCO();
target.ODQDOOODOD(null, null, null);
}
if(target.customMesh != null){
if(target.customMesh.GetComponent(typeof(Collider))){
col = target.customMesh.GetComponent(typeof(Collider));
}else if(ODOOOQCCOD.terrain != null){
col = ODOOOQCCOD.terrain.GetComponent(typeof(TerrainCollider));
}
}else if(ODOOOQCCOD.terrain != null){
col = ODOOOQCCOD.terrain.GetComponent(typeof(TerrainCollider));
}




}
function OnInspectorGUI(){

EasyRoadsGUIMenu(true, true, target);
}
function OnSceneGUI() {
if(target.OOCQDCOCCQ == null){
ODQDCCDCCO();
target.ODQDOOODOD(null, null, null);
if(target.ODQDCCDOQD != EditorApplication.currentScene && target.OOCQDCOCCQ == null){
OOQOCDODQC.terrainList.Clear();
target.ODQDCCDOQD = EditorApplication.currentScene;
}

}

OnScene();

}
function EasyRoadsGUIMenu(flag : boolean, senderIsMain : boolean,  nRoadScript : RoadObjectScript) : int {





if(target.ODOCOODCDQ == null || target.OQDDCOQQCC == null || target.ODCODQOOQD == null || target.ODOCOODCDQ.Length == 0 ){
target.ODOCOODCDQ = new boolean[5];
target.OQDDCOQQCC = new boolean[5];
target.ODCODQOOQD = nRoadScript;

target.OODODOQDCO = target.OOCQDCOCCQ.OQODQCDQOO();
target.ODODQOQO = target.OOCQDCOCCQ.OCDODQCQCQ();
target.ODODQOQOInt = target.OOCQDCOCCQ.OOQOOQCQOO();
}
origAnchor = GUI.skin.box.alignment;
if(target.ODQOQCOCQC == null){
target.ODQOQCOCQC = Resources.Load("ER3DSkin", GUISkin);
target.OQDCOQDQOO = Resources.Load("ER3DLogo", Texture2D);
}
if(!flag) target.ODDDOQODQQ();
if(target.OQDQQCQDOO == -1) target.OODQDQDQQQ = null;
var origSkin : GUISkin = GUI.skin;
GUI.skin = target.ODQOQCOCQC;
EditorGUILayout.Space();

EditorGUILayout.BeginHorizontal ();
GUILayout.FlexibleSpace();
target.ODOCOODCDQ[0] = GUILayout.Toggle(target.ODOCOODCDQ[0] ,new GUIContent("", " Add road markers. "),"AddMarkers",GUILayout.Width(40), GUILayout.Height(22));
if(target.ODOCOODCDQ[0] == true && target.OQDDCOQQCC[0] == false) {
target.ODDDOQODQQ();
target.ODOCOODCDQ[0] = true;  target.OQDDCOQQCC[0] = true;
}
target.ODOCOODCDQ[1]  = GUILayout.Toggle(target.ODOCOODCDQ[1] ,new GUIContent("", " Insert road markers. "),"insertMarkers",GUILayout.Width(40),GUILayout.Height(22));
if(target.ODOCOODCDQ[1] == true && target.OQDDCOQQCC[1] == false) {
target.ODDDOQODQQ();
target.ODOCOODCDQ[1] = true;  target.OQDDCOQQCC[1] = true;
}
target.ODOCOODCDQ[2]  = GUILayout.Toggle(target.ODOCOODCDQ[2] ,new GUIContent("", " Process the terrain and create road geometry. "),"terrain",GUILayout.Width(40),GUILayout.Height(22));

if(target.ODOCOODCDQ[2] == true && (target.OQDDCOQQCC[2] == false || target.doTerrain)) {

if(target.markers < 2){
EditorUtility.DisplayDialog("Alert", "A minimum of 2 road markers is required before the terrain can be leveled!", "Close");
target.ODOCOODCDQ[2] = false;
}else{
if(target.disableFreeAlerts)EditorUtility.DisplayDialog("Alert", "Note that switching back to 'Edit Mode' is not supported in the free version\n\nClick Close to generate the road mesh and deform the terrain. This process can take some time depending on the terrains heightmap resolution and the optional vegetation removal, please be patient!\n\nYou can always use Undo afterwards to restore the terrain.", "Close");
if(!flag){
EditorUtility.DisplayDialog("Alert", "The Unity Terrain Object does not accept height values < 0. The river floor will be equal or higher then the water level. Position all markers higher above the terrain!", "Close");
target.ODOCOODCDQ[2] = false;
}else{
tvDone = false;
target.ODDDOQODQQ();
target.ODOCOODCDQ[2] = true;  target.OQDDCOQQCC[2] = true;
target.OCDCCCOCOC = true;
target.doTerrain = false;
target.markerDisplayStr = "Show Markers";
if(target.objectType < 2){



Undo.RegisterUndo(Terrain.activeTerrain.terrainData, "EasyRoads3D Terrain leveling");




if(!target.displayRoad){
target.displayRoad = true;
target.OOCQDCOCCQ.OQOQDOOQOC(true, target.ODOQQDCQDD);
}
OOQOCDODQC.OOCOQDCDOO = false;

OOCDODDODC(target);
if(target.OOQDOOQQ)target.OQOOQOCDCC();



}else{

target.OOCQDCOCCQ.OOCQDDCDCC(target.transform, false);
}
} 
}
target.QOQDDDOOQ();
}

target.ODOCOODCDQ[3]  = GUILayout.Toggle(target.ODOCOODCDQ[3] ,new GUIContent("", " General settings. "),"settings",GUILayout.Width(40),GUILayout.Height(22));
if(target.ODOCOODCDQ[3] == true && target.OQDDCOQQCC[3] == false) {
target.ODDDOQODQQ();
target.ODOCOODCDQ[3] = true;  target.OQDDCOQQCC[3] = true;
}
target.ODOCOODCDQ[4]  = GUILayout.Toggle(target.ODOCOODCDQ[4] ,new GUIContent("", "Version and Purchase Info"),"info",GUILayout.Width(40),GUILayout.Height(22));
if(target.ODOCOODCDQ[4] == true && target.OQDDCOQQCC[4] == false) {
target.ODDDOQODQQ();
target.ODOCOODCDQ[4] = true;  target.OQDDCOQQCC[4] = true;
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.skin = null;
GUI.skin = origSkin;
target.OQDQQCQDOO = -1;
for(var i : int  = 0; i < 5; i++){
if(target.ODOCOODCDQ[i]){
target.OQDQQCQDOO = i;
target.OCCDDQODCQ = i;
}
}
if(target.OQDQQCQDOO == -1) target.ODDDOQODQQ();
var markerMenuDisplay : int = 1;
if(target.OQDQQCQDOO == 0 || target.OQDQQCQDOO == 1) markerMenuDisplay = 0;
else if(target.OQDQQCQDOO == 2 || target.OQDQQCQDOO == 3 || target.OQDQQCQDOO == 4) markerMenuDisplay = 0;

if(target.OCDCCCOCOC && !target.ODOCOODCDQ[2] && Application.isPlaying){
EditorPrefs.SetBool("ERv2isPlaying", true);

}







if(target.OCDCCCOCOC && !target.ODOCOODCDQ[2]){ 
target.ODOCOODCDQ[2] = true;
target.OQDDCOQQCC[2] = true;
if(target.disableFreeAlerts)EditorUtility.DisplayDialog("Alert", "Switching back to 'Edit Mode' to add markers marker settings is not supported in the free version\n\nDrag the road mesh to the root of the hierarchy and delete the EasyRoads3D editor object once the road is ready!\n\nYou can use Undo to restore the terrain.", "Close");
}
GUI.skin.box.alignment = TextAnchor.UpperLeft;
if(target.OQDQQCQDOO >= 0 && target.OQDQQCQDOO != 4){
if(target.OODODOQDCO == null || target.OODODOQDCO.Length == 0){

target.OODODOQDCO = target.OOCQDCOCCQ.OQODQCDQOO();
target.ODODQOQO = target.OOCQDCOCCQ.OCDODQCQCQ();
target.ODODQOQOInt = target.OOCQDCOCCQ.OOQOOQCQOO();
}
EditorGUILayout.BeginHorizontal();
GUILayout.Box(target.OODODOQDCO[target.OQDQQCQDOO], GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
}
if(target.OQDQQCQDOO == -1 && target.OODQDQDQQQ != null) Selection.activeGameObject =  target.OODQDQDQQQ.gameObject;
GUI.skin.box.alignment = origAnchor;

if(target.erInit == "" || (OOQOCDODQC.debugFlag && !debugDone)){
debugDone = true;
target.erInit = "done";
target.OOCQDCOCCQ.erInit = target.erInit;



this.Repaint();

}
if(target.erInit != "" && res){

target.OQOOQDQQQC(target.geoResolution, false, false);
res = false;
}
if(target.erInit.Length == 0){
}else if(target.OQDQQCQDOO == 0 || target.OQDQQCQDOO == 1){
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Refresh Surfaces", GUILayout.Width(200))){
target.ODDQOCDCOQ();
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}else if(target.OQDQQCQDOO == 3){

GUI.skin.box.alignment = TextAnchor.MiddleLeft;
GUILayout.Box(" General Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
if(target.objectType != 2){
GUILayout.Space(10);
var oldDisplay : boolean = target.displayRoad;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Display object", "This will activate/deactivate the road object transforms"), GUILayout.Width(125) );
target.displayRoad = EditorGUILayout.Toggle (target.displayRoad, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(oldDisplay != target.displayRoad){
target.OOCQDCOCCQ.OQOQDOOQOC(target.displayRoad, target.ODOQQDCQDD);
}
}
if(target.materialStrings == null){target.materialStrings = new String[2]; target.materialStrings[0] = "Diffuse Shader"; target.materialStrings[1] = "Transparant Shader"; }
if(target.materialStrings.Length == 0){target.materialStrings = new String[2]; target.materialStrings[0] = "Diffuse Shader"; target.materialStrings[1] = "Transparant Shader"; }
var cm : int = target.materialType;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Surface Material", "The material type used for the road surfaces."), GUILayout.Width(125) );
target.materialType = EditorGUILayout.Popup (target.materialType, target.materialStrings,   GUILayout.Width(115));
EditorGUILayout.EndHorizontal();
if(cm != target.materialType) target.OOCQDCOCCQ.OCOCQCODQC(target.materialType);
if(target.materialType == 1){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("        Surface Opacity", "This controls the transparacy level of the surface objects."), GUILayout.Width(125) );
var so : float = target.surfaceOpacity;
target.surfaceOpacity = EditorGUILayout.Slider(target.surfaceOpacity, 0, 1,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(so != target.surfaceOpacity) target.OOCQDCOCCQ.ODCQOCQOOO(target.surfaceOpacity);
}
EditorGUILayout.Space();
if(target.objectType < 2){
var od: boolean = target.multipleTerrains;
}
GUI.enabled = true;
GUI.enabled = false;
var cl = target.backupLocation;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Backup Location", "Use outside Assets folder unless you are using the asset server."), GUILayout.Width(125) );
target.backupLocation = EditorGUILayout.Popup (target.backupLocation, target.backupStrings,   GUILayout.Width(115));
EditorGUILayout.EndHorizontal();
if(target.backupLocation != cl){
if(target.backupLocation == 1){
if(EditorUtility.DisplayDialog("Backup Location", "Changing the backup location to inside the assets folder is only recommended when you want to synchronize EasyRoads3D backup files with the assetserver.\n\nWould you like to continue?", "Yes", "No")){
EditorPrefs.SetInt("ER3DbckLocation", target.backupLocation);
OQDODDQQDD.SwapFiles(target.backupLocation);
EditorUtility.DisplayDialog("Confirmation", "The backup location has been updated, all backup folders and files have been copied to the new location.\n\nUse CTRL+R to update the assets folder!", "Close");
}else target.backupLocation = 0;
}else{
if(EditorUtility.DisplayDialog("Backup Location", "The backup location will be changed to outside the assets folder.\n\nWould you like to continue?", "Yes", "No")){
EditorPrefs.SetInt("ER3DbckLocation", target.backupLocation);
OQDODDQQDD.SwapFiles(target.backupLocation);
EditorUtility.DisplayDialog("Confirmation", "The backup location has been updated, all backup folders and files have been copied to the new location.\n\nUse CTRL+R to update the assets folder!", "Close");
}else target.backupLocation = 1;
}
}
GUI.enabled = true;
od = OOQOCDODQC.debugFlag;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Enable Debugging", "This will enable debugging."), GUILayout.Width(125) );;
OOQOCDODQC.debugFlag = EditorGUILayout.Toggle (OOQOCDODQC.debugFlag, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(od != OOQOCDODQC.debugFlag && OOQOCDODQC.debugFlag) debugDone = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Free version alerts", "Uncheck to disable free version alerts."), GUILayout.Width(125) );;
target.disableFreeAlerts = EditorGUILayout.Toggle (target.disableFreeAlerts, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
GUILayout.Box(" Object Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
EditorGUILayout.BeginHorizontal();
var wd : float = target.roadWidth;
if(target.objectType == 0)GUILayout.Label(new GUIContent("    Road width", "The width of the road") ,  GUILayout.Width(125));
else GUILayout.Label(new GUIContent("    River Width", "The width of the river") ,  GUILayout.Width(125));
target.roadWidth = EditorGUILayout.FloatField(target.roadWidth, GUILayout.Width(40) );
EditorGUILayout.EndHorizontal();
if(wd != target.roadWidth) target.OQOOQDQQQC(target.geoResolution, false, false);
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Default Indent", "The distance from the left and right side of the road to the part of the terrain levelled at the same height as the road"),  GUILayout.Width(125));
target.indent = EditorGUILayout.FloatField(target.indent, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Raise Markers", "This will raise the position of the markers (m)."), GUILayout.Width(125) );;
target.raiseMarkers = EditorGUILayout.FloatField (target.raiseMarkers, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Force Y Position", "When toggled on, ne road markers will inherit the y position of the previous marker."), GUILayout.Width(125) );;
target.forceY = EditorGUILayout.Toggle (target.forceY, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(target.forceY){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("        Y Change", "The marker will be raised / lowered according this amount for every 100 meters."), GUILayout.Width(125) );;
target.yChange = EditorGUILayout.FloatField (target.yChange, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
}
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Surrounding", "This represents the distance over which the terrain will be gradually leveled to the original terrain height"),  GUILayout.Width(125));
target.surrounding = EditorGUILayout.FloatField(target.surrounding, GUILayout.Width(40));
EditorGUILayout.EndHorizontal();
var OldClosedTrack : boolean = target.OOQDOOQQ;
EditorGUILayout.BeginHorizontal();
if(target.objectType == 0)GUILayout.Label(new GUIContent("    Closed Track", "This will connect the 'start' and 'end' of the road"), GUILayout.Width(125) );
else if(target.objectType == 1)GUILayout.Label(new GUIContent("    Closed River", "This will connect the 'start' and 'end' of the river"), GUILayout.Width(125) );
else GUILayout.Label(new GUIContent("    Closed Object", "This will connect the 'start' and 'end' of the object"), GUILayout.Width(125) );
target.OOQDOOQQ = EditorGUILayout.Toggle (target.OOQDOOQQ, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(OldClosedTrack != target.OOQDOOQQ){
target.ODDQOCDCOQ();
}
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Geometry Resolution", "The polycount of the generated surfaces. It is recommended to use a low resolution while creating the road. Use the maximum resolution when processing the final terrain."), GUILayout.Width(125) );
var gr : float = target.geoResolution;
target.geoResolution = EditorGUILayout.Slider(target.geoResolution, 0.5, 5,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(gr != target.geoResolution) target.OQOOQDQQQC(target.geoResolution, false, false);
EditorGUILayout.Space();
GUILayout.Box(" Render Settings", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
if(ODOOOQCCOD.selectedTerrain == null)ODOOOQCCOD.OCODDCCDQC();
var st : int = ODOOOQCCOD.selectedTerrain;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Active Terrain", "The terrain that will be updated"), GUILayout.Width(125) );
ODOOOQCCOD.selectedTerrain = EditorGUILayout.Popup (ODOOOQCCOD.selectedTerrain, ODOOOQCCOD.terrainStrings,   GUILayout.Width(115));
EditorGUILayout.EndHorizontal();
if(st != ODOOOQCCOD.selectedTerrain)ODOOOQCCOD.OQCODDDOOO();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("    Update Vegetation", "When toggled on tree and detail objects near the road will be removed when rendering the terrain."), GUILayout.Width(125) );;
target.handleVegetation = EditorGUILayout.Toggle (target.handleVegetation, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(target.handleVegetation){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("      Tree Distance (m)", "The distance from the left and the right of the road up to which terrain trees should be removed."), GUILayout.Width(125) );
var tr : float = target.OCQDQCQCQC;
target.OCQDQCQCQC = EditorGUILayout.Slider(target.OCQDQCQCQC, 0, 25,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(tr != target.OCQDQCQCQC) target.OOCQDCOCCQ.OCQDQCQCQC = target.OCQDQCQCQC;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent("      Detail Distance (m)", "The distance from the left and the right of the road up to which terrain detail opbjects should be removed."), GUILayout.Width(125) );
tr = target.ODOCCDCDOC;
target.ODOCCDCDOC = EditorGUILayout.Slider(target.ODOCCDCDOC, 0, 25,  GUILayout.Width(150));
EditorGUILayout.EndHorizontal();
if(tr != target.ODOCCDCDOC) target.OOCQDCOCCQ.ODOCCDCDOC = target.ODOCCDCDOC;
}
EditorGUILayout.Space();


}else if(target.OQDQQCQDOO == 2){

EditorGUILayout.Space();
if(target.objectType == 0)GUILayout.Box(" Road Settings:", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
else GUILayout.Box(" River Settings:", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
GUILayout.Space(10);
var oldRoad : boolean = target.renderRoad;
var oldRoadResolution : float = target.roadResolution;
var oldRoadUV : float = target.tuw;
var oldRaise : float = target.raise;
var oldSegments : int = target.OdQODQOD;
var oldOOQQQDOD : float = target.OOQQQDOD;
var oldOOQQQDODOffset : float = target.OOQQQDODOffset;
var oldOOQQQDODLength : float = target.OOQQQDODLength;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Render"," When active, terrain matching road geometry will be created."), GUILayout.Width(105) );
target.renderRoad = EditorGUILayout.Toggle (target.renderRoad, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(target.renderRoad){
if(target.objectType == 0){
if(target.roadTexture == null){
mat = Resources.Load("roadMaterial", typeof(Material));
target.roadTexture = mat.mainTexture as Texture2D;
}
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Material"," The road texture."), GUILayout.Width(105) );
if(GUILayout.Button (target.roadTexture, GUILayout.Width(75), GUILayout.Height(75))){
}
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
}
EditorGUILayout.BeginHorizontal();
GUI.enabled = false;
GUILayout.Label(new GUIContent(" Road Segments"," The number of segments over the width of the road."), GUILayout.Width(105) );
target.OdQODQOD = EditorGUILayout.IntSlider(target.OdQODQOD, 1, 10,  GUILayout.Width(175));
GUI.enabled = true;
EditorGUILayout.EndHorizontal();
if(target.OdQODQOD > 1){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Bumpyness"," The bumypness of the surface of the road."), GUILayout.Width(95) );
target.OOQQQDOD = EditorGUILayout.Slider(target.OOQQQDOD, 0, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Bumpyness Offset"," The bumypness variation of the road."), GUILayout.Width(95) );
target.OOQQQDODOffset = EditorGUILayout.Slider(target.OOQQQDODOffset, 0, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Bumpyness Density"," The bumypness density on the road."), GUILayout.Width(95) );
target.OOQQQDODLength = EditorGUILayout.Slider(target.OOQQQDODLength, 0.01, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
}
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Resolution"," The resolution level of the road geometry."), GUILayout.Width(95) );
target.roadResolution = EditorGUILayout.IntSlider(target.roadResolution, 1, 10,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
if(target.objectType == 0){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" UV Mapping"," Use the slider to control texture uv mapping of the road geometry."), GUILayout.Width(95) );
target.tuw = EditorGUILayout.Slider(target.tuw, 1, 30,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Raise (cm)","Optionally increase this setting when parts of the terrain stick through the road geometry. It is recommended to adjust these areas using the terrain tools!"), GUILayout.Width(95) );
target.raise = EditorGUILayout.Slider(target.raise, 0, 100, GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
}else{
}
GUILayout.Space(5);
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Save Geometry", GUILayout.Width(175))){
target.ODDQCDCQQD();
Debug.Log("Road object geometry saved");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
}
EditorGUILayout.Space();
if(oldRoad != target.renderRoad || oldRoadResolution != target.roadResolution || oldRoadUV != target.tuw || oldRaise != target.raise || oldSegments != target.OdQODQOD || target.OOQQQDOD != oldOOQQQDOD || target.OOQQQDODOffset != oldOOQQQDODOffset || target.OOQQQDODLength != oldOOQQQDODLength){

target.ODDDDCQCDC();

}
GUILayout.Box(" Terrain Settings:", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));
GUILayout.Space(5);
var smooth:float = 0;
var oldApplySplatmap : boolean = target.applySplatmap;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Apply Splatmap"," When active, the road will be added to the terrain splatmap. The quality highly depends on the terrain Control Texture Resolution size."), GUILayout.Width(125) );
target.applySplatmap = EditorGUILayout.Toggle (target.applySplatmap, GUILayout.Width(25));
EditorGUILayout.EndHorizontal();
if(target.applySplatmap){
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Terrain texture", "This represents the terrain texture which will be used for the road spatmap."), GUILayout.Width(125) );
target.splatmapLayer = EditorGUILayout.IntPopup (target.splatmapLayer, target.ODODQOQO, target.ODODQOQOInt,   GUILayout.Width(120));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Expand"," Use this setting to increase the size of the splatmap."), GUILayout.Width(125) );
target.expand = EditorGUILayout.IntSlider(target.expand,0, 3, GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUI.enabled = false;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Smooth Level"," Use this setting to blur the road splatmap for smoother results."), GUILayout.Width(125) );
target.smooth = EditorGUILayout.IntSlider (target.smooth, 0, 3,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUI.enabled = true;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Offset x"," Moves the road splatmap in the x direction."), GUILayout.Width(125) );
target.offsetX = EditorGUILayout.IntField (target.offsetX, GUILayout.Width(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Offset y"," Moves the road splatmap in the y direction."), GUILayout.Width(125) );
target.offsetY= EditorGUILayout.IntField (target.offsetY, GUILayout.Width(50));
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Opacity","Use this setting to blend the road splatmap with the terrain splatmap."), GUILayout.Width(125) );
target.opacity = EditorGUILayout.Slider (target.opacity, 0, 1,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUILayout.Space(5);
GUI.enabled = target.OOODCOOOOO;
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Apply Changes", GUILayout.Width(175))){
target.OQOOQOCDCC();

if(target.OOQDOOQQ)target.OQOOQOCDCC();
target.OOODCOOOOO = false;
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}
GUILayout.Space(5);
if(oldApplySplatmap != target.applySplatmap){
target.OQOOQOCDCC();

if(target.OOQDOOQQ)target.OQOOQOCDCC();
}
GUI.enabled = true;
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Terrain Smoothing:", "This will smoothen the terrain near the surface edges according the below distance."), GUILayout.Width(175) );
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Edges (m)","This represents the smoothen distance."), GUILayout.Width(125) );
target.smoothDistance = EditorGUILayout.Slider (target.smoothDistance, 0, 5,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUILayout.Space(5);
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Update Edges", GUILayout.Width(175))){
Undo.RegisterUndo(Terrain.activeTerrain.terrainData, "EasyRoads3D Terrain smooth");
target.OOCQDCOCCQ.ODDQQCCDOQ(target.smoothDistance, 0);
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.Label(new GUIContent(" Surrounding (m)","This represents the smoothen distance."), GUILayout.Width(125) );
target.smoothSurDistance = EditorGUILayout.Slider (target.smoothSurDistance, 0, 15,  GUILayout.Width(175));
EditorGUILayout.EndHorizontal();
GUILayout.Space(5);
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Update Surrounding", GUILayout.Width(175))){
Undo.RegisterUndo(Terrain.activeTerrain.terrainData, "EasyRoads3D Terrain smooth");
target.OOCQDCOCCQ.ODDQQCCDOQ(target.smoothSurDistance, 1);
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
}else if(target.OQDQQCQDOO == 4){
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();

GUILayout.Label(target.OQDCOQDQOO);
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
GUILayout.Label(" EasyRoads3D v"+target.version);
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();

GUILayout.Label(" Version Type: Free Version", GUILayout.Height(22));
if(GUILayout.Button ("i", GUILayout.Width(22))){
Application.OpenURL ("http://www.unityterraintools.com");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Help", GUILayout.Width(225))){
Application.OpenURL ("http://www.unityterraintools.com/manual.php");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
GUI.skin = origSkin;
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
GUILayout.Box("Check out the full version if you had like to take advantage of all the features including the built-in paramatric modeling tool", GUILayout.Width(200));
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.Space();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Purchase Full Version from website", GUILayout.Width(225))){
Application.OpenURL ("http://www.unityterraintools.com/store.php");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
EditorGUILayout.BeginHorizontal();
GUILayout.FlexibleSpace();
if(GUILayout.Button ("Purchase from Assetstore", GUILayout.Width(225))){
Application.OpenURL("http://u3d.as/content/anda-soft/easy-roads3d-pro/1Ch");
}
GUILayout.FlexibleSpace();
EditorGUILayout.EndHorizontal();
}else{
if(target.markers != target.ODOQQDCQDD.childCount){
target.ODDQOCDCOQ();
}
EditorGUILayout.Space();
GUILayout.Box(" General Info", GUILayout.MinWidth(253), GUILayout.MaxWidth(1500), GUILayout.Height(20));

if(RoadObjectScript.objectStrings == null){
RoadObjectScript.objectStrings = new String[3];
RoadObjectScript.objectStrings[0] = "Road Object"; RoadObjectScript.objectStrings[1]="River Object";RoadObjectScript.objectStrings[2]="Procedural Mesh Object";
}
if(target.distance == "-1"){
var ar : String[]  = target.OOCQDCOCCQ.OODODQCOOQ(-1);
target.distance = ar[0];
}
EditorGUILayout.Space();
GUILayout.Label(" Object Type: " + RoadObjectScript.objectStrings[target.objectType]);
if(target.objectType == 0) GUILayout.Label(" Total Road Distance: " + target.distance.ToString() + " km");
}
EditorGUILayout.Space();
if (GUI.tooltip != "") GUI.Label(new Rect(Input.mousePosition.x, Screen.height - Input.mousePosition.y, 200, 40), GUI.tooltip);
if (GUI.changed)
{
target.OOODCOOOOO = true;
}
return markerMenuDisplay;
}
function OnScene(){
var cEvent : Event = Event.current;
if(target.OCCDDQODCQ != -1  && Event.current.shift) target.ODOCOODCDQ[target.OCCDDQODCQ] = true;
if(target.ODOCOODCDQ == null || target.ODOCOODCDQ.Length == 0){
target.ODOCOODCDQ = new boolean[5];
target.OQDDCOQQCC = new boolean[5];
}
if((cEvent.shift  && cEvent.type == EventType.mouseDown) || target.ODOCOODCDQ[1])
{
var hit : RaycastHit;
var mPos : Vector2 = cEvent.mousePosition;
mPos.y = Screen.height - mPos.y - 40;
var ray : Ray = Camera.current.ScreenPointToRay(mPos);


if (col.Raycast (ray, hit, 3000))
{
if(target.ODOCOODCDQ[0]){
Undo.RegisterSceneUndo("Add Marker");
target.ODCODOCOQD(hit.point);
}
else if(target.ODOCOODCDQ[1] && cEvent.type == EventType.mouseDown && cEvent.shift){
Undo.RegisterSceneUndo("Insert Marker");
target.OCQDOOOCQC(hit.point, true);
}
else if(target.ODOCOODCDQ[1]  && cEvent.shift) target.OCQDOOOCQC(hit.point, false);
else if(target.handleInsertFlag) target.handleInsertFlag = target.OOCQDCOCCQ.OOCDCCQCCD();
Selection.activeGameObject = target.obj.gameObject;
}
}
if(target.OCDCCOOCQC != target.obj || target.obj.name != target.ODOCQOCDDQ){
target.OOCQDCOCCQ.ODDDQQQOOD();
target.OCDCCOOCQC = target.obj;
target.ODOCQOCDDQ = target.obj.name;
}
if(target.OODQDQDQQQ != null){
target.OOCQDCOCCQ.OOCDCCQCCD();

}
if(target.transform.position != Vector3.zero) target.transform.position = Vector3.zero;
}
static function ODQDCCDCCO(){

var terrains : Terrain[]  = MonoBehaviour.FindObjectsOfType(typeof(Terrain));
for(terrain in terrains) {
if(!terrain.gameObject.GetComponent(EasyRoads3DTerrainID)){
var terrainscript : EasyRoads3DTerrainID = terrain.gameObject.AddComponent("EasyRoads3DTerrainID");
var id : String = UnityEngine.Random.Range(100000000,999999999).ToString();
terrainscript.terrainid = id;

path = Directory.GetCurrentDirectory() + OQDODDQQDD.backupFolder+ "/" + id;
if( !Directory.Exists(path)){
try{
Directory.CreateDirectory( path);
}
catch(e:System.Exception)
{
Debug.Log("Could not create directory: " + path + " " + e);
}
}
if(Directory.Exists(path)){


}
}
}
}
function OOCDODDODC(target){
EditorUtility.DisplayProgressBar("Build EasyRoads3D Object","Initializing", 0);

scripts = FindObjectsOfType(typeof(RoadObjectScript));
var rObj:ArrayList = new ArrayList();
for(script in scripts) {
if(script.transform != target.transform) rObj.Add(script.transform);
}
if(target.ODODQOQO == null){
target.ODODQOQO = target.OOCQDCOCCQ.OCDODQCQCQ();
target.ODODQOQOInt = target.OOCQDCOCCQ.OOQOOQCQOO();
}
target.OQOOQDQQQC(0.5f, true, false);

var hitOCQCCCQQQO : ArrayList = target.OOCQDCOCCQ.OODQDCODDC(Vector3.zero, target.raise, target.obj, target.OOQDOOQQ, rObj, target.handleVegetation);
var changeArr : ArrayList = new ArrayList();
var stepsf : float = Mathf.Floor(hitOCQCCCQQQO.Count / 10);
var steps : int = Mathf.RoundToInt(stepsf);
for(i = 0; i < 10;i++){
changeArr = target.OOCQDCOCCQ.OQCCCOOCOQ(hitOCQCCCQQQO, i * steps, steps, changeArr);
EditorUtility.DisplayProgressBar("Build EasyRoads3D Object","Updating Terrain", i * 10);
}

changeArr = target.OOCQDCOCCQ.OQCCCOOCOQ(hitOCQCCCQQQO, 10 * steps, hitOCQCCCQQQO.Count - (10 * steps), changeArr);
target.OOCQDCOCCQ.OODCDCOCQC(changeArr, rObj);

target.OQOOQOCDCC();
EditorUtility.ClearProgressBar();

}
function OCQOOCQQDO(target){
EditorUtility.DisplayProgressBar("Restore EasyRoads3D Object","Restoring terrain data", 0f);
target.OCODQQDDDC();
EditorUtility.ClearProgressBar();
}
}
