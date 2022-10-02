import React from 'react';
import { useAuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
    const { authError } = useAuthContext()
    return (
        <>
            <div>
                <h3 className='text-center'> Welcome to Dashboard</h3>
                <p className="text-center text-muted">  {authError ?? "successfully  logged in."} </p>
            </div>
        </>
    );
}
