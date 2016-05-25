	map=null;
	places=new Array();
	marker=[]
	var name='';
	var poiCount=0;
	var nanobar;
	$(document).ready(function(){
		 $('#btnLogout').hide();
		 $('#profilePic').hide();
		 //$('#gmap').hide();
		
		 hideDivDirections();
		 $('[data-toggle="tooltip"]').tooltip(); 
		 $('#res1Close').hide();
		 
		 $('[data-toggle="popover"]').popover({
			    title:"Post To Facebook ",
			    html: true, 
				content: function() {
			          return $('#popover-content').html();
			        }
			});
		 
		 
		 var options = {
				    classname: 'nanobarClass',
				  id: 'nanoBarid',
				    target: document.getElementById('nanobardiv')
				};

			nanobar	 = new Nanobar( options );
			openNav();

	});
	
	
	/*var progress = setInterval(function () {
	    var $bar = $('.bar');

	    if ($bar.width() >= 2000) {
	     $bar.width(0);
	      
	    } else {
	        $bar.width($bar.width() + 200);
	    }
	    
	},400);
	*/
	
	
	//**************left
	var toggle=true;
	function openCloseBar(){
		if(toggle){
			openNav();
			
		}else{
			closeNav();
		}
		toggle=!toggle;
	}
	function openNav() {
		$('#sNBackForward').removeClass("glyphicon-forward");
		$('#sNBackForward').addClass("glyphicon-backward");
	    document.getElementById("menu").style.width = "320px";
	    document.getElementById("sideNavOpen").style.left = "320px";
	}

	/* Set the width of the side navigation to 0 */
	function closeNav() {
		$('#sNBackForward').removeClass("glyphicon-backward");
		$('#sNBackForward').addClass("glyphicon-forward");
		
	    document.getElementById("menu").style.width = "0";
	    document.getElementById("sideNavOpen").style.left = "00px";
	}
	
	
	//***************right
	var toggleR=true;
	function openCloseBarRight(){
		if(toggleR){
			openNavR();
			
		}else{
			closeNavR();
		}
		toggleR=!toggleR;
	}
	function openNavR() {
		$('#RsNBackForward').removeClass("glyphicon-backward");
		$('#RsNBackForward').addClass("glyphicon-forward");
	    document.getElementById("menuR").style.width = "320px";
	    document.getElementById("rightsideNavOpen").style.right = "320px";
	}

	/* Set the width of the side navigation to 0 */
	function closeNavR() {
		$('#RsNBackForward').removeClass("glyphicon-forward");
		$('#RsNBackForward').addClass("glyphicon-backward");
		
	    document.getElementById("menuR").style.width = "0";
	    document.getElementById("rightsideNavOpen").style.right = "00px";
	}
	
	
	//****************  main app
var rev_geo_flag=false;
var wm=map;
	window.onload = function() {
		  
		  var map_div = document.getElementById('map-container');
	      var center = new mireo.wgs.point(18.51, 73.93);
	    //  console.log(center);
	      map = new mireo.map(map_div, {center: center, zoom: 9});
	      map.on("multitap", function(e) {
		     // var icon = mireo.stock_pins.narrow_pin_baloon_black();/*This object means for obtaining icons from MapmyIndia server. All stock icons have size 36px by 36px.*/
		     // var title = "Text marker sample!";
		     // marker.push(addMarker(e.wgs, icon, title));
		   });
		   map.on("long_press_begin", function(e) {
		      // $('#search').val(e.wgs.lat+","+e.wgs.lng);
		       
		       get_rev_geocode_result(e.wgs.lat,e.wgs.lng);
		      
		     });
			// $('#myModal').modal('show');
		   $('#myModal').modal({backdrop: 'static', keyboard: false})  
wm=map;
	};
	
  // This is called with the results from from FB.getLoginStatus().
  
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      $('#myModal').modal('hide');
       //  window.location.reload();
      var date="2016-12-31";
	 // $('#statusMsg'). html('Connected');

     // document.getElementById('status').innerHTML = ' Connected';
      FB.api('/me', 'GET', {"fields":"picture{url},name,location"},
    	function(response) {
    	  name=response.name;
    	  $('#profilePic').show();
    	  $('#profilePic').attr("src", response.picture.data.url);
    	  $('#welcome'). html('Welcome '+response.name);
    	  $('#btnLogin').hide();
    	  $('#btnLogout').show();
    	  //alert((response.location.name).split(",")[0]);
    	  $('#search').val((response.location.name).split(",")[0]);
    	  $('#range').val(20000);
    	  
        });
       testAPI(date);
       
      
       
       
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      	//appId      : '1705376976394746',

    	appId      : '115705751855005',
      //appId      : '1029647623794142',
      xfbml      : true,
      version    : 'v2.6'
    });

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
      //console.log(response);
    });
};

	  (function(d, s, id){
	     var js, fjs = d.getElementsByTagName(s)[0];
	     if (d.getElementById(id)) {return;}
	     js = d.createElement(s); js.id = id;
	     js.src = "//connect.facebook.net/en_US/sdk.js";
	     fjs.parentNode.insertBefore(js, fjs);
	   }(document, 'script', 'facebook-jssdk'));
 
	  
	  
//*************************reverse geocoding**********************
	  function get_rev_geocode_result(search_lat,search_lng)
	  {
	  lat12=search_lat;lng12=search_lng;
	  nanobar.go(30);
	 // document.getElementById('result').innerHTML='Loading...';
	  /**put your REST api lisense key here***/
	  var rev_geocode_api_url="https://api.mapmyindia.com/v3?fun=rev_geocode&lic_key=ygctu1hkmy6ug5x6o43j36mkg8d8id8g&lng="+search_lng+"&lat="+search_lat+"&callback=rev_geocode_result";
	  var scriptTag = document.createElement('SCRIPT');scriptTag.src = rev_geocode_api_url;document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
	  nanobar.go(60);
	  }
	  
	  var rev_marker=[];
	  var rev_geocode_result_data='';
	  function rev_geocode_result(data)
	  {rev_geo_flag=true;
		  rev_geocode_result_data=data;
		  var icon = mireo.stock_pins.narrow_pin_baloon_green();/*This object means for obtaining icons from MapmyIndia server. All stock icons have size 36px by 36px.*/
	       var title = "This Positions is added as Starting Point";
	      
		  var con="<div style=\"padding:10px;font-size:13px;width:200px\"><p style='color:red;'>This Positions is added as Starting Point</p><br/><strong>City:</strong>"+data[0].city+" <br/><strong>Address:</strong> "+data[0].formatted_address+"<div>";
	     markerr=addMarker(new mireo.wgs.point(lat12,lng12), icon, data[0].city,con,'','',true);
	     markerr.on('changed',function(){        	 
       	  var point = markerr.position();
       	  get_rev_geocode_result(point.lat,point.lng)

	 });
	     nanobar.go(80);
	     for(var i=0; i<rev_marker.length; i++)
		  	{
		  		if(rev_marker[i]) rev_marker[i].map(null);
		  	}
		  	delete rev_marker;rev_marker=[];
	     
		  	rev_marker.push(markerr);/*e.wgs provide the wgs location*/ 
	       rev_geo_flag=false;
	       $('#startTitle').html(data[0].city);
	       $('#start').val(lat12+","+lng12);
	       nanobar.go(100);
		  return data;
	 
	  }
