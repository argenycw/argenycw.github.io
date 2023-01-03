function genMatrix(){
	var row, col;
	var target = "matrix-" + currentPage;
	if (currentPage == 1) {
		row = Math.floor(document.getElementById("row").value);
		col = Math.floor(document.getElementById("col").value);
	} else if (currentPage == 2) {
		row = Math.floor(document.getElementById("size").value);
		col = row;
	}
	document.getElementById(target).innerHTML = "";
	if (row > 10 || col > 10) {
		alert("ERROR: The input value is too large.");
		return;
	} 
	if (row < 1 || col < 1) {
		alert("ERROR: Invalid document.getElementById(target)");
		return;
	}
	document.getElementById(target).innerHTML += 'Input: <br/>';
	var tableArea = document.createElement("div");
	tableArea.setAttribute("class", "overflow-table");
	var inputTable = document.createElement("table");
	for (var i = 0; i < row; i++) {
		let row = document.createElement("tr");
		for (var j = 0; j < col; j++) {
			let box = document.createElement("td");
			let inputField = document.createElement("input");
			inputField.setAttribute("class", "matrix-input");
			inputField.setAttribute("type", "number");
			inputField.setAttribute("name", "element-" + currentPage);
			box.appendChild(inputField);
			row.appendChild(box);
		}
		inputTable.appendChild(row);
	}
	tableArea.appendChild(inputTable);
	document.getElementById(target).appendChild(tableArea);
	if (currentPage == 1) 
		document.getElementById(target).innerHTML += '<button id="rref" onclick="rref()">Calculate</button>';
	else if (currentPage == 2)
		document.getElementById(target).innerHTML += '<button id="inverse" onclick="rref()">Calculate</button>';
}

function rref() {
	// Handle input values
	if (currentPage == 1) { // RREF setup
		var row = Math.floor(document.getElementById("row").value);
		var col = Math.floor(document.getElementById("col").value);
		var input = document.getElementsByName("element-1");
		var matrix = [];	
		for (var i = 0; i < row; i++) {	
			var eachrow = [];
			for (var j = 0; j < col; j++) {
				eachrow.push(Number(input[i*col+j].value));
			}
			matrix.push(eachrow);
		}
	} else if (currentPage == 2) { // Inverse setup
		var row = Math.floor(document.getElementById("size").value);
		var col = row;
		var input = document.getElementsByName("element-2");
		var matrix = [];	
		for (var i = 0; i < row; i++) {	
			var eachrow = [];
			for (var j = 0; j < col; j++) {
				eachrow.push(Number(input[i*col+j].value));
			}
			for (var j = 0; j < col; j++) {
				if (i==j) eachrow.push(1);
				else eachrow.push(0);
			}
			matrix.push(eachrow);
		}
		col *= 2;
	}
	
	// Start calculate REF
	eros(0, 0, row-1, col-1);
	for (var i = 0; i < row; i++) {
		var ratio = 1;
		for (var j = 0; j < col; j++) {
			if (Math.round(matrix[i][j]*allowance)/allowance != 0) {
				ratio = matrix[i][j];
				break;
			}
		}
		if (ratio == 1) continue;
		for (var j = 0; j < col; j++) {
			matrix[i][j] /= ratio;
		}
	}	
	beros(0, 0, row-1, col-1);
	function eros(row1, col1, row2, col2) {
		if (row1 >= row2 || col1 == col2) return 0;
		
		var rownon0 = false;
		for (var i = row1; i < row; i++) {
			if (Math.round(matrix[i][col1]*allowance)/allowance != 0) rownon0 = true;
		}
		if (!rownon0) {
			eros(row1, col1+1, row2, col2);
			return 0;
		}
	
		for (var i = row1+1; i <= row2; i++) {
			if (Math.round(matrix[row1][col1]*allowance)/allowance == 0) { 
				var found = false;
				for (var k = row1+1; k <= row2; k++) {; // Try to swap row
					if (Math.round(matrix[k][col1]*allowance)/allowance) {
						var temp = matrix[k];
						matrix[k] = matrix[row1];
						matrix[row1] = temp;
						found = true;
					}
				}
				if (!found) break;
			}
			var ratio = (-1)*matrix[i][col1]/matrix[row1][col1];
			for (var j = col1; j <= col2; j++) {
				matrix[i][j] += matrix[row1][j] * ratio;
			}
		}
		eros(row1+1, col1+1, row2, col2);
	}
	
	// Backward EROs
	function beros(row1, col1, row2, col2) {
		var temp_row2 = row2;
		if (row1 >= row2 || col1 >= col2) return 0;
		
		else {
			if (Math.round(matrix[row2][col2]*allowance)/allowance != 0) {
				for (var i = row2-1; i >= row1; i--) {	
					var ratio = (-1)*matrix[i][col2]/matrix[row2][col2];
					var found = false;
					for (var j = col1; j < col; j++) {
						matrix[i][j] += matrix[row2][j] * ratio;
					}
					for (var j = col1; j <= col2; j++) {
						if (Math.round(matrix[i][j]*allowance)/allowance != 0) found = true;
					}
					if (!found) { // Swap row
						var temp = matrix[i];
						matrix[i] = matrix[row2];
						matrix[row2] = temp;
						row2 = i;
					}
				}
				if (col2 > temp_row2) 
					beros(row1, col1, temp_row2, col2-1);
				else if (col2 < temp_row2)
					beros(row1, col1, temp_row2-1, col2);
				else beros(row1, col1, temp_row2-1, col2-1);
			}
			else {
				var found = false;
				for (var j = 0; j < col2; j++) {
					if (Math.round(matrix[row2][j]*allowance)/allowance != 0) found = true;
				}
				if (!found) {
					beros(row1, col1, temp_row2-1, col2);
				}
				else {
					beros(row1, col1, temp_row2, col2-1);
				}
				return 0;
			}
		}
	}
	
	// Output
	var output;
	if (currentPage == 1) {
		output = "<table>";
		for (var i = 0; i < row; i++) {	
			output += "<tr>";
			for (var j = 0; j < col; j++) {
				output += "<td>" + Math.round(matrix[i][j]*10000)/10000 + "</td>";
			}
			output += "</tr>";
		}
		output += "</table>";
		document.getElementById("soln-1").innerHTML = "RREF: <br/>" + output;

	} else if (currentPage == 2) {
		var noSoln = false;
		for (var i = 0; i < row; i++) {
			if (matrix[i][i] != 1) noSoln = true;
		}
		if (noSoln) output = "This matrix has no inverse.";
		else {
			output = "<table>";
			for (var i = 0; i < row; i++) {	
				output += "<tr>";
				for (var j = row; j < col; j++) {
					output += "<td>" + Math.round(matrix[i][j]*10000)/10000 + "</td>";
				}
				output += "</tr>";
			}
		output += "</table>";
		}
		document.getElementById("soln-2").innerHTML = "Inverse: <br/>" + output;
	}
}