var katexColor = '#212529';

function writeMathJsFrac(frac) {
    if (frac.s == -1) frac.n = - frac.n;
    if (frac.d == 1) return frac.n;
    return '\\frac{' + frac.n + '}{' + frac.d + '}';

}

var skull2 = function (JXG) {
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-5, 10, 5, -10], showCopyright: false });
    console.log('skull2');
    return brd;
}

var twoPointsSlope = function (JXG, katex, math) {
    console.log('twoPointsSlope Function Called');
    clearBoard();

    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Find the slope between two points</h1>";
    var kText = "\\color{green}m \\color{" + katexColor + "} =  \\frac{ \\color{red} \\Delta y }{\\color{blue} \\Delta x} \\color{" + katexColor + "} = \\frac{ \\color{red} y_2 - y_1 }{\\color{blue}  x_2 - x_1} ";
    var ques = "<h3>Instructions: </h3>Calculate the slope using  " + katex.renderToString(kText);
    document.getElementById("ques").innerHTML = ques;


    var dySeed = (Math.floor((Math.random() * 9)) + 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var dxSeed = (Math.floor((Math.random() * 9)) + 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var mArray = math.fraction(dySeed, dxSeed);
    var dy = mArray['s'] * mArray['n'];
    var dx = mArray['d'];
    var b = Math.floor(Math.random() * 9) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var x1 = Math.floor(Math.random() * 4) * Math.pow(-1, Math.floor((Math.random() * 2))) * dx;
    var x2 = x1 + dx;
    var y1 = dy * x1 / dx + b;
    var y2 = dy * x2 / dx + b;
    console.log(mArray);
    var xMin = x1 - 2;
    var yMin = Math.min(y1, y2) - 2;
    var xMax = x2 + 2;
    var yMax = Math.max(y1, y2) + 2;
    if (mArray['s'] == -1) {
        y2 = [y1, y1 = y2][0];
        x2 = [x1, x1 = x2][0];
    }


    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [xMin, yMax, xMax, yMin], showCopyright: false });
    var p1 = brd.create('point', [x1, y1], { name: '(' + x1 + ', ' + y1 + ')', size: 4, fillColor: 'black', strokeColor: 'black' });
    var py = brd.create('point', [x2, y2], { name: '', size: 4, fillColor: 'green', strokeColor: 'green', visible: false });
    var p2 = brd.create('point', [x2, y2], { name: '(' + x2 + ', ' + y2 + ')', size: 4, fillColor: 'purple', strokeColor: 'purple' });
    var px = brd.create('point', [x2, y1], { name: '', size: 4, fillColor: 'black', strokeColor: 'black', visible: false });
    var text2 = '<p>You can use these two points to calculate the slope</p>';
    text2 += '<p> ' + katex.renderToString("\\color{purple} (x_2, y_2) = ( " + x2 + ", " + y2 + " )") + '</p>';
    text2 += '<p> ' + katex.renderToString("\\color{black} (x_1, y_1) = ( " + x1 + ", " + y1 + " )") + '</p>';
    document.getElementById("topText").innerHTML = text2;

    var visY = '<p id="by"><button type="button" class="btn" onclick="twoPointsSlope.visualizeY()">Find the change of Y</button></p>';
    document.getElementById("hint").innerHTML = visY;


    function visualizeY() {
        var coy = "\\color{red} \\Delta y =  \\color{purple} y_2 - \\color{black} y_1 = (\\color{purple} " + y2 + ") - (\\color{black}" + y1 + ")";
        var coy2 = "\\color{red} \\Delta y = " + (y2 - y1);
        document.getElementById("hint").innerHTML += '<p>' + katex.renderToString(coy) + '</p>';
        document.getElementById("hint").innerHTML += '<p>' + katex.renderToString(coy2) + '</p>';
        var visX = '<p id="bx"><button type="button" class="btn" onclick="twoPointsSlope.visualizeX()">Find the change of X</button></p>';
        document.getElementById("hint").innerHTML += visX;
        py.setAttribute({ visible: true });
        brd.create('segment', [p2, py], { dash: 3, strokeColor: 'green' });
        py.moveTo([x2, y1], 1500, { callback: function () { py.setAttribute({ name: '(' + x2 + ', ' + y1 + ')' }) } });
        document.getElementById("by").innerHTML = '';
        var t1 = brd.create('text', [x2, (y1 + (y2 - y1) / 2), "Change of Y = " + (y2 - y1)]);

    }

    function visualizeX() {
        var coy = "\\color{blue} \\Delta x =  \\color{purple} x_2 - \\color{black} x_1 = (\\color{purple} " + x2 + ") - (\\color{black}" + x1 + ")";
        var coy2 = "\\color{blue} \\Delta x = " + (x2 - x1);
        document.getElementById("hint").innerHTML += '<hr><p>' + katex.renderToString(coy) + '</p>';
        document.getElementById("hint").innerHTML += '<p>' + katex.renderToString(coy2) + '</p>';
        document.getElementById("bx").innerHTML = '';
        px.setAttribute({ visible: true });
        brd.create('segment', [px, py], { dash: 3, strokeColor: 'green' });
        px.moveTo([x1, y1], 1500);
        var t2 = brd.create('text', [Math.min(x2, x1) + Math.abs(x1 - x2) / 3, (y1 - 0.5), "Change of X = " + (x2 - x1)]);
        var hintBtn = '<p id="b3"><button type="button" class="btn" onclick="twoPointsSlope.calculateSlope()">Calculate the Slope</button></p>';
        document.getElementById("hint").innerHTML += hintBtn;
    }


    function calculateSlope() {
        console.log('start of calculateSlope');
        var text2 = '<hr><p> slope ' + katex.renderToString(kText);
        text2 += katex.renderToString("\\color{" + katexColor + "} = \\frac{ \\color{red} (" + y2 + ") - (" + y1 + ")  }{\\color{blue}  (" + x2 + ") - (" + x1 + ") }") + " </p>";
        text2 += "<p>" + katex.renderToString("m = " + writeMathJsFrac(mArray)) + "</p>";
        document.getElementById("hint").innerHTML += text2;
        document.getElementById("b3").innerHTML = '';
        hintBtn = '<p id="b4"><button type="button" class="btn" onclick="twoPointsSlope.drawLine()">Visualize the line</button></p>';
        document.getElementById("hint").innerHTML += hintBtn;
    }


    function drawLine() {
        var li = brd.create('line', [p1, p2], { strokeColor: 'yellow', strokeWidth: 2 });
    }
    twoPointsSlope.calculateSlope = calculateSlope;
    twoPointsSlope.visualizeY = visualizeY;
    twoPointsSlope.visualizeX = visualizeX;
    twoPointsSlope.drawLine = drawLine;
    return brd;

}

