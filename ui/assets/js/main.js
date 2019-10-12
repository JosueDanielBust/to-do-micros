(function() {
  let location = document.location;

  const users_path = '//' + location.hostname + ':3001';
  const tasks_path = '//' + location.hostname + ':3002';

  var todo = new Vue({
    el: '#todo',
    data: { title: 'To-Do App', users: [], name: '', description: '' },
    methods: {
      //#region User methods
      createUser: function( e ) {
        e.preventDefault(); let name = this.name;
        $.ajax({
          type: 'POST', dataType: 'json',
          url: users_path + '/user?name=' + name
        })
          .done(function( data, textStatus, jqxhr ) {
            todo.users.push( { id: data.data.insertId, name: name, tasks: [] } );
          })
          .fail( function( jqxhr, textStatus, error ) {
            console.log( 'Error: Impossible to create new user' );
          });
      },
      editUser: function( id, name ) {
        $.ajax({
          type: 'PUT', dataType: 'json',
          url: users_path + '/user/' + id + '?name=' + name
        })
          .done(function( data, textStatus, jqxhr ) {
            console.log( data.message );
          })
          .fail( function( jqxhr, textStatus, error ) {
            console.log( 'Error: Impossible to update user' );
          });
      },
      removeUser: function( id ) {
        $.ajax({
          type: 'DELETE', dataType: 'json',
          url: users_path + '/user/' + id
        })
          .done(function( data, textStatus, jqxhr ) {
            todo.users.forEach( user => {
              if ( user.id == id ) { todo.users.pop( user ); }
            });
          })
          .fail( function( jqxhr, textStatus, error ) {
            console.log( 'Error: Impossible to remove the user' );
          });
      },
      //#endregion

      //#region Tasks methods
      showTasks: function( id ) {
        $.getJSON(tasks_path + '/tasks/' + id, function(data) {
          todo.users.forEach( user => {
            if ( user.id == id ) { user.tasks = data.data; }
          });
        });
      },
      createTask: function( user_id, description ) {
        $.ajax({
          type: 'POST', dataType: 'json',
          url: tasks_path + '/task?user_id=' + user_id + '&description=' + description
        })
          .done(function( data, textStatus, jqxhr ) {
            todo.users.forEach( user => {
              if ( user.id == user_id ) { user.tasks.push( { id: data.data.insertId, state: 0, user_id: user_id, description: description } ); }
            });
          })
          .fail( function( jqxhr, textStatus, error ) {
            console.log( 'Error: Impossible to create task' );
          });
      },
      editTask: function( task ) {
        $.ajax({
          type: 'PUT', dataType: 'json',
          url: tasks_path + '/task/' + task.id + '?state=0&description=' + task.description
        })
          .done(function( data, textStatus, jqxhr ) {
            console.log( data.message );
          })
          .fail( function( jqxhr, textStatus, error ) {
            console.log( 'Error: Impossible to update task' );
          });
      },
      toggleTask: function( task ) {
        let state = 0;
        if (task.state == 1) { state = 0; } else { state = 1; };
        $.ajax({
          type: 'PUT', dataType: 'json',
          url: tasks_path + '/task/' + task.id + '?state=' + state + '&description=' + task.description
        })
          .done(function( data, textStatus, jqxhr ) {
            todo.users.forEach( user => {
              user.tasks.forEach( e => {
                if ( task.id == e.id ) {
                  console.log(e.description);
                  e.state = state;
                }
              });
            });
            console.log( data.message );
          })
          .fail( function( jqxhr, textStatus, error ) {
            console.log( 'Error: Impossible to update task' );
          });
      }
      //#endregion
    }
  });

  $.getJSON(users_path + '/users', function(data) {
    data.data.forEach( user => { user.tasks = []; });
    todo.users = data.data;
  });
})();


//#region Utils
function getClosest(elem, selector) {
  for ( ; elem && elem !== document; elem = elem.parentNode ) {
    if ( elem.matches( selector ) ) return elem;
  }
  return null;
};
//#endregion
function toggleEditUser(e) {
  let user = getClosest( e, '.users-item' );
  let edit = user.querySelector( '.users-item-content__edit-user' );
  edit.classList.toggle('active');
}
function toggleAddTask(e) {
  let user = getClosest( e, '.users-item' );
  let edit = user.querySelector( '.users-item-content__add-task' );
  edit.classList.toggle('active');
}
function toggleEditTask(e) {
  let user = getClosest( e, 'li' );
  let edit = user.querySelector( '.users-item-content__todos__edit-form' );
  edit.classList.toggle('active');
}