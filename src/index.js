import './scss/main.scss';
import './css/main.css';
import src from './images/central_park.jpg'



console.log( ( ( a ) => a )(2) );

let foo = function ( q ) {
	return (  ) => q * q;
};

let foo2 = foo(2)();

console.log ( foo2 );

const image = new Image();
image.src = src;
document.body.appendChild(image);