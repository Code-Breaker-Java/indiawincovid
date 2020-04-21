import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CoronaServiceService} from '../corona-service.service';
import { Chart } from 'chart.js';
// import { read } from 'fs';
// import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-corona',
  templateUrl: './corona.component.html',
  styleUrls: ['./corona.component.css']
})
export class CoronaComponent implements OnInit {
  time_series:any = [];
  district_wise:any = [];
  chart;
  
  district: Array<any> ;
  constructor(private service: CoronaServiceService) { }
 
  date: Array<any> = [];
  daily_confirm_cases: Array<any>;
  daily_decease_cases: Array<any>;
  daily_recovere_cases: Array<any>;
 
  total_confirm_cases: Array<any>;
  total_decease_cases: Array<any>;
  total_recovere_cases: Array<any>;
  districtDetail: Array<any>;

  daily_confirm_graph: Array<any>=[];
  daily_decease_graph: Array<any>=[];
  daily_date_graph:  Array<any> = [];
  daily_recovere_graph: Array<any>=[];

  total_confirm_graph: Array<any>=[];
  total_decease_graph: Array<any>=[];
  total_date_graph:  Array<any> = [];
  total_recovere_graph: Array<any>=[];
  distData: Array<any>;
  stateData: Array<any>=[];
  last
  // subscriber: ISubscription;

  ngOnInit() {
    
    console.log("------------------------------------------------------");
    this.time_series = this.service.getcases_time_series();
    console.log(this.time_series);
    // this.subscriber = 
     this.service.getcases_time_series().subscribe(res=>{
      this.time_series=res;
      this.date = this.time_series.cases_time_series.map(function(a) {return a["date"].trim();});
      this.daily_confirm_cases =  this.time_series.cases_time_series.map(function(a) {return a["dailyconfirmed"].trim();});
      this.daily_decease_cases = this.time_series.cases_time_series.map(function(a) {return a["dailydeceased"].trim();});
      this.daily_recovere_cases = this.time_series.cases_time_series.map(function(a) {return a["dailyrecovered"].trim();});
      this.total_confirm_cases =  this.time_series.cases_time_series.map(function(a) {return a["totalconfirmed"].trim();});
      this.total_decease_cases = this.time_series.cases_time_series.map(function(a) {return a["totaldeceased"].trim();});
      this.total_recovere_cases = this.time_series.cases_time_series.map(function(a) {return a["totalrecovered"].trim();});
      
      this.daily_confirm_graph = this.daily_confirm_cases;
      this.daily_decease_graph = this.daily_decease_cases;
      this.daily_recovere_graph = this.daily_recovere_cases;
      this.daily_date_graph = this.date;

      this.total_confirm_graph = this.total_confirm_cases;
      this.total_decease_graph = this.total_decease_cases;
      this.total_recovere_graph = this.total_recovere_cases;
      this.total_date_graph = this.date;

      console.log(res);
      this.loadDailyGraph();
      this.loadTotalGraph();
      this.loadIndiaMap();
      this.time_series.statewise.splice(this.time_series.statewise.length-4,4);
      
    });
    console.log(this.time_series);
    console.log("--------------------------------------------");
    this.district_wise = this.service.getdistrict_wise();
    this.service.getdistrict_wise().subscribe(res=>{
      this.district_wise = res;
      console.log(res);
    });
    console.log(this.district_wise);
    
    console.log("---niche------------------date-----------------------");
    console.log(this.date);
    console.log("---------------------date-----------------------");
    
 
  }

