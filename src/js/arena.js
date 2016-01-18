function Character(elem, type) {
    this.elem = elem;
    this.type = type;
    this.state = 'idle';
    this.frame = 0;

    //TODO for later use
    this.team = null;
    this.location = null;
}

Character.msDrawDelay = 80;

Character.getImgPath = function(type, state, frame) {
    return 'src/svg/characters/' + type + '/' + state + '/' + type + '_' + state + '_' + frame + '.svg';
};

Character.types = [
    'archer',
    'assassin',
    'brute',
    'cleric',
    'mage',
    'swordsman'
];

Character.states = {
    'idle': 7,
    'attack': 11,
    'damage': 5,
    'block': 5,
    'support': 11
};

Character.prototype.draw = function() {
    if (this.frame >= Character.states[this.state]) {
        this.state = 'idle';
        this.frame = 0;
    }
    this.frame += 1;
    this.elem.src = Character.getImgPath(this.type, this.state, this.frame);
};

Character.prototype.attack = function() {
    this.state = 'attack';
    this.frame = 0;
};

Character.prototype.damage = function() {
    this.state = 'damage';
    this.frame = 0;
};

Character.prototype.block = function() {
    this.state = 'block';
    this.frame = 0;
};

Character.prototype.support = function() {
    this.state = 'support';
    this.frame = 0;
};

// preload images
Character.types.forEach(function(character) {
    for (var state in Character.states) {
        if (Character.states.hasOwnProperty(state)) {
            var frames = Character.states[state];
            for (var frame = 1; frame <= frames; frame++) {
                new Image().src = Character.getImgPath(character, state, frame);
            }
        }
    }
});

// init characters
var characters = [];
Character.types.forEach(function(character) {
    var elem = document.querySelector('.' + character);
    characters.push(new Character(elem, character));
});

// listeners
var buttons = document.querySelectorAll('button');
for (var i = 0, button; button = buttons[i]; i++) {
    button.addEventListener('click', function(event) {
        var state = event.target.value;
        characters.forEach(function(character) {
            character[state]();
        });
    });
}
document.querySelector('.speed').addEventListener('change', function(event) {
    var speed = event.target.value;
    Character.msDrawDelay = speed;
    document.querySelector('.speed--value').textContent = speed + 'ms';
});

// animation
var lastDraw = Date.now();
requestAnimationFrame(function draw() {
    var now = Date.now(),
        diff = now - lastDraw;
    if (diff >= Character.msDrawDelay) {
        characters.forEach(function(character) {
            character.draw();
        });
        lastDraw = now;
    }
    requestAnimationFrame(draw);
});
