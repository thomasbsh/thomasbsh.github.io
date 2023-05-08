export function loadXMLDoc(filename) {
    if (window.ActiveXObject) {
      xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
      xhttp = new XMLHttpRequest();
    }
  
    xhttp.open("GET", filename, false);
    xhttp.send("");
    return xhttp.responseXML;
  }