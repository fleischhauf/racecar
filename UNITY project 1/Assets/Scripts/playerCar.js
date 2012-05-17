#pragma strict

var FLW : WheelCollider;
var FRW : WheelCollider;
var RLW : WheelCollider;
var RRW : WheelCollider;

var EngineTorque : float = 600.0;
var MaxEngineRPM : float = 8000.0;
var MinEngineRPM : float = 1000.0;
private var EngineRPM : float = 0.0;

var GearRatio : float[];
var CurrentGear : int = 0;

var velocity : float = 0;
//var wayPointContainer : GameObject;

function Start () {
	rigidbody.centerOfMass.y = -1.5;

}

function Update () {
	rigidbody.drag = rigidbody.velocity.magnitude / 250;
	EngineRPM = (FLW.rpm + FRW.rpm)/2 * GearRatio[CurrentGear];
	ShiftGears();
	
	FLW.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
	FRW.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
	//RLW.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
	//RRW.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
	
	//if (Input.GetAxis("Vertical")>0){ Debug.Log("UP input");Debug.Log(FRW.motorTorque);}
	//else if (Input.GetAxis("Vertical")<0) {Debug.Log("DOWN input");Debug.Log(FLW.motorTorque);}
	
	/*if (Input.GetButtonDown("Handbrake")){
		FLW.motorTorque=0;		
		FRW.motorTorque=0;
		RLW.motorTorque=0;
	}
	*/
	//Debug.Log(EngineRPM);
		
	FLW.steerAngle = 10 * Input.GetAxis("Horizontal");
	FRW.steerAngle = 10 * Input.GetAxis("Horizontal");
	
	velocity = (FLW.motorTorque + FRW.motorTorque) / 2;
	
	update_gui(velocity);
}
function update_gui(torque){

}
function OnGUI () {
	var kph = rigidbody.velocity.magnitude * 3.6;
	GUI.Label(Rect (300,300,150,100),"SPEED : "+kph);
	//lab.Text = "SPEED : "+velocity;
	if (GUI.Button (Rect (10,10,150,100), "I am a button")) {
		print ("You clicked the button!");
	}
}

function ShiftGears() {
	if ( EngineRPM >= MaxEngineRPM ) {
		var AppropriateGear : int = CurrentGear;
		
		for ( var i = 0; i < GearRatio.length; i ++ ) {
			if ( FLW.rpm * GearRatio[i] < MaxEngineRPM ) {
				AppropriateGear = i;
				break;
			}
		}
		
		CurrentGear = AppropriateGear;
	}
	
	if ( EngineRPM <= MinEngineRPM ) {
		AppropriateGear = CurrentGear;
		
		for ( var j = GearRatio.length-1; j >= 0; j -- ) {
			if ( FLW.rpm * GearRatio[j] > MinEngineRPM ) {
				AppropriateGear = j;
				break;
			}
		}
		
		CurrentGear = AppropriateGear;
	}
}