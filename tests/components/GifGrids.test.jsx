import { render, screen } from '@testing-library/react'
import { GifGrid } from '../../src/components/GifGrid';
import { useFetchGifs } from '../../src/hooks/useFetchGifs';

jest.mock('../../src/hooks/useFetchGifs')

describe('Pruebas en <GifGrid />', () => { 

    const category = 'One';

    test('debe de mostrar el loading inicialmente', () => {
        
        useFetchGifs.mockReturnValue({
            images:[],
            isLoading: true,
        })

        render(<GifGrid category={category}/>);
        expect(screen.getByText('Cargando...'));
        expect(screen.getByText(category));

    })

    test('debe de mostrar items cuando se cargan las imagenes mediante useFetchGifs', () => { 
        
        const gifs =[
            {
                id:'ABC',
                title:'hola',
                url:'https://localhost/one.jpg',

            },
            {
                id:'CBA',
                title:'bye',
                url:'https://localhost/by7e.jpg',
            }
        ]

        useFetchGifs.mockReturnValue({
            images: gifs,
            isLoading: true,
        })
        render(<GifGrid category={category}/>);
        expect(screen.getAllByRole('img').length).toBe(2);

     })

})