import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-q"
    changePositionKey="ctrl-m"
    defaultIsVisible={false}
  >
    <LogMonitor
      expandActionRoot={false}
      expandStateRoot={false}
      markStateDiff={true}
      hideMainButtons={true}
    />
  </DockMonitor>
);

export default DevTools;
