@CustomEditor(EasyRoads3DTerrainID)
class TerrainEditorScript extends Editor
{
function OnSceneGUI()
{
if(Event.current.shift && RoadObjectScript.OCDCCOOCQC != null) Selection.activeGameObject = RoadObjectScript.OCDCCOOCQC.gameObject;
else RoadObjectScript.OCDCCOOCQC = null;
}
}
