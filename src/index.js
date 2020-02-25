import './scss/main.scss';
//import './css/main.css';
//import './css/reset.css';
//import src from './images/central_park.jpg'

let taskIdCounter = 0;
let todoIdCounter = 0;


const addButton = document.querySelectorAll( '.menu__button' );
const todoContainer = document.querySelector( '.todo-container' );

document.querySelectorAll( '.todo' ).forEach( todoElement => {
	const addTaskButton = todoElement.querySelector( '.todo__add-task' );
	addTaskButton.addEventListener( 'click', function ( event ) {
		
		console.log( this );
		
		const newTask = `<div class="todo__task" draggable="true" data-task-id="${taskIdCounter}">
					<div class="todo__data">
						<p>12.02</p>
						<div class="todo__delete-button">
							<button>X</button>
						</div>
					</div>
					<div class="todo__task-text">
						<p>Доделать до конца</p>
					</div>
					<div class="todo__tags">
						<span class="tags">task</span>
						<span class="tags">interaction</span>
						<span class="tags">related</span>
						<span class="tags">Due date</span>
					</div>
				</div>`;
		
		taskIdCounter++;
		
		todoElement.querySelector( '.todo__footer' ).insertAdjacentHTML( 'beforebegin', newTask );
		
	} );
} );

document.querySelector( '.menu__button' ).addEventListener( 'click', event => {
	console.log( this );
	const newTodo = `<div class="todo" data-todo-id="${todoIdCounter}" draggable="true">
				<div class="todo__header">
					<p>To do</p>
				</div>
				<div class="todo__footer">
					<div class="todo__add-task">
						+ Add new task
					</div>
					<div class="todo__delete-button">
						<button>X</button>
					</div>
				</div>
			</div>`;
	todoIdCounter++;
	document.querySelector( '.todo-container' ).insertAdjacentHTML( 'beforeend', newTodo );
	
} )


