#pragma strict


var drive: float;
var maxSteer: float;
var centerOfMass: Vector3;

var lap : int = 0;

var start_collider : Collider;
var middle_collider : Collider;


var motorSound : AudioSource;
var slideSound : AudioSource;

private var wheels: Transform[];
private var wGraphics: Transform[];
private var colls: WheelCollider[];

private var passed_start : int = 0;
private var passed_middle : int = 0;

private var isfirst : int = 1;
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
	
	var aSources = GetComponents(AudioSource);
	motorSound = aSources[0];
	slideSound = aSources[1];
	
	motorSound.Play();
	slideSound.Play();
	
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
	wheelSound();
			
	//update laps:
	if(passed_start == 1 && passed_middle == 1 && isfirst == 0){lap += 1; passed_start = 0; passed_middle = 0; isfirst = 1;}
}
function OnTriggerExit(collider : Collider) {
    // Debug-draw all contact points and normals
    //for (var contact : ContactPoint in collision.contacts) {
    //    Debug.DrawRay(contact.point, contact.normal, Color.white);
    //}
    //Debug.Log("collision with " + collider.name);
    if(collider == start_collider ){passed_start = 1; }
    if(collider == middle_collider ){passed_middle = 1; }
    if(collider == start_collider && passed_start == 1 && passed_middle == 1 && isfirst == 1){isfirst = 0 ;}
    else{}
    //maybe usefull for crashes:
    // Play a sound if the coliding objects had a big impact.        
    //if (collision.relativeVelocity.magnitude > 2)
    //    audio.Play();
}
function gearSound(vertAxis){
	var vertAxis2:float  = vertAxis;
	motorSound.pitch = vertAxis2/50;
	//Debug.Log(audio.pitch);
}
function wheelSound(){
	var sidewayslip:float = 0.0;
	for(var i = 0 ; i < 4; i++){
		var wheelcollInfo : WheelHit;
		colls[i].GetGroundHit(wheelcollInfo);
		sidewayslip += wheelcollInfo.sidewaysSlip;
		//sidewayslip += colls[i].GetGroundHit().sidewaysSlip;
	}
	sidewayslip = sidewayslip/4;
	Debug.Log("avg sidewayslip:"+sidewayslip);
	if(sidewayslip > 2){
		slideSound.volume = Mathf.Abs(sidewayslip)/10 ;
		}
	else{
		slideSound.volume = 0;
	}
}