var changeOfPointY = function (JXG, katex, math) {
    clearBoard();

    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Find the change of Y between two points</h1>";
    var x1 = Math.floor((Math.random() * 5)) * Math.pow(-1, Math.floor((Math.random() * 2))); // start at random
    var x2 = x1 + 5 + Math.floor((Math.random() * 2)) * Math.pow(-1, Math.floor((Math.random() * 2))); // anywhere from 3 to 7 units appart
    var y1 = Math.floor((Math.random() * 5)) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var y2 = y1 + 5 + Math.floor((Math.random() * 2)) * Math.pow(-1, Math.floor((Math.random() * 2)));
    if (Math.random() >= 0.5) x2 = [x1, x1 = x2][0];
    if (y1 == y2) y1++;
    var xmin = Math.min(x1, x2) - 3;
    var xmax = Math.max(x1, x2) + 3;
    var ymin = Math.min(y1, y2) - 3;
    var ymax = Math.max(y1, y2) + 3;
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [xmin, ymax, xmax, ymin], showCopyright: false });
    /*
    if (Math.abs(4*(y2-y1)) < (ymax - ymin) ) 
    {
        changeOfPointY(JXG, katex, math);
        exit;
    } */
    var m = math.fraction((y2 - y1), (x2 - x1));
    var fm = writeMathJsFrac(m);
    console.log(m);
    console.log(fm);
    console.log(x1, x2, y1, y2)
    var p1 = brd.create('point', [x1, y1], { name: '(' + x1 + ', ' + y1 + ')', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    var p2 = brd.create('point', [x2, y2], { name: '(' + x2 + ', ' + y2 + ')', size: 4, fillColor: 'purple', strokeColor: 'purple' });
    var pv = brd.create('point', [x1, y1], { name: '(' + x1 + ', ' + y2 + ')', size: 4, strokeColor: 'red', visible: false });
    var li = brd.create('line', [p1, p2], { strokeColor: 'yellow', strokeWidth: 2 });


    var ques = "<h3>Instructions: </h3>Find the vertical distance (change of Y) between these two points "
    document.getElementById("ques").innerHTML = ques;

    var text1 = "Consider the blue point so its Y value is the same as the purple point";
    document.getElementById("topText").innerHTML = text1;
    var hintBtn = '<button type="button" class="btn" onclick="changeOfPointY.startAnimation1()">Visualize</button>';
    document.getElementById("hint").innerHTML = hintBtn;
    function startAnimation1() {
        //document.getElementById('showDy').style.display = 'block';
        pv.setAttribute({ visible: true });
        brd.create('segment', [p1, pv], { dash: 3, strokeColor: 'green' });
        pv.moveTo([x1, y2], 1500);
        var text2 = 'You can calculate the distance between the y values by subtracting';
        text2 += '<p>' + katex.renderToString('Y_2 - Y_1') + '</p>';
        document.getElementById("hintResult").innerHTML = text2;
        document.getElementById("hintResult").innerHTML += '<button type="button" class="btn" onclick="changeOfPointY.step2()">Get Answer </button>';
        // txt = brd.create('text', [xmin, ymax - 1, 'y_2 - y_1 = (' + y2 + ') - (' + y1 + ') = ' + (y2 - y1)], { color: 'green', fontSize: 18 });
        var text3 = '<h4>Supplement Context</h4>Move the bottom point straight up (vertically) until it is as high as the other point, the distance traveled is the change in Y ';
        document.getElementById("supplement").innerHTML = text3;
    }

    function step2() {
        startAnimation1();
        console.log('step2...');
        document.getElementById("hintResult").innerHTML += '<p>Change of y =  ' + katex.renderToString('\\Delta_y = \\color{red}{ (' + Math.max(y1, y2) + ' ) } -  \\color{blue}{ (' + Math.min(y1, y2) + ') }') + '</p>';
        document.getElementById("hintResult").innerHTML += '<p class = "boxed">Final Answer:   ' + katex.renderToString('\\Delta_y = ' + (Math.max(y1, y2) - Math.min(y1, y2))) + '</p>';
        document.getElementById("hintResult").innerHTML += '<p> ' + katex.renderToString('Y_2  = \\color{red}{ (' + Math.max(y1, y2) + ' ) }') + ' came from the Y value of the upper point</p>';
        document.getElementById("hintResult").innerHTML += '<p> ' + katex.renderToString('Y_1  = \\color{blue}{ (' + Math.min(y1, y2) + ' ) }') + ' came from the Y value of the lower point</p>';
    }
    function moveYone() {
        pv.setAttribute({ visible: true });
    }

    changeOfPointY.startAnimation1 = startAnimation1;
    changeOfPointY.step2 = step2;
    return brd;


}

var changeOfPointX = function (JXG, katex, math) {
    clearBoard();

    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Find the change of X between two points</h1>";
    var x1 = Math.floor((Math.random() * 5)) * Math.pow(-1, Math.floor((Math.random() * 2))); // start at random
    var x2 = x1 + 5 + Math.floor((Math.random() * 2)) * Math.pow(-1, Math.floor((Math.random() * 2))); // anywhere from 3 to 7 units appart
    var y1 = Math.floor((Math.random() * 5)) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var y2 = y1 + 5 + Math.floor((Math.random() * 2)) * Math.pow(-1, Math.floor((Math.random() * 2)));
    if (Math.random() >= 0.5) y2 = [y1, y1 = y2][0];
    if (y1 == y2) y1++;
    var xMin = Math.min(x1, x2) - 3;
    var xMax = Math.max(x1, x2) + 3;
    var yMin = Math.min(y1, y2) - 3;
    var yMax = Math.max(y1, y2) + 3;
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [xMin, yMax, xMax, yMin], showCopyright: false });
    var p1 = brd.create('point', [x1, y1], { name: '(' + x1 + ', ' + y1 + ')', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    var p2 = brd.create('point', [x2, y2], { name: '(' + x2 + ', ' + y2 + ')', size: 4, fillColor: 'purple', strokeColor: 'purple' });
    var pv = brd.create('point', [x1, y1], { name: '(' + x2 + ', ' + y1 + ')', size: 4, strokeColor: 'red', visible: false });
    var li = brd.create('line', [p1, p2], { strokeColor: 'yellow', strokeWidth: 2 });


    var ques = "<h3>Instructions: </h3>Find the horizontal distance (change of X) between these two points "
    document.getElementById("ques").innerHTML = ques;

    var text1 = "Visualize moving the left point towards the right without changing its height";
    document.getElementById("topText").innerHTML = text1;
    var hintBtn = '<button type="button" class="btn" onclick="changeOfPointX.startAnimation1()">Visualize</button>';
    document.getElementById("hint").innerHTML = hintBtn;
    function startAnimation1() {
        //document.getElementById('showDy').style.display = 'block';
        pv.setAttribute({ visible: true });
        brd.create('segment', [p1, pv], { dash: 3, strokeColor: 'green' });
        pv.moveTo([x2, y1], 1500);
        var text2 = 'You can calculate the distance between the x values by subtracting';
        text2 += '<p>' + katex.renderToString('X_2 - X_1') + '</p>';
        document.getElementById("hintResult").innerHTML = text2;
        document.getElementById("hintResult").innerHTML += '<button type="button" class="btn" onclick="changeOfPointX.step2()">Get Answer </button>';
        // txt = brd.create('text', [xmin, ymax - 1, 'y_2 - y_1 = (' + y2 + ') - (' + y1 + ') = ' + (y2 - y1)], { color: 'green', fontSize: 18 });
        var text3 = '<h4>Supplement Context</h4>Move the bottom point straight up (vertically) until it is as high as the other point, the distance traveled is the change in Y ';
        document.getElementById("supplement").innerHTML = text3;
    }

    function step2() {
        startAnimation1();
        console.log('step2...');
        document.getElementById("hintResult").innerHTML += '<p>Change of y =  ' + katex.renderToString('\\Delta_y = \\color{red}{ (' + Math.max(y1, y2) + ' ) } -  \\color{blue}{ (' + Math.min(y1, y2) + ') }') + '</p>';
        document.getElementById("hintResult").innerHTML += '<p class = "boxed">Final Answer:   ' + katex.renderToString('\\Delta_y = ' + (Math.max(y1, y2) - Math.min(y1, y2))) + '</p>';
        document.getElementById("hintResult").innerHTML += '<p> ' + katex.renderToString('Y_2  = \\color{red}{ (' + Math.max(y1, y2) + ' ) }') + ' came from the Y value of the upper point</p>';
        document.getElementById("hintResult").innerHTML += '<p> ' + katex.renderToString('Y_1  = \\color{blue}{ (' + Math.min(y1, y2) + ' ) }') + ' came from the Y value of the lower point</p>';
    }
    function moveYone() {
        pv.setAttribute({ visible: true });
    }

    changeOfPointX.startAnimation1 = startAnimation1;
    changeOfPointX.step2 = step2;
    return brd;


}


function inputOutputExample(JXG, katex, math) {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Calculate Output</h1>";

    var m = (Math.floor((Math.random() * 5)) + 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var b = Math.floor((Math.random() * 10)) * Math.pow(-1, Math.floor((Math.random() * 2)));
    if (m == 1 && b == 0) m = -2;
    var arr = [];
    for (i = 0; i < 20; i++) {
        arr[i] = i - 9;
    }
    var subArr = randSubArray(3);
    var xMin = 0;
    var xMax = 0;
    for (i = 0; i < 3; i++) {
        if (subArr[i] > xMax) xMax = subArr[i];
        if (subArr[i] < xMin) xMin = subArr[i];
    }
    xMax = (xMax + 1);
    xMin = (xMin - 1)
    if (m > 0) {
        var yMax = (m * xMax + b);
        var yMin = (m * xMin + b);
    }
    if (m < 0) {
        var yMax = (m * xMin + b);
        var yMin = (m * xMax + b);
    }
    var p = [];
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [Math.min(xMin, yMin), Math.max(yMax, xMax), Math.max(yMax, xMax), Math.min(xMin, yMin)], showCopyright: false });
    var x0 = subArr[0];
    var y0 = (m * subArr[0] + b)
    // p[0] = brd.create('point', [x0, y0], { visible: false, name: '(' + x0 + ', ' + y0 + ')', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    var ques = 'Calculate the output of the following function given certain inputs<br>'
    ques += katex.renderToString('\\color{blue} f \\color{' + katexColor + '} ( \\color{red} x  \\color{' + katexColor + '}  ) = ' + singleTermMultiply(m, '\\color{red} x  \\color{' + katexColor + '}') + singleSignAdd(b));
    // var ques = katex.renderToString('\\color{red} 2  \\color{'+katexColor+'} + y') 
    document.getElementById("ques").innerHTML = ques;
    var text0 = 'Input = ' + katex.renderToString('\\color{red} ' + subArr[0]) + ' : Output = ' + katex.renderToString('\\color{blue} ?');
    var newText;
    text0 += '<div id="b0"><button  type="button" class="btn" onclick="inputOutputExample.step(0)">Show Result </button></div>';
    function step0() {
        p[0].setAttribute({ visible: true });
        newText = '<p>' + katex.renderToString('\\color{blue} f \\color{' + katexColor + '} ( \\color{red} ' + x0 + '  \\color{' + katexColor + '}  ) = ' + singleTermMultiply(m, '\\color{red} (' + x0 + ' )  \\color{' + katexColor + '}') + singleSignAdd(b)) + '</p>';
        newText += '<p>' + katex.renderToString('\\color{blue} f \\color{' + katexColor + '} ( \\color{red}' + x0 + '  \\color{' + katexColor + '}  ) = \\color{blue} ' + y0) + '</p>';
        newText += '<p>' + katex.renderToString('( \\color{red}' + x0 + '  \\color{' + katexColor + '}  , \\color{blue} ' + y0 + ')') + '</p>';
        document.getElementById("topText").innerHTML += newText;
        document.getElementById("b1").innerHTML = '';
        step(0);
    }

    function step(s) {
        var x = subArr[s];
        var y = (m * subArr[s] + b);
        //p[s].setAttribute({ visible: true });
        brd.create('point', [x, y], { name: '(' + x + ', ' + y + ')', size: 4, fillColor: 'blue', strokeColor: 'blue' });
        var ques = 'Calculate the output of the following function given certain inputs<br>'
        ques += katex.renderToString('\\color{blue} f \\color{' + katexColor + '} ( \\color{red} x  \\color{' + katexColor + '}  ) = ' + singleTermMultiply(m, '\\color{red} x  \\color{' + katexColor + '}') + singleSignAdd(b));
        newText = '<p>' + katex.renderToString('\\color{blue} f \\color{' + katexColor + '} ( \\color{red} ' + x + '  \\color{' + katexColor + '}  ) = ' + singleTermMultiply(m, '\\color{red} (' + x + ' )  \\color{' + katexColor + '}') + singleSignAdd(b)) + '</p>';
        newText += '<p>' + katex.renderToString('\\color{blue} f \\color{' + katexColor + '} ( \\color{red}' + x + '  \\color{' + katexColor + '}  ) = \\color{blue} ' + y) + '</p>';
        newText += '<p>' + katex.renderToString('( \\color{red}' + x + '  \\color{' + katexColor + '}  , \\color{blue} ' + y + ')') + '</p>';
        if (s != 2) {
            newText += '<hr>Next, input = ' + katex.renderToString('\\color{red} ' + subArr[(s + 1)]) + ' : Output = ' + katex.renderToString('\\color{blue} ?');
            newText += '<div id="b' + (s + 1) + '"><button  type="button" class="btn" onclick="inputOutputExample.step(' + (s + 1) + ')">Show Result </button></div></p>';
        }
        document.getElementById("topText").innerHTML += newText;
        document.getElementById("b" + s).innerHTML = '';
    }
    document.getElementById("topText").innerHTML = text0;

    inputOutputExample.step0 = step0;
    inputOutputExample.step = step;
    return brd;

}


function findMatchingInputs() {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Find the same Inputs</h1>";

    var xArr = randSubArray(3);
    var yArr = randSubArray(4);
    var index = Math.floor(Math.random() * xArr.length);
    // var xp = xArr[];

    var xMax = xArr.reduce(function (a, b) {
        return Math.max(a, b);
    });

    var xMin = xArr.reduce(function (a, b) {
        return Math.min(a, b);
    });

    var yMax = yArr.reduce(function (a, b) {
        return Math.max(a, b);
    });

    var yMin = yArr.reduce(function (a, b) {
        return Math.min(a, b);
    })

    colors = ['Maroon', 'blue', 'purple', 'black']
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [Math.min(xMin, yMin) - 2, Math.max(yMax, xMax) + 1, Math.max(yMax, xMax) + 2, Math.min(xMin, yMin) - 1], showCopyright: false });
    p = [];
    for (i = 0; i < 4; i++) {
        // console.log(i);
        x = xArr[index];
        if (i < 3) x = xArr[i];
        y = yArr[i];
        p[i] = brd.create('point', [x, y], { name: '(' + x + ', ' + y + ')', size: 4, fillColor: colors[i], strokeColor: colors[i] });
    }

    var pMin = brd.create('point', [xArr[index], Math.min(xMin, yMin) - 2], { name: '', size: 4, fillColor: colors[3], strokeColor: colors[3], visible: false });
    var pMax = brd.create('point', [xArr[index], Math.min(xMin, yMin) - 2], { name: '', size: 4, fillColor: colors[3], strokeColor: colors[3], visible: false });

    document.getElementById("supplement").innerHTML = '<p>Find the two points where the independent variables (inputs) are the same</p>';
    var text = 'Look at the input value in the order pair, or visually find two points by location</p>'
    text += '<p><div id="b0"><button  type="button" class="btn" onclick="findMatchingInputs.show0()">Need a hint? </button> <span id="b1"> <button  type="button" class="btn" onclick="findMatchingInputs.showAnswer()">Show Result </button></span></div></p>';
    document.getElementById("topText").innerHTML = text;
    function show0() {
        document.getElementById("b0").innerHTML = '';
        text = '<hr><p>Remember, the independent variable is the placed left to right (horizontally), usually referred to as the "X" value  </p>';
        text += '<div id="b1"><button  type="button" class="btn" onclick="findMatchingInputs.showAnswer()">Show Result </button></div></p>';
        document.getElementById("topText").innerHTML += text;
    }

    function showAnswer() {
        var element = document.getElementById('b1');
        if (typeof (element) != 'undefined' && element != null) {
            // exists.
            document.getElementById("b1").innerHTML = '';
        }
        document.getElementById("b0").innerHTML = '';

        text = '<hr><p>The two points with the same input are stacked on top of each other</p>';
        text += '<p>' + katex.renderToString('\\color{' + colors[index] + '} (' + xArr[index] + ', ' + yArr[index] + ')') + '</p>';
        text += '<p>' + katex.renderToString('\\color{' + colors[3] + '} (' + xArr[index] + ', ' + yArr[3] + ')') + '</p>';
        text += '<p>They both have an input of ' + +xArr[index] + '</p>';
        text += '<div id="b3"><button  type="button" class="btn" onclick="findMatchingInputs.showLine()">Visualize the Vertical Line </button></div></p>';
        document.getElementById("topText").innerHTML += text;
    }

    function showLine() {
        console.log('showLine xxx');
        // pv.setAttribute({ visible: true });
        brd.create('segment', [pMin, pMax], { dash: 3, strokeColor: 'green' });
        pMax.moveTo([xArr[index], Math.max(xMax, yMax) + 2], 1500);
        text = '<hr><h4>Vertical Line</h4><p>A vertical line indicates a collection of points where the X value is constant, in this case</p>';
        text += katex.renderToString("\\color{red} x = " + xArr[index]);
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b3").innerHTML = '';
    }
    findMatchingInputs.show0 = show0;
    findMatchingInputs.showAnswer = showAnswer;
    findMatchingInputs.showLine = showLine;
    return brd;

}

