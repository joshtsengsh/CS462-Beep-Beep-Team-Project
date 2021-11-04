  let portSelector;
  let connectButton;
  let baudRateSelector;
  let customBaudRateInput;
  let dataBitsSelector;
  let paritySelector;
  let stopBitsSelector;
  let flowControlCheckbox;
  let echoCheckbox;
  let flushOnEnterCheckbox;
  
  let portCounter = 1;
  let port;
  let reader;
  
  const urlParams = new URLSearchParams(window.location.search);
  const usePolyfill = urlParams.has('polyfill');
  
  // const term = new Terminal({
  //   scrollback: 10_000,
  // });
  // const fitAddon = new FitAddon();
  // term.loadAddon(fitAddon);
  const encoder = new TextEncoder();
  let toFlush = '';
  // term.onData((data) => {
  //   if (echoCheckbox.checked) {
  //     term.writeUtf8(encoder.encode(data));
  //   }
  
  //   if (port?.writable == null) {
  //     console.warn(`unable to find writable port`);
  //     return;
  //   }
  
  //   const writer = port.writable.getWriter();
  
  //   if (flushOnEnterCheckbox.checked) {
  //     toFlush += data;
  //     if (data === '\r') {
  //       writer.write(encoder.encode(toFlush));
  //       writer.releaseLock();
  //       toFlush = '';
  //     }
  //   } else {
  //     writer.write(encoder.encode(data));
  //   }
  
  //   writer.releaseLock();
  // });
  
  /**
   * Returns the option corresponding to the given SerialPort if one is present
   * in the selection dropdown.
   *
   * @param {SerialPort} port the port to find
   * @return {PortOption}
   */
  function findPortOption(port) {
    for (let i = 0; i < portSelector.options.length; ++i) {
      const option = portSelector.options[i];
      if (option.value === 'prompt') {
        continue;
      }
      const portOption = option;
      if (portOption.port === port) {
        return portOption;
      }
    }
  
    return null;
  }
  
  /**
   * Adds the given port to the selection dropdown.
   *
   * @param {SerialPort} port the port to add
   * @return {PortOption}
   */
  function addNewPort(port) {
    const portOption = document.createElement('option');
    portOption.textContent = `Port ${portCounter++}`;
    portOption.port = port;
    portSelector.appendChild(portOption);
    return portOption;
  }
  
  /**
   * Adds the given port to the selection dropdown, or returns the existing
   * option if one already exists.
   *
   * @param {SerialPort} port the port to add
   * @return {PortOption}
   */
  function maybeAddNewPort(port){
    const portOption = findPortOption(port);
    if (portOption) {
      return portOption;
    }
  
    return addNewPort(port);
  }
  
  /**
   * Sets |port| to the currently selected port. If none is selected then the
   * user is prompted for one.
   */
  async function getSelectedPort() {
    if (portSelector.value == 'prompt') {
      try {
        const serial = usePolyfill ? polyfill : navigator.serial;
        port = await serial.requestPort({});
      } catch (e) {
        return;
      }
      const portOption = maybeAddNewPort(port);
      portOption.selected = true;
    } else {
      const selectedOption = portSelector.selectedOptions[0];
      port = selectedOption.port;
    }
  }
  
  /**
   * @return {number} the currently selected baud rate
   */
  function getSelectedBaudRate() {
    if (baudRateSelector.value == 'custom') {
      return Number.parseInt(customBaudRateInput.value);
    }
    return Number.parseInt(baudRateSelector.value);
  }
  
  /**
   * Resets the UI back to the disconnected state.
   */
  function markDisconnected() {
    // term.writeln('<DISCONNECTED>');
    console.log("DISCONNECTED");
    portSelector.disabled = false;
    connectButton.textContent = 'Connect';
    baudRateSelector.disabled = false;
    customBaudRateInput.disabled = false;
    dataBitsSelector.disabled = false;
    paritySelector.disabled = false;
    stopBitsSelector.disabled = false;
    flowControlCheckbox.disabled = false;
    port = undefined;
  }
  
/**
 * 
 * @param {*} str -- str to be search 
 * @param {*} word --> word that you want to search (absolute)
 * @returns boolean 
 */
