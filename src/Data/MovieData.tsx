import movie1 from '../images/movies/1.jpg'
import movie2 from '../images/movies/2.jpg'
import movie3 from '../images/movies/3.jpg'
import movie4 from '../images/movies/4.jpg'

const titleImg: string = 'w-full h-full object-cover'

export const Movies: any = [
    {
        name: 'test',
        desc: 'lorem ipsum',
        titleImage: <img src={movie1} alt='movie1' className='w-full h-full object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2008',
        time: '3hr',
        video: '4K',
        rate: '3.4',
        reviews: '900'
    },
    {
        name: 'test2',
        desc: 'lorem ipsum',
        titleImage: <img src={movie2} alt='movie2' className='w-full h-full object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2008',
        time: '3hr',
        video: '4K',
        rate: '3.4',
        reviews: '800'
    },
    {
        name: 'test3',
        desc: 'lorem ipsum',
        titleImage: <img src={movie3} alt='movie3' className='w-full h-full object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2008',
        time: '3hr',
        video: '4K',
        rate: '3.4',
        reviews: '92'
    },
    {
        name: 'test4',
        desc: 'lorem ipsum',
        titleImage: <img src={movie4} alt='movie4' className='w-full h-full object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2018',
        time: '2hr',
        video: '4K',
        rate: '3.4',
        reviews: '63'
    }
]

export const MoviesData: any = [
    {
        name: 'test',
        desc: 'lorem ipsum',
        image: <img src={movie1} alt='movie1' className='w-full h-64 object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2008',
        time: '3hr',
        video: '4K',
        rate: '3.4',
        reviews: '900'
    },
    {
        name: 'test2',
        desc: 'lorem ipsum',
        image: <img src={movie2} alt='movie2' className='w-full h-64 object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2008',
        time: '3hr',
        video: '4K',
        rate: '3.4',
        reviews: '800'
    },
    {
        name: 'test3',
        desc: 'lorem ipsum',
        image: <img src={movie3} alt='movie3' className='w-full h-64 object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2008',
        time: '3hr',
        video: '4K',
        rate: '3.4',
        reviews: '92'
    },
    {
        name: 'test4',
        desc: 'lorem ipsum',
        image: <img src={movie4} alt='movie4' className='w-full h-64 object-cover'/>,
        category: 'Western',
        language: 'Armenian',
        year: '2018',
        time: '2hr',
        video: '4K',
        rate: '3.4',
        reviews: '63'
    }
]

export const UsersData: any = [
    {
        fullName: 'Tom Cruise',
        image: <img src={movie1} alt='movie1' className={titleImg}/>,
        email: 'tomcruise@gmail.com',
        rate: 4.5,
        message:
            'Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.',
    },
    {
        fullName: 'Emily Blunt',
        image: <img src={movie1} alt='movie1' className={titleImg}/>,
        email: 'emilyblunt@gmail.com',
        rate: 0.5,
        message:
            'There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.',
    },
    {
        fullName: 'John Snow',
        image: <img src={movie1} alt='movie1' className={titleImg}/>,
        email: 'johnsnow@gmail.com',
        rate: 2.5,
        message: 'The majority have suffered alteration.',
    },
    {
        fullName: 'Will Smith',
        image: <img src={movie1} alt='movie1' className={titleImg}/>,
        email: 'willsmith@gmail.com',
        rate: 5,
        message:
            'Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.',
    },
    {
        fullName: 'Minah Lee',
        email: 'minahlee@gmail.com',
        image: 'c5.png',
        rate: 1.5,
        message:
            'Lorem ipsum dolor sit amet, consecetur adipiscing elseddo eiusmod There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration.',
    },
];
