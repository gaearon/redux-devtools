import React, { PureComponent, Component, ReactElement } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, {
  NamedProps as ReactSelectProps,
  OptionTypeBase,
} from 'react-select';
import createThemedComponent from '../utils/createThemedComponent';
import { Theme } from '../themes/default';

export interface SelectProps<
  Option extends OptionTypeBase = OptionTypeBase,
  IsMulti extends boolean = false
> extends Omit<ReactSelectProps<Option, IsMulti>, 'theme'> {
  theme: Theme;
}

/**
 * Wrapper around [React Select](https://github.com/JedWatson/react-select).
 */
export class Select<
  Option extends OptionTypeBase = OptionTypeBase,
  IsMulti extends boolean = false
> extends (PureComponent || Component)<SelectProps<Option, IsMulti>> {
  render() {
    return (
      <ReactSelect
        {...this.props}
        theme={(theme) => ({
          ...theme,
          borderRadius: this.props.theme.inputBorderRadius,
          colors: {
            ...theme.colors,

            primary: this.props.theme.base05,
            primary50: this.props.theme.base03,
            primary25: this.props.theme.base01,

            dangerLight: this.props.theme.base03,
            danger: this.props.theme.base07,

            neutral0: this.props.theme.base00,
            neutral5: this.props.theme.base01,
            neutral10: this.props.theme.base02,
            neutral20: this.props.theme.base03,
            neutral30: this.props.theme.base04,
            neutral40: this.props.theme.base05,
            neutral60: this.props.theme.base06,
            neutral80: this.props.theme.base07,
          },
          spacing: {
            ...theme.spacing,
            baseUnit: 2,
            controlHeight: this.props.theme.inputHeight,
          },
        })}
        styles={{
          container: (base) => ({
            ...base,
            flexGrow: 1,
          }),
          control: (base, props) => ({
            ...base,
            backgroundColor: props.isDisabled
              ? props.theme.colors.neutral10
              : props.theme.colors.neutral5,
          }),
        }}
      />
    );
  }

  static propTypes = {
    isClearable: PropTypes.bool, // should it be possible to reset value
    isDisabled: PropTypes.bool, // whether the Select is disabled or not
    isLoading: PropTypes.bool, // whether the Select is loading externally or not
    maxMenuHeight: PropTypes.number, // maximum css height for the opened menu of options
    isMulti: PropTypes.bool, // multi-value input
    isSearchable: PropTypes.bool, // whether to enable searching feature or not
    value: PropTypes.any, // initial field value
    menuPlacement: PropTypes.oneOf(['auto', 'bottom', 'top']), // value to control the opening direction
  };
}

interface ExternalSelectProps<
  Option extends OptionTypeBase = OptionTypeBase,
  IsMulti extends boolean = false
> extends Omit<ReactSelectProps<Option, IsMulti>, 'theme'> {
  theme?: Theme;
}

type SelectComponent = <
  Option extends OptionTypeBase = OptionTypeBase,
  IsMulti extends boolean = false
>(
  props: ExternalSelectProps<Option, IsMulti>
) => ReactElement;

export default createThemedComponent(Select) as SelectComponent & {
  theme?: Theme;
};
