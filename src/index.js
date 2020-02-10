import './scss/main.scss';
import './css/main.css';



console.log( ( ( a ) => a )(2) );

let foo = function ( q ) {
	return (  ) => q * q;
};

let foo2 = foo(2)();

console.log ( foo2 );