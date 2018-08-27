import inspector from './inspector';
import './content.scss';

chrome.runtime.onMessage.addListener(msg => {
  console.log('content message: ');
  console.dir(msg);

  if (msg.type === 'startScanning') {
    inspector.start();
  }

  if (msg.type === 'stopScanning') {
    inspector.stop();
  }
});