//********************************************************************************************--	  
	  var infowindow=[]
	  var info = [];
      var visbility = false;
      lati=[];
      longi=[];
     
      var titleArr=[];
      var fullresponse=[];
      
      
      
      function testAPI(date) {
    	    console.log('Welcome!  Fetching your information.... ');
    	    
    	  
    	    
    	      FB.api('/me/feed',
    	    		  'GET',
    	    		  {"fields":"place,created_time,story,message,full_picture,picture","with":"location","limit":"10000","until":date},
    	    		  function(response) {
    	    			  console.log(response);
    	    			   //alert(response.data.length);
    	    			   
    	  			     if(response.data.length===0){    	  			    	
    	    			   		return;
    	  			     }	         
    	  			     
    				     var nextPage=response.paging.next;
    				     var createdTime="";
    	    			   
    					for(var i=0;i<response.data.length;i++){
    						//alert(response.data[i].created_time);    						
    						//console.log("i: " +i+' data '+response.data[i]);
    						if(typeof  response.data[i].place.location==='undefined'){
    							//alert("no place");    							
    						}else{
    							
    							fullresponse.push(response.data[i]);
        						createdTime=response.data[i].created_time;
    						 lati.push(response.data[i].place.location.latitude);
    						 longi.push(response.data[i].place.location.longitude);					
    						
    				         var icon = mireo.stock_pins.narrow_pin_baloon_red();/*This object means for obtaining icons from MapmyIndia server. All stock icons have size 36px by 36px.*/
    		               
    				         var postion = new mireo.wgs.point(response.data[i].place.location.latitude, response.data[i].place.location.longitude);/*WGS location object*/
    		                 var title = response.data[i].place.name;
    		                titleArr.push(title);
    		                		                
    		                var windo={};
			                windo.position =postion;
			                windo.arrow_position = mireo.map.info_window.arrow_bottom;
			                windo.pix_offset = new mireo.base.point(0, -13);
			                windo.content=getInfoWindowContent(response.data[i]);
			               // alert(windo.content);
			                
			                infowindow.push(windo);
    		                
    		               // console.log(postion);
    		                 marker.push(addMarker(postion, icon, title,windo.content,getDetailContent(response.data[i]),'visited'));	
    		                 
    						}   
    					}
    					var mydate=createdTime.split("T")[0];
    					var newdate=(mydate.split('-')[0]-1)+'-'+12+'-'+31;
    					//alert(newdate);
    					testAPI(newdate);
    					mapmyindia_fit_markers_into_bound();
    				}
    	    	);
    	 }
      
      
      function getInfoWindowContent(fullresponse){
    	  var content;
    	  if(typeof  fullresponse.picture==='undefined')
          return    content="<div style=\"padding:10px;font-size:13px;width:200px\"><span style=\" color:red\"> Long press to get more Details</span><br/><strong>Story:</strong>"+fullresponse.story.replace(name,'You')+" <br/><strong>Date:</strong> "+fullresponse.created_time.split("T")[0]+"<div>";
         else 
              return	content="<div style=\"padding:10px;font-size:13px;width:200px\"><span style=\" color:red\"> Long press to get more Details</span><br/><strong>Story:</strong>"+fullresponse.story.replace(name,'You')+" <br/><strong>Date:</strong> "+fullresponse.created_time.split("T")[0]+"<br/> <img class=\"img-circle\" src=\""+fullresponse.picture+"\" alt=\""+fullresponse.place.name+"\" height='50' width='60'/><div>";
          
      }
      
      function getDetailContent(fullresponse){
    	  var res="<div style=\"padding:10px;font-size:13px;width:290px\">";
          if(typeof  fullresponse.full_picture==='undefined'){}
          else
        	  res +="<img src=\""+fullresponse.full_picture+"\" alt=\""+fullresponse.place.name+"\" height='250' width='290'/>";
          res+="<br/><br/><strong>Place Name: </strong>"+fullresponse.place.name;
          if(typeof  fullresponse.place.location.city==='undefined'){}
          else res+="<br/><strong>City: </strong>"+fullresponse.place.location.city;
          if(typeof  fullresponse.place.location.zip==='undefined'){}
          else res+= "<br/><strong>Zip: </strong>"+fullresponse.place.location.zip;
         res+=" <br/><strong>Date: </strong> "+fullresponse.created_time.split("T")[0];
         res+=" <br/><strong>Story: </strong>"+fullresponse.story.replace(name,'You');
         if(typeof  fullresponse.message==='undefined'){}
         else res+=" <br/><strong>Message: </strong>"+fullresponse.message;
         res+=" <div>";
         return res;
      }
      
	  function addMarker(position, icon, title,infoWindowContent,detailContent,type ,draggable) {
          var event_div = document.getElementById("event-log");
          var mk = new mireo.map.marker({
              icon: icon, /*Each marker instance has to have icon/image associated with it (without it, it is simply not visible). We have specified url to
               the image file on server disk, and also some offset within this image file (several "pins" are contained). */
              handle_input: true, /*The handle_input flag must be set to true if the intended use of this object requires it to react to input events. */
              draggable: draggable, /*The draggable flag is set to false, so this particular marker is not draggable on the map. */
              title: title, /*The title sets the standard HTML5 title attribute, the position places this marker on the map. The z_order value specifies the relative z-order to the map.*/
              position: position, /*must be instance of mireo.wgs.point that replaces current WGS position of this object. Will always return current WGS position.*/
              map: map, /* The map parameter is crucial, because each map object adds itself to specified map, and if omitted, it would have been null, and consequently would not be seen on the map.*/
              visible: true, /* If false, this object is not drawn in DOM. Default is true*/
              z_order: 250/*z-order of this object when drawn on the map. The actual "z-index" CSS property used is calculated from this property, based on relative position to the current center 
               point of the map in screen coordinates. The default value is 1.*/
          });
          /*The code that follows creation of the marker instance demostrates how to use the event handling via on function
           * The following events:*/
          mk.on("select", function(e) {
        	 
              //console.log(info);
              event_div.innerHTML = "Marker select<br>"+event_div.innerHTML ;
          });
          mk.on("tap", function(e) {
        	  //info=[];
        	  //mapmyindia_remove_info_window();
        	  position = mk.position();
              arrow_position = mireo.map.info_window.arrow_bottom;
              pix_offset = new mireo.base.point(0, -17);
                  
              window = mapmyindia_infowindow(position, true, pix_offset, arrow_position,infoWindowContent);
             info.push(window);
             
             if(type==='visited'){
           	  $('#start').val(mk.position().lat+","+mk.position().lng);
           	  $('#startTitle').html(title);
             }
             else if(type==='interest'){
           	  $('#destination').val(mk.position().lat+","+mk.position().lng);
           	  $('#destTitle').html(title);
           	  $('#poiCnt').html(poiCount++);
             }
             
              //event_div.innerHTML = "Marker tap<br>"+event_div.innerHTML ;
          });
          mk.on("multitap", function(e) {
              event_div.innerHTML = "Marker multitap<br>"+event_div.innerHTML ;
              $('#via').val(mk.position().lat+","+mk.position().lng);
           	  $('#viaTitle').html(title);
           	 
          });
          mk.on("long_press_begin", function(e) {
              event_div.innerHTML = "Marker long press begin<br>"+event_div.innerHTML ;
              if(type==='visited'){
            	  $('#start').val(mk.position().lat+","+mk.position().lng);
            	  $('#startTitle').html(title);
              }
              else if(type==='interest'){
            	  $('#destination').val(mk.position().lat+","+mk.position().lng);
            	  $('#destTitle').html(title);
            	  $('#poiCnt').html(poiCount++);
              }
              //$('#search').val(mk.position().lat);
	        // alert(position.lat);
              openNav();
          });
          mk.on("long_press_end", function(e) {
        	  
        	  $('#result1').html(detailContent);
              $('#res1Close').show();
              openNav();
              event_div.innerHTML = "Marker long press end<br>"+event_div.innerHTML ;
             
            
              
          });
          
      	
          return mk;
      }
	  
	  function mapmyindia_remove_info_window() {
          var infolength = info.length;
          if (infolength > 0) {
              for (var i = 0; i < infolength; i++) {
                  info[i].map(null);
              }
          }
          delete marker;
          info = [];
          visbility = false;
      }	  
	  
	  
	  function mapmyindia_fit_markers_into_bound() {
          var sw = new mireo.wgs.point(Array.max(lati), Array.max(longi));/*south-west WGS location object*/
          var ne = new mireo.wgs.point(Array.min(lati), Array.min(longi));/*north-east WGS location object*/
          var bounds = new mireo.wgs.bounds(sw, ne);/*This class represents bounds on the Earth sphere, defined by south-west and north-east corners.i.e Creates a new WGS bounds.*/
          map.fit_bounds(bounds);/*Sets the center map position and level so that all markers is the area of the map that is displayed in the map area*/

      }
	  
	  Array.max = function(array) {
          return Math.max.apply(Math, array);
      };
      Array.min = function(array) {
          return Math.min.apply(Math, array);
      };
	  
    
      function mapmyindia_infowindow(position, auto_close, pix_offset, arrow_pos, cont) {
          return new mireo.map.info_window({
              position: position, /*The WGS position of the info window on the map. If arrow is specified, info_window will be drawn so that the tip of the arrow is placed on provided position. */
              map: map, /*The map this object will be appended to. The default is null object.*/
              info_content: cont,
             // auto_close: auto_close, /*The auto_close property defines if info window will be auto closable. Autoclosable info window does not show the close button, and can only be close by input (mouse) action outside itself.*/
              arrow_pos: arrow_pos, /*The info_content can either be ready HTML element, or string in which case a div element will be created and passed info_content will be added to it as its innerHTML. */
              pix_offset: pix_offset, /*Relative offset in screen coordinates from (transformed) position on the map.*/
              close_button: {
                  url: "fancy-window-close-icon.png",
                  size: new mireo.base.size(16, 16)/*If the string is provided, that should be the id of the HTML element that should act as a close button. The onclick event on this element will close the info window. This option is ignored if auto_close is set. If this option is not specified or is invalid, and auto_close is not set, default close button will be created. */
              }
          });
      }

		
		var start_info_window;
		function show_info_window(pos,num)
		{
			if(start_info_window) start_info_window.visible(null); /*******remove existing info_windows***/
			start_info_window = new mireo.map.info_window({/****info_window display, for more visit detail documentation **/
			position: pos,
			auto_close: false,
			arrow_pos: mireo.map.info_window.arrow_bottom,
			info_content: '<table style=\"width:350px;padding:10px;font-size: 10px;font-type: bold;\">'+details[num]+'</table>',
			pix_offset: new mireo.base.point(0, -40),
			map: map,
			 
			});
		}


	
	 
	var search_id_val='';
	
	function get_geocode_result()
	{		
		//console.log(marker);
		//alert("in geocode");
		search_id=document.getElementById('search');
		remove_markers();
		if(search_id.value==''){search_id.focus();return false;}
		search_id_val=search_id.value;
		nanobar.go(30);
		document.getElementById('result').innerHTML='<div style="padding: 0 12px; color: #777">Loading..</div>';
		var geocode_api_url="https://api.mapmyindia.com/v3?fun=geocode&lic_key=ygctu1hkmy6ug5x6o43j36mkg8d8id8g&q="+search_id.value+"&callback=display_geocode_result";
		var scriptTag = document.createElement('SCRIPT');scriptTag.src = geocode_api_url;document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
		nanobar.go(60);
	}
	
	var latitudeArr=[];var longitudeArr=[];
	
	
	function display_geocode_result(data)
	{
	details = [];
	latitudeArr=[]; longitudeArr=[];
		//wm.set_center_and_zoom(center,16);/***set map position & zoom***/
		//remove_markers();/***********remove existing marker from map**/
		var result_string='<div style="padding: 0 12px;font-size:13px">Search Results</div><div style="font-size: 13px"><ul style="list-style-type:decimal; padding:2px 2px 0 30px">';
		var num=1;
		data.forEach( function( item )
		{
			var lng=item["lng"];
			var lat=item["lat"];
			var address=item["formatted_address"];
			var pos=new mireo.wgs.point(lat,lng); /***position of marker*****/
			show_markers(num,pos,address);/**display markers***/
			var content = new Array();
			if(item["city"]!='') content.push('<tr><td style="white-space:nowrap">City</td><td width="10px">:</td><td>'+item["city"]+'</td></tr>');
			if(item["area"]!='') content.push('<tr><td style="white-space:nowrap">Area</td><td width="10px">:</td><td>'+item["area"]+'</td></tr>');
			if(item["PLZ"]!='') content.push('<tr><td style="white-space:nowrap">Pin</td><td width="10px">:</td><td>'+item["PLZ"]+'</td></tr>');
			if(item["street"]!='') content.push('<tr><td style="white-space:nowrap">Street</td><td width="10px">:</td><td>'+item["street"]+'</td></tr>');
			if(item["house_no"]!='') content.push('<tr><td style="white-space:nowrap">house No</td><td width="10px">:</td><td>'+item["house_no"]+'</td></tr>');
			if(item["POI"]!='') content.push('<tr><td style="white-space:nowrap">POI</td><td width="10px">:</td><td>'+item["POI"]+'</td></tr>');
			if(item["phone"]!='') content.push('<tr><td style="white-space:nowrap">phone</td><td width="10px">:</td><td>'+item["phone"]+'</td></tr>');
			if(address!='') content.push('<tr><td style="white-space:nowrap" valign="top">Formatted address</td><td width="10px" valign="top">:</td><td valign="top">'+address+'</td></tr>');
			details.push(content.join(""));
			result_string+='<li onclick="show_geocode_details('+(num++)+','+lng+','+lat+')">'+address+'</li>';
			longitudeArr.push(lng);
			latitudeArr.push(lat);
			 
		});
		document.getElementById('result').innerHTML=result_string+'</ul></div>';/***put geocode result in div****/
		nanobar.go(100);
		if(latitudeArr[0]==0||longitudeArr[0]==0){
			addAlert("Please Enter Correct Search String!!");
			
		//	alert("Please Enter Correct Search String!!");
			document.getElementById('result').innerHTML=search_id_val+" Do not Exist!!";
		}else{
		mapmyindia_fit_markers_into_bound(); /***fit map in marker area***/
		call_distance_api();
		get_poi_result(latitudeArr[0],longitudeArr[0]);
		}
	}
	 
	function show_geocode_details(num,lng,lat,pos)
	{
		//console.log("show_geocode_details"+num+" "+lng+" "+lat+" "+pos);
		var pos=new mireo.wgs.point(lat,lng);
		map.set_center_and_zoom(pos,7);
		show_info_window(pos,num-1);
		
		
		get_poi_result(lat,lng);
		$('#start').val(lat+","+lng);
		$('#startTitle').val(search_id_val);
		//initMap();
		poi_num=1;;
	}
	

	var show_marker=[];
		function show_markers(num,pos,address)
		{
			//if(start_info_window) start_info_window.map(null); /*******remove existing info_windows***/
			/****marker display, for more about marker, please refer our marker documentation****/
			show_marker[num] =new mireo.map.marker({
			icon: mireo.stock_pins.pin_circle_dark_blue(),
			handle_input:true,
			draggable:false,
			title:address,
			position: pos,
			z_order:100,
			map: map
			});
			show_marker[num].icon().text(num,{"font-size":"12px"});/*****************text on marker***/
			show_marker[num].on('tap',function(){show_info_window(pos,num-1);}); /***tap event on marker to show info window***/
		//console.log(show_marker);
			
		}
		 function remove_markers()
		  {
		  	/**remove all marker from map***/
		  	for(var i=0; i<show_marker.length; i++)
		  	{
		  		if(show_marker[i]) show_marker[i].map(null);
		  	}
		  	delete show_marker;show_marker=[];/***delete marker array**/
		  	delete result_string;all_result=[];
		  }  
		 
	 
	function call_distance_api()
	{
		 $('#res1Close').hide();
		$('#result1').html('');
		/***************get parameters*************************/
		var center_points=lati[0]+','+longi[0];
		var searcharr=search_id_val.split(' ');
		var flag=false;
		for(var i=0;i<searcharr.length;i++){
			flag=false;
			//alert(searcharr[i].toUpperCase());
			for(var j=0;j<titleArr.length;j++){
				//console.log(searcharr[i].toUpperCase()+'  '+(titleArr[j].toUpperCase())+'  = '+(searcharr[i].toUpperCase().search(titleArr[j].toUpperCase())));
				if((titleArr[j].toUpperCase().search(searcharr[i].toUpperCase()))!=-1){
					center_points=lati[j]+','+longi[j];
					mapmyindia_infowindow(infowindow[j].position, true, infowindow[j].pix_offset, infowindow[j].arrow_position, infowindow[j].content);
					addAlert("You Know this Place!!");
					//alert("You know this Place!!");
					flag=true;
					break;
				}
				
			}
			if(flag)break;
		}	
		if(!flag){
			addAlert("You haven't visited "+search_id_val+ "");
			//alert("You haven't visited "+search_id_val);
		}
		
		var pts="";
		for(var i=0;i<=show_marker.length;i++)
		{
		//show_markers(i,val.split(","));
			if(pts=='') pts=latitudeArr[i]+','+longitudeArr[i]; else pts+="|"+latitudeArr[i]+','+longitudeArr[i];
		
		}
		/**put your REST api lisense key here***/
		
		var route_api_url="https://api.mapmyindia.com/v3?fun=star_dists&lic_key=ygctu1hkmy6ug5x6o43j36mkg8d8id8g&center="+center_points+"&pts="+pts+"&rtype=1&vtype=0&avoids=0&callback=distance_api_result";
		var scriptTag = document.createElement('SCRIPT');scriptTag.src = route_api_url;document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
		//show_markers("center",center_points.split(","));
		//mapmyindia_fit_into_bound();
		//document.getElementById('result').innerHTML="loading..";
		//alert(route_api_url);
		if(visitedFlag)
			$('#result1').html("You have visited "+search_id_val+ "");
	}
	 
	var result="";
	var visitedFlag=false;
	
	function distance_api_result(data)
	{
		var num=1;var result="<br><span style='font-size:12px'>Showing distance & duration from center point</span><br><br>";
		data.forEach( function( item )
		{
		var duration=item["duration"];
		/*****convert hrs & min********/
		var hours = Math.floor(duration/3600);duration %=3600; var minutes = Math.floor(duration / 60);
		var total_time=(hours >=1 ? hours+" hrs " : '')+(minutes >=1 ? minutes+" mins " : '');
		/**************/
		
		//alert("time "+total_time);
		//console.log("item"+item);
		//console.log(total_time.length);
		//console.log("length "+item["length"]);
		if(total_time.length!=0)
		if(((item["length"]/1000)<=2)){
			visitedFlag=true;
			
			addAlert("You have visited this place and Distance is less than 2km");
			//alert("You have visited this place  Distance is less than 2km!!");
			
		}
		var length=(item["length"]/1000).toFixed(1)+" km";
		
		
		result+="<div style='padding:5px 0 2px 0px;color:#222;font-size:13px'>Marker "+num+"</div>";
		result+="<div><span style='padding-right:18px'>Duration</span>: "+total_time+"</div>";
		result+="<div ><span style='padding-right:18px'>Distance</span>: "+length+"</div>";
		//result+="<div style='border-bottom: 1px solid #e9e9e9;padding-bottom:10px'><span style='padding-right:5px'>Wgs Points</span>: "+document.getElementById(num++).value+"</div>";
		});
		//document.getElementById('result').innerHTML=result;
	}
	
	$('.alert .close').on('click', function(e) {
	    $(this).parent().hide();
	});
	function addAlert(message) {
	    $('#alerts').append(
	        '<div class="alert alert-info">' +
	            '<button type="button" class="close" data-dismiss="alert">' +
	            '&times;</button>' + message + '</div>');
	    setTimeout(function() {
	        $(".alert").alert('close');
	    }, 6000);
	}

	var service;
	//function get_poi_result(lat,lng)
	function initMap() 
	{	
		   service = new google.maps.places.PlacesService(document.getElementById('gmap')
                  .appendChild(document.createElement('div')));
	}  
	
	
	
	function get_poi_result(lati,lngi){
		remove_poi_markers();
		$('#interestResult').html('');
		//lati=28.65;lngi=77.2496602;
		
		if(($('#interests').val())==='undefined'){
			addAlert(" PLease Select your Ineterests ");
		alert("no int");	return;
		}
		
		
		console.log(lati+" "+lngi);
		   service.nearbySearch({
		      location: {lat: lati, lng:lngi},
		     
		      radius: $('#range').val(),
		      types: $('#interests').val(),
		    }, display_poi_result);
		  
		  
		  
		var poiVal=$('#interests').val().toString().replace(",","|");
		//console.log(poiVal);
	}
	function remove_poi_markers(num)
	  {
	  	/**remove all marker from map***/
	  	for(var i=0; i<poiMarkers.length; i++)
	  	{
	  		
	  		if(poiMarkers[i]) poiMarkers[i].map(null);
	  	}
	  	delete poiMarkers;poiMarkers=[];/***delete marker array**/
	  	delete result_string;all_result=[];
	  	
	  }  
	var poinextflag=false;
	var poiMarkers=[];
	poi_num=1;
	
	poiTitlearr=[];
	function display_poi_result(results, status,next_page_token)
	{
		
		
			var result_string1='<div style="padding: 0 12px;font-size:13px">Search Results</div><div style="font-size: 13px"><ul style="list-style-type:decimal; padding:2px 2px 0 30px">';
		
			
		//console.log(next_page_token.hasNextPage);
		/*if(next_page_token.hasNextPage &&  poinextflag)
			next_page_token.nextPage

			poinextflag=true;*/
		
		//console.log(results);
		//console.log(status);
		//wm.set_center_and_zoom(center,16);/***set map position & zoom***/
		//remove_markers();/***********remove existing marker from map**/
		if(results.length==0){
			addAlert("No places Found of your interest :( !!");
			
			//alert("No Places Found of your Interest :( !!");
		}
		
	 if (status === google.maps.places.PlacesServiceStatus.OK) {
			var num=1;
			
			results.forEach( function( item )
			{
			//	alert(item.geometry.location);
				//alert(item.geometry.location.lng);
			
			if(poi_num<=20){
			var long1=item.geometry.location.lng();
			var lati1=item.geometry.location.lat();
			
			var pos=new mireo.wgs.point(lati1,long1); 
			 var icon = mireo.stock_pins.narrow_pin_baloon_dark_blue();
			/***position of marker*****/
			//show_markers(num,pos,address);/**display markers***/
			var title=item.name;
			poiTitlearr.push(title);
			
			var address=item.vicinity;
			var val=item.geometry.location;
			var poiFlagmatched=false;
			var splitTitle=title.split(",");
			//console.log(splitTitle);
			for(var j=0;j<splitTitle.length;j++){
				poiFlagmatched=false;
				for(var i=0;i<titleArr.length;i++){
					
					if(splitTitle[j].length>=3){
						//console.log(">3   "+splitTitle[j]+" == "+titleArr[i]);
						if((titleArr[i].toUpperCase().search(splitTitle[j].toUpperCase()))!=-1){
							console.log(splitTitle[j]+" == "+titleArr[i]);
							poiFlagmatched=true;
						}
					}
						else break;
				}
				if(poiFlagmatched)
					break;
			}
			
			if(!poiFlagmatched){
				poiMarkers.push((addMarker(pos, icon, title,getPOIInfoWindowContent(item),getPOIDetailContent(item),'interest')));
				poiMarkers[poiMarkers.length-1].icon().text((poiMarkers.length));
				result_string1+='<li onclick="show_poi_details('+(poi_num++)+','+long1+','+lati1+')">'+title+'</li>';
			}
			}
			
			//console.log(val.lat());
			
			/*var content = new Array();
			if(item["city"]!='') content.push('<tr><td style="white-space:nowrap">City</td><td width="10px">:</td><td>'+item["city"]+'</td></tr>');
			if(item["area"]!='') content.push('<tr><td style="white-space:nowrap">Area</td><td width="10px">:</td><td>'+item["area"]+'</td></tr>');
			if(item["PLZ"]!='') content.push('<tr><td style="white-space:nowrap">Pin</td><td width="10px">:</td><td>'+item["PLZ"]+'</td></tr>');
			if(item["street"]!='') content.push('<tr><td style="white-space:nowrap">Street</td><td width="10px">:</td><td>'+item["street"]+'</td></tr>');
			if(item["house_no"]!='') content.push('<tr><td style="white-space:nowrap">house No</td><td width="10px">:</td><td>'+item["house_no"]+'</td></tr>');
			if(item["POI"]!='') content.push('<tr><td style="white-space:nowrap">POI</td><td width="10px">:</td><td>'+item["POI"]+'</td></tr>');
			if(item["phone"]!='') content.push('<tr><td style="white-space:nowrap">phone</td><td width="10px">:</td><td>'+item["phone"]+'</td></tr>');
			if(address!='') content.push('<tr><td style="white-space:nowrap" valign="top">Formatted address</td><td width="10px" valign="top">:</td><td valign="top">'+address+'</td></tr>');
			details.push(content.join(""));
			result_string+='<li onclick="show_geocode_details('+(num++)+','+lng+','+lat+')">'+address+'</li>';
			longitudeArr.push(lng);
			latitudeArr.push(lat);
			 */
			});
			//call_distance_api();
			//document.getElementById('result').innerHTML=result_string+'</ul></div>';/***put geocode result in div****/
			//mapmyindia_fit_markers_into_bound(); /***fit map in marker area***/
			$('#interestResult').html(result_string1+'</ul></div>');
			console.log("interest marker end !!");
		}
		if(poi_num<20)
			if(next_page_token.hasNextPage)
			next_page_token.nextPage();
		
	}	
	
	function show_poi_details(num,lng,lat,title,pos)
	{
		//console.log("show_geocode_details"+num+" "+lng+" "+lat+" "+pos);
		var pos=new mireo.wgs.point(lat,lng);
		map.set_center_and_zoom(pos,7);
		//show_info_window(pos,num-1);
		//get_poi_result(lat,lng);
		console.log("showing");
		$('#destTitle').val(poiTitlearr[num]);
		$('#destination').val(lat+","+lng);
		
		//initMap();
		
	}
    function getPOIInfoWindowContent(fullresponse){  
    	if(typeof  fullresponse.rating==='undefined')
        return    content="<div style=\"padding:10px;font-size:13px;width:200px\"><strong>Name:</strong>"+fullresponse.name+" <br/><strong>Types: </strong> "+fullresponse.types[0]+"<div>";
    	else
    		return    content="<div style=\"padding:10px;font-size:13px;width:200px\"><strong>Name:</strong>"+fullresponse.name+" <br/><strong>Types: </strong> "+fullresponse.types[0]+"<br/><strong>Rating: </strong> "+fullresponse.rating+"<div>";
    	
    }
    
    function getPOIDetailContent(fullresponse){
  	  var res="<div style=\"padding:10px;font-size:13px;width:290px\">";
        if(typeof  fullresponse.photos==='undefined'){}
        else{
        //	console.log(fullresponse.photos[0].getUrl({'maxWidth': 290, 'maxHeight': 250}));
      	  //res +="<img src=\"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyD57HZiUJALNJTO2vXbhp-Nv7TKHlzg1Ss&photoreference="+fullresponse.photos[0].photo_reference+"\" alt=\""+fullresponse.name+"\" height='250' width='290'/>";
        	res +="<img src="+fullresponse.photos[0].getUrl({'maxWidth': 290, 'maxHeight': 250})+" height='250' width='290'/>";
        }res+="<br/><br/><strong>Place Name: </strong>"+fullresponse.name;
        res+="<br/><br/><strong>Types: </strong>"+fullresponse.types.toString();
        res+="<br/><strong>Address: </strong>"+fullresponse.vicinity;
        if(typeof  fullresponse.rating==='undefined'){}
        else res+= "<br/><strong>Rating: </strong>"+fullresponse.rating;
    
       res+=" <div>";
       return res;
    }
	 function logout(){
		 FB.logout();
		 window.location.reload();
	 }
	 
	 
