  /**
   * input: string of names with '\r' break
   * output: array of json {'name': person name}
   */
   csvToArray = (str, delimiter = "\r") => {
    // slice from start of text to the first \n index
    // use split to create an array from string by delimiter
    //if got header 
    // const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const headers = ['name'];

    // slice from \n index + 1 to the end of the text
    // use split to create an array of each csv value row
    // str.indexOf("\n") + 1 --> if got header 
    const rows = str.slice(0).split("\n");
    
    // Map the rows
    // split values from each row into an array
    // use headers.reduce to create an object
    // object properties derived from headers:values
    // the object passed as an element of the array
    const arr = rows.map((row) => {
      const values = row.split(delimiter); 
      const el = headers.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return el;
    });

    // return the array
    return arr;
  }

  /**
   * input: xlsx workbook 
   * output: array of json {'name': person name}
   */
     xlsxToArray = (workbook) => {
      let result = [];
  
      // console.log(workbook.SheetNames[0]);
      let firstSheetName = workbook.SheetNames[0]; 
      let array = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {header: 1});
  
      array.forEach(element => {
        result.push({'name': element[0]})
      });
      return result; 
    }