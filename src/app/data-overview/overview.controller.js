(function() {
	'use strict';
	angular.module('auth')
	.controller('DataOverviewController', ['$http', 'GET_LIST_URL', 'METHOD', '$routeParams', 
	   function($http, GET_LIST_URL, METHOD, $routeParams) {
		var reportId = $routeParams.reportId;
		var $ = angular.element;
		$http({
			url: GET_LIST_URL,
			method: METHOD,
			data: {'reportId': reportId}
		}).then(function(resp) {
			var tabHtml = "";
			var tabContentHtml = "";
			var result = resp.data;
			var userId = 1;
			//渲染tab
			for (var i = 0, len = result.sheetInfo.length; i < len; i++) {
				if (i == 0) {
					tabHtml += '<li class="active"><a class="litab sheetId"  name="' + result.sheetInfo[i].sheetId +'"  href="#' + result.sheetInfo[i].sheetId +'" data-toggle="tab" >' + result.sheetInfo[i].sheetName + '</a><i class="close-tab glyphicon glyphicon-remove" style="font-size: 10px;" title="删除报表"></i></li>';
				} else	{
					tabHtml += '<li><a class="litab sheetId"  name="' + result.sheetInfo[i].sheetId +'"  href="#' + result.sheetInfo[i].sheetId +'" data-toggle="tab" >' + result.sheetInfo[i].sheetName + '</a><i class="close-tab glyphicon glyphicon-remove" style="font-size: 10px;" title="删除报表"></i></li>';
				}
			};
			$("#tab").html(tabHtml);
			$(".close-tab").hide();//把删除图表隐藏
			//渲染tabcontent
			if (result.sheetInfo.length > 0) {
				//$("#diagrameditrow").show();
				getTabContent(userId,result.sheetInfo[0].sheetId);
			} else {

				$("#diagrameditrow").hide();
				$(".row.big").html("");
			}
		}, function(error) {
			console.log(error)
		});
	}]);
})(); 

	//加载图表信息
	function getTabContent(userId, sheetId) {

		var response = getDiagramBySheetId(userId,sheetId);
		if (response.status == 0) {
			var diagrams = response.diagrams;
			$(".row.big").html("");
			for (var i = 0, len = diagrams.length; i < len; i++) {
				if( i == 0) {
					if (diagrams[i].size == "1") {
						var h3content = diagrams[i].diagram_name + '<i class="glyphicon glyphicon-edit plus-diagram  diagramedit diagramupdate" title="修改图表" name="' + diagrams[i].diagramId + '" style="display:none;"></i>&nbsp;&nbsp;<i class="glyphicon glyphicon-remove plus-diagram diagramedit diagramremove"  title="删除图表"  name="' + diagrams[i].diagramId + '"   style="display:none;">&nbsp;|&nbsp;</i>';
						var sourceNode = document.getElementById("big");
						var clonedNode = sourceNode.cloneNode(true);
						clonedNode.setAttribute("id", "diagram" + diagrams[i].diagramId);
						clonedNode.setAttribute("diagram-type", diagrams[i].diagram_type);
						$(clonedNode).addClass("move");
						//if (diagrams[i].diagramType == "1") {
						//	h3content += '<button class="button-detail" name="' + diagrams[i].diagramId + '">全部问题</button>';
						//}
						$(clonedNode).find('.panel-title').html(h3content);
						$(".row.big").html(clonedNode);
						$("#chartbig").attr("id","chart" + diagrams[i].diagramId);//修改panel-body放数据的div的id
					} else {
						var h3content = diagrams[i].diagram_name + '<i class="glyphicon glyphicon-edit plus-diagram  diagramedit diagramupdate"  title="修改图表"  name="' + diagrams[i].diagramId + '"  style="display:none;"></i>&nbsp;&nbsp;<i class="glyphicon glyphicon-remove plus-diagram diagramedit diagramremove"  title="删除图表"  name="' + diagrams[i].diagramId + '"  style="display:none;">&nbsp;|&nbsp;</i>';
						var sourceNode = document.getElementById("small");
						var clonedNode = sourceNode.cloneNode(true);
						clonedNode.setAttribute("id", "diagram" + diagrams[i].diagramId);
						clonedNode.setAttribute("diagram-type", diagrams[i].diagram_type);
						$(clonedNode).addClass("move");
						//if (diagrams[i].diagramType == "1") {
						//	h3content += '<button class="button-detail" name="' + diagrams[i].diagramId + '">全部问题</button>';
						//}
						$(clonedNode).find('.panel-title').html(h3content);
						$(".row.big").html(clonedNode);
						$("#chartsmall").attr("id","chart" + diagrams[i].diagramId);//修改panel-body放数据的div的idjquet
					}

				} else {
					if (diagrams[i].size == "1") {
						var h3content = diagrams[i].diagram_name + '<i class="glyphicon glyphicon-edit plus-diagram diagramedit diagramupdate"  title="修改图表"  name="' + diagrams[i].diagramId + '"  style="display:none;"></i>&nbsp;&nbsp;<i class="glyphicon glyphicon-remove plus-diagram diagramedit diagramremove"  title="删除图表"  name="' + diagrams[i].diagramId + '"  style="display:none;">&nbsp;|&nbsp;</i>';
						var sourceNode = document.getElementById("big");
						var clonedNode = sourceNode.cloneNode(true);
						clonedNode.setAttribute("id", "diagram" + diagrams[i].diagramId);
						clonedNode.setAttribute("diagram-type", diagrams[i].diagram_type);
						$(clonedNode).addClass("move");
						//if (diagrams[i].diagramType == "1") {
						//	h3content += '<button class="button-detail" name="' + diagrams[i].diagramId + '">全部问题</button>';
						//}
						$(clonedNode).find('.panel-title').html(h3content);
						$(".row.big").append(clonedNode);
						$("#chartbig").attr("id","chart" + diagrams[i].diagramId);//修改panel-body放数据的div的id
					} else {
						var h3content = diagrams[i].diagram_name + '<i class="glyphicon glyphicon-edit plus-diagram diagramedit diagramupdate"  title="修改图表"  name="' + diagrams[i].diagramId + '"  style="display:none;"></i>&nbsp;&nbsp;<i class="glyphicon glyphicon-remove plus-diagram diagramedit  diagramremove"  title="删除图表"  name="' + diagrams[i].diagramId + '"   style="display:none;">&nbsp;|&nbsp;</i>';
						var sourceNode = document.getElementById("small");
						var clonedNode = sourceNode.cloneNode(true);
						clonedNode.setAttribute("id", "diagram" + diagrams[i].diagramId);
						clonedNode.setAttribute("diagram-type", diagrams[i].diagram_type);
						$(clonedNode).addClass("move");
						//if (diagrams[i].diagramType == "1") {
						//	h3content += '<button class="button-detail" name="' + diagrams[i].diagramId + '">全部问题</button>';
						//}
						$(clonedNode).find('.panel-title').html(h3content);
						$(".row.big").append(clonedNode);
						$("#chartsmall").attr("id","chart" + diagrams[i].diagramId);
					}
				}
			}
			setChartContent(userId,response);
		} else {
			alert(response.message);
			loginFail(response);
		}
	}



	function setChartContent(userId,response) {
		var diagrams = response.diagrams;
		for(var i = 0, len = diagrams.length; i < len; i++) {
			//获取数据
			var response = getDiagramDataByDiagramId(userId,diagrams[i]);
			loginFail(response);
		}

	}


	function drawChart(userId,diagrams,data) {

		var chart = echarts.init(document.getElementById("chart" + diagrams.diagramId),theme);
		var effectIndex = -1;
		var effect = ['spin' , 'bar' , 'ring' , 'whirling' , 'dynamicLine' , 'bubble'];
		effectIndex = ++effectIndex % effect.length;


		if (data !=null &&typeof(data.status) != 'undefined' && data.status == 0 && data.diagramData != null) {
			if (data.diagramData.xAxis.xData.length == 0) {
				chart.showLoading({
					text : '暂无数据',
					effect : 'bubble',
					textStyle : {
						fontSize : 30
					}
				});
			} else {
				chart.hideLoading();
				switch(diagrams.diagramType) {
					case "1":
						//修改横轴样式
						option0.yAxis[0].data = [];
						for(var w = 0; w < data.diagramData.xAxis.xData.length; w++) {
							//option0.yAxis[0].data[w] = data.diagramData.xAxis.xData[w].split("-").join("\n");
							option0.yAxis[0].data[w] = data.diagramData.xAxis.xData[w];
						}
						//option0.yAxis[0].data = data.diagramData.xAxis.xData;
						option0.series = [];
						option0.legend.data = []//初始化

						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {

							option0.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var item = {
								itemStyle : {
									normal: {
										label : {
											show: true,
											position: 'right'
										},
										color:'#7dc1f2'
									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'bar',
								barWidth:20,
								data:[],
							};
							for (var h = 0,lenh = data.diagramData.yAxis.series[j].data.length; h < lenh; h++) {
								var ratio = data.diagramData.yAxis.series[j].ratio[h];
								//加上处理状态
								var deal = data.diagramData.yAxis.series[j].deal[h];
								//mock
								//var deal = "***已处理"
								var seriesdata = {
									value : data.diagramData.yAxis.series[j].data[h],             //自定义特殊tooltip，仅对该item有效，详见tooltip
									itemStyle:{
										normal: {
											label : {
												show: true,
												formatter: data.diagramData.yAxis.series[j].data[h] + " (" + ratio + "%)(" + deal + ")",
											}

										}
									},            //自定义特殊itemStyle，仅对该item有效，详见itemStyle
									tooltip:{
										trigger: 'axis',
										showDelay: 0,
										hideDelay: 50,
										transitionDuration:0,
										backgroundColor : 'white',
										textStyle : {
											color: 'black',
											decoration: 'none',
											fontSize: 15
										},
										formatter: function (params,ticket,callback) {
											console.log(params);
											var res = 'Function formatter : <br/>' + params[0].name;
											for (var i = 0, l = params.length; i < l; i++) {
												res += '<br/>' + params[i].seriesName + ' : ' + params[i].value + + " (" + ratio + "%)";
											}
											return 'loading';
										}
									},
								};
								item.data.push(seriesdata);
							}

							option0.series.push(item);

						}
						chart.setOption(option0);
						chartarray.push(chart);
						//柱状图点击事件
						var ecConfig = echarts.config;
						chart.on(ecConfig.EVENT.CLICK, function(param) {
							var questionName = param.name;
							var serviceName = '';
							var questionId = data.diagramData.yAxis.series[0].questionId[param.dataIndex];
							//mock
							//var questionId = "17019";
							window.open("/crm/assign/detail?questionId=" + questionId);
							//window.open("/crm/question/index?diagramId=" + diagrams.diagramId
							//	+ "&questionName=" + encodeURI(encodeURI(questionName))
							//	+ "&serviceName=" + encodeURI(encodeURI(serviceName)));
						});

						break;
					case "2":
						option1.legend.data = []//初始化
						option1.xAxis[0].data = data.diagramData.xAxis.xData;
						option1.series = [];//初始化

						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {
							option1.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : {
									normal: {
										label : {
											show: false,
											position: 'top',
											formatter:function(v) {
												return v.data;// + '%';
											}
										}

									},
									lineStyle :{
										type:'dotted'
									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'line',
								data:data.diagramData.yAxis.series[j].data,
								smooth:true,


							};
							option1.series.push(serie);

						}
						chart.setOption(option1);
						console.log(option1);
						chartarray.push(chart);
						break;
					case "3" :
						option2.legend.selected = {
							"反馈量" : true,
							"订单量" : false,
						}
						option2.legend.data = []//初始化
						option2.xAxis[0].data = data.diagramData.xAxis.xData;
						option2.series = [];//初始化
						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {

							option2.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : {
									normal: {
										label : {
											show: true,
											position: 'top'
										}

									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'bar',
								//barWidth:20,
								data:data.diagramData.yAxis.series[j].data,

							};
							option2.series.push(serie);

						}
						chart.setOption(option2);
						chartarray.push(chart);
						break;
					case "4":
						option3.legend.data = []//初始化
						option3.xAxis[0].data = data.diagramData.xAxis.xData;
						option3.series = [];//初始化
						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {

							option3.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : {
									normal: {
										label : {
											show: true,
											position: 'top',
											formatter:function(v) {
												return v.data + '%';
											}
										},
									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'line',
								data:data.diagramData.yAxis.series[j].data,
								smooth:true,
							};
							option3.series.push(serie);

						}
						chart.setOption(option3);
						chartarray.push(chart);
						break;
					case "5":
						option4.legend.data = []//初始化
						option4.series = [];//初始化
						option4.xAxis[0].data = data.diagramData.xAxis.xData;
						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {
							option5.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : itemStyle,
								name:data.diagramData.yAxis.series[j].name,
								type:'bar',
								//barWidth:20,
								data:[]
							};
							for (var h = 0,lenh = data.diagramData.yAxis.series[j].data.length; h < lenh; h++) {
								var title = data.diagramData.yAxis.series[j].title ? data.diagramData.yAxis.series[j].title[h] : 'no title found';

								var titlevalue ;
								if (j == 0) {
									titlevalue = title.split("-").join("\n") + "\n" + data.diagramData.yAxis.series[j].data[h];
								} else {
									titlevalue = data.diagramData.yAxis.series[j].data[h];
								}
								var seriesdata = {
									value : data.diagramData.yAxis.series[j].data[h],             //自定义特殊tooltip，仅对该item有效，详见tooltip
									tooltip:{
										trigger: 'item',
										backgroundColor: 'black',
										axisPointer :{
											type :'line'
										},
										formatter:title + "<br> 数目："  +  data.diagramData.yAxis.series[j].data[h],
										position:function(p) {
											return [p[0] - 10,p[1] + 40]
										}
									},
									itemStyle:{
										normal: {
											label : {
												show: true,
												position: 'top',
												formatter:titlevalue,
											}

										}
									}            //自定义特殊itemStyle，仅对该item有效，详见itemStyle
								};
								serie.data.push(seriesdata);
							}
							option4.series.push(serie);

						}
						chart.setOption(option4);
						chartarray.push(chart);
						//柱状图点击事件
						var ecConfig = echarts.config;
						chart.on(ecConfig.EVENT.CLICK, function(param) {
							var serviceName = param.name;
							var questionName = data.diagramData.yAxis.series[param.seriesIndex].title[param.dataIndex];
							var questionId = data.diagramData.yAxis.series[param.seriesIndex].questionId[param.dataIndex];
							//mock
							//var questionId = "17019";
							window.open("/crm/assign/detail?questionId=" + questionId);

							//window.open("/crm/question/index?diagramId=" + diagrams.diagramId
							//	+ "&questionName=" + encodeURI(encodeURI(questionName))
							//	+ "&serviceName=" + encodeURI(encodeURI(serviceName)));
						});

						break;
					case "6":
						option5.legend.data = []//初始化
						option5.xAxis[0].data = data.diagramData.xAxis.xData;
						option5.series = [];//初始化
						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {

							option5.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : {
									normal: {
										label : {
											show: true,
											position: 'top',
											formatter:function(v) {
												return v.data + '%';
											}
										},
										color:'#7dc1f2'

									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'bar',
								barWidth:40,
								data:data.diagramData.yAxis.series[j].data
							};
							option5.series.push(serie);

						}
						chart.setOption(option5);
						chartarray.push(chart);
						break;
					case "7" :
						//option6.legend.data = []//初始化
						option6.xAxis[0].data = data.diagramData.xAxis.xData;
						//option6.series = [];//初始化
						option6.series[0].data = data.diagramData.yAxis.series[1].data;
						option6.series[1].data = data.diagramData.yAxis.series[2].data;
						option6.series[2].data = data.diagramData.yAxis.series[0].data;
						chart.setOption(option6);
						chartarray.push(chart);
						//柱状图点击事件
						break;
					case "8" :
						option7.legend.data = []//初始化
						option7.legend.data = data.diagramData.xAxis.xData;
						for (var j=0, lenj = data.diagramData.yAxis.series[0].data.length; j < lenj; j++) {
							option7.series[0].data[j].value =  data.diagramData.yAxis.series[0].data[j];
							option7.series[0].data[j].name =  data.diagramData.xAxis.xData[j];
						}
						chart.setOption(option7);
						chartarray.push(chart);
						//饼图点击事件
						var ecConfig = echarts.config;
						chart.on(ecConfig.EVENT.CLICK, function(param) {
							var emotional_name = param.name;
							window.open("/crm/sentiment/sentimentctg/index?p=workbench/list&diagramId=" + diagrams.diagramId
								+ "&emotional_name=" + encodeURI(encodeURI(emotional_name)));
						});
						break;
					case "9":
						option8.legend.data = []//初始化
						option8.xAxis[0].data = data.diagramData.xAxis.xData;
						option8.series = [];//初始化
						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {

							option8.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : {
									normal: {
										label : {
											show: false,
											position: 'top',
											formatter:function(v) {
												return v.data + '%';
											}
										},
									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'line',
								data:data.diagramData.yAxis.series[j].data,
								smooth:true,
							};
							option8.series.push(serie);

						}
						chart.setOption(option8);
						chartarray.push(chart);
						break;
					case "10":
						option9.legend.data = []//初始化
						option9.xAxis[0].data = data.diagramData.xAxis.xData;
						option9.series = [];//初始化
						for (var j=0, lenj = data.diagramData.yAxis.size; j < lenj; j++) {

							option9.legend.data[j] =  data.diagramData.yAxis.series[j].name;
							var serie = {
								itemStyle : {
									normal: {
										label : {
											show: false,
											position: 'top',
											formatter:function(v) {
												return v.data + '%';
											}
										},
									}
								},
								name:data.diagramData.yAxis.series[j].name,
								type:'line',
								data:data.diagramData.yAxis.series[j].data,
								smooth:true,
							};
							option9.series.push(serie);

						}
						chart.setOption(option9);
						chartarray.push(chart);
						break;
				}

			}

		} else {
			chart.showLoading({
				text : data.message,
				effect : 'bubble',
				textStyle : {
					fontSize : 30
				}
			});
		}
	}


	window.onresize = function(){
		for(var i = 0; i < chartarray.length;i++) {
			chartarray[i].resize();
		}
	};



	//topn问题柱状图点击事件

	function barClick(param) {

	}

	//全流程图标柱状图点击事件

	function serviceStateClick(param) {
		var questionName = seriestitle.series[param.seriesIndex].title[param.dataIndex];
	}

	function getDiagramBySheetId(userId,sheetId) {
		var response = {};
		var requestData = {
			"sheetId":sheetId
		};
		$.ajax({
			type : "get",
			url : "api/get.json",
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(requestData),
			dataType : "json",
			async : false,
			success : function(JData) {
				response = JData;

			},
			error : function() {
				response = {"status":1,"message":"查询图表失败，请稍后重试"};
			}

		});
		return response;

	}
	
	function getDiagramDataByDiagramId(userId,diagrams) {
		var response = {};
		var requestData = {
			"diagramId":diagrams.diagramId
		};
		var chart = echarts.init(document.getElementById("chart" + diagrams.diagramId),theme);

		$.ajax({
			type : "get",
			url : "api/getData.json",
			contentType : "application/json;charset=utf-8",
			data : JSON.stringify(requestData),
			dataType : "json",
			async : true,
			beforeSend : function() {
				chart.showLoading({
					text: '正在努力的读取数据中...',    //loading话术
					textStyle:{
						fontSize:20,
					},
					effect :"whirling",
				});
			},
			success : function(JData) {
				response = JData;
			},
			error : function() {
				response = {
					"status":1,
					"message":"获取图表数据失败，请稍后重试！"
				};
			},
			complete : function() {
				chart.hideLoading();
				drawChart(userId,diagrams,response);
			}

		});

		return response;
	}
	
	var theme = {
		    // 默认色板
		    color: [
		        '#fe9e53','#7dc1f2','#ff8480','#2b821d',
		        '#005eaa','#339ca8','#cda819','#32a487'
		    ],

		    // 图表标题
		    title: {
		        textStyle: {
		            fontWeight: 'normal'
		        }
		    },
		    
		    // 值域
		    dataRange: {
		        itemWidth: 15,             // 值域图形宽度，线性渐变水平布局宽度为该值 * 10
		        color:['#1790cf','#a2d4e6']
		    },

		    // 工具箱
		    toolbox: {
		        color : ['#06467c','#00613c','#872d2f','#c47630']
		    },

		    // 提示框
		    tooltip: {
		        backgroundColor: 'rgba(0,0,0,0.6)'
		    },

		    // 区域缩放控制器
		    dataZoom: {
		        dataBackgroundColor: 'rgba(181,195,52,0.3)',            // 数据背景颜色
		        fillerColor: '#f9f9f9',   // 填充颜色
		        handleColor: '#7dc1f2'     // 手柄颜色
		    },
		    
		    // 网格
		    grid: {
		        borderWidth: 0
		    },
		    
		    // 类目轴
		    categoryAxis: {
		        axisLine: {            // 坐标轴线
		            show: false
		        },
		        axisTick: {            // 坐标轴小标记
		            show: false
		        }
		    },

		    // 数值型坐标轴默认参数
		    valueAxis: {
		        axisLine: {            // 坐标轴线
		            show: false
		        },
		        axisTick: {            // 坐标轴小标记
		            show: false
		        },
		        splitArea: {           // 分隔区域
		            show: false,       // 默认不显示，属性show控制显示与否
		            areaStyle: {       // 属性areaStyle（详见areaStyle）控制区域样式
		                color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
		            }
		        }
		    },
		    
		    timeline : {
		        lineStyle : {
		            color : '#005eaa'
		        },
		        controlStyle : {
		            normal : { color : '#005eaa'},
		            emphasis : { color : '#005eaa'}
		        }
		    },

		    // K线图默认参数
		    k: {
		        itemStyle: {
		            normal: {
		                color: '#c12e34',          // 阳线填充颜色
		                color0: '#2b821d',      // 阴线填充颜色
		                lineStyle: {
		                    width: 1,
		                    color: '#c12e34',   // 阳线边框颜色
		                    color0: '#2b821d'   // 阴线边框颜色
		                }
		            }
		        }
		    },
		    
		    map: {
		        itemStyle: {
		            normal: {
		                areaStyle: {
		                    color: '#ddd'
		                },
		                label: {
		                    textStyle: {
		                        color: '#c12e34'
		                    }
		                }
		            },
		            emphasis: {                 // 也是选中样式
		                areaStyle: {
		                    color: '#e6b600'
		                },
		                label: {
		                    textStyle: {
		                        color: '#c12e34'
		                    }
		                }
		            }
		        }
		    },
		    
		    force : {
		        itemStyle: {
		            normal: {
		                linkStyle : {
		                    color : '#005eaa'
		                }
		            }
		        }
		    },
		    
		    chord : {
		        itemStyle : {
		            normal : {
		                borderWidth: 1,
		                borderColor: 'rgba(128, 128, 128, 0.5)',
		                chordStyle : {
		                    lineStyle : {
		                        color : 'rgba(128, 128, 128, 0.5)'
		                    }
		                }
		            },
		            emphasis : {
		                borderWidth: 1,
		                borderColor: 'rgba(128, 128, 128, 0.5)',
		                chordStyle : {
		                    lineStyle : {
		                        color : 'rgba(128, 128, 128, 0.5)'
		                    }
		                }
		            }
		        }
		    },
		    
		    gauge : {
		        axisLine: {            // 坐标轴线
		            show: true,        // 默认显示，属性show控制显示与否
		            lineStyle: {       // 属性lineStyle控制线条样式
		                color: [[0.2, '#2b821d'],[0.8, '#005eaa'],[1, '#c12e34']], 
		                width: 5
		            }
		        },
		        axisTick: {            // 坐标轴小标记
		            splitNumber: 10,   // 每份split细分多少段
		            length :8,        // 属性length控制线长
		            lineStyle: {       // 属性lineStyle控制线条样式
		                color: 'auto'
		            }
		        },
		        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
		            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                color: 'auto'
		            }
		        },
		        splitLine: {           // 分隔线
		            length : 12,         // 属性length控制线长
		            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
		                color: 'auto'
		            }
		        },
		        pointer : {
		            length : '90%',
		            width : 3,
		            color : 'auto'
		        },
		        title : {
		            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                color: '#333'
		            }
		        },
		        detail : {
		            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
		                color: 'auto'
		            }
		        }
		    },
		    
		    textStyle: {
		        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
		    }
		};
	function loginFail(response) {
	    if (response.status == 1 && response.hasOwnProperty("location")  ) {
	        location.href = response.location;
	    }
	}
	
	//top问题的option
	var option0 = {
	    borderWidth: 0,
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'shadow',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	        x:400,
	        x2:200,
	        y:30,
	        y2:0
	    },
	    legend: {
	        show:false,
	        data:[]
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType: {show: false, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'value',
	            show :false,
	            boundaryGap : [0, 0.01],
	            axisLine : {
	                show:true
	            },
	            splitLine: {
	                show: false
	            }

	        }
	    ],
	    yAxis : [
	        {
	            type : 'category',
	            splitLine: {
	                show: false
	            },
	            axisLine:{show :false},
	            axisTick:{show:false},
	            data : [],
	            axisLabel : {
	                textStyle : {
	                    color : '#44484e',
	                }
	            },
	            //axisLabel: {
	            //    rotate: -60,
	            //},
	            splitArea:{
	                show:true,
	                areaStyle:{
	                    "color": [
	                        "white",
	                        "#f8fafc",

	                    ]
	                }
	            },
	        }
	    ],
	    series : [
	    ]
	}


	//top问题趋势
	var option1 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'line',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	    },
	    legend: {
	        data:[]
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom : {
	        show : true,
	        realtime: true,
	        start : 0,
	        end : 100
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            axisLine: {
	                show:true,
	            },
	            data : [],
	            splitLine: {
	                show:true,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:'反馈数量',
	            axisLabel:{formatter:'{value}'},
	            axisLine: {
	                show:true,
	            },
	            splitLine: {
	                show:false,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    series : [

	    ]
	};

	//订单量与反馈量对比
	var option2 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'shadow',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	    },
	    legend: {
	        data:[]
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: false, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            name:'产品线',
	            splitLine: {
	                show: false
	            },
	            axisTick :{//坐标轴小刻度
	                show:true,
	                //length :10,
	                //lineStyle :{
	                //    width :4,
	                //    color : 'blue',
	                //    type : 'dashed',
	                //},
	            },
	            data : [],
	            axisLine: {
	                show:true,
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:'数量',
	            splitLine: {
	                lineStyle: {
	                    type:"dashed"
	                }

	            },
	            axisLine: {
	                show:true,
	            }
	        }
	    ],
	    series : [
	    ]
	};

	//CPO环比趋势
	var option3 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'line',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	    },
	    legend: {
	        data:[],
	        show:true,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom : {
	        show : true,
	        realtime: true,
	        start : 0,
	        end : 100
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            axisLine: {
	                show:true,
	            },
	            data : [],
	            //axisLabel: {
	            //    rotate: 60,
	            //},
	            splitLine: {
	                show:true,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:'CPO',
	            axisLabel:{formatter:'{value}%'},
	            axisLine: {
	                show:true,
	            },
	            splitLine: {
	                show:false,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    series : [

	    ]
	};


	//CPO地域分布排行榜
	var option5 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'shadow',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	    },
	    legend: {
	        data:[],
	        show:false,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: false, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom : {
	        show : false,
	        realtime: true,
	        start : 0,
	        end : 100
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            splitLine: {
	                show: false
	            },
	            axisTick :{//坐标轴小刻度
	                show:true,
	            },
	            data : [],
	            axisLine: {
	                show:true,
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            show:true,
	            itemStyle : {
	                normal: {
	                    color:'#7dc1f2'
	                }
	            },
	            axisLabel:{formatter:'{value}'},
	            type : 'value',
	            name:'CPO',
	            axisLabel:{formatter:'{value}%'},
	            axisLine: {
	                show:true,
	            },
	            splitLine: {
	                show:true,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    series : [
	    ]
	};

	//全流程问题反馈分布
	var zrColor = zrender.tool.color;
	var colorList = [
	    '#ff7f50','#87cefa','#da70d6','#32cd32','#6495ed',
	    '#ff69b4','#ba55d3','#cd5c5c','#ffa500','#40e0d0'
	];
	var itemStyle = {
	    normal: {
	        color: function(params) {
	            if (params.dataIndex < 0) {
	                // for legend
	                return zrColor.lift(
	                    colorList[colorList.length - 1], params.seriesIndex * 0.1
	                );
	            }
	            else {
	                // for bar
	                return zrColor.lift(
	                    colorList[params.dataIndex], params.seriesIndex * 0.1
	                );
	            }
	        }
	    }
	};

	var option4 = {
	    tooltip: {
	        trigger:'item',
	        backgroundColor: 'black',
	        axisPointer: {
	            type: 'line'
	        },
	        formatter: function(params) {
	            // for text color
	            var color = colorList[params[0].dataIndex];
	            var res = '<div style="color:' + color + '">';
	            res += '<strong>' + params[0].name + '</strong>'
	            for (var i = 0, l = params.length; i < l; i++) {
	                res += '<br/>' + params[i].seriesName + ' : ' + params[i].value
	            }
	            res += '</div>';
	            return res;
	        }
	    },
	    legend: {
	        x: 'right',
	        data:['Top1','Top2','Top3'],
	        show:false
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            mark: {show: false},
	            dataView: {show: false, readOnly: false},
	            restore: {show: true},
	            saveAsImage: {show: true}
	        }
	    },
	    calculable: true,
	    grid: {
	        y: 80,
	        y2: 40,
	        x2: 40
	    },
	    xAxis: [
	        {
	            type: 'category',
	            data: [],
	            axisLabel : {
	                show :true,
	                textStyle :{
	                    fontSize:16,
	                }
	            },
	            axisLine: {
	                show :true,
	            },
	            axisTick :{//坐标轴小刻度
	                show:true,
	                //length :20,
	                //lineStyle :{
	                //    width :6,
	                //    color : '#ff8c03',
	                //    type : 'dashed',
	                //},
	            },
	            show :true,
	            splitLine: {
	                show:false,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            splitLine: {
	                lineStyle: {
	                    type:"dashed"
	                }

	            },
	        }
	    ],
	    series: []
	};

	//声量总额趋势图option
	var option6 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    legend: {
	        data:[ '正面','中立','负面',]
	    },
	    dataZoom : {
	        show : true,
	        realtime: true,
	        start : 0,
	        end : 100
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    yAxis : [
	        {
	            type : 'value',
	            name:'反馈量'

	        }
	    ],
	    xAxis : [
	        {
	            type : 'category',
	            splitLine :{
	                show:false,
	            },
	            data : ['周一','周二','周三','周四','周五','周六','周日']
	        }
	    ],
	    color:['#74d486','#fdbc40','#ff8480',],
	    series : [
	        {
	            name:'负面',
	            barWidth:20,
	            type:'bar',
	            stack: '总量',
	            itemStyle : { normal: {label : {show: false, position: 'insideTop'}},color:'#ff8480'},
	            data:[320, 302, 301, 334, 390, 330, 320]
	        },
	        {
	            name:'中立',
	            type:'bar',
	            barWidth:20,
	            stack: '总量',
	            itemStyle : { normal: {label : {show: false, position: 'insideTop'}},color:'#fdbc40'},
	            data:[120, 132, 101, 134, 90, 230, 210]
	        },
	        {
	            name:'正面',
	            type:'bar',
	            barWidth:20,
	            stack: '总量',
	            itemStyle : { normal: {label : {show: false, position: 'insideTop'}},color:'#74d486'},
	            data:[220, 182, 191, 234, 290, 330, 310]
	        }
	    ]
	};

	//情感方向分布图
	var option7 = {
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient : 'vertical',
	        x : 'left',
	        data:['直接访问','邮件营销','联盟广告']
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {
	                show: false,
	                type: ['pie', 'funnel'],
	                option: {
	                    funnel: {
	                        x: '25%',
	                        width: '50%',
	                        funnelAlign: 'left',
	                        max: 1548
	                    }
	                }
	            },
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : false,
	    color:["#74d486","#ff8480","#fdbc40"],
	    series : [
	        {
	            name:'反馈量',
	            type:'pie',
	            radius : ['50%', '70%'],
	            data:[
	                {value:335, name:'直接访问'},
	                {value:310, name:'邮件营销'},
	                {value:234, name:'联盟广告'}
	            ],
	            itemStyle:{
	                normal:{
	                    label:{
	                        formatter:"{b}\n{d}%"
	                    },

	                }
	            }
	        }
	    ]
	};

	//差评率趋势
	var option8 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'line',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	    },
	    legend: {
	        data:[],
	        show:true,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom : {
	        show : true,
	        realtime: true,
	        start : 0,
	        end : 100
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            axisLine: {
	                show:true,
	            },
	            data : [],
	            //axisLabel: {
	            //    rotate: 60,
	            //},
	            splitLine: {
	                show:true,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:'差评率',
	            axisLabel:{formatter:'{value}%'},
	            axisLine: {
	                show:true,
	            },
	            splitLine: {
	                show:false,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    series : [

	    ]
	};


	//成交率趋势
	var option9 = {
	    tooltip : {
	        trigger: 'axis',
	        axisPointer:{
	            type: 'line',
	        }
	    },
	    grid : {
	        borderWidth: 0,
	    },
	    legend: {
	        data:[],
	        show:true,
	    },
	    toolbox: {
	        show : true,
	        feature : {
	            mark : {show: false},
	            dataView : {show: false, readOnly: false},
	            magicType : {show: false, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    dataZoom : {
	        show : true,
	        realtime: true,
	        start : 0,
	        end : 100
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            axisLine: {
	                show:true,
	            },
	            data : [],
	            //axisLabel: {
	            //    rotate: 60,
	            //},
	            splitLine: {
	                show:true,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            name:'成交率',
	            axisLabel:{formatter:'{value}%'},
	            axisLine: {
	                show:true,
	            },
	            splitLine: {
	                show:false,
	                lineStyle: {
	                    type: 'dashed',
	                    shadowColor: 'rgba(0,0,0,0)',
	                    shadowBlur: 5,
	                    shadowOffsetX: 3,
	                    shadowOffsetY: 3,
	                },
	            }
	        }
	    ],
	    series : [

	    ]
	};
	
	var chartarray = [];