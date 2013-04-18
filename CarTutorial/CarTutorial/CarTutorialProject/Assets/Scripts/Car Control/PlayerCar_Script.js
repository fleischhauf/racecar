

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

private var EngineRPM : float = 0.0;

private var spd :int = 0;

//endgame variables
private var updates_after_finish = 0;
var race_over_text : GameObject;

//for display of racing position
var ai1 : GameObject;
var ai2 : GameObject;

function Start () {
	// I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
	rigidbody.centerOfMass.y = -1.5;
	//get list of waypoints from arbitrary ai:
	var ai1 = ai1.GetComponent(AICar_Script);
	waypoints = ai1.getWaypoints();
	var p = Random.value;
	var rand:int = Mathf.Floor((p*9));
	switch (rand) {
		case 0:
			text_lost = "Race Over!\nYou are last,\nyou suck!";
			break;
		case 1:
			text_lost = "Race Over!\nYou are last,\nweak man, weak.";
			break;
		case 2:
			text_lost = "Race Over!\nYou are last,\nI bet you don't have friends!";
			break;
		case 3:
			text_lost = "Race Over!\nYou are last,\nyou can't do anything right!";
			break;
		case 4:
			text_lost = "Race Over!\nYou are last,\ngive it up man!";
			break;
		case 5:
			text_lost = "Race Over!\nYou are last,\nBwahahahaha, idiot!";
			break;
		case 6:
			text_lost = "Race Over!\nYou are last,\nLoooser!";
			break;
		case 7:
			text_lost = "Race Over!\nYou are last,\ncome on man really?";
			break;
		case 8:
			text_lost = "Race Over!\nYou are last,\nBitch.";
			break;
		default:
			text_lost = "Race Over!\nYou are last!";
			break;
	}
	
}

//position in race vectors
private var list_vectors : Vector4[] = [Vector4(0,0,0,0),Vector4(1,0,0,0),Vector4(2,0,0,0)];
private var text_win = "Race Over!\nHell Yeah, you won!";
private var text_sec = "Race Over!\nOkay, 2nd place!";
private var text_lost = "";
function Update () {

	////check for poisiton in race
	//get scripts of ai
	if(!race_finished){
		findNextWaypoint();
		var ai1 = ai1.GetComponent(AICar_Script);
		var ai2 = ai2.GetComponent(AICar_Script);
		
		var ai1_waypoint = ai1.current_waypoint;
		var ai1_lap = ai1.lap_count;
		var ai1_dist = ai1.RelativeWaypointPosition.magnitude;
		
		var ai2_waypoint = ai2.current_waypoint;
		var ai2_lap = ai2.lap_count;
		var ai2_dist = ai2.RelativeWaypointPosition.magnitude;
		
		
		list_vectors = [Vector4(0,lap_count,current_waypoint,dist_waypoint),Vector4(1,ai1_lap,ai1_waypoint,ai1_dist),Vector4(2,ai2_lap,ai2_waypoint,ai2_dist)];
		//compare laps
	
		list_vectors = bubblesort(list_vectors);
		}
	//Debug.Log("("+list_vectors[0][0]+" "+list_vectors[0][1]+" "+list_vectors[0][2]+" "+list_vectors[0][3]+")("+
	//		list_vectors[1][0]+" "+list_vectors[1][1]+" "+list_vectors[1][2]+" "+list_vectors[1][3]+")("+
	//		list_vectors[2][0]+" "+list_vectors[2][1]+" "+list_vectors[2][2]+" "+list_vectors[2][3]+")");
	
	
	
	
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
	
	
	//calculation of speed converted from mph to kph
	spd = (EngineRPM * 6.08) / (GearRatio[CurrentGear] * GearRatio[5] * 88)* 1.609344;

	update_gui();
	//game over stop car
	if(race_finished){
		var t : TextMesh = race_over_text.GetComponent(TextMesh);
		if(list_vectors[0][0] == 0){
			t.text = text_win;
			}
		else if(list_vectors[1][0] == 0){
			t.text = text_sec;
		}else{
			t.text = text_lost;
			
		}
		//FrontLeftWheel.motorTorque = FrontLeftWheel.motorTorque * Mathf.Pow(0.01,updates_after_finish);
		//FrontRightWheel.motorTorque = FrontRightWheel.motorTorque * Mathf.Pow(0.01,updates_after_finish);
		rigidbody.drag = rigidbody.drag *Mathf.Pow(1.01,updates_after_finish);
		if(updates_after_finish < 150){
			race_over_text.transform.localScale.x += 4*0.000135;//race_over_text.transform.localScale.x + 0.135 * Mathf.Pow(1.1,updates_after_finish);
			race_over_text.transform.localScale.y += 4*0.000135;//race_over_text.transform.localScale.y + 0.135 * Mathf.Pow(1.1,updates_after_finish);
			race_over_text.transform.localScale.z += 4*0.000135;//race_over_text.transform.localScale.y + 0.135 * Mathf.Pow(1.1,updates_after_finish);
		}
		updates_after_finish += 1;
		if(rigidbody.velocity.magnitude <= 5){
			rigidbody.velocity = Vector3(0,0,0);
		}
	}
}

