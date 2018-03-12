import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { compose } from 'recompose';

import { Box, Button, Keyboard } from 'grommet';
import { withTheme } from 'grommet/components/hocs';
import { colorIsDark } from 'grommet/utils/colors';
import { parseMetricToNum } from 'grommet/utils';
import StyledColors, { StyledColor, StyledColorContainer, StyledRow, StyledRows } from './StyledColors';
import doc from './doc';


const buildState = (props) => {
  const {
    colors, color, columns, wrap,
  } = props;
  let activeRow = 0;
  let activeColor = 0;
  const colorRows = [];
  let lastRow = null;
  if (colors) {
    Object.keys(colors).forEach((item, rowIndex) => {
      if (typeof colors[item] === 'object') {
        const row = { name: item, colors: [] };
        Object.keys(colors[item]).forEach((colorName, colorIndex) => {
          const colorsColor = colors[item][colorName];
          if (colorsColor === color) {
            activeRow = rowIndex;
            activeColor = colorIndex;
          }
          row.colors.push({ name: colorName, color: colorsColor });
        });
        colorRows.push(row);
      } else {
        if (!lastRow) {
          lastRow = { name: undefined, colors: [] };
          colorRows.push(lastRow);
        }
        lastRow.colors.push({ name: item, color: colors[item] });
      }
    });
  }
  const colorsPerRow = columns ||
    (colorRows.length === 1 ? Math.sqrt(colorRows[0].colors.length) :
      colorRows.reduce((res, row) => (Math.min(res, row.colors.length)), Number.MAX_SAFE_INTEGER));
  let wrapColors = wrap;
  if (wrapColors === undefined) {
    wrapColors = columns === undefined && colorRows.length === 1;
  }
  if (wrapColors) {
    const finalRows = [];
    colorRows.forEach((row) => {
      while (row.colors.length > 0) {
        finalRows.push({ name: row.name, colors: row.colors.splice(0, colorsPerRow) });
      }
    });
    return { colorRows: finalRows, activeRow, activeColor };
  }
  return {
    colorRows: colorRows.map(row => (
      { ...row, colors: row.colors.filter((_, index) => (index < colorsPerRow)) }
    )),
    activeRow,
    activeColor,
  };
};

class Colors extends Component {
  static defaultProps = {
    size: 'medium',
  };

  constructor(props) {
    super(props);
    this.state = buildState(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(buildState(nextProps));
  }

  componentDidUpdate() {
    if (this.setFocus) {
      this.setFocus = false;
      if (this.activeRef) {
        findDOMNode(this.activeRef).focus();
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  setActive = ({ rowIndex, colorIndex }) => {
    const { colorRows } = this.state;
    this.setFocus = true;
    const activeRow = Math.min(Math.max(0, rowIndex), colorRows.length - 1);
    const color = Math.max(0, colorIndex);
    this.setState({
      activeRow,
      activeColor: Math.min(color, colorRows[activeRow].colors[color].length - 1),
    });
  }

  onClickColor = ({
    color, rowIndex, colorIndex, rowName, colorName,
  }) => () => {
    const { onSelect } = this.props;
    this.setActive({ rowIndex, colorIndex });
    if (onSelect) {
      onSelect({ color, rowName, colorName });
    }
  };

  render() {
    const {
      wrap, column, disabled, onSelect, columns, size, theme, ...rest
    } = this.props;
    const { colorRows, activeRow, activeColor } = this.state;
    const cellSize = parseMetricToNum(theme.calendar[size].daySize);
    const colors = colorRows.map((row, rowIndex) => (
      <StyledRow key={`row_${rowIndex}`} theme={theme} style={{ width: `${cellSize * row.colors.length}px`, height: `${cellSize}px` }}>{
        row.colors.map((color, colorIndex) => {
          const isActive = activeRow === rowIndex && activeColor === colorIndex;
          const colorStyle = {
            backgroundColor: color.color,
            color: colorIsDark(color.color) ?
              theme.global.colors.darkBackground.text : theme.global.colors.text,
            left: `${cellSize * colorIndex}px`,
          };
          return (
            <StyledColorContainer key={`color_${colorIndex}`} size={size} theme={theme}>
              <Button
                ref={(ref) => {
                  if (isActive) this.activeRef = ref;
                }}
                a11yTitle={`${row.name} ${color.name}`}
                plain={true}
                active={isActive}
                hoverIndicator={true}
                onClick={this.onClickColor({
                  color: color.color,
                  rowIndex,
                  colorIndex,
                  colorName: color.name,
                  rowName: row.name,
                })}
              >
                <StyledColor
                  style={colorStyle}
                  size={size}
                  theme={theme}
                >
                  <span>{color.color}</span>
                </StyledColor>
              </Button>
            </StyledColorContainer>
          );
        })
      }
      </StyledRow>
    ));
    return (
      <StyledColors size={size} theme={theme} {...rest}>
        <Keyboard
          onUp={(event) => {
            event.preventDefault();
            this.setActive({ rowIndex: activeRow - 1, colorIndex: activeColor });
          }}
          onDown={(event) => {
            event.preventDefault();
            this.setActive({ rowIndex: activeRow + 1, colorIndex: activeColor });
          }}
          onLeft={() => this.setActive({ rowIndex: activeRow, colorIndex: activeColor - 1 })}
          onRight={() => this.setActive({ rowIndex: activeRow, colorIndex: activeColor - 1 })}
        >
          <Box>
            <StyledRows style={{ height: `${cellSize * colorRows.length}px` }}>
              {colors}
            </StyledRows>
          </Box>
        </Keyboard>
      </StyledColors>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(Colors);
}

export default compose(
  withTheme,
)(Colors);