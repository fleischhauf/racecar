// These variables allow the script to power the wheels of the car.
var FrontLeftWheel : WheelCollider;
var FrontRightWheel : WheelCollider;

// These variables are for the gears, the array is the list of ratios. The script
// uses the defined gear ratios to determine how much torque to apply to the wheels.
var GearRatio : float[];
var CurrentGear : int = 0;

// These variables are just for applying torque to the wheels and shifting gears.
// using the defined Max and Min Engine RPM, the script can determine what gear the
// car needs to be in.
var EngineTorque : float = 600.0;
var MaxEngineRPM : float = 3000.0;
var MinEngineRPM : float = 1000.0;
var speed : GUIText;
private var EngineRPM : float = 0.0;


//endgame variables
private var updates_after_finish = 0;
var race_over_text : GameObject;


function Start () {
	// I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
	rigidbody.centerOfMass.y = -1.5;
}

function Update () {
	
	// This is to limith the maximum speed of the car, adjusting the drag probably isn't the best way of doing it,
	// but it's easy, and it doesn't interfere with the physics processing.
	rigidbody.drag = rigidbody.velocity.magnitude / 250;
	

	
	// Compute the engine RPM based on the average RPM of the two wheels, then call the shift gear function
	EngineRPM = (FrontLeftWheel.rpm + FrontRightWheel.rpm)/2 * GearRatio[CurrentGear];
	ShiftGears();

	// set the audio pitch to the percentage of RPM to the maximum RPM plus one, this makes the sound play
	// up to twice it's pitch, where it will suddenly drop when it switches gears.
	audio.pitch = Mathf.Abs(EngineRPM / MaxEngineRPM) + 1.0 ;
	audio.volume = Mathf.Abs(EngineRPM / MaxEngineRPM) + 0.2 ;
	// this line is just to ensure that the pitch does not reach a value higher than is desired.
	if ( audio.pitch > 2.0 ) {
		audio.pitch = 2.0;
	}
	
	if ( audio.volume > 1.0) {
		audio.volume = 1.0;
	}

	// finally, apply the values to the wheels.	The torque applied is divided by the current gear, and
	// multiplied by the user input variable.
	FrontLeftWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
	FrontRightWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * Input.GetAxis("Vertical");
		
	// the steer angle is an arbitrary value multiplied by the user input.
	FrontLeftWheel.steerAngle = 10 * Input.GetAxis("Horizontal");
	FrontRightWheel.steerAngle = 10 * Input.GetAxis("Horizontal");
	
	var spd : int = (EngineRPM * 6.08) / (GearRatio[CurrentGear] * GearRatio[5] * 88)* 1.609344;
	speed.text = "Speed:" + spd.ToString() + " Km/H";
	Debug.Log(speed);
	
	//game over stop car
	if(race_finished){
		Debug.Log(rigidbody.velocity.magnitude);
		//FrontLeftWheel.motorTorque = FrontLeftWheel.motorTorque * Mathf.Pow(0.01,updates_after_finish);
		//FrontRightWheel.motorTorque = FrontRightWheel.motorTorque * Mathf.Pow(0.01,updates_after_finish);
		rigidbody.drag = rigidbody.drag *Mathf.Pow(1.01,updates_after_finish);
		if(updates_after_finish < 1000){
			race_over_text.transform.localScale.x += race_over_text.transform.localScale.x + 0.135 * Mathf.Pow(1.1,updates_after_finish);
			race_over_text.transform.localScale.y += race_over_text.transform.localScale.y + 0.135 * Mathf.Pow(1.1,updates_after_finish);
			race_over_text.transform.localScale.z += race_over_text.transform.localScale.y + 0.135 * Mathf.Pow(1.1,updates_after_finish);
		}
		updates_after_finish += 1;
		if(rigidbody.velocity.magnitude <= 5){
			rigidbody.velocity = Vector3(0,0,0);
		}
	}
}

function ShiftGears() {
	// this funciton shifts the gears of the vehcile, it loops through all the gears, checking which will make
	// the engine RPM fall within the desired range. The gear is then set to this "appropriate" value.
	if ( EngineRPM >= MaxEngineRPM ) {
		var AppropriateGear : int = CurrentGear;
		
		for ( var i = 0; i < GearRatio.length; i ++ ) {
			if ( FrontLeftWheel.rpm * GearRatio[i] < MaxEngineRPM ) {
				AppropriateGear = i;
				break;
			}
		}
		
		CurrentGear = AppropriateGear;
	}
	
	if ( EngineRPM <= MinEngineRPM ) {
		AppropriateGear = CurrentGear;
		
		for ( var j = GearRatio.length-1; j >= 0; j -- ) {
			if ( FrontLeftWheel.rpm * GearRatio[j] > MinEngineRPM ) {
				AppropriateGear = j;
				break;
			}
		}
		
		CurrentGear = AppropriateGear;
	}
}


///LAP COUNTER
var finish_lap : GameObject;
var half_lap : GameObject;
var half_lap_ind : int = 0;
var lap_count: int = 0;
var max_laps : int = 0;
var race_finished : boolean = false;
function OnTriggerEnter(other : Collider){
	
	//Debug.Log("trigger entered !! hli:"+half_lap_ind+" lc:"+lap_count+" finish:"+(other.collider == finish_lap.collider)+" "+(other.collider == half_lap.collider));
	
	if(other.collider == finish_lap.collider && half_lap_ind == 1){
		half_lap_ind = 0;
		lap_count = lap_count + 1;
		Debug.Log("lap_count = "+lap_count);
	}
	
	if(other.collider == half_lap.collider && half_lap_ind == 0){
		Debug.Log("half_lap reached");
		half_lap_ind = 1;
	}
	if(lap_count >= max_laps){
		race_finished = true;
	}

}