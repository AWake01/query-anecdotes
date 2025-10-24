import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    console.log('reducer')
    console.log(action.type)
    switch(action.type) {
        case 'SET':
            console.log('SET')
            state = action.payload
            console.log(action.payload)

            return state
        case 'CLEAR':
            console.log('CLEAR')
            return ''
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotifactionContextProvider = (props) => {
    const [ notification, notificationDispatch ] = useReducer(notificationReducer, '')

    return (
        <NotificationContext.Provider value={{ notification, notificationDispatch }}>
            {props.children}
        </NotificationContext.Provider>
    )
}    

export const useShowNotification = () => {  //Notification timeout function implimented from published solution
    const { notificationDispatch } = useContext(NotificationContext)

    return (payload) => {
        notificationDispatch({ type: 'SET', payload: payload })
        setTimeout(() => {
            notificationDispatch({ type: 'CLEAR' })
        }, 5000)
    }
}

export default NotificationContext