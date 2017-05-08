var materialVC = {};

materialVC.initView = function() {

  $( function() {
    var new_id = 0;

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
                    obj.attr('id', (++new_id).toString());
                    obj.addClass('editable').removeAttr('style');
                    $(this).append(obj);
                }
            }
        }
    }).sortable({
        revert: false,
    });
  });

  var actualtasklist;
  var actualobject;
  var lastclicked;
  var context;
  var Tasks = [];

  $(".tasks__newtask-button").click(function(){
    $(".modalbox").fadeIn();
    actualtasklist = $(this).closest(".tasks").find(".tasks__list").attr('id');
    lastclicked = "new";
  });

  $(".modalbox__savebtn").click(function(){
    var task = getModalInputs();
    var updatingtask;
    if (lastclicked === "new"){
      updatingtask = new Task(task);
      Addtask(updatingtask);
    } else{
      Updatetask(task,actualobject);
    }
    Hidemodal();
  });

  $(".modalbox__cancelbtn").click(function(){
      Hidemodal();
  });


  $(document).on('dblclick','.tasks__list-task',function(){
    context = $(this);
    actualtasklist = $(this).closest(".tasks").find(".tasks__list").attr('id');
    var searchTask = $(this).find("h5").text();
    searchArray(searchTask);
    lastclicked = "update";
    setModalInputs(actualobject);
    $(".modalbox").fadeIn();
  });

  function searchArray(search){
    for (var i = 0; i < Tasks.length; i++) {
      if (Tasks[i].name === search){
        actualobject = Tasks[i];
      }
    }
  }

  function setModalInputs(recieved_task){
    for (var i = 0; i < 4; i++) {
      if (i === Number(recieved_task.label)){
        $(".modalbox__content").find("input").eq(i+2).prop('checked', true);
      }
    }
    $(".modalbox__content").find("input").eq(0).val(recieved_task.name);
    $(".modalbox__content").find("input").eq(1).val(recieved_task.tags);
    $(".modalbox__content").find("input").eq(6).val(recieved_task.start);
    $(".modalbox__content").find("input").eq(7).val(recieved_task.finish);
    $(".modalbox__content").find("textarea").eq(0).val(recieved_task.description);
 }

  function Addtask(newtask) {
    Tasks.push(newtask);
    $('#'+newtask.actualtasklist).append("<div class='tasks__list-task draggable'><h5 class='task__text'>"+ newtask.name +"</h5><p class='task__tags'>"+ newtask.tags +"</p></div>");
    context = $('#'+newtask.actualtasklist).children().last();
    showlabel(newtask);
  }

  function Updatetask(task,actualobject) {
     $(context).find("h5").text(task.name);
     $(context).find("p").text(task.tags);
     actualobject.name = task.name;
     actualobject.tags = task.tags;
     actualobject.label = task.label;
     actualobject.start = task.start;
     actualobject.finish = task.finish;
     actualobject.description = task.description;
     showlabel(task);
  }

  function showlabel(updatedtask){
    if (updatedtask.label === "0"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-red");}
    if (updatedtask.label === "1"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-blue");}
    if (updatedtask.label === "2"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-green");}
    if (updatedtask.label === "3"){$(context).removeClass().addClass("tasks__list-task draggable tasks__labels-orange");}
  }

  function Hidemodal(){
    $(".modalbox").hide();
    $(".form-control").val("");
    $("input:radio").prop('checked', false);
  }

  function Task(task){
    this.name = task.name;
    this.tags = task.tags;
    this.label = task.label;
    this.start = task.start;
    this.finish = task.finish;
    this.description = task.description;
    this.actualtasklist = actualtasklist;
  }

  function getModalInputs(){
    var checkedlabel;
    if($("input:radio").is(':checked')) {
      checkedlabel = $("input:radio:checked").val();
    }
    var task = {
      name : $(".modalbox__content").find("input").eq(0).val(),
      tags : $(".modalbox__content").find("input").eq(1).val(),
      label : checkedlabel,
      start : $(".modalbox__content").find("input").eq(6).val(),
      finish : $(".modalbox__content").find("input").eq(7).val(),
      description : $(".modalbox__content").find("textarea").eq(0).val()
    };
  return task;
  }

  $(".tasks__buttonshow").click(function(){
    $(this).closest( ".tasks" ).children(".tasks__list").toggle(150);
    $(this).toggleClass("tasks__buttonhide");
  });
};

materialVC.initView();
