import numbersRepository from "./NumbersRepository"

const repositories = {
    numbers: numbersRepository
}

export const RepositoryFactory = {
    get: name => repositories[name]
}