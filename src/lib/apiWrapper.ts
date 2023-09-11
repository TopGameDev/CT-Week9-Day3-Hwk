import axios from 'axios'
import UserType from '../types/user'
import QuestionType from '../types/question'


const base: string = 'https://cae-bookstore.herokuapp.com';
const questionsEndpoint: string = '/question/all';
const userQuestionsEndpoint: string = '/question'
const userEndpoint: string = '/user';
const loginEndpoint: string = '/login'


const apiClientNoAuth = () => axios.create({
    baseURL: base
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Basic ' + btoa(`${username}:${password}`)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: 'Bearer ' + token
    }
})


type APIResponse<T> = {
    error?: string,
    data?: T
}

type TokenType = {
    token: string,
    tokenExpiration: string
}


async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(questionsEndpoint);
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function getMyQuestions(token:string): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientTokenAuth(token).get(userQuestionsEndpoint);
        data = response.data.questions
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function register(newUserData:Partial<UserType>): Promise<APIResponse<UserType>> {
    let error;
    let data;

    try{
        delete newUserData.confirmPassword
        const response = await apiClientNoAuth().post(userEndpoint, newUserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            console.log(err)
            // error = err.message
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function getMe(token:string): Promise<APIResponse<UserType>> {
    let error;
    let data;
    
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint);
        data = response.data 
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function login(email:string, password:string): Promise<APIResponse<TokenType>> {
    let error;
    let data;

    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function editUserByToken(token:string, editedUserData:UserType): Promise<APIResponse<UserType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(userEndpoint, editedUserData)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function deleteUserByToken(token:string): Promise<APIResponse<string>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(userEndpoint)
        data = response.data.success
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function createQuestion(token:string, newQuestion:Partial<QuestionType>): Promise<APIResponse<QuestionType>> {
    let error;
    let data;

    try{
        const response = await apiClientTokenAuth(token).post(userQuestionsEndpoint, newQuestion);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function editQuestionById(token:string, questionId:string|number, editedQuestion:QuestionType): Promise<APIResponse<QuestionType>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).put(userQuestionsEndpoint + '/' + questionId, editedQuestion)
        data = response.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

async function deleteQuestionById(token:string, questionId:string|number): Promise<APIResponse<string>> {
    let error;
    let data;
    try {
        const response = await apiClientTokenAuth(token).delete(userQuestionsEndpoint + '/' + questionId)
        data = response.data.success
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

export {
    getAllQuestions,
    getMyQuestions,
    register,
    getMe,
    login,
    editUserByToken,
    deleteUserByToken,
    createQuestion,
    editQuestionById,
    deleteQuestionById,
}
