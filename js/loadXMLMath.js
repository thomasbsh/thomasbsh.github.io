//import { loadXMLDoc } from "./utils/loadXMLDoc.js";

function loadXMLDoc(filename) {
  if (window.ActiveXObject) {
    xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } else {
    xhttp = new XMLHttpRequest();
  }

  xhttp.open("GET", filename, false);
  xhttp.send("");
  return xhttp.responseXML;
}

function displayResult() {
  xml = loadXMLDoc("./xml/math_posts.xml");
  xsl = loadXMLDoc("./xml/math_posts.xsl");
  // code for IE
  if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
    ex = xml.transformNode(xsl);
    document.getElementById("mathPostsDiv").innerHTML = ex;
  }
  // code for Chrome, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xml, document);
    document.getElementById("mathPostsDiv").appendChild(resultDocument);
  }
}

// https://www.w3schools.com/XML/prop_nodelist_length.asp
function displayNbComments(xml) {
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("comment");
  document.getElementById("nbComments").innerHTML = x.length;
}