function findMatchingOutputs() {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Find the same Outputs</h1>";

    var xArr = randSubArray(4);
    var yArr = randSubArray(3);
    var index = Math.floor(Math.random() * yArr.length);
    // var xp = xArr[];

    var xMax = xArr.reduce(function (a, b) {
        return Math.max(a, b);
    });

    var xMin = xArr.reduce(function (a, b) {
        return Math.min(a, b);
    });

    var yMax = yArr.reduce(function (a, b) {
        return Math.max(a, b);
    });

    var yMin = yArr.reduce(function (a, b) {
        return Math.min(a, b);
    })

    colors = ['Maroon', 'blue', 'purple', 'black']
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [Math.min(xMin, yMin) - 2, Math.max(yMax, xMax) + 1, Math.max(yMax, xMax) + 2, Math.min(xMin, yMin) - 1], showCopyright: false });
    p = [];
    for (i = 0; i < 4; i++) {
        // console.log(i);
        y = yArr[index];
        if (i < 3) y = yArr[i];
        x = xArr[i];
        p[i] = brd.create('point', [x, y], { name: '(' + x + ', ' + y + ')', size: 4, fillColor: colors[i], strokeColor: colors[i] });
    }

    var pMin = brd.create('point', [Math.min(xMin, yMin) - 2, yArr[index]], { name: '', size: 4, fillColor: colors[3], strokeColor: colors[3], visible: false });
    var pMax = brd.create('point', [Math.min(xMin, yMin) - 2, yArr[index]], { name: '', size: 4, fillColor: colors[3], strokeColor: colors[3], visible: false });

    document.getElementById("supplement").innerHTML = '<p>Find the two points where the dependent variables (dependent) are the same</p>';
    var text = 'Look at the output value in the order pair, or visually find two points by location</p>'
    text += '<p><div id="b0"><button  type="button" class="btn" onclick="findMatchingOutputs.show0()">Need a hint? </button> <span id="b1"> <button  type="button" class="btn" onclick="findMatchingOutputs.showAnswer()">Show Result </button></span></div></p>';
    document.getElementById("topText").innerHTML = text;
    function show0() {
        document.getElementById("b0").innerHTML = '';
        text = '<hr><p>Remember, the dependent variable is the placed from bottom to top (vertically), usually referred to as the "Y" value  </p>';
        text += '<div id="b1"><button  type="button" class="btn" onclick="findMatchingOutputs.showAnswer()">Show Result </button></div></p>';
        document.getElementById("topText").innerHTML += text;
    }

    function showAnswer() {
        var element = document.getElementById('b1');
        if (typeof (element) != 'undefined' && element != null) {
            // exists.
            document.getElementById("b1").innerHTML = '';
        }
        document.getElementById("b0").innerHTML = '';

        text = '<hr><p>The two points with the same output form a flat straight line from right to left</p>';
        text += '<p>' + katex.renderToString('\\color{' + colors[index] + '} (' + xArr[index] + ', ' + yArr[index] + ')') + '</p>';
        text += '<p>' + katex.renderToString('\\color{' + colors[3] + '} (' + xArr[3] + ', ' + yArr[index] + ')') + '</p>';
        text += '<p>They both have an output  of ' + +yArr[index] + '</p>';
        text += '<div id="b3"><button  type="button" class="btn" onclick="findMatchingOutputs.showLine()">Visualize the Horizontal Line </button></div></p>';
        document.getElementById("topText").innerHTML += text;
    }

    function showLine() {
        console.log('showLine');
        // pv.setAttribute({ visible: true });
        brd.create('segment', [pMin, pMax], { dash: 3, strokeColor: 'green' });
        pMax.moveTo([Math.max(yMax, xMax) + 2, yArr[index]], 1500);
        text = '<hr><h4>Horizontal Line</h4><p>A horizontal line indicates a collection of points where the Y value is constant, in this case</p>';
        text += katex.renderToString("\\color{red} y = " + yArr[index]);
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b3").innerHTML = '';
    }
    findMatchingOutputs.show0 = show0;
    findMatchingOutputs.showAnswer = showAnswer;
    findMatchingOutputs.showLine = showLine;
    return brd;

}

function stateInputsAndOutputs(JXG, katex, math) {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Find Inputs and Outputs</h1>";

    var subArrX = randSubArray(4);
    var subArrY = randSubArray(4);

    var xMax = subArrX.reduce(function (a, b) {
        return Math.max(a, b);
    });

    var xMin = subArrX.reduce(function (a, b) {
        return Math.min(a, b);
    });

    var yMax = subArrY.reduce(function (a, b) {
        return Math.max(a, b);
    });

    var yMin = subArrY.reduce(function (a, b) {
        return Math.min(a, b);
    })

    var x, y;
    colors = ['Maroon', 'blue', 'purple', 'black']
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [Math.min(xMin, yMin) - 2, Math.max(yMax, xMax) + 1, Math.max(yMax, xMax) + 2, Math.min(xMin, yMin) - 1], showCopyright: false });
    // brd.create('point', [x, y], { name: '(' + x + ', ' + y + ')' , size: 4, fillColor: 'blue', strokeColor: 'blue' });
    for (i = 0; i < 4; i++) {
        console.log(i);
        x = subArrX[i];
        y = subArrY[i];
        brd.create('point', [x, y], { name: '(' + x + ', ' + y + ')', size: 4, fillColor: colors[i], strokeColor: colors[i] });
    }
    var t1 = brd.create('text', [Math.min(xMin, yMin) - 2, 1, "Input is placed left to right -->"]);
    function displayOutputText() {
        t1.setAttribute({ visible: false });
        // console.log('done');
        //var t2 = brd.create('text',[Math.min(xMin, yMin) - 2,1,"Input is placed left to right -->"]);
        var t2 = brd.create('text', [Math.min(xMin, yMin), Math.min(xMin, yMin), "Output is placed from the bottom to the top"]);
        t2.moveTo([Math.min(xMin, yMin), Math.max(xMax, yMax)], 5000, { callback: function () { t2.setAttribute({ visible: false }) } });
    }
    t1.moveTo([Math.max(xMax, yMax) - 2, 1], 4000, { callback: function () { displayOutputText() } });
    var text = '<p>What is the OUTPUT when the INPUT is ' + katex.renderToString('\\color{red}' + subArrX[0]) + ' ? </p>';
    text += '<div id="b0"><button  type="button" class="btn" onclick="stateInputsAndOutputs.show0()">Show Result </button></div></p>';
    function show0(s) {
        document.getElementById("topText").innerHTML += 'OUTPUT: ' + katex.renderToString('\\color{' + colors[0] + '}' + subArrY[0])
        text = '<hr><p>What is the INPUT when the OUTPUT is ' + katex.renderToString('\\color{red}' + subArrY[1]) + ' ? </p>';
        text += '<div id="b1"><button  type="button" class="btn" onclick="stateInputsAndOutputs.show1()">Show Result </button></div></p>';
        document.getElementById("b0").innerHTML = '';
        document.getElementById("topText").innerHTML += text;
    }

    function show1(s) {
        document.getElementById("topText").innerHTML += 'INPUT: ' + katex.renderToString('\\color{' + colors[1] + '}' + subArrX[1])
        text = '<hr><p>What is the OUTPUT when the INPUT is ' + katex.renderToString('\\color{red}' + subArrX[2]) + ' ? </p>';
        text += '<div id="b2"><button  type="button" class="btn" onclick="stateInputsAndOutputs.show2()">Show Result </button></div></p>';
        document.getElementById("b1").innerHTML = '';
        document.getElementById("topText").innerHTML += text;
    }

    function show2(s) {
        document.getElementById("topText").innerHTML += 'OUTPUT: ' + katex.renderToString('\\color{' + colors[2] + '}' + subArrY[2])
        document.getElementById("b2").innerHTML = '';
    }

    stateInputsAndOutputs.show0 = show0;
    stateInputsAndOutputs.show1 = show1;
    stateInputsAndOutputs.show2 = show2;
    document.getElementById("topText").innerHTML = text;
    return brd;
}

