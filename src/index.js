import './scss/main.scss';
//import './css/main.css';
//import './css/reset.css';
//import src from './images/central_park.jpg'

let taskIdCounter = 0;
let todoIdCounter = 0;


const addButton = document.querySelectorAll( '.menu__button' );
const todoContainer = document.querySelector( '.todo-container' );

document.querySelectorAll( '.todo' ).forEach( setAddNewTask );

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
						<button>X</button>
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
//	console.log( todoElement );
	const addTaskButton = todoElement.querySelector( '.todo__add-task' );
	addTaskButton.addEventListener( 'click', function ( event ) {
		
		const newTask = document.createElement( 'div' );
		newTask.classList.add( 'todo__task' );
		newTask.setAttribute( 'draggable', 'true' );
		newTask.setAttribute( 'data-todo-id', todoIdCounter );
		newTask.innerHTML = `<div class="todo__data">
					<p>12.02</p>
					<div class="todo__delete-button">
						<button>X</button>
					</div>
				</div>
				<div class="todo__task-text">
					<p class="todo__note"></p>
				</div>
				<div class="todo__tags">
					<span class="tags">task</span>
					<span class="tags">interaction</span>
					<span class="tags">related</span>
					<span class="tags">Due date</span>
				</div>`;
		
		taskIdCounter++;
		
		todoElement.querySelector( '.todo__footer' ).insertAdjacentElement ( 'beforebegin', newTask );
//		console.log( newTask );
		shortSetContenteditable ( newTask );
	} );
};

function setContenteditable ( noteElement ) {
//	console.log(noteElement);
	noteElement.addEventListener( 'dblclick', ( event ) => {
//		console.log(noteElement)
		noteElement.setAttribute( 'contenteditable', 'true' );
		noteElement.focus();
	} );
	noteElement.addEventListener( 'blur', ( event ) => {
		noteElement.removeAttribute( 'contenteditable' );
	} );
};

function shortSetContenteditable (elem) {
	elem.querySelectorAll( '.todo__note' ).forEach( setContenteditable );
};