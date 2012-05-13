#pragma strict


var drive: float;
var maxSteer: float;
var centerOfMass: Vector3;

private var wheels: Transform[];
private var wGraphics: Transform[];
private var colls: WheelCollider[];


function Start () {
	wheels = new Transform[4];
	wheels[0] = transform.Find("wcFL");
	wheels[1] = transform.Find("wcFR");
	wheels[2] = transform.Find("wcBL");
	wheels[3] = transform.Find("wcBR");
	
	wGraphics = new Transform[4];
	colls = new WheelCollider[4];
	//Debug.Log("starting");
	for (var i = 0; i < 4; i++) {
		wGraphics[i] = wheels[i].Find("WheelGraphic");
		colls[i] = wheels[i].gameObject.GetComponent(WheelCollider);
	}
	
	rigidbody.centerOfMass = centerOfMass;
}

function Update () {
//	Drive.
	var inputAxis = Input.GetAxis("Vertical");
	var fwdDrive = inputAxis * drive;
	colls[2].motorTorque = fwdDrive;
	colls[3].motorTorque = fwdDrive;
	//Debug.Log("fwdDrive:"+Input.GetAxis("Vertical"));

//	Steering.
	var steer = Input.GetAxis("Horizontal") * maxSteer;
	var steerRot = Quaternion.Euler(0, steer, 0);
	wheels[0].localRotation = steerRot;
	wheels[1].localRotation = steerRot;
	//Debug.Log("steer:"+steer);
//	Wheel rotation.
	for (var i = 0; i < 4; i++) {
	//	Revs per second.
		var rps = colls[i].rpm / 60.0;
		var angle = 360 * rps * Time.fixedDeltaTime;
		wGraphics[i].Rotate(-Vector3.up * angle);
	}
	var vel = rigidbody.velocity.magnitude;
		gearSound(vel);
}
function gearSound(vertAxis){
	var vertAxis2:float  = vertAxis;
	audio.pitch = vertAxis2/50;
	Debug.Log(audio.pitch);
}