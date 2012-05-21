#pragma strict



var playercar: Car;



//menue state variables
private var inmenue:boolean = false;
private var pause:boolean = false;
private var ingame:boolean = true;
private var selectTrack:boolean = false;

private var buttonwidth:int = 100;
private var buttonheight:int = 20;

function Start () {
	
}

function Update () {


	//not so nice checking it every frame
	if(pause == false){
		Time.timeScale = 1.0;
		}


	//key listeneer (esc)
	if(Input.GetKeyDown(KeyCode.Escape) && ingame == true){
		Debug.Log("esc pressed !");
		inmenue = true;
		if(!pause){
			Debug.Log("pausing..");
			pause = true;
			inmenue = true;
			Time.timeScale = 0.0;
		}
		else{
			if(pause){
				Debug.Log("unpausing..");
				pause = false;
				inmenue = false;
				Time.timeScale = 1.0;
			}
		}
	}
	
	
	//menu (load level,buy stuff,exit etc)

	
	//store scores money etc.
	
	//check if laps finished
}


function OnGUI(){

	//CAR GUI
	if(!inmenue){
		GUI.Label (Rect (550,280,150,100),"LAP : "+playercar.lap);
		GUI.Label(Rect (550,300,150,100), (playercar.rigidbody.velocity.magnitude * 3.6 )+" km/h");
	}
	
	
	//Debug.Log("pause:"+pause+" ingame:"+ingame+" inmenu:"+inmenu);
	if(inmenue){
		//IN GAME MENUE
		if(ingame){
			if(GUI.Button (Rect (Screen.width/2-40 ,40+buttonheight+10,buttonwidth,buttonheight),"Resume")){
				pause = false;
				ingame = true;
				inmenue = false;
				Time.timeScale = 1.0;
				Debug.Log("resume pressed");
			}
			if(GUI.Button (Rect (Screen.width/2-40 ,40+2*buttonheight+2*10,buttonwidth,buttonheight),"Restart")){
				pause = false;
				Application.LoadLevel(Application.loadedLevelName);
			}
			if(GUI.Button (Rect (Screen.width/2-40 ,40+3*buttonheight+3*10,buttonwidth,buttonheight),"Main menue")){
				ingame = false;
			}
		}
		//MAIN MENUE
		else if(!selectTrack){
			//load level
			if(GUI.Button (Rect (Screen.width/2-40 ,buttonheight+40+10,buttonwidth,buttonheight),"Select Track")){
				Debug.Log("Change track clicked!");
				selectTrack = true;
			}
			//no laps
			//difficulty ?!
			//display highscore
			//buy stuff
			if(GUI.Button (Rect (Screen.width/2-40 ,2*buttonheight+40+2*10,buttonwidth,buttonheight),"Shop")){
				Debug.Log("Shop button clicked!");
			}
			//save
			if(GUI.Button (Rect (Screen.width/2-40 ,3*buttonheight+40+3*10,buttonwidth,buttonheight),"Save")){
				Debug.Log("Save button clicked!");
			}
			//exit
			if(GUI.Button (Rect (Screen.width/2-40 ,4*buttonheight+40+4*10,buttonwidth,buttonheight),"Exit")){
				Debug.Log("Exit button clicked");
				Application.Quit();
			}
		}
		// TRACK SELECTION
		else if(selectTrack){
			if(GUI.Button (Rect (Screen.width/2-40 , buttonheight+40+1*10,buttonwidth,buttonheight),"Track 1")){
				Debug.Log("selected track 1");
				Application.LoadLevel("cartest");
				pause = false;
				inmenue = false;
				ingame = true;
				selectTrack = false;
			}
			if(GUI.Button (Rect (Screen.width/2-40 , 2*buttonheight+40+2*10,buttonwidth,buttonheight),"Track 2")){
				Debug.Log("selected track 2");
			}
			if(GUI.Button (Rect (Screen.width/2-40 , 3*buttonheight+40+3*10,buttonwidth,buttonheight),"Back")){
				Debug.Log("Back");
				selectTrack = false;
			}
		}
	}
}
//restarts round
function restart(){
	//reset values
}