function graphSlopeInt() {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    var genEq = katex.renderToString("y = \\color{red}m \\color{green}x \\color{" + katexColor + "} + \\color{blue} b");
    document.getElementById("problem-title").innerHTML = "<h1>Graph using Slope Intercept</h1>";

    var dySeed = (Math.floor((Math.random() * 9)) + 2) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var dxSeed = (Math.floor((Math.random() * 9)) + 2) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var mArray = math.fraction(dySeed, dxSeed);

    var b = Math.floor(Math.random() * 9) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var xr = mArray['d'];
    var xl = -xr;
    var dy = (mArray['s'] * mArray['n']);
    var yr = b + dy;
    var yl = b - dy;
    console.log(mArray);
    console.log(b, xl, yl, xr, yr, dy);
    var eq = katex.renderToString("y = \\color{red}" + writeMathJsFrac(mArray) + " \\color{green}x \\color{" + katexColor + "}  \\color{blue} " + singleSignAdd(b));
    document.getElementById("supplement").innerHTML = eq;
    var xMin = 0;
    var xMax = xr;
    var yMin = Math.min(b, yr);
    var yMax = Math.max(b, yr);

    //var dy = mArray['s']*mArray['n'];
    var dx = mArray['d'];
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [- 2, Math.max(b, yr) + 1, xr + 2, Math.min(b, yr) - 1], showCopyright: false });
    var text = '<div id="b1"><p><button  type="button" class="btn" onclick="graphSlopeInt.showSlope()">Find the slope </button></p></div>';
    document.getElementById("topText").innerHTML = 'Recall the slope intercept equation <br> ' + genEq + text;

    var p1 = brd.create('point', [0, b], { name: '', size: 4, fillColor: 'black', strokeColor: 'black', visible: false });
    var p2 = brd.create('point', [xr, yr], { name: '', size: 4, fillColor: 'black', strokeColor: 'black', visible: false });
    var pb = brd.create('point', [0, yr], { name: '', size: 4, fillColor: 'black', strokeColor: 'black', visible: false });
    function showSlope() {
        var mSigned = mArray;
        if (mArray['s'] == -1) mSigned['n'] = -1 * mArray['n'];
        var m = katex.renderToString("y = \\color{red}" + writeMathJsFrac(mSigned));
        document.getElementById("topText").innerHTML += '<p>From the equation the slope is ' + m + '</p>';
        var m2 = "\\color{red}m \\color{" + katexColor + "} =  \\frac{ \\color{purple} \\Delta y }{\\color{green} \\Delta x} \\color{" + katexColor + "} = \\frac{ \\color{purple} " + dy + " }{\\color{green}  " + dx + "} ";
        document.getElementById("topText").innerHTML += '<p>' + katex.renderToString(m2) + '</p>';
        document.getElementById('b1').innerHTML = '';
        text = '<div id="b2"><p><button  type="button" class="btn" onclick="graphSlopeInt.showB()">Find the Y intercept </button></p></div>';
        document.getElementById("topText").innerHTML += text;
    }

    function showB() {
        text = '<hr><p>The Y intercept is ' + katex.renderToString('\\color{blue}b = ' + b) + '</b>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById('b2').innerHTML = '';
        text = '<div id="b3"><p><button  type="button" class="btn" onclick="graphSlopeInt.showR()">Find a point to the right </button></p></div>';
        document.getElementById("topText").innerHTML += text;
        text = 'This corresponds to the point (0, ' + b + ')';
        var pb = brd.create('point', [0, b], { name: '(0, ' + b + ')', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    }

    function showR() {
        text = '<hr>Start with the change of y <br> ' + katex.renderToString("\\color{purple} \\Delta y = " + dy);
        document.getElementById("topText").innerHTML += text;
        if (dy < 0) {
            text = '<p>Because the change of y is negative, we will move DOWN by ' + Math.abs(dy) + '</p>';
        } else {
            text = '<p>Because the change of y is positive, we will move UP by ' + Math.abs(dy) + '</p>';
        }
        document.getElementById("topText").innerHTML += text;
        text = '<p>From the change of x <br> ' + katex.renderToString("\\color{green} \\Delta x = " + dx) + '<br>we will move to the right by ' + dx + '</p>';
        document.getElementById('b3').innerHTML = '';
        document.getElementById("topText").innerHTML += text;
        text = '<div id="b4"><p><button  type="button" class="btn" onclick="graphSlopeInt.transformR()">Graph the new point </button></p></div>';
        document.getElementById("topText").innerHTML += text;
    }

    function transformR() {
        var pr = brd.create('point', [0, b], { name: '(' + xr + ', ' + yr + ')', size: 4, fillColor: 'red', strokeColor: 'red' });
        // pr.setAttribute({name: 'change of y'});
        brd.create('segment', [pb, p1], { dash: 3, strokeColor: 'purple' });
        brd.create('text', [0, (b + mArray['n'] / 2), "Change of Y = " + (mArray['n'])]);
        pr.moveTo([0, yr], 2000, { callback: function () { movePoint() } });
        // text = '<div id="b5"><p><button  type="button" class="btn" onclick="graphSlopeInt.graph()">Draw the line </button></p></div>';
        // document.getElementById("topText").innerHTML += text;
        document.getElementById('b4').innerHTML = '';
        function movePoint() {
            pr.moveTo([xr, yr], 2000);
            brd.create('segment', [pb, pr], { dash: 3, strokeColor: 'green' });
            brd.create('text', [mArray['d'] / 2, (yr + mArray['s'] * (Math.max(yMax, xMax) / 15)), "Change of X = " + (mArray['d'])]);
            text = '<p>The new points is ' + katex.renderToString('(' + xr + ', ' + yr + ')');
            text += '<div id="b5"><p><button  type="button" class="btn" onclick="graphSlopeInt.graph()">Draw the line </button></p></div>';
            document.getElementById("topText").innerHTML += text;
        }
    }


    function graph() {
        var li = brd.create('line', [p1, p2], { strokeColor: 'yellow', strokeWidth: 2 });
        document.getElementById('b5').innerHTML = '';
        text = '<hr>Draw a line through the two points';
        document.getElementById("topText").innerHTML += text;
    }
    function showL() {
        text = '<hr>This time, we will move to the left, so the x direction is negative and we will move to the LEFT by <br> ' + katex.renderToString("\\color{green} \\Delta x = " + (-1 * dx));
        document.getElementById("topText").innerHTML += text;
        if (dy < 0) {
            text = '<p>Since the slope was negative, only one direction can be negative. In this case, it is the change of X. So we must make the change of Y positive  ' + Math.abs(dy) + '</p>';
            text += katex.renderToString("\\color{purple} \\Delta y = " + Math.abs(dy));
        } else {
            text = '<p>Since the slope was positive, the change of y and the change of x need to divide to be positive. ';
            text += 'Because we move to the LEFT, the change of x is negative. To make the division positive  ' + katex.renderToString("\\color{purple} \\Delta y = " + (-1 * Math.abs(dy)));
        }
        document.getElementById("topText").innerHTML += text;
        // text = '<p>From the change of x <br> ' + katex.renderToString("\\color{green} \\Delta x = "+ dx ) + '<br>we will move to the right by ' + dx + '</p>';
        document.getElementById('b3').innerHTML = '';
        document.getElementById("topText").innerHTML += text;
        text = '<div id="b4"><p><button  type="button" class="btn" onclick="graphSlopeInt.transformR()">Graph the new point </button></p></div>';
        document.getElementById("topText").innerHTML += text;
    }


    graphSlopeInt.showSlope = showSlope;
    graphSlopeInt.showB = showB;
    graphSlopeInt.showR = showR;
    graphSlopeInt.showL = showL;
    graphSlopeInt.graph = graph;
    graphSlopeInt.transformR = transformR;
}

function transformOnePoint() {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Transform a Single Point</h1>";

    var x = (Math.floor((Math.random() * 12))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var y = (Math.floor((Math.random() * 12))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var dx = (Math.floor((Math.random() * 9)) + 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var dy = (Math.floor((Math.random() * 9)) + 1) * Math.pow(-1, Math.floor((Math.random() * 2)));

    var xMax = Math.max(x, x - dx);
    var xMin = Math.min(x, x - dx);
    var yMax = Math.max(y, y + dy);
    var yMin = Math.min(y, y + dy);

    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [Math.min(xMin, yMin) - 2, Math.max(yMax, xMax) + 1, Math.max(yMax, xMax) + 2, Math.min(xMin, yMin) - 1], showCopyright: false });
    var op = brd.create('point', [x, y], { name: '(' + x + ', ' + y + ') Original Point', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    var np = brd.create('point', [x, y], { name: '(' + (x - dx) + ', ' + y + ') New X Value', size: 4, fillColor: 'purple', strokeColor: 'purple', visible: false });
    var text = 'For the function ' + katex.renderToString('f(x), \\color{red}f \\color{' + katexColor + '}( \\color{green}' + x + ' \\color{' + katexColor + '}) = \\color{red}' + y);
    document.getElementById("supplement").innerHTML = text;
    text = '<p>Transform this point when the function is changed as follows<br>' + katex.renderToString(' \\color{red}f \\color{' + katexColor + '}( \\color{green}x' + singleSignAdd(dx) + ' \\color{' + katexColor + '})  \\color{red}' + singleSignAdd(dy)) + '</p>';
    document.getElementById("supplement").innerHTML += text;

    text = 'The change inside and outside the function will transform this point. <div id="b0"><p><button  type="button" class="btn" onclick="transformOnePoint.calculateX()">Find the new X value</button></p></div>';
    document.getElementById("topText").innerHTML += text;
    function calculateX() {
        text = '<hr><p>Calculate a change of x by considering the change to the INSIDE of the function. </p> ';
        text += '<p>For a change in the x direction, SOLVE the equation by setting the inside of the new function ' + katex.renderToString(' \\color{green}x ' + singleSignAdd(dx)) + ' equal to the original x value ' + katex.renderToString('\\color{green}' + x) + '.</p>';
        text += '<p>' + katex.renderToString(' \\color{green}x_{new}' + singleSignAdd(dx) + ' = \\color{blue} x_{old}') + '</p>';
        text += '<p>' + katex.renderToString(' \\color{green}x_{new}' + singleSignAdd(dx) + ' = \\color{blue} ' + x) + '</p>';
        text += '<p>' + katex.renderToString(' \\color{green}x_{new} = ' + (x - dx)) + '</p>';
        text += '<p>Notice when ' + katex.renderToString('\\color{green}x = ' + (x - dx)) + ' we get ';

        text += katex.renderToString('\\color{red} f \\color{' + katexColor + '}( \\color{green}' + x + ' \\color{' + katexColor + '}) ') + '</p>';
        text += '<p>' + katex.renderToString('\\color{red}f \\color{' + katexColor + '}( \\color{green} x' + singleSignAdd(dx) + ' \\color{' + katexColor + '}) \\rightarrow') + '</p>';
        text += '<p>' + katex.renderToString(' \\color{red}f \\color{' + katexColor + '}( \\color{green} x_{new}' + singleSignAdd(dx) + ' \\color{' + katexColor + '}) =\\color{red}f \\color{' + katexColor + '}( \\color{green}' + (x - dx) + singleSignAdd(dx) + ' \\color{' + katexColor + '}) = \\color{red}f \\color{' + katexColor + '}( \\color{green}' + (x) + ' \\color{' + katexColor + '})') + '</p>';
        text += '<hr>However, we still need to find the change of Y<div id="b1"><p><button  type="button" class="btn" onclick="transformOnePoint.calculateY()">Find the new Y </button></p></div>';
        np.setAttribute({ visible: true });
        np.moveTo([(x - dx), y], 1500);
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b0").innerHTML = '';

    }

    function calculateY() {
        document.getElementById("b1").innerHTML = '';
        text = '<hr><p>Calculate a change of by considering the change to the OUTSIDE of the function. </p> ';
        text += '<p>For a change in the y direction, EVALUATE the equation form the outside of the function ' + katex.renderToString('\\color{red}y = \\color{blue}f \\color{green}' + singleSignAdd(dy)) + '</p>';
        text += '<p>' + katex.renderToString(' \\color{red}y_{new} = \\color{blue} y_{old} \\color{green}' + singleSignAdd(dy)) + '</p>';
        text += '<p>Remember that ' + katex.renderToString('  \\color{blue}y_{old} =  f \\color{' + katexColor + '}( \\color{green}' + x + ' \\color{' + katexColor + '})') + '</p>';
        text += '<p>' + katex.renderToString('  \\color{red}y_{new} = \\color{red} \\color{blue} f \\color{' + katexColor + '}( \\color{green}' + x + ' \\color{' + katexColor + '})' + singleSignAdd(dy)) + '</p>';
        text += '<p>' + katex.renderToString(' \\color{red}y_{new} = \\color{blue}' + y + '\\color{red}' + singleSignAdd(dy)) + '</p>';

        text += '<p>' + katex.renderToString(' \\color{red}y_{new} = ' + (y + dy)) + '</p>';
        text += '<p>This finds the new point as<br>';
        text += katex.renderToString(' (\\color{green}' + (x - dx) + '\\color{' + katexColor + '},\\color{red}' + (y + dy) + '\\color{' + katexColor + '})') + '</p>';
        // text += '<div id="b0"><p><button  type="button" class="btn" onclick="transformOnePoint.calculateY()">Graph the new point </button></p></div>';
        np.setAttribute({ name: '(' + (x - dx) + ', ' + (y + dy) + ') New Point' });
        np.moveTo([(x - dx), (y + dy)], 1500);
        document.getElementById("topText").innerHTML += text;
    }

    transformOnePoint.calculateX = calculateX;
    transformOnePoint.calculateY = calculateY;
    return brd;
}

function transformVertex() {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Transform Vertex</h1>";
    var dx = (Math.floor((Math.random() * 10)) + 2) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var dy = (Math.floor((Math.random() * 10)) + 2) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var xMax = Math.max(3, (3 - dx));
    var yMax = Math.max(10, 10 + dy);
    var xMin = Math.min(-3, (-3 - dx));
    var yMin = Math.min(0, dy);

    var yEndL = (2.9) * (2.9) + dy;
    var yEndH = (3) * (3) + dy;
    // var yEndL = (-2.9-dx)*(-2.9-dx)+dy;

    // graph of x^2 no transformation
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [xMin-1, yMax+1, xMax+1, yMin-1], showCopyright: false });
    var op = brd.create('point', [0, 0], { name: '(0,0) Original Vertex', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    var np = brd.create('point', [0, 0], { name: '(0,0) Original Vertex', size: 4, fillColor: 'purple', strokeColor: 'purple', visible: false });
    brd.createElement('functiongraph', [function (t) { return t * t }, -3, 3], { strokeColor: 'grey', fixed: false  });
    brd.create('text', [0,8, katex.renderToString('f(x) = x^2')]);
    brd.create('arrow', [[2.9, 2.9 * 2.9], [3, 9]], { strokeColor: 'grey' });
    brd.create('arrow', [[-2.9, 2.9 * 2.9], [-3, 9]], { strokeColor: 'grey' });

    function createNewGraph() {
        brd.createElement('functiongraph', [function (t) { return (t + dx) * (t + dx) + dy }, -3 - dx, 3 - dx], { strokeColor: 'black', fixed: false});
        brd.create('arrow', [[2.9 - dx, yEndL], [3 - dx, yEndH]], { strokeColor: 'black' });
        brd.create('arrow', [[-2.9 - dx, yEndL], [-3 - dx, yEndH]], { strokeColor: 'black' });
        document.getElementById("b2").innerHTML = '';
        text = '<hr>Draw the same shaped curve, addition and subtraction should not change the shape!';
        document.getElementById("topText").innerHTML += text;
        brd.create('text', [-dx-2,dy+8, katex.renderToString( kString )]);
    }

    
    var kString = '\\color{red}f \\color{'+katexColor+'} (x) = ';
    kString += '(\\color{green}x '+singleSignAdd(dx) + ' \\color{'+katexColor+'} )^2';
    kString += '\\color{red}' + singleSignAdd(dy);
    var text = 'For the graph of ' + katex.renderToString(kString);
    text += ' <br> find the new vertex and sketch the resulting graph';
    document.getElementById("supplement").innerHTML = text;
    
    text = 'Look inside the square and outside to calculate a new vertex. <div id="b0"><p><button  type="button" class="btn" onclick="transformVertex.calculateX()">Find the new X value</button></p></div>';
    document.getElementById("topText").innerHTML += text;

    function calculateY () {
        var subString = '<p>Remember, '+katex.renderToString('f(x) = x^2') + ' vertex is at ' + katex.renderToString('\\color{blue} y  = 0') +'</p>';
        text = '<hr>'+subString+'<p>Calculate a change of by considering the change to the <span style="color:red">OUTSIDE</span> of the square. </p> ';
        text += '<p>For a change in the y direction, EVALUATE the equation form the outside of the function ' + katex.renderToString('\\color{red}y = f' + singleSignAdd(dy)) + '</p>';
        text += '<p>' + katex.renderToString(' \\color{red}y_{new} = \\color{blue} 0 \\color{red}' + singleSignAdd(dy)) + '</p>';

        text += '<p>' + katex.renderToString(' \\color{red}y_{new} = '+ dy) + '</p>';

        text += '<p>This finds the new point as<br>';
        text += katex.renderToString(' (\\color{green}' + (- dx) + '\\color{' + katexColor + '},\\color{red}' + ( dy) + '\\color{' + katexColor + '})') + '</p>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b1").innerHTML = '';
        np.setAttribute({ name: '(' + (-dx) +', '+ dy + ') New Vertex'});
        np.moveTo([( - dx), (dy)], 1500);
        text = '<div id="b2"><p><button  type="button" class="btn" onclick="transformVertex.createNewGraph()">Graph the Transformed Curve</button></p></div>';
        document.getElementById("topText").innerHTML += text;
    }

    function calculateX () {
        var subString = '<p>Remember, '+katex.renderToString('f(x) = x^2') + ' vertex is at ' + katex.renderToString('\\color{blue}x = 0') +'</p>';
        text  = '<hr>'+subString+'<p>Use the <span style="color:green">change inside </span> the function to calculate the X value of the new vertex by SOLVING the equation</p>';
        text += '<p>' + katex.renderToString(' \\color{green}x_{new}' + singleSignAdd(dx) + ' = \\color{blue} x_{old}') + '</p>';
        text += '<p>' + katex.renderToString(' \\color{green}x_{new}' + singleSignAdd(dx) + ' = \\color{blue} 0') + '</p>';
        text += '<p>' + katex.renderToString(' \\color{green}x_{new} = ' + ( - dx)) + '</p>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b0").innerHTML = '';
        np.setAttribute({ name: 'Transform X', visible: true });
        np.moveTo([( - dx), (0)], 1500);
        text = '<div id="b1"><p><button  type="button" class="btn" onclick="transformVertex.calculateY()">Find the new Y value</button></p></div>';
        document.getElementById("topText").innerHTML += text;
    }

    transformVertex.calculateX = calculateX;
    transformVertex.calculateY = calculateY;
    transformVertex.createNewGraph = createNewGraph;
    return brd;

}

function invertPoint () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Invert a Single Point</h1>";

    var x = (Math.floor((Math.random() * 12))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var y = (Math.floor((Math.random() * 12))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var xMax = Math.max(x,y);
    var yMax = xMax;
    var xMin = Math.min(x,y);
    var yMin = xMin;

    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [xMin-1, yMax+1, xMax+1, yMin-1], showCopyright: false });
    var op = brd.create('point', [x, y], { name: '('+x+', '+y+') ', size: 4, fillColor: 'blue', strokeColor: 'blue' });
    var np = brd.create('point', [x, y], { name: '('+y+','+x+') ', size: 4, fillColor: 'purple', strokeColor: 'purple', visible: false });
    // var l1 = brd.create('axis', [[xMax, 0], [xMax, 1]]);
    var text = 'A function has an inverse and ' + katex.renderToString('f( \\color{green}'+x+' \\color{'+katexColor+'} ) = \\color{red}'+y);
    text +='<p>Find the inverted value of this point</p>';
    document.getElementById("supplement").innerHTML = text;

    text = 'Invert an ordered pair by switching the input and output';
    text += '<div id="b0"><p><button  type="button" class="btn" onclick="invertPoint.invert()">Invert</button></p></div>';
    document.getElementById("topText").innerHTML += text;

    function invert () {
        np.setAttribute({visible: true});
        np.moveTo([y, x], 1500);
        
        text = '<hr><p>' + katex.renderToString('f( \\color{green}'+x+' \\color{'+katexColor+'} ) = \\color{red}'+y) +'</p>';
        text += '<p>' + katex.renderToString('f^{-1}( \\color{red}'+y+' \\color{'+katexColor+'} ) = \\color{green}'+x) +'</p>';
        text += '<div id="b1"><p><button  type="button" class="btn" onclick="invertPoint.showSym()">Show symmetry about the line y=x</button></p></div>';

        document.getElementById("topText").innerHTML += text;
        document.getElementById("b0").innerHTML = '';
    }

    function showSym () {
        var s1 = brd.create('point', [xMin-2, yMin-2], { name: ' ', visible: false});
        var s2 = brd.create('point', [xMin-2, yMin-2], { name: ' ', visible: false});
        brd.create('segment', [s1, s2], { dash: 3, strokeColor: 'green' });
        s2.moveTo([xMax+2, yMax+2], 1500);
        document.getElementById("b1").innerHTML += '';
        brd.create('text', [(xMax + xMin)/2,(yMin + yMax)/2, "Line of symmetry y=x"]);
        for (i = xMin; i < xMax;  i++){
            brd.create('point', [i,i], { size: 0, name: '('+i+', '+i+') ', fillColor: 'yellow', strokeColor: 'yellow' });
        }
    }

    invertPoint.invert = invert;
    invertPoint.showSym = showSym;
    return brd;
}

function graphExp () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Graph Exponent</h1>";

    var b = Math.floor((Math.random() * 8) + 2);

    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-4, b*b+1, 4, -1], showCopyright: false });
    var a1 = brd.create('point', [-4,0], { name: ' ', visible: false});
    var a2 = brd.create('point', [-4,0], { name: ' ', visible: false});

    var text = '<p>Graph '+ katex.renderToString('f(x) = \\color{blue}'+b+' \\color{'+katexColor+'} ^x');
    document.getElementById("supplement").innerHTML = text;
    text = '<div id="b0"><p><button  type="button" class="btn" onclick="graphExp.drawAsymptote()">Draw the Asymptote</button></p></div>';
    document.getElementById("topText").innerHTML = text;
    function drawAsymptote () {
        brd.create('segment', [a1, a2], { dash: 2, strokeColor: 'green', strokeWidth: 3 });
        a2.moveTo([4,0], 1500);
        text = '<p>Exponent graphs have an <b><u>asymptote</u></b> at ' + katex.renderToString('\\color{green} y = 0');
        text += '<div id="b1"><p><button  type="button" class="btn" onclick="graphExp.point1()">Find a point when '+katex.renderToString('x = -2')+' </button></p></div>';
        document.getElementById("topText").innerHTML = text;
    }

    function point1 () {
        brd.create('point', [-2, 1/(b*b)], {name: '(-2, 1/('+b*b+') )'});
        text = '<hr><p>' + katex.renderToString('\\color{red} f(-2) = '+b+'^{(-2)} = \\frac{1}{'+(b*b)+'}');
        text += '<div id="b2"><p><button  type="button" class="btn" onclick="graphExp.point2()">Find a point when '+katex.renderToString('x = -1')+' </button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b1").innerHTML = '';
    }

    function point2 () {
        brd.create('point', [-1, 1/(b)], {name: '(-1, 1/('+b+') )'});
        text = '<hr><p>' + katex.renderToString('\\color{red} f(-1) = '+b+'^{(-1)} = \\frac{1}{'+(b)+'}');
        text += '<div id="b3"><p><button  type="button" class="btn" onclick="graphExp.point3()">Find a point when '+katex.renderToString('x = 0')+' </button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b2").innerHTML = '';
    }

    function point3 () {
        brd.create('point', [0, 1], {name: '(0, 1)'});
        text = '<hr><p>' + katex.renderToString('\\color{red} f(0)  = '+b+'^{0} = 1');
        text += '<div id="b4"><p><button  type="button" class="btn" onclick="graphExp.point4()">Find a point when '+katex.renderToString('x = 1')+' </button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b3").innerHTML = '';
    }

    function point4 () {
        brd.create('point', [1, b], {name: '(1, '+b+')'});
        text = '<hr><p>' + katex.renderToString('\\color{red} f(1) = '+b+'^{1} = '+b);
        text += '<div id="b5"><p><button  type="button" class="btn" onclick="graphExp.point5()">Find a point when '+katex.renderToString('x = 2')+' </button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b4").innerHTML = '';
    }

    function point5 () {
        brd.create('point', [2, b*b], {name: '(2, '+b*b+')'});
        text = '<hr><p>' + katex.renderToString('\\color{red} f(2) = '+b+'^{2} = '+ b*b);
        text += '<div id="b6"><p><button  type="button" class="btn" onclick="graphExp.graph()">Draw the Curve </button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b5").innerHTML = '';
    }

    function graph () {
        brd.create('functiongraph', [function(x) { return Math.pow(b, x); } ]);
        document.getElementById("b6").innerHTML = '';
    }
    
    // graph(); 
    graphExp.drawAsymptote = drawAsymptote;
    graphExp.point1 = point1;
    graphExp.point2 = point2;
    graphExp.point3 = point3;
    graphExp.point4 = point4;
    graphExp.point5 = point5;
    graphExp.graph = graph;
}