//**********************route***************
	 
	 var toggleD=true;
		function toggleDirections(){
			if(toggleD){
				showDivDirections();
				
			}else{
				hideDivDirections();
			}
			toggleD=!toggleD;
		}
	 function showDivDirections(){
		 $('#divDirections').show();
		
	 }
	function hideDivDirections(){
		$('#divDirections').hide();
	 }
	 
	 var alternate_route=null;var poly=[];var advice_direct_route; var direct_route_info;
	 var via_points="";
	 
	 
	 function get_route_result()
	 {
		
		remove_poi_markers();
		$('#interestResult').html('');
	 var start_points=document.getElementById('start').value;/***get start points**/
	 
	 var destination_points=document.getElementById('destination').value;/**get destination points**/
	 via_points=document.getElementById('via').value;/**get via points**/
	 
	 if(start_points==''||destination_points==''){$('#start').focus();
	 addAlert("Start and Destination Both points are required!!");
	 return false;}
	 
	 var rtype=0;/**get route type**/
	 var vtype=0;/**get vehicle type**/
	 var avoids=document.getElementById('avoids').value;/**get avoids**/
	 var advices_o=1;/**get advices option**/
	 alternatives_o=true;/**get alternatives option**/
	 /**put your REST api lisense key here***/
	 nanobar.go(30);
	 var route_api_url="https://api.mapmyindia.com/v3?fun=route&lic_key=ygctu1hkmy6ug5x6o43j36mkg8d8id8g&start="+start_points+"&destination="+destination_points+"&viapoints="+via_points+"&rtype="+rtype+"&vtype="+vtype+"&avoids="+avoids+"&with_advices="+advices_o+"&alternatives="+alternatives_o+"&callback=route_api_result";
	 var scriptTag = document.createElement('SCRIPT');scriptTag.src = route_api_url;document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
	 var start_points_array=start_points.split(",");
	 var destination_points_array=destination_points.split(",");
	 show_directions_markers("start",start_points_array);/*********show start points marker********/
	 show_directions_markers("destination",destination_points_array); /*********show destination points marker********/
	 if(advice_marker) advice_marker.map(null);/***remove if any existing marker***/
	 mapmyindia_fit_into_bound(start_points_array,destination_points_array);
	 if(start_info_window) start_info_window.visible(null); /*******remove existing info_windows***/
	 document.getElementById('direct_advices').style.display="inline-block";
	 nanobar.go(60);
	 document.getElementById('direct_advices').innerHTML="<font color='red'>loading..</font>";
	 document.getElementById('alternatives_advices').innerHTML="";
	 if(poly['direct']) poly['direct'].map(null);if(poly['alternate']) poly['alternate'].map(null);/*********remove direct route polyline*************/
	 }
	  
	  
	 function route_api_result(data)
	 {
	 var alternate_route1_text="";var alternate_route2_text="";var direct_route='Route';
	 alternate_route=data.alternatives;document.getElementById("alternate").style.display="none";
	 if(typeof alternate_route[0]!='undefined') /***get first alternative route***/
	 {
	 var duration1=alternate_route[0].duration;/**time in seconds*************/
	 var hours1 = Math.floor(duration1/3600);duration1 %=3600; var minutes1 = Math.floor(duration1 / 60);
	 var total_time1=(hours1 >=1 ? hours1+" hrs " : '')+(minutes1 >=1 ? minutes1+" min" : '');
	 var length1=(alternate_route[0].length)/1000;
	 alternate_route1_text='<td ><div style="padding:5px 5px 5px 15px;color:#000;border-left:1px solid #ddd;cursor:pointer" onclick="document.getElementById(\'direct_advices\').style.display=\'none\';document.getElementById(\'alternatives_advices\').style.display=\'inline-block\';alternative_route(0)"><span style="font-size:13px;padding:2px 0 20px 0;color:#222">Route 2</span><br><span style="font-size:11px;line-height:16px;color:#555">'+total_time1+'<br>'+length1.toFixed(1)+' km</div></td>';
	 direct_route='Route 1';
	 }
	 if(typeof alternate_route[1]!='undefined') /***get second alternative route***/
	 {
	 var duration2=alternate_route[1].duration;/**time in seconds*************/
	 var hours2 = Math.floor(duration2/3600);duration2 %=3600; var minutes2 = Math.floor(duration2 / 60);
	 var total_time2=(hours2 >=1 ? hours2+" hrs " : '')+(minutes2 >=1 ? minutes2+" min" : '');
	 var length2=(alternate_route[1].length)/1000;
	 alternate_route2_text='<td ><div style="padding:5px 5px 5px 15px;color:#000;border-left:1px solid #ddd;cursor:pointer" onclick="document.getElementById(\'direct_advices\').style.display=\'none\';document.getElementById(\'alternatives_advices\').style.display=\'inline-block\';alternative_route(1)"><span style="font-size:13px;padding:2px 0 20px 0;color:#222">Route 3</span><br><span style="font-size:11px;line-height:16px;color:#555">'+total_time2+'<br>'+length2.toFixed(1)+' km</div></td>';
	  
	 }
	 /***check & display alternative route option*****/
	 var way=data.trips[0];var way1=data.trips[1];
	 if(via_points=="")
	 {
	 var trips=data.trips;
	 var duration=way.duration;/**time in seconds*************/
	 var hours = Math.floor(duration/3600);duration %=3600; var minutes = Math.floor(duration / 60);
	 var total_time=(hours >=1 ? hours+" hrs " : '')+(minutes >=1 ? minutes+" min" : '');
	 var length=(way.length)/1000;
	 var levels=decode_levels(way.lvls);
	 var pts=decode_path(way.pts);
	 var advices=way.advices; /****advice & display **************/
	 }
	 else
	 {
	 /*******if via points is provided use trip[0] & trip[1] also************/
	 var duration=way.duration+way1.duration;/**time in seconds*************/
	 var hours = Math.floor(duration/3600);duration %=3600; var minutes = Math.floor(duration / 60);
	 var total_time=(hours >=1 ? hours+" hrs " : '')+(minutes >=1 ? minutes+" min" : '');
	 var length=(way.length+way1.length)/1000;
	 var levels=decode_levels(way.lvls).concat(decode_levels(way1.lvls));
	 var pts=decode_path(way.pts).concat(decode_path(way1.pts));/****points trip[0] & trip[1] to display **************/
	 var advices=way.advices.concat(way1.advices); /****advice trip[0] & trip[1] to display **************/
	 }
	 /***********display advices***********/
	 direct_route_info='<table width="100%"><tr><td ><div style="padding:5px;cursor:pointer;background:#f7f7f7" onclick="document.getElementById(\'direct_advices\').style.display=\'inline-block\';document.getElementById(\'alternatives_advices\').style.display=\'none\';poly[\'alternate\'].map(null);"><span style="font-size:13px;padding:2px 0 20px 0;color:#222">'+direct_route+'</span><br><span style="font-size:11px;line-height:16px">'+total_time+'<br>'+length.toFixed(1)+' km</span></div></td>'+alternate_route1_text+alternate_route2_text+'</tr></table>';
	 document.getElementById('info').innerHTML=direct_route_info;
	 advice_direct_route='<span style="font-size:13px;padding-left:5px">'+direct_route+'</span><table width="100%" align="center">';
	 var num_rec=1;var distance;var go="";
	 advices.forEach( function( advice ){
	 var icon=advice.icon_id;
	 var meters=advice.meters;
	 var distance_meters=meters-distance;
	 distance=meters;1
	 var advice_meters=(distance_meters >=1000 ? (distance_meters/1000).toFixed(1) +" km " : distance_meters+" mts ")
	 var text=advice.text;
	 if(meters!=0) {go="<br>Go "+advice_meters;advice_direct_route+=go+'</td></tr>';}
	 var advice_pt=advice.pt;
	  
	 advice_direct_route+='<tr onclick="show_route_details('+advice_pt.lat+','+advice_pt.lng+',\''+text+'\')" style="cursor:pointer;"><td valign="top" style="padding:5px 0px 5px 0px"><img src="https://api.mapmyindia.com/images/step_'+icon+'.png" width="30px"></td><td style="padding:5px;border-top: 1px solid #e9e9e9;">'+text;
	 })
	 document.getElementById('direct_advices').innerHTML=advice_direct_route+"</table>";
	 /***********display path***********/
	 var pathArr=[];
	 pts.forEach( function( pt ){
	 pathArr.push(new mireo.wgs.point(pt[0],pt[1]));
	 })
	 draw_polyline("direct",levels,pathArr);/***********draw polyline***/
	 nanobar.go(100);
	 }
	  
	 function alternative_route(route_no)
	 {
	 if(advice_marker) advice_marker.map(null);if(start_info_window) start_info_window.map(null); /***remove advices marker & info windows if exist**/
	 var way=alternate_route[route_no];var way1=alternate_route[1];
	 var levels=decode_levels(way.lvls);
	 var pts=decode_path(way.pts);
	 var advices=way.advices; /****advice & display **************/
	 var advice_alternative_route='<span style="font-size:13px;padding-left:5px">Route '+(route_no+2)+'</span><table width="100%" align="center">';
	 var num_rec=1;var distance;var go="";
	 advices.forEach( function( advice ){
	 var icon=advice.icon_id;
	 var meters=advice.meters;
	 var distance_meters=meters-distance;
	 distance=meters;1
	 var advice_meters=(distance_meters >=1000 ? (distance_meters/1000).toFixed(1) +" km " : distance_meters+" mts ")
	 var text=advice.text;
	 if(meters!=0) {go="<br>Go "+advice_meters;advice_alternative_route+=go+'</td></tr>';}
	 var advice_pt=advice.pt;
	  
	 advice_alternative_route+='<tr onclick="show_route_details('+advice_pt.lat+','+advice_pt.lng+',\''+text+'\')" style="cursor:pointer;"><td valign="top" style="padding:5px 0px 5px 0px"><img src="https://api.mapmyindia.com/images/step_'+icon+'.png" width="30px"></td><td style="padding:5px;border-top: 1px solid #e9e9e9;">'+text;
	 })
	 document.getElementById('alternatives_advices').innerHTML=advice_alternative_route+"</table>";
	 document.getElementById('direct_advices').style.display='none';/************hide direct advices******/
	 document.getElementById('alternatives_advices').style.display='inline-block';/************hide direct advices******/
	 /***********display path***********/
	 var pathArr=[];
	 pts.forEach( function( pt ){
	 pathArr.push(new mireo.wgs.point(pt[0],pt[1]));
	 })
	 if(poly['alternate']) poly['alternate'].map(null);draw_polyline("alternate",levels,pathArr);/***********draw polyline***/
	 }
	  
	 function clear_route(){
		 if(poly['alternate']) poly['alternate'].map(null);
		 if(poly['direct']) poly['direct'].map(null);
		 $('#alternate').html('');
		 $('#info').html('');
		 $('#direct_advices').html('');
		 if(advice_marker) advice_marker.map(null);
	 }
	 
	 function draw_polyline(route,levels,pathArr)
	 {	/**draw polyline******************************/
	 var polyline_color='orange';
	 if(route=='direct'){ if(poly[route]) poly[route].map(null);var polyline_color='blue';}
	 poly[route]=new mireo.map.polyline({
	 map: wm,
	 path:new mireo.map.path({
	 points: pathArr,
	 levels: levels,
	 width:12,
	 color:polyline_color
	 })
	 });
	 }
	 var show_marker_direction=[];
	 function show_directions_markers(marker_name,points)
	 {
	 if(show_marker_direction[marker_name]) show_marker_direction[marker_name].map(null);
	 		get_rev_geocode_result_dir(points[0],points[1],marker_name)
	 }
	  
	  
	//*************************reverse geocoding**********************
		  function get_rev_geocode_result_dir(search_lat,search_lng,marker_name)
		  {
		  lat123=search_lat;lng123=search_lng;
		  nanobar.go(30);
		 // document.getElementById('result').innerHTML='Loading...';
		  /**put your REST api lisense key here***/
		  var rev_geocode_api_url;
		  if(marker_name=='start') {
		   rev_geocode_api_url="https://api.mapmyindia.com/v3?fun=rev_geocode&lic_key=ygctu1hkmy6ug5x6o43j36mkg8d8id8g&lng="+search_lng+"&lat="+search_lat+"&callback=rev_geocode_result_dir_start";
		  }
		  else
			  rev_geocode_api_url="https://api.mapmyindia.com/v3?fun=rev_geocode&lic_key=ygctu1hkmy6ug5x6o43j36mkg8d8id8g&lng="+search_lng+"&lat="+search_lat+"&callback=rev_geocode_result_dir_dest";
			 
			  var scriptTag = document.createElement('SCRIPT');scriptTag.src = rev_geocode_api_url;document.getElementsByTagName('HEAD')[0].appendChild(scriptTag);
			  nanobar.go(65);
		  }
		  
		  
		  var rev_geocode_result_data='';
		  function rev_geocode_result_dir_start(data){
			 var marker_name="start";
			  rev_geocode_result_data=data;
			  var icon = mireo.stock_pins.pin_circle_green();/*This object means for obtaining icons from MapmyIndia server. All stock icons have size 36px by 36px.*/
		       var title = "Start Point";
		      
			  var con="<div style=\"padding:10px;font-size:13px;width:200px\"><p style='color:red;'>Starting Point</p><br/><strong>City:</strong>"+data[0].city+" <br/><strong>Address:</strong> "+data[0].formatted_address+"<div>";
		      var rev_mark=addMarker(new mireo.wgs.point(data[0].lat,data[0].lng), icon,title,con,'','',true);
		    		 rev_mark.on('changed', function() {
						var point = rev_mark.position();
						document.getElementById(marker_name).value = point.lat + ","
								+ point.lng;
						$('#startTitle').html(data[0].city);
						get_route_result();
					    
					});
		    		 show_marker_direction[marker_name]=rev_mark;
		    		 nanobar.go(100);
		  }
		  
		  function rev_geocode_result_dir_dest(data){
			 var marker_name="destination";
			  rev_geocode_result_data=data;
			  var icon = mireo.stock_pins.pin_circle_blue();/*This object means for obtaining icons from MapmyIndia server. All stock icons have size 36px by 36px.*/
		       var title = "Destination Point";
		      
			  var con="<div style=\"padding:10px;font-size:13px;width:200px\"><p style='color:red;'>Destination Point</p><br/><strong>City:</strong>"+data[0].city+" <br/><strong>Address:</strong> "+data[0].formatted_address+"<div>";
			  var rev_mark1=addMarker(new mireo.wgs.point(data[0].lat,data[0].lng), icon,title,con,'','',true);
			  show_marker_direction[marker_name]=rev_mark1;
			  rev_mark1.on('changed', function() {
					var point = rev_mark1.position();
					document.getElementById(marker_name).value = point.lat + ","
							+ point.lng;
					  $('#destTitle').html(data[0].city);
					get_route_result();
				   
				});
	    		
		  }
	//********************************************************************************************--	  

	 
	 
	 
	 var start_info_window;
	 function show_info_window_dir(pos,text)
	 {
	 if(start_info_window) start_info_window.visible(null); /*******remove existing info_windows***/
	 start_info_window = new mireo.map.info_window({/****info_window display, for more visit detail documentation **/
	 position: pos,
	 auto_close: false,
	 arrow_pos: mireo.map.info_window.arrow_left,
	 info_content: '<table style=\"width:250px;padding:10px;font-size: 10px;font-type: bold;\"><tr><td>'+text+'</td></tr></table>',
	 pix_offset: new mireo.base.point(20, -15),
	 map: wm,
	 });
	 }
	 
	 var advice_marker;
	 function show_route_details(advice_lat,advice_lng,advice_text)
	 {
		 if(advice_marker)advice_marker.map(null);
	 var advice_pos = new mireo.wgs.point(advice_lat, advice_lng);
	/****marker display, for more about marker, please refer our marker documentation****/
	advice_marker = new mireo.map.marker({
		icon : mireo.stock_pins.pin_circle_blue(),
		handle_input : true,
		draggable : false,
		title : advice_text,
		position : advice_pos,
		z_order : 100,
		map : wm
	});
	wm.set_center_and_zoom(advice_pos, 4);
	/***set map position & zoom***/
	show_info_window_dir(advice_pos, advice_text)
}
/*******************************/
var decode_path = function(encoded) {
	var pts = [];
	var index = 0, len = encoded.length;
	var lat = 0, lng = 0;
	while (index < len) {
		var b, shift = 0, result = 0;
		do {
			b = encoded.charAt(index++).charCodeAt(0) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);

		var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
		lat += dlat;
		shift = 0;
		result = 0;
		do {
			b = encoded.charAt(index++).charCodeAt(0) - 63;
			result |= (b & 0x1f) << shift;
			shift += 5;
		} while (b >= 0x20);
		var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
		lng += dlng;
		pts.push([ lat / 1E6, lng / 1E6 ]);
	}
	return pts;
};

