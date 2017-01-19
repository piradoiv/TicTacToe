function TicTacToe() {
    var grid;
    var gridSize;
    var gridDiv;
    var status;
    var player;
    var moves;
    var won;
    var lastStart;

    this.setup = function() {
        noLoop();
        frameRate(48);
        createCanvas(300, 300);

        grid = [];
        moves = [];
        gridDiv = 3;
        gridSize = width / gridDiv;
        status = 'playing';
        player = 1;
        lastStart = player;
        won = false;

        redraw();
    }

    this.draw = function() {
        background(225);
        drawGrid();
        drawMoves();
        drawWinner();
    }

    this.mouseClicked = function() {
        if (status != 'playing') {
            var nextStart = won == 1 ? 2 : 1;
            if (status == 'draw') {
                nextStart = lastStart == 1 ? 2 : 1;
            }

            this.setup();
            player = nextStart;
            lastStart = player;
            return false;
        }

        var coord = coordinateToGrid(mouseX, mouseY);
        if (!coord) {
            return false;
        }

        var valid = isValidMove(coord);
        if (valid === true) {
            moves.push([coord[0], coord[1], player]);
            if (typeof(grid[coord[0]]) == 'undefined') {
                grid[coord[0]] = [];
            }
            grid[coord[0]][coord[1]] = player;
            player = player == 1 ? 2 : 1;

            var maxMoves = floor(width / gridSize) * floor(width / gridSize);
            var winner = checkWinCondition();

            if (winner) {
                status = 'game over';
                won = winner;
            } else if (moves.length >= maxMoves) {
                status = 'draw';
            }
        }

        redraw();
    }

    function coordinateToGrid(posX, posY) {
        if (posX > width
            || posY > height
            || posX < 0
            || posY < 0
        ) {
            return false;
        }

        var x = floor(posX / gridSize);
        var y = floor(posY / gridSize);

        return [x, y];
    }

    function isValidMove(coord) {
        var posX = coord[0];
        var posY = coord[1];

        for (var i in moves) {
            var move = moves[i];
            if (move[0] == posX && move[1] == posY) {
                return false;
            }
        }

        return true;
    }

    function drawGrid() {
        for (var x = 0; x < gridDiv; x++) {
            for (var y = 0; y < gridDiv; y++) {
                push();
                translate(gridSize * x, gridSize * y);
                stroke(255);
                noFill();
                rect(0, 0, gridSize, gridSize);
                pop();
            }
        }
    }

    function checkWinCondition() {
        var winner = false;

        for (var y = 0; y < gridDiv; y++) {
            winner = checkRow(y);
            if (winner) {
                return winner;
            }
        }

        for (var x = 0; x < gridDiv; x++) {
            winner = checkColumn(x);
            if (winner) {
                return winner;
            }
        }

        winner = checkDiag(true);
        if (!winner) {
            winner = checkDiag(false);
        }

        return winner;
    }

    function checkRow(y) {
        try {
            if (grid[0][y] == grid[1][y] && grid[1][y] == grid[2][y]) {
                return grid[0][y];
            }
        } catch(e) {
            return false;
        }
    }


    function checkColumn(x) {
        try {
            if (grid[x][0] == grid[x][1] && grid[x][1] == grid[x][2]) {
                return grid[x][0];
            }
        } catch(e) {
            return false;
        }
    }

    function checkDiag(leftToRight = true) {
        try {
            if (leftToRight) {
                if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2]) {
                    return grid[1][1];
                }
            } else {
                if (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0]) {
                    return grid[1][1];
                }
            }
        } catch(e) {
            return false;
        }
    }

    function drawMoves() {
        for (var i in moves) {
            var move = moves[i];
            var posX = move[0] * gridSize;
            var posY = move[1] * gridSize;
            var col = color(200, 0, 0);
            if (move[2] == 2) {
                col = color(0, 0, 200);
            }

            push();
            translate(posX + gridSize / 2, posY + gridSize / 2);
            noStroke();
            fill(col);
            ellipse(0, 0, gridSize / 2, gridSize / 2);
            pop();
        }
    }

    function drawWinner() {
        if (['game over', 'draw'].indexOf(status) < 0) {
            return false;
        }

        push();
        translate(width / 2, height / 2);
        fill(0, 0, 0, 150);
        noStroke();
        rectMode(CENTER);
        rect(0, 0, width - 20, 80);

        fill(255);
        textSize(30);
        textAlign(CENTER);

        if (status == 'game over') {
            var winner = won == 1 ? 'Red' : 'Blue';
            text("Player " + winner + " Wins!", 0, 0);
        } else if (status == 'draw') {
            text("Draw!", 0, 0);
        }

        textSize(15);
        text("Click anywhere to play again", 0, 20);
        pop();
    }
}

