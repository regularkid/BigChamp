let EnemyStateMoveToPlayer = 0;
let EnemyStateBounceOff = 1;

class Enemy
{
    constructor()
    {
        this.pos = new V2(420, 148);
        this.vel = new V2(0, 0);
        this.state = EnemyStateMoveToPlayer;
        this.angle = 0;
    }

    Tick()
    {
        switch(this.state)
        {
            case EnemyStateMoveToPlayer:
            {
                this.MoveToPlayer();

                if (this.pos.x <= player.pos.x + 10)
                {
                    if (player.IsBellyBounceAttacking())
                    {
                        this.BounceOff();
                    }
                    else
                    {
                        this.KillSelf();
                    }
                }
            } break;

            case EnemyStateBounceOff:
            {
                this.pos.AddV(this.vel);
                this.vel.y += 0.4;
                this.angle += 5 + Math.random()*5;

                if (this.pos.y > gameHeight)
                {
                    this.KillSelf();
                }
            } break;
        }
    }

    MoveToPlayer()
    {
        this.pos.x -= 3;
    }

    BounceOff()
    {
        this.vel.Set(4 + Math.random()*2.0, -5 - Math.random()*2.0);
        this.state = EnemyStateBounceOff;
    }

    KillSelf()
    {
        // Todo make global
        let idx = objs.indexOf(this);
        if (idx > -1)
        {
            objs.splice(idx, 1);
        }

        objs.push(new Enemy());
    }

    Draw()
    {
        PushMatrix(this.pos.x, this.pos.y, this.angle);
        DrawRect(0, 0, 32, 32, "#F00");
        PopMatrix();
    }
}