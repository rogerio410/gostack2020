import { Request, Response } from 'express'
import createUser from './services/CreateUser'

export function helloworld(request: Request, response: Response) {

    const user = createUser({
        name: 'Rogério Silva',
        email: 'rogerio410@gmail.com',
        techs: [
            'Python',
            'Django',
            'Flask',
            { title: 'Typscript', experience: 80 }
        ]
    })

    return response.json({ message: 'Ok', user })
}