/*
updates gui related stuff
*/
var gui : GUIText;
function update_gui(){
	//km/h
	var speed ="Speed:" + spd.ToString() + " Km/H";
	//lap_count/lap_max
	var laps = "Lap:" + lap_count.ToString() + "/" + max_laps.ToString();
	//pos in race
	//can be done smarter
	var postext = "";
	if(list_vectors[0][0] == 0){
		postext = "Pos:1/3";
	}
	else if(list_vectors[1][0] == 0){
		postext = "Pos:2/3";
	}
	else if(list_vectors[2][0] == 0){
		postext = "Pos:3/3";
	}
	gui.text = postext + "\n" + laps + "\n" + speed;
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
	
	
	if(other.collider == finish_lap.collider && half_lap_ind == 1){
		half_lap_ind = 0;
		lap_count = lap_count + 1;
	}
	
	if(other.collider == half_lap.collider && half_lap_ind == 0){
		half_lap_ind = 1;
	}
	if(lap_count >= max_laps){
		race_finished = true;
	}

}
private var waypoints;
private var current_waypoint = 0;
private var dist_waypoint = 0.0;
//finding the position in amongst other players:
function findNextWaypoint(){
	// now we just find the relative position of the waypoint from the car transform,
	// that way we can determine how far to the left and right the waypoint is.
	
	var RelativeWaypointPosition = transform.InverseTransformPoint( Vector3( 
												waypoints[current_waypoint].position.x, 
												transform.position.y, 
												waypoints[current_waypoint].position.z ) );
																				
	dist_waypoint = RelativeWaypointPosition.magnitude;										
	// by dividing the horizontal position by the magnitude, we get a decimal percentage of the turn angle that we can use to drive the wheels
	inputSteer = RelativeWaypointPosition.x / RelativeWaypointPosition.magnitude;
	
	// now we do the same for torque, but make sure that it doesn't apply any engine torque when going around a sharp turn...
	if ( Mathf.Abs( inputSteer ) < 0.5 ) {
		inputTorque = RelativeWaypointPosition.z / RelativeWaypointPosition.magnitude - Mathf.Abs( inputSteer );
	}else{
		inputTorque = 0.0;
	}
	
	// this just checks if the car's position is near enough to a waypoint to count as passing it, if it is, then change the target waypoint to the
	// next in the list.
	if ( RelativeWaypointPosition.magnitude < 20 ) {
		current_waypoint ++;
		
		if ( current_waypoint >= waypoints.length ) {
			current_waypoint = 0;
		}
	}
}


/*
sorting out whos the first second and third
*/

function bubblesort(daten){
	var vertauschen=true;
	var n=0;
	var z=0;
	var hilfe;
	
	var count = 0;
	
	while (vertauschen == true)
	{
		count  =  count +1;
		vertauschen = false;
		while ((n+1) < daten.length)
		{

			var negativeNo = vectorCompare(daten[z],daten[z+1]) < 0;
			if (negativeNo)
			{
			
				hilfe = daten[z];
				daten[z] = daten[z+1];
				daten[z+1] = hilfe;
				vertauschen = true;
			}
			z = z + 1; 
			n = n + 1;
		}
		if(count > 10){Debug.Log("somethingswrong!");break;}
	}
	return(daten);
}

/*
position in race vector compare
*/
function vectorCompare(a : Vector4,b:Vector4)
{
	if(a.y > b.y){return(1);}
	else if(a.y < b.y){return(-1);}
	else if(a.z > b.z){return(1);}
	else if(a.z < b.z){return(-1);}
	else if(a.w > b.w){return(-1);}//for distance to next waypoint take minimum!
	else {return(1);}
}