var decode_levels = function(str) {
	var lvs = new Array(parseInt(str.length / 2));
	var val = 0, i = 0, j = 0, k = 0;
	while (i < str.length) {
		val = 0;
		k = 0;
		for (; i < str.length; i++) {
			var b = str.charCodeAt(i) - 63;
			val |= (b & 0x1F) << k;
			if (!(b & 0x20))
				break;
			k += 5;
		}
		++i;
		lvs[j++] = val;
	}
	lvs.length = j;
	return lvs;
};

function mapmyindia_fit_into_bound(start_points_array,destination_points_array)
{
var latitudeArr = [start_points_array[0],destination_points_array[0]];
var longitudeArr = [start_points_array[1],destination_points_array[1]];
var sw = new mireo.wgs.point(Array.max(latitudeArr), Array.max(longitudeArr));/*south-west WGS location object*/
var ne = new mireo.wgs.point(Array.min(latitudeArr), Array.min(longitudeArr));/*north-east WGS location object*/
var bounds = new mireo.wgs.bounds(sw, ne);/*This class represents bounds on the Earth sphere, defined by south-west and north-east corners.i.e Creates a new WGS bounds.*/
wm.fit_bounds(bounds);/*Sets the center map position and level so that all markers is the area of the map that is displayed in the map area*/
}

