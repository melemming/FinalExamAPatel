function getAllCategories()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object

    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getAllCategories";
    //url += document.getElementById("custid").value;

    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
	if (objRequest.readyState == 4 && objRequest.status == 200)
	{
	    var output = JSON.parse(objRequest.responseText);
	    outputCategories(output);
	}
    }

    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
    
    return false;
}

function outputCategories(result)
{
    var count = 0;
    var displaytext = "";

    displaytext = "<table border='1'><tr><th>ID</th><th>Category Name</th><th>Description</th></tr>";
    
    //Loop to extract data from the response object
    for (count = 0; count < result.GetAllCategoriesResult.length; count++)
    {
	var CID = result.GetAllCategoriesResult[count].CID;
	
	if(!isNaN(CID))
	{
	    displaytext += "<tr><td>" + CID + "</td>" +
		"<td>" + result.GetAllCategoriesResult[count].CName + "</td>" +
		"<td>" + result.GetAllCategoriesResult[count].CDescription  + "</td>";			
	    displaytext = "<tr>" + displaytext + "</tr>";	    
	}
    }
    
    displaytext = displaytext +  "</table>";
    
    document.getElementById("sectionOne").innerHTML = displaytext;
}

function createCategory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var CName= document.getElementById("catName").value;    
    var CDescription = document.getElementById("catDescription").value;
    
    if(CName.length > 15 || CName.length < 1)
    {
	alert("Category Name must be 1-15 characters long.");
	return false;
    }

     var newCat = '{"CName":"' + CName.toUpperCase() + '","CDescription":"' + CDescription + '"}';
     
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/CreateCategory";    

    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
	if (objRequest.readyState == 4 && objRequest.status == 200)
	{
	    var output = JSON.parse(objRequest.responseText);
	    outputCreateCategories(output);
	}
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newCat);
    
    return false;
}

function outputCreateCategories(output)
{
    if (output.WasSuccessful == 1)
    {
	alert('The operation was successful!');        
    }
    else
    {	
        alert("The operation was not successful!" + "\r\n" + output.Exception);
    }
}

function updateCategory()
{
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var CID= document.getElementById("catID").value;
    var CDescription = document.getElementById("catDescriptionChange").value;
    
    var intCID = parseInt(CID);
    if(isNaN(intCID) || intCID != CID || CID < 0)    
    {
	alert("Category ID must be a positive numeric integer.");
	return false;
    }

     var newCat = '{"CID":"' + CID.toUpperCase() + '","CDescription":"' + CDescription + '"}';
     
    //Create URL and Query string
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/updateCatDescription";    

    //Checks that the object has returned data
    objRequest.onreadystatechange = function()
    {
	if (objRequest.readyState == 4 && objRequest.status == 200)
	{
	    var output = JSON.parse(objRequest.responseText);
	    outputUpdateCategories(output);
	}
    }

    //Start AJAX request
    objRequest.open("POST", url, true);
    objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    objRequest.send(newCat);
    
    return false;
}

function outputUpdateCategories(output)
{
    var msg = "";
    
    switch(output.WasSuccessful) {
    case 1:
        msg = 'Operation completed successfully.';
        break;
    case 0:
        msg = 'Operation failed with an unspecified error.';
        break;
    case -2:
        msg = 'Operation failed because the data string supplied could not be deserialized into the service object.';
        break;
    case -3:
        msg = 'Operation failed because a record with the supplied Order ID could not be found.';
        break;
    }
    
    alert(msg);	    
}

function deleteCategory()
{    
    var catIDtoDel = document.getElementById("catIDtoDel").value;
    
    var intcatIDtoDel = parseInt(catIDtoDel);
    if(isNaN(intcatIDtoDel) || intcatIDtoDel != catIDtoDel || catIDtoDel < 0)
    {
	alert("Category ID must be a positive numeric integer.");
	return false;
    }
    
    var resp = confirm("Are you sure you want to delete category: " + catIDtoDel.toUpperCase());
    if(resp==false)
    {
	return false;
    }
    var objRequest = new XMLHttpRequest(); //Create AJAX request object
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/deleteCategory/" + catIDtoDel;
    objRequest.onreadystatechange = function()
    {
        if (objRequest.readyState == 4 && objRequest.status == 200)
	{
	    var output = JSON.parse(objRequest.responseText);
	    outputDeleteCategory(output);	    
	}
    }
    
    //Initiate the server request
    objRequest.open("GET", url, true);
    objRequest.send();
    
    return false;
}

function outputDeleteCategory(output)
{
    if (output.DeleteCategoryResult.WasSuccessful == 1)
    {	
	alert('The operation was successful!');
    }
    else
    {	
        alert("The operation failed." + "\r\n" + output.DeleteCategoryResult.Exception);
    }
}

function showSection()
{
    var selection=document.getElementById('sectionMenu');
    var section1=document.getElementById('sectionOne');
    var section2=document.getElementById('sectionTwo');
    var section3=document.getElementById('sectionThree');
    var section4=document.getElementById('sectionFour');
    var section5=document.getElementById('sectionFive');
    
    if(selection.value == 'sectionOne')
    {
	section1.style.visibility='visible';	
	section2.style.visibility='hidden';
	section3.style.visibility='hidden';
	section4.style.visibility='hidden';
	section5.style.visibility='hidden';
	
	getAllCategories();
    }
    else if(selection.value == 'sectionTwo')
    {
	section1.style.visibility='hidden';
	section2.style.visibility='visible';        
	section3.style.visibility='hidden';
	section4.style.visibility='hidden';
	section5.style.visibility='hidden';    
    }
    else if(selection.value == 'sectionThree')
    {
        section1.style.visibility='hidden';
        section2.style.visibility='hidden';
	section3.style.visibility='visible';
	section4.style.visibility='hidden';
	section5.style.visibility='hidden';

    }
    else if(selection.value == 'sectionFour')
    {
        section1.style.visibility='hidden';
        section2.style.visibility='hidden';
	section3.style.visibility='hidden';
	section4.style.visibility='visible';
	section5.style.visibility='hidden';

    }
    else if(selection.value == 'sectionFive')
    {
        section1.style.visibility='hidden';
        section2.style.visibility='hidden';
	section3.style.visibility='hidden';
	section4.style.visibility='hidden';
	section5.style.visibility='visible';

    }
    else
    {
	section1.style.visibility='hidden';
        section2.style.visibility='hidden';
        section3.style.visibility='hidden';
	section4.style.visibility='hidden';
	section5.style.visibility='hidden';
    }
    
    return false;
}