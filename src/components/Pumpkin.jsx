
import { useEffect } from 'react';
import { createPumpkin } from '../src-utils/createPumpkin';


export default function Pumpkin({ containerId = 'pumpkin-container', options = {} }) {
  useEffect(() => {
    createPumpkin(`#${containerId}`, options);
  }, [containerId, options]);

  return <div id={containerId} style={{ width: options.size || 220, margin: '0 auto' }}></div>;
}