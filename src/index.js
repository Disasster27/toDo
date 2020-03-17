import './scss/main.scss';


let taskIdCounter = 5;
let todoIdCounter = 2;
let draggedTask = null;
let draggedTodo = null;



const addButton = document.querySelector( '.menu__button' );
const todoContainer = document.querySelector( '.todo-container' );




addButton.addEventListener( 'click', event => {
	todoCreate();
	storage.save();
} );


function setAddNewTask ( todoElement ) {
	
	const addTaskButton = todoElement.querySelector( '.todo__add-task' );
	addTaskButton.addEventListener( 'click', ( event ) => { taskCreate ( todoElement ) } );
	deletTodo ( todoElement );
	draggAndDropTodo ( todoElement );
};

function shortSetContenteditable (elem) {
	elem.querySelectorAll( '.todo__note' ).forEach( setContenteditable );
};

function setContenteditable ( noteElement ) {
	let innerText = '';
	let newInnerText = '';
	
	noteElement.addEventListener( 'dblclick', ( event ) => {
		noteElement.setAttribute( 'contenteditable', 'true' );
		noteElement.focus();
		innerText = noteElement.textContent;
	} );
	noteElement.addEventListener( 'touchstart', ( event ) => {
		if ( event.changedTouches[0].target.classList.contains( 'todo__note' ) ) {
			console.log(event.changedTouches[0].target)
			noteElement.setAttribute( 'contenteditable', 'true' );
			noteElement.focus();
			innerText = noteElement.textContent;
		}
		
		
	} );
	noteElement.addEventListener( 'blur', ( event ) => {
		noteElement.removeAttribute( 'contenteditable' );
		newInnerText = noteElement.textContent;
		if ( noteElement.textContent.trim().length == 0 ) {
			noteElement.closest( '.todo__task' ).remove();	
		};
		
		if ( innerText !== newInnerText ) {
			storage.save();
		}
		
	} );
	
	if ( noteElement.parentElement.classList.contains( 'todo__task-text' )  && noteElement.textContent.trim().length == 0 ){
		noteElement.setAttribute( 'contenteditable', 'true' );
		noteElement.focus()
		noteElement.addEventListener( 'blur', ( event ) => {
			noteElement.removeAttribute( 'contenteditable' );
			if ( noteElement.textContent.trim().length == 0 ) {
				noteElement.closest( '.todo__task' ).remove();	
			};
		} );
	}
};

function draggAndDropTask ( elem ) {
	elem.addEventListener( 'dragstart', dragstart_taskHandler )
	elem.addEventListener( 'dragend', dragend_taskHandler )
	elem.addEventListener( 'dragenter', dragenter_taskHandler )
	elem.addEventListener( 'dragover', dragover_taskHandler )
	elem.addEventListener( 'dragleave', dragleave_taskHandler )
	elem.addEventListener( 'drop', drop_taskHandler )
};

function dragstart_taskHandler ( event ) {
	draggedTask = this;
	this.classList.add( 'dragged' );
	event.stopPropagation();
};

function dragend_taskHandler ( event ) {
	draggedTask = null;
	this.classList.remove( 'dragged' );
	event.stopPropagation();
	storage.save();
};

function dragenter_taskHandler ( event ) {
	if ( this === draggedTask ) {
		return
	};
	event.stopPropagation();
};

function dragover_taskHandler ( event ) {
	if ( this === draggedTask ) {
		return
	};
	event.preventDefault();
};

function dragleave_taskHandler ( event ) {
	if ( this === draggedTask ) {
		return
	};
	event.stopPropagation();
};

function drop_taskHandler ( event ) {
	event.stopPropagation();
	if ( this === draggedTask ) {
		return
	};
	
	if ( this.parentElement === draggedTask.parentElement ) {
		const note = Array.from(  this.parentElement.querySelectorAll( '.todo__task' ) );
		const indexA = note.indexOf( this );
		const indexB = note.indexOf( draggedTask );
		if ( indexA < indexB ) {
			this.parentElement.insertBefore( draggedTask, this );
		} else {
			this.parentElement.insertBefore( draggedTask, this.nextElementSibling );
		}
	} else {
		this.parentElement.insertBefore( draggedTask, this );
	};
};

function draggAndDropTodo ( elem ) {
	elem.addEventListener( 'dragstart', dragstart_todoHandler )
	elem.addEventListener( 'dragend', dragend_todoHandler )
	elem.addEventListener( 'dragenter', dragenter_todoHandler )
	elem.addEventListener( 'dragover', dragover_todoHandler )
	elem.addEventListener( 'dragleave', dragleave_todoHandler )
	elem.addEventListener( 'drop', drop_todoHandler )
};

function dragstart_todoHandler ( event ) {
	draggedTodo = this;
	this.classList.add( 'dragged' );
	event.stopPropagation();
};

function dragend_todoHandler ( event ) {
	draggedTodo = null;
	this.classList.remove( 'dragged' );
	event.stopPropagation();
	storage.save();
};

function dragenter_todoHandler ( event ) {
	if ( this === draggedTodo ) {
		return
	};
	event.stopPropagation();
};

function dragover_todoHandler ( event ) {
	if ( this === draggedTodo ) {
		return
	};
	event.preventDefault();
};

function dragleave_todoHandler ( event ) {
	if ( this === draggedTodo ) {
		return
	};
	event.stopPropagation();
};

