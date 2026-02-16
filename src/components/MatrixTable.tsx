// MatrixTable.tsx
import { useState } from 'react'

import { rref } from '../pages/interesting_works/matrice.js'

interface MatrixTableConfig {
  sizeX?: number;
  sizeY?: number;
  square?: boolean;
} 

const MatrixTable : React.FC<MatrixTableConfig> = (props) => {

  const [rrefMatSizeX, setRrefMatSizeX] = useState(props.sizeX ? props.sizeX : 0);
  const [rrefMatSizeY, setRrefMatSizeY] = useState(props.sizeY ? props.sizeY : 0);
  const [matrixField, setMatrixField] = useState<Array<Array<number|undefined>>|undefined>(undefined)
  const [solnField, setSolnField] = useState<Array<Array<number|undefined>>|undefined|null>(undefined)

  function clamp(num: number, min: number, max: number) {
    return num <= min ? min : num >= max ? max : num
  }

  return (
    <div>
      <input type="number" id="row" value={rrefMatSizeX === 0 ? '' : rrefMatSizeX} onChange={e => setRrefMatSizeX(Number(e.target.value))} />
      {props.square ? "" :
        [" × ", <input key="input" type="number" id="col" value={rrefMatSizeY === 0 ? '' : rrefMatSizeY} onChange={e => setRrefMatSizeY(Number(e.target.value))} />]
      } &nbsp;
      <button id="gen-matrix" onClick={() => {          
          let x = clamp(rrefMatSizeX, 1, 9);
          let y = clamp(rrefMatSizeY, 1, 9);
          if (props.square) {
            y = x;
          }          
          setMatrixField(Array.from({ length: x }, () => Array.from({ length: y }, () => 0)))
        }
      }>Generate Matrix</button>
      <div className="row">

        {/* Input Matrix Field */}
        <div id="matrix-1" className="col-12 col-md-6">
          {matrixField ? "Input:" : ""}
          <table>
            <tbody>
              {matrixField?.map((row, rowIndex) => (
                <tr key={`row-${rowIndex}`}>
                  {row.map((item, colIndex) => (
                    <td key={`item-${colIndex}`}>
                      <input type="number" id={`td-${rowIndex}-${colIndex}`} value={item} onChange={e => {
                        setMatrixField(prevMatrix => {
                          // deep copy a new matrix
                          const newMatrix = prevMatrix?.map((rowArray) => [...rowArray]);
                          // Update the specific cell
                          if (newMatrix) {
                            newMatrix[rowIndex][colIndex] = parseInt(e.target.value);
                          }
                          return newMatrix; // Return the new matrix
                        });
                      }}/>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> 
          {matrixField ? <input type="submit" value="Calculate" onClick={() => {
            // square => calculating inverse
            if (props.square) {
              // create a (H, 2W) matrix and run RREF
              const matrix = new Array(rrefMatSizeX).fill(0).map(() => new Array(rrefMatSizeX).fill(0));
              for (let i = 0; i < rrefMatSizeX; i++) {
                for (let j = 0; j < 2 * rrefMatSizeX; j++) {
                  if (j < rrefMatSizeX) { // copy array
                    matrix[i][j] = matrixField[i][j];
                  }
                  else {
                    matrix[i][j] = (i == j-rrefMatSizeX) ? 1 : 0;
                  }
                }
              }
              const soln = rref(matrix, rrefMatSizeX, 2 * rrefMatSizeX);
              // check if no soln
              let noSoln = false;
              for (var i = 0; i < rrefMatSizeX; i++) {
                if (soln[i][i] != 1) noSoln = true;
              }

              if (noSoln) {
                setSolnField(null);
              }
              else {
                const rightSquareMatrix = soln.slice(0, rrefMatSizeX).map((row: Array<any>) => row.slice(rrefMatSizeX, 2 * rrefMatSizeX));
                setSolnField(rightSquareMatrix);
              }
            }
            else { // non square => calculating RREF
              const soln = rref(matrixField, rrefMatSizeX, rrefMatSizeY);
              setSolnField(soln);              
            }
          }} /> : ""}
        </div>

        {/* Solution Matrix Field */}
        <div id="soln-1" className="matrix-values col-12 col-md-6">
          {solnField === undefined ? "" : (solnField === null) ? "Solution: \nThis matrix has no inverse." : "Solution:"}
          <table>
            <tbody>
              {solnField?.map((row, rowIndex) => (
                <tr key={`soln-row-${rowIndex}`}>
                  {row.map((item, colIndex) => (
                    <td key={`soln-${colIndex}`}>
                      {Number.isInteger(solnField[rowIndex][colIndex]) ? solnField[rowIndex][colIndex] : solnField[rowIndex][colIndex]?.toPrecision(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
      </div>
    </div>
  )
}

export default MatrixTable;