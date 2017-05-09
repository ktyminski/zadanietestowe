var materialVC = {};


materialVC.initView = function() {

materialVC.Tasks = [];

var actualtasklist;
var actualobject;
var lastclicked;
var context;

    $(".modalbox__datepicker" ).datepicker();

    $(".draggable").draggable({
        cursor: 'move',
        revert: 'invalid',
        distance: 20
    });

    $(".droppable").droppable({
        hoverClass: 'ui-state-active',
        tolerance: 'pointer',
        accept: function (event, ui) {
            return true;
        },
        drop: function (event, ui) {
            var obj;
            if ($(ui.helper).hasClass('draggable')) {
                if($(ui.draggable).parents(".editor-container").length > 0){
                    $(ui.helper).clone().appendTo($(this)).removeAttr('style');
                    $(ui.helper).remove();
                }else{
                    obj = $(ui.helper);
                    obj.removeClass('droppable');
                    obj.addClass('editable').removeAttr('style');
                    $(this).append(obj);
                }
            }
        }
    }).sortable({
        revert: false
    });

  $(".tasks__newtask-button").click(function(){
    $(".modalbox").fadeIn();
    actualtasklist = $(this).closest(".tasks").find(".tasks__list").attr('id');
    lastclicked = "new";
  });

  $(".modalbox__savebtn").click(function(){
    var task = materialVC.getModalInputs();
    var updatingtask;
    if (lastclicked === "new"){
      updatingtask = new materialVC.Task(task);
      materialVC.Addtask(updatingtask);
    } else{
      materialVC.Updatetask(task,actualobject);
    }
    materialVC.Hidemodal();
  });

  $(".modalbox__cancelbtn").click(function(){
      materialVC.Hidemodal();
  });


  $(document).on('dblclick','.tasks__list-task',function(){
    context = $(this);
    actualtasklist = $(this).closest(".tasks").find(".tasks__list").attr('id');
    var searchTask = $(this).find("h5").text();
    materialVC.searchArray(searchTask);
    lastclicked = "update";
    materialVC.setModalInputs(actualobject);
    $(".modalbox").fadeIn();
  });


  $(".tasks__buttonshow").click(function(){
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
        $(".modalbox__content").find("[type=radio]").eq(i).prop('checked', true);
      }
    }
    $(".modalbox__content").find('[data-name="name"]').val(recieved_task.name);
    $(".modalbox__content").find('[data-name="tags"]').val(recieved_task.tags);
    $(".modalbox__content").find('[data-name="starts"]').val(recieved_task.start);
    $(".modalbox__content").find('[data-name="finishes"]').val(recieved_task.finish);
    $(".modalbox__content").find('[data-name="description"]').val(recieved_task.description);
  };

  materialVC.Addtask = function(newtask) {
    materialVC.Tasks.push(newtask);
    $('#'+newtask.actualtasklist).append("<div class='tasks__list-task draggable'><h5 class='task__text'>"+ newtask.name +"</h5><p class='task__tags'>"+ newtask.tags +"</p></div>");
    context = $('#'+newtask.actualtasklist).children().last();
    materialVC.showlabel(newtask);
  };

  materialVC.Updatetask = function(task,actualobject) {
     $(context).find("h5").text(task.name);
     $(context).find("p").text(task.tags);
     actualobject.name = task.name;
     actualobject.tags = task.tags;
     actualobject.label = task.label;
     actualobject.start = task.start;
     actualobject.finish = task.finish;
     actualobject.description = task.description;
     materialVC.showlabel(task);
  };

  materialVC.showlabel = function(updatedtask){
    if (updatedtask.label === "0"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-red");}
    if (updatedtask.label === "1"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-blue");}
    if (updatedtask.label === "2"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-green");}
    if (updatedtask.label === "3"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-orange");}
  };

  materialVC.Hidemodal = function(){
    $(".modalbox").hide();
    $(".form-control").val("");
    $("input:radio").prop('checked', false);
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
    var checkedlabel;
    if($("input:radio").is(':checked')) {
      checkedlabel = $("input:radio:checked").val();
    }
    var task = {
      name : $(".modalbox__content").find('[data-name="name"]').val(),
      tags : $(".modalbox__content").find('[data-name="tags"]').val(),
      label : checkedlabel,
      start : $(".modalbox__content").find('[data-name="starts"]').val(),
      finish : $(".modalbox__content").find('[data-name="finishes"]').val(),
      description : $(".modalbox__content").find('[data-name="description"]').val()
    };
    return task;
  };

};

materialVC.initView();