function graphLog () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Graph Log by Inverting an Exponent</h1>";
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-5,5,5,-5 ], showCopyright: false });
    // var b = Math.floor((Math.random() * 4) + 2);
    //var text = '<p> Graph '+katex.renderToString('f(x) = log_{'+b+'}(x)');
    //document.getElementById("supplement").innerHTML = text;
    function startOver () {
        text = '<div id="ba"><p><button  type="button" class="btn" onclick="graphLog.graph(2)">'+katex.renderToString('f(x) = log_{2}(x)')+'</button></p></div>';
        text += '<div id="bb"><p><button  type="button" class="btn" onclick="graphLog.graph(3)">'+katex.renderToString('f(x) = log_{3}(x)')+'</button></p></div>';
        text += '<div id="bc"><p><button  type="button" class="btn" onclick="graphLog.graph(4)">'+katex.renderToString('f(x) = log_{4}(x)')+'</button></p></div>';
        document.getElementById("topText").innerHTML = text;
    }
    
    startOver();
    //var brd;
    var t = 0;
    function graph (b) {
        startOver();
        //if (t > 0) document.getElementById("work").innerHTML = '';
        //t++;
        brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-3 , b*b+1, b+1, -b*b -1 ], showCopyright: false });
        brd.create('text', [-1, 2 , katex.renderToString('\\color{blue} f(x) = '+b+'^x')], {size: 8});
        brd.create('functiongraph', [function(x) { return Math.pow(b, x); } ]);
        brd.create('line', [[0,0], [1,1]], {dash: 2, strokeColor: 'green'});
        var pE0 = brd.create('point', [-2, 1/(b*b)], {name: '(-2, 1/('+b*b+') )'});
        var pE1 = brd.create('point', [-1, 1/(b)], {name: '(-1, 1/('+b+') )'});
        var pE2 = brd.create('point', [0, 1], {name: '(0, 1 )'});
        var pE3 =  brd.create('point', [1, b], {name: '(1, '+b+')'});
        var pE3 =  brd.create('point', [2, b*b], {name: '(2, '+b*b+')'});
        var text = '<div id="work"><hr><p>Consider the graph of '+katex.renderToString('\\color{blue}f(x) = '+b+'^x');
        text += '<p>Remember, exponents and logs are inverse functions!</p>';
        text += '<div id="b0"><p><button  type="button" class="btn" onclick="graphLog.invert(-2,'+b+')">Invert the Point '+katex.renderToString('\\color{red}(-2, \\frac{1}{'+b*b+'})') + '</button></p></div></div>';
        document.getElementById("topText").innerHTML += text;
        
        
    }

    function invert(x, b) {
        var y = Math.pow(b,x);
        var n = y;
        var nLatex = y;
        var nextLatex = Math.pow(b, (x+1));
        if (x < -1) nextLatex = '\\frac{1}{'+Math.pow(b, -(x+1) )+'}';
        if (x < 0 ) {
            n = '1/('+Math.pow(b, -(x))+')';
            nLatex = '\\frac{1}{'+Math.pow(b, -x)+'}';
            // nextLatex = '\\frac{1}{'+Math.pow(b, -(x+1) )+'}';
        }
        var p = brd.create('point', [x, y], { name: '('+ n +', '+(x) +') ', size: 4, fillColor: 'green', strokeColor: 'green' });
        var iText = '<hr>'+katex.renderToString('\\color{red}('+x+', ' + nLatex + ') \\color{'+katexColor + '} \\rightarrow \\color{green}('+nLatex+', '+x+')');
        text = iText + '<br><div id="b'+(x+3)+'"><hr><p><button  type="button" class="btn" onclick="graphLog.invert('+(x+1)+','+b+')">Invert the Point '+katex.renderToString('\\color{red}('+(x+1)+', '+ nextLatex +')') + '</button></p></div>';
        if (x == 1) {
            text = iText + '<br><hr>This is the graph of ' + katex.renderToString('\\color{green}f(x) = log_{'+b+'}(x)');
            brd.create('functiongraph', [function(x) { return Math.log(x)/Math.log(b) ; } ], {strokeColor: 'green'});
            brd.create('text', [b-1, -b*b/2 , katex.renderToString('\\color{green} f(x) = log_{'+b+'}(x)')], {size: 8});
        }
        p.moveTo([y,x], 1500);
        document.getElementById("work").innerHTML += text;
        document.getElementById("b"+(x+2)).innerHTML = '';
    
    }

    graphLog.graph = graph;
    graphLog.invert = invert;
}