function containsWord(str, word) {
    return str.match(new RegExp("\\b" + word + "\\b")) != null;
}

  /**
   * Initiates a connection to the selected port.
   */
  async function connectToPort() {
    await getSelectedPort();
    if (!port) {
      return;
    }
  
    const options = {
      baudRate: getSelectedBaudRate(),
      dataBits: Number.parseInt(dataBitsSelector.value),
      parity: paritySelector.value,
      stopBits: Number.parseInt(stopBitsSelector.value),
      flowControl:
          flowControlCheckbox.checked ? 'hardware' : 'none',
  
      // Prior to Chrome 86 these names were used.
      baudrate: getSelectedBaudRate(),
      databits: Number.parseInt(dataBitsSelector.value),
      stopbits: Number.parseInt(stopBitsSelector.value),
      rtscts: flowControlCheckbox.checked,
    };
    console.log(options);
    await port.open(options);
  
    portSelector.disabled = true;
    connectButton.textContent = 'Disconnect';
    baudRateSelector.disabled = true;
    customBaudRateInput.disabled = true;
    dataBitsSelector.disabled = true;
    paritySelector.disabled = true;
    stopBitsSelector.disabled = true;
    flowControlCheckbox.disabled = true;
    // term.writeln('<CONNECTED>');
    console.log('<CONNECTED>');
    renderRecordingModalForm();
  
    // for id verification
 
    let eventDataLookup =JSON.parse(localStorage.getItem('eventData'));

    let getAllKeys = Object.keys(eventDataLookup); 

    // console.log(eventDataLookup);

    // console.log(getAllKeys);

    function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
    }

    while (port && port.readable) {
      let tracker  = false; 
      try {
        reader = port.readable.getReader();
        for (;;) {
          const {value, done} = await reader.read();
          if (value) {
            tracker = true 
            if (tracker) {
              sleep(1500); 
            }
            const testing = new TextDecoder().decode(value);
            let stringOutput = ""; 
            // alphas = alphas.concat(testing.toString())
            stringOutput += testing; 
            // console.log(value);
            // term.writeUtf8(value);

            if (containsWord(stringOutput, "done")) {

              // console.log(stringOutput);
              // extract out temp and attendance w

              let lines = stringOutput.split('\n');

              // console.log(lines);

              // let nameID = lines[0];
              let nameID = lines[0].trim(); 

              // let temp = lines[4].split('=')[1]

              let o = lines.filter((m) => containsWord(m, "Object") ? m : "")

              let temp = o[0].split("=")[1].trim()

              // check if nameID inside, if inside --> then can send 
              var resultObj = {};

              getAllKeys.forEach(function(keyName) {
                // using index of to check if the object key name have a matched string
                if (keyName.indexOf(nameID) !== -1) {
                  resultObj[keyName] = eventDataLookup[keyName];
                }
              })

              let len = Object.keys(resultObj).length;

              if (len >= 1) {

                let actualKey = Object.keys(resultObj)[0]; // get the actual key name to be inserted to db 

                console.log(actualKey);
                console.log(temp)

              } else {
                console.log("participant not found");
              }
            
              // if not inside --> participant not found ! 

            }
            // if see done, send 
          }
          // console.log(done);
          if (done) {
            console.log(stringOutput);
            break;
          }
        }
        reader.releaseLock();
        reader = undefined;
      } catch (e) {
        console.error(e);
        console.log(`<ERROR: ${e.message}>`);
        break;
        // term.writeln(`<ERROR: ${e.message}>`);
      }
    }
  
    if (port) {
      try {
        await port.close();
      } catch (e) {
        console.error(e);
        // term.writeln(`<ERROR: ${e.message}>`);
      }
  
      markDisconnected();
    }
  }
  
  /**
   * Closes the currently active connection.
   */
  async function disconnectFromPort() {
    // Move |port| into a local variable so that connectToPort() doesn't try to
    // close it on exit.
    const localPort = port;
    port = undefined;
  
    if (reader) {
      await reader.cancel();
    }
  
    if (localPort) {
      try {
        await localPort.close();
      } catch (e) {
        console.error(e);
        // term.writeln(`<ERROR: ${e.message}>`);
      }
    }
  
    markDisconnected();
  }
  
// document.addEventListener('DOMContentLoaded', async () => {
  const bluetoothLogic = async () => {
    // const terminalElement = document.getElementById('terminal');
    // if (terminalElement) {
      // term.open(terminalElement);
      // fitAddon.fit();
    // }
  
    // const download = document.getElementById('download') ;
    // download.addEventListener('click', downloadTerminalContents);
    portSelector = document.getElementById('ports') ;
  
    connectButton = document.getElementById('connect');
    console.log(connectButton);
    
    connectButton.addEventListener('click', () => {
      // console.log(port);
      if (port) {
        disconnectFromPort();
        // don show form modal 

      } else {

        // show form modal 
        connectToPort();
      }
    });
  
    baudRateSelector = document.getElementById('baudrate') ;
    baudRateSelector.addEventListener('input', () => {
      if (baudRateSelector.value == 'custom') {
        customBaudRateInput.hidden = false;
      } else {
        customBaudRateInput.hidden = true;
      }
    });
  
    customBaudRateInput =
        document.getElementById('custom_baudrate');
    dataBitsSelector = document.getElementById('databits') ;
    paritySelector = document.getElementById('parity') ;
    stopBitsSelector = document.getElementById('stopbits') ;
    flowControlCheckbox = document.getElementById('rtscts');
    echoCheckbox = document.getElementById('echo');
    flushOnEnterCheckbox =
        document.getElementById('enter_flush');
  
    const convertEolCheckbox =
        document.getElementById('convert_eol');
    const convertEolCheckboxHandler = () => {
      // term.setOption('convertEol', convertEolCheckbox.checked);
    };
    convertEolCheckbox.addEventListener('change', convertEolCheckboxHandler);
    convertEolCheckboxHandler();
  
    const serial = usePolyfill ? polyfill : navigator.serial;
    const ports = await serial.getPorts();
    ports.forEach((port) => addNewPort(port));
  
    // These events are not supported by the polyfill.
    // https://github.com/google/web-serial-polyfill/issues/20
    if (!usePolyfill) {
      navigator.serial.addEventListener('connect', (event) => {
        addNewPort((event).port || event.target);
      });
      navigator.serial.addEventListener('disconnect', (event) => {
        const portOption = findPortOption(
            (event).port || event.target);
        if (portOption) {
          portOption.remove();
        }
      });
    }
  };
