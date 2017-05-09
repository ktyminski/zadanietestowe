var materialVC = {};

materialVC.initView = function() {

  materialVC.Tasks = [];
  var $modalContent =  $(".modalbox__content");
  var actualtasklist;
  var actualobject;
  var lastclicked;
  var context;

    $(".modalbox__datepicker" ).datepicker();

    $(".items").sortable({
           connectWith: ".items",
           receive: function(event, ui) {
             var search;
             var changelist;
             search = $(this).find("h5").text();
             materialVC.searchArray(search);
             changelist = $(this).prop("id");
             materialVC.updateTaskList(changelist);
             $(ui.helper).remove();
           }
       });

  $(".tasks__newtask-button").unbind("click").click(function(){
    $(".modalbox").fadeIn();
    actualtasklist = $(this).closest(".tasks").find(".tasks__list").attr("id");
    lastclicked = "new";
  });

  $(".modalbox__savebtn").unbind("click").click(function(){
    var task = materialVC.getModalInputs();
    var updatingtask;
    if (lastclicked === "new"){
      updatingtask = new materialVC.Task(task);
      materialVC.addTask(updatingtask);
    } else{
      materialVC.updateTask(task,actualobject);
    }
    materialVC.hideModal();
  });

  $(".modalbox__cancelbtn").unbind("click").click(function(){
      materialVC.hideModal();
  });

  $(document).unbind("dblclick").on("dblclick",".tasks__list-task",function(){
    var searchTask;
    context = $(this);
    actualtasklist = $(this).closest(".tasks").find(".tasks__list").attr("id");
    searchTask = $(this).find("h5").text();
    materialVC.searchArray(searchTask);
    lastclicked = "update";
    materialVC.setModalInputs(actualobject);
    $(".modalbox").fadeIn();
  });

  $(".tasks__buttonshow").unbind("click").click(function(){
    $(this).closest( ".tasks" ).children(".tasks__list").toggle(150);
    $(this).toggleClass("tasks__buttonhide");
  });

  materialVC.searchArray = function(search){
    for (var i = 0; i < materialVC.Tasks.length; i++) {
      if (materialVC.Tasks[i].name === search){
        actualobject = materialVC.Tasks[i];
      }
    }
  };

  materialVC.setModalInputs = function(recieved_task){
    for (var i = 0; i < 4; i++) {
      if (i === Number(recieved_task.label)){
      $modalContent.find("[type=radio]").eq(i).prop("checked", true);
      }
    }
    $modalContent.find('[data-name="name"]').val(recieved_task.name);
    $modalContent.find('[data-name="tags"]').val(recieved_task.tags);
    $modalContent.find('[data-name="starts"]').val(recieved_task.start);
    $modalContent.find('[data-name="finishes"]').val(recieved_task.finish);
    $modalContent.find('[data-name="description"]').val(recieved_task.description);
  };

  materialVC.addTask = function(newtask) {
    materialVC.Tasks.push(newtask);
    $('#'+newtask.actualtasklist).append("<div class='tasks__list-task draggable'><h5 class='task__text'>"+ newtask.name +"</h5><p class='task__tags'>"+ newtask.tags +"</p></div>");
    context = $('#'+newtask.actualtasklist).children().last();
    materialVC.showLabel(newtask);
  };

  materialVC.updateTask = function(task,actualobject) {
     $(context).find("h5").text(task.name);
     $(context).find("p").text(task.tags);
     actualobject.name = task.name;
     actualobject.tags = task.tags;
     actualobject.label = task.label;
     actualobject.start = task.start;
     actualobject.finish = task.finish;
     actualobject.description = task.description;
     materialVC.showLabel(task);
  };

  materialVC.updateTaskList = function (changelist) {
    actualobject.actualtasklist = changelist;
  };

  materialVC.showLabel = function(updatedtask){
    if (updatedtask.label === "0"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-red");}
    if (updatedtask.label === "1"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-blue");}
    if (updatedtask.label === "2"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-green");}
    if (updatedtask.label === "3"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-orange");}
  };

  materialVC.hideModal = function(){
    $(".modalbox").hide();
    $(".form-control").val("");
    $("input:radio").prop("checked", false);
  };

  materialVC.Task = function(task){
    this.name = task.name;
    this.tags = task.tags;
    this.label = task.label;
    this.start = task.start;
    this.finish = task.finish;
    this.description = task.description;
    this.actualtasklist = actualtasklist;
  };

  materialVC.getModalInputs = function(){
    var checkedlabel,task;
    if($("input:radio").is(":checked")) {
      checkedlabel = $("input:radio:checked").val();
    }
    task = {
      name : $modalContent.find('[data-name="name"]').val(),
      tags : $modalContent.find('[data-name="tags"]').val(),
      label : checkedlabel,
      start : $modalContent.find('[data-name="starts"]').val(),
      finish : $modalContent.find('[data-name="finishes"]').val(),
      description : $modalContent.find('[data-name="description"]').val()
    };
    return task;
  };
};

materialVC.initView();