function drawAsymptote () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = "<h1>Draw an Asymptote</h1>";
    var dx = Math.floor((Math.random() * 10) + 2);
    var b = Math.floor((Math.random() * 10) + 2);
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-2-dx,5,5-dx,-5 ], showCopyright: false });

    var p1;
    var p0;
    var yr;
    var yl;

    var text = '<div id="bts">';
    text += '<p><button  id = "t1" type="button" class="btn" onclick="drawAsymptote.log()">Draw a vertical asymptote</button></p>';
    text += '<p><button  id = "t2" type="button" class="btn" onclick="drawAsymptote.exp()">Draw a horizontal asymptote</button></p>';
    text += '<p><button  id = "t3" type="button" class="btn" onclick="drawAsymptote.oblique()">Draw a slanted asymptote</button></p>';
    text +='</div><hr>';
    document.getElementById("topText").innerHTML += text;   

    text ='<div id="work"> - </work>';
    document.getElementById("topText").innerHTML += text;   

    function oblique () {
        document.getElementById("work").innerHTML = '';
        dx = Math.floor((Math.random() * 10) + 2);
        b = Math.floor((Math.random() * 10) + 2);
        yl = (-10 -dx + b);
        yr = (10 -dx + b );
        brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-10 -dx , 2 + b -dx + 10, 10 -dx, -10 + 2 +b -dx ], showCopyright: false });
        brd.create('functiongraph', [function(x) { return x + b + 1/(x+dx) ; } ] );
        p0 = brd.create('point', [-10 -dx , yl], {visible: false});
        p1 = brd.create('point', [-10 -dx , yl], {visible: false});
        brd.create('segment', [p0, p1], { dash: 2, strokeColor: 'green' });
        text = '<p>Here you can draw a <span style="color:green">SLANTED (oblique) </span> asymptote</p><hr>';
        text += '<div id="b0"><p><button  type="button" class="btn" onclick="drawAsymptote.drawO()">Draw a slanted (oblique) asymptote</button></p></div></div>';
        document.getElementById("work").innerHTML += text;   
        document.getElementById("t3").style.setProperty("text-decoration", "line-through");

        // p1.moveTo([10 -dx , yr])
    }

    function drawO () {
        p1.moveTo([10 -dx , yr], 1500);
        //brd.create('point', [ (-b) , 0], {name: '('+(-b)+', 0)'});
        //brd.create('point', [ (-b+1) , 1], {name: '('+(-b+1)+', 1)'});
        text = '<p>You can also draw a <span style="color:red">VERTICAL </span> asymptote</p>';
        text += '<hr><div id="b1"><p><button  type="button" class="btn" onclick="drawAsymptote.drawObliqueV()">Draw a vertical asymptote</button></p></div></div>';
        document.getElementById("work").innerHTML += text;  
        document.getElementById("b0").innerHTML = '';
    }

    function drawObliqueV () {
        p0 = brd.create('point', [-dx, yl], {visible: false});
        p1 = brd.create('point', [-dx, yl], {visible: false});
        brd.create('segment', [p0, p1], { dash: 2, strokeColor: 'red' });
        p1.moveTo([-dx,  yr], 1500);
        document.getElementById("b1").innerHTML = '';
    }


    function log () {
        document.getElementById("work").innerHTML = '';
        dx = Math.floor((Math.random() * 10) + 2);
        b = Math.floor((Math.random() * 10) + 2);
        var o = 2*Math.random();
        brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-2-dx + 0  ,5,5-dx + o ,-5 ], showCopyright: false });
        var base = ((Math.random() > 0.5)? 2 : 0.5)
        var offset = (base > 1 ? 1 : -1)
        brd.create('functiongraph', [function(x) { return Math.log(x+dx)/Math.log(base) + offset   ; } ] );
        p0 = brd.create('point', [-dx, -5], {visible: false});
        p1 = brd.create('point', [-dx, -5], {visible: false});
        brd.create('segment', [p0, p1], { dash: 2, strokeColor: 'green' });
        text = '<p>Here you can draw a VERTICAL asymptote</p><hr>';
        text +=  '<div id="b0"><p><button  type="button" class="btn" onclick="drawAsymptote.drawV()">Draw a vertical asymptote</button></p></div></div>';
        document.getElementById("work").innerHTML += text;   
        document.getElementById("t1").style.setProperty("text-decoration", "line-through"); 
    }

    function drawV () {
        p1.moveTo([-dx, 5], 1500);
        text = '<hr><p>This has a vertical asymptote at </p>';
        text += katex.renderToString('\\color{green} x = '+dx);
        document.getElementById("work").innerHTML += text;    
        document.getElementById("b0").innerHTML = '';
    }

    function exp () {
        document.getElementById("work").innerHTML = '';
        dx = Math.floor((Math.random() * 10) + 2);
        b = Math.floor((Math.random() * 10) + 2);
        var flip = (Math.random() > 0.5 ? 1 : -1)
        brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-5,5+dx,5,-2+dx ], showCopyright: false });
        brd.create('functiongraph', [function(x) { return Math.pow(2,flip*(x-3*flip)) + dx ; } ] );
        p0 = brd.create('point', [-5, dx], {visible: false});
        p1 = brd.create('point', [-5, dx], {visible: false});
        brd.create('segment', [p0, p1], { dash: 2, strokeColor: 'green' });
        text = '<p>Here you can draw a HORIZONTAL asymptote</p><hr>';
        text += '<div id="b0"><p><button  type="button" class="btn" onclick="drawAsymptote.drawH()">Draw a horizontal asymptote</button></p></div></div>';
        document.getElementById("work").innerHTML += text;    
        document.getElementById("t2").style.setProperty("text-decoration", "line-through");
    }

    function drawH () {
        p1.moveTo([5, dx], 1500);
        text = '<hr><p>This has a horizontal asymptote at </p>';
        text += katex.renderToString('\\color{green} y = '+dx);
        document.getElementById("work").innerHTML += text;    
        document.getElementById("b0").innerHTML = '';
    }

    drawAsymptote.drawV = drawV;
    drawAsymptote.drawH = drawH;
    drawAsymptote.drawO = drawO;
    drawAsymptote.oblique = oblique;
    drawAsymptote.log = log;
    drawAsymptote.exp = exp;
    drawAsymptote.drawObliqueV = drawObliqueV;
   
    //document.getElementById("topText").innerHTML += text;  
    // oblique ();
    return brd;
}

function graphOneOverX () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    //document.getElementById("problem-title").innerHTML = "<h1>Draw One Over X</h1>";
    var brd = JXG.JSXGraph.initBoard('box', { axis: true, boundingbox: [-8, 8, 8, -8 ], showCopyright: false });
    
    var p0x = brd.create('point', [-8, 0], {visible: false});
    var p1x = brd.create('point', [-8, 0], {visible: false});
    brd.create('segment', [p0x, p1x], { dash: 2, strokeColor: 'red' });
    var p0y = brd.create('point', [0, -8], {visible: false});
    var p1y = brd.create('point', [0, -8], {visible: false});
    brd.create('segment', [p0y, p1y], { dash: 2, strokeColor: 'green' });
    var pp1 = brd.create('point', [1,1], {visible: false, name: '(1, 1)',  fillColor: 'purple', strokeColor: 'purple'});
    var pp2 = brd.create('point', [2, 0.5], {visible: false, name: '(2, 1/2)',  fillColor: 'purple', strokeColor: 'purple'});
    var pph = brd.create('point', [0.5, 2], {visible: false, name: '(1/2, 2)',  fillColor: 'purple', strokeColor: 'purple'});
    var pn1 = brd.create('point', [-1,-1], {visible: false, name: '(1, 1)',  fillColor: 'purple', strokeColor: 'purple'});
    var pn2 = brd.create('point', [-2, -0.5], {visible: false, name: '(2, 1/2)',  fillColor: 'purple', strokeColor: 'purple'});
    var pnh = brd.create('point', [-0.5, -2], {visible: false, name: '(1/2, 2)',  fillColor: 'purple', strokeColor: 'purple'});

    var text = '<div id="b0"><p><button  type="button" class="btn" onclick="graphOneOverX.drawH()">Draw the Horizontal Asymptote</button></p></div>';
    document.getElementById("topText").innerHTML = text;
    document.getElementById("supplement").innerHTML = '<h2>Graph ' + katex.renderToString('\\color{red} y \\color{'+katexColor+'}= \\frac{1}{\\color{green}x}')+'</h2>';

    function drawH () {
        p1x.moveTo([8, 0], 1500);
        text = 'Horizontal Asymptote at ' + katex.renderToString('\\color{red} y = 0');
        text += '<hr><div id="b1"><p><button  type="button" class="btn" onclick="graphOneOverX.drawY()">Draw the Vertical Asymptote</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b0").innerHTML = '';
        brd.create('text', [-2, 0.4 ,  katex.renderToString('\\color{red} y = 0')]);

    }

    function drawY () {
        p1y.moveTo([0, 8], 1500);
        text = 'Vertical Asymptote at ' + katex.renderToString('\\color{green} x = 0');
        text += '<hr><div id="b2"><p><button  type="button" class="btn" onclick="graphOneOverX.plot1()">Calculate x = 1</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b1").innerHTML = '';
        brd.create('text', [0.8, -2 ,  katex.renderToString('\\color{green} x = 0')]);
    }

    function plot1 () {
        text = ' <div id = "p1"><p>'+ katex.renderToString('\\color{green}x = 1') + '</p>';
        text += ' <p>'+ katex.renderToString('\\color{red} y  =\\color{'+katexColor+'} \\frac{1}{\\color{green}1}') + '</p></div>';
        text += ' <p>'+ katex.renderToString('(\\color{green}1 \\color{'+katexColor+'},\\color{red}1 \\color{'+katexColor+'})') + '</p>';
        text += '<div id="b3"><p><button  type="button" class="btn" onclick="graphOneOverX.plot2()">Calculate x = 2</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b2").innerHTML = '';
        pp1.setAttribute({ visible: true });
    }

    function plot2 () {
        document.getElementById("p1").innerHTML = '';
        text = '<hr> <div id = "p2"><p>'+ katex.renderToString('\\color{green}x = 2') + '</p>';
        text += ' <p>'+ katex.renderToString('\\color{red} y  =\\color{'+katexColor+'} \\frac{1}{\\color{green}2}') + '</p></div>';
        text += ' <p>'+ katex.renderToString('(\\color{green}2 \\color{'+katexColor+'},\\color{red} \\frac{1}{2} \\color{'+katexColor+'})') + '</p>';
        text += '<div id="b4"><p><button  type="button" class="btn" onclick="graphOneOverX.plot3()">Calculate x = 1/2</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b3").innerHTML = '';
        pp2.setAttribute({ visible: true });
    }

    function plot3 () {
        document.getElementById("p2").innerHTML = '';
        text = '<hr> <div id = "p3"><p>'+ katex.renderToString('\\color{green}x = \\frac{1}{2}') + '</p>';
        text += ' <p>'+ katex.renderToString('\\color{red} y  =\\color{'+katexColor+'} \\frac{1}{\\color{green} \\frac{1}{2}}') + '</p></div>';
        text += ' <p>'+ katex.renderToString('(\\color{green} \\frac{1}{2}  \\color{'+katexColor+'},\\color{red} 2 \\color{'+katexColor+'})') + '</p>';
        text += '<div id="b5"><p><button  type="button" class="btn" onclick="graphOneOverX.plot4()">Calculate x = -1</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b4").innerHTML = '';
        pph.setAttribute({ visible: true });
    }

    function plot4 () {
        document.getElementById("p3").innerHTML = '';
        text = '<hr> <div id = "p4"><p>'+ katex.renderToString('\\color{green}x = -1') + '</p>';
        text += ' <p>'+ katex.renderToString('\\color{red} y  =\\color{'+katexColor+'} \\frac{1}{\\color{green}-1}') + '</p></div>';
        text += ' <p>'+ katex.renderToString('(\\color{green}-1 \\color{'+katexColor+'},\\color{red}-1 \\color{'+katexColor+'})') + '</p>';
        text += '<div id="b6"><p><button  type="button" class="btn" onclick="graphOneOverX.plot5()">Calculate x = -2</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b5").innerHTML = '';
        pn1.setAttribute({ visible: true });
    }

    function plot5 () {
        document.getElementById("p4").innerHTML = '';
        text = '<hr> <div id = "p5"><p>'+ katex.renderToString('\\color{green}x = -2') + '</p>';
        text += ' <p>'+ katex.renderToString('\\color{red} y  =\\color{'+katexColor+'} \\frac{1}{\\color{green}-2}') + '</p></div>';
        text += ' <p>'+ katex.renderToString('(\\color{green}-2 \\color{'+katexColor+'},\\color{red} - \\frac{1}{2} \\color{'+katexColor+'})') + '</p>';
        text += '<div id="b7"><p><button  type="button" class="btn" onclick="graphOneOverX.plot6()">Calculate x = -1/2</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b6").innerHTML = '';
        pn2.setAttribute({ visible: true });
    }

    function plot6 () {
        document.getElementById("p5").innerHTML = '';
        text = '<hr> <div id = "p6"><p>'+ katex.renderToString('\\color{green}x = -\\frac{1}{2}') + '</p>';
        text += ' <p>'+ katex.renderToString('\\color{red} y  =\\color{'+katexColor+'} \\frac{1}{\\color{green} - \\frac{1}{2}}') + '</p></div>';
        text += ' <p>'+ katex.renderToString('(\\color{green} -\\frac{1}{2}  \\color{'+katexColor+'},\\color{red}- 2 \\color{'+katexColor+'})') + '</p>';
        text += '<div id="b8"><p><button  type="button" class="btn" onclick="graphOneOverX.draw()">Draw the curve</button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b7").innerHTML = '';
        pnh.setAttribute({ visible: true });
    }

    function draw () {
        brd.create('functiongraph', [function(x) { return  1/(x) ; } ] );
        text = '<hr>Draw the curve through the points and to the asymptotes';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("p6").innerHTML = '';
        document.getElementById("b8").innerHTML = '';

    }

    graphOneOverX.drawH = drawH;
    graphOneOverX.drawY = drawY;
    graphOneOverX.plot1 = plot1;
    graphOneOverX.plot2 = plot2;
    graphOneOverX.plot3 = plot3;
    graphOneOverX.plot4 = plot4;
    graphOneOverX.plot5 = plot5;
    graphOneOverX.plot6 = plot6;
    graphOneOverX.draw = draw;

}

