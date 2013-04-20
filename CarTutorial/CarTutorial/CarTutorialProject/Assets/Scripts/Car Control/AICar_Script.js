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

// Here's all the variables for the AI, the waypoints are determined in the "GetWaypoints" function.
// the waypoint container is used to search for all the waypoints in the scene, and the current
// waypoint is used to determine which waypoint in the array the car is aiming for.
var waypointContainer : GameObject;

private var waypoints : Array;
private var currentWaypoint : int = 0;

// input steer and input torque are the values substituted out for the player input. The 
// "NavigateTowardsWaypoint" function determines values to use for these variables to move the car
// in the desired direction.
private var inputSteer : float = 0.0;
private var inputTorque : float = 0.0;




var current_waypoint = 0;
var RelativeWaypointPosition : Vector3 = Vector3( 0,0,0);
// player car for the purpose of cheating
var playerCar : GameObject;

private var playerAhead : int = 0;
private var playerDist : float = 0.0;

private var updates_after_finish = 0;

function Start () {
	// I usually alter the center of mass to make the car more stable. I'ts less likely to flip this way.
	rigidbody.centerOfMass.y = -1.5;
	
	// Call the function to determine the array of waypoints. This sets up the array of points by finding
	// transform components inside of a source container.
	GetWaypoints();
}

function Update () {
	//cheating
	GetPlayerDist();
	
	// This is to limit the maximum speed of the car, adjusting the drag probably isn't the best way of doing it,
	// but it's easy, and it doesn't interfere with the physics processing.
	
	//adjust maximum speed according to relative player position to ai.
	
	rigidbody.drag = rigidbody.velocity.magnitude / 250;//250;
	if(playerDist != 0.0){
		var factor : float = Mathf.Abs(playerDist);
		//Debug.Log("playerAhead:"+playerAhead+" factor:"+factor);
		if(factor>=250){factor = 150.00;}
		Debug.Log("speedfactor:"+factor+" playerAhead:"+playerAhead);
		if(playerAhead == 0){	//make AI slower
			
			//250 normal speed ?, if drag bigger, then AI is slower !
			rigidbody.drag = Mathf.Abs(rigidbody.velocity.magnitude / (250-factor));//250;
		
		}else{ //make AI faster
			rigidbody.drag = Mathf.Abs(rigidbody.velocity.magnitude / (250+factor));
		
		}
	}
		
	// Call the funtion to determine the desired input values for the car. This essentially steers and
	// applies gas to the engine.
	NavigateTowardsWaypoint();
	
	// Compute the engine RPM based on the average RPM of the two wheels, then call the shift gear function
	EngineRPM = (FrontLeftWheel.rpm + FrontRightWheel.rpm)/2 * GearRatio[CurrentGear];
	ShiftGears();

	// set the audio pitch to the percentage of RPM to the maximum RPM plus one, this makes the sound play
	// up to twice it's pitch, where it will suddenly drop when it switches gears.
	audio.pitch = Mathf.Abs(EngineRPM / MaxEngineRPM) + 1.0 ;
	audio.volume = Mathf.Abs(EngineRPM / MaxEngineRPM) + 0.0;
	// this line is just to ensure that the pitch does not reach a value higher than is desired.
	if ( audio.pitch > 2.0 ) {
		audio.pitch = 2.0;
	}
	
	if (audio.volume > 1.0) {
		audio.volume = 1.0;
	}
	
	// finally, apply the values to the wheels.	The torque applied is divided by the current gear, and
	// multiplied by the calculated AI input variable.
	FrontLeftWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * inputTorque;
	FrontRightWheel.motorTorque = EngineTorque / GearRatio[CurrentGear] * inputTorque;
		
	// the steer angle is an arbitrary value multiplied by the calculated AI input.
	FrontLeftWheel.steerAngle = 10 * inputSteer;
	FrontRightWheel.steerAngle = 10 * inputSteer;
	
	//game over stop car
	if(race_finished){
		rigidbody.drag = rigidbody.drag *Mathf.Pow(1.01,updates_after_finish);
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
//distance from start to waypoint[x].
private var waypoint_dist:float[];
function GetWaypoints () {
	// Now, this function basically takes the container object for the waypoints, then finds all of the transforms in it,
	// once it has the transforms, it checks to make sure it's not the container, and adds them to the array of waypoints.
	var potentialWaypoints : Array = waypointContainer.GetComponentsInChildren( Transform );
	waypoints = new Array();
	
	for ( var potentialWaypoint : Transform in potentialWaypoints ) {
		if ( potentialWaypoint != waypointContainer.transform ) {
			waypoints[ waypoints.length ] = potentialWaypoint;
		}
	}
	var old_wp : Transform = waypoints[waypoints.length-1];
	var counter = 0;
	var sum_dist = 0.0;
	waypoint_dist = new Array(waypoints.length);
	for (var wp : Transform in waypoints){
		sum_dist  = sum_dist + (wp.position-old_wp.position).magnitude;
		waypoint_dist[ counter] = sum_dist;
		counter = counter+1;
		old_wp = wp;
	}
}

function NavigateTowardsWaypoint () {
	// now we just find the relative position of the waypoint from the car transform,
	// that way we can determine how far to the left and right the waypoint is.
	current_waypoint = currentWaypoint;
	RelativeWaypointPosition = transform.InverseTransformPoint( Vector3( 
												waypoints[currentWaypoint].position.x, 
												transform.position.y, 
												waypoints[currentWaypoint].position.z ) );
																				
																				
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
		currentWaypoint ++;
		
		if ( currentWaypoint >= waypoints.length ) {
			currentWaypoint = 0;
		}
	}

	

	
}

function GetPlayerDist() {
	//var playerdistvec : Vector3 = transform.InverseTransformPoint(Vector3(playerCar.transform.position.x,
	//																transform.position.y,
	//																playerCar.transform.z));
	// z positive -> player ahead -> accelerate
	// z negative -> player behind -> deccelerate

	var player_script : PlayerCar_Script = playerCar.GetComponent(PlayerCar_Script);
	var p_laps = player_script.lap_count;
	var p_wp = player_script.current_waypoint;
	var p_dist = player_script.dist_waypoint;
	
	var player_dist_on_track = 0;
	//var playerDistVec :Vector3 = transform.InverseTransformPoint(Vector3(playerCar.rigidbody.transform.position.x,
	//																0,
	//																playerCar.rigidbody.transform.position.z));
	
	//var distPlayer : float = playerDistVec.magnitude;
	playerDist = p_laps * waypoint_dist[waypoint_dist.length-1] + waypoint_dist[p_wp]- p_dist;
	computerDist = lap_count * waypoint_dist[waypoint_dist.length-1] + waypoint_dist[current_waypoint] - RelativeWaypointPosition.magnitude;

	//playerDist = distPlayer;
	if((playerDist-computerDist) > 0.0 ){
		playerAhead = 1;

	}else{
		playerAhead = 0;
	}
	var pd = playerDist;
	playerDist = Mathf.Abs(playerDist-computerDist);
	
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
//returns waypoint array to be accessible by other scripts
function getWaypoints(){
	return(waypoints);
	}