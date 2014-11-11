var speed: float=10;
var ATK:int;
var faceToRight: boolean;
var playerStatus: PlayerStatus;
var damageText:GameObject;
var explodingParticle:GameObject;
function Start()
{
	playerStatus=GameObject.FindGameObjectWithTag("Player").GetComponent("PlayerStatus");
	faceToRight=playerStatus.faceToRight;
}
function OnTriggerEnter2D(other:Collider2D)
{
	if(other.tag=="Enemy")
	{

		if(faceToRight)
		{
			other.GetComponent(EnemyAction).Damage(ATK,Vector2(1,0));
		}
		else
		{
			other.GetComponent(EnemyAction).Damage(ATK,Vector2(-1,0));
		}
		Instantiate(explodingParticle,transform.position,transform.rotation);
		DestroyFire();
	}
	if(other.tag=="EnemySpawner")
	{
		Instantiate(explodingParticle,transform.position,transform.rotation);
		other.GetComponent(EnemySpawnerDamage).Damage(ATK);
		DestroyFire();
	}
} 
function FixedUpdate()
{
	FireMove();
	AutomaticallyDispear();
}
function AutomaticallyDispear()
{
	var screenPosition:Vector3=Camera.main.WorldToScreenPoint(transform.position);
	if(Mathf.RoundToInt(screenPosition.x)>=Camera.main.pixelWidth)
	{
		DestroyFire();
	}
	if(Mathf.RoundToInt(screenPosition.x)<=0)
	{
		DestroyFire();
	}
}
function DestroyFire()
{
	Destroy(gameObject);
}
function FireMove()
{
	if(faceToRight)
	{
	transform.position+=Vector3.right*speed*Time.deltaTime;
	
	}
	else
	{
	transform.position+=Vector3.left*speed*Time.deltaTime;
	}
}
