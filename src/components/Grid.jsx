import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GridCell from './GridCell';

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(${props => props.columns}, auto);
    grid-gap: 1px;
    margin: 0 auto;
    width: 80vw;
    max-width: 60vh;
    height: 80vw;
    max-height: 60vh;
`;

export default function Grid(props) {
    GridContainer.defaultProps = {
        columns: props.cells[0].length
    }
    return (
        <GridContainer>
            {
                props.cells.map(row =>
                    row.map(cellData =>
                        <GridCell key={cellData.id} data={cellData} onCellClick={props.onCellClick} />
                    )
                )
            }
        </GridContainer>
    );
}

Grid.propTypes = {
    cells: PropTypes.array,
    onCellClick: PropTypes.func
}

Grid.defaultProps = {
    cells: [],
    onCellClick: (() => void 0)
}