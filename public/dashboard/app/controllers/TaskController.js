/**
 * Created by ThuanLe on 1/12/2016.
 */
App.controller('TaskController', function ($rootScope,$scope,AppGlobalData,Proxy, $timeout) {
    $scope.chopSwitchUiTask=false;
    $scope.alertTaskFinish=false;
    $scope.alertTaskRemove=false;
    $scope.uiRename=false;

    function loadListProject(){
        Proxy.listProject(null,{loading:false})
            .then(function (result) {
                $scope.currentProjectId=result.body[0]._id;
                $scope.currentProjectName=result.body[0].project;
            })
            .catch(function (err) {
            })
    }

    function loadTask(){
        $rootScope.rootSpinner=true;
        async.parallel([function (callback) {
            $scope.listTask=[];
            Proxy.listTask({projectId:$scope.currentProjectId},{loading:false})
                .then(function (result) {
                    $rootScope.rootSpinner=false;
                    $scope.listTask=result.body;
                })
                .catch(function (err) {
                    $rootScope.rootSpinner=false;
                    console.log(err)
                })
            callback();
        }, function (callback) {
            $scope.listTaskDone=[];
            Proxy.listTaskDone({projectId:$scope.currentProjectId},{loading:false})
                .then(function (result) {
                    $rootScope.rootSpinner=false;
                    $scope.listTaskDone=result.body;
                })
                .catch(function (err) {
                    $rootScope.rootSpinner=false;
                    console.log(err)
                })
            callback();
        }])
    }

    $scope.initLoadTask= function () {
        async.waterfall([function (callback) {
            loadListProject();
            callback();
        }, function () {
            $timeout(function () {
                loadTask();
            },2000)
        }])
    }
    
    $scope.switchFormAddTask= function () {
        if($scope.chopSwitchUiTask == true){
            $scope.chopSwitchUiTask=false;
        }else{$scope.chopSwitchUiTask=true;}

    }
        $scope.addTask= function () {
                $rootScope.rootSpinner=true;
                var data={task:$scope.task,projectId:$scope.currentProjectId};
                Proxy.addTask(data,{loading:false})
                    .then(function (result) {
                            $scope.task=null;
                            $rootScope.rootSpinner=false;
                           loadTask();
                    })
                    .catch(function (err) {
                            $rootScope.rootSpinner=false;
                            console.log(err)
                    })
        }


    $scope.$on('broadcastScopeProject', function(event, args) {
        $scope.currentProjectId=args.data._id;
        $scope.currentProjectName=args.data.project;
        loadTask();
    });

    $scope.finishTask= function (data) {
        $rootScope.rootSpinner=true;
        Proxy.updateTask({taskId:data},{loading:false})
            .then(function (result) {
                $rootScope.rootSpinner=false;
                loadTask();
                $scope.alertTaskFinish=true;
                $timeout(function(){$scope.alertTaskFinish=false;},3000)
            })
            .catch(function (err) {
                $rootScope.rootSpinner=false;
                console.log(err)
            })
    }
    
    $scope.removeProject= function (data) {
        $rootScope.rootSpinner=true;
        Proxy.removeProject({projectId:data},{loading:false})
            .then(function (result) {
                $rootScope.rootSpinner=false;
                async.waterfall([function (callback) {
                    loadListProject();
                    $rootScope.$broadcast('broadcastToReloadNotResend');
                    callback();
                }, function () {
                    $timeout(function () {
                        loadTask();
                    },2000)

                }])

            })
            .catch(function (err) {
                $rootScope.rootSpinner=false;
                console.log(err)
            })
    }

    $scope.removeTask= function (data) {
        $rootScope.rootSpinner=true;
        Proxy.removeTask({taskId:data},{loading:false})
            .then(function (result) {
                $rootScope.rootSpinner=false;
                loadTask();
                $scope.alertTaskRemove=true;
                $timeout(function(){$scope.alertTaskRemove=false;},3000)
            })
            .catch(function (err) {
                $rootScope.rootSpinner=false;
                console.log(err)
            })
    }

    $scope.switchUiRename= function () {
        $scope.valueRenameProject=$scope.currentProjectName;
        if($scope.uiRename == true){
            $scope.uiRename=false;
        }else{$scope.uiRename=true;}

    }

    $scope.renameProjectFunc= function () {
        $rootScope.rootSpinner=true;
        Proxy.updateProject({projectId:$scope.currentProjectId,project:$scope.valueRenameProject},{loading:false})
            .then(function (result) {
                $rootScope.rootSpinner=false;
                $rootScope.$broadcast('broadcastToReloadNotResend');
                $scope.currentProjectName=$scope.valueRenameProject;
                $scope.uiRename=false;
            })
            .catch(function (err) {
                $rootScope.rootSpinner=false;
                console.log(err)
            })
    }
});