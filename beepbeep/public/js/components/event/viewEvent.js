//code for viewing of individual event 

// render the view here 
let table = `
<div id="single-event-component">
  <button type="button" class="btn btn-primary" id="back-to-events">Back</button>

  <table id="table"
  data-search="true"
  data-buttons="customButtons"
  data-pagination="true"
  data-page-size="10"
  data-page-list="[10, 25, 50, 100]"
  >
    <thead>
      <tr>
        <th data-field="editButton" rowspan="2" class="editButtons">Edit</th>
        <th data-field="attendeeName" data-sortable="true" rowspan="2">Namelist</th>
        <th colspan="2">Attendance One</th>
        <th colspan="2">Attendance Two</th>
      </tr>
      
      <tr>
        <th data-field="round1Attendance" data-sortable="true">Arrived ?</th>
        <th data-field="round1Temperature" data-sortable="true">Temp</th>
        <th data-field="round2Attendance" data-sortable="true">Arrived ?</th>
        <th data-field="round2Temperature" data-sortable="true">Temp</th>
      </tr>

    </thead>
  </table>
</div>
`

/**
 * Render table according to json from DB
 * Input to table shld be in array of json 
 */
renderTable =(eventNo) => {
    //render table according to data 
    var $table = $('#table');
    $(function() {
  
      //mock json as of now 

      document.title = events[eventNo].eventName;
      
      let data = events[eventNo].attendees; 

      //for visuals only 
      $table.bootstrapTable({data: transFormToTableVisual(data)})
    })
}

/**
 * Listen editButton class
 */


editFormPopup = (id) => {
  console.log(id);
  //render editFormPopup
}



/**
 * 
 * Transform attendees data from DB to a format where bootstrap table aprove --> reason: cannot loop in the table
 * add editButton 
 * @param {*} data 
 * @returns dataArray 
 */
transFormToTableVisual = (data) => {

    // document.title = eventName;

  let dataIdArray = Object.keys(data);
  
  let dataArray = Object.values(data);

  //add id in 
  dataArray.map((m, i) => m['id'] = dataIdArray[i]); 

  //add edit button in with participant id as id 
  dataArray.map((m) => m['editButton'] = `
      <button type="button" class="btn btn-success" id="${m.id}" onclick="editFormPopup(${JSON.stringify(m)})"><i class="fas fa-edit"></i></button>
    `)

  console.log(dataArray);

    return dataArray; 
}


/**
 * Render buttons for : 
 * Download CSV 
 * Print Barcode
 * Start attendance taking 
 */
customButtons = () => {
  return {
    downloadSheet: {
      text: 'Download Sheet',
      icon: 'fas fa-download',
      event: function () {
        console.log('downloadSheet');
        //inject services function here from eventServices
      },
      attributes: {
        title: 'Download data as xlsx / csv'
      }
    },
    printBarcode : {
      text: 'Print Barcode',
      icon: 'fas fa-barcode',
      event: function () {
        console.log('Print barcode of participants');
        //inject services function here from eventServices
      },
      attributes: {
        title: 'Print barcodes'
      }
    },
    startRecording : {
      text: 'Start',
      icon: 'fas fa-play',
      event: function () {
        console.log('start recording');
        //inject services function here from eventServices
      },
      attributes: {
        title: 'Start recording attendance and temperature'
      }
    },
  }
}

