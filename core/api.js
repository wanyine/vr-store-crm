import axios from 'axios'



console.log(process.env)
const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials:true
})

const resource = uri => ({
  add(obj){
    return instance.post(uri, obj)
  },
  delete(id){
    return instance.delete(`${uri}/${id}`)
  },
  edit(obj){
    return instance.put(uri, obj)
  },
  get(params={}){
    return instance.get(uri, {params})
  }
})

export const users = resource('/admin/users')
export const records = resource('/admin/records')
