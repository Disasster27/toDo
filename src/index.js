import './scss/main.scss';

let taskIdCounter = 4;
let todoIdCounter = 1;
let draggedTask = null;
let draggedTodo = null;



const addButton = document.querySelectorAll( '.menu__button' );
const todoContainer = document.querySelector( '.todo-container' );

document.querySelectorAll( '.todo' ).forEach( setAddNewTask );
document.querySelectorAll( '.todo__task' ).forEach( deletTask );
document.querySelectorAll( '.todo__task' ).forEach( draggAndDropTask );


document.querySelector( '.menu__button' ).addEventListener( 'click', event => {
	
	const newTodo = document.createElement( 'div' );
	newTodo.classList.add( 'todo' );
	newTodo.setAttribute( 'draggable', 'true' );
	newTodo.setAttribute( 'data-todo-id', todoIdCounter );
	newTodo.innerHTML = `<div class="todo__header">
							<p class="todo__note">To do</p>
						</div>
						<div class="todo__body">
						</div>
						<div class="todo__footer">
							<div class="todo__add-task">
								+ Add new task
							</div>
							<div class="todo__delete-button">
								X
							</div>
						</div>`;
	todoIdCounter++;
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
} );

shortSetContenteditable ( document );

function setAddNewTask ( todoElement ) {
	
	const addTaskButton = todoElement.querySelector( '.todo__add-task' );
	addTaskButton.addEventListener( 'click', function ( event ) {
		
		const newTask = document.createElement( 'div' );
		newTask.classList.add( 'todo__task' );
		newTask.setAttribute( 'draggable', 'true' );
		newTask.setAttribute( 'data-todo-id', todoIdCounter );
		newTask.innerHTML = `<div class="todo__data">
					<p>12.02</p>
					<div class="todo__delete-button">
						X
					</div>
				</div>
				<div class="todo__task-text">
					<p class="todo__note"></p>
				</div>`;
		
		taskIdCounter++;
		
		todoElement.querySelector( '.todo__footer' ).insertAdjacentElement ( 'beforebegin', newTask );
		
		
		shortSetContenteditable ( newTask );
		deletTask ( newTask );
		draggAndDropTask ( newTask );
	} );
	deletTodo ( todoElement );
	draggAndDropTodo ( todoElement );
};

function shortSetContenteditable (elem) {
	elem.querySelectorAll( '.todo__note' ).forEach( setContenteditable );
};

function setContenteditable ( noteElement ) {
//	console.log( noteElement )
	noteElement.addEventListener( 'dblclick', ( event ) => {
		noteElement.setAttribute( 'contenteditable', 'true' );
//		noteElement.closest( '.todo__task' ).removeAttribute( 'draggable' );
//		noteElement.closest( '.todo' ).removeAttribute( 'draggable' );
		
		noteElement.focus();
	} );
		noteElement.setAttribute( 'contenteditable', 'true' );
		noteElement.focus()
	noteElement.addEventListener( 'blur', ( event ) => {
		noteElement.removeAttribute( 'contenteditable' );
//		noteElement.closest( '.todo__task' ).setAttribute( 'draggable', 'true' );
//		noteElement.closest( '.todo' ).setAttribute( 'draggable', 'true' );
		if ( noteElement.textContent.trim().length == 0 ) {
			noteElement.closest( '.todo__task' ).remove();
		};
	} );
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
};

function dragenter_taskHandler ( event ) {
	if ( this === draggedTask ) {
		return
	};
	event.stopPropagation();
//	console.log('enter', this);
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
//	console.log('leav', event.target);
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
//	console.log('start', this);
};

function dragend_todoHandler ( event ) {
	draggedTodo = null;
	this.classList.remove( 'dragged' );
	event.stopPropagation();
//	console.log('end', this);
};

function dragenter_todoHandler ( event ) {
	if ( this === draggedTodo ) {
		return
	};
	event.stopPropagation();
//	console.log('enter', this);
};

function dragover_todoHandler ( event ) {
	if ( this === draggedTodo ) {
		return
	};
	event.preventDefault();
//	console.log('over', this);
};

function dragleave_todoHandler ( event ) {
	if ( this === draggedTodo ) {
		return
	};
	event.stopPropagation();
//	console.log('leav', event.target);
};

function drop_todoHandler ( event ) {
	event.stopPropagation();
	if ( this === draggedTodo ) {
		return
	};
	console.log('drop', this.parentElement);
	
//	if ( this.parentElement === draggedTask.parentElement ) {
		const todo = Array.from(  this.parentElement.querySelectorAll( '.todo' ) );
		const indexA = todo.indexOf( this );
		const indexB = todo.indexOf( draggedTodo );
		if ( indexA < indexB ) {
			this.parentElement.insertBefore( draggedTodo, this );
		} else {
			this.parentElement.insertBefore( draggedTodo, this.nextElementSibling );
		}
//	} else {
//		this.parentElement.insertBefore( draggedTodo, this );
//	};
	console.log( indexA , indexB );
};




function deletTodo ( elem ) {
	elem.querySelector( '.todo__footer' ).addEventListener( 'click', ( event ) => {
			if ( event.target.classList.contains( 'todo__delete-button' ) ) {
				elem.remove();
			};
		} );
};

function deletTask ( elem ) {
	elem.querySelector( '.todo__data' ).addEventListener( 'click', ( event ) => {
			if ( event.target.classList.contains( 'todo__delete-button' ) ) {
				elem.remove();
			};
		} );
};

