import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GridCell from './GridCell';

const GridContainer = styled.div`
    margin: 100px 0 0;
`;
// const GridContainer = styled.div`
//     display: grid;
//     grid-template-columns: repeat(${props => props.columns}, auto);
//     grid-gap: 1px;
//     margin: 0 auto;
//     width: 80vw;
//     max-width: 60vh;
//     height: 80vw;
//     max-height: 60vh;
// `;

export default function Grid(props) {
    GridContainer.defaultProps = {
        columns: props.cells[0].length
    }
    return (
        <GridContainer>
            {
                props.cells.map((rowArr, rowIndex) =>
                    <div key={rowIndex}>
                        {rowArr.map((cellData, colIndex) =>
                            <GridCell key={`(${rowIndex}, ${colIndex})`} data={cellData} row={rowIndex} col={colIndex} onMouseDown={props.onMouseDown(rowIndex, colIndex)} onMouseEnter={props.onMouseEnter(rowIndex, colIndex)} onMouseUp={props.onMouseUp} />
                        )}
                    </div>
                )
            }
        </GridContainer>
    );
}

Grid.propTypes = {
    cells: PropTypes.array,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseUp: PropTypes.func
}

Grid.defaultProps = {
    cells: [],
    onMouseDown: (() => void 0),
    onMouseEnter: (() => void 0),
    onMouseUp: (() => void 0)
}
