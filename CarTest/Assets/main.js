#pragma strict



var playercar: Car;



private var inmenu:boolean = false;
private var pause:boolean = false;
private var ingame:boolean = true;
private var buttonwidth:int = 100;
private var buttonheight:int = 20;
function Start () {
	
}

function Update () {

	//key listeneer (esc)
	if(Input.GetKeyDown(KeyCode.Escape)){
		Debug.Log("esc pressed !");
		inmenu = true;
		if(ingame && !pause){
			Debug.Log("pausing..");
			pause = true;
			inmenu = true;
			Time.timeScale = 0.0;
		}
		else{
			if(ingame && pause){
				Debug.Log("unpausing..");
				pause = false;
				inmenu = false;
				Time.timeScale = 1.0;
			}
		}
	}
	
	
	//menu (load level,buy stuff,exit etc)

	
	//store scores money etc.
	
	//check if laps finished
}


function OnGUI(){

	if(!inmenu){
		//car information
		GUI.Label (Rect (550,280,150,100),"LAP : "+playercar.lap);
		GUI.Label(Rect (550,300,150,100), (playercar.rigidbody.velocity.magnitude * 3.6 )+" km/h");
		//if (GUI.Button (Rect (height,width,150,100), "I am a button")) {
		//	print ("You clicked the button!");
		//}
	}
	//Debug.Log("pause:"+pause+" ingame:"+ingame+" inmenu:"+inmenu);
	if(inmenu){
	//resume ?
		if(ingame){
			if(GUI.Button (Rect (Screen.width/2-40 ,40,buttonwidth,buttonheight),"Resume")){
				pause = false;
				ingame = true;
				inmenu = false;
				Time.timeScale = 1.0;
				Debug.Log("resume pressed");
			}
			if(GUI.Button (Rect (Screen.width/2-40 ,40+buttonheight+10,buttonwidth,buttonheight),"Restart")){
				pause = false;
				restart();
			}
		}
		else{
		//load level
			if(GUI.Button (Rect (Screen.width/2-40 ,buttonheight+40+10,buttonwidth,buttonheight),"Change Lap")){
				Debug.Log("Change lap clicked!");
			}
			//no laps
			//difficulty ?!
		//display highscore
		//buy stuff
			if(GUI.Button (Rect (Screen.width/2-40 ,2*buttonheight+40+1*10,buttonwidth,buttonheight),"Shop")){
				Debug.Log("Shop button clicked!");
			}
		//save
			if(GUI.Button (Rect (Screen.width/2-40 ,3*buttonheight+40+2*10,buttonwidth,buttonheight),"Save")){
				Debug.Log("Save button clicked!");
			}
		//exit
			if(GUI.Button (Rect (Screen.width/2-40 ,4*buttonheight+40+3*10,buttonwidth,buttonheight),"Exit")){
				Debug.Log("Exit button clicked");
			}
		}
	}
}
//restarts round
function restart(){
}

