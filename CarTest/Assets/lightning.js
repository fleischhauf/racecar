#pragma strict
var time_counter : int = 0;

function Start () {

}

function Update () {

	time_counter += 1;
	if(time_counter > 300){
		time_counter = -4;
	}
	if(time_counter < 0) {
		light.intensity = 4;
	}
	if(time_counter > 0 ) {
		light.intensity = 0;
		}
	
}