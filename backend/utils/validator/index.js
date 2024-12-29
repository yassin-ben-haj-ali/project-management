import yup from 'yup'

const register = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
})

const schemas = {
    register: register,
}

const validator = (schemaName) => {
    if (!schemas[schemaName]) throw new Error(`Unkown schema:${schemaName}`)
    const schema = schemas[schemaName]

    return (body) => {
        schema.validate(body, { abortEarly: false, strict: true })
    }
}

export default validator
