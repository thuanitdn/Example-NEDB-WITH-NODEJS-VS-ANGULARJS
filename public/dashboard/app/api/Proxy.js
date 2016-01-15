App.factory('Proxy', function (ServiceProxy) {
  var proxy = {
    addProject:'POST api/project/create',
    listProject:'GET api/project/listProject',
    removeProject:'GET api/project/remove',
    updateProject:'POST api/project/update',
    addTask:'POST api/task/create',
    listTask:'GET api/task/listTask',
    listTaskDone:'GET api/task/listTaskDone',
    updateTask:'GET api/task/updateTask',
    removeTask:'GET api/task/removeTask'
  };
  return ServiceProxy.create(proxy);
});
