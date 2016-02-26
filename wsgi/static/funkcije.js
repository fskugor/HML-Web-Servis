//globalne varijable
var online = false;

if (online == false){
  var mainUrl = 'http://localhost:5000';
}else{
  var mainUrl = 'http://uopj-hrml.rhcloud.com'; //ovdje ide url online aplikacije
}

$('#tbPodaci').empty();



//prikaz druge pretrage
function prikazPretragaDruga(prikaz){
  if(prikaz == false){
    $('#btnDrugi, #txtLemmasTokens, #rbLemma, #rbToken, #lblToken, #lblLemma, #lblGroup, #chkGroup').hide();
    $('#txtLemma, #txtToken, #txtMsd ').val('');
    $('#txtLemmasTokens').val('');
  }else{
    $('#btnDrugi, #txtLemmasTokens, #rbLemma, #rbToken, #lblToken, #lblLemma, #lblGroup, #chkGroup').show();
    $('#txtLemmasTokens').val('');
    $('#txtLemma, #txtToken, #txtMsd ').val('');
  }
}

$(document).ready(function() {

 // kod učitavanja stranice sakrivamo drugu pretragu
 prikazPretragaDruga(false);


 // pokretanje pretrage pritskom na Enter (broj 13 označava tipku Enter)
 $('#txtLemma, #txtToken, #txtMsd').keypress(function (e) {
  if (e.which == 13) {
    $('#tbPodaci').empty();
    trojke(e);
  }
});

  $('#txtLemmasTokens').keypress(function (e) {
  if (e.which == 13) {
    $('#tbPodaci').empty();
    trojkeMultiControl(e);
  }
});


 $('#btnPrvi').click (function(e){ 
   trojke(e);
 });

// akcija klikom na botun za pretraživanje s više parametara
$('#btnDrugi').click (function(e){
  trojkeMultiControl(e);
});


// odluka na koji način će se ispisati rezultat pretrage sa više parametara
function trojkeMultiControl(e){ 
  if (!$("input:radio[name='grupa1']").is(':checked')) {
   alert('Niste označili pretragu po lemama ili tokenima!');
 }
 else{

   if($('#rbLemma').is(':checked') && (document.getElementById('chkGroup').checked)) 
   {
    trojkeMultiGroup(e);
  }
  else if($('#rbLemma').is(':checked') && (document.getElementById('chkGroup').checked == false)) {
    trojkeMulti(e);
  }
  else if($('#rbToken').is(':checked') && (document.getElementById('chkGroup').checked)) {
    trojkeMultiGroup(e);
  }
  else if($('#rbToken').is(':checked') && (document.getElementById('chkGroup').checked == false)) {
    trojkeMulti(e);
  }
}
}

$('#aPretragaPrva').click(function(){
  $('#tbPodaci').empty(); 
  $('#txtLemma, #txtToken, #txtMsd, #btnPrvi ').show();
  prikazPretragaDruga(false);
  

});

$('#aPretragaDruga').click(function() {
  $('#tbPodaci').empty();
  $('#txtLemma, #txtToken, #txtMsd, #btnPrvi').hide();
  prikazPretragaDruga(true);
});
});
//end of document.ready

function trojke(e){
 e.preventDefault();
 $('#tbPodaci').empty();
 var lemma = $('#txtLemma').val();
 var token = $('#txtToken').val();
 var msd = $('#txtMsd').val();
 
 var resturl = mainUrl+"/triples?lemma="+lemma+"&token="+token+"&msd="+msd;
 puniTablicu(resturl, false);
}


function trojkeMultiGroup(e){
 e.preventDefault();
 $('#tbPodaci').empty();
 var LemmasTokens = $('#txtLemmasTokens').val();

 if($('#rbLemma').is(':checked')) {
  var resturl = mainUrl+"/triples?lemmas="+LemmasTokens+"&group=true";
}
else{
 var resturl = mainUrl+"/triples?tokens="+LemmasTokens+"&group=true";
}
puniTablicu(resturl, true)
}

//
function trojkeMulti(e){
 e.preventDefault();
 $('#tbPodaci').empty();
 var LemmasTokens = $('#txtLemmasTokens').val();
 if($('#rbLemma').is(':checked')) {
  var resturl = mainUrl+"/triples?lemmas="+LemmasTokens+"&group=false";
}
else{
 var resturl = mainUrl+"/triples?tokens="+LemmasTokens+"&group=false";
}

puniTablicu(resturl, false);
}

function puniTablicu(resturl, grupiranje){
  $.ajax({
    url: resturl,
    dataType: 'json',
    success: function(data){
      var duljinaTrojki  = data.triples.length;
      if(grupiranje == true){
        var LemmasTokens = $('#txtLemmasTokens').val();
        var nizGrupa = LemmasTokens.split(",");
        if (duljinaTrojki == 0) {
         red=$('<th>Nema takve uređene trojke.</th>')
         $('#tbPodaci').append(red);
       } else{ 
        nazivi=$('<thead><tr><th>#</th><th>LEMMA</th><th>TOKEN</th><th>MSD</th></tr></thead><tbody>')
        $('#tbPodaci').append(nazivi); 
        for (var i=0; i<nizGrupa.length;i++){
          grupared = $('<tr class="info"><th scope="row"></th><td></td><th scope="row">'+ nizGrupa[i] +'</th><td></td></tr>');
          $('#tbPodaci').append(grupared); 
            var objekt= eval('data.triples.'+nizGrupa[i]);     //konvertira string u objekt  
            for (var j=0; j<objekt.length;j++){
                row = $('<tr><th scope="row">'+ (j+1)+'</th><td>'+objekt[j][0]+'</td><td>'+objekt[j][1]+'</td><td>'+objekt[j][2]+'</td></tr>'); //create row
                $('#tbPodaci').append(row);
              }
            }
            kraj=$('</tbody>')
            $('#tbPodaci').append(kraj);    
          }
        }else{
          if (duljinaTrojki == 0) {
           red=$('<th>Nema takve uređene trojke.</th>')
           $('#tbPodaci').append(red);
         } else{ 
          nazivi=$('<thead><tr><th>#</th><th>LEMMA</th><th>TOKEN</th><th>MSD</th></tr></thead><tbody>')
          $('#tbPodaci').append(nazivi); 
          for (var i= 0; i<duljinaTrojki; i++ ){ 
                row = $('<tr><th scope="row">'+ (i+1)+'</th><td>'+data.triples[i][0]+'</td><td>'+data.triples[i][1]+'</td><td>'+data.triples[i][2]+'</td></tr>'); //create row
                $('#tbPodaci').append(row);
              }
              kraj=$('</tbody>')
              $('#tbPodaci').append(kraj);      
            }
          }
        }
      });
}