  loadIndiaMap(){
    // Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
setTimeout(() => {
 
  let Highcharts = window['Highcharts'];
  var data = [
    ['madhya pradesh', 0],
    ['uttar pradesh', 1],
    ['karnataka', 2],
    ['nagaland', 3],
    ['bihar', 4],
    ['lakshadweep', 5],
    ['andaman and nicobar', 6],
    ['assam', 7],
    ['west bengal', 8],
    ['puducherry', 9],
    ['daman and diu', 10],
    ['gujarat', 11],
    ['rajasthan', 12],
    ['dadara and nagar havelli', 13],
    ['chhattisgarh', 14],
    ['tamil nadu', 15],
    ['chandigarh', 16],
    ['punjab', 17],
    ['haryana', 18],
    ['andhra pradesh', 19],
    ['maharashtra', 20],
    ['himachal pradesh', 21],
    ['meghalaya', 22],
    ['kerala', 23],
    ['telangana', 24],
    ['mizoram', 25],
    ['tripura', 26],
    ['manipur', 27],
    ['arunanchal pradesh', 28],
    ['jharkhand', 29],
    ['goa', 30],
    ['nct of delhi', 31],
    ['odisha', 32],
    ['jammu and kashmir', 33],
    ['sikkim', 34],
    ['uttarakhand', 35]
  ];
  console.log(data);
  console.log(this.stateData);
  
  // var max = this.stateData[0].value;
  for (var index = 0; index < data.length; index++) { 
    var ele = this.stateData[index]
    if(ele !=null){
      data[index][0]=  ele.val;
      data[index][1]=  parseInt(ele.value);
      if(this.stateData[index].val=="delhi"){
        data[index][0]= "nct of delhi";
        // data[index][1]=  1500;
        data[index][1]=  this.stateData[index].value;
      }
      else if(this.stateData[index].val=="arunachal pradesh"){
        data[index][0]= "arunanchal pradesh";
        // data[index][1]=  50;
      }
      else if(this.stateData[index].val=="andaman and nicobar islands"){
        data[index][0]= "andaman and nicobar";
      }
    }
    
    
  } 
     
  

  console.log(data);
  // Create the chart
  Highcharts.mapChart('container', {
    chart: {
        map: 'countries/in/custom/in-all-disputed'
    },

    title: {
        text: 'Total cases in India'
    },
    credits: {
      enabled: false
    },
    // subtitle: {
    //     text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/in/custom/in-all-disputed.js">India with disputed territories</a>'
    // },
    // legend: {
    //   enabled: false
    // },
    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },
    exporting: {
      enabled: false
    },
    colorAxis: {
        min: 0
    },
    // plotOptions: {
    //         series: {
    //             point: {
    //                 events: {
    //                     click: function () {
    //                         location.href = 'https://en.wikipedia.org/wiki/' + this.name;
    //                     }
    //                 }
    //             }
    //         }
    //     },
    // series : [{
    //     name: 'Total Cases',
    //     mapData: data,
    //     nullColor: 'red',
    //     // enableMouseTracking: false
    //     states: {
    //       hover: {
    //           color: '#BADA55'
    //       }
    //     },
    //     dataLabels: {
    //       enabled: false,
    //       format: '{point.name}'
    //     }
    // }, {
    //     type: 'mapbubble',
    //     mapData: data,
    //     // name: 'Population 2010',
    //     // joinBy: ['iso-a2', 'code'],
    //     data: data,
    //     minSize: 4,
    //     maxSize: '12%',
    //     tooltip: {
    //         // pointFormat: '{point.code}: {point.z} thousands'
    //     }
    // }]

    series: [{
        data: data,
        name: 'Total Cases',
        
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: false,
            format: '{point.name}'
        }
    }]
  });
}, 500);

    
  }

  loadDailyGraph(){
    this.chart = new Chart('daily',{
      type:'bar',
      options:{
        scales:{
          xAxes: [{
              display: false 
          }]
        },
        responsive: true,
        //chart: {
          // height: '80%'
        // },
        title:{
          display: true,
          text : 'COVID-19 INDIA DAILY GRAPH'
        }
        
      },
      data:{
        
        labels: this.daily_date_graph,
        datasets:[
          {
            type: 'line',
            label: 'Daily Confirm Cases',
            data: this.daily_confirm_graph,
            fill: false,
            backgroundColor:'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)'
          },
          {
            type: 'line',
            label: 'Daily Decease Cases',
            data: this.daily_decease_graph,
            fill: false,
            backgroundColor:'rgba(255,0,0,4)',
            borderColor: 'rgba(255,0,0,4)'
          },
          {
            type: 'line',
            label: 'Daily Recovered Cases',
            data: this.daily_recovere_graph,
            fill: false,
            backgroundColor:'rgba(0,128,0,4)',
            borderColor: 'rgba(0,128,0,4)'
          }
        ]
      }
    });
    
  }
  setDailyGraph(day:number){
    
    if(day==0){
      day = this.daily_confirm_cases.length;
    }
    this.daily_confirm_graph = this.daily_confirm_cases.slice(this.daily_confirm_cases.length-day);
    this.daily_decease_graph = this.daily_decease_cases.slice(this.daily_decease_cases.length-day);
    this.daily_recovere_graph = this.daily_recovere_cases.slice(this.daily_recovere_cases.length-day);
    this.daily_date_graph = this.date.slice(this.date.length-day);
    this.loadDailyGraph();

  }
  loadTotalGraph(){
    this.chart = new Chart('total',{
      type:'bar',
      options:{
        scales:{
          xAxes: [{
              display: false 
          }]
        },
        responsive: true,
        title:{
          display: true,
          text : 'COVID-19 INDIA GRAPH'
        }
        
      },
      data:{
        
        labels: this.total_date_graph,
        datasets:[
          {
            type: 'line',
            label: 'Total Active Cases',
            data: this.total_confirm_graph,
            fill: false,
            backgroundColor:'rgba(255,0,255,0.4)',
            borderColor: 'rgba(255,0,255,0.4)'
          },
          {
            type: 'line',
            label: 'Total Decease Cases',
            data: this.total_decease_graph,
            fill: false,
            backgroundColor:'rgba(255,0,0,4)',
            borderColor: 'rgba(255,0,0,4)'
          },
          {
            type: 'line',
            label: 'Total Recovered Cases',
            data: this.total_recovere_graph,
            fill: false,
            backgroundColor:'rgba(0,128,0,4)',
            borderColor: 'rgba(0,128,0,4)'
          }
        ]
      }
    });
  }

  setTotalGraph(day:number){

    if(day==0)
      day = this.total_confirm_cases.length;
    this.total_confirm_graph = this.total_confirm_cases.slice(this.total_confirm_cases.length-day);
    
    this.total_decease_graph = this.total_decease_cases.slice(this.total_decease_cases.length-day);
    this.total_recovere_graph = this.total_recovere_cases.slice(this.total_recovere_cases.length-day);
    this.total_date_graph = this.date.slice(this.date.length-day);
    this.loadTotalGraph();

  }

  // showDistrictData(val: string){
  //   this.isShow = true;
  //   console.log(this.district_wise);
  //   this.district = this.district_wise[val];
  //   console.log(val);
  //   console.log(this.district);

  // }

  
    showDistrictData(item: any){
      this.districtDetail=[];
      var val = item.state;
      var value = item.confirmed;
      // console.log(this.district_wise);
      this.distData = this.district_wise[item.state].districtData;
      console.log(val);
      // console.log(this.district);
      this.district = Object.entries(this.distData).map((e) => ( { [e[0]]: e[1] } ));
      val = val.toLowerCase();
      // this.stateData.push({val ,total});
      for (let x in this.district) {
        // console.log(Object.keys(this.district[x])[0]);  
        // console.log(this.district[x][Object.keys(this.district[x])[0]].confirmed);
        // console.log(this.district[x][Object.keys(this.district[x])[0]].lastupdatedtime);
        // console.log(this.district[x][Object.keys(this.district[x])[0]].delta.confirmed);
        
        this.districtDetail.push({
          name: Object.keys(this.district[x])[0],
          confirmed: this.district[x][Object.keys(this.district[x])[0]].confirmed,
        });
        this.districtDetail.sort(function(a,b) {
          if(a.name==='Unknown'||b.name==='Unknown')
            return 0;
          return b.confirmed - a.confirmed;
        });
      }
      var ele = { val, value}
      if(this.stateData.length<40 && ele.val!="ladakh")
        this.stateData.push(ele);
      
    }

    isShow(item){
      item["show"];
      item.show = !item.show;
      
    }

    ngDestroy(){
      // this.subscriber.un
    }


}

  