<script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
       <script src = "https://code.highcharts.com/highcharts.js"></script>
       <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
       <meta charset="utf-8">
       <meta name="viewport" content="width=device-width, initial-scale=1">
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
       <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>

       <script language = "JavaScript">
       function draw_chart(){
            var o1 = document.getElementById("portfoyinput").value;
            var o2= document.getElementById("target").value;
            console.log("msg11",o1);
            console.log("msg12",o2);
            var array = new Array();
            var tarih=new Array();
            var paydeger=new Array();
            $.post("http://localhost:8889/data", {option: o2}, function(data) {
               array = data["pay"];
               var i;
               for (i = 0; i < array.length; i++) {
                  if (!tarih.includes((array[i]["Tarih"].split("T"))[0])) {
                     tarih.push((array[i]["Tarih"].split("T"))[0]);
                     paydeger.push(array[i]["BirimPayDegeri"]);
                  }
               }$(document).ready(function () {
               var title = {
                  text: 'Portföy Değerleri'
               };
               var subtitle = {
                  text: 'Kaynak: spk.com'
               };
               var xAxis = {
                  categories: tarih
               };
               var yAxis = {
                  title: {
                     text: 'Fiyat'
                  },
                  plotLines: [{
                     value: 0,
                     width: 1,
                     color: '#808080'
                  }]
               };
               var tooltip = {
                  valueSuffix: ''
               }
               var legend = {
                  layout: 'vertical',
                  align: 'right',
                  verticalAlign: 'middle',
                  borderWidth: 0
               };
               var series = [{
                  name: 'Fiyat',
                  data: paydeger
               }
               ];

               var json = {};
               json.title = title;
               json.subtitle = subtitle;
               json.xAxis = xAxis;
               json.yAxis = yAxis;
               json.tooltip = tooltip;
               json.legend = legend;
               json.series = series;
               $('#container').highcharts(json);
            });
            });
       }
       function mycookie() {
           var a1=$('input[name="month"]:checked').val();
           Cookies.set("mycookie",a1);
           Document.getElementById("selected").innerHTML=a1;
       }
       function filterFunction() {
          var input, filter, ul, li, a, i;
          input = document.getElementById("myInput");
          filter = input.value.toUpperCase();
          var array_keys = new Array();
          var array_values = new Array();
          $.post("http://localhost:8889/ddd", {keyvalue: filter}, function (data) {
            for (var key in data){
              array_keys.push(key);
            }
            for (var i=0 ; i<array_keys.length;i++){
              array_values.push(data[array_keys[i]]);
            }
            var index=0;

            const mynode=document.getElementById("target");
            while (mynode.hasChildNodes()){
              mynode.removeChild(mynode.lastChild);
            }
            for(var a=0; a<array_keys.length;a++){
              var newSelect=document.createElement('option');
              newSelect.value=array_keys[index];
              newSelect.innerHTML=array_keys[index];
              document.getElementById("target").appendChild(newSelect);
              index++;
            }
          });
          div = document.getElementById("myDropdown");
          a = div.getElementsByTagName("a");
          for (i = 0; i < a.length; i++) {
            txtValue = a[i].textContent || a[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              a[i].style.display = "";
            } else {
              a[i].style.display = "none";
            }
          }
        }


      </script>
