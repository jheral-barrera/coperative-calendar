import { Navigate, Route, Routes } from "react-router-dom"
import { LoginRegisterPage } from "../(auth)";
import { CalendarPage } from "../(calendar)";

export const AppRouter = () => {
    // const authStatus = 'not-authenticated';
    const authStatus = 'authenticated';

    return (   
    <Routes>
        {
            ( authStatus === 'not-authenticated' )
                ? <Route path="/auth/*" element={ <LoginRegisterPage /> } />
                : <Route path="/*" element={ <CalendarPage /> } />
        }

        <Route path="/*" element={ <Navigate to='/auth/login' /> } />
    </Routes>
  )
}