function multiplyMatrices () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    document.getElementById("problem-title").innerHTML = 'Multiply Matrices'; 
    var r=Math.floor((Math.random() * 3) +2 );
	var rc=Math.floor((Math.random() * 3) +2 );
	var c=Math.floor((Math.random() * 3) +2 )
	var a= [];//initialize array
	for (var i = 0 ; i < r; i++){
		a[i] = [];//initialize inner array
		for (var j = 0; j < rc; j++) 
		{
			a[i][j] = Math.floor((Math.random() * 10) +2 )*Math.pow(-1, Math.floor((Math.random() * 2)));
		}
	}
	var b= [];//initialize array
	for (var i = 0 ; i < rc; i++) {
		b[i] = [];//initialize inner array
		for (var j = 0; j < c; j++) 
		{//i++ = j++
			b[i][j] = Math.floor((Math.random() * 10) +2 )*Math.pow(-1, Math.floor((Math.random() * 2)));
		}
    }

    document.getElementById("supplement").innerHTML = '<p>' + katex.renderToString('A = \\color{red}'+arrayToMatrix(a));
    document.getElementById("supplement").innerHTML += '<p> and </p>';
    document.getElementById("supplement").innerHTML += katex.renderToString('B = \\color{blue}'+arrayToMatrix(b)) + '</p>';
    document.getElementById("supplement").innerHTML += '<p>Find  ' + katex.renderToString('M = A \\times B ') + '</p>';
    document.getElementById("topText").innerHTML =  writeButton('multiplyMatrices.checkSize()', 'Check the size', 'b0');
    var text = '';
    function checkSize () {
        text = '<p>If the <span style="color:red">column</span> of the first matrix matches the <span style="color:blue">row</span> of the second, you can multiply the matrices</p>';
        text += '<p>' + katex.renderToString('(\\color{red} ' + r + '\\times \\cancel{' + rc +'} \\color{'+katexColor+'}) \\times (\\color{blue} \\cancel{' + rc +'} \\times' + c+'\\color{'+katexColor+'})') + ' </p> ';
        text += '<p>The resulting matrix will have a size ' + katex.renderToString('\\color{red} '+ r + '\\color{'+katexColor+'} \\times \\color{blue} ' +c);
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b0").innerHTML = '';
        document.getElementById("topText").innerHTML +=  writeButton('multiplyMatrices.writeCalculations()', 'Determine the entries', 'b1');
    }

    
