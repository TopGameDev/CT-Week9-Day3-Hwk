import axios from 'axios'
import UserType from '../types/user'
import QuestionType from '../types/question'


const base: string = 'https://cae-bookstore.herokuapp.com/';
const questionsEndpoint: string = '/question/all';
const userEndpoint: string = '/user';


const apiClientNoAuth = () => axios.create({
    baseURL: base
})


type APIResponse<T> = {
    error?: string,
    data?: T
}


async function getAllQuestions(): Promise<APIResponse<QuestionType[]>> {
    let error;
    let data;
    try{
        const response = await apiClientNoAuth().get(questionsEndpoint);
        data = response.data
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
        const response = await apiClientNoAuth().post(userEndpoint, newUserData)
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            // error = err.message
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return {error, data}
}

export {
    getAllQuestions,
    register,
}
