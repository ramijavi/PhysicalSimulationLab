function setup() {
    createCanvas(710, 400);
    rectMode(CORNERS);
    noStroke();
    
    spring1 = new Spring(width/2, 2, 0.25, 0.90, 150);
    spring1.left = width / 2 - 100;
    spring1.right = width / 2 + 100;
    
    spring2 = new Spring(width/6, 5.8, 0.1, 0.99, 150);
    spring2.left = width / 6  - 100;
    spring2.right = width / 6  + 100;
    
    spring3 = new Spring(width/1.2, 0.2, 0.5, 0.87, 150);
    spring3.left = width / 1.2 - 100;
    spring3.right = width / 1.2 + 100;
}

function draw() {
    background(102);
    
    spring1.updateSpring();
    spring1.drawSpring();
    
    spring2.updateSpring();
    spring2.drawSpring();
    
    spring3.updateSpring();
    spring3.drawSpring();
}

class Spring {
    constructor(basePos, M, K, D, R){
        // Spring drawing constants for top bar
        this.springHeight = 32,
        this.left,
        this.right,
        this.maxHeight = 200,
        this.minHeight = 100,
        this.over = false,
        this.move = false;
        // Spring simulation constants
        this.M = M,  // Mass
        this.K = K,  // Spring constant
        this.D = D, // Damping
        this.R = R;  // Rest position
        // Spring simulation variables
        this.ps = this.R,   // Position
        this.vs = 0.0, // Velocity
        this.as = 0,   // Acceleration
        this.f = 0;    // Force
        
        this.basePos = basePos;
    }
    
    drawSpring() {
            
        // Draw base
        fill(0.2);
        let baseWidth = 0.5 * this.ps + -8;
        rect(this.basePos - baseWidth, this.ps + this.springHeight, this.basePos + baseWidth, height);

        // Set color and draw top bar
        if (this.over || this.move) {
            fill(255);
        } else {
            fill(204);
        }

        rect(this.left, this.ps, this.right, this.ps + this.springHeight);
    }
    
    updateSpring() {
        // Update the spring position
        if ( !this.move ) {
            this.f = -this.K * ( this.ps - this.R ); // f=-ky
            this.as = this.f / this.M;               // Set the acceleration, f=ma == a=f/m
            this.vs = this.D * (this.vs + this.as);  // Set the velocity
            this.ps = this.ps + this.vs;             // Updated position
        }

        if (abs(this.vs) < 0.1) {
            this.vs = 0.0;
        }

        // Test if mouse if over the top bar
        if (mouseX > this.left && mouseX < this.right && mouseY > this.ps && mouseY < this.ps + this.springHeight) {
            this.over = true;
        } else {
            this.over = false;
        }

        // Set and constrain the position of top bar
        if (this.move) {
            this.ps = mouseY - this.springHeight / 2;
            this.ps = constrain(this.ps, this.minHeight, this.maxHeight);
        }
    }
}

function mousePressed() {
    if (spring1.over) {
        spring1.move = true;
    }
    if (spring2.over) {
        spring2.move = true;
    }
    if (spring3.over) {
        spring3.move = true;
    }
}

function mouseReleased() {
    spring1.move = false;
    spring2.move = false;
    spring3.move = false;
}
