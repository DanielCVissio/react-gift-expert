import { fireEvent, render, screen } from '@testing-library/react';
import { AddCategory } from '../../src/components/AddCategory';


describe('Pruebas en <AddCategory />', ()=>{
    test('Debe de cambiar el valor de la caja de texto', ()=>{

        render(<AddCategory onNewCategory={()=>{}}/>);
        const input = screen.getByRole('textbox');

        fireEvent.input( input, {target:{value: 'One'}});
        
        expect(input.value).toBe('One')
        //screen.debug()
        //Se crea el sujeto de prueba, extraemos el input que tiene una relacion directa con el screen, disparamos el evento, y podemos hacer la sersion de lo que esperamos que suceda
        
    });

    test('debe de llamar onNewCategory si el input tiene un valor', () => {

        const inputValue = 'One';
        const onNewCategory = jest.fn();

        render(<AddCategory onNewCategory={onNewCategory}/>);

        const input = screen.getByRole('textbox');
        const form  = screen.getByRole('form');

        fireEvent.input( input, {target:{value: inputValue}});
        fireEvent.submit(form);
        //creo el valor one, levanto el sujeto de prueba, agarro las referencias al input y form, disparo el primer evento y establece el valor.
        //screen.debug();

        expect(input.value).toBe('');
        expect(onNewCategory).toHaveBeenCalled();
        expect(onNewCategory).toHaveBeenCalledTimes(1);
        expect(onNewCategory).toHaveBeenCalledWith(inputValue);
    })
    test('No debe de llamar el onNewCategory si el input esta vacio', () => {

        const onNewCategory = jest.fn(); //jest function
        render(<AddCategory onNewCategory={onNewCategory}/>); //sujeto de prueba

        const form = screen.getByRole('form');
        fireEvent.submit(form); //dispara el evento

        expect(onNewCategory).toHaveBeenCalledTimes(0);
        expect(onNewCategory).not.toHaveBeenCalled();

     })
});