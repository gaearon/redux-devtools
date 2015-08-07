import React from 'react';

const styles = {
  base: {
    display: 'inline-block',
    marginLeft: -15,
    'float': 'left',
    transition: '150ms',
    marginTop: 7,
    WebkitTransition: '150ms',
    MozTransition: '150ms',
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid #39ace6',
    WebkitTransform: 'rotateZ(-90deg)',
    MozTransform: 'rotateZ(-90deg)',
    transform: 'rotateZ(-90deg)'
  },
  open: {
    WebkitTransform: 'rotateZ(0deg)',
    MozTransform: 'rotateZ(0deg)',
    transform: 'rotateZ(0deg)'
  }
};

export default class JSONArrow extends React.Component {
  render() {
    let style = { ...styles.base };
    if (this.props.open) {
      style = {
        ...style,
        ...styles.open
      };
    }
    return <div style={style}/>;
  }
}