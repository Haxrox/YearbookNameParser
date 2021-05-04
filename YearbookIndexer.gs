/* YearbookIndexer
Google Sheet script used to index a list of students on a specific page
*/
var SHEET_ID = "" // ID of the Google Sheet
var SHEET_NAME = "" // Sheet name with the data
var STRING = "" // Names of the students to index
var FoundNames = []
var page = 1 // Page number the students are on 

function myFunction() {
  var spreadSheet = SpreadsheetApp.openById(SHEET_ID)
  var sheet = spreadSheet.getSheetByName(SHEET_NAME)
  var range = sheet.getDataRange()
  var values = range.getDisplayValues()
  var Names = STRING.split(",")
  for (var index = 0; index < Names.length; index ++) {
    Names[index] = Names[index].trim()
    for (var rowIndex = 1; rowIndex < values.length; rowIndex ++) {
      Names[index] = Names[index].trim()
      if (Names[index] == values[rowIndex][1] + " " + values[rowIndex][0] || Names[index] == values[rowIndex][3] + " " + values[rowIndex][2]) {
        FoundNames.push(rowIndex + 1)
      }
    }
    if (FoundNames.length == 1) {
      var pages = values[FoundNames[0] - 1][6].split(",")
      for (var pageIndex = 0; pageIndex < pages.length; pageIndex ++) {
       pages[pageIndex] = pages[pageIndex].trim() 
      }
      console.log("[Index] Name - " + Names[index] + " | Row - " + FoundNames + " | Pages " + pages)
      console.log("Pages.Length | " + pages.length + " | Pages[0] " + pages[0] + " |")
      if (pages[0] == "") {
        pages.shift()
      }
      // Sort in page #
      if (pages.indexOf(page.toString()) < 0) {
        pages.push(page)
        pages.sort(function(a, b) {
          return a - b;
        })
        var cell = sheet.getRange(FoundNames[0], 7)
        cell.setValue(pages.join(", "))
        console.log("[Success] Person Indexed - " + Names[index] + " | Row - " + FoundNames + " | Pages - " + cell.getValue())
      } else {
        console.warn("[Warn] Failed to Index. Person already Indexed | Name - " + Names[index])
      }
    } else if (FoundNames.length > 1) {
      console.warn("[Warn] Multiple Names Found | Name - " + Names[index] + " | Rows - " + FoundNames)
    } else {
      // No names found
      console.error("[Error] Name not found | Name - " + Names[index])
    }
    FoundNames = []
  }
}
