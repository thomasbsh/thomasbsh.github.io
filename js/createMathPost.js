//import { loadXMLDoc } from "./utils/loadXMLDoc.js";

function loadJSONFile(filename) {
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } else {
        xhttp = new XMLHttpRequest();
      }

    xhttp.open("GET", filename, false);
    xhttp.send();
    return xhttp.responseText;
}

const jsonFile = loadJSONFile("./json/profiles.json")
const jsonObj = JSON.parse(jsonFile);

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

// https://stackoverflow.com/questions/8511104/inserting-an-xml-node-using-javascript
// https://www.w3schools.com/XML/met_element_appendchild.asp
function addMathPost() {
  var xmlDoc = loadXMLDoc("./xml/math_posts.xml");

  var post = xmlDoc.createElement("post");

  var title = xmlDoc.createElement("title");
  title.appendChild(xmlDoc.createTextNode("Ma publication"));

  var author = xmlDoc.createElement("author");
  author.appendChild(xmlDoc.createTextNode(jsonObj.profiles[0].username));

  var field = xmlDoc.createElement("field");
  field.appendChild(xmlDoc.createTextNode(jsonObj.profiles[0].field));

  var timestamp = xmlDoc.createElement("timestamp");
  //timestamp.appendChild(xmlDoc.createTextNode(Math.floor(Date.now() / 1000)));

  // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var dd = String(today.getDate()).padStart(2, "0");
  var hours = today.getHours();
  var minutes = today.getMinutes();
  today = `${yyyy}/${mm}/${dd} ${hours}:${minutes}`;

  timestamp.appendChild(xmlDoc.createTextNode(today));

  var content = xmlDoc.createElement("content");
  content.appendChild(xmlDoc.createTextNode("Bonjour le monde!"));

  post.appendChild(title);
  post.appendChild(author);
  post.appendChild(field);
  post.appendChild(timestamp);
  post.appendChild(content);

  xmlDoc.getElementsByTagName("math")[0].appendChild(post);

  displayNewResult(xmlDoc);
}

function displayNewResult(xmlDoc) {
  xsl = loadXMLDoc("./xml/math_posts.xsl");
  // code for IE
  if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
    ex = xmlDoc.transformNode(xsl);
    document.getElementById("mathPostsDiv").innerHTML = ex;
  }
  // code for Chrome, Firefox, Opera, etc.
  else if (document.implementation && document.implementation.createDocument) {
    xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
    document.getElementById("mathPostsDiv").replaceWith(resultDocument);
  }
}
