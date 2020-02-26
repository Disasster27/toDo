import './scss/main.scss';
//import './css/main.css';
//import './css/reset.css';
//import src from './images/central_park.jpg'

let taskIdCounter = 0;
let todoIdCounter = 0;
let draggedNote = null;


const addButton = document.querySelectorAll( '.menu__button' );
const todoContainer = document.querySelector( '.todo-container' );

document.querySelectorAll( '.todo' ).forEach( setAddNewTask );
document.querySelectorAll( '.todo__task' ).forEach( deletTask );
document.querySelectorAll( '.todo__task' ).forEach( draggAndDrop );


document.querySelector( '.menu__button' ).addEventListener( 'click', event => {
//	console.log( this );
	
	const newTodo = document.createElement( 'div' );
	newTodo.classList.add( 'todo' );
	newTodo.setAttribute( 'draggable', 'true' );
	newTodo.setAttribute( 'data-todo-id', todoIdCounter );
	newTodo.innerHTML = `<div class="todo__header">
					<p class="todo__note">To do</p>
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
//	console.log( newTodo );
	setAddNewTask ( newTodo );
	shortSetContenteditable ( newTodo );
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
		
//		console.log( newTask );
//		newTask.setAttribute( 'contenteditable', 'true' );
//		newTask.focus()
		
		shortSetContenteditable ( newTask );
		deletTask ( newTask );
		draggAndDrop ( newTask );
	} );
	deletTodo ( todoElement );
	draggAndDrop ( todoElement );
};

function shortSetContenteditable (elem) {
	elem.querySelectorAll( '.todo__note' ).forEach( setContenteditable );
	
	
};

function setContenteditable ( noteElement ) {
	noteElement.addEventListener( 'dblclick', ( event ) => {
		noteElement.setAttribute( 'contenteditable', 'true' );
		noteElement.focus();
	} );
	
		noteElement.setAttribute( 'contenteditable', 'true' );
		noteElement.focus()
	noteElement.addEventListener( 'blur', ( event ) => {
		noteElement.removeAttribute( 'contenteditable' );
		if ( noteElement.textContent.trim().length == 0 ) {
			noteElement.closest( '.todo__task' ).remove();
		};
	} );
	
	
	
	
};

function draggAndDrop ( elem ) {
	elem.addEventListener( 'dragstart', dragstart_noteHandler )
	elem.addEventListener( 'dragend', dragend_noteHandler )
	elem.addEventListener( 'dradenter', dradenter_noteHandler )
	elem.addEventListener( 'dragover', dragover_noteHandler )
	elem.addEventListener( 'dragleave', dragleave_noteHandler )
	elem.addEventListener( 'drop', drop_noteHandler )
}

function dragstart_noteHandler ( event ) {
	draggedNote = this;
	this.classList.add( 'dragged' );
	event.stopPropagation();
	console.log( 'dragstart' ,this )
}
function dragend_noteHandler ( event ) {
	draggedNote = null;
	this.classList.remove( 'dragged' );
	event.stopPropagation();
	console.log( 'dragend' ,this )
}
function dradenter_noteHandler ( event ) {
	if ( this === draggedNote ) {
		return
	};
}
function dragover_noteHandler ( event ) {
	if ( this === draggedNote ) {
		return
	};
//	console.log( this )
}
function dragleave_noteHandler ( event ) {
	if ( this === draggedNote ) {
		return
	};
}
function drop_noteHandler ( event ) {
	if ( this === draggedNote ) {
		return
	};
}



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

