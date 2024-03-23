import React, { useState } from 'react';
import UserAuth from './UserAuth';

function LandingPage() {

    return (
        <div className="container mx-auto px-4">
            <header className="text-center my-8">
                <h1 className="text-4xl font-bold">Welcome to Our App</h1>
                <p className="text-xl mt-4">A brief description of what the app does.</p>
            </header>
            <div className="flex justify-around items-center my-8">
                <div className="w-1/2">
                    <p>This is where you can put more detailed information about the application, its benefits, and features.</p>
                </div>
                <div className="w-1/2">
                    <UserAuth/>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
