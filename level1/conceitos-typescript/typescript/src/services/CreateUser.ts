
interface TechObject {
    title: string,
    experience: number
}

interface UserData {
    name: string,
    email: string,
    password?: string,
    techs: Array<string | TechObject>
}

export default function createUser({ name, email, password = '123', techs }: UserData) {
    const user = { name, email, password, techs }

    return user
}