function drop_todoHandler ( event ) {
	event.stopPropagation();
	if ( this === draggedTodo ) {
		return
	};
	
		const todo = Array.from(  this.parentElement.querySelectorAll( '.todo' ) );
		const indexA = todo.indexOf( this );
		const indexB = todo.indexOf( draggedTodo );
		if ( indexA < indexB ) {
			this.parentElement.insertBefore( draggedTodo, this );
		} else {
			this.parentElement.insertBefore( draggedTodo, this.nextElementSibling );
		}
};

function deletTodo ( elem ) {
	elem.querySelector( '.todo__footer' ).addEventListener( 'click', ( event ) => {
			if ( event.toElement.parentNode.classList.contains( 'todo__delete-button' ) ) {
				elem.remove();
				storage.save();
			};
		} );
};

function deletTask ( elem ) {
	elem.querySelector( '.todo__data' ).addEventListener( 'click', ( event ) => {
			if ( event.toElement.parentNode.classList.contains( 'todo__delete-button' ) ) {
				elem.remove();
				storage.save();
			};
		} );
};

const storage = {
	save () {
		const object = {
			todo : {
				todoIdCounter : todoIdCounter,
				itemsTodo : [],
			},
			task : {
				taskIdCounter : taskIdCounter,
				itemsTask : [],
			},
		};
		
		document.querySelectorAll( '.todo' ).forEach( elem => {
			const todo = {
				id : parseInt( elem.getAttribute( 'data-todo-id' ) ),
				taskId : [],
				todoTitle : elem.querySelector( '.todo__note' ).textContent,
			};
			
			elem.querySelectorAll( '.todo__task' ).forEach( elem => {
				todo.taskId.push( parseInt( elem.getAttribute( 'data-task-id' ) ) )
			} );
			
			object.todo.itemsTodo.push( todo );
		} );
		
		document.querySelectorAll( '.todo__task' ).forEach( elem => {
			const task = {
				id : parseInt( elem.getAttribute( 'data-task-id' ) ),
				text : elem.querySelector( '.todo__note' ).textContent,
				dateOfCreate : elem.querySelector( '.date' ).textContent,
			};
			
			object.task.itemsTask.push( task );
			
		} );
		
		const json = JSON.stringify( object );
		
		localStorage.setItem( 'todoList', json );
	},
	
	load () {
		if ( !localStorage.getItem( 'todoList' ) ) {
			return
		}; 
		const object = JSON.parse( localStorage.getItem( 'todoList' ) );
		
		taskIdCounter = object.task.taskIdCounter;
		todoIdCounter = object.todo.todoIdCounter;
		
		for ( let todo of object.todo.itemsTodo ) {
			todoCreate( todo );
			for ( let note of todo.taskId ) {
				let todoElement = document.querySelector( `[data-todo-id="${todo.id}"]` );
				let item = object.task.itemsTask.find( ( item ) => {
					if ( item.id === note ) {
						return item; 
					}
				} )
				let noteText = item.text;
				let date = item.dateOfCreate;
				taskCreate ( todoElement, note, noteText, date ); 
			}
		}
	},
};


function todoCreate ( todo ) {
	let innerTodo = todo;
	if ( innerTodo ) {
		
	} else {
		innerTodo = {};
		innerTodo.id = innerTodo;
		todoIdCounter++;
		innerTodo.todoTitle = 'Todo'
	}
	
	const newTodo = document.createElement( 'div' );
	newTodo.classList.add( 'todo' );
	newTodo.setAttribute( 'draggable', 'true' );
	newTodo.setAttribute( 'data-todo-id', innerTodo.id );
	newTodo.innerHTML = `<div class="todo__header">
							<p class="todo__note">${ innerTodo.todoTitle }</p>
						</div>
						<div class="todo__body">
						</div>
						<div class="todo__footer">
							<div class="todo__add-task">
								+ Add new task
							</div>
							<div class="todo__delete-button">
								<i class="far fa-trash-alt"></i>
							</div>
						</div>`;
	document.querySelector( '.todo-container' ).insertAdjacentElement( 'beforeend', newTodo );
	setAddNewTask ( newTodo );
	shortSetContenteditable ( newTodo );
	
	newTodo.addEventListener( 'dragover', ( event ) => {
		event.preventDefault();
	} );
	
	newTodo.addEventListener( 'drop', ( event ) => {
		if ( draggedTask ) {
			newTodo.querySelector( '.todo__body' ).append( draggedTask );
		};
	} );
};

function taskCreate ( todoElement, id, noteText = '', date = `${getDateOfCreate()}` ) {
	
	if ( id || id === 0 ) {
		
	} else {
		id = taskIdCounter;
		taskIdCounter++;
	}
	
	const newTask = document.createElement( 'div' );
	newTask.classList.add( 'todo__task' );
	newTask.setAttribute( 'draggable', 'true' );
	newTask.setAttribute( 'data-task-id', id );
	newTask.innerHTML = `<div class="todo__data">
				<p class="date">${date}</p>
				<div class="todo__delete-button">
					<i class="far fa-trash-alt"></i>
				</div>
			</div>
			<div class="todo__task-text">
				<p class="todo__note">${ noteText }</p>
			</div>`;
	
//	taskIdCounter++;
	
	todoElement.querySelector( '.todo__footer' ).insertAdjacentElement ( 'beforebegin', newTask );
	
	
	shortSetContenteditable ( newTask );
	deletTask ( newTask );
	draggAndDropTask ( newTask );
}

function getDateOfCreate () {
	const date = new Date();
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	
	return `${day}.${month}.${year}`;
}

//storage.save();
storage.load();







