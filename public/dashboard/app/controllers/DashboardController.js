App.controller('DashboardController', function ($rootScope,$scope,AppGlobalData,Proxy, $timeout) {
	$rootScope.rootSpinner=false;
	$scope.chopDisBtnProject=false;
	$scope.listProject=[];
    $scope.userProfile={displayName:AppGlobalData.User.username};
    $scope.chopSwitchUiProject=false;
	$scope.messageSocket="";
	$scope.newMessageAlert=null;
	$scope.switchFormAddProject= function () {
		if($scope.chopSwitchUiProject == true){
			$scope.chopSwitchUiProject=false;
		}else{$scope.chopSwitchUiProject=true;}

	}
	function loadAllProject(){
		$rootScope.rootSpinner=true;
		Proxy.listProject(null,{loading:false})
			.then(function (result) {
				$rootScope.rootSpinner=false;
				$scope.listProject=result.body;
			})
			.catch(function (err) {
				$rootScope.rootSpinner=false;
				console.log(err)
			})
	}
	$scope.initLoadProject= function () {
		loadAllProject();
	}
	
  $scope.addProject= function (data) {
	  $rootScope.rootSpinner=true;
	  $scope.chopDisBtnProject=true;
  	Proxy.addProject({project:data},{loading:false})
		.then(function (result) {
			$scope.chopDisBtnProject=false;
			$scope.chopSwitchUiProject=false
			$rootScope.rootSpinner=false;
			$scope.projectName="";
			loadAllProject();
		})
		.catch(function (err) {
			$scope.chopDisBtnProject=false;
			$scope.chopSwitchUiProject=false;
			$rootScope.rootSpinner=false;
			console.log(err)
		})
  }
	
	$scope.switchToTaskPage= function (data) {
		$rootScope.$broadcast('broadcastScopeProject', { data: data });
	}

	$scope.$on('broadcastToReload', function(event, args) {
		loadAllProject();
	});

	$scope.$on('broadcastToReloadNotResend', function(event, args) {
		Proxy.listProject(null,{loading:false})
			.then(function (result) {
				$rootScope.rootSpinner=false;
				$scope.listProject=result.body;
			})
			.catch(function (err) {
				$rootScope.rootSpinner=false;
				console.log(err)
			})
	});
	/**
	 * socket io
	 */
	var socket = io();
	$scope.listMessageSocketIo=[];
	socket.emit('online');
	$scope.ioCreateMessage= function (data) {
		if(data !== ""){
		socket.emit('new message', { username:$scope.userProfile.displayName,mes: data ,time:new Date()});
		$scope.listMessageSocketIo.push({ username:$scope.userProfile.displayName,mes: data ,time:new Date()});
		$scope.messageSocket="";
		}
		else{
			data = "Buzz";
			socket.emit('new message', { username:$scope.userProfile.displayName,mes: data ,time:new Date()});
			$scope.listMessageSocketIo.push({ username:$scope.userProfile.displayName,mes: data ,time:new Date()});
			$scope.messageSocket="";
		}
		var elem = document.getElementById('box-chat');
		elem.scrollTop = elem.scrollHeight;
	}
	socket.on('new message', function (data) {
		$scope.newMessageAlert=data;
		$scope.$apply();
		$timeout(function () {
			$scope.newMessageAlert=null;
		},2000);
		addMessageIo(data);
	});

	socket.on('online', function (data) {
		$scope.userOnline=data.numUsers;
		$scope.$apply();
	});
	function addMessageIo(data){
		$scope.listMessageSocketIo.push(data);
		$scope.$apply();
		var elem = document.getElementById('box-chat');
		elem.scrollTop = elem.scrollHeight;
	}
});