//******************************************

function post_on_fb(){
	
	$('[data-toggle="popover"]').popover('hide');
	//$('#startTitle').val();
	var destval=$('#destTitle').val();
	var destcoord=$('#destination').val();
	var fbpostmsg=$('#fbmsg').val();
	var placeid='';
   // addAlert(destval +"-- " +destcoord+" =="+fbpostmsg+" safaf");
//	addAlert("Please Select destination");
	;
	
	FB.api(
			  '/search',
			  'GET',
			  {"q":destval,"type":"place","center":destcoord,"distance":"10000"},
			  function(response) {
				  if(response.data==='undefined')
				
					  addAlert("something went wrong");
			     if(response.data.length!=undefined)
				  if(response.data.length>0){
			    	 placeid=response.data[0].id;
			    	// alert(placeid+"   len"+response.data.length);
			     }
				  else return;
			  }
			);
	
	
/*	FB.api(
			  '/me/feed',
			  'POST',
			  {"message":"asdfgqwerrt","place":"578633375483655"},
			  function(response) {
console.log("1213")	;	  }
			);
	*/
	
	FB.api(
			  '/me/feed',
			  'POST',
			  {"message":fbpostmsg,"place":parseInt(placeid)},
			  function(response) {
				  console.log(" 1 "+eval(placeid));
				  if(response.id!='undefined'){
			      addAlert(fbpostmsg +"- Posted on fb !!");
				  console.log(response.id);
				  }else addAlert("Not posted!");
			  }
			);
	
	
	
}