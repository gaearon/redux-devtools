/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* @flow */

import Anser from 'anser';
import { nicinabox as theme } from 'redux-devtools-themes';
import { AllHtmlEntities as Entities } from 'html-entities';

var entities = new Entities();

var anserMap = {
  'ansi-bright-black': theme.base03,
  'ansi-bright-yellow': theme.base0A,
  'ansi-yellow': theme.base0B,
  'ansi-bright-green': theme.base0B,
  'ansi-green': theme.base0F,
  'ansi-bright-cyan': theme.base0D,
  'ansi-cyan': theme.base0C,
  'ansi-bright-red': theme.base09,
  'ansi-red': theme.base0E,
  'ansi-bright-magenta': theme.base0F,
  'ansi-magenta': theme.base0E,
  'ansi-white': theme.base00,
};

function generateAnsiHTML(txt: string): string {
  var arr = new Anser().ansiToJson(entities.encode(txt), {
    use_classes: true,
  });

  var result = '';
  var open = false;
  for (var index = 0; index < arr.length; ++index) {
    var c = arr[index];
    var content = c.content,
      fg = c.fg;

    var contentParts = content.split('\n');
    for (var _index = 0; _index < contentParts.length; ++_index) {
      if (!open) {
        result += '<span data-ansi-line="true">';
        open = true;
      }
      var part = contentParts[_index].replace('\r', '');
      var color = anserMap[fg];
      if (color != null) {
        result += '<span style="color: ' + color + ';">' + part + '</span>';
      } else {
        if (fg != null) {
          console.log('Missing color mapping:', fg); // eslint-disable-line no-console
        }
        result += '<span>' + part + '</span>';
      }
      if (_index < contentParts.length - 1) {
        result += '</span>';
        open = false;
        result += '<br/>';
      }
    }
  }
  if (open) {
    result += '</span>';
    open = false;
  }
  return result;
}

export default generateAnsiHTML;