var result2 = [];
    var result = [];
    var peq = '';
	for (var i = 0; i < a.length; i++) {
            result[i] = [];
            result2[i] = [];
			for (var j = 0; j < b[0].length; j++) {
					var sum = 0;
					var t='M_{\\color{red}{'+(i+1)+'},\\color{blue}{'+(j+1)+'}}=';
					for (var k = 0; k < a[0].length; k++) {
							sum += a[i][k] * b[k][j];
							t+='(\\color{red}{'+a[i][k]+'})(\\color{blue}{'+ b[k][j]+'}) + ';
					}
					result[i][j] = sum;
					t = t.substring(0, t.length - 2);
                    peq+='<br><br>'+katex.renderToString(t+' = '+ sum);
                    result2[i][j] = 'M_{'+(i+1)+','+(j+1)+'}';
			}
    }
    
    function writeCalculations () {
        text = '<hr><p>The resulting matrix will look like can be calculated by multiplying across each <span style="color:red">row</span> down each <span style="color:blue">column<span>';
        document.getElementById("topText").innerHTML += text;
        text = katex.renderToString('M = '+arrayToMatrix(result2));
        document.getElementById("supplement").innerHTML += '<hr>' + text;
        document.getElementById("supplement").innerHTML += '<p>' + peq + '</p>';
        document.getElementById("topText").innerHTML += '<p>' + katex.renderToString('\\color{red}'+arrayToMatrix(a)+'\\color{'+katexColor+'} \\times \\color{blue}'+arrayToMatrix(b)) + '</p>';
        document.getElementById("b1").innerHTML = '';
        text = '<p>The resulting matrix will be </p>';
        text += katex.renderToString(' M = ' + arrayToMatrix(result));
        document.getElementById("topText").innerHTML += text;
    }
    
    multiplyMatrices.checkSize = checkSize;
    multiplyMatrices.writeCalculations = writeCalculations;
}
function simpleReduction () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    var x = (Math.floor((Math.random() * 6))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var y = (Math.floor((Math.random() * 6))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var a = (Math.floor((Math.random() * 6)) + 2) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var b = (Math.floor((Math.random() * 6))+ 2) * Math.pow(-1, Math.floor((Math.random() * 2)));
    document.getElementById("problem-title").innerHTML = 'Solve for X and Y'; 
    var text = writeMatrix (a,0,0,b,a*x,b*y);
    document.getElementById("supplement").innerHTML = text; 
    text  = '<div id="b0"><p><button  type="button" class="btn" onclick="simpleReduction.findX()">Solve for X</button></p></div>';
    document.getElementById("topText").innerHTML = text;
    
    
    function findX () {
        text = '<p>Divide the top row by <span style="color:red"> ' + a + '<span></p>'; 
        text += '<p>' + writeMatrix('\\frac{'+a+'}{'+a+'}','\\frac{'+0+'}{'+a+'}',0,b,'\\frac{'+a*x+'}{'+a+'}',b*y) + '</p>';
        text += '<p>' + writeMatrix(1,0,0,b,x,b*y) + '</p>';
        text += '<p> From the first row ' + katex.renderToString('\\color{red} x = '+x)+ '</p>'; 
        document.getElementById("supplement").innerHTML += '<p>'+ text + '</p>';
        document.getElementById("b0").innerHTML = '';
        text  = '<div id="b1"><p><button  type="button" class="btn" onclick="simpleReduction.findY()">Solve for Y</button></p></div>';
        document.getElementById("topText").innerHTML += text;
    }

    function findY () {
        text = '<p>Divide the second row by <span style="color:blue"> ' + a + '<span></p>'; 
        text += '<p>' + writeMatrix(1,0,'\\frac{'+0+'}{'+b+'}','\\frac{'+b+'}{'+b+'}',x,'\\frac{'+b*y+'}{'+b+'}') + '</p>';
        text += '<p>' + writeMatrix(1,0,0,1,x,y) + '</p>';
        text += '<p> From the second row ' + katex.renderToString('\\color{blue} y= '+y)+ '</p>'; 
        document.getElementById("supplement").innerHTML +='<p>'+ text + '</p>';
        document.getElementById("b1").innerHTML = '';
        //text  = '<div id="b1"><p><button  type="button" class="btn" onclick="simpleReduction.findY()">Solve for Y</button></p></div>';
        //document.getElementById("topText").innerHTML += text;
        document.getElementById("topText").innerHTML = 'DONE';
    }

    simpleReduction.findX = findX;
    simpleReduction.findY = findY;
}
function eliminateAndReduce () {
    clearBoard();
    document.getElementById(("right-side")).style.display = 'block';
    var x = (Math.floor((Math.random() * 6))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var y = (Math.floor((Math.random() * 6))) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var a = (Math.floor((Math.random() * 6)) + 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var b = (Math.floor((Math.random() * 6))+ 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var c = (Math.floor((Math.random() * 6))+ 1) * Math.pow(-1, Math.floor((Math.random() * 2)));
    var d = (Math.floor((Math.random() * 6))+ 1) * Math.pow(-1, Math.floor((Math.random() * 2)));

    if (a*d - b*c == 0) 
    {
        a = 2;
        b = 4;
        c = 1;
        d = -3;
    } 
    var a1 = a*x + b*y;
    var a2 = c*x + d*y;
    console.log(x, y, a,b,c,d,a1,a2);
    var g1 =  math.gcd(a,b,a1);
    var g2 = math.gcd(c,d,a2);
    a = a/g1;
    b= b/g1;
    c = c/g2;
    d = d/g2;
    a1 = a1/g1;
    a2 = a2/g2;

    var text = '<div class="row"><div class="col-8">';
    text += 'Solve the following equations using both algebra and matrix reduction';
    text += '</div></div>';
    document.getElementById("problem-title").innerHTML = text; 
    //text = writeColor(a, 'red') + 'x '+ 
    text  = '<p>' + writeEq(a,b,a1) + '';
    text  += '<br>' + writeEq(c, d, a2) + '</p>';
    var eq  = text;
    text +=  '<div class="row"><div id = "lhs" class="col-4" style="background-color:#dff;padding-left:20px" ><h4>Algebra</h4></div>';
    text +=  '<div id = "rhs" class="col-4" ><h4>Reduction</h4></div></div>';
    document.getElementById("supplement").innerHTML += text; 
    text = writeMatrix (a,b,c,d,a1,a2);
    document.getElementById("rhs").innerHTML += text; 
    document.getElementById("lhs").innerHTML += eq; 

    var m1 = Math.abs(math.gcd(b, d));
    console.log(m1);
    text = '<b>Match the <span style="color:blue"> Y </span> coefficients';
    if (Math.abs(b) !== Math.abs(d) ) {
        text  = '<div id="b0"><p><button  type="button" class="btn" onclick="eliminateAndReduce.match1()">'+text + '</button></p></div>';
    }
    else {
        text = '<div id="b0"> The <span style="color:red"> Y </span> coefficients already match';
        text += '<div id="b1"><p><button  type="button" class="btn" onclick="eliminateAndReduce.eliminateY()">Eliminate <span style="color:blue">Y</span></button></p></div>';
    } 
    document.getElementById("topText").innerHTML = text;

    function match1() {
        document.getElementById("b0").innerHTML = ''; 
        text = '';
        if ( Math.abs(d/m1) != 1 )  text  = '<p>Multiply the top row/equation by ' + Math.abs(d/m1) + '</p>';
        if ( Math.abs(b/m1) != 1 ) text  += '<p>Multiply the second row/equation by ' + Math.abs(b/m1) + '</p>';
        document.getElementById("topText").innerHTML += text;
        
        text  = '<hr><p>' + writeEq(a* Math.abs(d/m1) , b* Math.abs(d/m1), a1* Math.abs(d/m1)) + '';
        text  += '<br>' + writeEq(c*Math.abs(b/m1), d*Math.abs(b/m1), a2*Math.abs(b/m1)) + '</p>';
        document.getElementById("lhs").innerHTML += text; 
        text = '<br><hr><p>' + writeMatrix (a* Math.abs(d/m1) , b* Math.abs(d/m1),c*Math.abs(b/m1), d*Math.abs(b/m1),a1* Math.abs(d/m1),a2*Math.abs(b/m1)) + '</p>';
        document.getElementById("rhs").innerHTML += text; 
        text = '<hr><div id="b1"><p><button  type="button" class="btn" onclick="eliminateAndReduce.eliminateY()">Eliminate <span style="color:blue">Y</span></button></p></div>';
        document.getElementById("topText").innerHTML += text; 
    }

    var an;
    var a1n;
    var bn;
    function eliminateY (){
        var sub = true;
        if (b*d < 0 ) sub = false;
        text = '<p>' + (sub ? ' SUBTRACT ' : ' ADD ')+ ' the two equations/rows</p>';
        text += '<p>For the matrix, replace the first row with the result</p>';
        text += '<p>To ' +(sub ? ' SUBTRACT ' : ' ADD ') +' the rows, line up each column</p>';
        document.getElementById("topText").innerHTML += text; 
        document.getElementById("b1").innerHTML =  ''; 
        if (sub) {
            an = a* Math.abs(d/m1) - c*Math.abs(b/m1);
            bn = b* Math.abs(d/m1) - d*Math.abs(b/m1);
            a1n = a1* Math.abs(d/m1) - a2*Math.abs(b/m1);
        } else {
            an = a* Math.abs(d/m1) + c*Math.abs(b/m1);
            bn = b* Math.abs(d/m1) + d*Math.abs(b/m1);
            a1n = a1* Math.abs(d/m1) + a2*Math.abs(b/m1);
        }
        text = writeEq(an, bn, a1n);
        //document.getElementById("lhs").innerHTML += '<hr><p>'+ text ; 
        text += '<br>Or <br>' + katex.renderToString('\\color{red}' + an+'x \\color{'+katexColor+'} = '+a1n) + '</p>';
        document.getElementById("lhs").innerHTML += text; 
        text = '<hr><p>' + writeMatrix (an, bn,c*Math.abs(b/m1), d*Math.abs(b/m1), a1n, a2*Math.abs(b/m1)) + '</p>';
        document.getElementById("rhs").innerHTML += text; 

        text = '<hr><div id="b2"><p><button  type="button" class="btn" onclick="eliminateAndReduce.solveX()">Solve for  <span style="color:red">X</span></button></p></div>';
        document.getElementById("topText").innerHTML += text; 
    }

    function solveX () {
        var at = a;
        if (an != 1)  {
            text  = '<p>Using Algebra, divide both sides by <span style="color:red">' + an + '</span></p>';
            text  += '<p>Using Reduction, divide the second row by <span style="color:red">' + an + '</span></p>';
            document.getElementById("topText").innerHTML += text; 
            text = '\\frac{ \\color{red}'+an+'x  }{ \\color{'+katexColor+'}'+an +'} = \\frac{'+a1n+'}{'+an+'}';
            document.getElementById("lhs").innerHTML += '<hr><p>'+ katex.renderToString(text) + '</p>'; 
            text = '<hr><br><p>' + writeMatrix ('\\frac{'+an+'}{'+an+'}', '\\frac{'+bn+'}{'+an+'}',c*Math.abs(b/m1),d*Math.abs(b/m1), '\\frac{'+a1n+'}{'+an+'}', a2*Math.abs(b/m1)) + '</p>';
            document.getElementById("rhs").innerHTML += text; 
            
        } 
        text = '<p>The matrix simplifies to ' + writeMatrix(1,0, c*Math.abs(b/m1),d*Math.abs(b/m1) ,x,a2*Math.abs(b/m1)) + '</p>';
        text += '<p>From either method, we can conclude that ' + katex.renderToString('\\color{red} x = '+x) + '<p>';
        document.getElementById("topText").innerHTML += text;
        text = '<hr><div id="b3"><p><button  type="button" class="btn" onclick="eliminateAndReduce.solveY()">Continue to solve for   <span style="color:blue">Y</span></button></p></div>';
        document.getElementById("topText").innerHTML += text;
        document.getElementById("b2").innerHTML = ''; 
    }
    
    function solveY () {

        text = '<hr>Substitute the value of <span style="color:red">X</span> into one of the equations and solve';
        text += '<p>' + writeEq(a,b,a1) + '</p>';
        text += '<p>' + writeEq(a,b,a1, '('+x+')') + '</p>';
        document.getElementById("lhs").innerHTML += text; 
        text = '<p>' + writeEq(a*x,b,a1, '')+ '</p>';
        text += '<p> '+katex.renderToString('\\color{blue} y = ' +y );
        document.getElementById("lhs").innerHTML += text; 
        if (c*Math.abs(b/m1) != 1) {
            text = '<p> Match the first column by making it equal to 1</p>';
           // text = '<hr><div id="b3"><p><button  type="button" class="btn" onclick="eliminateAndReduce.solveY()">Continue to solve for   <span style="color:blue">Y</span></button></p></div>';
           
           document.getElementById("topText").innerHTML += text;
           text =  '<p>'+writeMatrix(1,0, c*Math.abs(b/m1),d*Math.abs(b/m1) ,x,a2*Math.abs(b/m1)) + '</p>';
           text += '<p>Divide the second row by '+ katex.renderToString('\\color{red} '+ c*Math.abs(b/m1) )+' to match the first column</p>';
           text += '<p>' + writeMatrix(1,0, '\\frac{'+c*Math.abs(b/m1)+'}{'+c*Math.abs(b/m1)+'}','\\frac{'+d*Math.abs(b/m1)+'}{'+c*Math.abs(b/m1)+'}' ,x,'\\frac{'+a2*Math.abs(b/m1)+'}{'+c*Math.abs(b/m1)+'}') + '</p>';
           document.getElementById("rhs").innerHTML += '<hr>' + text; 
           

        }
        document.getElementById("b3").innerHTML = ''; 
        var at = 1;
        var bt = 0;
        var ct = 1;

        var arr = math.fraction(d, c);
        var dt = writeMathJsFrac(arr);
        arr = math.fraction(a2, c);
        var a2t = writeMathJsFrac(arr);
        text = '<p>'+ writeMatrix(at,bt,ct,dt,x,a2t);
        document.getElementById("rhs").innerHTML += '<hr>' + text; 
        text = '<p>Now that <span style="color:red">X</span> column matches, subtract the two rows</p>';
        //text = 
        document.getElementById("rhs").innerHTML +=  '<p>'+text +'</p>'; 
        arr = math.fraction(-d, c);
        dt = writeMathJsFrac(arr);
        arr = math.fraction((x*c - a2),(c));
        a2t = writeMathJsFrac(arr);
        text = '<p>'+ writeMatrix(at,bt,0,dt,x,a2t);
        document.getElementById("rhs").innerHTML +=   '<p>'+text +'</p>'; 
        var ml = writeMathJsFrac(math.fraction(c, -d));
        text  = '<p>Last multiply the bottom row by ' + katex.renderToString('\\color{blue}'+ml)+'</p>' ;
        text += '<p>'+ writeMatrix(at,bt,0+'('+ml+')',dt+'('+ml+')',x,a2t+'('+ml+')') +'</p>';
        text += '<p>'+ writeMatrix(1,0,0,1,x,y) +'</p>';
        text += '<p>From this matrix ' + katex.renderToString('\\color{red}x = '+x);
        text += ' and ' + katex.renderToString('\\color{blue}y = '+y) + '</p>';
        document.getElementById("rhs").innerHTML +=  text;

    }

    
    function writeEq(a,b,ans,r) {
        console.log(r);
        if (a == 1) a = '';
        if (a == -1 ) a = '-';
        var x1 = (typeof r !=='undefined' ? r : 'x');
        var write =  writeColor(a + x1, 'red') ;
        var s = (b < 0 ? ' - ' : ' + ')
        if (b == 1) b = '';
        if (b == -1 ) b = '';
        if (b < 0 ) b = Math.abs(b);
        write += s + writeColor(b + 'y', 'blue') ;
        write += ' = ' + ans;
        console.log(write);
        return katex.renderToString(write);
    }

    eliminateAndReduce.solveX = solveX;
    eliminateAndReduce.solveY = solveY;
    eliminateAndReduce.match1 = match1;
    eliminateAndReduce.eliminateY = eliminateY;

}
/* utility functions below */

function arrayToMatrix (M,bracket)
{
	br=( (typeof bracket != 'undefined') ? bracket : 'bmatrix');
	var text='\\begin{'+br+'}';
	for (var  a= 0; a < M.length; a++)
	{
		for (var  b= 0; b < M[a].length; b++)
		{
			st=(M[a][b]).toString().split('/');
			if (typeof st[1] != 'undefined') text+='\\frac{'+st[0]+'}{'+st[1]+'} &';
			else text+=M[a][b]+'&';
		}
		text = text.substring(0, text.length - 1);
		text+='\\\\';
	}
	text+='\\end{'+br+'}';
	return text;
}

function writeButton (func, text, id) {
    return text  = '<div id="'+id+'"><p><button  type="button" class="btn" onclick="'+func+'">'+text+'</button></p></div>';
}
function writeMatrix (a,b,c,d,a1,a2) {
    var write = '\\begin{bmatrix}';
    write += writeColor(a, 'red') + ' & ' + writeColor(b, 'blue') +' \\\\';
    write += writeColor(c, 'red') + ' & ' + writeColor(d, 'blue');
    write += '\\end{bmatrix}';

    write += '\\begin{bmatrix} x \\\\ y  \\end{bmatrix}';
    write += ' = \\begin{bmatrix} '+a1+' \\\\ '+a2 + '  \\end{bmatrix}';
    return katex.renderToString(write);
}

function writeColor(text, color) {
    return  '\\color{'+color+'}' + text + '\\color{'+katexColor+'}';
}

function clearBoard() {
    document.getElementById("hintResult").innerHTML = '';
    document.getElementById("topText").innerHTML = '';
    document.getElementById("problem-title").innerHTML = '';
    document.getElementById("supplement").innerHTML = '';
    document.getElementById("hint").innerHTML = '';
    document.getElementById("ques").innerHTML = '';
    document.getElementById("box").innerHTML = '';
}

// got it backwards, v is the coeff and c is the variable
function singleSignAdd(v, c) {
    console.log(v);
    if (typeof c == 'undefined') c = '';
    var c1 = '';
    if (c.length > 0) c1 = c;
    if (v == 0) return '';
    if (v == 1) {
        if (c.length > 0) return ' + ' + c1;
        return ' + 1';
    }
    if (v == - 1) {
        if (c.length > 0) return ' - ' + c1;
        return ' - 1';
    }
    if (v > 0) return ' + ' + v + c1;
    if (v < 0) return ' - ' + (-v) + c1;
    return v + ' + ' + c1;
}

function singleTermMultiply(v, c) {
    if (v == 0) return 0;
    if (v == 1) return c;
    if (v == -1) return ' -' + c;
    return v + c;

}

function randSubArray(n) {
    var arr = [];
    for (i = 0; i < 20; i++) {
        arr[i] = i - 9;
    }
    var subArr = math.pickRandom(arr, n);
    return subArr;
}